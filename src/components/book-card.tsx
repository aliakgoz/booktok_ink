"use client";

import { Book } from "@/lib/types";
import { Star, ChevronRight, Lock, MapPin, Share2 } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start bg-white overflow-y-auto pb-24 relative">
            {/* Spacer for Fixed Header */}
            <div className="h-[140px] w-full bg-[#f2f4f8]" />

            <div className="p-4 flex flex-col gap-2">

                {/* 1. Breadcrumb / Category (Fake) */}
                <div className="text-xs text-[#565959] flex items-center gap-1 mb-1">
                    Books <ChevronRight size={10} /> Literature & Fiction <ChevronRight size={10} /> Contemporary
                </div>

                {/* 2. Title & Author */}
                <h1 className="text-[#0f1111] text-lg font-normal leading-snug line-clamp-3">
                    {book.title}
                </h1>
                <div className="text-sm">
                    <span className="text-[#565959]">by </span>
                    <span className="text-[#007185] font-medium decoration-1 hover:underline">{book.authors?.[0] || "Unknown"}</span>
                    <span className="text-[#565959]"> (Author)</span>
                </div>

                {/* 3. Ratings */}
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-[#ffa41c]">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={16} fill="currentColor" strokeWidth={0} className={s > Math.round(book.rating || 0) ? "text-gray-200" : ""} />
                        ))}
                    </div>
                    <span className="text-[#007185] text-sm font-medium ml-1 flex items-center gap-1">
                        {book.rating ? Math.round(book.rating * 1245) : "342"}
                        <ChevronRight size={12} />
                    </span>
                </div>

                {/* 4. Image Block (Main Hero) */}
                <div className="relative w-full aspect-[4/5] my-2 bg-white flex items-center justify-center">
                    {/* Share Icon Floating */}
                    <div className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100">
                        <Share2 size={20} className="text-gray-500" />
                    </div>

                    {book.cover_image && (
                        <div className="relative h-full w-auto aspect-[2/3] shadow-lg">
                            <Image
                                src={book.cover_image}
                                alt={book.title}
                                fill
                                className="object-contain"
                                priority={index < 2}
                            />
                        </div>
                    )}
                </div>

                {/* 5. Price & Prime */}
                <div className="mt-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-red-700 text-xs align-top font-medium">-15%</span>
                        <span className="text-sm align-top">$</span>
                        <span className="text-[#0f1111] text-3xl font-medium">14</span>
                        <span className="text-xs align-top">99</span>
                    </div>
                    <div className="text-[#565959] text-xs mt-1">
                        List Price: <span className="line-through">$17.99</span>
                    </div>

                    {/* Prime Logo Simulation */}
                    <div className="flex items-center gap-1 mt-2 text-[#565959] text-sm">
                        <span className="font-bold text-[#00a8e1] italic">prime</span>
                        <span>Two-Day</span>
                    </div>
                    <div className="text-sm text-[#565959]">
                        FREE Returns
                    </div>
                </div>

                {/* 6. Buttons (The conversion block) */}
                <div className="flex flex-col gap-3 mt-6">
                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-11 bg-[#ffd814] rounded-full shadow-[0_2px_5px_0_rgba(213,217,217,.5)] border border-[#fcd200] flex items-center justify-center text-[#0f1111] font-normal text-sm active:bg-[#f7ca00]"
                    >
                        Add to Cart
                    </a>
                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-11 bg-[#ffa41c] rounded-full shadow-[0_2px_5px_0_rgba(213,217,217,.5)] border border-[#ff8f00] flex items-center justify-center text-[#0f1111] font-normal text-sm active:bg-[#fa8900]"
                    >
                        Buy Now
                    </a>
                </div>

                {/* 7. Secure Transaction & Dispatch Info */}
                <div className="mt-4 text-xs text-[#565959] space-y-2">
                    <div className="flex items-center gap-2">
                        <Lock size={12} />
                        <span className="text-[#007185]">Secure transaction</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-1">
                        <span>Ships from</span>
                        <span>Amazon.com</span>
                        <span>Sold by</span>
                        <span>Amazon.com</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
