import chainlit as cl
from src.langgenie.tool_agent import ToolAgent

@cl.on_chat_start
def initialize_llm():
    # Create the Tool Agent
    tool_agent = ToolAgent()
    cl.user_session.set("Agent", tool_agent.get_agent_executor())


@cl.on_message
async def query_llm(message  : cl.Message):
    files = None
    response = {"output": "Sorry, something went wrong."}

    if files is None:
        agent_executor = cl.user_session.get("Agent")       

        if not agent_executor is  None:
            response = agent_executor.invoke({"input": message.content})

    else:
        files = files[0]
    

    
    await cl.Message(content=response["output"]).send()

    