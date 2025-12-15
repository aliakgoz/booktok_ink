"use client";

import { useMemo, useState } from "react";
import { BookCard } from "@/components/book-card";
import { Book } from "@/lib/types";
import booksData from "@/data/books.json";
import { Search, Menu, ShoppingCart, User, Home as HomeIcon, MapPin } from "lucide-react";

const allBooks = booksData as Book[];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return allBooks;

    return allBooks.filter((book) => {
      const haystack = [
        book.title,
        book.authors?.join(" "),
        book.categories?.join(" "),
        book.description,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchTerm]);

  return (
    <main className="flex min-h-screen flex-col bg-[#e3e6e6]">
      <header className="fixed top-0 w-full z-50 bg-[#131921] shadow-md">
        <div className="max-w-6xl mx-auto px-3 py-3 flex items-center gap-3">
          <button className="text-white flex items-center gap-1 text-sm font-semibold">
            <Menu className="w-5 h-5" />
            <span className="hidden sm:inline">All</span>
          </button>

          <form className="flex-1 relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books, authors, keywords"
              className="w-full h-11 rounded-md bg-white pl-3 pr-12 text-sm text-[#0F1111] outline-none border border-[#f3a847] focus:ring-2 focus:ring-[#ffed96] shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 rounded-r-md bg-[#febd69] border border-[#f3a847] flex items-center justify-center"
              aria-label="Search books"
            >
              <Search className="w-5 h-5 text-[#0F1111]" />
            </button>
          </form>

          <button className="text-white hidden sm:flex items-center gap-1 text-sm">
            <User className="w-5 h-5" />
            <span>Account</span>
          </button>

          <button className="text-white flex items-center gap-1 text-sm relative">
            <span className="absolute -top-1 -right-2 bg-[#f69931] text-[#0F1111] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>

        <div className="bg-[#232f3e] text-gray-200 text-[11px] leading-tight">
          <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              Deliver to you • Showing {filteredBooks.length} of {allBooks.length} books
            </span>
          </div>
        </div>
      </header>

      <div className="snap-y snap-mandatory h-[100dvh] w-full overflow-y-auto pt-[120px] pb-[72px] scrollbar-hide">
        {filteredBooks.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-[#565959] px-4">
            No books match &ldquo;{searchTerm}&rdquo;. Try another keyword.
          </div>
        ) : (
          filteredBooks.map((book, index) => (
            <BookCard key={book.id || index} book={book} index={index} />
          ))
        )}
      </div>

      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-300 h-[60px] flex justify-around items-center z-50 pb-1">
        <div className="flex flex-col items-center">
          <HomeIcon className="w-6 h-6 text-[#007185]" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center">
          <User className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center relative">
          <span className="absolute -top-2 -right-2 bg-[#e77600] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
          <ShoppingCart className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center">
          <Menu className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
      </footer>
    </main>
  );
}
