"use client";

import { useState, useEffect } from "react";
import { fetchArtworks } from "./utils/api";
import InfiniteScroll from "@/components/ui/infiniteScroll";
import Navbar from "./components/Navbar";
import { Gallery } from "@/components/gallery/Gallery";
import { GalleryDrawer } from "./components/myGallery/MyGallery";
import { Spinner } from "@/components/ui/spinner";
import type { NormalizedArtwork } from "./types/artwork";
import type { GalleryArtwork } from "@/components/gallery/GalleryItem";

export default function App() {
  const [gallery, setGallery] = useState<GalleryArtwork[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("myGallery");
    return saved ? JSON.parse(saved) : [];
  });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NormalizedArtwork[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("myGallery", JSON.stringify(gallery));
  }, [gallery]);

  const toggleGallery = (item: NormalizedArtwork) => {
    setGallery((prev) => {
      const exists = prev.find((a) => a.id === item.id);
      if (exists) return prev.filter((a) => a.id !== item.id);
      return [...prev, { ...item, note: "" }];
    });
  };

  const handleUpdateNote = (id: number, note: string) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const loadResults = async (searchQuery: string, nextPage = 1) => {
    setLoading(true);
    const res = await fetchArtworks(searchQuery, nextPage, 12);
    setResults(nextPage === 1 ? res : [...results, ...res]);
    setHasMore(res.length > 0);
    setLoading(false);
    setPage(nextPage);
  };

  const loadMore = () => {
    if (!loading && hasMore) loadResults(query, page + 1);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setResults([]);
    setPage(1);
    loadResults(newQuery, 1);
  };

  const handleArtistClick = (artist: string) => {
    setQuery(artist);
    setResults([]);
    setPage(1);
    loadResults(artist, 1);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} onSelect={toggleGallery} />
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
                items={results} // search results
                gallery={gallery} // favourites
                onToggleGallery={toggleGallery}
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
          onUpdateNote={handleUpdateNote}
          onToggleGallery={toggleGallery}
        />
      </main>
    </>
  );
}
