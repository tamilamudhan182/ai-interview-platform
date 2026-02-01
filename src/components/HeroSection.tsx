import React from 'react';
import { Play } from 'lucide-react';

interface HeroSectionProps {
    onStart: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
    return (
        <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6 uppercase tracking-wider">
                            ● Next-Gen Career Coaching
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Master Your <br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Next Big Interview</span> <br />
                            with Adaptive AI
                        </h1>

                        <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                            Experience realistic, real-time mock interviews tailored to your dream role. Get instant feedback and land the job.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onStart}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-white cursor-pointer group"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Try a Free Mock Interview
                            </button>
                            <span className="text-gray-500 text-sm flex items-center justify-center sm:justify-start py-4">
                                No credit card required
                            </span>
                        </div>
                    </div>

                    {/* Graphical/UI Placeholder */}
                    <div className="relative">
                        <div className="relative rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-xl p-2 shadow-2xl">
                            <div className="aspect-video rounded-xl bg-gray-950 border border-gray-800 relative overflow-hidden flex flex-col items-center justify-center">
                                {/* Fake UI Elements */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-50">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono">LIVE AI SESSION</div>
                                </div>

                                {/* Simulated Waveform */}
                                <div className="flex items-center gap-1 h-12 mb-4">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-blue-500/50 rounded-full animate-pulse"
                                            style={{
                                                height: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="px-6 py-3 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-300 text-sm mb-2">
                                    Wait, tell me more about that project...
                                </div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest mt-2">AI Recruiter</div>
                            </div>
                        </div>

                        {/* Decor elements */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
