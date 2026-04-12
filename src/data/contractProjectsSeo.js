/**
 * Metadados dos produtos disponíveis para contratação (SEO / Google).
 * Textos alinhados ao portfólio — altere aqui e o JSON-LD da página acompanha.
 */
export const SITE_ORIGIN = "https://appevolua.com.br";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

/**
 * @typedef {{ id: string, name: string, description: string, keywords: string[], imagePath: string, offerUrl: string }} ContractProjectSeo
 * @type {ContractProjectSeo[]}
 */
export const CONTRACT_PROJECTS_SEO = [
  {
    id: "hub-machines",
    name: "Hub Machines",
    description:
      "Plataforma completa para gestão e monitoramento centralizado da infraestrutura de TI da empresa: máquinas online e offline, localização em mapa, relatórios por filial ou setor, inventário de hardware e software e controle de programas instalados e navegação. Ideal para quem quer visibilidade da rede corporativa e menos surpresas com equipamentos.",
    keywords: [
      "Hub Machines",
      "monitoramento de TI",
      "gestão de computadores na empresa",
      "inventário de máquinas",
      "controle de software nas estações",
      "App Evolua Software",
    ],
    imagePath: "/images/hubmachines.png",
    offerUrl: "https://assinehubmachines.devnkimberly.com.br/",
  },
  {
    id: "workchat",
    name: "WorkChat",
    description:
      "Plataforma de chat empresarial integrada ao WhatsApp Business: atendimento centralizado, encaminhamento para setores e usuários, ambiente personalizado com a identidade da empresa e arquitetura multi-empresa. Pensado para equipes que atendem muitos clientes pelo WhatsApp com organização e rastreio.",
    keywords: [
      "WorkChat",
      "chat empresarial",
      "WhatsApp Business empresa",
      "atendimento WhatsApp corporativo",
      "multi-tenant chat",
      "App Evolua Software",
    ],
    imagePath: "/images/workchat.png",
    offerUrl: "https://workchat.devnkimberly.com.br/",
  },
];

export function buildContractProductsJsonLd() {
  const site = SITE_ORIGIN;
  const pageUrl = `${site}/#contratar`;

  const applications = CONTRACT_PROJECTS_SEO.map((p) => ({
    "@type": "SoftwareApplication",
    "@id": `${site}/#${p.id}`,
    name: p.name,
    description: p.description,
    url: pageUrl,
    image: `${site}${p.imagePath}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    keywords: p.keywords.join(", "),
    provider: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      name: `Contratação ${p.name}`,
      url: p.offerUrl,
      availability: "https://schema.org/OnlineOnly",
      seller: { "@id": ORGANIZATION_ID },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": applications,
  };
}
