
import React from 'react';

const HeroTypewriter = () => {
    return (
        <div className="typewriter-container">
            <h1 className="typewriter-h1" aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter"></span>
            </h1>

            <h1 className="typewriter-h1" aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter thick"></span>
            </h1>

            <h1 className="typewriter-h1" aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter nocaret"></span>
            </h1>
        </div>
    );
};

export default HeroTypewriter;
