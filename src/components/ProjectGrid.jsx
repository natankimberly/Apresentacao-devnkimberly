import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { ExternalLink, Info, X, Server, MessageCircle, Smartphone, Globe } from 'lucide-react';

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
    gyro: true
};

const ProjectCard = ({ project, onClick }) => (
  <Motion.div 
    layoutId={`card-${project.title}`}
    onClick={() => onClick(project)}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`col-span-1 ${project.type === 'featured' ? 'md:col-span-2' : ''}`}
  >
    <Tilt options={defaultTiltOptions} className="h-full">
        <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-8 cursor-pointer transition-all hover:bg-slate-800/60 hover:border-cyan-500/30">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors overflow-hidden">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-10 h-10 object-contain" />
                ) : (
                    project.icon
                )}
                </div>
                <span className={`text-sm px-3 py-1.5 rounded-full border border-white/10 font-medium ${project.status === 'Em Desenvolvimento' || project.status === 'Em Andamento' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                    {project.status}
                </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-slate-400 text-base md:text-lg mb-8 grow line-clamp-3 leading-relaxed">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800">
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

import { createPortal } from 'react-dom';

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
                className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
             >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="text-cyan-400 flex items-center justify-center">
                             {project.image ? (
                                <img src={project.image} alt={project.title} className="w-10 h-10 object-contain" />
                            ) : (
                                project.icon
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                     <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        {project.descriptionIntro}
                    </p>

                    {project.fullDescription && (
                        <div className="space-y-6 text-slate-400 font-light">
                             {project.fullDescription}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-slate-950/30 flex justify-end gap-4">
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
        document.body
    );
};

const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
    {
      title: "Site Institucional Empresarial",
      shortDescription: "Site totalmente personalizável pelo cliente. Painel administrativo para os setores de marketing, anúncios de vagas pelo setor de RH, mapa interativo com localização das filiais, módulo de consulta de notas a Sefaz, e muito mais...",
      descriptionIntro: "Frontend NextJS, TypeScript | Backend Node.js",
      fullDescription: (
        <>
           <p>Site de uma empresa cliente. Totalmente personalizável com acesso ao administrador para controle do setor de Marketing.</p>
           <ul className="list-disc pl-5 mt-4 space-y-2">
               <li>Feed de notícias personalizável (estilo Instagram).</li>
               <li>Mapa interativo com localização das filiais e informações de contato.</li>
               <li>Área de divulgação de vagas (RH).</li>
               <li>Galeria de fotos da frota, certificações e clientes parceiros.</li>
               <li>Sistema gerador de assinaturas de e-mail corporativas.</li>
               <li>Aplicação de controle financeiro integrada.</li>
           </ul>
        </>
      ),
      tags: ["Next.js", "TypeScript", "Node.js"],
      type: "featured",
      status: "Entregue",
      icon: <Globe size={28} />,
      image: "/images/sitebelluno.png",
      link: "https://bellunologistica.cloud/"
    },
    {
      title: "Hub Machines",
      shortDescription: (
        <>
            Plataforma SaaS completa para gestão e monitoramento centralizado de toda a infraestrutura de TI da sua empresa.<br />
            Cansado de Trabalhar com Fantasmas ? 👻 Assuma o controle com o Hub Machines. Chega de fantasmas na sua empresa !!!
            <br />
            <br />
            <strong>Disponivel para testes e contratação.</strong>
        </>
      ),
      descriptionIntro: "Frontend React | Backend PHP Laravel",
      fullDescription: (
        <>
            <p className="mb-4">O Hub Machines é uma plataforma completa para gerenciamento e monitoramento centralizado de toda a infraestrutura de TI da sua empresa.</p>
            
            <h4 className="text-white font-bold mt-4 mb-2">Monitoramento de Uso e Localização</h4>
            <p>Acompanhe o status online/offline de todas as máquinas e visualize sua localização geográfica através de um dashboard interativo com mapa. Gere relatórios personalizados por usuários, filiais ou setores.</p>
            
            <h4 className="text-white font-bold mt-4 mb-2">Gestão de Hardware & Software</h4>
            <p>Monitore informações detalhadas de hardware, detecte mudanças não autorizadas. Controle programas instalados e monitore a navegação web das suas maquinas, com bloqueio de sites não permitidos pelos nossos agentes</p>

            <h4 className="text-white font-bold mt-4 mb-2">Sistema de Alertas Inteligente</h4>
            <p>Receba alertas personalizados, permitindo uma equipe de TI ativa remotamente.</p>
            
            <p className="mt-4 italic text-cyan-500">Em Desenvolvimento: Suporte a acesso remoto em tempo real.</p>
        </>
      ),
      tags: ["React", "PHP", "Laravel", "Monitoramento"],
      type: "featured",
      status: "Disponivel para contratação",
      icon: <Server size={28} />,
      image: "/images/hubmachines.png",
      link: "https://hubmachines.devnkimberly.com.br/"
    },
    {
      title: "Extensão Assinatura WhatsApp WEB para empresas",
      shortDescription: "Automação para identificação de múltiplos usuários em número comercial.",
      descriptionIntro: "Solução Web",
      fullDescription: (
          <>
            <p>Extensão web que insere assinatura no WhatsApp, disponível nas lojas de extenções ChromeWebStore, FirefoxAddons e EdgeAddons.</p>
            <p className="mt-2">Objetivo: Identificação de múltiplos usuários em um número comercial para atender clientes ou relacionamento interno na empresa entre setores e números diferentes.</p>
            <p className="mt-2">Funcionalidades: </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Identificação de múltiplos usuários em um número comercial.</li>
                <li>Atalho para inserção manual de assinatura.</li>
                <li>Frases Frequentes: Cadastre e selecione Frases Frequentes para inserção automática.</li>
            </ul>
            <p className="mt-2">Pesquise por:  Assinatura WhatsApp Web DEV.NKIMBERLY.</p>
          </>
      ),
      tags: ["Web Extension", "JS"],
      type: "standard",
      status: "Disponível para uso gratuito",
      icon: <MessageCircle size={28} />,
      image: "/images/extensao-whats.png",
      link: null 
    },
    {
      title: "Automação E-mails",
      shortDescription: "Automação Python para leitura e backup de e-mails corporativos.",
      descriptionIntro: "Projeto local - Backend Python",
      fullDescription: (
          <><p>Automação para leitura de e-mails nos servidores da empresa. Baixa e-mails e/ou arquivos anexos para backup e controle de dados, garantindo segurança da informação.</p><p>Objetivo: Automatizar leitura de e-mails e backup de arquivos anexos para controle de dados e segurança da informação.</p><p>Funcionalidades: </p><ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Leitura de e-mails nos servidores da empresa.</li>
          <li>Backup de e-mails e arquivos anexos.</li>
          <li>Controle de dados e segurança da informação.</li>
        </ul></>
        ),
      tags: ["Python", "Automação"],
      type: "standard",
      status: "Entregue",
      icon: <Server size={28} />,
      image: "/images/automacao-email.png",
      link: null
    },
    {
      title: "WorkChat",
      shortDescription: "Este é um grande projeto em desenvolvimento: Plataforma de chat empresarial integrada à WhatsApp Business API.",
      descriptionIntro: "Frontend React | Backend Node.js",
      fullDescription: (
          <>
            <p>Plataforma multi-tenant que permite que múltiplas empresas utilizem o sistema de forma isolada.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Integração com WhatsApp Business API, seu número centralizado para todos os seus clientes.</li>
                <li>Encaminhamento automático para setores e usuários.</li>
                <li>Plataforma de chat corporativo personalizada com a cara da sua empresa.</li>
            </ul>
            <p>Sistema em desenvolvimento, robusto e repleto de funcionalidades, disponível para contratação em breve...<br />
            mais detalhes...</p>
          </>
      ),
      tags: ["React", "Node", "SaaS"],
      type: "standard",
      status: "Em Desenvolvimento",
      icon: <MessageCircle size={28} />,
      image: "/images/workchat.png",
      link: null
    },
    {
      title: "App Voley Corporativo",
      shortDescription: "Aplicativo Android/IOS para recreação corporativa com contagem de pontos.",
      descriptionIntro: "Mobile - Android Studio",
      fullDescription: (
          <p>Desenvolvido para recreação em vôlei corporativo. Possui contagem de pontos e sorteio de times. Desenvolvido no Android Studio, com publicação prevista para lojas móveis em breve.</p>
      ),
      tags: ["Mobile", "Android Studio"],
      type: "standard",
      status: "Em Desenvolvimento",
      icon: <Smartphone size={28} />,
      image: "", // ex: "/images/app-voley.png"
      link: null
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-20">
      <AnimatePresence>
        {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} onClick={setSelectedProject} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
