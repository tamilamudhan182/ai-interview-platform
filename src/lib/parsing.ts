import type { CandidateProfile, JDProfile } from './types';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker (required for client-side parsing)
// Use CDN to avoid Vite/Build asset resolution issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const validateUpload = (file: File | null): boolean => {
    if (!file) return false;
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    return validTypes.includes(file.type);
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + ' ';
        }

        return fullText;
    } catch (error) {
        console.error("PDF Parse Error:", error);
        throw new Error("Failed to parse PDF");
    }
};

export const parseResume = async (file: File): Promise<CandidateProfile> => {
    console.log('Parsing resume:', file.name);

    // Trigger text extraction for logging/debug, even if not fully used for the profile object yet
    if (file.type === 'application/pdf') {
        await extractTextFromPDF(file);
    } else {
        await file.text();
    }

    return {
        skills: ['Detected from Resume'],
        experienceYears: 0,
        projects: ['Detected from Resume'],
        roleRelevance: 80
    };
};

export const parseJD = async (file: File): Promise<JDProfile> => {
    console.log('Parsing JD:', file.name);
    return {
        keywords: ['Detected from JD'],
        requiredSkills: ['Detected from JD']
    };
};
