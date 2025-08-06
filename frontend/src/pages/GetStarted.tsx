import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    Upload, 
    Mic, 
    PenTool,
    ArrowRight,
    Play,
    BookOpen,
    Zap,
    Users,
    Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: "Upload Your Document",
        description: "Start by uploading a PDF document that you want to analyze or generate content from.",
        icon: <Upload className="w-8 h-8" />,
        details: [
            "Supported formats: PDF files",
            "Maximum file size: 50MB",
            "Best for: Research papers, reports, articles, books"
        ],
        action: "Upload PDF",
        link: "/rag"
    },
    {
        id: 2,
        title: "Choose Content Type",
        description: "Select what type of content you want to generate from your document.",
        icon: <Target className="w-8 h-8" />,
        details: [
            "Q&A: Ask questions about your document",
            "Speech: Generate engaging presentations",
            "Article: Create comprehensive articles",
            "Blog: Write conversational blog posts"
        ],
        action: "Select Mode",
        link: "/rag"
    },
    {
        id: 3,
        title: "Generate Content",
        description: "Use our AI to create amazing content based on your document and preferences.",
        icon: <Zap className="w-8 h-8" />,
        details: [
            "AI-powered content generation",
            "Context-aware responses",
            "Professional quality output",
            "Instant results with GPU acceleration"
        ],
        action: "Start Creating",
        link: "/rag"
    }
];

const useCases = [
    {
        title: "Researchers",
        icon: <BookOpen className="w-6 h-6" />,
        description: "Analyze research papers, extract key findings, and generate summaries.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Students",
        icon: <Users className="w-6 h-6" />,
        description: "Create study materials, presentations, and essay outlines from textbooks.",
        color: "from-green-500 to-teal-500"
    },
    {
        title: "Content Creators",
        icon: <PenTool className="w-6 h-6" />,
        description: "Transform documents into engaging blog posts and social media content.",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Professionals",
        icon: <Mic className="w-6 h-6" />,
        description: "Generate presentations, reports, and professional communications.",
        color: "from-orange-500 to-red-500"
    }
];

const features = [
    {
        title: "AI-Powered Generation",
        description: "Advanced LLaMA 3.1 model with GPU acceleration for fast, intelligent content creation."
    },
    {
        title: "Multiple Content Types",
        description: "Generate speeches, articles, blog posts, or get instant Q&A responses from your documents."
    },
    {
        title: "Wikipedia & ArXiv Integration",
        description: "Explore knowledge from Wikipedia and research papers with our integrated search tools."
    },
    {
        title: "Modern Interface",
        description: "Beautiful, responsive design with glassmorphism effects and smooth animations."
    }
];

export const GetStarted = () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pt-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 px-6"
                >
                    <div className="flex items-center justify-center mb-6">
                        <Play className="w-12 h-12 text-purple-300 mr-4 animate-pulse" />
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Get Started
                        </h1>
                    </div>
                    <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
                        Transform your documents into engaging content with AI. Follow these simple steps to get started with LangGenie.
                    </p>
                </motion.div>

                {/* Steps Section */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className={`relative group cursor-pointer ${
                                    activeStep === step.id ? 'scale-105' : ''
                                } transition-all duration-300`}
                                onClick={() => setActiveStep(step.id)}
                            >
                                <div className="glass rounded-2xl p-8 h-full relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                                    {/* Step number */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {step.id}
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-6 text-purple-300 group-hover:text-pink-300 transition-colors duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-white font-bold text-2xl mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/70 mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Details */}
                                    <ul className="space-y-2 mb-6">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center text-white/60 text-sm">
                                                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Button */}
                                    <Link
                                        to={step.link}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        {step.action}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>

                                    {/* Decorative elements */}
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Use Cases Section */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Perfect For</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            LangGenie is designed to help various users transform their documents into valuable content
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={useCase.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="glass rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group-hover:-translate-y-2">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                                        {useCase.icon}
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-2">{useCase.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{useCase.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose LangGenie?</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Powerful features that make content generation effortless and efficient
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-white/60 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-4xl mx-auto px-6 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-12 text-center"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Upload your first document and experience the power of AI-driven content generation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/rag"
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                            >
                                Start Creating Content
                            </Link>
                            <Link
                                to="/tool"
                                className="px-8 py-4 glass text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
                            >
                                Explore Knowledge Base
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};
