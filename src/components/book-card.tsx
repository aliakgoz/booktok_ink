"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/lib/types";
import { ShoppingCart, Star, TrendingUp, Zap, Award, Volume2 } from "lucide-react";
import Image from "next/image";
import Atropos from "atropos/react";
import "atropos/css";

interface BookCardProps {
    book: Book;
    index: number;
}

// Random badges to simulate "Social Proof"
const BADGES = [
    { text: "BookTok Trend 🔥", color: "bg-red-500" },
    { text: "Best Seller 👑", color: "bg-yellow-500" },
    { text: "Must Read 📚", color: "bg-blue-500" },
    { text: "Editor's Choice ⭐", color: "bg-purple-500" },
];

export const BookCard = ({ book, index }: BookCardProps) => {
    const [badge, setBadge] = useState(BADGES[0]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Select a semi-random badge based on title length
        const badgeIndex = (book.title?.length || 0) % BADGES.length;
        setBadge(BADGES[badgeIndex]);

        // Haptic Feedback on Mount (Snap)
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10);
        }
    }, [book.title]);

    const handleDoubleTap = () => {
        setIsLiked(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
        setTimeout(() => setIsLiked(false), 1200);
    };

    return (
        <div className="h-[100dvh] w-full shrink-0 snap-start relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">

            {/* --- LAYER 0: ATMOSPHERE (Canvas) --- */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ scale: [1.2, 1.4, 1.2], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full"
                >
                    {book.cover_image && (
                        <Image
                            src={book.cover_image}
                            alt="atmosphere"
                            fill
                            className="object-cover blur-[60px] brightness-[0.4] opacity-80"
                            priority={index === 0}
                        />
                    )}
                </motion.div>
                {/* Noise Overlay for Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </div>

            {/* --- LAYER 1: THE HERO (Object) --- */}
            <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center pb-24 px-8" onClick={(e) => {
                if (e.detail === 2) handleDoubleTap();
            }}>
                {/* 3D Tilt Effect */}
                <Atropos
                    className="w-full max-w-[280px] aspect-[2/3] my-auto"
                    activeOffset={40}
                    shadowScale={1.1}
                    rotateXMax={15}
                    rotateYMax={15}
                    highlight={true}
                >
                    {/* Badge Inside 3D Context */}
                    <div data-atropos-offset="5" className={`absolute -top-4 -right-4 z-20 ${badge.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-12 flex items-center gap-1`}>
                        <TrendingUp size={12} />
                        {badge.text}
                    </div>

                    {book.cover_image ? (
                        <Image
                            src={book.cover_image}
                            alt={book.title}
                            fill
                            data-atropos-offset="0"
                            className="object-cover rounded-xl shadow-2xl"
                            priority={index < 2}
                        />
                    ) : null}

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-xl" />
                </Atropos>
            </div>

            {/* Like Animation Overlay */}
            <AnimatePresence>
                {isLiked && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1, rotate: [0, 15, -15, 0] }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute z-50 text-red-500 drop-shadow-2xl"
                        style={{ top: "35%" }}
                    >
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* --- LAYER 2: UI OVERLAY (Info & CTA) --- */}
            <div className="absolute bottom-0 z-20 w-full px-4 pb-8 pt-12 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden">

                    {/* Animated Audio Visualizer Bars (Decorative) */}
                    <div className="absolute top-4 right-4 flex gap-[3px] items-end h-4 opacity-50">
                        <motion.div animate={{ height: [4, 12, 6, 16, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-white rounded-t-full" />
                        <motion.div animate={{ height: [8, 16, 4, 10, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-white rounded-t-full" />
                        <motion.div animate={{ height: [4, 10, 14, 6, 4] }} transition={{ repeat: Infinity, duration: 1.1 }} className="w-1 bg-white rounded-t-full" />
                    </div>

                    {/* Meta Data */}
                    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="mb-4">
                        <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <Award size={12} className="text-[#FF9900]" />
                            {book.authors?.[0] || "Best Selling Author"}
                        </h3>
                        <h1 className="text-white font-oswald text-2xl font-bold uppercase tracking-tight leading-none mt-1 line-clamp-2">
                            {book.title}
                        </h1>

                        {/* Hook - Using description first sentence or fallback */}
                        <p className="mt-3 text-white/80 font-serif italic text-sm border-l-2 border-[#FF9900] pl-3 line-clamp-2">
                            &quot;{book.description?.split(".")[0] || "A story that will captivate your imagination from the very first page."}.&quot;
                        </p>
                    </motion.div>

                    {/* CTA Button - Pulse */}
                    <a
                        href={book.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full h-14 flex items-center justify-center gap-3 rounded-full bg-[#FF9900] text-black font-extrabold text-base overflow-hidden group shadow-[0_0_20px_rgba(255,153,0,0.4)] active:scale-[0.98] transition-all"
                    >
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 border-2 border-white rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />

                        <ShoppingCart size={20} className="fill-black" />
                        <span>BUY ON AMAZON</span>
                    </a>

                    {/* Trust Badge */}
                    <div className="w-full flex justify-center mt-3 opacity-40">
                        <span className="text-[10px] text-white flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Secure transaction via Amazon
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};
