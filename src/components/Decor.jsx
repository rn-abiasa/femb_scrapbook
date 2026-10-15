const FLAG_COLORS = ["#f0c8d2", "#f4d6dc", "#dba0b2"];
const PITCH = 10.2;

function BuntingRow({ text, y0, sag }) {
  const n = text.length;
  const span = n * PITCH;
  const x0 = 50 - span / 2;
  const start = x0 - 2;
  const length = span + 4;
  const y = (x) => y0 + sag * Math.sin((Math.PI * (x - start)) / length);

  const string = Array.from({ length: 31 }, (_, i) => {
    const x = start + (length * i) / 30;
    return `${i ? "L" : "M"}${x.toFixed(2)} ${y(x).toFixed(2)}`;
  }).join(" ");

  return (
    <g>
      <path d={string} fill="none" stroke="#ece6d8" strokeOpacity="0.75" strokeWidth="0.35" />
      {text.split("").map((c, i) => {
        const x = x0 + PITCH * (i + 0.5);
        const slope = (Math.atan(y(x + 0.5) - y(x - 0.5)) * 180) / Math.PI;
        return (
          <g key={i} transform={`translate(${x.toFixed(2)} ${y(x).toFixed(2)}) rotate(${slope.toFixed(1)})`}>
            <path d="M-4.6 0H4.6V9.4L0 12.4L-4.6 9.4Z" fill={FLAG_COLORS[i % 3]} />
            <text
              x="0"
              y="7.2"
              textAnchor="middle"
              fontSize="5.6"
              fill="#2a2326"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function Bunting({ className = "" }) {
  return (
    <svg viewBox="0 0 100 36" className={className} role="img" aria-label="Happy birthday">
      <BuntingRow text="HAPPY" y0={2} sag={3.4} />
      <BuntingRow text="BIRTHDAY" y0={19} sag={3.8} />
    </svg>
  );
}

export function Heart({ className = "", fill = "none" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.4 5c2.1 0 3.9 1.2 5.6 3.4C13.7 6.2 15.5 5 17.6 5 21 5 22.8 8.6 21.5 11.8 19.5 16.4 12 21 12 21z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1C12.8 8 16 11.2 23 12C16 12.8 12.8 16 12 23C11.2 16 8 12.8 1 12C8 11.2 11.2 8 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CurlArrow({ className = "" }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path
        d="M4 6C20 2 34 14 26 26C20 34 10 28 16 22C20 18 28 24 36 38M30 33L36 39L28 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plane({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M3 24L45 4L30 44L22 28ZM22 28L45 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// lingkaran coretan tangan, ujungnya sedikit tumpang tindih
export function AgeLoop({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M56 5C80 4 96 26 94 52C92 78 70 96 46 94C22 92 6 70 8 46C10 24 30 8 58 9C66 9 72 12 78 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Flower({ className = "" }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="#ece6d8" stroke="#ece6d8" strokeWidth="5" strokeLinejoin="round">
        {petals.map((a) => (
          <ellipse key={a} cx="32" cy="19" rx="8" ry="12" transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="6" />
      </g>
      <g fill="#a9bde0" stroke="#8c9fc4" strokeWidth="0.8">
        {petals.map((a) => (
          <ellipse key={a} cx="32" cy="19" rx="8" ry="12" transform={`rotate(${a} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="4.2" fill="#ece6d8" stroke="#8c9fc4" strokeWidth="0.8" />
    </svg>
  );
}

export function Butterfly({ className = "" }) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true">
      <path d="M32 28C22 6 2 4 5 24C7 36 20 38 32 28Z" fill="#dfae3c" />
      <path d="M32 28C42 6 62 4 59 24C57 36 44 38 32 28Z" fill="#dfae3c" />
      <path d="M32 30C22 36 14 50 22 52C28 54 32 44 32 30Z" fill="#c99428" />
      <path d="M32 30C42 36 50 50 42 52C36 54 32 44 32 30Z" fill="#c99428" />
    </svg>
  );
}

export function Sticker({ children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full border-[0.7cqw] border-[#f3d9e0] bg-rose px-[3.5cqw] py-[0.6cqw] font-hand text-[5.6cqw] leading-tight text-ink ${className}`}
    >
      {children}
    </span>
  );
}
