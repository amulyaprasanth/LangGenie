import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="sticky z-20 w-full top-0 left-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <img src={logo} className="h-8 w-8 transition-transform group-hover:scale-110" alt="Logo"/>
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                    </div>
                    <span className="flex items-center text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        LangGenie
                        <Sparkles className="ml-2 h-5 w-5 text-purple-300 animate-pulse" />
                    </span>
                </Link>
                
                {/* Mobile menu button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/#about" className="nav-link">
                        About
                    </Link>
                    <Link to="/#services" className="nav-link">
                        Services
                    </Link>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg border-b border-white/10 md:hidden">
                        <div className="flex flex-col space-y-2 p-4">
                            <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                            <Link to="/#about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                                About
                            </Link>
                            <Link to="/#services" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                                Services
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
