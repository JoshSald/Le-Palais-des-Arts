import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().optional().default("Untitled"),
  artist_title: z.string().optional(),
  artist_display: z.string().optional(),
  image_id: z.string().nullable().optional(),
  thumbnail: z
    .object({
      alt_text: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

export const NormalizedArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  imageUrl: z.string(),
  thumbnailAlt: z.string(),
  note: z.string(),
});
export type NormalizedArtwork = z.infer<typeof NormalizedArtworkSchema>;
