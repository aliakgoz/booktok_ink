"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start relative bg-neutral-950 flex flex-col overflow-hidden">

            {/* 1. Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {book.cover_image && (
                    <Image
                        src={book.cover_image}
                        alt="bg"
                        fill
                        className="object-cover blur-[60px] opacity-20 brightness-[0.4] scale-110"
                        priority={index === 0}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950" />
            </div>

            {/* 2. Safe Layout Container - Flex Vertical */}
            <div className="relative z-10 w-full h-full flex flex-col max-w-md mx-auto px-6">

                {/* Header Spacer (approx 80px for search bar) */}
                <div className="h-24 shrink-0" />

                {/* CENTRE: Image & Actions */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-0">

                    {/* Book Cover */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative w-auto h-auto max-h-[45vh] aspect-[2/3] rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
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

                    {/* Action Row (Below Image - No Overlap) */}
                    <div className="flex items-center gap-6">
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/5 group-active:scale-90 transition-all">
                                <Heart className="w-6 h-6 text-white/50 group-hover:text-red-500 transition-colors" />
                            </div>
                            <span className="text-[10px] text-white/40 font-medium">{book.rating}</span>
                        </button>

                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/5 group-active:scale-90 transition-all">
                                <Share2 className="w-6 h-6 text-white/50 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <span className="text-[10px] text-white/40 font-medium">Share</span>
                        </button>
                    </div>

                </div>

                {/* BOTTOM: Text & CTA */}
                <div className="shrink-0 pb-12 pt-6 flex flex-col gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                            {book.title}
                        </h2>
                        <p className="text-white/60 text-base font-medium mt-1">
                            {book.authors?.join(", ")}
                        </p>
                    </div>

                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-white text-black font-bold text-lg hover:bg-neutral-200 active:scale-95 transition-all"
                    >
                        <span>Check Price</span>
                        <ShoppingCart size={18} />
                    </a>

                    {/* Extra spacing for bottom bar safe area */}
                    <div className="h-6" />
                </div>

            </div>
        </div>
    );
};
