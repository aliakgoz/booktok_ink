"use client";

import { Book } from "@/lib/types";
import { Star, ChevronDown, Share2, Volume2, Book as BookIcon } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    index: number;
}

export const BookCard = ({ book, index }: BookCardProps) => {
    const basePrice = Math.max(12, Math.round((book.page_count || 260) / 18));
    const kindlePrice = Math.max(8, basePrice - 3).toFixed(2);
    const hardcoverPrice = (basePrice + 2).toFixed(2);
    const listPrice = (basePrice + 8).toFixed(2);
    const discountPercent = Math.max(
        5,
        Math.min(55, Math.round(((Number(listPrice) - Number(hardcoverPrice)) / Number(listPrice)) * 100)),
    );
    const ratingsCount = book.rating ? Math.floor(book.rating * 3200) : 5873;
    const primaryCategory = book.categories?.[0] || "Books";
    const authors = book.authors?.join(", ");

    return (
        <section className="snap-start min-h-[calc(100dvh-192px)] w-full bg-white border-t border-[#d5d9d9]">
            <div className="max-w-6xl mx-auto h-full flex flex-col">
                <div className="flex-1 px-4 py-5 flex flex-col gap-5">
                    <div className="text-xs text-[#565959] flex items-center gap-2">
                        <span>Books</span>
                        <span className="h-[3px] w-[3px] rounded-full bg-[#565959]" />
                        <span>{primaryCategory}</span>
                    </div>

                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start flex-1">
                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <h1 className="text-xl md:text-2xl leading-tight font-normal text-[#0F1111]">{book.title}</h1>
                                <div className="text-sm text-[#007185]">{authors}</div>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#DE7921]">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={16}
                                                fill="currentColor"
                                                strokeWidth={0}
                                                className={s > Math.round(book.rating || 0) ? "text-gray-200" : ""}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-[#007185]">{ratingsCount.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="inline-block bg-[#C45500] text-white text-[11px] font-bold px-2 py-1 -skew-x-12">
                                        <span className="skew-x-12 block">#1 Best Seller</span>
                                    </div>
                                    <span className="text-xs text-[#007185]">in {primaryCategory}</span>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="relative bg-white border border-[#d5d9d9] rounded-md shadow-sm p-3 flex flex-col items-center w-full lg:w-[270px]">
                                    <div className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm border border-gray-100 z-10">
                                        <Share2 className="w-5 h-5 text-gray-500" />
                                    </div>

                                    {book.cover_image && (
                                        <div className="relative w-full max-w-[240px] aspect-[2/3]">
                                            <Image
                                                src={book.cover_image}
                                                alt={book.title}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 80vw, 260px"
                                                priority={index < 2}
                                            />
                                        </div>
                                    )}

                                    <div className="mt-3 text-xs text-[#565959] flex items-center gap-2">
                                        <BookIcon className="w-4 h-4" />
                                        <span>Look inside</span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-[#f7fafa] border border-[#d5d9d9] rounded-md p-4 shadow-inner flex flex-col gap-3">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[26px] text-[#B12704] font-normal">${hardcoverPrice}</span>
                                        <span className="text-xs text-[#565959]">
                                            List: <span className="line-through">${listPrice}</span>
                                        </span>
                                        <span className="text-[11px] text-[#565959]">Save {discountPercent}%</span>
                                    </div>

                                    <div className="text-sm text-[#0F1111] flex items-center gap-2">
                                        <span className="bg-[#232f3e] text-white text-[11px] font-semibold px-2 py-1 rounded">Prime</span>
                                        <span>FREE delivery for Prime members</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                        <div className="format-box-default rounded-md p-3 flex flex-col gap-1">
                                            <span className="font-bold text-sm">Kindle</span>
                                            <span className="text-[#B12704] font-semibold">${kindlePrice}</span>
                                            <span className="text-[11px] text-[#565959]">Read with our app</span>
                                        </div>
                                        <div className="relative format-box-selected rounded-md p-3 flex flex-col gap-1">
                                            <div className="absolute -top-2.5 left-2 text-[10px] bg-[#e77600] text-white px-1 font-bold">Best value</div>
                                            <span className="font-bold text-sm flex items-center gap-1 text-[#0F1111]">
                                                <Volume2 size={14} />
                                                Audiobook
                                            </span>
                                            <span className="text-[#B12704] font-bold">$0.00</span>
                                            <span className="text-[11px] text-[#565959]">Free with trial</span>
                                        </div>
                                        <div className="format-box-default rounded-md p-3 flex flex-col gap-1">
                                            <span className="font-bold text-sm">Hardcover</span>
                                            <span className="text-[#B12704] font-semibold">${hardcoverPrice}</span>
                                            <span className="text-[11px] text-[#565959]">Free returns</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-[#0F1111] leading-relaxed bg-white border border-[#d5d9d9] rounded-md p-3 max-h-36 overflow-y-auto">
                                        {book.description}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="w-full bg-[#f7fafa] border border-[#d5d9d9] rounded-md p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-[26px] text-[#B12704] font-normal">${hardcoverPrice}</span>
                                <span className="text-xs text-[#565959]">FREE Returns</span>
                            </div>
                            <div className="text-sm text-green-700 font-semibold">In Stock</div>
                            <div className="text-sm text-[#0F1111]">Ships from Amazon.com Services LLC</div>
                            <a
                                href={book.affiliate_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] rounded-full py-3 px-4 shadow-sm flex items-center justify-center cursor-pointer transition-transform active:scale-95 border border-[#FCD200] text-sm font-bold text-[#0F1111]"
                            >
                                Add to Cart
                            </a>
                            <a
                                href={book.affiliate_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#fa8900] hover:bg-[#f0801c] rounded-full py-3 px-4 shadow-sm flex items-center justify-center cursor-pointer transition-transform active:scale-95 text-sm font-bold text-white border border-[#f07000]"
                            >
                                Buy Now
                            </a>
                            <div className="text-[11px] text-[#565959] text-center">
                                Secure transaction • Delivered to your address
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="flex justify-center pb-4 pt-1 opacity-60">
                    <ChevronDown className="text-gray-400" />
                </div>
            </div>
        </section>
    );
};
