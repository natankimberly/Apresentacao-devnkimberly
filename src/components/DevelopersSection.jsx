import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Code2, UserRound, Instagram, Github, Linkedin, Mail } from "lucide-react";
import ProfileGlassModal from "./ProfileGlassModal";
import BorderGlow from "./react-bits/BorderGlow";
import SpecularButton from "./react-bits/SpecularButton";

const INSTAGRAM_URL = "https://www.instagram.com/appevoluasoftware/";

const GLOW = {
  backgroundColor: "#0f172a",
  borderRadius: 24,
  glowRadius: 28,
  glowIntensity: 1.2,
  fillOpacity: 0.34,
  coneSpread: 28,
  edgeSensitivity: 16,
  glowColor: "186 85 60",
  colors: ["#38bdf8", "#22d3ee", "#67e8f9"],
};

const instagramHover =
  "hover:bg-linear-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500 hover:text-white";

const SocialIcon = ({ href, icon, label, variant = "default" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-800/70 text-slate-300 transition hover:scale-110 ${
      variant === "instagram"
        ? instagramHover
        : "hover:border-cyan-500/40 hover:text-cyan-300"
    }`}
    aria-label={label}
  >
    {icon}
  </a>
);

const DevelopersSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openProfile = () => setModalOpen(true);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-10 text-center md:mb-14">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-violet-300">
          <Code2 size={18} />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Equipe
          </span>
        </div>
        <h2 className="cursor-target text-3xl font-bold text-white md:text-4xl">
          Desenvolvedores
        </h2>
        <p className="mt-2 text-slate-400">
          Quem constrói as soluções da App Evolua Software.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <Motion.div
          role="button"
          tabIndex={0}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={openProfile}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProfile();
            }
          }}
          className="group relative w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-3xl"
        >
          <BorderGlow className="h-full" {...GLOW}>
            <div className="relative flex flex-col gap-6 rounded-3xl bg-transparent p-8 md:flex-row md:items-center">
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="h-28 w-28 overflow-hidden rounded-full border-[3px] border-cyan-400/50 shadow-[0_0_28px_rgba(34,211,238,0.35)] md:h-32 md:w-32">
                  <img
                    src="/images/avatar.png"
                    alt="Natã Kimberly"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://ui-avatars.com/api/?name=Natã+Kimberly&background=0f172a&color=38bdf8&size=256";
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="cursor-target text-2xl font-bold text-white">
                  Natã Kimberly{" "}
                  <span className="text-cyan-400 text-base font-mono">
                    {"</devnkimberly/>"}
                  </span>
                </h3>
                <p className="mt-1 text-cyan-300/90">
                  Desenvolvedor Fullstack · Infraestrutura
                </p>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Toque para ver um pouco mais sobre mim e como posso ajudar no
                  seu projeto.
                </p>
                <div
                  className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SocialIcon
                    href={INSTAGRAM_URL}
                    label="Instagram"
                    variant="instagram"
                    icon={<Instagram size={20} />}
                  />
                  <SocialIcon
                    href="https://github.com/natankimberly"
                    label="GitHub"
                    icon={<Github size={20} />}
                  />
                  <SocialIcon
                    href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/"
                    label="LinkedIn"
                    icon={<Linkedin size={20} />}
                  />
                  <a
                    href="mailto:devnkimberly@appevolua.com.br"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 transition hover:scale-110 hover:bg-cyan-500/20"
                    aria-label="E-mail"
                  >
                    <Mail size={20} />
                  </a>
                </div>
                <div
                  className="mt-4 flex justify-center md:justify-start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SpecularButton
                    size="sm"
                    radius={999}
                    tint="#22d3ee"
                    tintOpacity={0.14}
                    textColor="#ecfeff"
                    lineColor="#67e8f9"
                    baseColor="#164e63"
                    intensity={1.1}
                    className="cursor-target"
                    onClick={openProfile}
                  >
                    Ver perfil
                  </SpecularButton>
                </div>
              </div>
            </div>
          </BorderGlow>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          <BorderGlow
            className="h-full opacity-90"
            {...GLOW}
            glowIntensity={0.85}
            fillOpacity={0.22}
          >
            <div className="pointer-events-none relative flex flex-col gap-6 rounded-3xl bg-transparent p-8 md:flex-row md:items-center">
              <div className="absolute right-4 top-4 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
                Em breve
              </div>
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-slate-600 bg-slate-800/80 md:h-32 md:w-32">
                  <UserRound className="text-slate-500" size={48} />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-200">
                  Desenvolvedor Parceiro
                </h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  Em breve apresentamos mais um integrante da equipe para ampliar
                  o atendimento e as entregas.
                </p>
              </div>
            </div>
          </BorderGlow>
        </Motion.div>
      </div>

      <ProfileGlassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Natã Kimberly"
        subtitle="Desenvolvedor Fullstack com IA · Infraestrutura"
      />
    </section>
  );
};

export default DevelopersSection;
