from source.rag import RagPdf, VectorStoreRetriever
from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from source.rag import RagPdf
from source.tool_agent import  ToolAgent
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # Allows all origins. Change this to specific origins in production.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers

)
rag_pdf = RagPdf()
tool_agent = ToolAgent()
# Define a variable that can be accessed across all endpoints

shared_variable: dict[str, Optional[VectorStoreRetriever]] = {
    "retriever": None
}


class Message(BaseModel):
    message: str


class Query(BaseModel):
    question: str


@app.post("/echo")
async def echo(message: Message):
    return {"message": f"Echo:{message.message}"}


@app.post('/upload')
async def upload(file: UploadFile = File(...)):
    try:
        # Read the contents of the file
        contents = await file.read()

        # Load the file using RagPdf
        pages = rag_pdf.load_file(contents)

        # Store the vector store in the shared variable
        shared_variable["retriever"] = rag_pdf.split_and_store_documents(pages)

        return {
            "message": "Upload successful"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post('/query')
async def query(question: Query):
    try:
        # Retrieve the vector store from the shared variable
        retriever = shared_variable["retriever"]

        if retriever is None:
            raise HTTPException(
                status_code=400, detail="Please upload a file first")

        # Create a chain
        chain = rag_pdf.create_chain(retriever)

        # Invoke the chain with the question
        answer = rag_pdf.invoke_chain(chain, question.question)

        return {
            "answer": answer
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post('/query_tool')
async def query_tool(query: Query):
    try:
        response = tool_agent.invoke_agent(query)
        return {
            "answer": response["output"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
