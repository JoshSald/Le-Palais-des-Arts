"use client";

import { fetchArtworks } from "./utils/api";
import { useEffect, useState } from "react";
import { Gallery } from "./components/gallery/Gallery";
import type { NormalizedArtwork } from "./types/artwork";
function App() {
  const [items, setItems] = useState<NormalizedArtwork[]>([]);

  useEffect(() => {
    async function load() {
      const normalizedRes: NormalizedArtwork[] = await fetchArtworks("Monet");
      setItems(normalizedRes);
    }

    load();
  }, []);
  return (
    <div className="py-8">
      <Gallery
        items={items}
        onDelete={(id) => console.log("Delete", id)}
        onUpdateNote={(id, note) => console.log("Update", id, note)}
      />
    </div>
  );
}

export default App;
