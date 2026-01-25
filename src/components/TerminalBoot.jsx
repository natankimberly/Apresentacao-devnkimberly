import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  "Inicializando currículo Natã Kimberly...",
  "Verificando competências de Infraestrutura e Desenvolvimento... OK",
  "Carregando projetos SaaS... OK",
  "Carregando projetos de IA... OK",
  "Acesso concedido."
];

const TerminalBoot = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      setTimeout(() => onComplete(), 1000); // Delay before closing
      return;
    }

    const currentLineText = bootLines[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= currentLineText.length) {
        setLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLineText.slice(0, charIndex);
          return newLines;
        });
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setLines(prev => [...prev, ""]); // Prepare next line
        }, 500); // Pause between lines
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [currentLineIndex, onComplete]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 font-mono text-green-500 text-xl md:text-2xl"
    >
      <div className="w-full max-w-4xl p-10 border-2 border-green-500/30 rounded-xl bg-black/60 backdrop-blur-md shadow-[0_0_80px_rgba(34,197,94,0.15)]">
        <div className="flex flex-col gap-2">
            {lines.map((line, index) => (
            <div key={index} className="flex">
                <span className="mr-2">{'>'}</span>
                <span>{line}</span>
                {index === currentLineIndex && showCursor && (
                   <span className="inline-block w-2.5 h-5 ml-1 bg-green-500 align-middle"></span>
                )}
            </div>
            ))}
        </div>
      </div>
    </Motion.div>
  );
};

export default TerminalBoot;
