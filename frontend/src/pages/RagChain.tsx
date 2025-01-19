import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FileUpload } from "../components/FileUpload/FileUpload";
import { useState, ChangeEvent } from "react";

export const RagChain = () => {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChat = async (): Promise<void> => {
        if (!question) return;
        setLoading(true);
        try {
            const response = await axios.post<{ answer: string }>("http://localhost:8000/query/", {
                question: question,
            });
            setAnswer(response.data.answer);
        } catch (error: unknown) {
            console.error(
                "Error asking question:",
                axios.isAxiosError(error) && error.response ? error.response.data : (error as Error).message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <FileUpload />
            <div className="mt-6 flex items-center">
        <textarea
            value={question}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
            placeholder="Ask a question about the PDF..."
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
                <button
                    onClick={handleChat}
                    className="mt-4 ml-3 mb-3 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition duration-200 center"
                >
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
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};