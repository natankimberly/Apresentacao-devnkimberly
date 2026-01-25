import { useState, useRef } from 'react';
import { useScroll, useTransform, motion as Motion } from 'framer-motion';
import NeuralBackground from './components/NeuralBackground';
import TerminalBoot from './components/TerminalBoot';
import HeroAvatar from './components/HeroAvatar';
import TimelineSection from './components/TimelineSection'; // Replaced OrbitingCards
import ProjectGrid from './components/ProjectGrid';
import ContactFooter from './components/ContactFooter';
import { ChevronDown } from 'lucide-react';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className={`relative min-h-screen bg-transparent text-white selection:bg-cyan-500/30 ${!bootComplete ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
        {/* Background is fixed */}
        <NeuralBackground />

        {/* Boot Screen */}
        {!bootComplete && (
            <TerminalBoot onComplete={() => setBootComplete(true)} />
        )}

        {/* Main Content */}
        <div ref={containerRef} className={`relative transition-opacity duration-1000 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}>
            
             {/* 
                Hero Section Logic:
                The HeroAvatar is 'fixed' via CSS in its component.
                We need a spacer here to allow scrolling "up" to pin it? 
                Actually, HeroAvatar animates from bottom to top based on scroll 0 -> 0.2.
                So we need enough height to scroll 0.2 of the distance before the Timeline starts covering it?
                Or rather, the element is fixed.
             */}
             <div className="h-[250vh] relative"> 
                
                {/* Fixed Avatar Element that animates to Top */}
                <HeroAvatar scrollYProgress={scrollYProgress} />

                {/* Initial Scroll Hint */}
                <Motion.div 
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                    style={{ 
                        opacity: useTransform(scrollYProgress, [0, 0.80], [1, 0]) 
                    }}
                >
                    {/* Inner Content - Handles Entrance and Bounce */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 2, duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-sm md:text-2xl font-mono text-cyan-400 mb-2 shadow-black drop-shadow-md font-bold tracking-widest text-center whitespace-nowrap">ROLE PARA CONTINUAR</span>
                        <ChevronDown className="w-6 h-6 md:w-10 md:h-10 text-cyan-400 drop-shadow-md" />
                    </Motion.div>
                </Motion.div>

                {/* Timeline Section */}
                {/* Positioned absolute or essentially padding-top so it appears after the initial scroll phase. 
                    If we want it to scroll 'over' or 'under' or just appear?
                    Let's make it appear below the "header space".
                    Since HeroAvatar sticks to top-20px (approx), Timeline should start flowing in.
                    Reduced top offset to close the gap (was 100vh).
                */}
                <div className="relative z-10 w-full top-[60vh] pb-20">
                     <TimelineSection />
                     
                     {/* Projects Section - integrated in flow */}
                     <ProjectGrid />

                     {/* Footer */}
                     <ContactFooter />
                </div>
             </div>
        </div>
    </div>
  );
}

export default App;
