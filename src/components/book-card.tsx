"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { Headphones, Share2, Star, ChevronDown, BookOpen } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start relative flex flex-col items-center justify-center overflow-hidden bg-black">

            {/* --- LAYER 0: ATMOSPHERE (Background) --- */}
            <div className="absolute inset-0 z-0">
                {book.cover_image && (
                    <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} // Slow breathe effect
                        className="relative w-full h-full"
                    >
                        <Image
                            src={book.cover_image}
                            alt="atmosphere"
                            fill
                            className="object-cover blur-[50px] brightness-[0.6] opacity-60"
                            priority={index === 0}
                        />
                    </motion.div>
                )}
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
            </div>

            {/* --- LAYER 1: THE HERO (Book Cover) --- */}
            {/* Position: Top Half, Vertically Centered relative to available space */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-8 pb-20">
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-[65vw] max-w-[280px] aspect-[2/3] rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
                    style={{ transform: "perspective(1000px) rotateY(-5deg)" }} // 3D Effect hint
                >
                    {book.cover_image && (
                        <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover rounded-lg ring-1 ring-white/10"
                            priority={index < 2}
                        />
                    )}

                    {/* Play Preview Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-lg">
                            <Headphones fill="white" className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- LAYER 2: BOTTOM SHEET (Glassmorphism Info Panel) --- */}
            <div className="relative z-20 w-full flex flex-col justify-end pb-8 px-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">

                {/* Text Content */}
                <div className="space-y-3 mb-6">
                    {/* Title - Extra Bold Sans-Serif */}
                    <h2 className="text-3xl font-oswald font-bold text-white leading-tight drop-shadow-lg line-clamp-2">
                        {book.title}
                    </h2>

                    {/* Meta: Author & Rating */}
                    <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                        <span>{book.authors?.[0] || "Unknown Author"}</span>
                        <div className="w-1 h-1 rounded-full bg-white/50" />
                        <div className="flex items-center gap-1 text-[#FFD700]">
                            <Star size={14} fill="currentColor" />
                            <span>{book.rating || 4.8}</span>
                            <span className="text-white/50 font-normal ml-1 text-xs">(12.5k+)</span>
                        </div>
                    </div>

                    {/* Hook / Description */}
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2 font-inter font-light">
                        {book.description || "A masterpiece that will change your perspective. Essential reading for everyone."}
                    </p>
                </div>

                {/* CTA Button - Pulse Effect */}
                <a
                    href={book.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full h-[58px] flex items-center justify-center gap-3 rounded-full bg-[#FF9900] text-black font-extrabold text-lg tracking-wide shadow-[0_0_30px_rgba(255,153,0,0.4)] active:scale-[0.98] transition-all overflow-hidden"
                >
                    {/* Pulse Animation Ring */}
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping opacity-20" />

                    <span>LISTEN FREE</span>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amz" width={50} height={15} className="opacity-80 brightness-0 mix-blend-multiply" />
                </a>

                {/* Scroll Hint */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-40 animate-bounce">
                    <ChevronDown size={20} className="text-white" />
                </div>

            </div>

            {/* Floating Share Button (Top Right) */}
            <button className="absolute top-6 right-6 z-30 p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full text-white active:scale-90 transition-all">
                <Share2 size={22} strokeWidth={2} />
            </button>

        </div>
    );
};
