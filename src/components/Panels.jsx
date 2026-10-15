import {
  Bunting,
  Butterfly,
  CurlArrow,
  Flower,
  Heart,
  Plane,
  Sparkle,
  Sticker,
} from "./Decor";
import Photo from "./Photo";
import SongCard from "./SongCard";
import { profile } from "../data/profile";
import { photos } from "../data/photos";
import { song } from "../data/song";
import { words } from "../data/words";

export function LeftPanel() {
  return (
    <div className="relative flex h-full flex-col px-[5cqw] pt-[7cqw] pb-[5cqw]">
      <Photo
        photo={photos.leftTop}
        tilt={-1.5}
        className="ml-[1cqw] aspect-[5/4] w-[53cqw]"
      />
      <Heart className="absolute top-[10cqw] right-[13cqw] w-[5.6cqw] text-chalk" />
      <Flower className="absolute top-[38cqw] left-[73cqw] w-[15cqw] rotate-12" />

      <p className="mt-[8cqw] pl-[1cqw] font-type text-[3.9cqw] leading-snug text-chalk/85">
        {words.leftCaption}{" "}
        <span className="font-hand text-[4.8cqw]">{words.leftCaptionHand}</span>
      </p>
      <p className="hand-text mt-[5cqw] pr-[2cqw] pl-[1cqw]">{words.left}</p>

      <Photo
        photo={photos.leftBottom}
        tilt={1}
        className="mt-auto ml-[1cqw] aspect-[5/4] w-[55cqw]"
      />

      <Heart className="absolute top-[153cqw] left-[76cqw] w-[4.5cqw] text-chalk" />
      <Plane className="absolute top-[160cqw] left-[81cqw] w-[9cqw] text-chalk" />
    </div>
  );
}

// Kolase tengah (8 foto) pada grid 8 kolom: [kolom, kemiringan].
// Baris 1: 2 foto besar, baris 2: 4 foto kecil, baris 3: 2 foto kecil di tengah.
const COLLAGE = [
  ["1 / 5", -1],
  ["5 / 9", 1],
  ["1 / 3", 1],
  ["3 / 5", -1],
  ["5 / 7", 1.2],
  ["7 / 9", -0.8],
  ["3 / 5", 1],
  ["5 / 7", -1.2],
];

export function MainPanel() {
  return (
    <div className="relative flex h-full flex-col items-center px-[6cqw] pt-[8cqw] pb-[7cqw]">
      <Sparkle className="absolute top-[34cqw] right-[8cqw] w-[4cqw] text-chalk/70" />

      <Bunting className="mt-[2cqw] w-[76cqw]" />

      <p className="font-hand text-[8.6cqw] leading-none tracking-[0.05em] text-chalk mt-4">
        {profile.name}
      </p>

      <div className="mt-[6cqw] flex items-center gap-[1.5cqw] self-start pl-[4cqw] text-chalk/90">
        <p className="text-[6.2cqw] tracking-[0.03em]">{words.mainLabel}</p>
        <CurlArrow className="w-[6cqw]" />
      </div>

      <div className="mt-[4cqw] grid w-[62cqw] grid-cols-8 gap-[1.2cqw]">
        {COLLAGE.map(([col, tilt], i) => (
          <div
            key={i}
            className="relative aspect-square"
            style={{ gridColumn: col, gridRow: i < 2 ? 1 : i < 6 ? 2 : 3 }}
          >
            <Photo
              photo={photos.collage[i]}
              variant="thin"
              tape={null}
              tilt={tilt}
              className="absolute inset-0"
            />
          </div>
        ))}
      </div>

      <div className="mt-auto w-full pl-[3cqw]">
        <p className="flex items-center gap-[1.5cqw] font-type text-[3.6cqw] text-chalk/85">
          <Heart className="w-[4.5cqw]" />
          {words.call}
        </p>
        <p className="hand-text mt-[1.5cqw] pr-[3cqw]">{words.callText}</p>
      </div>
    </div>
  );
}

/**
 * onContinue / extrasOpen: tombol "Lanjut" hanya muncul di desktop
 * (di mobile semua lipatan langsung terbuka).
 */
export function RightPanel({ onContinue, extrasOpen }) {
  return (
    <div className="relative flex h-full flex-col px-[5cqw] pt-[7cqw] pb-[4cqw]">
      <Butterfly className="absolute top-[2cqw] left-[41cqw] w-[9cqw]" />

      <div className="flex items-start gap-[4cqw]">
        <div className="w-[49cqw] pt-[3cqw]">
          <p className="font-type text-[3.8cqw] text-chalk/85">
            {words.rightLabel}
          </p>
          <p className="hand-text mt-[2cqw]">{words.right}</p>
        </div>
        <Photo
          photo={photos.rightTop}
          tape="right"
          tilt={1}
          className="ml-auto aspect-[6/7] w-[39cqw] shrink-0"
        />
      </div>

      <div className="mx-[4cqw] mt-[7cqw]">
        <SongCard song={song} />
      </div>

      <Sticker className="absolute top-[133cqw] left-[68cqw] rotate-6">
        {words.sticker}
      </Sticker>

      <button
        type="button"
        onClick={onContinue}
        inert={extrasOpen}
        tabIndex={extrasOpen ? -1 : 0}
        className={`washi absolute bottom-[8cqw] left-[7cqw] hidden h-[14cqw] w-[36cqw] -rotate-2 font-script text-[7.5cqw] leading-none transition-opacity duration-500 active:scale-95 md:block ${
          extrasOpen ? "pointer-events-none opacity-0" : ""
        }`}
      >
        {words.continue} →
      </button>

      <Photo
        photo={photos.rightBottom}
        tilt={0}
        className="mt-auto mr-[1cqw] ml-auto aspect-[8/7] w-[35cqw]"
      />
    </div>
  );
}
