import React from 'react';

interface CTASectionProps {
    onStart: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStart }) => {
    return (
        <div className="py-24 px-4">
            <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-fullblur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to land your dream job?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Join 10,000+ successful candidates today. Start your journey with a free mock interview session.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-6 py-4 rounded-xl bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-80"
                        />
                        <button
                            onClick={onStart}
                            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto shadow-xl"
                        >
                            Get Started Free
                        </button>
                    </div>

                    <div className="mt-8 flex justify-center gap-8 text-sm text-blue-200">
                        <span className="flex items-center gap-2">✓ No credit card</span>
                        <span className="flex items-center gap-2">✓ Instant access</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;
