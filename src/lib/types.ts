export interface Question {
    id: string;
    text: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
}

export interface Answer {
    questionId: string;
    duration: number; // in seconds
    audioUrl?: string; // Optional for now
    transcript?: string; // Captured text from STT
}

export interface Score {
    accuracy: number;
    clarity: number;
    depth: number;
    relevance: number;
    timeEfficiency: number;
    finalScore: number;
    feedback: string[];
}

export interface CandidateProfile {
    skills: string[];
    experienceYears: number;
    projects: string[];
    roleRelevance: number;
}

export interface JDProfile {
    keywords: string[];
    requiredSkills: string[];
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
}
