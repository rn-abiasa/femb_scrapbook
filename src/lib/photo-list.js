import { photos } from "../data/photos";
import { timeline } from "../data/timeline";

// Daftar datar semua foto yang bisa dibuka di dialog preview (urutan = urutan geser).
export const photoList = [
  photos.leftTop,
  photos.leftBottom,
  ...photos.collage,
  photos.rightTop,
  photos.rightBottom,
  ...timeline.items.filter((item) => item.photo).map((item) => item.photo),
];
