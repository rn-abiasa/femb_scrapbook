import { useEffect, useState } from "react";
import { Butterfly, Sparkle } from "./Decor";

// Splash ringan: hanya opacity + transform (CSS). Hilang sendiri setelah ~2.6 detik.
export default function Splash() {
  const [done, setDone] = useState(false);

  // cadangan kalau event animasi tidak terpanggil
  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      className="splash"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setDone(true);
      }}
    >
      <div className="splash-inner">
        <div className="splash-bf">
          <Butterfly className="bf-wing block h-auto w-full" />
        </div>
        <Sparkle className="splash-sp splash-sp-a" />
        <Sparkle className="splash-sp splash-sp-b" />
        <p className="splash-text font-script">sebentar ya...</p>
      </div>
    </div>
  );
}
