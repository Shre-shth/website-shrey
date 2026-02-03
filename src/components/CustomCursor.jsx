import React, { useEffect, useRef } from 'react';
import { createAnimatable, animate, stagger } from 'animejs';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Create trail elements
        const trailCount = 5;
        const cursorContainer = cursorRef.current;

        for (let i = 0; i < trailCount; i++) {
            const el = document.createElement('div');
            el.className = 'fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-50 opacity-50';
            cursorContainer.appendChild(el);
        }

        const items = cursorContainer.querySelectorAll('div');

        // Initial cursor implementation
        // Note: createAnimatable is for value generation, we need to animate the divs to follow mouse
        // Since createAnimatable might be for simpler values, let's use a standard mouse text approach or stagger

        // Actually, user requested createAnimatable and a circular trail.
        // Let's approximate a smooth trailing effect.

        const handleMouseMove = (e) => {
            animate(items, {
                left: e.clientX - 8,
                top: e.clientY - 8,
                delay: stagger(20),
                duration: 400,
                ease: 'outExpo'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default CustomCursor;
