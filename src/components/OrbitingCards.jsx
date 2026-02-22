import { motion as Motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { BookOpen, Target, Briefcase, Cpu } from "lucide-react";

const Card = ({ title, icon, children, delay, x, y }) => {
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <Motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      whileInView={{ opacity: 1, x: x, y: y }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: delay, type: "spring" }}
      className="absolute md:w-64 w-full"
    >
      <Tilt options={defaultOptions} className="h-full">
        <div className="h-full p-4 md:p-5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/50 transition-colors shadow-lg group">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all">
              {icon}
            </div>
            <h3 className="text-base md:text-lg font-bold text-slate-100">
              {title}
            </h3>
          </div>
          <div className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
            {children}
          </div>
        </div>
      </Tilt>
    </Motion.div>
  );
};

const OrbitingCards = () => {
  // Layout positions for desktop:
  // Top Left, Top Right
  // Bottom Left, Bottom Right
  // We can arrange 4 items nicely around the center (where the avatar ends up)

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[800px] md:h-[600px] flex items-center justify-center mt-20 md:mt-0">
      {/* Container for the cards. Note: Layout depends on screen size */}

      {/* Mobile: Vertical Stack (handled by CSS 'absolute' becoming relative/stack via media query logic in Card or parent) 
          Actually, for true responsiveness, we might want a grid on mobile and absolute on desktop.
      */}

      <div className="hidden md:block w-full h-full relative">
        {/* Top Left */}
        <Card
          title="Objetivo"
          icon={<Target size={18} />}
          delay={0.2}
          x="-320px"
          y="-130px"
        >
          <p>
            Brasileiro, 28 Anos. Experiência em comércio, rotinas
            administrativas e transporte. Atualmente analista de suporte de T.I.
          </p>
        </Card>

        {/* Top Right */}
        <Card
          title="Formação"
          icon={<BookOpen size={18} />}
          delay={0.4}
          x="320px"
          y="-130px"
        >
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong className="text-white">Algoritmos & Lógica:</strong>{" "}
              Pensamento estruturado para problemas complexos.
            </li>
            <li>
              <strong className="text-white">Engenharia de Software:</strong>{" "}
              Sistemas escaláveis e qualidade de código.
            </li>
            <li>
              <strong className="text-white">Banco de Dados:</strong> Modelagem
              e performance.
            </li>
          </ul>
        </Card>

        {/* Bottom Left */}
        <Card
          title="Experiência"
          icon={<Briefcase size={18} />}
          delay={0.6}
          x="-320px"
          y="130px"
        >
          <p className="mb-1">
            <strong className="text-white">
              Analista de Suporte em Transportadora Nacional:
            </strong>
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Gestão de File Servers e Terminal Servers.</li>
            <li>Firewall e Segurança de Rede (NATs, VPNs).</li>
            <li>Suporte a diversos sistemas operacionais.</li>
          </ul>
        </Card>

        {/* Bottom Right */}
        <Card
          title="Capacidades"
          icon={<Cpu size={18} />}
          delay={0.8}
          x="320px"
          y="130px"
        >
          <p className="mb-2 italic opacity-80">
            "Minha jornada une a estabilidade da infraestrutura à inovação do
            desenvolvimento."
          </p>
          <p>
            JavaScript (Next.js/React), TypeScript, Node.js, PHP (Laravel),
            Python, Go, e soluções Mobile.
          </p>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-3 px-4 w-full">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <Target size={16} />{" "}
            <h3 className="font-bold text-white text-sm">Objetivo</h3>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Brasileiro, 28 Anos. Experiência em comércio, rotinas
            administrativas e transporte. Atualmente analista de suporte de T.I.
          </p>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <BookOpen size={16} />{" "}
            <h3 className="font-bold text-white text-sm">Formação</h3>
          </div>
          <ul className="text-slate-400 text-xs list-disc pl-4 space-y-0.5 leading-relaxed">
            <li>
              <strong className="text-white">Algoritmos & Lógica:</strong>{" "}
              Pensamento estruturado para problemas complexos.
            </li>
            <li>
              <strong className="text-white">Engenharia de Software:</strong>{" "}
              Sistemas escaláveis e qualidade de código.
            </li>
            <li>
              <strong className="text-white">Banco de Dados:</strong> Modelagem
              e performance.
            </li>
          </ul>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <Briefcase size={16} />{" "}
            <h3 className="font-bold text-white text-sm">Experiência</h3>
          </div>
          <p className="mb-1 text-slate-400 text-xs">
            <strong className="text-white">
              Analista de Suporte em Transportadora Nacional:
            </strong>
          </p>
          <ul className="text-slate-400 text-xs list-disc pl-4 space-y-0.5 leading-relaxed">
            <li>Gestão de File Servers e Terminal Servers.</li>
            <li>Firewall e Segurança de Rede (NATs, VPNs).</li>
            <li>Suporte a diversos sistemas operacionais.</li>
          </ul>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
            <Cpu size={16} />{" "}
            <h3 className="font-bold text-white text-sm">Capacidades</h3>
          </div>
          <p className="text-slate-400 text-xs italic opacity-80 mb-1 leading-relaxed">
            "Minha jornada une a estabilidade da infraestrutura à inovação do
            desenvolvimento."
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            JavaScript (Next.js/React), TypeScript, Node.js, PHP (Laravel),
            Python, Go, e soluções Mobile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrbitingCards;
