import { useEffect, useRef, useState } from "react";

// Lagu diputar lewat embed YouTube (youtube-nocookie). Iframe baru dimuat
// setelah tombol putar ditekan, jadi halaman tidak memanggil YouTube sebelum itu.
export default function SongCard({ song }) {
  const frameRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const id = song.youtubeId?.trim();

  // dengarkan status pemutar (1 = main, 3 = buffering, 2 = jeda, 0 = selesai)
  useEffect(() => {
    if (!started) return;
    const onMessage = (e) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      let data;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data?.event === "onStateChange") setPlaying(data.info === 1 || data.info === 3);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [started]);

  const command = (func) =>
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );

  const handleLoad = () =>
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
      "*",
    );

  const toggle = () => {
    if (!id) return;
    if (!started) {
      setStarted(true);
      setPlaying(true);
      return;
    }
    command(playing ? "pauseVideo" : "playVideo");
  };

  const src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`
    : "";

  return (
    <div className="relative border-[0.35cqw] border-dashed border-chalk/45 px-[3.5cqw] pt-[2.5cqw] pb-[3cqw]">
      <span aria-hidden="true" className="tape tape-mauve tape-left" style={{ left: "6cqw" }} />

      <p className="flex items-center gap-[1.5cqw] font-type text-[3.6cqw] text-chalk/80">
        <span aria-hidden="true" className="flex gap-[0.6cqw]">
          <i className="block size-[1cqw] bg-chalk/60" />
          <i className="block size-[1cqw] bg-chalk/60" />
          <i className="block size-[1cqw] bg-chalk/60" />
        </span>
        {song.label}
      </p>

      <div className="relative mt-[2cqw] aspect-[16/9] w-full bg-chalk p-[0.9cqw]">
        {started ? (
          <iframe
            ref={frameRef}
            src={src}
            title={`${song.title} - ${song.artist}`}
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={handleLoad}
            className="block h-full w-full border-0 bg-black"
          />
        ) : (
          <>
            {id ? (
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="h-full w-full"
                style={{ background: "linear-gradient(135deg, #4a3a40, #2a2326)" }}
              />
            )}
            {id && (
              <button
                type="button"
                onClick={toggle}
                aria-label="Putar lagu"
                className="absolute top-1/2 left-1/2 grid size-[11cqw] min-h-10 min-w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/60 text-chalk"
              >
                <svg viewBox="0 0 24 24" className="size-[5cqw]" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      <p className="mt-[2.5cqw] font-hand text-[6cqw] leading-none text-chalk">{song.title}</p>
      <div className="mt-[1.2cqw] flex items-end justify-between">
        <p className="font-type text-[3.8cqw] text-chalk/75">{song.artist}</p>
        {id && (
          <button
            type="button"
            onClick={toggle}
            className="min-h-8 px-1 font-hand text-[5.2cqw] leading-none text-chalk/90"
          >
            {playing ? "Jeda" : "Putar"}
          </button>
        )}
      </div>
    </div>
  );
}
