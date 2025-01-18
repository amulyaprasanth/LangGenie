import React, {useState} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {FileUpload} from "../components/FileUpload/FileUpload";

export const RagChain = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false); // New loading state

    const handleChat = async () => {
        if (!question) return; // Prevent sending empty questions
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await axios.post("http://localhost:8000/query/", {
                question: question,
            });
            setAnswer(response.data.answer); // Set the answer from the response
        } catch (error) {
            console.error(
                "Error asking question:",
                error.response ? error.response.data : error.message
            );
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <FileUpload/>
            <div className="mt-6 flex items-center">
        <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the PDF..."
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
                <button
                    onClick={handleChat}
                    className="mt-4 ml-3 mb-3 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition duration-200 center">
                    Ask
                </button>
            </div>
            {loading && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-yellow-800">Thinking...</p>
                </div>
            )}
            {answer && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                    <h2 className="font-semibold">Answer:</h2>
                    <ReactMarkdown>{answer}</ReactMarkdown>{" "}
                    {/* Render answer as Markdown */}
                </div>
            )}
        </div>
    );
}