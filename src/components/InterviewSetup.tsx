import React, { useState } from 'react';
import { Upload, CheckCircle, Briefcase } from 'lucide-react';
import { validateUpload } from '../lib/parsing';

interface InterviewSetupProps {
    onStart: (resume: File, jd: File | null, jobRole: string) => void;
    isLoading: boolean;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onStart, isLoading }) => {
    const [resume, setResume] = useState<File | null>(null);
    const [jd, setJd] = useState<File | null>(null);
    const [jobRole, setJobRole] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jd') => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (validateUpload(file)) type === 'resume' ? setResume(file) : setJd(file);
            setError(null);
        }
    };

    const handleSubmit = () => {
        if (!resume) return setError('Resume is mandatory.');
        if (!jobRole.trim()) return setError('Please specify the Job Role.');
        onStart(resume, jd, jobRole);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="bg-[#0f111a] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
                <h2 className="text-3xl font-bold text-white">Setup Interview</h2>

                {/* Job Role Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Job Role</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="e.g. Frontend Developer, Data Scientist..."
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Questions will be tailored to this role.</p>
                </div>

                {/* Resume Upload */}
                <div className={`border-2 border-dashed rounded-xl p-8 transition-colors text-center ${resume ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 hover:border-gray-500 bg-gray-900/50'
                    }`}>
                    <input type="file" id="resume" className="hidden" onChange={(e) => handleFileChange(e, 'resume')} />
                    <label htmlFor="resume" className="cursor-pointer">
                        {resume ? (
                            <div className="flex items-center justify-center gap-2 text-green-400">
                                <CheckCircle className="w-6 h-6" /> <span className="truncate">{resume.name}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <Upload className="w-8 h-8" /> <span>Upload Resume (PDF)</span>
                            </div>
                        )}
                    </label>
                </div>

                {error && <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">{error}</div>}

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                    {isLoading ? 'Analyzing Profile...' : 'Generate Questions & Start'}
                </button>
            </div>
        </div>
    );
};

export default InterviewSetup;
