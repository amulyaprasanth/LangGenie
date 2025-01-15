from langchain_core.vectorstores import VectorStoreRetriever
from pymupdf import open
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from typing import List, Optional
from langchain_core.prompts import PromptTemplate
import os


class RagPdf:
    def __init__(self) -> None:
        """
        Initializes the RagPdf instance with necessary components for processing PDF files.
        """
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        self.embeddings = OllamaEmbeddings(model="llama3.1")
        self.llm = OllamaLLM(model='llama3.1')
        self.chain: Optional[RetrievalQA] = None

    def load_file(self, file_path: str) -> List[str]:
        """
        Loads a PDF file from the given file path and extracts text from each page.

        Args:
            file_path (str): The path of the PDF file to be loaded.

        Returns:
            List[str]: A list of strings, each representing the text of a page.

        Raises:
            FileNotFoundError: If the specified file does not exist.
            Exception: For any other errors that occur during file processing.
        """
        pages: List[str] = []

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"The file at {file_path} does not exist.")

        try:
            doc = open(file_path)
            for page in doc:  # Iterate through document pages
                text = page.get_text()  # get plain text (is in UTF-8)
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

        prompt: PromptTemplate = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

        # Create a RaG chain
        qa_chain: RetrievalQA = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=retriever,
                return_source_documents=False,
                chain_type_kwargs={"prompt": prompt}
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
        return chain.invoke({"query": question})['result']


if __name__ == '__main__':
    rag = RagPdf()
    pages  = rag.load_file("D:\\Downloads\\Documents\\NadaganiAmulyaPrasanthResume_2.pdf")
    retriever = rag.split_and_store_documents(pages)
    chain = rag.create_chain(retriever)
    print(rag.invoke_chain(chain, "What is the educational background of the person?"))