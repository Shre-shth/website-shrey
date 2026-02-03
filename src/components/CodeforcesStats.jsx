import React, { useEffect, useState } from 'react';
import { fetchCodeforcesData } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CodeforcesStats = () => {
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchCodeforcesData('Shre-shth').then(res => {
            if (res) {
                setData(res);
                processChartData(res.submissions);
            }
        });
    }, []);

    const processChartData = (submissions) => {
        if (!submissions) return;

        // Count problems by rating
        const ratingMap = {};
        submissions.forEach(sub => {
            if (sub.verdict === 'OK' && sub.problem.rating) {
                const rating = sub.problem.rating;
                ratingMap[rating] = (ratingMap[rating] || 0) + 1;
            }
        });

        const sortedData = Object.keys(ratingMap)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(rating => ({
                rating: parseInt(rating),
                count: ratingMap[rating]
            }));

        setChartData(sortedData);
    };

    // Color logic based on CF ranks
    const getBarColor = (rating) => {
        if (rating < 1200) return '#CCCCCC'; // Newbie
        if (rating < 1400) return '#77FF77'; // Pupil
        if (rating < 1600) return '#77DDBB'; // Specialist
        if (rating < 1900) return '#AAAAFF'; // Expert
        if (rating < 2100) return '#FF88FF'; // CM
        if (rating < 2400) return '#FFCC88'; // Master
        return '#FF3333'; // Grandmaster+
    };

    return (
        <div className="bg-[#1e2227] border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                <img src="https://codeforces.org/s/0/images/codeforces-logo-with-telegram.png" alt="Codeforces" className="h-8 brightness-0 invert" />
                <h3 className="text-xl font-bold text-gray-200">Codeforces Activity</h3>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#2b303b] p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Rating</p>
                    <p className="text-2xl font-mono font-bold text-yellow-500">
                        {data?.info?.rating || '-'}
                    </p>
                    <p
                        className="text-xs font-bold capitalize mt-1"
                        style={{ color: (data?.info?.rank || '').toLowerCase().includes('pupil') ? '#77FF77' : '#9ca3af' }}
                    >
                        {data?.info?.rank || 'unrated'}
                    </p>
                </div>
                <div className="bg-[#2b303b] p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Max Rating</p>
                    <p className="text-2xl font-mono font-bold text-orange-500">
                        {data?.info?.maxRating || '-'}
                    </p>
                    <p
                        className="text-xs font-bold capitalize mt-1"
                        style={{ color: (data?.info?.maxRank || '').toLowerCase().includes('pupil') ? '#77FF77' : '#9ca3af' }}
                    >
                        {data?.info?.maxRank || 'unrated'}
                    </p>
                </div>
            </div>

            {/* Graph */}
            <div className="flex-grow min-h-[250px] w-full">
                <p className="text-sm text-gray-400 mb-2">Problems by Rating</p>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="rating"
                            stroke="#8884d8"
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e2227', border: '1px solid #374151' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CodeforcesStats;
