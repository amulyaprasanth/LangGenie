import React, {useEffect, useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Copy, ThumbsUp, ThumbsDown, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'bot';
    message: string;
    time: string;
}

export interface ToolChatProps {
    messages: Message[];
    isThinking: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1">
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
        <span className="text-white/60 text-sm ml-3">Searching knowledge base...</span>
    </div>
);

const MessageActions = ({ message }: { message: string }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
    };

    return (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2 mt-2">
            <button
                onClick={copyToClipboard}
                className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                title="Copy message"
            >
                <Copy className="w-4 h-4" />
            </button>
            <button
                className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                title="Good response"
            >
                <ThumbsUp className="w-4 h-4" />
            </button>
            <button
                className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                title="Bad response"
            >
                <ThumbsDown className="w-4 h-4" />
            </button>
        </div>
    );
};

export const ToolChat: React.FC<ToolChatProps> = ({messages, isThinking}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    if (messages.length === 0 && !isThinking) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <Search className="w-16 h-16 text-purple-300 mb-4 opacity-50" />
                <p className="text-white/60 text-lg">Ready to explore knowledge</p>
                <p className="text-white/40 text-sm mt-2">Ask me about Wikipedia or ArXiv research...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div 
                ref={containerRef}
                className="flex-1 overflow-y-auto space-y-4 px-4 py-6 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
            >
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`flex items-start gap-3 group ${
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            }`}
                        >
                            {/* Avatar */}
                            <div className={`flex-shrink-0 ${
                                msg.role === "user" ? "order-2" : "order-1"
                            }`}>
                                {msg.role === "bot" ? (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                                        <Search className="w-5 h-5 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Message Content */}
                            <div className={`flex-1 max-w-[80%] ${
                                msg.role === "user" ? "order-1" : "order-2"
                            }`}>
                                <div className={`rounded-2xl px-4 py-3 ${
                                    msg.role === "user"
                                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto"
                                        : "glass text-white mr-auto"
                                }`}>
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                code: ({ children }) => (
                                                    <code className="bg-black/20 px-1.5 py-0.5 rounded text-sm font-mono">
                                                        {children}
                                                    </code>
                                                ),
                                                pre: ({ children }) => (
                                                    <pre className="bg-black/30 p-3 rounded-lg overflow-x-auto text-sm">
                                                        {children}
                                                    </pre>
                                                ),
                                            }}
                                        >
                                            {msg.message}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                                
                                {/* Message Time and Actions */}
                                <div className={`flex items-center mt-1 text-xs text-white/50 ${
                                    msg.role === "user" ? "justify-end" : "justify-start"
                                }`}>
                                    <span>{msg.time}</span>
                                </div>
                                
                                {/* Bot Message Actions */}
                                {msg.role === "bot" && <MessageActions message={msg.message} />}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Thinking Indicator */}
                {isThinking && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="glass rounded-2xl px-4 py-3 mr-auto">
                            <TypingIndicator />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
