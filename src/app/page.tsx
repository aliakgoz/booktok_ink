"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/book-card";
import { Book } from "@/lib/types";
import { Search, Menu, ShoppingCart, User, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load books", err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#e3e6e6] font-sans">

      {/* 1. Header (Amazon Green) */}
      <header className="fixed top-0 w-full z-50 bg-[#00453e] p-3 flex items-center gap-3 shadow-md h-[64px]">
        <button className="text-white">
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 bg-white rounded-md h-10 flex items-center px-3 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="ml-2 text-gray-400 text-sm truncate">Search Amazon</span>
        </div>

        <button className="text-white">
          {/* Simple visual placeholder for cart/scan */}
          <ShoppingCart className="w-6 h-6" />
        </button>
      </header>

      {/* 2. Main Scroll Area */}
      {/* pt-[64px] for header, pb-[50px] for footer */}
      <div className="snap-y snap-mandatory h-[100dvh] w-full overflow-y-scroll pt-[64px] pb-[50px] scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-[#FFD814] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          books.map((book, index) => (
            <BookCard key={index} book={book} index={index} />
          ))
        )}
      </div>

      {/* 3. Footer (Fixed Bottom Nav) */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-300 h-[50px] flex justify-around items-center z-50 pb-1">
        <div className="flex flex-col items-center">
          <HomeIcon className="w-6 h-6 text-[#007185]" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center">
          <User className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center relative">
          <span className="absolute -top-2 -right-2 bg-[#e77600] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
          <ShoppingCart className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center">
          <Menu className="w-6 h-6 text-black" strokeWidth={2} />
        </div>
      </footer>

    </main>
  );
}
