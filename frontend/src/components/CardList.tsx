import {Card} from "./Card.tsx";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const CardList = () => {
    const cards = [
        {
            title: "WikiArXiv Explore",
            description: "Effortlessly retrieve and explore knowledge from Wikipedia and ArXiv with intelligent AI-powered search.",
            link: "/tool"
        },
        {
            title: "DocQnA & Content Generator",
            description: "Transform your PDFs into engaging speeches, comprehensive articles, and compelling blog posts with AI.",
            link: "/rag"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="flex items-center justify-center mb-4 flex-wrap">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300 mr-2 sm:mr-3 animate-pulse" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent text-center">
                        Our Services
                    </h2>
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-300 ml-2 sm:ml-3 animate-pulse" />
                </div>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                    Discover powerful AI tools designed to enhance your research and content creation workflow
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="w-full max-w-md"
                    >
                        <Card title={card.title} description={card.description} link={card.link}/>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
