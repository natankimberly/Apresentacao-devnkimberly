import { useState, useEffect, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import SpecularButton from "./react-bits/SpecularButton";

const SUFFIXES = [
  "sua empresa",
  "seu negócio",
  "seu atendimento",
  "sua equipe",
  "sua gestão",
  "seu sistema",
  "Software",
];

const TYPE_MS = 50;
const DELETE_MS = 30;
const HOLD_MS_DEFAULT = 2600;
const HOLD_MS_SOFTWARE = 5600;

const HeroTypewriter = () => {
  const [suffixIndex, setSuffixIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fullSuffix = useMemo(() => SUFFIXES[suffixIndex] ?? "", [suffixIndex]);
  const isSoftware = fullSuffix === "Software";

  useEffect(() => {
    let t;

    if (!deleting) {
      if (text.length < fullSuffix.length) {
        t = setTimeout(() => {
          setText(fullSuffix.slice(0, text.length + 1));
        }, TYPE_MS);
      } else {
        const hold = isSoftware ? HOLD_MS_SOFTWARE : HOLD_MS_DEFAULT;
        t = setTimeout(() => setDeleting(true), hold);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, DELETE_MS);
      } else {
        t = setTimeout(() => {
          setDeleting(false);
          setSuffixIndex((i) => (i + 1) % SUFFIXES.length);
        }, 0);
      }
    }

    return () => clearTimeout(t);
  }, [text, deleting, fullSuffix, isSoftware]);

  const suffixClass = isSoftware
    ? "bg-linear-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent"
    : "text-amber-200/95";

  const cursorClass = isSoftware ? "bg-cyan-300" : "bg-amber-400/90";

  return (
    <section
      id="topo"
      className="relative z-10 flex min-h-[72vh] flex-col justify-center px-4 pb-16 pt-28 text-left sm:px-6 md:min-h-[78vh] md:px-8 md:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 max-w-3xl text-sm font-medium uppercase tracking-[0.25em] text-slate-400 md:text-base"
        >
          Soluções em software para a sua empresa
        </Motion.p>

        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:max-w-5xl md:text-6xl lg:text-7xl"
        >
          <span className="cursor-target bg-linear-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
            Evolua{" "}
          </span>
          <span className={`cursor-target font-mono ${suffixClass}`}>
            {text}
            <span
              className={`ml-0.5 inline-block h-[0.85em] w-0.5 translate-y-0.5 animate-pulse align-middle ${cursorClass}`}
            />
          </span>
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 max-w-2xl text-base text-slate-400 md:text-lg"
        >
          Somos a App Evolua Software: criamos programas e aplicativos sob medida
          para o seu negócio, do primeiro contato até o sistema funcionando, com
          atenção à segurança e ao que faz sentido para quem vai usar.
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <SpecularButton
            size="md"
            radius={999}
            tint="#22d3ee"
            tintOpacity={0.14}
            textColor="#ecfeff"
            lineColor="#67e8f9"
            baseColor="#164e63"
            intensity={1.15}
            className="cursor-target"
            onClick={() => {
              document
                .getElementById("contato")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Solicitar Orçamento
          </SpecularButton>
        </Motion.div>
      </div>
    </section>
  );
};

export default HeroTypewriter;
