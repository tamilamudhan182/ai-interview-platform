import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import InterviewSimulator from './components/InterviewSimulator';
import ScoreDashboard from './components/ScoreDashboard';
import type { Answer, Question } from './lib/types';

function App() {
    const [view, setView] = useState<'hero' | 'interview' | 'results'>('hero');
    const [answers, setAnswers] = useState<Answer[]>([]);
    // Store questions for AI evaluation
    const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);

    const handleStartInterview = () => {
        setView('interview');
    };

    const handleInterviewComplete = (recordedAnswers: Answer[], questions: Question[]) => {
        setAnswers(recordedAnswers);
        setSessionQuestions(questions);
        setView('results');
    };

    return (
        <AuthProvider>
            <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
                <Navbar />

                <main className="pt-20">
                    {view === 'hero' && (
                        <>
                            <HeroSection onStart={handleStartInterview} />
                            <StatsSection />
                            <FeaturesSection />
                            <TestimonialsSection />
                            <FAQSection />
                            <CTASection onStart={handleStartInterview} />
                        </>
                    )}

                    {view === 'interview' && (
                        <div className="py-20 px-4">
                            <InterviewSimulator
                                onComplete={handleInterviewComplete}
                            />
                        </div>
                    )}

                    {view === 'results' && (
                        <div className="py-20 px-4">
                            <ScoreDashboard answers={answers} questionsData={sessionQuestions} />
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
