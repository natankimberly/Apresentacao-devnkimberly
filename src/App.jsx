import { useState, useRef, useMemo } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import NeuralBackground from "./components/NeuralBackground";
import TerminalBoot from "./components/TerminalBoot";
import CorporateHeader from "./components/CorporateHeader";
import HeroTypewriter from "./components/HeroTypewriter";
import TimelineSection from "./components/TimelineSection";
import ProjectGrid from "./components/ProjectGrid";
import ContactFooter from "./components/ContactFooter";
import PhotoGallery from "./components/PhotoGallery";
import DevelopersSection from "./components/DevelopersSection";
import SeoContractProjectsJsonLd from "./components/SeoContractProjectsJsonLd";
import Particles from "./components/react-bits/Particles";
import TargetCursor from "./components/react-bits/TargetCursor";
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

  const particleProps = useMemo(() => {
    const mobile =
      typeof window !== "undefined" && window.innerWidth < 768;
    return {
      particleCount: mobile ? 120 : 220,
      particleBaseSize: mobile ? 90 : 120,
      particleSpread: mobile ? 9 : 11,
      speed: 0.1,
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-transparent text-white selection:bg-cyan-500/30 ${!bootComplete ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}
    >
      <SeoContractProjectsJsonLd />

      {/* Fundo: neural + particles na mesma pilha (particles acima do canvas neural) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-slate-950">
        <NeuralBackground embedded />
        <div className="absolute inset-0 z-1">
          <Particles
            particleColors={["#ffffff", "#a5f3fc", "#e2e8f0"]}
            particleCount={particleProps.particleCount}
            particleSpread={particleProps.particleSpread}
            speed={particleProps.speed}
            particleBaseSize={particleProps.particleBaseSize}
            sizeRandomness={0.8}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1}
          />
        </div>
      </div>

      {!bootComplete && (
        <TerminalBoot onComplete={() => setBootComplete(true)} />
      )}

      <CorporateHeader visible={bootComplete} />

      {bootComplete && (
        <>
          <TargetCursor
            spinDuration={2.4}
            hideDefaultCursor
            parallaxOn
            cursorColor="#67e8f9"
            cursorColorOnTarget="#22d3ee"
          />
          <ScrollIndicator />
        </>
      )}

      <div
        ref={containerRef}
        className={`relative transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative w-full flex flex-col pt-20 md:pt-24">
          <HeroTypewriter />

          <div id="projetos" className="relative z-10 w-full scroll-mt-28">
            <PhotoGallery />
          </div>

          <div id="portfolio" className="relative z-10 text-center mt-12 mb-8 px-4 scroll-mt-28">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-900/80 border border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Code2 size={36} className="mr-3 md:w-10 md:h-10" />
              <span className="cursor-target text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
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
