import React from 'react';

interface Message {
    role: 'user' | 'bot'; // Restricting role to 'user' or 'bot'
    message: string;
    time: string;
}

export interface ChatContainerProps {
    messages: Message[];
}

export const ChatContainer: React.FC<ChatContainerProps> = ({messages}) => {
    if (messages.length === 0) {
        return null; // Do not render the container if there are no messages
    }

    return (
        <div className="chat-container p-4 bg-gray-900 rounded-lg shadow-md max-w-2xl mx-auto overflow-y-auto max-h-96">
            <div className="header text-lg font-bold mb-4 roboto-normal">QnA Bot</div>
            {messages.map((msg, index) => (
                <div key={index}
                     className={`flex items-end gap-2 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "bot" && (
                        <img
                            className="size-8 rounded-full object-cover"
                            src="https://penguinui.s3.amazonaws.com/component-assets/avatar-8.webp"
                            alt="avatar"
                        />
                    )}
                    <div
                        className={`message-content p-4 rounded-lg ${msg.role === "user" ? "bg-black text-neutral-100 rounded-l-xl rounded-tr-xl" : "bg-neutral-50 text-neutral-600 rounded-r-md rounded-tl-md"}`}>
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    {msg.role === "user" && (
                        <span
                            className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-neutral-50 text-sm font-bold tracking-wider text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                            JS
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};