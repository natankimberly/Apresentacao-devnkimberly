import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import {
  ExternalLink,
  Info,
  X,
  Server,
  MessageCircle,
  Smartphone,
  Globe,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Film,
} from "lucide-react";
import { createPortal } from "react-dom";

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  gyro: true,
};

const ProjectCard = ({ project, onClick }) => (
  <Motion.div
    layoutId={`card-${project.title}`}
    onClick={() => onClick(project)}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`col-span-1 border-white/5 border rounded-2xl md:col-span-1`}
  >
    <Tilt options={defaultTiltOptions} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md p-8 cursor-pointer transition-all hover:bg-slate-800/60 hover:border-cyan-500/30">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                project.icon
              )}
            </div>
            <span
              className={`text-sm px-3 py-1.5 rounded-full border border-white/10 font-medium whitespace-nowrap ${project.status === "Em Desenvolvimento" || project.status === "Em Andamento" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
            >
              {project.status}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-slate-400 text-base mb-8 grow line-clamp-3 leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Ver detalhes <Info size={14} className="ml-1" />
          </div>
        </div>
      </div>
    </Tilt>
  </Motion.div>
);

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative mb-8 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black flex justify-center group aspect-video">
      {/* Images */}
      <AnimatePresence mode="wait">
        <Motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover rounded-xl"
        />
      </AnimatePresence>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-cyan-500 text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-cyan-500 text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === i ? "bg-cyan-400 w-6" : "bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      <Motion.div
        layoutId={`card-${project.title}`}
        className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-cyan-400 flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                project.icon
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {/* Dynamic Image Slider using public folders */}
          <ImageSlider images={project.gallery} />

          <p className="text-lg text-slate-300 mb-6 leading-relaxed">
            {project.descriptionIntro}
          </p>

          {project.fullDescription && (
            <div className="space-y-6 text-slate-400 font-light">
              {project.fullDescription}
            </div>
          )}

          {project.video && (
            <div
              className={`mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black ${project.isShort ? "max-w-xs mx-auto" : ""}`}
            >
              <div
                className={`relative w-full ${project.isShort ? "pb-[177.78%]" : "pb-[56.25%]"}`}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={project.video}
                  title="YouTube video player"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-slate-950/30 flex justify-end gap-4 shrink-0">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all hover:shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              Acessar Projeto <ExternalLink size={18} className="ml-2" />
            </a>
          )}
        </div>
      </Motion.div>
    </div>,
    document.body,
  );
};

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projetosProprios = [
    {
      title: "Hub Machines",
      shortDescription:
        "Plataforma completa para gestão e monitoramento centralizado de toda a infraestrutura de TI da sua empresa. Chega de fantasmas!",
      descriptionIntro: "Frontend React | Backend PHP Laravel",
      fullDescription: (
        <>
          <p className="mb-4">
            O Hub Machines é uma plataforma completa para gerenciamento e
            monitoramento centralizado de toda a infraestrutura de TI da sua
            empresa.
          </p>
          <h4 className="text-white font-bold mt-4 mb-2">
            Monitoramento de Uso e Localização
          </h4>
          <p>
            Acompanhe o status online/offline de todas as máquinas e visualize
            sua localização geográfica através de um dashboard interativo com
            mapa. Gere relatórios personalizados por usuários, filiais ou
            setores.
          </p>
          <h4 className="text-white font-bold mt-4 mb-2">
            Gestão de Hardware & Software
          </h4>
          <p>
            Monitore informações detalhadas de hardware, detecte mudanças não
            autorizadas. Controle programas instalados e monitore a navegação
            web das suas maquinas.
          </p>
        </>
      ),
      tags: ["React", "PHP", "Laravel", "Monitoramento"],
      status: "Disponivel para contratação",
      icon: <Server size={28} />,
      image: "/images/hubmachines.png",
      gallery: [
        "/projetos/hubmachines/1.jpg",
        "/projetos/hubmachines/2.jpg",
        "/projetos/hubmachines/3.jpg",
        "/projetos/hubmachines/4.jpg",
        "/projetos/hubmachines/5.jpg",
        "/projetos/hubmachines/6.jpg",
        "/projetos/hubmachines/7.jpg",
      ],
      video: "https://www.youtube.com/embed/lHwJ60mbxZc",
      isShort: true,
      link: "https://assinehubmachines.devnkimberly.com.br/",
    },
    {
      title: "WorkChat",
      shortDescription:
        "Plataforma de chat empresarial integrada à WhatsApp Business API. Multi-tenant e robusto.",
      descriptionIntro: "Frontend React | Backend Node.js",
      fullDescription: (
        <>
          <p>
            Plataforma multi-tenant que permite que múltiplas empresas utilizem
            o sistema de forma isolada.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Integração com WhatsApp Business API, seu número centralizado para
              todos os seus clientes.
            </li>
            <li>Encaminhamento automático para setores e usuários.</li>
            <li>
              Plataforma de chat corporativo personalizada com a cara da sua
              empresa.
            </li>
          </ul>
        </>
      ),
      tags: ["React", "Node", "SaaS"],
      status: "Disponivel para contratação",
      icon: <MessageCircle size={28} />,
      image: "/images/workchat.png",
      gallery: [
        "/projetos/workchat/1.jpg",
        "/projetos/workchat/2.jpg",
        "/projetos/workchat/3.jpg",
        "/projetos/workchat/4.jpg",
        "/projetos/workchat/5.jpg",
        "/projetos/workchat/6.jpg",
        "/projetos/workchat/7.jpg",
      ],
      link: "https://workchat.devnkimberly.com.br/",
    },
    {
      title: "Extensão Assinatura Web WhatsApp",
      shortDescription:
        "Automação para identificação de múltiplos usuários em um mesmo número comercial no WhatsApp Web.",
      descriptionIntro: "Solução Web Extension",
      fullDescription: (
        <>
          <p>
            Extensão web que insere assinatura no WhatsApp, disponível nas lojas
            de extensões ChromeWebStore, FirefoxAddons.
          </p>
          <p className="mt-2">
            Objetivo: Identificação de múltiplos usuários em um número comercial
            para atender clientes internamente.
          </p>
        </>
      ),
      tags: ["Web Extension", "JS"],
      status: "Disponível para uso gratuito",
      icon: <MessageCircle size={28} />,
      image: "/images/extensao-whats.png",
      gallery: [
        "/projetos/extensao-whats/1.jpg",
        "/projetos/extensao-whats/2.jpg",
        "/projetos/extensao-whats/3.jpg",
        "/projetos/extensao-whats/4.jpg",
        "/projetos/extensao-whats/5.jpg",
      ],
      link: null,
    },
    {
      title: "App Vôlei Corporativo",
      shortDescription:
        "Aplicativo Android/IOS para recreação corporativa com contagem de pontos e gerenciamento de times.",
      descriptionIntro: "Mobile - Android Studio",
      fullDescription: (
        <p>
          Desenvolvido para recreação em vôlei corporativo. Possui contagem de
          pontos e sorteio de times. Desenvolvido no Android Studio, com
          publicação prevista para lojas móveis em breve.
        </p>
      ),
      tags: ["Mobile", "Android Studio"],
      status: "Em Desenvolvimento",
      icon: <Smartphone size={28} />,
      image: "",
      gallery: ["/projetos/app-voley/1.png", "/projetos/app-voley/2.png"],
      link: null,
    },
  ];

  const projetosContratados = [
    {
      title: "Site Institucional Empresarial",
      shortDescription:
        "Site totalmente personalizável pelo cliente, incluindo painel administrativo para marketing, recrutamento pelo RH e módulo de consultas NF-e.",
      descriptionIntro: "Frontend NextJS, TypeScript | Backend Node.js",
      fullDescription: (
        <>
          <p>
            Site de uma empresa cliente. Totalmente personalizável com acesso ao
            administrador para controle do setor de Marketing.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Feed de notícias personalizável (estilo Instagram).</li>
            <li>
              Mapa interativo com localização das filiais e informações de
              contato.
            </li>
            <li>Área de divulgação de vagas (RH).</li>
            <li>Sistema gerador de assinaturas de e-mail corporativas.</li>
          </ul>
        </>
      ),
      tags: ["Next.js", "TypeScript", "Node.js"],
      status: "Entregue",
      icon: <Globe size={28} />,
      image: "/images/sitebelluno.png",
      gallery: [
        "/projetos/sitebelluno/1.jpg",
        "/projetos/sitebelluno/2.jpg",
        "/projetos/sitebelluno/3.jpg",
        "/projetos/sitebelluno/4.jpg",
        "/projetos/sitebelluno/5.jpg",
        "/projetos/sitebelluno/6.jpg",
        "/projetos/sitebelluno/7.jpg",
      ],
      link: "https://bellunologistica.cloud/",
    },
    {
      title: "Sistema Contábil",
      shortDescription:
        "Sistema Contábil conectado a outro banco de dados interno legado ODBC de outro sistema, garantindo desempenho, e otimização no uso do setor de contabilidade.",
      descriptionIntro: "PHP Laravel | Livewire | PostgreSQL",
      fullDescription: (
        <>
          <p>
            Sistema Web acessivel apenas dentro da rede da empresa, projetado
            para espelhar e centralizar as informações solicitadas pela
            contabilidade conectando-se aos bancos de dados legado de um sistema
            interno. Objetivo: Extrair dados de forma eficiente, regras de
            negócio, otimizando consultas pesadas que os sistema usado processa
            de forma ineficaz.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>
              Conexão de dados espelhada em PostgreSQL com tratamento de dados
              das tabelas de outro banco para maior escalabilidade e rapidez.
            </li>
            <li>Painéis atrativos de fácil usabilidade.</li>
            <li>Alta performance em listagem e relatórios.</li>
          </ul>
        </>
      ),
      tags: ["Laravel", "Livewire", "PHP", "PostgreSQL"],
      status: "Em Desenvolvimento",
      icon: <Briefcase size={28} />,
      image: "/projetos/contabilidade/1.jpg",
      gallery: ["/projetos/contabilidade/1.jpg"],
      link: null,
    },
    {
      title: "Automação de E-mails",
      shortDescription:
        "Script/Automação Python para leitura automatizada e backup de e-mails corporativos da empresa.",
      descriptionIntro: "Projeto local Entregue ao Cliente - Python",
      fullDescription: (
        <>
          <p>
            Sistema de acesso restrito a rede interna da empresa, projetado para
            automatizar a leitura e backup de e-mails corporativos.
          </p>
          <p>
            Automação para leitura de e-mails nos servidores da empresa. Baixa
            e-mails e/ou arquivos anexos para backup e controle de dados,
            garantindo a segurança da informação e evitando perdas de dados
            importantes.
          </p>
          <p className="mt-2">
            Funciona em segundo plano monitorando o serviço IMAP dos servidores
            de e-mail da empresa.
          </p>
        </>
      ),
      tags: ["Python", "Automação"],
      status: "Entregue",
      icon: <Server size={28} />,
      image: "/images/automacao-email.png",
      gallery: ["/projetos/automacao-email/1.png"],
      link: null,
    },
    {
      title: "Site para vendas",
      shortDescription:
        "A2Cine LUT Pack - Landing Page focada em conversão para produto digital e audiovisual.",
      descriptionIntro: "Landing Page de Vendas (HTML/CSS/JS)",
      fullDescription: (
        <>
          <p className="mb-4">
            Desenvolvimento de uma Landing Page (página de alta conversão) para
            venda de um pacote de LUTs (filtros de cores profissionais para
            edição de vídeo A2Cine).
          </p>
          <p>
            O foco desse projeto foi produzir uma interface limpa que não
            competisse com as mídias audiovisuais do cliente, enquanto induzia o
            usuário à ação de compra.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>
              Desenvolvimento técnico focado em experiência do usuário (UX)
              texto persuasivo em um ambiente web dinâmico.
            </li>
            <li>
              Utilização de animações em CSS e GIFs na interface e no background
              para reter a atenção dos visitantes, ao mesmo tempo que otimiza o
              carregamento da página.
            </li>
          </ul>
        </>
      ),
      tags: ["HTML", "CSS", "JS", "Design"],
      status: "Entregue",
      icon: <Film size={28} />,
      image: "/projetos/a2cine/1.jpg",
      gallery: ["/projetos/a2cine/1.gif"],
      link: null,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-20">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Projetos Próprios */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">
          Projetos Próprios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projetosProprios.map((proj, i) => (
            <ProjectCard
              key={`proprio-${i}`}
              project={proj}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Projetos Contratados */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">
          Projetos Contratados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosContratados.map((proj, i) => (
            <ProjectCard
              key={`contrato-${i}`}
              project={proj}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
