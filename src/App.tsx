"use client";

import { useState, useCallback } from "react";
import { SearchBar } from "./components/SearchBar";
import { fetchArtworks } from "./utils/api";
import { Gallery } from "./components/gallery/Gallery";
import InfiniteScroll from "@/components/ui/infiniteScroll";
import type { NormalizedArtwork } from "./types/artwork";
import { Spinner } from "./components/ui/spinner";

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
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <main className="pt-10 pb-20">
          <SearchBar onSearch={handleSearch} onSelect={handleSelect} />
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
            />
          </InfiniteScroll>
          {loading && (
            <div className="flex justify-center my-6 mt-4">
              <Spinner />
            </div>
          )}
          <h2 className="mt-10 text-xl font-bold">My Gallery</h2>
          <Gallery
            items={gallery}
            onDelete={handleDelete}
            onUpdateNote={handleUpdateNote}
          />
        </main>
      </div>
    </div>
  );
}
