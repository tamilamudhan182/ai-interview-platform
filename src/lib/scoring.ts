import type { Answer, Score } from './types';

// Mock Scoring Engine based on the requested formula:
// finalScore = (accuracy*0.3 + clarity*0.2 + depth*0.2 + relevance*0.2 + time*0.1) * 100

export const calculateScore = (answers: Answer[]): Score => {
    // Simulate analysis logic
    const avgDuration = answers.reduce((acc, curr) => acc + curr.duration, 0) / answers.length;

    // Mock Metric Calculations
    // In a real app, these would come from NLP/Audio analysis
    const accuracy = Math.min(100, Math.max(0, 70 + Math.random() * 20)); // Base 70-90
    const clarity = avgDuration > 30 ? 90 : avgDuration > 10 ? 70 : 40;
    const depth = Math.min(100, avgDuration * 1.5); // Longer answers implies depth (mock)
    const relevance = 85; // Mock constant high relevance

    // Time efficiency: Optimal answer is between 30s-90s
    let timeEfficiency = 100;
    if (avgDuration < 10) timeEfficiency = 30; // Too short
    if (avgDuration > 120) timeEfficiency = 60; // Too long

    // Weighted Formula
    const rawScore = (
        (accuracy * 0.3) +
        (clarity * 0.2) +
        (depth * 0.2) +
        (relevance * 0.2) +
        (timeEfficiency * 0.1)
    );

    // Generate Feedback
    const feedback = generateFeedback(accuracy, clarity, timeEfficiency);

    return {
        accuracy: Math.round(accuracy),
        clarity: Math.round(clarity),
        depth: Math.round(depth),
        relevance: Math.round(relevance),
        timeEfficiency: Math.round(timeEfficiency),
        finalScore: Math.round(rawScore),
        feedback
    };
};

const generateFeedback = (accuracy: number, clarity: number, timeEfficiency: number): string[] => {
    const points = [];

    if (accuracy > 80) points.push("Strong technical accuracy in your responses.");
    else points.push("Try to be more precise with technical terminology.");

    if (clarity > 80) points.push("Your delivery was clear and well-paced.");
    else points.push("Avoid filler words and try to speak more confidently.");

    if (timeEfficiency < 50) points.push("Your answers were too short. Elaborate more.");
    else if (timeEfficiency > 90) points.push("Excellent time management per question.");

    return points;
};
