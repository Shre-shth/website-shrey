import React from 'react';
import '../styles/hero-animations.css';
import HeroMarquee from './HeroMarquee';
import HeroTypewriter from './HeroTypewriter';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-start pt-20 w-full">
            <HeroMarquee />
            <div className="my-20 w-full">
                <HeroTypewriter />
            </div>
        </section>
    );
};

export default Hero;
