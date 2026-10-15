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
      date: "14 FEBRUARI 2025",
      title: "The Day We Met",
      text: "Hari itu mungkin terlihat biasa, tapi ternyata menjadi awal dari cerita yang begitu berarti.",
      photo: { id: "timeline-1", src: four, caption: "Pertama ketemu" },
    },
    {
      id: "t-2",
      date: "28 FEBRUARI 2025",
      title: "Our First Conversation",
      text: "Dari obrolan sederhana, kita mulai mengenal satu sama lain dan menemukan hal-hal kecil yang membuat kita nyaman.",
    },
    {
      id: "t-3",
      date: "14 MARET 2025",
      title: "A Little Closer",
      text: "Hari demi hari, percakapan kita terasa semakin berarti. Tanpa sadar, kamu mulai menjadi bagian favorit dari hariku.",
      photo: { id: "timeline-3", src: five, caption: "Jalan bareng pertama" },
    },
    {
      id: "t-4",
      date: "20 APRIL 2025",
      title: "My Favorite Memories",
      text: "Kita mulai mengumpulkan banyak kenangan kecil yang mungkin sederhana, tapi akan selalu punya tempat spesial di hati.",
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
