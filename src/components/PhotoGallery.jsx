import { useMemo, useState, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const DriftWall = lazy(() => import("./react-bits/DriftWall"));

const GALLERY_IMAGES = [
  "/projetos/a2cine/1.gif",
  "/projetos/hubmachines/1.jpg",
  "/projetos/hubmachines/2.jpg",
  "/projetos/hubmachines/3.jpg",
  "/projetos/workchat/2.jpg",
  "/projetos/workchat/3.jpg",
  "/projetos/workchat/4.jpg",
  "/projetos/sitebelluno/1.jpg",
  "/projetos/mercadao/1.jpg",
  "/projetos/mercadao/2.jpg",
  "/projetos/mercadao/3.jpg",
  "/projetos/mercadao/4.jpg",
  "/projetos/sitebelluno/2.jpg",
  "/projetos/extensao-whats/1.jpg",
  "/projetos/worktower/1.jpg",
];

const PhotoGallery = () => {
  const [preview, setPreview] = useState(null);

  const items = useMemo(
    () =>
      GALLERY_IMAGES.map((image, i) => ({
        image,
        title: `Preview ${i + 1}`,
      })),
    [],
  );

  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="relative w-full min-h-[64vh] md:min-h-[78vh] overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="h-full w-full bg-slate-950/40" aria-hidden="true" />
          }
        >
          <div
            className="h-full w-full"
            onClick={(e) => {
              const tile = e.target.closest?.("[data-tile-id]");
              if (!tile) return;
              const img = tile.querySelector("img");
              if (img?.src) setPreview(img.getAttribute("src") || img.src);
            }}
          >
            <DriftWall
              items={items}
              columns={isMobile ? 3 : 5}
              tileWidth={isMobile ? 140 : 200}
              tileHeight={isMobile ? 92 : 132}
              gap={isMobile ? 12 : 18}
              tilt={isMobile ? 10 : 16}
              turn={isMobile ? -8 : -14}
              depth={isMobile ? 80 : 120}
              speed={isMobile ? 28 : 42}
              parallax={isMobile ? 0.25 : 0.55}
              fade={0.55}
              dim={0.5}
              overlayColor="#020617"
            />
          </div>
        </Suspense>
      </div>

      <div className="pointer-events-none relative z-10 flex h-full min-h-[64vh] md:min-h-[78vh] items-center justify-center px-4">
        <div className="max-w-4xl text-center rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-7 md:px-10 md:py-9 backdrop-blur-md shadow-[0_0_40px_rgba(8,145,178,0.18)]">
          <p className="mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            App Evolua Software
          </p>
          <h2 className="cursor-target text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Software que acompanha a evolução do seu negócio
          </h2>
          <p className="mt-3 text-base md:text-xl font-medium text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-violet-300">
            Do diagnóstico à operação em produção
          </p>
          <p className="mt-5 mx-auto max-w-2xl text-sm md:text-lg text-slate-300 leading-relaxed">
            Produtos digitais, SaaS e automações com foco em segurança,
            performance e o que realmente aparece no dia a dia da sua empresa.
          </p>
        </div>
      </div>

      {preview &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
            style={{ zIndex: 300 }}
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-500"
                aria-label="Fechar preview"
              >
                <X size={20} />
              </button>
              <img
                src={preview}
                alt="Preview do projeto"
                className="max-h-[90vh] w-full object-contain bg-black"
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default PhotoGallery;
