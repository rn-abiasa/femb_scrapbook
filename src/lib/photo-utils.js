// Warna placeholder untuk foto yang belum punya `src`, stabil berdasarkan id.
export function placeholderBackground(photo) {
  const key = String(photo.id ?? photo.caption ?? "");
  let hue = 0;
  for (let i = 0; i < key.length; i += 1) hue = (hue * 31 + key.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${hue} 22% 30%), hsl(${(hue + 30) % 360} 26% 20%))`;
}
