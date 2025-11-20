"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { ImageZoom } from "../ui/shadcn-io/image-zoom";
import type { NormalizedArtwork } from "@/types/artwork";
import type { ArtworkNote } from "@/types/note";
import { useState } from "react";
import { Heart, X } from "lucide-react";

export interface GalleryArtwork extends NormalizedArtwork {
  note: ArtworkNote["note"] | string;
}

interface Props {
  item: GalleryArtwork;
  inGallery?: boolean; // used for main gallery
  onToggleGallery?: (item: GalleryArtwork) => void; // add/remove gallery
  onArtistClick?: (artist: string) => void;
  mode?: "main" | "drawer"; // controls heart/X & notes
  onUpdateNote?: (id: number, note: string) => void; // for drawer notes
}

export function GalleryItem({
  item,
  inGallery = false,
  onToggleGallery,
  onArtistClick,
  mode = "main",
  onUpdateNote,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heart or X button */}
      {onToggleGallery && mode === "main" && (
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
      )}

      {onToggleGallery && mode === "drawer" && (
        <button
          onClick={() => onToggleGallery(item)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white z-10"
        >
          <X className="w-5 h-5 stroke-red-600" />
        </button>
      )}

      <Card className="py-0 pb-6">
        <ImageZoom>
          <img
            src={item.imageUrl}
            className="h-80 w-full object-cover rounded-lg"
            alt={item.title}
            loading="lazy"
          />
        </ImageZoom>

        <div className="rounded-lg overflow-hidden p-2">
          <CardHeader>
            <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
            {onArtistClick && (
              <span
                className="text-sm text-red-600 cursor-pointer hover:underline"
                onClick={() => onArtistClick(item.artist)}
              >
                {item.artist}
              </span>
            )}
          </CardHeader>

          {mode === "drawer" && onUpdateNote && (
            <textarea
              className="mt-2 w-full rounded border border-gray-300 p-2 text-sm resize-none"
              placeholder="Add a note..."
              value={item.note || ""}
              onChange={(e) => onUpdateNote(item.id, e.target.value)}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
