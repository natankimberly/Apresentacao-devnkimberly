import { motion as Motion, useTransform } from 'framer-motion';

const HeroAvatar = ({ scrollYProgress }) => {

  const y = useTransform(scrollYProgress, [0, 0.08], ["40vh", "0vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.08], [1.2, 0.85]);

  return (
    <Motion.div 
      style={{ y, scale }}
      className="fixed left-0 right-0 top-0 z-0 flex justify-center pointer-events-none"
    >
        {/* Landscape Card Container - Added padding and size */}
        <div className="relative pointer-events-auto group w-[95%] max-w-7xl mt-4">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Glass Content */}
            <div className="relative p-6 md:p-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-12">
                
                {/* Avatar Image - Large */}
                <div className="shrink-0 relative">
                    <div className="w-24 h-24 md:w-56 md:h-56 rounded-full border-4 border-cyan-400/50 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.4)]">
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
                    <h1 className="text-2xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400 mb-2 md:mb-4 tracking-tight">
                        Natã Kimberly <span className="text-cyan-400">{"</devnkimberly/>"}</span>
                    </h1>
                    <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs md:text-lg mb-4 md:mb-6">
                        Desenvolvedor Fullstack com IA
                        <br />
                        Conhecimentos em Infraestrutura de Redes de Computadores
                    </div>
                    
                    <div className="flex flex-col gap-4 text-slate-300 text-sm md:text-lg leading-relaxed max-w-2xl">
                         <p className="italic border-l-4 border-violet-500 pl-4">
                            "Minha jornada até aqui une: Da pequena experiência com infraestrutura,<br />
                             à inovação no desenvolvimento de software."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Motion.div>
  );
};

export default HeroAvatar;
