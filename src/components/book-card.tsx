"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { ExternalLink, Star, Share2, Heart } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background Blur */}
            <div className="absolute inset-0 z-0">
                {book.cover_image && (
                    <Image
                        src={book.cover_image}
                        alt="background"
                        fill
                        className="object-cover blur-3xl opacity-30 scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md h-full flex flex-col p-6 pt-20 pb-24">

                {/* Book Cover */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                    className="relative aspect-[2/3] w-full max-h-[60vh] rounded-xl shadow-2xl overflow-hidden self-center mb-auto"
                >
                    {book.cover_image ? (
                        <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            className="object-cover"
                            priority={index < 2} // Load first couple images eagerly
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
                            No Cover
                        </div>
                    )}
                </motion.div>

                {/* Right Action Bar (TikTok Style) */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-20">
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-gray-800/60 backdrop-blur-md rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-colors">
                            <Heart size={28} fill="currentColor" className="text-transparent stroke-white hover:fill-red-500 hover:stroke-red-500 transition-colors" />
                        </button>
                        <span className="text-xs font-medium text-white shadow-black drop-shadow-md">{book.rating}</span>
                    </div>

                    <button className="p-3 bg-gray-800/60 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                        <Share2 size={24} />
                    </button>
                </div>


                {/* Bottom Details Overlay */}
                <div className="flex flex-col gap-3 mt-4 text-left">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg"
                    >
                        {book.title}
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/90 font-medium text-lg drop-shadow-md"
                    >
                        {book.authors?.join(", ")}
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 text-sm line-clamp-3 drop-shadow-md"
                    >
                        {book.description}
                    </motion.p>

                    <motion.a
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[#EA4335] px-6 py-4 text-white font-bold text-lg shadow-lg hover:bg-[#D33828] active:scale-95 transition-all"
                    >
                        Get Book <ExternalLink size={20} />
                    </motion.a>
                </div>
            </div>
        </div>
    );
};
