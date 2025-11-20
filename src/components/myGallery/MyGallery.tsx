"use client";

import SadOmlette from "@/assets/sad_omlette_nobg.png";
import {
  GalleryItem,
  type GalleryArtwork,
} from "@/components/gallery/GalleryItem";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { GalleryThumbnails } from "lucide-react";
import type { NormalizedArtwork } from "@/types/artwork";

interface Props {
  items: GalleryArtwork[];
  onToggleGallery?: (item: NormalizedArtwork) => void; // for hearts
  onUpdateNote: (id: number, note: string) => void;
}

export function GalleryDrawer({ items, onUpdateNote, onToggleGallery }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl shadow-lg border border-white/20 p-3 rounded-full hover:bg-white transition z-50"
        >
          <GalleryThumbnails className="w-6 h-6 text-neutral-700" />
        </motion.button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[85vh] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">My Gallery</DrawerTitle>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-12 max-h-[70vh]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center mt-6">
              <p className="text-center text-black/60">
                Monsieur Saucisse Juteuse Omelette is disappointed...
              </p>
              <img
                className="max-w-1/4 my-6"
                src={SadOmlette}
                alt="Sad Omlette"
              />
              <p className="text-center text-black/60">Your Gallery is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {items.map((item) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  mode="drawer"
                  onToggleGallery={onToggleGallery}
                  onUpdateNote={onUpdateNote}
                />
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
