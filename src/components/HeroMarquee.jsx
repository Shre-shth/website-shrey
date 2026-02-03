import React from 'react';

const HeroMarquee = () => {
    const marqueeText = "Shreshth Vishwakarma";

    const MarqueeContent = () => (
        <div className="marquee-track">
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
        </div>
    );

    return (
        <div className="hero-marquee-container mx-auto">
            <p className="hero-text-content mb-4 text-center md:text-left">
                Hello, I am
            </p>

            <div className="hero-marquee">
                {/* Blur Layer */}
                <div className="hero-marquee_blur" aria-hidden="true">
                    <MarqueeContent />
                </div>

                {/* Clear Layer */}
                <div className="hero-marquee_clear">
                    <MarqueeContent />
                </div>
            </div>

            <p className="hero-text-content mt-8 text-center md:text-left">
                2nd Year <span className="text-[#8bf] font-bold">Electronics</span> Engineering Student at <span className="text-[#8bf] font-bold">IIT (BHU) Varanasi</span>.<br />
                Building high-performance web applications, deep learning models, content writing, and diving into competitive programming with a creative edge.
            </p>
        </div>
    );
};

export default HeroMarquee;
