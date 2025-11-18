"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { SearchBar } from "./SearchBar";

interface NavbarProps {
  onSearch: (query: string) => void;
  onSelect: (item: NormalizedArtwork) => void;
}

export default function Navbar({ onSearch, onSelect }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((y) => setScrolled(y > 50));
  }, [scrollY]);

  const transition = {
    type: "spring",
    stiffness: 180,
    damping: 25,
    mass: 0.7,
  };

  return (
    <motion.header
      layout
      className={`fixed top-0 left-0 w-full px-6 transition-colors z-50
        ${
          scrolled
            ? "h-20 bg-gradient-to-b from-black/30 to-white/60 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between"
            : "h-28 bg-transparent flex flex-col items-center pt-6"
        }`}
      initial={false}
      transition={transition}
    >
      {/* Logo wrapper */}
      <motion.div
        layout
        transition={transition}
        className={`flex flex-col transition-all duration-300
          ${scrolled ? "items-start" : "items-center"}
        `}
      >
        <motion.h1
          layout
          transition={transition}
          className={`font-serif uppercase text-2xl ${
            scrolled ? "md:text-3xl" : "md:text-4xl"
          } tracking-tight text-center md:text-left`}
        >
          <span className="text-red-600">Le</span> Palais des Arts
        </motion.h1>

        <motion.p
          layout
          transition={transition}
          className={`${
            scrolled ? "text-xs" : "text-sm"
          } text-neutral-500 italic mt-1 hidden md:block`}
        >
          From Monsieur Saucisse Juteuse Omelette&apos;s private collection
        </motion.p>
      </motion.div>

      <motion.div
        layout
        transition={transition}
        className={`
          w-full max-w-md mt-3
          ${scrolled ? "mt-0 ml-auto" : ""}
        `}
      >
        <SearchBar onSearch={onSearch} onSelect={onSelect} />
      </motion.div>
    </motion.header>
  );
}
