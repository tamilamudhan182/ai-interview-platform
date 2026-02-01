import type { Question } from './types';

// Mock Question Bank
const questionBank: Record<'easy' | 'medium' | 'hard', Question[]> = {
    easy: [
        { id: 'e1', text: 'Explain the concept of Virtual DOM.', difficulty: 'easy', category: 'Technical' },
        { id: 'e2', text: 'What is the difference between let and var?', difficulty: 'easy', category: 'Technical' },
        { id: 'e3', text: 'Tell me about yourself.', difficulty: 'easy', category: 'Behavioral' },
    ],
    medium: [
        { id: 'm1', text: 'How does React handle state management complications?', difficulty: 'medium', category: 'Technical' },
        { id: 'm2', text: 'Explain the useEffect dependency array common pitfalls.', difficulty: 'medium', category: 'Technical' },
        { id: 'm3', text: 'Describe a time you had a conflict with a teammate.', difficulty: 'medium', category: 'Behavioral' },
    ],
    hard: [
        { id: 'h1', text: 'Design a scalable frontend architecture for a high-traffic e-commerce site.', difficulty: 'hard', category: 'System Design' },
        { id: 'h2', text: 'How would you optimize specific React performance bottlenecks in a large list?', difficulty: 'hard', category: 'Technical' },
        { id: 'h3', text: 'Explain the event loop and microtask queue in detail.', difficulty: 'hard', category: 'Technical' },
    ]
};

// State to track asked questions to avoid repeats during a session
let askedQuestionIds: Set<string> = new Set();

export const resetQuestionHistory = () => {
    askedQuestionIds.clear();
};

export const getNextQuestion = (currentDifficulty: 'easy' | 'medium' | 'hard'): Question => {
    const candidates = questionBank[currentDifficulty].filter(q => !askedQuestionIds.has(q.id));

    // If we ran out of questions in this tier, just pick random one (fallback)
    const pool = candidates.length > 0 ? candidates : questionBank[currentDifficulty];

    const question = pool[Math.floor(Math.random() * pool.length)];
    askedQuestionIds.add(question.id);

    return question;
};
