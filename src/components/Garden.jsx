import { useEffect, useState } from "react";
import { garden } from "../data/garden";

const SIZE = garden.wishes.length;
const MAX_STAGE = 4; // 0 tanah, 1 biji, 2 tunas, 3 kuncup, 4 mekar
const STORAGE_KEY = "scrapbook-garden-v1";
const COLORS = ["#e3b4c0", "#dfae3c", "#a9bde0", "#ece6d8", "#b88a96", "#f0c8d2"];
const STAGE_NAMES = ["tanah kosong", "biji", "tunas", "kuncup", "mekar"];
const GREEN = "#8fae8a";

function loadStages() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length === SIZE) {
      return saved.map((n) => Math.min(MAX_STAGE, Math.max(0, Number(n) | 0)));
    }
  } catch {
    /* abaikan: localStorage tidak tersedia */
  }
  return Array(SIZE).fill(0);
}

function Plant({ stage, color }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <ellipse cx="32" cy="54" rx="22" ry="7" fill="#2f2826" />
      <ellipse cx="32" cy="52" rx="22" ry="6" fill="#4a3c37" />

      {stage === 1 && <circle cx="32" cy="49" r="2.8" fill="#ece6d8" />}

      {stage >= 2 && (
        <path
          d={stage === 2 ? "M32 50V36" : "M32 50V26"}
          stroke={GREEN}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {stage === 2 && (
        <>
          <path d="M32 42C24 41 21 36 23 32C29 32 32 36 32 42Z" fill={GREEN} />
          <path d="M32 40C40 39 43 34 41 30C35 30 32 34 32 40Z" fill={GREEN} />
        </>
      )}
      {stage === 3 && (
        <>
          <path d="M32 44C25 43 22 39 24 36C29 36 32 39 32 44Z" fill={GREEN} />
          <ellipse cx="32" cy="22" rx="4.6" ry="6.4" fill={color} />
          <path d="M27.500 25C29 29 35 29 36.500 25" stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {stage === 4 && (
        <>
          <path d="M32 44C25 43 22 39 24 36C29 36 32 39 32 44Z" fill={GREEN} />
          <path d="M32 42C39 41 42 37 40 34C35 34 32 37 32 42Z" fill={GREEN} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="32"
              cy="15"
              rx="4.6"
              ry="7"
              fill={color}
              transform={`rotate(${a} 32 23)`}
            />
          ))}
          <circle cx="32" cy="23" r="4" fill="#1b1a1a" />
          <circle cx="32" cy="23" r="2.2" fill="#dfae3c" />
        </>
      )}
    </svg>
  );
}

export default function GardenPanel() {
  const [stages, setStages] = useState(loadStages);
  const [wishIndex, setWishIndex] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stages));
    } catch {
      /* abaikan */
    }
  }, [stages]);

  const bloomed = stages.filter((s) => s === MAX_STAGE).length;
  const done = bloomed === SIZE;

  const tap = (i) => {
    const current = stages[i];
    if (current >= MAX_STAGE) {
      setWishIndex(i);
      return;
    }
    const next = current + 1;
    setStages(stages.map((s, k) => (k === i ? next : s)));
    if (next === MAX_STAGE) setWishIndex(i);
  };

  const reset = () => {
    setStages(Array(SIZE).fill(0));
    setWishIndex(null);
  };

  const hintFor = (s) =>
    s === 0 ? "ketuk untuk menanam" : s < MAX_STAGE ? "ketuk untuk menyiram" : "ketuk untuk membaca doa";

  return (
    <div className="relative flex h-full flex-col px-[6cqw] pt-[7cqw] pb-[5cqw]">
      <p className="font-type text-[3.8cqw] text-chalk/80">{garden.label}</p>
      <h2 className="mt-[1.5cqw] font-hand text-[8.5cqw] leading-none tracking-[0.03em] text-chalk">
        {garden.title}
      </h2>

      <div className="mx-auto mt-[6cqw] grid w-[82cqw] grid-cols-3 gap-[2.5cqw]">
        {stages.map((stage, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tap(i)}
            aria-label={`Petak ${i + 1}: ${STAGE_NAMES[stage]}, ${hintFor(stage)}`}
            className="aspect-square touch-manipulation border-[0.3cqw] border-dashed border-chalk/30 bg-paper/60"
          >
            <span key={stage} className="plant-pop block h-full w-full">
              <Plant stage={stage} color={COLORS[i % COLORS.length]} />
            </span>
          </button>
        ))}
      </div>

      <p className="mt-[4cqw] font-type text-[3.6cqw] text-chalk/80">
        {bloomed}/{SIZE} bunga mekar
      </p>

      <div
        aria-live="polite"
        className="mt-[2cqw] flex min-h-[30cqw] flex-col justify-center gap-[1.5cqw] border-[0.35cqw] border-dashed border-chalk/45 px-[4cqw] py-[2.5cqw]"
      >
        <p className="text-[5.2cqw] leading-snug text-chalk">
          {wishIndex !== null ? garden.wishes[wishIndex] : garden.hint}
        </p>
        {done && <p className="text-[5cqw] leading-snug text-rose">{garden.finish}</p>}
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-auto min-h-9 self-end px-1 font-hand text-[4.6cqw] text-chalk/70 underline decoration-chalk/40 underline-offset-4"
      >
        Mulai lagi
      </button>
    </div>
  );
}
