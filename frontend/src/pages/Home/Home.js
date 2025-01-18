import React from "react";
import "./Home.css";

export const Home = () => {
    return (
        <div className="flex-auto">
            <div className="bg-blue-300 h-screen p-5 text-center content-center">
                <h1 className="text-7xl montserrat-large font-bold m-2">LangGenie</h1>
                <h2 className="text-xl lato-regular">Unlock Knowledge with AI Tools</h2>
            </div>
            <div className="bg-blue-500 h-80 text-center content-center p-10">
                <h3 className=" roboto-normal text-xl mx-10">About</h3>
                <p className="text-l roboto-normal mx-auto">
                    LangGenie is an AI-powered research platform designed to enhance the way you access and explore
                    information. With tools like the PDF Agent and Wiki & Arxiv integration, LangGenie makes it easy to
                    navigate academic papers, articles, and research materials. Whether you're diving deep into a
                    subject or looking for quick insights, LangGenie provides seamless access to knowledge, helping you
                    stay focused and informed in your research journey.</p>
            </div>
        </div>
    );
};
