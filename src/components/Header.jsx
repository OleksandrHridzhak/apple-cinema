import React from 'react';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-800 shadow-2xl z-50 border-b border-blue-700/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 relative">

                    <div className="flex-shrink-0">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-50 to-white bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                            KINOLAND
                        </h1>
                    </div>

                    <nav className="hidden md:flex space-x-5 items-center">
                        <a 
                            href="/home" 
                            className="relative group px-3 py-2 transition-all duration-300 hover:text-blue-100"
                        >
                            <span className="text-white group-hover:text-blue-200 transition-colors">
                                Головна
                            </span>
                        </a>
                        <a 
                            href="/movies" 
                            className="relative group px-3 py-2 transition-all duration-300 hover:text-blue-100"
                        >
                            <span className="text-white group-hover:text-blue-200 transition-colors">
                                Фільми
                            </span>
                        
                        </a>
                        <a 
                            href="/about" 
                            className="relative group px-3 py-2 transition-all duration-300 hover:text-blue-100"
                        >
                            <span className="text-white group-hover:text-blue-200 transition-colors">
                                Про нас
                            </span>
                        
                        </a>
                        <a 
                            href="/contact" 
                            className="relative group px-3 py-2 transition-all duration-300 hover:text-blue-100"
                        >
                            <span className="text-white group-hover:text-blue-200 transition-colors">
                                Контакти
                            </span>
                        
                        </a>
                        <div className="h-6 w-px bg-blue-600 mx-4" />
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full hover:shadow-lg transition-all duration-300 text-white">
                            Увійти
                        </button>
                    </nav>

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-blue-700/30 transition-all duration-200"
                        >
                            <div className="relative w-6 h-6">
                                <span className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'top-1/2 rotate-45' : 'top-1/3'}`} />
                                <span className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-1/2'}`} />
                                <span className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'top-1/2 -rotate-45' : 'top-2/3'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <nav className="px-2 pt-2 pb-3 space-y-2">
                        <a 
                            href="/home"
                            className="block px-4 py-3 rounded-xl bg-blue-800/50 hover:bg-blue-700/70 backdrop-blur-sm transition-all duration-200"
                        >
                            <span className="text-white font-medium">Головна</span>
                        </a>
                        <a 
                            href="/movies"
                            className="block px-4 py-3 rounded-xl bg-blue-800/50 hover:bg-blue-700/70 backdrop-blur-sm transition-all duration-200"
                        >
                            <span className="text-white font-medium">Фільми</span>
                        </a>
                        <a 
                            href="/about"
                            className="block px-4 py-3 rounded-xl bg-blue-800/50 hover:bg-blue-700/70 backdrop-blur-sm transition-all duration-200"
                        >
                            <span className="text-white font-medium">Про нас</span>
                        </a>
                        <a 
                            href="/contact"
                            className="block px-4 py-3 rounded-xl bg-blue-800/50 hover:bg-blue-700/70 backdrop-blur-sm transition-all duration-200"
                        >
                            <span className="text-white font-medium">Контакти</span>
                        </a>
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl hover:shadow-lg transition-all duration-300 text-white">
                            Увійти
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
