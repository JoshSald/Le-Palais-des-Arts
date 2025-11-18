import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { GalleryItem as ItemType } from "@/types";

interface Props {
  item: ItemType;
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

export function GalleryItem({ item, onDelete, onUpdateNote }: Props) {
  const { artwork, note } = item;

  return (
    <Card className="rounded-lg overflow-hidden">
      <CardHeader>
        <h3 className="font-bold text-lg leading-tight">{artwork.title}</h3>
        <p className="text-sm text-muted-foreground">{artwork.artist_title}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          defaultValue={note}
          placeholder="Add a note..."
          onBlur={(e) => onUpdateNote(artwork.id, e.target.value)}
        />

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => onDelete(artwork.id)}
        >
          Remove From Gallery
        </Button>
      </CardContent>
    </Card>
  );
}
