import React from 'react';

const FeedbackPanel: React.FC = () => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-bold text-white mb-4">AI Feedback</h3>
            <ul className="space-y-4">
                <li className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <p className="text-gray-300">Great use of STAR method in your answer.</p>
                </li>
                <li className="flex gap-3">
                    <span className="text-yellow-400 flex-shrink-0">⚠</span>
                    <p className="text-gray-300">Try to reduce filler words like "um" and "uh".</p>
                </li>
                <li className="flex gap-3">
                    <span className="text-blue-400 flex-shrink-0">ℹ</span>
                    <p className="text-gray-300">Your pacing was slightly fast at the beginning.</p>
                </li>
            </ul>
        </div>
    );
};

export default FeedbackPanel;
