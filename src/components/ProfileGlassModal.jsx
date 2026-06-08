import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Instagram } from "lucide-react";
import NataProfileTimeline from "./NataProfileTimeline";

const ProfileGlassModal = ({ open, onClose, title, subtitle }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Motion.div
          className="fixed inset-0 z-200 flex items-center justify-center overflow-y-auto p-4 py-8 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Motion.button
            type="button"
            aria-label="Fechar"
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="relative z-1 my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-slate-950/55 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:rounded-3xl"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-2 flex max-h-[min(88vh,860px)] flex-col">
              <header className="relative flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7 md:py-5 bg-slate-950/40 backdrop-blur-md">
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
                  className="shrink-0 rounded-full border border-white/10 bg-slate-950/50 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <NataProfileTimeline />
              </div>

              <footer className="relative flex flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-slate-950/40 px-4 py-3 backdrop-blur-md md:justify-end md:px-7">
                <a
                  href="https://www.instagram.com/devnkimberly/?hl=pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:scale-110 hover:bg-linear-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://github.com/natankimberly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:devnkimberly@appevolua.com.br"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  <Mail size={16} />
                  Contato
                </a>
              </footer>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProfileGlassModal;
