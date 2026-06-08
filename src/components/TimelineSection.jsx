import { motion as Motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Target, Cpu } from 'lucide-react';

export const TimelineCard = ({
  title,
  icon,
  children,
  alignment,
  delay,
  compact = false,
  connectors = true,
}) => {
  const defaultOptions = {
    reverse: false,
    max: 20,
    perspective: 1000,
    scale: 1.02,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    gyro: true,
  };

  const connectorTop = compact ? "top-8" : "top-10";
  const dotTop = compact ? "top-7" : "top-9";

  return (
    <Motion.div
      initial={{ opacity: 0, x: alignment === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: delay, type: "spring" }}
      className={`relative w-full ${connectors ? `md:w-[45%] ${compact ? "mb-8 md:mb-10" : "mb-12"} ${alignment === "left" ? "md:mr-auto" : "md:ml-auto"}` : "mb-0 h-full"}`}
    >
      {connectors && (
        <>
          <div
            className={`hidden md:block absolute ${connectorTop} w-[55%] h-[2px] bg-linear-to-r from-cyan-500/50 to-transparent ${alignment === "left" ? "right-[-55%] rotate-0" : "left-[-55%] rotate-180"}`}
          ></div>
          <div
            className={`hidden md:block absolute ${dotTop} w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan] ${alignment === "left" ? "right-[-55px]" : "left-[-55px]"}`}
          ></div>
        </>
      )}

      <Tilt options={defaultOptions} className="block h-full min-h-0">
        <div
          className={`flex min-h-0 flex-col rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors shadow-2xl group ${compact ? "p-6 md:p-8" : "p-10 md:p-12"}`}
        >
          <div
            className={`flex items-center border-b border-white/5 pb-6 ${compact ? "gap-4 mb-5" : "gap-6 mb-8"}`}
          >
            <div
              className={`rounded-2xl bg-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] ${compact ? "p-3" : "p-4"}`}
            >
              {icon}
            </div>
            <h3
              className={`font-bold text-slate-100 tracking-tight ${compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"}`}
            >
              {title}
            </h3>
          </div>
          <div
            className={`text-slate-300 leading-relaxed font-light space-y-6 ${compact ? "text-sm md:text-base" : "text-lg md:text-xl"}`}
          >
            {children}
          </div>
        </div>
      </Tilt>
    </Motion.div>
  );
};

const TimelineSection = () => {
  return (
    <div
      id="sobre"
      className="relative w-full max-w-6xl mx-auto px-6 py-20 flex flex-col scroll-mt-24"
    >
      <div className="relative z-1 mb-10 text-center md:mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400/90">
          Sobre nós
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Como a App Evolua Software trabalha
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Fale com a gente com clareza: explicamos o caminho em etapas simples,
          do que você precisa até o sistema no ar.
        </p>
      </div>

      <div className="relative z-1 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 items-stretch">
      <TimelineCard
        title="Nossa missão"
        icon={<Target />}
        alignment="left"
        delay={0.15}
        connectors={false}
      >
        <p>
          Ajudar empresas e quem empreende a{" "}
          <strong className="text-white">organizar processos, rotinas e atendimento ao cliente</strong>{" "}
          com programas sob medida, tudo conversando entre si quando precisar.
        </p>
        <p>
          Trabalhamos perto de você, com calma e cuidado, para que a solução
          funcione no dia a dia — inclusive com olhar forte para{" "}
          <strong>rede, servidores e segurança</strong>, para seu negócio dormir
          tranquilo.
        </p>
        <p className="font-medium text-cyan-200">
          Começamos ouvindo o que você precisa e devolvendo um plano em passos
          fáceis de acompanhar.
        </p>
      </TimelineCard>

      <TimelineCard
        title="O que entregamos"
        icon={<Cpu />}
        alignment="right"
        delay={0.22}
        connectors={false}
      >
        <p className="italic text-cyan-200 mb-4 border-l-2 border-cyan-500 pl-3">
          Do que acontece “nos bastidores” da tecnologia até o que sua equipe
          usa na tela.
        </p>
        <p className="mb-4">
          Criamos <strong>sites, sistemas internos e aplicativos para celular</strong>
          , sempre pensando em ser fácil de usar, estável e preparado para
          crescer junto com o seu negócio.
        </p>
        <p className="mb-4">
          Cuidamos de <strong>integrações</strong> (um sistema “falar” com o
          outro), <strong>painéis</strong> para você enxergar números e rotinas,
          e colocamos tudo no ar com acompanhamento após a entrega.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
            {['Sites', 'Sistemas internos', 'Apps', 'Automações', 'Painéis', 'Suporte'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-300">
                    {tech}
                </span>
            ))}
        </div>
      </TimelineCard>
      </div>
    </div>
  );
};

export default TimelineSection;
