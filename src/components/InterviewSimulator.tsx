import React from 'react';
import { useInterviewLogic } from '../hooks/useInterviewLogic';
import InterviewSetup from './InterviewSetup';
import type { Answer, Question } from '../lib/types';

interface InterviewSimulatorProps {
    onComplete: (answers: Answer[], questions: Question[]) => void;
}

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ onComplete }) => {
    const {
        stage,
        currentQuestion,
        timer,
        isRecording,
        isProcessingSetup,
        startSession,
        handleStartRecording,
        handleStopRecording
    } = useInterviewLogic({ onComplete });

    // Format timer MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // 1. Setup Phase
    if (stage === 'setup' || stage === 'idle') {
        return <InterviewSetup onStart={startSession} isLoading={isProcessingSetup} />;
    }

    // 2. Loading State
    if (!currentQuestion) return (
        <div className="flex justify-center items-center h-64 text-white">
            Loading interview session...
        </div>
    );

    // 3. Interview Phase
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="bg-[#0f111a] border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start relative z-10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Mock Interview Session
                    </h2>

                    <div className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${timer < 30 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                        {formatTime(timer)}
                    </div>
                </div>

                {/* Content - Question */}
                <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 mt-10 mb-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        "{currentQuestion.text}"
                    </h3>
                    <p className="text-gray-400 text-lg">
                        Speak clearly and verify your microphone is active.
                    </p>

                    {/* Audio Visualizer (Blue Dots) */}
                    {isRecording && (
                        <div className="flex gap-2 mt-12 h-8 items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 bg-blue-500 rounded-full animate-pulse"
                                    style={{
                                        height: '12px',
                                        animationDelay: `${i * 0.15}s`,
                                        animationDuration: '0.8s'
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Controls */}
                <div className="flex justify-center relative z-10">
                    {!isRecording ? (
                        <button
                            onClick={handleStartRecording}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg shadow-blue-500/25"
                        >
                            Start Recording
                        </button>
                    ) : (
                        <button
                            onClick={handleStopRecording}
                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg shadow-red-500/25 animate-pulse"
                        >
                            End Answer
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default InterviewSimulator;
