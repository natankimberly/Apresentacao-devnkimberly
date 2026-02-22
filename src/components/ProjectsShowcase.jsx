import { motion as Motion } from "framer-motion";

const ProjectsShowcase = () => {
  const imagesRow1 = [
    "/projetos/a2cine/1.gif",
    "/projetos/hubmachines/1.jpg",
    "/projetos/hubmachines/2.jpg",
    "/projetos/hubmachines/3.jpg",
    "/projetos/workchat/2.jpg",
    "/projetos/workchat/3.jpg",
    "/projetos/workchat/4.jpg",
    "/projetos/sitebelluno/1.jpg",
  ];

  const imagesRow2 = [
    "/projetos/sitebelluno/2.jpg",
    "/projetos/sitebelluno/3.jpg",
    "/projetos/extensao-whats/1.jpg",
    "/projetos/a2cine/1.gif",
    "/projetos/extensao-whats/2.jpg",
    "/projetos/contabilidade/1.png",
  ];

  return (
    <div className="relative w-full overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col items-center justify-center min-h-[40vh] mt-4 bg-slate-950/20">
      {/* Call to Action Text */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mb-16 mt-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 mb-6 drop-shadow-2xl tracking-tight leading-tight">
          Precisa de um novo site ou aplicativo ?
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">
            Entre em contato e vamos transformar sua ideia em realidade!
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
          Desenvolvemos sites de alta performance, aplicativos inovadores e
          automações inteligentes sob medida para impulsionar a sua empresa.
          Confira nosso portfólio.
        </p>
        <p className="text-xl md:text-2xl text-cyan-400 font-medium tracking-wide drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          Pronto para escalar o seu negócio para o próximo nível?
        </p>
      </div>

      {/* Diagonal Infinite Scroll Background Container */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden flex flex-col justify-center items-center gap-6"
        style={{ transform: "rotate(-5deg) scale(1.1)" }}
      >
        {/* Row 1 - Moves Left */}
        <Motion.div
          className="flex gap-6 whitespace-nowrap min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        >
          {imagesRow1.map((src, idx) => (
            <div
              key={idx}
              className="w-[250px] h-[150px] md:w-[320px] md:h-[180px] rounded-xl overflow-hidden shadow-lg shrink-0"
            >
              <img
                src={src}
                alt="Project Demo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </Motion.div>

        {/* Row 2 - Moves Right */}
        <Motion.div
          className="flex gap-6 whitespace-nowrap min-w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {imagesRow2.map((src, idx) => (
            <div
              key={idx}
              className="w-[250px] h-[150px] md:w-[320px] md:h-[180px] rounded-xl overflow-hidden shadow-lg shrink-0"
            >
              <img
                src={src}
                alt="Project Demo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </Motion.div>
      </div>

      {/* Diagonal gradient overlays to blend edges */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-slate-950/80" />
    </div>
  );
};

export default ProjectsShowcase;
