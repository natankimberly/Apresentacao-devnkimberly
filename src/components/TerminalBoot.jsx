import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";

const BOOT_TEXT =
  "[SISTEMA]: Inicializando ecossistema de inovação App Evolua Software...";

const TerminalBoot = ({ onComplete }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= BOOT_TEXT.length) {
        setDisplayed(BOOT_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete(), 600);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 480);
    return () => clearInterval(t);
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black font-mono text-green-400 text-base sm:text-lg md:text-xl px-6"
    >
      <div className="max-w-4xl w-full text-left leading-relaxed">
        <span className="text-green-500/90">{"> "}</span>
        <span>{displayed}</span>
        {showCursor && (
          <span className="inline-block w-2 h-5 ml-0.5 align-middle bg-green-400" />
        )}
      </div>
    </Motion.div>
  );
};

export default TerminalBoot;
