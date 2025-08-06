import { motion } from "framer-motion";
import { ArrowRight, FileText, MessageSquare, Presentation, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

interface CardProps {
    title: string;
    description: string;
    link: string;
}

const getIcon = (title: string) => {
    if (title.includes("DocQnA")) return <FileText className="w-8 h-8" />;
    if (title.includes("Wiki")) return <MessageSquare className="w-8 h-8" />;
    if (title.includes("Speech")) return <Presentation className="w-8 h-8" />;
    return <PenTool className="w-8 h-8" />;
};

export const Card = ({title, description, link}: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
            }}
            viewport={{ once: true }}
            className="group relative w-full h-full"
        >
            <div className="glass rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 text-purple-300 group-hover:text-pink-300 transition-colors duration-300">
                        {getIcon(title)}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white font-bold text-2xl mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/70 text-base mb-6 leading-relaxed">
                        {description}
                    </p>
                    
                    {/* Button */}
                    <Link
                        to={link}
                        className="group/button inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                        <span>Try It Now</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl group-hover:scale-105 transition-transform duration-700" />
            </div>
        </motion.div>
    );
};
