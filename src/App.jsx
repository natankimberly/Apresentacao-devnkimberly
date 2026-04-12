import { useState, useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import NeuralBackground from "./components/NeuralBackground";
import TerminalBoot from "./components/TerminalBoot";
import CorporateHeader from "./components/CorporateHeader";
import HeroTypewriter from "./components/HeroTypewriter";
import TimelineSection from "./components/TimelineSection";
import ProjectGrid from "./components/ProjectGrid";
import ContactFooter from "./components/ContactFooter";
import ProjectsShowcase from "./components/ProjectsShowcase";
import PhotoGallery from "./components/PhotoGallery";
import ServicesFaq from "./components/ServicesFaq";
import DevelopersSection from "./components/DevelopersSection";
import SeoContractProjectsJsonLd from "./components/SeoContractProjectsJsonLd";
import { Code2, ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.9, 0.98], [1, 1, 0]);

  return (
    <Motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none transition-opacity duration-300"
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
      <SeoContractProjectsJsonLd />
      <NeuralBackground />

      {!bootComplete && (
        <TerminalBoot onComplete={() => setBootComplete(true)} />
      )}

      <CorporateHeader visible={bootComplete} />

      {bootComplete && <ScrollIndicator />}

      <div
        ref={containerRef}
        className={`relative transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative w-full flex flex-col pt-16 md:pt-20">
          <HeroTypewriter />

          <div className="relative z-10 w-full">
            <ProjectsShowcase />
          </div>

          <div className="relative z-10 w-full mt-0 md:-mt-12">
            <PhotoGallery />
          </div>

          <div className="relative z-10 text-center mt-12 mb-8 px-4">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-900/80 border border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Code2 size={36} className="mr-3 md:w-10 md:h-10" />
              <span className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
                Portfólio
              </span>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-sm md:text-base">
              Soluções reais — de plataformas próprias a sistemas críticos para
              clientes.
            </p>
          </div>

          <div className="relative z-10 w-full mb-8">
            <ProjectGrid />
          </div>

          <ServicesFaq />

          <div className="relative z-10 w-full">
            <TimelineSection />
          </div>

          <DevelopersSection />

          <div className="relative z-10 w-full border-t border-white/10 bg-slate-950/80">
            <ContactFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
