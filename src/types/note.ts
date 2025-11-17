import { z } from "zod";

export const NoteSchema = z.object({
  note: z.string().max(500).optional().default(""),
});

export type ArtworkNote = z.infer<typeof NoteSchema>;
