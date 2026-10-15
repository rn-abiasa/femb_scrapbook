// ============================================================
// Timeline "Perjalanan kita" (lipatan keempat).
// Tambah, hapus, atau urutkan item sesuka hati.
// Foto bersifat opsional: hapus baris `photo` kalau tidak ada.
// Aturan foto sama seperti di photos.js (id unik, src dari public/photos/).
// ============================================================

import three from "../assets/12.webp";
import four from "../assets/14.webp";
import five from "../assets/15.webp";

export const timeline = {
  label: "Perjalanan kita",
  title: "Dari awal sampai sekarang",
  items: [
    {
      id: "t-1",
      date: "Tanggal pertama",
      title: "Pertama ketemu",
      text: "Ceritakan hari itu: di mana, siapa yang menyapa duluan, apa yang kamu pikirkan.",
      photo: { id: "timeline-1", src: four, caption: "Pertama ketemu" },
    },
    {
      id: "t-2",
      date: "Bulan setelahnya",
      title: "Mulai sering ngobrol",
      text: "Obrolan yang tadinya singkat mulai jadi panjang dan susah dihentikan.",
    },
    {
      id: "t-3",
      date: "Suatu sore",
      title: "Jalan bareng pertama",
      text: "Tempat yang biasa saja jadi terasa spesial karena ada kamu.",
      photo: { id: "timeline-3", src: five, caption: "Jalan bareng pertama" },
    },
    {
      id: "t-4",
      date: "Hari yang berat",
      title: "Saling menemani",
      text: "Tidak banyak kata, cukup ada di sana.",
    },
    {
      id: "t-5",
      date: "Hari ini",
      title: "Ulang tahunmu",
      text: "Dan cerita kita masih terus ditulis.",
      photo: { id: "timeline-5", src: three, caption: "Hari ini" },
    },
  ],
};
