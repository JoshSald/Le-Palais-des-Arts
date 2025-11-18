"use client";

import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchArtworks } from "@/utils/api";
import type { NormalizedArtwork } from "@/types/artwork";
import type { ArtworkNote } from "@/types/note";

export interface GalleryArtwork extends NormalizedArtwork {
  note: ArtworkNote["note"] | string;
}

interface Props {
  item: GalleryArtwork;
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
  onArtistClick: (artist: string) => void;
}

export function GalleryItem({ item, onArtistClick }: Props) {
  return (
    <div className="rounded-lg overflow-hidden">
      <CardHeader>
        <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
        <span
          className="text-sm text-red-600 cursor-pointer hover:underline"
          onClick={() => onArtistClick(item.artist)}
        >
          {item.artist}
        </span>
        `
      </CardHeader>
    </div>
  );
}
