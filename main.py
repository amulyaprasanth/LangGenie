from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper

from langchain_community.tools import WikipediaQueryRun, ArxivQueryRun

from langchain.schema import StrOutputParser
from langchain.schema.runnable import Runnable
from langchain.schema.runnable.config import RunnableConfig
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from typing import Tuple

import chainlit as cl





def create_tools() -> Tuple[WikipediaQueryRun,ArxivQueryRun]:
    
    # Initialize tools with their perpsective api wrappers
    wiki_tool = WikipediaQueryRun(api_wrapper = WikipediaAPIWrapper(top_k_results=1)) #type: ignore
    arxiv_tool = ArxivQueryRun(api_wrapper=ArxivAPIWrapper(top_k_results=2), handle_validation_error=True, handle_tool_error=True) # type: ignore

    return (wiki_tool
            ,arxiv_tool)


@cl.on_chat_start
async def on_chat_start():
    prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant. Use the tools to answer the questions and generate your response. Provide a concise answer in 4-5 sentences unless the user asked."),
        ("placeholder", "{chat_history}"),
        ("human", "{query}"),
    ]

)
    llm = ChatGroq(model="llama-3.1-8b-instant", streaming=True)

    runnable = prompt | llm | StrOutputParser()

    cl.user_session.set("runnable", runnable)

@cl.on_message
async def on_message(message: cl.Message):
    runnable = cl.user_session.get("runnable")

    msg = cl.Message(content = "")
    if runnable is not None:
        for chunk in await cl.make_async(runnable.stream)({"query": message.content}, config=RunnableConfig(callbacks=[cl.LangchainCallbackHandler()])):
            await msg.stream_token(chunk)

    await msg.send()