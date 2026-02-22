import { motion as Motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Facebook } from 'lucide-react';

const SocialLink = ({ href, icon, label, className }) => (
  <a 
    href={href}
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800/50 border border-white/5 text-slate-300 transition-all hover:scale-110 ${className}`}
    aria-label={label}
  >
    {icon}
  </a>
);

const HeroAvatar = () => {
  return (
    <div className={`flex justify-center w-full z-40 mb-10 relative`}>
        <Motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`relative group w-[95%] max-w-4xl mt-4 mx-auto`}
        >
            <div className={`absolute -inset-1 bg-linear-to-r from-cyan-400 to-violet-500 rounded-3xl blur opacity-10 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
            
            <div className={`relative p-8 md:p-12 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center gap-8 md:flex-row`}>
                
                {/* Avatar Image */}
                <div className="shrink-0 relative">
                    <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-[5px] border-cyan-400/50 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.4)]`}>
                        <img 
                            src="/images/avatar.png" 
                            alt="Natã Kimberly de Almeida" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://ui-avatars.com/api/?name=Natã+Kimberly&background=0f172a&color=38bdf8&size=256";
                            }}
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left grow flex flex-col justify-center">
                    <h1 className={`font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400 mb-2 text-3xl md:text-5xl`}>
                        Natã Kimberly <span className={`text-cyan-400 text-xl md:text-2xl`}>{"</devnkimberly/>"}</span>
                    </h1>
                    <div className="inline-block self-center md:self-start px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm md:text-base mb-4 flex-wrap">
                        Desenvolvedor Fullstack com IA
                        <span className="hidden md:inline ml-2 border-l border-cyan-500/50 pl-2">Infraestrutura</span>
                    </div>
                    
                    <div className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mb-4">
                         <p className="italic border-l-2 md:border-l-4 border-violet-500 pl-4">
                            "Minha jornada une a estabilidade da infraestrutura<br className="hidden md:block"/>
                             à inovação no desenvolvimento de software."
                        </p>
                    </div>

                    <div className="mt-2 text-center md:text-left text-slate-400 text-base md:text-lg mb-6">
                        Obrigado por visualizar meu portfólio! Entre em contato para construirmos sua próxima solução digital.
                    </div>

                    {/* Styled Footer Social Links - Enlarged */}
                    <div className="mt-2 flex flex-wrap gap-4 justify-center md:justify-start items-center">
                        <SocialLink 
                          href="https://github.com/natankimberly" 
                          icon={<Github size={28} />} 
                          label="GitHub" 
                          className="hover:bg-slate-700 hover:border-slate-500 hover:text-white"
                        />
                        <SocialLink 
                          href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/" 
                          icon={<Linkedin size={28} />} 
                          label="LinkedIn" 
                          className="hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white"
                        />
                        <SocialLink 
                          href="https://www.instagram.com/devnkimberly/?hl=pt-br" 
                          icon={<Instagram size={28} />} 
                          label="Instagram"
                          className="hover:bg-linear-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500 hover:text-white"
                        />
                        <SocialLink 
                          href="https://www.facebook.com/profile.php?id=61581919812272" 
                          icon={<Facebook size={28} />} 
                          label="Facebook"
                          className="hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white"
                        />
                        <a 
                          href="mailto:natankimberly97@gmail.com"
                          className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-500/10 hover:bg-white border border-cyan-500/30 text-cyan-400 hover:text-black transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                          title="Enviar E-mail"
                        >
                          <Mail size={28} />
                        </a>
                    </div>
                </div>
            </div>
        </Motion.div>
    </div>
  );
};

export default HeroAvatar;
