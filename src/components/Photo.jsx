import { usePhotos } from "../lib/photo-context";
import { placeholderBackground } from "../lib/photo-utils";

// Gambar mengisi bingkai secara absolut, jadi ukuran bingkai tidak pernah
// ikut ukuran asli gambar (selalu dari className: lebar + aspect-ratio).
export function PhotoImage({ photo }) {
  if (photo.src) {
    return (
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="absolute inset-0 block h-full w-full max-w-none object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center font-hand text-chalk/70"
      style={{ background: placeholderBackground(photo), fontSize: "4.4cqw" }}
    >
      foto
    </span>
  );
}

/**
 * photo:   objek { id, src, caption }
 * variant: "frame" (bingkai krem tebal) | "thin" (bingkai tipis, untuk kolase)
 * tape:    "left" | "right" | "center" | null (washi tape mauve)
 * Ukuran diatur lewat className (mis. "aspect-[5/4] w-[53cqw]").
 */
export default function Photo({
  photo,
  variant = "frame",
  tape = "left",
  tilt = 0,
  className = "",
}) {
  const { open } = usePhotos();
  if (!photo) return null;

  const tapeClass = tape === "center" ? "" : tape ? `tape-${tape}` : "";

  return (
    <button
      type="button"
      onClick={() => open(photo.id)}
      aria-label={`Lihat foto: ${photo.caption}`}
      className={`photo photo-${variant} ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      {tape && <span aria-hidden="true" className={`tape tape-mauve ${tapeClass}`} />}
      <span className="photo-in">
        <PhotoImage photo={photo} />
      </span>
    </button>
  );
}
