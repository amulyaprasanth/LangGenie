import {Upload} from "../components/Upload";
import {ChatContainer} from "../components/ChatContainer";
import {ChangeEvent, KeyboardEvent, useState, useEffect, useRef} from "react";
import { motion } from "framer-motion";
import { Send, FileText, MessageSquare, Presentation, PenTool, Brain } from "lucide-react";
import axios from "axios";

export interface Message {
    role: 'user' | 'bot';
    message: string;
    time: string;
}

type ContentType = 'qa' | 'speech' | 'article' | 'blog';

interface ContentTypeOption {
    value: ContentType;
    label: string;
    icon: React.ReactNode;
    description: string;
    placeholder: string;
}

export const RagChain = () => {
    const [query, setQuery] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [contentType, setContentType] = useState<ContentType>('qa');
    const containerRef = useRef<HTMLDivElement>(null);

    const contentTypeOptions: ContentTypeOption[] = [
        {
            value: 'qa',
            label: 'Q&A',
            icon: <MessageSquare className="w-5 h-5" />,
            description: 'Ask questions about your document',
            placeholder: 'Ask a question about your document...'
        },
        {
            value: 'speech',
            label: 'Speech',
            icon: <Presentation className="w-5 h-5" />,
            description: 'Generate engaging speeches from your content',
            placeholder: 'Describe the speech you want to generate...'
        },
        {
            value: 'article',
            label: 'Article',
            icon: <FileText className="w-5 h-5" />,
            description: 'Create comprehensive articles',
            placeholder: 'What kind of article would you like to create?...'
        },
        {
            value: 'blog',
            label: 'Blog Post',
            icon: <PenTool className="w-5 h-5" />,
            description: 'Write engaging blog posts',
            placeholder: 'What blog post topic would you like to explore?...'
        }
    ];

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.target) {
            setQuery(e.target.value);
        }
    }

    const queryBackend = async (query: string, selectedContentType: ContentType = contentType) => {
        if (!query.trim()) return;

        const userMessage: Message = {
            role: "user",
            message: query,
            time: new Date().toTimeString().split(' ')[0]
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsThinking(true);

        try {
            const response = await axios.post("http://localhost:8000/query", {
                "question": query,
                "content_type": selectedContentType
            });
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
            setQuery("");
        }
    };

    const handleSubmit = () => {
        queryBackend(query, contentType);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleFileUpload = () => {
        setIsFileUploaded(true);
    };

    const currentOption = contentTypeOptions.find(option => option.value === contentType)!;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pt-10 min-h-screen">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 px-6"
                >
                    <div className="flex items-center justify-center mb-4 flex-wrap">
                        <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300 mr-3 sm:mr-4 animate-pulse" />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent text-center">
                            AI Content Generator
                        </h1>
                    </div>
                    <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                        Upload a PDF and transform it into engaging content - from Q&A sessions to speeches, articles, and blog posts
                    </p>
                </motion.div>

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto px-6 mb-8"
                >
                    <div className="glass rounded-2xl p-6">
                        <Upload onFileUpload={handleFileUpload}/>
                    </div>
                </motion.div>

                {/* Content Type Selection */}
                {isFileUploaded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto px-6 mb-8"
                    >
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-white text-xl font-semibold mb-4 text-center">Choose Content Type</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {contentTypeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setContentType(option.value)}
                                        className={`p-4 rounded-xl transition-all duration-300 text-center relative overflow-hidden ${
                                            contentType === option.value
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                                                : 'glass-dark text-white/70 hover:text-white hover:scale-105'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <div className="flex justify-center mb-2">
                                                {option.icon}
                                            </div>
                                            <div className="font-semibold text-sm mb-1">{option.label}</div>
                                            <div className="text-xs opacity-75">{option.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Chat Container */}
                {isFileUploaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-4xl mx-auto px-6 mb-8"
                        ref={containerRef}
                    >
                        <div className="glass rounded-2xl p-6">
                            <ChatContainer messages={messages} isThinking={isThinking}/>
                        </div>
                    </motion.div>
                )}

                {/* Input Section */}
                {isFileUploaded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto px-6 pb-8"
                    >
                        <div className="glass rounded-2xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                <div className="flex-1">
                                    <textarea
                                        value={query}
                                        onChange={onChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder={currentOption.placeholder}
                                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all duration-300 min-h-[48px]"
                                        rows={contentType === 'qa' ? 1 : 3}
                                        disabled={isThinking}
                                    />
                                    <div className="mt-2 text-xs text-white/50 flex items-center">
                                        {currentOption.icon}
                                        <span className="ml-2">Current mode: {currentOption.label}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!query.trim() || isThinking}
                                    className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 min-h-[48px] touch-manipulation"
                                >
                                    {isThinking ? (
                                        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" />
                                    ) : (
                                        <Send className="w-5 h-5 mx-auto sm:mx-0" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
