import {
  ArtworkSchema,
  type Artwork,
  type NormalizedArtwork,
} from "../types/artwork";
import { normalizeArtwork } from "./normalize";

export async function fetchArtworks(
  query: string,
  page: number = 1,
  limit: number = 12,
  artist?: string
): Promise<NormalizedArtwork[]> {
  if (!query.trim() && !artist) return [];

  const searchUrl = new URL("https://api.artic.edu/api/v1/artworks/search");

  if (artist) {
    searchUrl.searchParams.set("query[term][artist_title]", artist);
  } else {
    searchUrl.searchParams.set("q", query);
  }

  searchUrl.searchParams.set(
    "fields",
    "id,title,artist_title,artist_display,image_id,thumbnail"
  );
  searchUrl.searchParams.set("page", page.toString());
  searchUrl.searchParams.set("limit", limit.toString());

  const res = await fetch(searchUrl.toString());

  if (!res.ok) {
    console.error("API request failed:", res.statusText);
    return [];
  }

  const json = await res.json();
  const rawData = json.data || [];

  const validated: Artwork[] = [];

  for (const item of rawData) {
    try {
      const parsed = ArtworkSchema.parse(item);
      validated.push(parsed);
    } catch (err) {
      console.warn("Invalid artwork skipped:", err);
    }
  }

  return validated.map(normalizeArtwork);
}
