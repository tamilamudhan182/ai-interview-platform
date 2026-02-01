import { describe, it, expect, beforeEach } from 'vitest';
import { parseResume, validateUpload } from '../lib/parsing';
import { calculateScore } from '../lib/scoring';
import { getNextQuestion, resetQuestionHistory } from '../lib/questions';
import type { Answer } from '../lib/types';

// Mock File API for Node environment
class MockFile {
    name: string;
    size: number;
    type: string;
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
        this.size = 1024;
    }
}

// @ts-ignore
global.File = MockFile;

describe('Functional Testing: AI Interview Platform', () => {
    beforeEach(() => {
        resetQuestionHistory();
    });

    describe('1. Resume Parsing Logic', () => {
        it('should validate file uploads correctly', () => {
            const file = new File([''], 'resume.pdf', { type: 'application/pdf' });
            expect(validateUpload(file)).toBe(true);
            expect(validateUpload(null)).toBe(false);
        });

        it('should extract skills from resume file (Mock)', async () => {
            const file = new File([''], 'resume.pdf');
            const result = await parseResume(file);
            expect(result.skills).toContain('React');
            expect(result.skills).toContain('TypeScript');
        });
    });

    describe('2. Adaptive Question Logic', () => {
        it('should return a question of the requested difficulty', () => {
            const easyQ = getNextQuestion('easy');
            expect(easyQ.difficulty).toBe('easy');
        });
    });

    describe('3. Scoring Engine', () => {
        it('should calculate clarity based on answer duration', () => {
            const answers: Answer[] = [
                { questionId: '1', duration: 45 },
                { questionId: '2', duration: 60 }
            ];
            const score = calculateScore(answers);
            expect(score.clarity).toBeGreaterThan(70);
        });
    });

});
