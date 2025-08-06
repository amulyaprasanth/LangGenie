from io import BytesIO
from typing import List, Optional

from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pymupdf import open


class RagPdf:
    def __init__(self) -> None:
        """
        Initializes the RagPdf instance with necessary components for processing PDF files.
        """
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )
        self.embeddings = OllamaEmbeddings(
            model="llama3.1", base_url="http://ollama:11434"
        )
        self.llm = OllamaLLM(model="llama3.1", base_url="http://ollama:11434")
        self.chain: Optional[RetrievalQA] = None

    def load_file(self, file_stream: bytes) -> List[str]:
        """

        Loads a PDF file from the given byte stream and extracts text from each page.


        Args:

            file_stream (BytesIO): The byte stream of the PDF file to be loaded.


        Returns:

            List[str]: A list of strings, each representing the text of a page.
        Raises:
            Exception: For any errors that occur during file processing.

        """
        pages: List[str] = []

        try:

            doc = open(None, stream=file_stream)

            for page in doc:  # Iterate through document pages

                text = page.get_text()  # ignore

                pages.append(text)

        except Exception as e:

            raise Exception(f"An error occurred while loading the PDF file: {e}")

        return pages

    def split_and_store_documents(self, pages: List[str]) -> VectorStoreRetriever:
        """
        Splits the text from loaded PDF pages into smaller documents and stores them in a vector store.

        This method uses the text splitter to divide the text from each page into smaller chunks,
        creates a vector store using these split documents, and initializes a retriever for efficient
        document retrieval.

        Args:
            pages (List[str]): A list of strings representing the text of each page.

        Returns:
            VectorStoreRetriever: A retriever for the vector store containing the split documents.
        """
        if not pages:
            raise ValueError("No pages loaded. Please load a PDF file first.")

        # Split the documents
        split_documents = self.text_splitter.create_documents(pages)

        # Create the vector store and store the documents
        vector_store = FAISS.from_documents(split_documents, self.embeddings)
        return vector_store.as_retriever()

    def create_chain(self, retriever, content_type="qa"):
        """
        Creates a RetrievalQA chain using the loaded documents and the specified language model.

        Args:
            retriever (VectorStoreRetriever): The retriever for accessing the vector store.
            content_type (str): Type of content to generate - "qa", "speech", "article", or "blog".

        Returns:
            RetrievalQA: The configured RetrievalQA chain.
        """
        # Creating different prompt templates based on content type
        if content_type == "speech":
            prompt_template = (
                "Based on the following document content, create an engaging speech that addresses the user's request. "
                "Structure your speech with a compelling opening, main points with supporting evidence from the document, "
                "and a memorable conclusion. Use rhetorical devices and vary sentence length for impact.\n\n"
                "Document Content:\n{context}\n\n"
                "Speech Request: {question}\n\n"
                "Generate a well-structured, engaging speech:"
            )
        elif content_type == "article":
            prompt_template = (
                "Using the provided document content, write a comprehensive article that addresses the user's request. "
                "Include a compelling headline, introduction, body paragraphs with subheadings, and conclusion. "
                "Maintain a professional, informative tone and cite relevant information from the source material.\n\n"
                "Source Material:\n{context}\n\n"
                "Article Request: {question}\n\n"
                "Write a well-researched, structured article:"
            )
        elif content_type == "blog":
            prompt_template = (
                "Based on the document content provided, create an engaging blog post that addresses the user's topic. "
                "Write in a conversational, accessible tone with a catchy title, engaging introduction, "
                "well-organized main content, and a call-to-action conclusion. Include relevant examples and insights from the source.\n\n"
                "Reference Material:\n{context}\n\n"
                "Blog Topic: {question}\n\n"
                "Create an engaging, informative blog post:"
            )
        else:  # Default QA mode
            prompt_template = (
                "Use the following pieces of context to answer the question at the end. "
                "If you don't know the answer, just say that you don't know; don't try to make up an answer.\n\n"
                "{context}\n\n"
                "Question: {question}\n"
                "Provide a concise answer in 1-4 sentences:"
            )

        prompt: PromptTemplate = PromptTemplate(
            template=prompt_template, input_variables=["context", "question"]
        )

        # Create a RaG chain
        qa_chain: RetrievalQA = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": prompt},
        )

        return qa_chain

    def invoke_chain(self, chain, question: str) -> str:
        """
        Invokes the RetrievalQA chain with a question and returns the result.

        Args:
            chain (RetrievalQA): The RetrievalQA chain to invoke.
            question (str): The question to ask the chain.

        Returns:
            str: The result of the chain's response to the question.
        """
        return chain.invoke({"query": question})["result"]
