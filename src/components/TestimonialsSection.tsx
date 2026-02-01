
const testimonials = [
    {
        quote: "The real-time feedback changed my prep entirely. I could see exactly where my energy was dipping and fixed it before the big day.",
        name: "Sarah Jenkins",
        role: "Software Engineer at Google",
        avatar: "S"
    },
    {
        quote: "Realistic questions and great sentiment analysis. It felt just like my actual panel interview at Meta. Highly recommend!",
        name: "David Chen",
        role: "Product Manager at Meta",
        avatar: "D"
    },
    {
        quote: "I felt so much more confident in the actual room. The AI identified that I spoke too fast when nervous, and I practiced slowing down.",
        name: "Aisha Moore",
        role: "Data Scientist at Amazon",
        avatar: "A"
    }
];

const TestimonialsSection = () => {
    return (
        <div className="py-24 bg-gray-800/20" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
                    The Success of Our Candidates
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-800/60 p-8 rounded-2xl border border-gray-700/50">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j} className="text-yellow-500">★</span>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold text-white text-lg">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-sm text-blue-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
