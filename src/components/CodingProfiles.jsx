import React, { useEffect, useRef } from 'react';
import { animate, splitText, stagger } from 'animejs';
import GitHubSection from './GitHubSection';
import CodeforcesStats from './CodeforcesStats';
import LeetCodeSection from './LeetCodeSection';

const CodingProfiles = () => {
    const aboutRef = useRef(null);

    useEffect(() => {
        if (aboutRef.current) {
            // Accessible splitText
            const split = splitText(aboutRef.current, {
                words: true,
                chars: false,
                debug: false,
                accessible: true
            });

            const words = split.words;

            animate(words, {
                rotateX: ['-90deg', '0deg'],
                opacity: [0, 1],
                translateZ: [50, 0],
                delay: stagger(50),
                easing: 'easeOutExpo',
                duration: 800
            });
        }
    }, []);

    return (
        <section className="min-h-screen py-20 flex flex-col gap-12">
            {/* About Me / Intro */}
            <div className="max-w-3xl">
                <h2 className="text-4xl font-bold mb-8">Engineering Journey</h2>
                <p ref={aboutRef} className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed perspective-text">
                    Currently pursuing Electronics Engineering at IIT BHU.
                    Passionate about solving algorithmic challenges and merging creative frontend interactions with robust systems.
                </p>
            </div>

            {/* GitHub Section (Full Width) */}
            <GitHubSection />

            {/* Split Section (Codeforces & LeetCode) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
                <CodeforcesStats />
                <LeetCodeSection />
            </div>
        </section>
    );
};

export default CodingProfiles;
