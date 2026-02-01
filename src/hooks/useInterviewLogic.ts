import { useState, useEffect, useRef } from 'react';
import { extractTextFromPDF } from '../lib/parsing';
import { generateQuestionsFn } from '../lib/gemini';
import { speak, cancelSpeech } from '../lib/tts';
import { useSpeechRecognition } from './useSpeechRecognition';
import type { Question, Answer } from '../lib/types';

interface UseInterviewLogicProps {
    onComplete: (answers: Answer[], questions: Question[]) => void;
    maxQuestions?: number;
}

export const useInterviewLogic = ({ onComplete, maxQuestions = 10 }: UseInterviewLogicProps) => {
    const [stage, setStage] = useState<'idle' | 'setup' | 'interview' | 'complete'>('setup');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [timer, setTimer] = useState(120);

    const { startListening, stopListening, transcript, resetTranscript } = useSpeechRecognition();
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessingSetup, setIsProcessingSetup] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);

    const currentQuestion = questions[currentQuestionIndex] || null;

    useEffect(() => {
        if (stage === 'interview' && timer > 0) {
            intervalRef.current = setInterval(() => setTimer(p => p - 1), 1000);
        } else if (timer === 0 && isRecording) {
            handleStopRecording();
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [stage, timer, isRecording]);

    useEffect(() => {
        if (stage === 'interview' && currentQuestion) {
            const timeoutId = setTimeout(() => speak(currentQuestion.text), 500);
            return () => clearTimeout(timeoutId);
        }
    }, [currentQuestionIndex, stage]);

    const startSession = async (resume: File, jd: File | null, jobRole: string) => {
        setIsProcessingSetup(true);
        try {
            let resumeText = '';
            if (resume.type === 'application/pdf') {
                resumeText = await extractTextFromPDF(resume);
            } else {
                resumeText = await resume.text();
            }

            if (jd) {
                console.log("JD context provided (future use):", jd.name);
            }

            const generatedQuestions = await generateQuestionsFn(resumeText, jobRole);

            setQuestions(generatedQuestions);
            setCurrentQuestionIndex(0);
            setAnswers([]);
            setStage('interview');
        } catch (error) {
            console.error("Setup failed", error);
            alert("Failed to generate questions. Check console.");
        } finally {
            setIsProcessingSetup(false);
        }
    };

    const handleStartRecording = () => {
        cancelSpeech();
        setIsRecording(true);
        resetTranscript();
        startListening();
        startTimeRef.current = Date.now();
    };

    const handleStopRecording = () => {
        if (!currentQuestion) return;

        stopListening();
        setIsRecording(false);

        const duration = (Date.now() - startTimeRef.current) / 1000;
        const newAnswer: Answer = {
            questionId: currentQuestion.id,
            duration,
            transcript: transcript || "(Answer not captured)"
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (updatedAnswers.length >= Math.min(questions.length, maxQuestions)) {
            setStage('complete');
            onComplete(updatedAnswers, questions);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimer(120);
        }
    };

    return {
        stage,
        currentQuestion,
        timer,
        isRecording,
        transcript,
        isProcessingSetup,
        startSession,
        handleStartRecording,
        handleStopRecording
    };
};
