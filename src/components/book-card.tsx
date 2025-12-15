"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start relative bg-black flex flex-col">

            {/* 1. Background Layer (Separate) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {book.cover_image && (
                    <Image
                        src={book.cover_image}
                        alt="bg"
                        fill
                        className="object-cover blur-[50px] opacity-30 brightness-[0.3]"
                        priority={index === 0}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
            </div>

            {/* 2. Top Section: Image & Interactions (Flex Grow) */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center w-full px-8 pt-16">

                {/* Book Cover Container with localized shadow */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[240px] aspect-[2/3] rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] border border-white/5"
                >
                    {book.cover_image && (
                        <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover rounded-xl"
                            priority={index < 2}
                        />
                    )}
                </motion.div>

                {/* Right Interaction Sidebar (Absolute to the image area, ensuring right-alignment) */}
                <div className="absolute right-4 bottom-10 flex flex-col gap-5 items-center">
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/5 rounded-full text-white shadow-lg active:scale-90 transition-all">
                            <Heart size={24} className="stroke-[2px]" />
                        </button>
                        <span className="text-[10px] font-bold text-white/80">{book.rating}</span>
                    </div>

                    <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/5 rounded-full text-white shadow-lg active:scale-90 transition-all">
                        <Share2 size={20} className="stroke-[2px]" />
                    </button>
                </div>
            </div>

            {/* 3. Bottom Section: Details & CTA (Fixed padding) */}
            <div className="relative z-20 w-full px-6 pb-24 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                        {book.title}
                    </h2>

                    <p className="text-white/70 font-medium text-sm">
                        {book.authors?.join(", ")}
                    </p>

                    <p className="text-white/50 text-xs line-clamp-2 leading-relaxed max-w-[90%]">
                        {book.description}
                    </p>

                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-center gap-2 w-full h-[56px] rounded-full bg-[#FF9900] text-black font-bold text-base shadow-[0_0_20px_rgba(255,153,0,0.25)] hover:bg-[#ffad33] active:scale-[0.98] transition-all"
                    >
                        <span>Buy on Amazon</span>
                        <ShoppingCart size={18} strokeWidth={2.5} />
                    </a>
                </motion.div>
            </div>

        </div>
    );
};
