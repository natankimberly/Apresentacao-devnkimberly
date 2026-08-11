import { motion as Motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { BookOpen, Briefcase, Cpu, Target } from "lucide-react";
import BorderGlow from "./react-bits/BorderGlow";
import SpecularButton from "./react-bits/SpecularButton";

const defaultTilt = {
  reverse: false,
  max: 18,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const GLOW = {
  backgroundColor: "#0f172a",
  borderRadius: 14,
  glowRadius: 26,
  glowIntensity: 1.15,
  fillOpacity: 0.32,
  coneSpread: 28,
  edgeSensitivity: 18,
  glowColor: "186 85 60",
  colors: ["#38bdf8", "#22d3ee", "#67e8f9"],
};

const TitleSpecular = ({ children }) => (
  <SpecularButton
    size="sm"
    radius={10}
    tint="#22d3ee"
    tintOpacity={0.22}
    textColor="#f8fafc"
    lineColor="#67e8f9"
    baseColor="#164e63"
    intensity={1.25}
    thickness={1.35}
    autoAnimate
    followMouse={false}
    className="pointer-events-none! cursor-default! min-h-8! px-3! py-1.5! text-sm! font-bold! shadow-none! overflow-visible!"
    onClick={(e) => e.preventDefault()}
  >
    {children}
  </SpecularButton>
);

const Card = ({ title, icon, children, delay, x, y }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      whileInView={{ opacity: 1, x: x, y: y }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: delay, type: "spring" }}
      className="absolute md:w-64 w-full"
    >
      <Tilt options={defaultTilt} className="h-full overflow-visible">
        <BorderGlow className="h-full overflow-visible" {...GLOW}>
          <div className="h-full overflow-visible rounded-[14px] bg-transparent p-4 group md:p-5">
            <div className="mb-3 flex items-center gap-2 overflow-visible">
              <div className="shrink-0 rounded-lg bg-slate-800 p-1.5 text-cyan-400 transition-all group-hover:scale-110 group-hover:text-cyan-300">
                {icon}
              </div>
              <div className="min-w-0 overflow-visible">
                <TitleSpecular>{title}</TitleSpecular>
              </div>
            </div>
            <div className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
              {children}
            </div>
          </div>
        </BorderGlow>
      </Tilt>
    </Motion.div>
  );
};

const stackCard = (title, icon, children) => (
  <BorderGlow className="w-full overflow-visible" {...GLOW} borderRadius={12} glowRadius={18}>
    <div className="overflow-visible rounded-xl bg-transparent p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 overflow-visible text-cyan-400">
        {icon}
        <TitleSpecular>{title}</TitleSpecular>
      </div>
      <div className="text-slate-400 text-xs leading-relaxed">{children}</div>
    </div>
  </BorderGlow>
);

const OrbitingCards = ({
  variant = "default",
  className = "",
  centerLabel = null,
}) => {
  const isProfile = variant === "profileNata";

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden overscroll-contain ${
        isProfile
          ? "min-h-130 md:min-h-120 mt-6 md:mt-2"
          : "h-200 md:h-150 mt-20 md:mt-0"
      } ${className}`}
    >
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-1 px-4">
          <p className="text-center text-xs md:text-sm text-slate-500/90 font-mono max-w-xs">
            {centerLabel}
          </p>
        </div>
      )}

      <div className="relative hidden h-full min-h-115 w-full overflow-hidden md:block">
        {!isProfile ? (
          <>
            <Card
              title="Objetivo"
              icon={<Target size={18} />}
              delay={0.2}
              x="-320px"
              y="-130px"
            >
              <p>
                Brasileiro, 28 Anos. Experiência em comércio, rotinas
                administrativas e transporte. Atualmente analista de suporte de
                T.I.
              </p>
            </Card>
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
                  <strong className="text-white">Banco de Dados:</strong>{" "}
                  Modelagem e performance.
                </li>
              </ul>
            </Card>
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
            <Card
              title="Capacidades"
              icon={<Cpu size={18} />}
              delay={0.8}
              x="320px"
              y="130px"
            >
              <p className="mb-2 italic opacity-80">
                &quot;Minha jornada une a estabilidade da infraestrutura à
                inovação do desenvolvimento.&quot;
              </p>
              <p>
                JavaScript (Next.js/React), TypeScript, Node.js, PHP (Laravel),
                Python, Go, e soluções Mobile.
              </p>
            </Card>
          </>
        ) : (
          <>
            <Card
              title="Formação (ADS)"
              icon={<BookOpen size={18} />}
              delay={0.15}
              x="-300px"
              y="-120px"
            >
              <p className="mb-2 font-semibold text-slate-200">
                Graduação em Análise e Desenvolvimento de Sistemas — IFMT,
                Campus Rondonópolis.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Algoritmos, engenharia de software e bancos de dados.</li>
                <li>Programação web e mobile em ecossistemas modernos.</li>
              </ul>
            </Card>
            <Card
              title="Experiência em Infra"
              icon={<Briefcase size={18} />}
              delay={0.35}
              x="300px"
              y="-120px"
            >
              <p className="mb-1 font-semibold text-slate-200">
                Analista de Suporte de TI — transportadora nacional.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>File Servers, Terminal Servers e Windows Server / AD.</li>
                <li>Firewall, NATs, VPNs, VLANs e segurança de rede.</li>
                <li>Suporte multiplataforma e operações corporativas.</li>
              </ul>
            </Card>
            <Card
              title="Capacidades"
              icon={<Cpu size={18} />}
              delay={0.55}
              x="0px"
              y="140px"
            >
              <p className="mb-2 italic opacity-80">
                Infraestrutura sólida aplicada ao desenvolvimento de produtos.
              </p>
              <p>
                JavaScript (Next.js/React), TypeScript, Node.js, PHP (Laravel),
                Python, Go e soluções mobile — do requisito ao deploy.
              </p>
            </Card>
          </>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-3 px-2 w-full relative z-10">
        {!isProfile ? (
          <>
            {stackCard(
              "Objetivo",
              <Target size={16} />,
              <p>
                Brasileiro, 28 Anos. Experiência em comércio, rotinas
                administrativas e transporte. Atualmente analista de suporte de
                T.I.
              </p>,
            )}
            {stackCard(
              "Formação",
              <BookOpen size={16} />,
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
                  <strong className="text-white">Banco de Dados:</strong>{" "}
                  Modelagem e performance.
                </li>
              </ul>,
            )}
            {stackCard(
              "Experiência",
              <Briefcase size={16} />,
              <>
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
              </>,
            )}
            {stackCard(
              "Capacidades",
              <Cpu size={16} />,
              <>
                <p className="text-slate-400 text-xs italic opacity-80 mb-1 leading-relaxed">
                  &quot;Minha jornada une a estabilidade da infraestrutura à
                  inovação do desenvolvimento.&quot;
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  JavaScript (Next.js/React), TypeScript, Node.js, PHP
                  (Laravel), Python, Go, e soluções Mobile.
                </p>
              </>,
            )}
          </>
        ) : (
          <>
            {stackCard(
              "Formação (ADS)",
              <BookOpen size={16} />,
              <>
                <p className="font-semibold text-slate-200 text-xs mb-1">
                  Graduação em ADS — IFMT, Campus Rondonópolis.
                </p>
                <p className="text-xs">
                  Algoritmos, engenharia de software, banco de dados e
                  programação web/mobile.
                </p>
              </>,
            )}
            {stackCard(
              "Experiência em Infra",
              <Briefcase size={16} />,
              <>
                <p className="font-semibold text-slate-200 text-xs mb-1">
                  Analista de Suporte de TI — transportadora nacional.
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs">
                  <li>File/Terminal Servers, Windows Server e AD.</li>
                  <li>Firewall, VPNs, VLANs e segurança.</li>
                </ul>
              </>,
            )}
            {stackCard(
              "Capacidades",
              <Cpu size={16} />,
              <>
                <p className="text-xs italic opacity-80 mb-1">
                  Da infraestrutura ao produto em produção.
                </p>
                <p className="text-xs">
                  Next.js/React, TypeScript, Node, Laravel, Python, Go e
                  mobile.
                </p>
              </>,
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrbitingCards;
