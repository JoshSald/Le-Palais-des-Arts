"use client";

import { useState } from "react";
import { fetchArtworks } from "./utils/api";
import InfiniteScroll from "@/components/ui/infiniteScroll";
import Navbar from "./components/Navbar";
import { Gallery } from "./components/gallery/Gallery";
import { GalleryDrawer } from "./components/myGallery/MyGallery";
import { Spinner } from "./components/ui/spinner";

import type { NormalizedArtwork } from "./types/artwork";

export default function App() {
  const [gallery, setGallery] = useState<NormalizedArtwork[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NormalizedArtwork[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadResults = async (newQuery: string, nextPage = 1) => {
    setLoading(true);
    const res = await fetchArtworks(newQuery, nextPage, 12);
    setResults((prev) => (nextPage === 1 ? res : [...prev, ...res]));
    setHasMore(res.length > 0);
    setLoading(false);
    setPage(nextPage);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    loadResults(newQuery, 1); // reset page 1 for new search
  };

  const handleArtistClick = (artist: string) => {
    setQuery(artist); // Set the search query to the artist
    setResults([]); // Clear previous search results
    setPage(1); // Reset page
    loadResults(artist, 1); // Fetch first page for this artist
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadResults(query, page + 1);
    }
  };

  const handleSelect = (item: NormalizedArtwork) => {
    setGallery((prev) =>
      prev.some((art) => art.id === item.id) ? prev : [...prev, item]
    );
  };

  const handleDelete = (id: number) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateNote = (id: number, note: string) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  return (
    <>
      <Navbar onSearch={handleSearch} onSelect={handleSelect} />
      <main className="min-h-screen bg-neutral-50 text-neutral-900 pt-28">
        <section className="max-w-6xl mx-auto px-6">
          <div className="pt-10 pb-20">
            <InfiniteScroll
              isLoading={loading}
              hasMore={hasMore}
              next={loadMore}
              threshold={0.5}
            >
              <Gallery
                items={results}
                onDelete={handleDelete}
                onUpdateNote={handleUpdateNote}
                onArtistClick={handleArtistClick}
              />
            </InfiniteScroll>
            {loading && (
              <div className="flex justify-center my-6 mt-4">
                <Spinner />
              </div>
            )}
          </div>
        </section>
        <GalleryDrawer
          items={gallery}
          onDelete={handleDelete}
          onUpdateNote={handleUpdateNote}
        />
      </main>
    </>
  );
}
