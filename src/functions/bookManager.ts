// Tugas 3: Implementasikan fungsi-fungsi manajemen buku

// Fungsi addBook
// Fungsi ini digunakan untuk menambahkan buku baru ke dalam koleksi
// Parameter yang dibutuhkan: data buku sesuai tipe Book
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan bagaimana cara menambahkan buku ke array yang sudah disediakan


// Fungsi listBooks
// Fungsi ini digunakan untuk menampilkan semua buku yang tersimpan
// Tidak memerlukan parameter
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: pikirkan cara menampilkan data buku dengan format yang mudah dibaca


// Fungsi searchBook
// Fungsi ini digunakan untuk mencari buku berdasarkan judul
// Parameter title bersifat opsional (bisa ada atau tidak)
// Fungsi ini tidak mengembalikan nilai (void)
// Petunjuk: jika parameter title diberikan, cari buku yang cocok
//           jika tidak diberikan, tampilkan semua buku atau berikan informasi yang sesuai

import { Book } from '../types/index';
import { storage } from '../data/books';

export class BookManager {
    private books: Book[];

    constructor() {
        this.books = storage.load();
    }

    addBook(title: string, author: string, publicationYear: number): void {
        const newBook: Book = {
            id: Date.now(),
            title,
            author,
            publicationYear,
            isAvailable: true
        };
        this.books.push(newBook);
        storage.save(this.books);
        console.log(`Buku "${title}" berhasil ditambahkan.`);
    }

    listBooks(): void {
        console.log("\n--- Daftar Buku ---");
        if (this.books.length === 0) {
            console.log("Koleksi kosong.");
        } else {
            this.books.forEach(b => 
                console.log(`[${b.id}] ${b.title} - ${b.author}`)
            );
        }
    }

    deleteBook(id: number): void {
        this.books = this.books.filter(b => b.id !== id);
        storage.save(this.books);
        console.log(`Buku ID ${id} dihapus.`);
    }

    // FILTER: Berdasarkan Judul
    searchByTitle(query: string): Book[] {
        const result = this.books.filter(b => 
            b.title.toLowerCase().includes(query.toLowerCase())
        );
        this.displayResult(result, `Hasil pencarian judul: "${query}"`);
        return result;
    }

    // FILTER: Berdasarkan Penulis
    filterByAuthor(authorName: string): Book[] {
        const result = this.books.filter(b => 
            b.author.toLowerCase() === authorName.toLowerCase()
        );
        this.displayResult(result, `Buku karya: ${authorName}`);
        return result;
    }

    // Helper function untuk menampilkan hasil di console
    private displayResult(books: Book[], message: string): void {
        console.log(`\n--- ${message} ---`);
        if (books.length === 0) {
            console.log("Data tidak ditemukan.");
        } else {
            books.forEach(b => console.log(`- ${b.title} (${b.author})`));
        }
    }

    // Refresh data dari storage
    refreshData(): void {
        this.books = storage.load();
    }
}