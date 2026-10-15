// ============================================================
// Semua isi scrapbook diatur dari file ini.
// Foto: taruh file di src/assets/photos/ dengan nama berurutan
// (01.jpg, 02.jpg, ... 12.jpg). Slot yang belum ada fotonya
// otomatis menampilkan placeholder.
//
// Urutan slot foto:
//   01      panel kiri, atas
//   02      panel kiri, bawah
//   03-10   kolase tengah (2 besar, 4 kecil, 2 kecil)
//   11      panel kanan, atas
//   12      panel kanan, bawah
// ============================================================

const files = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const urls = Object.keys(files)
  .sort()
  .map((key) => files[key]);

export const config = {
  name: "Sella",
  age: 21,
};

export const words = {
  leftCaption: "Happy birthday",
  leftCaptionHand: "(untuk seseorang yang spesial banget)",
  left: "Ini tempat untuk cerita pertama kalian. Tulis hari pertama bertemu, hal kecil yang masih diingat. Ganti teks ini dengan suratmu sendiri.",
  mainTitle: (name) => `Happy Birthday dear ${name}`,
  mainLabel: "Favourite person",
  call: "Panggilan masuk 2j 15m 6d",
  callText: "Telepon yang panjang itu selalu terasa singkat kalau sama kamu.",
  rightLabel: "I love you",
  right:
    "Terima kasih sudah jadi tempat cerita paling aman. Tulis surat penutup di sini, pakai bahasamu sendiri.",
  sticker: "Besties",
  close: "Tutup scrapbook",
};

export const song = {
  label: "Lagu kita",
  // ID video YouTube: bagian setelah "v=" pada link,
  // misalnya youtube.com/watch?v=dQw4w9WgXcQ -> "dQw4w9WgXcQ"
  youtubeId: "__Pb1fO2H2A",
  title: "Kita Lewati Berdua",
  artist: "Overnight",
};

const slots = [
  { caption: "Awal cerita kita", hue: 340 },
  { caption: "Hari yang tenang", hue: 200 },
  { caption: "Jalan-jalan sore", hue: 20 },
  { caption: "Foto random", hue: 280 },
  { caption: "Ketawa tanpa sebab", hue: 150 },
  { caption: "Pose paling kompak", hue: 330 },
  { caption: "Makan bareng", hue: 45 },
  { caption: "Hari yang panjang", hue: 210 },
  { caption: "Di perjalanan", hue: 300 },
  { caption: "Sore yang hangat", hue: 10 },
  { caption: "Kenangan favorit", hue: 120 },
  { caption: "Selalu begini", hue: 310 },
];

export const photos = slots.map((slot, i) => ({
  id: i,
  caption: slot.caption,
  hue: slot.hue,
  src: urls[i] ?? null,
}));
