import { motion as Motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { BookOpen, Briefcase, Cpu, Target } from "lucide-react";

const defaultTilt = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Card = ({ title, icon, children, delay, x, y }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      whileInView={{ opacity: 1, x: x, y: y }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: delay, type: "spring" }}
      className="absolute md:w-64 w-full"
    >
      <Tilt options={defaultTilt} className="h-full">
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

const stackCard = (title, icon, children) => (
  <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 shadow-sm">
    <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
      {icon}
      <h3 className="font-bold text-white text-sm">{title}</h3>
    </div>
    <div className="text-slate-400 text-xs leading-relaxed">{children}</div>
  </div>
);

const OrbitingCards = ({
  variant = "default",
  className = "",
  centerLabel = null,
}) => {
  const isProfile = variant === "profileNata";

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto flex items-center justify-center ${
        isProfile
          ? "min-h-[520px] md:min-h-[480px] mt-6 md:mt-2"
          : "h-[800px] md:h-[600px] mt-20 md:mt-0"
      } ${className}`}
    >
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-1 px-4">
          <p className="text-center text-xs md:text-sm text-slate-500/90 font-mono max-w-xs">
            {centerLabel}
          </p>
        </div>
      )}

      <div className="hidden md:block w-full h-full relative min-h-[460px]">
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
