"use client";

import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { NormalizedArtwork } from "@/types/artwork";
import type { ArtworkNote } from "@/types/note";

export interface GalleryArtwork extends NormalizedArtwork {
  note: ArtworkNote["note"] | string;
}

interface Props {
  item: GalleryArtwork;
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

export function GalleryItem({ item, onDelete, onUpdateNote }: Props) {
  return (
    <div className="rounded-lg overflow-hidden">
      <CardHeader>
        <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.artist}</p>
      </CardHeader>

      {/* <CardContent className="space-y-4">
        <Textarea
          defaultValue={item.note}
          placeholder="Add a note..."
          onBlur={(e) => onUpdateNote(item.id, e.target.value)}
        />

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => onDelete(item.id)}
        >
          Remove From Gallery
        </Button>
      </CardContent> */}
    </div>
  );
}
