# TODO — BlackboxAI Music Player Update

## Step 1 — Repo understanding
- [x] Baca `script.js`, `index.html`, `style.css` untuk lihat implementasi lyrics/next-prev/ended.

## Step 2 — Lyric sync + advanced LRC
- [ ] Ubah `loadLyrics()` agar memuat file LRC dari `song.lrc` untuk semua lagu.
- [ ] Jadikan `lrcEmbedded` hanya fallback bila fetch gagal (mis. file://).

## Step 3 — Skip song (next/prev)
- [ ] Ubah handler tombol `prev` agar memanggil `loadSong(index-1)`.
- [ ] Ubah handler tombol `next` agar memanggil `loadSong(index+1)`.
- [ ] Tetap dukung shuffle/repeat sesuai state yang ada.

## Step 4 — Auto-advance saat lagu selesai
- [ ] Ubah `audio.ended`:
  - repeat: ulang lagu saat ini
  - shuffle: lanjut acak dengan tetap main
  - selain itu: lanjut id berikutnya (0→1→2→...)

## Step 5 — Verifikasi manual
- [ ] Jalankan `index.html` di browser:
  - next/prev berpindah lagu
  - lirik word-by-word mengikuti timeline
  - lagu selesai otomatis lanjut lagu berikutnya

