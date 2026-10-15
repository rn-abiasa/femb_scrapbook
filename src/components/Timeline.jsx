import { Heart } from "./Decor";
import Photo from "./Photo";
import { timeline } from "../data/timeline";

const FADE = "linear-gradient(to bottom, transparent, #000 4%, #000 92%, transparent)";

export default function TimelinePanel() {
  const last = timeline.items.length - 1;

  return (
    <div className="relative flex h-full flex-col px-[6cqw] pt-[7cqw] pb-[3cqw]">
      <p className="font-type text-[3.8cqw] text-chalk/80">{timeline.label}</p>
      <h2 className="mt-[1.5cqw] font-hand text-[8.5cqw] leading-none tracking-[0.03em] text-chalk">
        {timeline.title}
      </h2>

      {/* daftar bisa digulir ke bawah kalau item-nya banyak */}
      <ol
        data-vscroll
        className="no-scrollbar mt-[6cqw] min-h-0 flex-1 overflow-y-auto overscroll-contain pt-[2cqw]"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        {timeline.items.map((item, i) => (
          <li key={item.id} className="relative pb-[7cqw] pl-[9cqw]">
            {i < last && (
              <span
                aria-hidden="true"
                className="absolute top-[3cqw] bottom-0 left-[2.4cqw] border-l-[0.3cqw] border-dashed border-chalk/35"
              />
            )}
            <Heart className="absolute top-[0.4cqw] left-0 w-[5.2cqw] text-rose" fill="#e3b4c0" />

            <p className="font-type text-[3.6cqw] text-rose">{item.date}</p>
            <p className="mt-[1cqw] font-hand text-[6.2cqw] leading-tight text-chalk">
              {item.title}
            </p>
            <p className="hand-text mt-[1cqw] text-[4.8cqw]">{item.text}</p>

            {item.photo && (
              <Photo
                photo={item.photo}
                variant="thin"
                tape="left"
                tilt={i % 2 ? 1.2 : -1.2}
                className="mt-[4cqw] aspect-[4/3] w-[40cqw]"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
