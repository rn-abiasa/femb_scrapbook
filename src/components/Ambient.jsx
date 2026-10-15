import { useEffect, useState } from "react";
import { Butterfly } from "./Decor";

// Dekorasi di luar scrapbook (di belakang buku). Semua posisi tetap (tanpa random),
// animasi hanya transform + opacity supaya ringan di HP.
const FIREFLIES = [
  { l: 6, t: 16, dx: 40, dy: -50, dur: 9, glow: 3.2, delay: 0 },
  { l: 18, t: 72, dx: -30, dy: -60, dur: 11, glow: 2.6, delay: -3 },
  { l: 30, t: 38, dx: 50, dy: 30, dur: 10, glow: 3.8, delay: -5 },
  { l: 44, t: 86, dx: -40, dy: -40, dur: 12, glow: 2.9, delay: -2 },
  { l: 58, t: 12, dx: 30, dy: 50, dur: 9.5, glow: 3.4, delay: -7 },
  { l: 70, t: 60, dx: -50, dy: -30, dur: 11.5, glow: 2.7, delay: -4 },
  { l: 82, t: 28, dx: 36, dy: 44, dur: 10.5, glow: 3.6, delay: -6 },
  { l: 92, t: 80, dx: -34, dy: -56, dur: 12.5, glow: 3, delay: -1 },
  { l: 12, t: 46, dx: 28, dy: -36, dur: 10, glow: 3.3, delay: -8 },
  { l: 50, t: 52, dx: -44, dy: 38, dur: 13, glow: 2.8, delay: -9 },
  { l: 76, t: 92, dx: 32, dy: -48, dur: 9, glow: 3.5, delay: -2.5 },
  { l: 36, t: 6, dx: -26, dy: 52, dur: 11, glow: 3.1, delay: -5.5 },
];

// 4 titik lintasan per kupu-kupu (vw / vh), terbang pelan melintasi layar
const BUTTERFLIES = [
  {
    w: 30,
    dur: 38,
    delay: -6,
    pts: [["-12vw", "78vh"], ["30vw", "55vh"], ["62vw", "70vh"], ["112vw", "30vh"]],
  },
  {
    w: 24,
    dur: 46,
    delay: -22,
    pts: [["108vw", "20vh"], ["70vw", "40vh"], ["35vw", "18vh"], ["-14vw", "46vh"]],
  },
  {
    w: 20,
    dur: 54,
    delay: -34,
    pts: [["20vw", "112vh"], ["12vw", "70vh"], ["60vw", "50vh"], ["84vw", "-12vh"]],
  },
];

export default function Ambient() {
  const [paused, setPaused] = useState(false);

  // hemat baterai: jeda animasi saat tab/aplikasi tidak terlihat
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="ambient" data-paused={paused} aria-hidden="true">
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            "--l": `${f.l}%`,
            "--t": `${f.t}%`,
            "--dx": `${f.dx}px`,
            "--dy": `${f.dy}px`,
            "--dur": `${f.dur}s`,
            "--glow": `${f.glow}s`,
            "--delay": `${f.delay}s`,
          }}
        />
      ))}

      {BUTTERFLIES.map((b, i) => (
        <div
          key={i}
          className="bf"
          style={{
            "--w": `${b.w}px`,
            "--dur": `${b.dur}s`,
            "--delay": `${b.delay}s`,
            "--x0": b.pts[0][0],
            "--y0": b.pts[0][1],
            "--x1": b.pts[1][0],
            "--y1": b.pts[1][1],
            "--x2": b.pts[2][0],
            "--y2": b.pts[2][1],
            "--x3": b.pts[3][0],
            "--y3": b.pts[3][1],
          }}
        >
          <Butterfly className="bf-wing block h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
