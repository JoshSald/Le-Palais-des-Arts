"use client";

import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { NormalizedArtwork } from "@/types/artwork";
import { fetchArtworks } from "@/utils/api";

interface Props {
  onSearch: (query: string) => void;
  onSelect: (item: NormalizedArtwork) => void;
  debounceMs?: number;
}

export function SearchBar({ onSearch, onSelect, debounceMs = 300 }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NormalizedArtwork[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const res = await fetchArtworks(query);
      setSuggestions(res);
      setShowDropdown(res.length > 0);
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, debounceMs]);

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
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative bg-white/70 max-w-md mx-auto my-8 rounded-md"
    >
      <Input
        id="search"
        name="search"
        placeholder="Search for an artist or artwork…"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

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
