import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: "How accurate is the AI feedback?",
        a: "Our models are trained on over 100,000 successful tech and design interviews. We utilize advanced NLP and computer vision to achieve 98% correlation with human recruiter evaluations."
    },
    {
        q: "Is it biased?",
        a: "No. We have strictly audited our algorithms to remove demographic bias. The AI focuses purely on content relevance, confidence markers, and professional communication standards."
    },
    {
        q: "Which industries do you cover?",
        a: "We currently support 500+ roles across Tech, Finance, Healthcare, Marketing, and Education. We are constantly adding new role-specific question banks every week."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="py-24 max-w-4xl mx-auto px-4" id="faq">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Questions? We have answers.</h2>
                <p className="text-gray-400">Everything you need to know about InterviewAI.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-gray-800/40 border border-gray-700/50 rounded-xl overflow-hidden transition-all"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="font-bold text-lg text-white">{faq.q}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
