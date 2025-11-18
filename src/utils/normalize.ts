import type { Artwork, NormalizedArtwork } from "@/types/artwork";

export function normalizeArtwork(a: Artwork): NormalizedArtwork {
  return {
    id: a.id,
    title: a.title ?? "Untitled",
    artist: a.artist_title ?? a.artist_display ?? "Unknown Artist",
    imageUrl: a.image_id
      ? `https://www.artic.edu/iiif/2/${a.image_id}/full/843,/0/default.jpg`
      : "/default.png",
    thumbnailAlt: a.thumbnail?.alt_text ?? "Artwork image",
    note: "",
  };
}
