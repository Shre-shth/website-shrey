import React from 'react';
// import CustomCursor from './components/CustomCursor';

import Hero from './components/Hero';

import CodingProfiles from './components/CodingProfiles';
import ErrorBoundary from './components/ErrorBoundary';
import CanvasCursor from './components/CanvasCursor';
import WorkLifeBalance from './components/WorkLifeBalance';
import BackgroundLines from './components/BackgroundLines';
import MatrixIntro from './components/MatrixIntro';

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black">
        <BackgroundLines />
        <CanvasCursor />

        <MatrixIntro />

        <main className="relative z-10 px-6 py-20 md:px-16 max-w-full mx-auto flex flex-col gap-32">
          <Hero />
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-32">
            <CodingProfiles />
          </div>
          <WorkLifeBalance />

          <div className="scroll-container h-[20vh]"></div>
        </main>
      </div>
    </ErrorBoundary>
  );
}


export default App;
