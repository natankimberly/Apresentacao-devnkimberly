import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Instagram } from "lucide-react";
import NataProfileTimeline from "./NataProfileTimeline";
import BorderGlow from "./react-bits/BorderGlow";
import SpecularButton from "./react-bits/SpecularButton";
import { useModalLock } from "../hooks/useModalLock";

const ProfileGlassModal = ({ open, onClose, title, subtitle }) => {
  useModalLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Motion.div
          className="fixed inset-0 z-300 flex items-center justify-center overflow-hidden p-4 py-6 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Motion.button
            type="button"
            aria-label="Fechar"
            className="fixed inset-0 cursor-auto bg-slate-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="relative z-10 my-auto flex h-[min(88vh,860px)] w-full max-w-3xl flex-col overflow-hidden"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <BorderGlow
              className="flex h-full min-h-0 w-full flex-col overflow-hidden"
              backgroundColor="#0f172a"
              borderRadius={24}
              glowRadius={28}
              glowIntensity={1.15}
              fillOpacity={0.32}
              coneSpread={28}
              edgeSensitivity={16}
              glowColor="186 85 60"
              colors={["#38bdf8", "#22d3ee", "#67e8f9"]}
            >
              <div className="relative z-2 flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-slate-950/40 backdrop-blur-2xl">
                <header className="relative flex shrink-0 items-start justify-between gap-4 border-b border-white/10 bg-slate-950/40 px-5 py-4 backdrop-blur-md md:px-7 md:py-5">
                  <div className="flex min-w-0 items-center gap-3 md:gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)] md:h-14 md:w-14">
                      <img
                        src="/images/avatar.png"
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://ui-avatars.com/api/?name=Natã+Kimberly&background=0f172a&color=38bdf8&size=256";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h2
                        id="profile-modal-title"
                        className="truncate text-lg font-bold text-white md:text-xl"
                      >
                        {title}
                      </h2>
                      <p className="truncate text-xs text-cyan-300/90 font-mono md:text-sm">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 cursor-pointer rounded-full border border-white/10 bg-slate-950/50 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </header>

                <div
                  data-modal-scroll
                  className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain custom-scrollbar"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <NataProfileTimeline />
                </div>

                <footer className="relative flex shrink-0 flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-slate-950/40 px-4 py-3 backdrop-blur-md md:justify-end md:px-7">
                  <a
                    href="https://www.instagram.com/appevoluasoftware/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:scale-110 hover:bg-linear-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500 hover:text-white"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://github.com/natankimberly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <SpecularButton
                    size="sm"
                    radius={999}
                    tint="#22d3ee"
                    tintOpacity={0.14}
                    textColor="#ecfeff"
                    lineColor="#67e8f9"
                    baseColor="#164e63"
                    intensity={1.1}
                    onClick={() => {
                      window.location.href =
                        "mailto:devnkimberly@appevolua.com.br";
                    }}
                  >
                    Contato
                  </SpecularButton>
                </footer>
              </div>
            </BorderGlow>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProfileGlassModal;
