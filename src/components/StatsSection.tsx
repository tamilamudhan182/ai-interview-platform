
const stats = [
    { label: 'Interviews Conducted', value: '10k+' },
    { label: 'Success Rate', value: '92%' },
    { label: 'User Satisfaction', value: '4.9/5' },
    { label: 'Roles Covered', value: '500+' },
];

const StatsSection = () => {
    return (
        <div className="py-20 bg-transparent border-y border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </span>
                            <span className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
