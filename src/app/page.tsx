"use client";

import { useState } from "react";
import booksData from "@/data/books.json";
import { Book } from "@/lib/types";
import { BookCard } from "@/components/book-card";
import { Search } from "lucide-react";

// Cast the imported json to Book[] to be safe if types don't align perfectly automatically
const allBooks: Book[] = booksData as unknown as Book[];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      {/* Header / Hero */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          BookTok.inc
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          The ultimate collection of books that change lives. Curated, aesthetic, and impactful.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mt-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border border-gray-700 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-sm"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No books found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600 text-sm pb-8">
        <p>© 2024 BookTok.inc. All rights reserved.</p>
        <p>As an Amazon Associate we earn from qualifying purchases.</p>
      </footer>
    </main>
  );
}
