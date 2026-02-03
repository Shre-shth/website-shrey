import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const MoireBackground = () => {
    const layer2Ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 50;
            const y = (clientY / window.innerHeight - 0.5) * 50;

            animate(layer2Ref.current, {
                translateX: x,
                translateY: y,
                rotate: x * 0.1,
                duration: 0, // Direct control
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505] pointer-events-none">
            {/* Static Layer */}
            <div className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" className="text-gray-600" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Interactive Layer */}
            <div ref={layer2Ref} className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20 mix-blend-overlay">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid2" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" className="text-gray-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid2)" />
                </svg>
            </div>
        </div>
    );
};

export default MoireBackground;
