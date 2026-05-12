// Tugas 2: Buat array untuk menyimpan koleksi buku
// Array ini akan digunakan sebagai penyimpanan data sementara selama aplikasi berjalan
// Pertimbangkan tipe data yang tepat untuk array ini berdasarkan definisi Book yang sudah dibuat

import { Book } from '../types/index';

const STORAGE_KEY = 'my_library_data';

export const storage = {
  save(books: Book[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  },

  load(): Book[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
};