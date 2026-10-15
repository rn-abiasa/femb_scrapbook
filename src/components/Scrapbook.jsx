import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PhotoContext } from "../lib/photo-context";
import { photoList } from "../lib/photo-list";
import { profile } from "../data/profile";
import { words } from "../data/words";
import Cover from "./Cover";
import GardenPanel from "./Garden";
import Lightbox from "./Lightbox";
import { LeftPanel, MainPanel, RightPanel } from "./Panels";
import TimelinePanel from "./Timeline";

const STEP = 0.55; // jeda antar lipatan (detik)
const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior = () => (prefersReducedMotion() ? "auto" : "smooth");

export default function Scrapbook() {
  const [isOpen, setIsOpen] = useState(false); // lipatan 1-3
  const [extras, setExtras] = useState(false); // lipatan 4-5 (timeline & kebun)
  const [delays, setDelays] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [active, setActive] = useState(null);
  const scrollerRef = useRef(null);
  const mainRef = useRef(null);

  const contentLeft = useCallback(() => {
    const scroller = scrollerRef.current;
    const main = mainRef.current;
    return (
      main.getBoundingClientRect().left -
      scroller.getBoundingClientRect().left +
      scroller.scrollLeft
    );
  }, []);

  // Saat tertutup, geser area scroll supaya cover (panel tengah) tepat di tengah layar.
  const coverScrollLeft = useCallback(() => {
    const scroller = scrollerRef.current;
    const main = mainRef.current;
    if (!scroller || !main) return 0;
    return contentLeft() + main.offsetWidth / 2 - scroller.clientWidth / 2;
  }, [contentLeft]);

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
    const desktop = isDesktop();
    // desktop: lipatan 1-3 saja. mobile: semua lipatan langsung terbuka berurutan.
    setDelays({ a: 0, b: STEP, c: desktop ? 0 : STEP * 2, d: desktop ? 0 : STEP * 3 });
    setExtras(!desktop);
    setIsOpen(true);
    window.setTimeout(
      () => scrollerRef.current?.scrollTo({ left: 0, behavior: scrollBehavior() }),
      700,
    );
  };

  // desktop: tombol "Lanjut" di lipatan ketiga memunculkan lipatan 4 dan 5
  const handleExtras = () => {
    setDelays((d) => ({ ...d, c: 0, d: STEP }));
    setExtras(true);
    window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const main = mainRef.current;
      if (!scroller || !main) return;
      // tampilkan lipatan 3-5 di tengah layar
      scroller.scrollTo({
        left: contentLeft() + main.offsetWidth * 2.5 - scroller.clientWidth / 2,
        behavior: scrollBehavior(),
      });
    });
  };

  const handleClose = () => {
    const scroller = scrollerRef.current;
    // tutup dari lipatan paling kanan ke kiri
    setDelays(
      extras
        ? { d: 0, c: STEP, b: STEP * 2, a: STEP * 3 }
        : { d: 0, c: 0, b: 0, a: STEP },
    );
    const finish = () => {
      setIsOpen(false);
      setExtras(false);
    };
    const scrollable = scroller && scroller.scrollWidth > scroller.clientWidth + 1;
    if (!scrollable) {
      finish();
      return;
    }
    scroller.scrollTo({ left: coverScrollLeft(), behavior: scrollBehavior() });
    window.setTimeout(finish, prefersReducedMotion() ? 0 : 450);
  };

  // di desktop, roda mouse vertikal menggeser buku ke samping
  const handleWheel = (e) => {
    const scroller = scrollerRef.current;
    if (!isOpen || !scroller || scroller.scrollWidth <= scroller.clientWidth + 1) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    if (e.target.closest?.("[data-vscroll]")) return;
    scroller.scrollLeft += e.deltaY;
  };

  const photoApi = useMemo(
    () => ({
      photos: photoList,
      open: (id) => setActive(photoList.findIndex((p) => p.id === id)),
    }),
    [],
  );

  const step = useCallback(
    (dir) =>
      setActive((i) => (i === null ? i : (i + dir + photoList.length) % photoList.length)),
    [],
  );

  return (
    <PhotoContext.Provider value={photoApi}>
      <div
        ref={scrollerRef}
        onWheel={handleWheel}
        className={`h-scroll h-svh w-full overflow-y-hidden overscroll-x-contain ${
          isOpen ? "snap-touch overflow-x-auto" : "overflow-x-hidden"
        }`}
      >
        <div className="flex h-full w-max min-w-full items-center justify-center px-4">
          <div className="stage">
            <div
              className="fold"
              data-open={isOpen}
              data-extras={extras}
              style={{
                "--da": `${delays.a}s`,
                "--db": `${delays.b}s`,
                "--dc": `${delays.c}s`,
                "--dd": `${delays.d}s`,
              }}
            >
              <div className="panel panel-a">
                <div className="face face-front paper crease crease-a" inert={!isOpen}>
                  <LeftPanel />
                </div>
                <div className="face face-back paper" inert={isOpen}>
                  <Cover name={profile.name} age={profile.age} onOpen={handleOpen} />
                </div>
              </div>

              <div className="panel panel-main" ref={mainRef}>
                <div className="face face-front paper crease crease-m" inert={!isOpen}>
                  <MainPanel />
                </div>
              </div>

              <div className="panel panel-b">
                <div className="face face-front paper crease crease-m" inert={!isOpen}>
                  <RightPanel onContinue={handleExtras} extrasOpen={extras} />
                </div>
                <div className="face face-back paper" />

                {/* lipatan 4: timeline, menempel di sisi kanan lipatan 3 */}
                <div className="panel panel-c">
                  <div className="face face-front paper crease crease-m" inert={!extras}>
                    <TimelinePanel />
                  </div>
                  <div className="face face-back paper" />

                  {/* lipatan 5: kebun bunga, menempel di sisi kanan lipatan 4 */}
                  <div className="panel panel-d">
                    <div className="face face-front paper crease crease-b" inert={!extras}>
                      <GardenPanel />
                    </div>
                    <div className="face face-back paper" />
                  </div>
                </div>
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

      <Lightbox photos={photoList} index={active} onClose={() => setActive(null)} onStep={step} />
    </PhotoContext.Provider>
  );
}
