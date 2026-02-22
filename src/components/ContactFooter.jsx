import { Mail, Linkedin, Instagram, Facebook, ArrowUp } from "lucide-react";
import VisitCounter from "./VisitCounter";

const ContactFooter = () => {
  return (
    <footer className="relative z-40 py-12 px-6 mt-32 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Vamos construir algo juntos? <br />
          </h2>
          <p className="text-cyan-400">
            Entre em contato para discutirmos seu próximo projeto.
          </p>
          <p className="text-slate-400">
            Contrate Nossas Soluções para seu negócio!
          </p>
        </div>
      </div>

      <div className="mt-12 text-center pt-8 border-t border-white/5 text-slate-600 flex flex-col items-center justify-center gap-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] group"
          title="Voltar ao topo"
        >
          <ArrowUp
            size={24}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </button>
        <div className="flex flex-col md:flex-row items-center gap-2 text-sm justify-center">
          <p>
            &copy; {new Date().getFullYear()} Natã Kimberly. Todos os direitos
            reservados.
          </p>
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
