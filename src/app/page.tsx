"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/book-card";
import { Book } from "@/lib/types";
import { Search, ShoppingCart, Menu, MapPin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load books", err));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors?.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* --- Amazon Mobile Header --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#232f3e] text-white shadow-md">

        {/* Top Row: Logo & Icons */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6" />
            <span className="font-bold text-xl tracking-wide select-none">amazon.com.tr</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium flex items-center gap-1">
              Sign In <span className="opacity-70 text-xs">›</span>
            </span>
            <ShoppingCart className="w-7 h-7" />
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="px-3 pb-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search Amazon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-none py-2.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-[#ff9900] sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="w-5 h-5 bg-gray-400/30 rounded sm:hidden"></div> {/* Scan icon placeholder */}
            </div>
          </div>
        </div>

        {/* Location Sub-header */}
        <div className="bg-[#37475a] px-4 py-2 flex items-center gap-2 text-sm overflow-x-auto text-nowrap scrollbar-hide">
          <MapPin size={16} />
          <span className="font-light">Deliver to Turkey</span>
        </div>
      </header>

      {/* --- Main Content Feed --- */}
      {/* Added pt-[140px] to account for the triple-decker fixed header */}
      <div className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory bg-[#e3e6e6]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} index={index} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full pt-40 px-6 text-center text-gray-800">
            <p className="text-lg">No results found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
