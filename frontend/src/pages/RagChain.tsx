import {Upload} from "../components/Upload";
import {ChatContainer} from "../components/ChatContainer";
import {ChangeEvent, KeyboardEvent, useState, useEffect, useRef} from "react";
import axios from "axios";
import {config} from "../Constants";

const url = config.url.BASE_URL

export interface Message {
    role: 'user' | 'bot'; // Restricting role to 'user' or 'bot'
    message: string;
    time: string;
}

export const RagChain = () => {
    const [query, setQuery] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target) {
            setQuery(e.target.value);
        }
    }

    const queryBackend = async (query: string) => {
        if (!query) return;

        const userMessage: Message = {
            role: "user",
            message: query,
            time: new Date().toTimeString().split(' ')[0]
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsThinking(true);

        try {
            const response = await axios.post(
              `${url}/query`,
              { question: query }
            );
            const assistantMessage: Message = {
                role: "bot",
                message: response.data.answer,
                time: new Date().toTimeString().split(' ')[0]
            };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error("Error occurred while querying the backend:", error);
        } finally {
            setIsThinking(false);
            setQuery(""); // Clear the input field after sending the query
        }
    };

    const handleClick = () => {
        queryBackend(query);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            queryBackend(query);
        }
    };

    const handleFileUpload = () => {
        setIsFileUploaded(true);
    };

    return (
        <div className="bg-slate-800 pt-10 min-h-screen w-screen text-center">
            <div id="file-upload" className="">
                <h1 className="text-2xl">DocQnA</h1>
                <p className="m-5">Upload a PDF page, and then you can ask questions about it using the LLaMA 3.1
                    model.</p>
                <Upload onFileUpload={handleFileUpload}/>
            </div>
            <div className="mt-5" ref={containerRef}>
                <ChatContainer messages={messages}
                               isThinking={isThinking}/> {/* Pass messages and isThinking to ChatContainer */}
            </div>
            {isFileUploaded && (
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
                        onClick={handleClick}
                        className="p-2 px-5 ml-2 bg-blue-800 hover:bg-blue-500 text-white rounded"
                    >
                        Ask
                    </button>
                </div>
            )}
        </div>
    );
};