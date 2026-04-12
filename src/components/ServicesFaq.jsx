import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Vocês desenvolvem software sob medida para empresas?",
    a: "Sim. Construímos aplicações empresariais completas — web, APIs e integrações — alinhadas ao seu processo, com arquitetura escalável, seguindo boas práticas de segurança.",
  },
  {
    q: "Como funciona a automação de sistemas e processos?",
    a: "Mapeamos gargalos, conectamos sistemas legados via APIs, filas e bancos de dados, e implementamos rotinas confiáveis (APIs, webhooks, scripts) para reduzir trabalho manual e erros operacionais.",
  },
  {
    q: "Desenvolvem SaaS customizados?",
    a: "Sim, controle de permissões de acesso com sistema de roles, painéis administrativos e onboarding. Definimos modelo de dados, autenticação, escalonamento e integrações conforme o modelo de negócio.",
  },
  {
    q: "Fazem aplicativos mobile?",
    a: "Desenvolvemos apps para Android, integrados a backends e painéis administrativos, com foco em usabilidade e publicação nas lojas.",
  },
];

const ServicesFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="servicos"
      className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-24 px-4 py-20 md:py-28"
    >
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400/90">
          Serviços
        </p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Perguntas frequentes
        </h2>
        <p className="mt-3 text-slate-400">
          Transparência sobre como entregamos software, automação e produtos
          digitais.
        </p>
      </div>

      <ul className="space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4 text-left backdrop-blur-md transition hover:border-cyan-500/25 hover:bg-slate-900/70"
              >
                <span className="font-medium text-slate-100">{item.q}</span>
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-cyan-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <Motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="border-x border-b border-white/10 border-t-0 bg-slate-950/40 px-5 py-4 text-sm leading-relaxed text-slate-400 rounded-b-2xl backdrop-blur-sm">
                      {item.a}
                    </p>
                  </Motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ServicesFaq;
