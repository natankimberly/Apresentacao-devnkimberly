import { motion as Motion, useTransform } from 'framer-motion';

const HeroAvatar = ({ scrollYProgress }) => {
  // Animation:
  // 0.0 -> 0.2: Scroll from bottom (100vh) to top padding (e.g. 5vh or 10vh)
  // Stops there (handled by App.jsx layout mainly, but we can transform here too)
  
  // Let's assume the parent container allows scrolling for 0.5 of height before pinning completely?
  // Actually, standard parallax: map scroll 0->0.2 to y position 80vh->0vh relative to valid 'sticky' top.
  
  // Transform position from Center (40vh) to Top (0vh) faster
  // Reduced range [0, 0.15] makes it respond quicker to scroll
  const y = useTransform(scrollYProgress, [0, 0.15], ["40vh", "0vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1.2, 0.85]); // Starts larger, shrinks to header size

  return (
    <Motion.div 
      style={{ y, scale }}
      className="fixed left-0 right-0 top-0 z-40 flex justify-center pointer-events-none"
    >
        {/* Landscape Card Container - Added padding and size */}
        <div className="relative pointer-events-auto group w-[95%] max-w-7xl mt-4">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Glass Content */}
            <div className="relative p-8 md:p-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
                
                {/* Avatar Image - Large */}
                <div className="shrink-0 relative">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-cyan-400/50 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.4)]">
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
                <div className="text-center md:text-left grow">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400 mb-4 tracking-tight">
                        Natã Kimberly <span className="text-cyan-400">{"</devnkimberly/>"}</span>
                    </h1>
                    <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-lg mb-6">
                        Desenvolvedor Fullstack com IA
                        <br />
                        Conhecimentos em Infraestrutura de Redes de Computadores
                    </div>
                    
                    <div className="flex flex-col gap-4 text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                         <p className="italic border-l-4 border-violet-500 pl-4">
                            "Minha jornada até aqui une da pequena experiencia com infraestrutura, à inovação do desenvolvimento."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Motion.div>
  );
};

export default HeroAvatar;
