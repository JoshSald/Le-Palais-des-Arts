"use client";

import {
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { NormalizedArtwork } from "@/types/artwork";
import { fetchArtworks } from "@/utils/api";

interface Props {
  onSearch: (query: string) => void;
  onSelect: (item: NormalizedArtwork) => void;
}

export function SearchBar({ onSearch, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NormalizedArtwork[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced lookup for suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetchArtworks(query);
      setSuggestions(res);
      setShowDropdown(res.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
      setShowDropdown(false);
    }
  };

  const handleSelect = (art: NormalizedArtwork) => {
    onSelect(art);
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative bg-white/70 max-w-md mx-auto my-8 rounded-md"
    >
      <div className="search">
        <Input
          id="search"
          name="search"
          placeholder="Search for an artist or artwork…"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((art) => (
            <li
              key={art.id}
              className={cn("p-2 hover:bg-gray-100 cursor-pointer")}
              onClick={() => handleSelect(art)}
            >
              {art.title} — {art.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
