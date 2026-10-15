import { useEffect, useRef } from "react";

export default function Lightbox({ photos, index, onClose, onStep }) {
  const ref = useRef(null);
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") onStep(-1);
    if (e.key === "ArrowRight") onStep(1);
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Preview foto"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {photo && (
        <>
          <figure className="m-0 flex flex-col items-center gap-4 px-3">
            <div className="relative -rotate-1 bg-chalk p-2.5 pb-12 shadow-2xl">
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  decoding="async"
                  className="block max-h-[64svh] max-w-[82vw] object-contain"
                />
              ) : (
                <div
                  className="grid aspect-[4/5] w-[min(78vw,380px)] place-items-center font-display text-2xl text-chalk/70"
                  style={{
                    background: `linear-gradient(135deg, hsl(${photo.hue} 38% 34%), hsl(${photo.hue + 30} 42% 22%))`,
                  }}
                >
                  foto {photo.id + 1}
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-hand text-xl font-bold text-paper">
                {photo.caption}
              </figcaption>
            </div>

            <div className="flex items-center gap-5 font-hand text-lg">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Foto sebelumnya"
                className="grid size-11 place-items-center rounded-full bg-chalk/15 text-2xl"
              >
                ‹
              </button>
              <span aria-live="polite">
                {index + 1} dari {photos.length}
              </span>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Foto berikutnya"
                className="grid size-11 place-items-center rounded-full bg-chalk/15 text-2xl"
              >
                ›
              </button>
            </div>
          </figure>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 min-h-11 rounded-full bg-rose px-5 font-display text-lg text-paper"
          >
            Tutup
          </button>
        </>
      )}
    </dialog>
  );
}
