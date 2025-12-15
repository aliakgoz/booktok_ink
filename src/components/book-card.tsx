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
        <div className="h-[100dvh] w-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background Blur Layer */}
            <div className="absolute inset-0 z-0">
                {book.cover_image && (
                    <Image
                        src={book.cover_image}
                        alt="background"
                        fill
                        className="object-cover blur-[40px] opacity-40 scale-125 brightness-50"
                        priority={index === 0}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-lg h-full flex flex-col justify-end p-6 pb-20 md:justify-center md:pb-6">

                {/* Book Cover (Centered) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[65vw] max-w-[300px] aspect-[2/3] rounded-lg shadow-2xl shadow-black/50 overflow-hidden border-2 border-white/10"
                >
                    {book.cover_image ? (
                        <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover"
                            priority={index < 2}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
                            No Cover
                        </div>
                    )}
                </motion.div>

                {/* Right Interaction Bar */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-20">
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-all active:scale-90">
                            <Heart size={28} fill="currentColor" className="text-white/20 stroke-white hover:fill-red-500 hover:stroke-red-500 transition-colors" />
                        </button>
                        <span className="text-xs font-bold text-white drop-shadow-md">{book.rating}</span>
                    </div>

                    <button className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/20 transition-all active:scale-90">
                        <Share2 size={24} />
                    </button>
                </div>


                {/* Bottom Details & CTA */}
                <div className="mt-auto space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-1"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                            {book.title}
                        </h2>
                        <p className="text-white/80 font-medium text-lg drop-shadow-sm">
                            {book.authors?.join(", ")}
                        </p>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/60 text-sm line-clamp-3 md:line-clamp-4 leading-relaxed"
                    >
                        {book.description}
                    </motion.p>

                    <motion.a
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 w-full rounded-full bg-[#FF9900] hover:bg-[#FFAD33] px-6 py-4 text-black font-extrabold text-lg shadow-[0_0_20px_rgba(255,153,0,0.4)] transition-all active:scale-95 mt-4"
                    >
                        <span>Buy on Amazon</span>
                        <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </div>
        </div>
    );
};
