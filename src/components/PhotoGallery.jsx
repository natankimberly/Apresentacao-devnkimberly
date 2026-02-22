import { motion as Motion } from "framer-motion";

const PhotoGallery = () => {
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
  ];

  return (
    <div
      className="relative w-full overflow-hidden py-16 md:py-24 flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] mt-0 bg-transparent"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* Diagonal Infinite Scroll Photo Gallery */}
      <div
        className="absolute inset-0 z-0 flex flex-col justify-center items-center gap-6 md:gap-8"
        style={{ transform: "rotate(-5deg) scale(1.2)" }}
      >
        {/* Row 1 - Moves Left (Same as ProjectsShowcase top row) */}
        <Motion.div
          className="flex gap-6 md:gap-8 whitespace-nowrap min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 120, repeat: Infinity }}
        >
          {[...imagesRow1, ...imagesRow1].map((src, idx) => (
            <Motion.div
              key={`r1-${idx}`}
              className="w-[320px] h-[200px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-slate-900 group cursor-pointer relative"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={src}
                alt={`Gallery Project Row 1`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Row 2 - Moves Right (Same as ProjectsShowcase bottom row) */}
        <Motion.div
          className="flex gap-6 md:gap-8 whitespace-nowrap min-w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 150, repeat: Infinity }}
        >
          {[...imagesRow2, ...imagesRow2].map((src, idx) => (
            <Motion.div
              key={`r2-${idx}`}
              className="w-[320px] h-[200px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-slate-900 group cursor-pointer relative"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={src}
                alt={`Gallery Project Row 2`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </div>
  );
};

export default PhotoGallery;
