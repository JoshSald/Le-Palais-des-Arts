"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Gallery } from "@/components/gallery/Gallery";
import type { NormalizedArtwork } from "@/types/artwork";
import { motion } from "framer-motion";
import { GalleryThumbnails } from "lucide-react";

interface Props {
  items: NormalizedArtwork[];
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

export function GalleryDrawer({ items, onDelete, onUpdateNote }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2
            bg-white/70 backdrop-blur-xl shadow-lg
            border border-white/20
            p-3 rounded-full
            hover:bg-white
            transition
            z-50
          "
        >
          <GalleryThumbnails className="w-6 h-6 text-neutral-700" />
        </motion.button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">My Gallery</DrawerTitle>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-8 max-h-[70vh]">
          {items.length < 1 ? (
            <p className="text-center text-black/60">
              Monsieur Saucisse Juteuse Omelette is disappointed. Your Gallery
              is empty
            </p>
          ) : (
            <Gallery
              items={items}
              onDelete={onDelete}
              onUpdateNote={onUpdateNote}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
