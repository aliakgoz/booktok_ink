"use client";

import { Book } from "@/lib/types";
import { Star, ChevronDown, Share2, Volume2, Book as BookIcon } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    // Parsing Price (Simulation)
    // Since we don't have real price, we use static simulation as requested ($0.00)

    return (
        <div className="snap-start h-full w-full bg-white overflow-y-scroll relative flex flex-col">

            {/* --- BOOK CONTENT --- */}
            <div className="p-4 flex-1">

                {/* Title */}
                <h1 className="text-[17px] leading-[1.3] font-normal text-[#0F1111] mb-1 font-sans">
                    {book.title}
                </h1>

                {/* Ratings Line */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#DE7921]">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} fill="currentColor" strokeWidth={0} className={s > Math.round(book.rating || 0) ? "text-gray-200" : ""} />
                        ))}
                    </div>
                    <span className="text-sm text-[#007185]">
                        {book.rating ? (book.rating * 1000).toLocaleString() : "5,873"}
                    </span>
                </div>

                {/* Badge (Skewed) */}
                <div className="inline-block bg-[#C45500] text-white text-xs font-bold px-2 py-1 mb-2 -skew-x-12 ml-1">
                    <span className="skew-x-12 block">#1 Best Seller</span>
                </div>
                <div className="text-xs text-[#007185] mb-2">in {book.categories?.[0] || "Books"}</div>

                {/* Image Block */}
                <div className="w-full flex justify-center py-2 relative min-h-[250px]">
                    {/* Share Icon */}
                    <div className="absolute top-0 right-2 rounded-full bg-white p-2 shadow-sm border border-gray-100 z-10">
                        <Share2 className="w-5 h-5 text-gray-500" />
                    </div>

                    {book.cover_image && (
                        <div className="relative h-[250px] w-auto aspect-[2/3] shadow-lg">
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

                {/* Format Selection (Horizontal Scroll) */}
                <div className="py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-2">
                        {/* Kindle */}
                        <div className="border border-[#d5d9d9] bg-white rounded-md p-3 min-w-[110px] flex flex-col justify-center">
                            <span className="font-bold text-sm block">Kindle</span>
                            <span className="text-sm block">$14.99</span>
                        </div>

                        {/* Audiobook (SELECTED) */}
                        <div className="border-2 border-[#e77600] bg-[#fef8f2] rounded-md p-3 min-w-[125px] relative flex flex-col justify-center shadow-sm">
                            <div className="absolute -top-2.5 left-2 text-[10px] bg-[#e77600] text-white px-1 font-bold">Best Value</div>
                            <span className="font-bold text-sm flex items-center gap-1 text-[#0F1111]">
                                <Volume2 size={14} />
                                Audiobook
                            </span>
                            <span className="text-sm font-bold block text-[#B12704]">$0.00</span>
                            <span className="text-[10px] text-gray-500">Free with trial</span>
                        </div>

                        {/* Hardcover */}
                        <div className="border border-[#d5d9d9] bg-white rounded-md p-3 min-w-[110px] flex flex-col justify-center">
                            <span className="font-bold text-sm block">Hardcover</span>
                            <span className="text-sm block">$23.00</span>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="pb-10">
                    <div className="text-[18px] text-[#B12704] font-medium mb-2 flex items-baseline gap-2">
                        $0.00
                        <span className="text-sm text-gray-600 font-normal line-through">$26.99</span>
                    </div>
                    <div className="text-sm text-green-700 font-bold mb-4">In Stock.</div>

                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#FFD814] rounded-full py-3 px-4 shadow-sm flex items-center justify-center cursor-pointer active:scale-95 transition-transform border border-[#FCD200]"
                    >
                        <span className="text-sm font-normal text-black">Sign up to listen for free</span>
                    </a>

                    <div className="text-xs text-gray-500 text-center mt-3">
                        Ships from and sold by Amazon.com Services LLC.
                    </div>

                    {/* Animated Bounce Arrow */}
                    <div className="flex justify-center mt-8 opacity-50 animate-bounce">
                        <ChevronDown className="text-gray-400" />
                    </div>
                </div>

                {/* Divider */}
                <div className="h-2 w-full bg-[#d5d9d9] opacity-30 mt-4 mb-20" />

            </div>
        </div>
    );
};
