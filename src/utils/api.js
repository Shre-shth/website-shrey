export const fetchCodeforcesData = async (handle) => {
    try {
        const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const infoData = await infoRes.json();

        const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
        const statusData = await statusRes.json();

        if (infoData.status === 'OK' && statusData.status === 'OK') {
            return {
                info: infoData.result[0],
                submissions: statusData.result
            };
        }
        throw new Error('Codeforces API Error');
    } catch (e) {
        console.error("Codeforces Fetch Error:", e);
        return null; // Return null to let UI handle loading/error state or show nothing
    }
};

export const fetchLeetCodeStats = async (username) => {
    try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
        if (!response.ok) throw new Error('LeetCode specific API fetch failed');

        const data = await response.json();

        // Calculate acceptance rate
        const totalSubmissions = data.matchedUserStats?.totalSubmissionNum?.find(s => s.difficulty === 'All')?.submissions || 0;
        const totalAccepted = data.matchedUserStats?.acSubmissionNum?.find(s => s.difficulty === 'All')?.submissions || 0;
        const acceptanceRate = totalSubmissions > 0 ? ((totalAccepted / totalSubmissions) * 100).toFixed(2) : 0;

        return {
            totalSolved: data.totalSolved,
            acceptanceRate: acceptanceRate,
            ranking: data.ranking,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved
        };
    } catch (e) {
        console.error("LeetCode Fetch Error:", e);
        return null;
    }
};

export const fetchGitHubStats = async (username) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (res.ok) return await res.json();
        throw new Error('GitHub API Error');
    } catch (e) {
        console.error("GitHub Fetch Error:", e);
        return [];
    }
};
