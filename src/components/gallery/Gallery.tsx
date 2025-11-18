"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { GalleryItem } from "./GalleryItem";

import type { GalleryItem as ItemType } from "@/types";

interface Props {
  items: ItemType[];
  className?: string;
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
  buildImageUrl: (id: string | null) => string;
}

export const Gallery = ({
  items,
  className,
  onDelete,
  onUpdateNote,
  buildImageUrl,
}: Props) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(items.length / 3);
  const firstPart = items.slice(0, third);
  const secondPart = items.slice(third, 2 * third);
  const thirdPart = items.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-10 py-40 px-10">
        {[firstPart, secondPart, thirdPart].map((column, colIdx) => {
          const translate = [translateFirst, translateSecond, translateThird][
            colIdx
          ];

          return (
            <div className="grid gap-10" key={colIdx}>
              {column.map((item, idx) => (
                <motion.div key={idx} style={{ y: translate }}>
                  <div className="space-y-4">
                    <img
                      src={buildImageUrl(item.image_id)}
                      className="h-80 w-full object-cover rounded-lg"
                      alt={item.artwork.title}
                    />
                    <GalleryItem
                      item={item}
                      onDelete={onDelete}
                      onUpdateNote={onUpdateNote}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
