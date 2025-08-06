import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, 
    Zap, 
    Globe,
    FileText,
    MessageSquare,
    Mic,
    PenTool,
    Code,
    Database,
    Rocket,
    TrendingUp,
    Brain,
    ChevronDown,
    ChevronUp,
    ExternalLink
} from 'lucide-react';

const technologies = [
    {
        name: "LLaMA 3.1",
        description: "Meta's advanced large language model for intelligent content generation",
        icon: <Brain className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500"
    },
    {
        name: "FAISS",
        description: "Facebook AI Similarity Search for efficient vector storage and retrieval",
        icon: <Database className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500"
    },
    {
        name: "React 18",
        description: "Modern frontend framework with server components and concurrent features",
        icon: <Code className="w-6 h-6" />,
        color: "from-green-500 to-teal-500"
    },
    {
        name: "FastAPI",
        description: "High-performance Python web framework for building APIs",
        icon: <Rocket className="w-6 h-6" />,
        color: "from-orange-500 to-red-500"
    }
];

const contentTypes = [
    {
        type: "Q&A Mode",
        icon: <MessageSquare className="w-8 h-8" />,
        description: "Interactive question-answering from your documents",
        features: [
            "Context-aware responses",
            "Multi-turn conversations",
            "Source attribution",
            "Instant answers"
        ],
        color: "from-blue-500 to-blue-600"
    },
    {
        type: "Speech Generator",
        icon: <Mic className="w-8 h-8" />,
        description: "Transform content into compelling presentations",
        features: [
            "Structured speech format",
            "Rhetorical devices",
            "Engaging openings & closings",
            "Audience-appropriate tone"
        ],
        color: "from-green-500 to-green-600"
    },
    {
        type: "Article Writer",
        icon: <FileText className="w-8 h-8" />,
        description: "Create comprehensive, well-structured articles",
        features: [
            "Professional formatting",
            "Research-backed content",
            "SEO-friendly structure",
            "Citation support"
        ],
        color: "from-purple-500 to-purple-600"
    },
    {
        type: "Blog Creator",
        icon: <PenTool className="w-8 h-8" />,
        description: "Generate engaging, conversational blog posts",
        features: [
            "Conversational tone",
            "Catchy headlines",
            "Call-to-action endings",
            "Social media ready"
        ],
        color: "from-pink-500 to-pink-600"
    }
];

const faqs = [
    {
        question: "What file formats are supported?",
        answer: "Currently, LangGenie supports PDF files up to 50MB in size. We're working on adding support for Word documents, PowerPoint presentations, and other common formats."
    },
    {
        question: "How accurate is the AI-generated content?",
        answer: "LangGenie uses the advanced LLaMA 3.1 model with RAG (Retrieval-Augmented Generation) to ensure high accuracy. The AI only uses information from your uploaded documents and doesn't hallucinate facts."
    },
    {
        question: "Can I use LangGenie for commercial purposes?",
        answer: "Yes! LangGenie can be used for commercial content creation, research, presentations, and more. The generated content is yours to use as needed."
    },
    {
        question: "Is my data secure?",
        answer: "Your documents are processed locally and never stored permanently. We prioritize privacy and security in all our operations."
    },
    {
        question: "Do I need GPU acceleration?",
        answer: "While GPU acceleration significantly speeds up processing, LangGenie can run on CPU-only systems. For the best experience, we recommend using a system with NVIDIA GPU support."
    },
    {
        question: "Can I integrate LangGenie with my existing workflow?",
        answer: "LangGenie provides REST APIs that can be integrated into your existing applications and workflows. Documentation and examples are available in our developer resources."
    }
];

const stats = [
    { number: "50+", label: "Content Types", icon: <FileText className="w-6 h-6" /> },
    { number: "10x", label: "Faster Processing", icon: <Zap className="w-6 h-6" /> },
    { number: "99%", label: "Accuracy Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "24/7", label: "Availability", icon: <Globe className="w-6 h-6" /> }
];

export const LearnMore = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pt-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 px-6"
                >
                    <div className="flex items-center justify-center mb-6">
                        <BookOpen className="w-12 h-12 text-purple-300 mr-4 animate-pulse" />
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Learn More
                        </h1>
                    </div>
                    <p className="text-white/70 text-xl max-w-4xl mx-auto leading-relaxed">
                        Discover the power of AI-driven content generation. Learn about our technology, features, and how LangGenie can transform your workflow.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
                                    <div className="text-purple-300 mb-3 flex justify-center">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                                    <div className="text-white/60 text-sm">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Powered by Cutting-Edge Technology</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Built on a foundation of advanced AI models and modern web technologies for superior performance
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="glass rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group-hover:-translate-y-2">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mb-4`}>
                                        {tech.icon}
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-2">{tech.name}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{tech.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Content Types Deep Dive */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Content Generation Modes</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Each mode is specifically designed with unique prompts and optimizations for different content types
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {contentTypes.map((content, index) => (
                            <motion.div
                                key={content.type}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`p-3 rounded-full bg-gradient-to-br ${content.color} text-white mr-4`}>
                                        {content.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl">{content.type}</h3>
                                        <p className="text-white/60 text-sm">{content.description}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h4 className="text-white font-semibold text-sm mb-2">Key Features:</h4>
                                    <ul className="space-y-1">
                                        {content.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-white/60 text-sm">
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Understanding the RAG (Retrieval-Augmented Generation) architecture behind LangGenie
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-2xl p-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">1. Document Processing</h3>
                                <p className="text-white/60 text-sm">PDF is parsed and split into chunks, then converted to vector embeddings using advanced NLP models.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <Database className="w-8 h-8" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">2. Vector Search</h3>
                                <p className="text-white/60 text-sm">FAISS performs similarity search to find the most relevant content chunks for your query.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">3. AI Generation</h3>
                                <p className="text-white/60 text-sm">LLaMA 3.1 generates contextually accurate content using retrieved information and specialized prompts.</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-white/70 text-lg">
                            Get answers to common questions about LangGenie
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-white font-semibold">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-purple-300" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-purple-300" />
                                    )}
                                </button>
                                
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-6 pb-4"
                                    >
                                        <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="max-w-4xl mx-auto px-6 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-12 text-center"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience LangGenie?</h2>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are already transforming their documents into engaging content with AI.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/get-started"
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                            >
                                Get Started Now
                            </a>
                            <a
                                href="https://github.com/your-username/LangGenie"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 glass text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 inline-flex items-center"
                            >
                                View on GitHub
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};
