import { ArrowUp } from "lucide-react";
import VisitCounter from "./VisitCounter";

const ContactFooter = () => {
  return (
    <footer
      id="contato"
      className="relative z-40 scroll-mt-24 py-12 px-6 mt-24 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Solicite um orçamento
          </h2>
          <p className="text-cyan-400">
            Conte objetivo, prazo e integrações — retornamos com proposta e
            plano de entregas.
          </p>
          <p className="text-slate-400 mt-2">
            App Evolua Software — produtos, SaaS, mobile, automação e painéis
            administrativos.
          </p>
          <a
            href="mailto:devnkimberly@appevolua.com.br?subject=Or%C3%A7amento%20-%20App%20Evolua%20Software"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/15 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
          >
            Enviar e-mail
          </a>
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
            &copy; {new Date().getFullYear()} App Evolua Software. Todos os
            direitos reservados.
          </p>
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
