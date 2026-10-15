import { usePhotos } from "../lib/photo-context";

export function PhotoImage({ photo, className = "" }) {
  if (photo.src) {
    return (
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        decoding="async"
        draggable="false"
        className={`block h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid h-full w-full place-items-center font-hand text-chalk/70 ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${photo.hue} 22% 30%), hsl(${photo.hue + 30} 26% 20%))`,
        fontSize: "4.4cqw",
      }}
    >
      foto {photo.id + 1}
    </span>
  );
}

/**
 * variant: "frame" (bingkai krem tebal) | "thin" (bingkai tipis, untuk kolase)
 * tape: "left" | "right" | "center" | null (washi tape mauve di sudut atas)
 */
export default function Photo({
  index,
  variant = "frame",
  tape = "left",
  tilt = 0,
  className = "",
}) {
  const { photos, open } = usePhotos();
  const photo = photos[index];
  if (!photo) return null;

  const tapeClass = tape === "center" ? "" : tape ? `tape-${tape}` : "";

  return (
    <button
      type="button"
      onClick={() => open(index)}
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
