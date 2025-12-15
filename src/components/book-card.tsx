"use client";

import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -10 }}
            className="group request-card relative flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 hover:border-purple-500/50 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
                {book.cover_image ? (
                    <Image
                        src={book.cover_image}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
                        No Cover
                    </div>
                )}

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-purple-400 transition-colors"
                    >
                        Get on Amazon <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            <div className="mt-4 flex flex-col flex-grow">
                <h3 className="line-clamp-1 text-lg font-bold text-white" title={book.title}>
                    {book.title}
                </h3>
                <p className="line-clamp-1 text-sm text-gray-400">
                    {book.authors?.join(", ") || "Unknown Author"}
                </p>

                <div className="mt-2 flex items-center gap-1 text-yellow-400 text-xs">
                    <Star size={12} fill="currentColor" />
                    <span>{book.rating > 0 ? book.rating : "4.5"}</span>
                    <span className="text-gray-600 ml-1">• {book.page_count > 0 ? `${book.page_count} pages` : "Hardcover"}</span>
                </div>

                <p className="mt-3 line-clamp-2 text-xs text-gray-500">
                    {book.description || "A must-read for anyone looking to improve their life and mindset."}
                </p>
            </div>
        </motion.div>
    );
};
