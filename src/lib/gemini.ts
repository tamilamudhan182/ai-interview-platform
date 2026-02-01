import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Question, Answer, Score } from "./types";

// Use environment variable for security
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

if (!API_KEY) {
  console.error("Missing VITE_GEMINI_API_KEY. AI features will not work.");
}

export const generateQuestionsFn = async (resumeText: string, jobRole: string): Promise<Question[]> => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a Senior Principal Engineer conducting a high-stakes technical interview for the role of ${jobRole}.
    Analyze the candidate's resume text below.

    GENERATE 10 UNIQUE, REAL-WORLD SCENARIO-BASED TECHNICAL QUESTIONS.

    STRICT GUIDELINES:
    1. NO "Textbook Definitions": Do NOT ask "What is X?" or "Define Y?".
    2. SCENARIO-FIRST: Frame every question as a real-world engineering problem.
       - BAD: "What is a deadlock?"
       - GOOD: "Our production database is experiencing frequent deadlocks during peak traffic. How would you debug and resolve this?"
    3. NO REPETITION: Ensure every question covers a completely different topic or angle.
    4. DEPTH & COMPLEXITY: Questions should test debugging, system design, architecture, and edge case handling.
    5. RESUME-TAILORED: If they list React, ask about React performance bottlenecks, not just "how useEffect works".

    Resume Text:
    ${resumeText.substring(0, 15000)}

    Format the output STRICTLY as a JSON Array of objects with this shape:
    [
      { "id": "q1", "text": "Question text here?", "difficulty": "easy", "category": "Technical" },
      { "id": "q2", "text": "Question text here?", "difficulty": "medium", "category": "System Design" },
      ...
    ]
    
    Do not wrap in markdown or code blocks, just return the raw JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [
      { id: 'err1', text: `Tell me about your experience as a ${jobRole}.`, difficulty: 'easy', category: 'Behavioral' },
      { id: 'err2', text: 'What is your strongest technical skill?', difficulty: 'easy', category: 'Technical' },
      { id: 'err3', text: 'Describe a challenging project you worked on.', difficulty: 'medium', category: 'Behavioral' }
    ];
  }
};

export const evaluateInterviewFn = async (questions: Question[], answers: Answer[]): Promise<Score> => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Combine Questions and Answers for context
  const transcriptText = questions.map((q) => {
    const ans = answers.find(a => a.questionId === q.id);
    return `Question (${q.difficulty}): ${q.text}\nCandidate Answer: "${ans?.transcript || '(No answer provided)'}"\n`;
  }).join('\n');

  const prompt = `
      You are an expert Interview Grader. Evaluate the following interview session.
      
      Transcript:
      ${transcriptText}

      Task:
      1. Analyze the candidate's answers for technical accuracy, clarity, and depth.
      2. Provide a score from 0-100 for each: Accuracy, Clarity, Depth, Relevance.
      3. Provide a final Weighted Score.
      4. Provide 3-5 specific, constructive feedback points on what they did well or missing.

      Format the output STRICTLY as a JSON object:
      {
        "accuracy": 85,
        "clarity": 90,
        "depth": 75,
        "relevance": 80,
        "timeEfficiency": 95, 
        "finalScore": 85,
        "feedback": ["Great explanation of X", "Missed edge case in Y", "Speak more confidently about Z"]
      }

      Do not wrap in markdown.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Evaluation Error:", error);
    return {
      accuracy: 0, clarity: 0, depth: 0, relevance: 0, timeEfficiency: 0, finalScore: 0,
      feedback: ["Error evaluating interview with AI.", "Please try again."]
    };
  }
};
