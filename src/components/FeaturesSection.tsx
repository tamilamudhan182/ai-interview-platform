import { Mic, Target, Zap } from 'lucide-react';

const FeaturesSection = () => {
    return (
        <div className="py-24" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Built to solve your interview anxiety
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our AI mimics real human interactions to ensure you're ready for anything a recruiter throws your way.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <Mic className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Real-time Sentiment Analysis</h3>
                        <p className="text-gray-400 leading-relaxed">
                            AI monitors your body language, tone, and pacing to provide instant feedback on how you're being perceived.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                            <Target className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Role-Specific Questions</h3>
                        <p className="text-gray-400 leading-relaxed">
                            From Software Engineering to Brand Management, get highly targeted technical and behavioral questions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-green-500/50 transition-all group">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                            <Zap className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Performance Scoring</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Detailed scorecards compare your performance against industry benchmarks and other candidates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
