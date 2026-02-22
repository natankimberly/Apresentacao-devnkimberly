import { useState, useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import NeuralBackground from "./components/NeuralBackground";
import TerminalBoot from "./components/TerminalBoot";
import HeroAvatar from "./components/HeroAvatar";
import TimelineSection from "./components/TimelineSection";
import ProjectGrid from "./components/ProjectGrid";
import ContactFooter from "./components/ContactFooter";
import ProjectsShowcase from "./components/ProjectsShowcase";
import PhotoGallery from "./components/PhotoGallery";
import { Code2, ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  // Fade out as the user reaches the bottom (from 90% to 98% of the page)
  const opacity = useTransform(scrollYProgress, [0, 0.9, 0.98], [1, 1, 0]);

  return (
    <Motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none transition-opacity duration-300"
    >
      <span className="text-cyan-400 text-sm md:text-base font-bold font-mono mb-3 tracking-widest uppercase drop-shadow-lg">
        Role para explorar
      </span>
      <Motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="p-3 md:p-4 rounded-full bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      >
        <ChevronDown size={28} className="md:w-8 md:h-8" />
      </Motion.div>
    </Motion.div>
  );
};

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef(null);

  return (
    <div
      className={`relative min-h-screen bg-transparent text-white selection:bg-cyan-500/30 ${!bootComplete ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}
    >
      {/* Background is fixed */}
      <NeuralBackground />

      {/* Boot Screen */}
      {!bootComplete && (
        <TerminalBoot onComplete={() => setBootComplete(true)} />
      )}

      {/* Global Scroll Indicator */}
      {bootComplete && <ScrollIndicator />}

      {/* Main Content */}
      <div
        ref={containerRef}
        className={`relative transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}
      >
        {/* Normal flowing wrapper */}
        <div className="relative w-full flex flex-col pt-8 md:pt-16">
          {/* Projects Showcase Loop */}
          <div className="relative z-10 w-full mt-4 md:mt-8">
            <ProjectsShowcase />
          </div>

          {/* Photo Hover Gallery */}
          <div className="relative z-10 w-full mt-0 md:-mt-16">
            <PhotoGallery />
          </div>

          {/* Desenvolvimento Title Area */}
          <div className="relative z-10 text-center mt-20 mb-10">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-900/80 border border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Code2 size={40} className="mr-3" />
              <span className="text-3xl font-bold text-white uppercase tracking-widest">
                Desenvolvimento
              </span>
            </div>
          </div>

          <div className="relative z-10 w-full mb-12">
            <ProjectGrid />
          </div>

          {/* Timeline Section */}
          <div className="relative z-10 w-full">
            <TimelineSection />
          </div>

          {/* Footer Avatar */}
          <div className="relative z-10 w-full mt-12 pb-10 px-4 flex justify-center">
            <HeroAvatar />
          </div>

          {/* Footer */}
          <div className="relative z-10 w-full border-t border-white/10 bg-slate-950/80">
            <ContactFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
