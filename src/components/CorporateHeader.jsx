import { motion as Motion } from "framer-motion";

const nav = [
  { href: "#projetos", label: "Projetos" },
  { href: "#contratar", label: "Contratar" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre Nós" },
];

const CorporateHeader = ({ visible }) => {
  const scrollToOrcamento = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <Motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/45 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#topo"
          className="group shrink-0 rounded-xl border border-white/10 bg-slate-900/50 p-1 shadow-sm transition duration-200 hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          title="Início"
        >
          <img
            src="/logo.jpeg"
            alt="App Evolua Software"
            className="h-9 w-auto max-h-10 rounded-lg object-contain transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-105 sm:h-10"
          />
        </a>

        <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-2 gap-y-2 sm:gap-4 md:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm font-medium text-slate-300 transition hover:text-cyan-300 md:text-base"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={scrollToOrcamento}
            className="shrink-0 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition hover:bg-cyan-500/25 sm:px-4 sm:text-sm"
          >
            Solicitar Orçamento
          </button>
        </nav>
      </div>
    </Motion.header>
  );
};

export default CorporateHeader;
