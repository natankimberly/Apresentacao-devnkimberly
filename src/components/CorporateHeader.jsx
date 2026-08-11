import { motion as Motion } from "framer-motion";
import CardNav from "./react-bits/CardNav";

const navItems = [
  {
    label: "Projetos",
    bgColor: "#0f172a",
    textColor: "#e2e8f0",
    links: [
      { label: "Vitrine", href: "#projetos", ariaLabel: "Ir para vitrine de projetos" },
      { label: "Portfólio", href: "#portfolio", ariaLabel: "Ir para portfólio" },
    ],
  },
  {
    label: "Contratar",
    bgColor: "#111827",
    textColor: "#e2e8f0",
    links: [
      { label: "Produtos", href: "#contratar", ariaLabel: "Produtos para contratação" },
      { label: "Serviços", href: "#clientes", ariaLabel: "Ir para clientes" },
    ],
  },
  {
    label: "Empresa",
    bgColor: "#0b1220",
    textColor: "#e2e8f0",
    links: [
      { label: "Sobre Nós", href: "#sobre", ariaLabel: "Ir para sobre nós" },
      { label: "Orçamento", href: "#contato", ariaLabel: "Solicitar orçamento" },
    ],
  },
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
      className="pointer-events-none fixed top-0 left-0 right-0 z-50"
    >
      <div className="pointer-events-auto">
        <CardNav
          logo="/logo.jpeg"
          logoAlt="App Evolua Software"
          items={navItems}
          baseColor="rgba(2, 6, 23, 0.88)"
          menuColor="#e2e8f0"
          buttonBgColor="#0e7490"
          buttonTextColor="#ecfeff"
          ctaLabel="Solicitar Orçamento"
          onCtaClick={scrollToOrcamento}
        />
      </div>
    </Motion.header>
  );
};

export default CorporateHeader;
