import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().optional().default("Untitled"),
  artist_title: z.string().optional().default("Unknown Artist"),
  image_id: z.string().nullable().optional(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
