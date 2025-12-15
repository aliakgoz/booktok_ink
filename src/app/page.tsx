"use client";

import { useState } from "react";
import booksData from "@/data/books.json";
import { Book } from "@/lib/types";
import { BookCard } from "@/components/book-card";
import { Search } from "lucide-react";

const allBooks: Book[] = booksData as unknown as Book[];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="fixed inset-0 bg-black text-white w-full h-[100dvh]">

      {/* Top Floating Header (Absolute) */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
            BookTok.inc
          </h1>

          {/* Minimal Search */}
          <div className="relative w-40">
            <input
              type="text"
              className="w-full bg-white/10 border border-white/20 rounded-full py-1 pl-8 pr-3 text-xs text-white placeholder-white/50 focus:outline-none focus:bg-black/50 transition-all backdrop-blur-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
        </div>
      </header>

      {/* Vertical Snap Feed */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500 snap-start">
            No books found matching your search.
          </div>
        )}
      </div>

    </main>
  );
}
