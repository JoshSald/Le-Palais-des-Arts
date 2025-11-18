import z from "zod";
import { ArtworkSchema } from "./artwork";
import { NoteSchema } from "./note";

export const GalleryItemSchema = z.object({
  artwork: ArtworkSchema,
  note: NoteSchema.shape.note,
  savedAt: z.string().optional(), // ISO string (optional)
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
