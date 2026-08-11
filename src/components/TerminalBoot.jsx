import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import DecryptedText from "./react-bits/DecryptedText";

const BOOT_TEXT = "Portfólio Evolua Software";

const TerminalBoot = ({ onComplete }) => {
  const doneRef = useRef(false);

  useEffect(() => {
    // Fallback se a animação não disparar (mobile / reduced motion)
    const fallback = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
    }, 4200);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  useEffect(() => {
    const approxMs = BOOT_TEXT.length * 45 + 900;
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
    }, approxMs);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black px-6 font-mono text-green-400"
    >
      <div className="w-full max-w-4xl text-center text-xl sm:text-2xl md:text-4xl font-semibold tracking-wide">
        <DecryptedText
          text={BOOT_TEXT}
          animateOn="view"
          sequential
          speed={40}
          revealDirection="start"
          className="text-green-400"
          encryptedClassName="text-green-700/80"
          parentClassName="inline-block"
        />
      </div>
    </Motion.div>
  );
};

export default TerminalBoot;
