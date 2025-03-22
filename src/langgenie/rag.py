from io import BytesIO
from typing import List, Optional

from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pymupdf import open

from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
load_dotenv()

class RagPdf:
    def __init__(self) -> None:
        """
        Initializes the RagPdf instance with necessary components for processing PDF files.
        """
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )
        self.embeddings = FastEmbedEmbeddings(
            model_name="BAAI/bge-base-en-v1.5")
        # Initialize the language model
        self.llm = ChatGroq(model="llama-3.1-8b-instant")
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

    def create_chain(self, retriever):
        """
        Creates a RetrievalQA chain using the loaded documents and the specified language model.

        Args:
            retriever (VectorStoreRetriever): The retriever for accessing the vector store.

        Returns:
            RetrievalQA: The configured RetrievalQA chain.
        """
        # Creating Prompt
        prompt_template: str = (
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