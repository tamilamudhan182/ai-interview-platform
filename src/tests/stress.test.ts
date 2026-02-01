import { describe, it, expect } from 'vitest';
import { calculateScore } from '../lib/scoring';
import type { Answer } from '../lib/types';

describe('Stress Testing: Scoring Engine', () => {
    it('should handle 1000 concurrent scoring requests under 500ms', () => {
        const startTime = performance.now();

        for (let i = 0; i < 1000; i++) {
            const answers: Answer[] = [
                { questionId: '1', duration: Math.random() * 100 },
                { questionId: '2', duration: Math.random() * 100 }
            ];
            calculateScore(answers);
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Processed 1000 candidates in ${duration.toFixed(2)}ms`);
        expect(duration).toBeLessThan(500); // Latency requirement
    });
});
