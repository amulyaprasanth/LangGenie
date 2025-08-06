import {CardList} from "../components/CardList.tsx";
import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, BookOpen } from "lucide-react";

export const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    {/* Floating orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Hero content */}
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center mb-6"
                    >
                        <Brain className="w-16 h-16 text-purple-300 mr-4 animate-pulse" />
                        <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                            LangGenie
                        </h1>
                        <Sparkles className="w-12 h-12 text-pink-300 ml-4 animate-bounce" />
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-light text-white/80 mb-8"
                    >
                        Unlock Knowledge with AI-Powered Tools
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Transform documents into speeches, articles, and blogs. Generate compelling content from your PDFs with advanced AI capabilities.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                            <span className="flex items-center">
                                <Zap className="w-5 h-5 mr-2 group-hover:animate-spin" />
                                Get Started
                            </span>
                        </button>
                        <button className="px-8 py-4 glass text-white font-semibold rounded-full hover:scale-105 transition-all duration-300">
                            <span className="flex items-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Learn More
                            </span>
                        </button>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
                    </div>
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-purple-900/20" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-4xl font-bold text-white mb-6">About LangGenie</h3>
                        <div className="glass p-8 rounded-2xl">
                            <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
                                LangGenie is an AI-powered research platform designed to revolutionize the way you access and explore information. 
                                With advanced tools for PDF processing, Wiki & ArXiv integration, and intelligent content generation, 
                                LangGenie transforms complex documents into engaging speeches, comprehensive articles, and compelling blog posts. 
                                Whether you're conducting research, preparing presentations, or creating content, 
                                LangGenie provides seamless access to knowledge with the power of cutting-edge AI.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
                <div className="relative z-10">
                    <CardList/>
                </div>
            </section>
        </div>
    );
};
