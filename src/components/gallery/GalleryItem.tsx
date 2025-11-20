"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { ImageZoom } from "../ui/shadcn-io/image-zoom";
import type { NormalizedArtwork } from "@/types/artwork";
import type { ArtworkNote } from "@/types/note";
import { useState } from "react";
import { Heart } from "lucide-react";

export interface GalleryArtwork extends NormalizedArtwork {
  note: ArtworkNote["note"] | string;
}

interface Props {
  item: GalleryArtwork;
  inGallery: boolean; // whether this item is saved
  onToggleGallery: (item: GalleryArtwork) => void; // add/remove from gallery
  onArtistClick: (artist: string) => void;
}

export function GalleryItem({
  item,
  inGallery,
  onToggleGallery,
  onArtistClick,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heart overlay */}
      <button
        onClick={() => onToggleGallery(item)}
        className={`
          absolute top-2 right-2 p-1 rounded-full
          transition-all duration-200
          ${
            hovered || inGallery
              ? "opacity-100 scale-110"
              : "opacity-0 scale-75"
          }
          bg-white/70 hover:bg-white z-10
        `}
      >
        <Heart
          className="w-6 h-6"
          stroke={inGallery ? "#FF0000" : "#666"}
          fill={inGallery ? "#FF0000" : "none"}
        />
      </button>

      <Card className="py-0 pb-6">
        <ImageZoom>
          <img
            src={item.imageUrl}
            className="h-80 w-full object-cover rounded-lg"
            alt={item.title}
            loading="lazy"
          />
        </ImageZoom>

        <div className="rounded-lg overflow-hidden">
          <CardHeader>
            <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
            <span
              className="text-sm text-red-600 cursor-pointer hover:underline"
              onClick={() => onArtistClick(item.artist)}
            >
              {item.artist}
            </span>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
}
