import { useEffect } from "react";

/**
 * Trava o scroll do fundo e restaura o cursor do sistema
 * enquanto um modal (portal) estiver aberto — evita conflito com TargetCursor.
 */
export function useModalLock(open) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const prevCursor = document.body.style.cursor;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }
    document.body.style.cursor = "auto";
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    const blockBackgroundScroll = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        e.preventDefault();
        return;
      }
      const scrollRoot = target.closest("[data-modal-scroll]");
      if (!scrollRoot) {
        e.preventDefault();
        return;
      }
      // Touch: deixa o overscroll-contain do modal cuidar
      if (e.type === "touchmove") return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRoot;
      const delta = e.deltaY;
      const atTop = scrollTop <= 0 && delta < 0;
      const atBottom =
        scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;
      if (atTop || atBottom) e.preventDefault();
    };

    window.addEventListener("wheel", blockBackgroundScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchmove", blockBackgroundScroll, {
      passive: false,
      capture: true,
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      document.body.style.cursor = prevCursor;
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("wheel", blockBackgroundScroll, {
        capture: true,
      });
      window.removeEventListener("touchmove", blockBackgroundScroll, {
        capture: true,
      });
    };
  }, [open]);
}

export default useModalLock;
