from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_community.tools import (
    ArxivQueryRun,
    WikipediaQueryRun,
)
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama


class ToolAgent:
    def __init__(self) -> None:
        """
        Initializes the ToolAgent with Wikipedia and Arxiv query tools.
        Sets up the language model and the prompt template for the agent.
        """
        # Initialize tools with their respective API wrappers
        wikipedia_api = WikipediaAPIWrapper(top_k_results=1)
        arxiv_api = ArxivAPIWrapper(top_k_results=1)
        self.wikipedia = WikipediaQueryRun(api_wrapper=wikipedia_api)
        self.arxiv = ArxivQueryRun(
            api_wrapper=arxiv_api,
            handle_validation_error=True,
            handle_tool_error=True,
        )
        self.tools = [self.wikipedia, self.arxiv]

        # Pull the prompt from the hub
        self.prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful assistant. Use the tools to answer questions and generate your response. Provide a concise answer in 3-4 sentences unless the user asked.",
                ),
                ("placeholder", "{chat_history}"),
                ("human", "{input}"),
                ("placeholder", "{agent_scratchpad}"),
            ]
        )

        # Initialize the language model
        self.llm = ChatOllama(model="llama3.1", base_url="http://ollama:11434")

    def invoke_agent(self, query: str) -> dict:
        """
        Invokes the agent with the provided query.

        Args:
            query (str): The input query to be processed by the agent.

        Returns:
            dict: The response from the agent after processing the query.
        """
        try:
            # Create the agent using the LLM, tools, and prompt
            agent = create_tool_calling_agent(self.llm, self.tools, self.prompt)

            # Create agent executor
            agent_executor = AgentExecutor(
                agent=agent,
                tools=self.tools,
                verbose=False,
                return_intermediate_steps=False,
                early_stopping_method="generate",
                handle_parsing_errors=True,
            )

            # Invoke the agent with the provided query
            return agent_executor.invoke({"input": query})
        except Exception as e:
            print(f"An error occurred while invoking the agent: {e}")
            return {"error": str(e)}


if __name__ == "__main__":
    tool_agent = ToolAgent()
    # Example query
    query = "what is the paper 1803.01164 about?"
    try:
        response = tool_agent.invoke_agent(query)
        print(response)
    except Exception as e:
        print(f"An error occurred: {e}")
