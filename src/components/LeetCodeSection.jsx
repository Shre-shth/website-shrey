import React, { useEffect, useState } from 'react';
import { fetchLeetCodeStats } from '../utils/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const LeetCodeSection = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchLeetCodeStats('Shre-shth').then(setData);
    }, []);

    const chartData = data ? [
        { name: 'Easy', value: data.easySolved, color: '#00b8a3' },
        { name: 'Medium', value: data.mediumSolved, color: '#ffc01e' },
        { name: 'Hard', value: data.hardSolved, color: '#ff375f' },
    ] : [];

    return (
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="h-8 brightness-0 invert" />
                <h3 className="text-xl font-bold text-gray-200">LeetCode Stats</h3>
            </div>

            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                {/* Donut Chart / Total */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-gray-100">{data?.totalSolved || '-'}</span>
                        <span className="text-xs text-gray-500">Solved</span>
                    </div>
                </div>

                {/* Detailed Stats */}
                <div className="flex-grow w-full space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Global Ranking</span>
                        <span className="font-mono text-white">{data?.ranking?.toLocaleString() || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Acceptance Rate</span>
                        <span className="font-mono text-white">{data?.acceptanceRate}%</span>
                    </div>

                    <div className="space-y-2 mt-4">
                        {chartData.map((item) => (
                            <div key={item.name} className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-300">
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${(item.value / (data?.totalSolved || 1)) * 100}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeetCodeSection;
