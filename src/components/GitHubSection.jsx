import React, { useEffect, useState } from 'react';

import { fetchGitHubStats } from '../utils/api';
import { GitCommit, Star, GitFork, Book } from 'lucide-react';

const GitHubSection = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetchGitHubStats('Shre-shth').then(data => {
            if (Array.isArray(data)) {
                // Sort by stars first, then updated
                const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
                setRepos(sorted);
            } else {
                setRepos([]);
            }
        });
    }, []);



    return (
        <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="bg-white text-black p-1 rounded-full">
                    <Book className="w-6 h-6" />
                </span>
                GitHub Activity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map(repo => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#0d1117] border border-gray-700 p-4 rounded-lg hover:border-gray-500 transition-colors flex flex-col justify-between h-full"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-blue-400 font-semibold">
                                <Book className="w-4 h-4" />
                                <span className="truncate">{repo.name}</span>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                                {repo.description || 'No description available'}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            {repo.language && (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                    {repo.language}
                                </span>
                            )}
                            {repo.stargazers_count > 0 && (
                                <span className="flex items-center gap-1 text-gray-300">
                                    <Star className="w-3 h-3" /> {repo.stargazers_count}
                                </span>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default GitHubSection;
