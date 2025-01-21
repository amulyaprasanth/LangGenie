import React, {useEffect, useRef} from 'react';
import Bot from "../assets/bot.png";

interface Message {
    role: 'user' | 'bot';
    message: string;
    time: string;
}

export interface ToolChatProps {
    messages: Message[];
    isThinking: boolean;
}

export const ToolChat: React.FC<ToolChatProps> = ({messages, isThinking}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    if (messages.length === 0 && !isThinking) {
        return null;
    }

    return (
        <div ref={containerRef}
             className="chat-container p-4 bg-gray-900 rounded-lg shadow-md max-w-2xl mx-auto overflow-y-auto max-h-96">
            <div className="header text-lg font-bold mb-4 roboto-normal">WikiArXiv Agent</div>
            {messages.map((msg, index) => (
                <div key={index}
                     className={`flex items-end gap-2 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "bot" && (
                        <img
                            className="size-8 bg-black p-1 rounded-full object-cover"
                            src={Bot}
                            alt="avatar"
                        />
                    )}
                    <div
                        className={`message-content p-4 rounded-lg ${msg.role === "user" ? "bg-black text-neutral-100 rounded-l-xl rounded-tr-xl" : "bg-blue-800 text-neutral-100 rounded-r-md rounded-tl-md"}`}>
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs text-gray-300">{msg.time}</span>
                    </div>
                    {msg.role === "user" && (
                        <span
                            className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-50 text-sm font-bold tracking-wider dark:border-neutral-700 dark:bg-white dark:text-neutral-300">
                            👤
                        </span>
                    )}
                </div>
            ))}
            {isThinking && (
                <div className="thinking-spinner flex justify-center mt-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};