import { ToolChat } from "../components/ToolChat.tsx";
import { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import {config} from "../Constants";

const url = config.url.BASE_URL
export interface Message {
  role: "user" | "bot";
  message: string;
  time: string;
}

export const ToolAgent = () => {
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const sendQuery = async (query: string) => {
    if (!query) return;

    const userMessage: Message = {
      role: "user",
      message: query,
      time: new Date().toTimeString().split(" ")[0].slice(0, -3),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsThinking(true);

    try {
      const response = await axios.post(
        `${url}/query_tool`,
        { question: query }
      );
      const assistantMessage: Message = {
        role: "bot",
        message: response.data.answer,
        time: new Date().toTimeString().split(" ")[0].slice(0, -3),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error occurred while querying the backend:", error);
    } finally {
      setIsThinking(false);
      setQuery(""); // Clear the input field after sending the query
    }
  };

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      setQuery(e.target.value);
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendQuery(query);
    }
  };

  return (
    <div className="bg-slate-800 bg-cover pt-10 min-h-screen w-screen text-center">
      <div className="text-2xl font-sans">
        <h1 className="text-4xl">WikiArXiv Explore</h1>
        <p className="p-5 l">
          Retrieve information from Wikipedia and research papers from arXiv.
        </p>
      </div>
      <div ref={containerRef}>
        <ToolChat messages={messages} isThinking={isThinking} />
      </div>
      <div className="mt-5">
        <input
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder="Ask a question..."
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={() => sendQuery(query)}
          className="p-2 px-5 ml-2 bg-blue-800 hover:bg-blue-500 text-white rounded">
          Ask
        </button>
      </div>
    </div>
  );
};
