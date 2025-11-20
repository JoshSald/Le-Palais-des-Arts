"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { GalleryItem } from "./GalleryItem";
import type { NormalizedArtwork } from "@/types/artwork";

interface Props {
  items: NormalizedArtwork[];
  className?: string;
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
  onArtistClick: (artist: string) => void;
}

export const Gallery = ({
  items,
  className,
  onDelete,
  onUpdateNote,
  onArtistClick,
}: Props) => {
  const { scrollYProgress } = useScroll();

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(items.length / 3);
  const firstPart = items.slice(0, third);
  const secondPart = items.slice(third, 2 * third);
  const thirdPart = items.slice(2 * third);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-10 py-40 px-10">
        {[firstPart, secondPart, thirdPart].map((column, colIdx) => {
          const translate = [translateFirst, translateSecond, translateThird][
            colIdx
          ];

          return (
            <div className="grid gap-10" key={colIdx}>
              {column.map((item, idx) => (
                <motion.div key={idx} style={{ y: translate }}>
                  <GalleryItem
                    item={item}
                    onDelete={onDelete}
                    onUpdateNote={onUpdateNote}
                    onArtistClick={onArtistClick}
                  />
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
