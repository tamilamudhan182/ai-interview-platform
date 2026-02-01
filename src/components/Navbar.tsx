import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, loginWithGoogle, logout, isLoading } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogin = async () => {
        await loginWithGoogle();
        setIsLoginModalOpen(false);
    };

    return (
        <>
            <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                InterviewAI
                            </span>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <a href="#features" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Features</a>
                                <a href="#testimonials" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Testimonials</a>
                                <a href="#faq" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">FAQ</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-3 hover:bg-white/5 rounded-full pl-2 pr-1 py-1 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full border border-gray-700"
                                        />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-1 animate-fade-in-up">
                                            <div className="px-4 py-3 border-b border-gray-700">
                                                <p className="text-sm text-white font-medium truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                                                <UserIcon size={14} /> Profile
                                            </a>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center gap-2"
                                            >
                                                <LogOut size={14} /> Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="hidden md:block text-gray-300 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
                isLoading={isLoading}
            />
        </>
    );
};

export default Navbar;
