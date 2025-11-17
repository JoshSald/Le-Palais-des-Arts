import { ArtworkSchema, type Artwork } from "../types/artwork";

export async function fetchArtworks(query: string): Promise<Artwork[]> {
  if (!query.trim()) return [];

  const searchUrl = new URL("https://api.artic.edu/api/v1/artworks/search");

  // Request only the fields you care about
  searchUrl.searchParams.set("q", query);
  searchUrl.searchParams.set("fields", "id,title,artist_title,image_id");

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

  return validated;
}
