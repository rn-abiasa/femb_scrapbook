// ============================================================
// Foto scrapbook, diisi manual satu per satu.
//
// Setiap foto adalah objek:
//   id      wajib, unik (dipakai untuk membuka preview)
//   src     alamat gambar. Taruh file di folder public/photos/ lalu
//           tulis "/photos/nama-file.jpg". Kosongkan ("") untuk placeholder.
//   caption teks di preview dan deskripsi (alt) foto
//
// Ukuran bingkai di scrapbook tetap, apa pun ukuran gambarnya.
// Gambar otomatis dipotong (cover) supaya pas di bingkai.
// ============================================================

import one from "../assets/11.webp";
import two from "../assets/12.webp";
import three from "../assets/13.webp";
import four from "../assets/14.webp";
import five from "../assets/15.webp";

export const photos = {
  // panel kiri
  leftTop: { id: "left-top", src: four, caption: "Awal cerita kita" },
  leftBottom: { id: "left-bottom", src: five, caption: "Hari yang tenang" },

  // kolase panel tengah: 8 foto
  // urutan: 2 besar (baris 1), 4 kecil (baris 2), 2 kecil (baris 3)
  collage: [
    { id: "collage-1", src: one, caption: "Jalan-jalan sore" },
    { id: "collage-2", src: two, caption: "Foto random" },
    { id: "collage-3", src: three, caption: "Ketawa tanpa sebab" },
    { id: "collage-4", src: four, caption: "Pose paling kompak" },
    { id: "collage-5", src: five, caption: "Makan bareng" },
    { id: "collage-6", src: one, caption: "Hari yang panjang" },
    { id: "collage-7", src: two, caption: "Di perjalanan" },
    { id: "collage-8", src: three, caption: "Sore yang hangat" },
  ],

  // panel kanan
  rightTop: { id: "right-top", src: one, caption: "Kenangan favorit" },
  rightBottom: { id: "right-bottom", src: two, caption: "Selalu begini" },
};
