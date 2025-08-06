import {ToolChat} from "../components/ToolChat.tsx";
import {ChangeEvent, KeyboardEvent, useState, useEffect, useRef} from "react";
import { motion } from "framer-motion";
import { Send, Search, Globe, BookOpen } from "lucide-react";
import axios from "axios";

export interface Message {
    role: 'user' | 'bot';
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
        if (!query.trim()) return;

        const userMessage: Message = {
            role: "user",
            message: query,
            time: new Date().toTimeString().split(' ')[0].slice(0, -3)
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsThinking(true);

        try {
            const response = await axios.post("http://localhost:8000/query_tool", {"question": query});
            const assistantMessage: Message = {
                role: "bot",
                message: response.data.answer,
                time: new Date().toTimeString().split(' ')[0].slice(0, -3)
            };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error("Error occurred while querying the backend:", error);
        } finally {
            setIsThinking(false);
            setQuery("");
        }
    };

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.target) {
            setQuery(e.target.value);
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuery(query);
        }
    };

    const handleSubmit = () => {
        sendQuery(query);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pt-10 min-h-screen">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 px-6"
                >
                    <div className="flex items-center justify-center mb-4">
                        <Search className="w-12 h-12 text-green-300 mr-4 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text text-transparent">
                            WikiArXiv Explorer
                        </h1>
                    </div>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Explore the vast knowledge base of Wikipedia and cutting-edge research from ArXiv with AI-powered search
                    </p>
                </motion.div>

                {/* Knowledge Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto px-6 mb-8"
                >
                    <div className="glass rounded-2xl p-6">
                        <h3 className="text-white text-xl font-semibold mb-4 text-center">Knowledge Sources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center p-3 glass-dark rounded-xl">
                                <Globe className="w-6 h-6 text-blue-400 mr-3" />
                                <div>
                                    <div className="text-white font-medium">Wikipedia</div>
                                    <div className="text-white/60 text-sm">Global encyclopedia</div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 glass-dark rounded-xl">
                                <BookOpen className="w-6 h-6 text-green-400 mr-3" />
                                <div>
                                    <div className="text-white font-medium">ArXiv</div>
                                    <div className="text-white/60 text-sm">Research papers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Chat Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto px-6 mb-8"
                    ref={containerRef}
                >
                    <div className="glass rounded-2xl min-h-[400px]">
                        <ToolChat messages={messages} isThinking={isThinking}/>
                    </div>
                </motion.div>

                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-4xl mx-auto px-6 pb-8"
                >
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-1">
                                <textarea
                                    value={query}
                                    onChange={onChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything about Wikipedia topics or ArXiv research papers..."
                                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none transition-all duration-300"
                                    rows={2}
                                    disabled={isThinking}
                                />
                                <div className="mt-2 text-xs text-white/50 flex items-center">
                                    <Search className="w-4 h-4 mr-2" />
                                    <span>Current sources: Wikipedia & ArXiv</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={!query.trim() || isThinking}
                                className="px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                            >
                                {isThinking ? (
                                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
