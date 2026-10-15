import { AgeLoop, Bunting, Butterfly, Flower, Sparkle } from "./Decor";

export default function Cover({ name, age, onOpen }) {
  return (
    <div className="relative h-full">
      <span aria-hidden="true" className="tape tape-mauve tape-corner-tl" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[3.5cqw] border-[0.3cqw] border-dashed border-chalk/30"
      />

      <h1 className="sr-only">
        Happy birthday {name}, {age} tahun
      </h1>

      <Bunting className="absolute top-[12cqw] left-1/2 w-[78cqw] -translate-x-1/2" />

      <Sparkle className="absolute top-[78cqw] left-[10cqw] w-[4.5cqw] text-chalk/70" />
      <Sparkle className="absolute top-[134cqw] right-[10cqw] w-[3.5cqw] text-chalk/70" />
      <Butterfly className="absolute top-[84cqw] right-[7cqw] w-[10.5cqw]" />

      <div
        className="absolute top-[68cqw] left-1/2 grid size-[34cqw] -translate-x-1/2 place-items-center"
        aria-hidden="true"
      >
        <AgeLoop className="absolute inset-0 h-full w-full text-chalk/60" />
        <span className="font-display text-[21cqw] leading-none text-chalk">{age}</span>
      </div>

      <p className="absolute inset-x-0 top-[125cqw] text-center font-type text-[4.6cqw] text-chalk/80">
        untuk {name}
      </p>

      <Flower className="absolute top-[140cqw] left-[4.5cqw] w-[13cqw]" />

      <div className="absolute bottom-[9cqw] left-1/2 h-[17cqw] w-[41cqw] -translate-x-1/2">
        <Sparkle className="twinkle absolute -top-[3cqw] -left-[4cqw] w-[4.5cqw] text-chalk/80" />
        <Sparkle className="twinkle twinkle-b absolute -right-[3cqw] -bottom-[2cqw] w-[3.5cqw] text-rose" />
        <button
          type="button"
          onClick={onOpen}
          className="washi open-btn h-full w-full -rotate-2 font-script text-[8.5cqw] leading-none"
        >
          Buka
        </button>
      </div>
    </div>
  );
}
