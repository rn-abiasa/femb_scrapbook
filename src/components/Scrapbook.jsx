import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PhotoContext } from "../lib/photo-context";
import { config, photos, words } from "../data/scrapbook";
import Cover from "./Cover";
import Lightbox from "./Lightbox";
import { LeftPanel, MainPanel, RightPanel } from "./Panels";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Scrapbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null);
  const scrollerRef = useRef(null);
  const mainRef = useRef(null);

  // Saat tertutup, geser area scroll supaya cover (panel tengah) tepat di
  // tengah layar. Di layar lebar semuanya sudah muat, jadi hasilnya 0.
  const coverScrollLeft = useCallback(() => {
    const scroller = scrollerRef.current;
    const main = mainRef.current;
    if (!scroller || !main) return 0;
    const left =
      main.getBoundingClientRect().left -
      scroller.getBoundingClientRect().left +
      scroller.scrollLeft;
    return left + main.offsetWidth / 2 - scroller.clientWidth / 2;
  }, []);

  const centerCover = useCallback(() => {
    if (scrollerRef.current) scrollerRef.current.scrollLeft = coverScrollLeft();
  }, [coverScrollLeft]);

  useLayoutEffect(() => {
    if (isOpen) return;
    centerCover();
    window.addEventListener("resize", centerCover);
    return () => window.removeEventListener("resize", centerCover);
  }, [isOpen, centerCover]);

  const handleOpen = () => {
    setIsOpen(true);
    // di HP, setelah lipatan terbuka mulai membaca dari panel paling kiri
    window.setTimeout(
      () =>
        scrollerRef.current?.scrollTo({
          left: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        }),
      700,
    );
  };

  const handleClose = () => {
    const scroller = scrollerRef.current;
    const scrollable = scroller && scroller.scrollWidth > scroller.clientWidth + 1;
    if (!scrollable) {
      setIsOpen(false);
      return;
    }
    const reduce = prefersReducedMotion();
    scroller.scrollTo({ left: coverScrollLeft(), behavior: reduce ? "auto" : "smooth" });
    window.setTimeout(() => setIsOpen(false), reduce ? 0 : 450);
  };

  const photoApi = useMemo(() => ({ photos, open: setActive }), []);

  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [],
  );

  return (
    <PhotoContext.Provider value={photoApi}>
      <div
        ref={scrollerRef}
        className={`no-scrollbar h-svh w-full overflow-y-hidden overscroll-x-contain ${
          isOpen ? "snap-x snap-proximity overflow-x-auto" : "overflow-x-hidden"
        }`}
      >
        <div className="flex h-full w-max min-w-full items-center justify-center px-4">
          <div className="stage">
            <div className="fold" data-open={isOpen}>
              <div className="panel panel-a">
                <div className="face face-front paper crease crease-a" inert={!isOpen}>
                  <LeftPanel />
                </div>
                <div className="face face-back paper" inert={isOpen}>
                  <Cover name={config.name} age={config.age} onOpen={handleOpen} />
                </div>
              </div>

              <div className="panel panel-main" ref={mainRef}>
                <div className="face face-front paper crease crease-m" inert={!isOpen}>
                  <MainPanel />
                </div>
              </div>

              <div className="panel panel-b">
                <div className="face face-front paper crease crease-b" inert={!isOpen}>
                  <RightPanel />
                </div>
                <div className="face face-back paper" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tetap di bawah layar saat buku digeser */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[2svh] flex justify-center">
        <button
          type="button"
          onClick={handleClose}
          inert={!isOpen}
          className={`min-h-11 px-3 font-hand text-xl whitespace-nowrap text-chalk/85 underline decoration-chalk/50 underline-offset-4 transition-opacity duration-500 ${
            isOpen ? "pointer-events-auto opacity-100 delay-[1400ms]" : "opacity-0"
          }`}
        >
          {words.close}
        </button>
      </div>

      <Lightbox photos={photos} index={active} onClose={() => setActive(null)} onStep={step} />
    </PhotoContext.Provider>
  );
}
