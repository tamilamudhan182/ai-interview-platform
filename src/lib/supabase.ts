import { createClient } from '@supabase/supabase-js';
import type { Score, Answer, Question } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing! Authentication will fail.");
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

// Database Service Functions

export const saveInterview = async (
    userId: string,
    jobRole: string,
    score: Score,
    answers: Answer[],
    questions: Question[]
) => {
    try {
        // 1. Insert Interview
        const { data: interview, error: interviewError } = await supabase
            .from('interviews')
            .insert({
                user_id: userId,
                job_role: jobRole,
                total_score: score.finalScore,
                feedback: score.feedback
            })
            .select()
            .single();

        if (interviewError) throw interviewError;

        // 2. Prepare Answers Data
        const answersData = answers.map(ans => {
            const question = questions.find(q => q.id === ans.questionId);
            return {
                interview_id: interview.id,
                question_text: question ? question.text : 'Unknown Question',
                answer_transcript: ans.transcript || '',
                duration: ans.duration
            };
        });

        // 3. Insert Answers
        const { error: answersError } = await supabase
            .from('answers')
            .insert(answersData);

        if (answersError) throw answersError;

        console.log("Interview saved successfully!");
        return interview;
    } catch (error) {
        console.error("Error saving interview:", error);
        throw error;
    }
};

export const getInterviewHistory = async (userId: string) => {
    const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching history:", error);
        return [];
    }
    return data;
};
