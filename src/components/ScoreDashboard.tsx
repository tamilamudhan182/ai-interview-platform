import React, { useEffect, useState } from 'react';
import type { Score, Question, Answer } from '../lib/types';
import { calculateScore } from '../lib/scoring';
import { evaluateInterviewFn } from '../lib/gemini';
import { Trophy, Target, Clock, Zap, MessageSquare, Loader2 } from 'lucide-react';

interface ScoreDashboardProps {
    answers: Answer[];
    questions?: Question[]; // Made optional to match calls, but we need them for AI
}

// Helper to pass questions via props if possible, or we could fetch them
// BUT: Simpler approach -> The parent (App or Logic) should calculate score using AI and pass it down.
// Refactoring: Dashboard should just DISPLAY score. Calculation should happen in Controller.
// HOWEVER, to keep changes local, I will do the calculation here on mount if 'score' isn't passed.
// Wait, previous impl calculated it here. Let's upgrade it.

const ScoreDashboard: React.FC<ScoreDashboardProps & { questionsData?: Question[] }> = ({ answers, questionsData }) => {
    const [scoreData, setScoreData] = useState<Score | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScore = async () => {
            if (questionsData && questionsData.length > 0) {
                // Real AI Scoring
                const aiScore = await evaluateInterviewFn(questionsData, answers);
                setScoreData(aiScore);
            } else {
                // Fallback to Mock Scoring if no questions provided
                const mockScore = calculateScore(answers);
                setScoreData(mockScore);
            }
            setLoading(false);
        };

        fetchScore();
    }, [answers, questionsData]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-white min-h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold">Analyzing Interview Session...</h2>
                <p className="text-gray-400 mt-2">Gemini AI is evaluating your answers for accuracy and depth.</p>
            </div>
        );
    }

    if (!scoreData) return null;

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Interview Results</h2>
                <div className="text-gray-400">AI-Powered Assessment</div>
            </div>

            {/* Main Score Card */}
            <div className="bg-[#1a1d2d] rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <div className="text-sm font-medium text-blue-400 mb-1">OVERALL PERFORMANCE</div>
                        <div className="text-5xl font-bold text-white mb-2">{scoreData.finalScore}%</div>
                        <div className="text-gray-400">Weighted score based on accuracy, depth, and clarity.</div>
                    </div>

                    <div className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="45%" className="stroke-gray-800 fill-none" strokeWidth="8" />
                            <circle
                                cx="50%" cy="50%" r="45%"
                                className="stroke-blue-500 fill-none transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * scoreData.finalScore) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <Trophy className="absolute w-10 h-10 text-yellow-500" />
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard icon={<Target className="text-green-400" />} label="Accuracy" value={scoreData.accuracy} />
                <MetricCard icon={<MessageSquare className="text-purple-400" />} label="Clarity" value={scoreData.clarity} />
                <MetricCard icon={<Zap className="text-yellow-400" />} label="Depth" value={scoreData.depth} />
                <MetricCard icon={<Clock className="text-red-400" />} label="Relevance" value={scoreData.relevance} />
            </div>

            {/* AI Feedback */}
            <div className="bg-[#1a1d2d] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    AI Feedback & Recommendations
                </h3>
                <div className="space-y-4">
                    {scoreData.feedback.map((point, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-400">
                                {i + 1}
                            </div>
                            <p className="text-gray-300 leading-relaxed">{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                    Start New Session
                </button>
            </div>
        </div>
    );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) => (
    <div className="bg-[#1a1d2d] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-2xl font-bold text-white">{value}%</div>
        </div>
    </div>
);

export default ScoreDashboard;
