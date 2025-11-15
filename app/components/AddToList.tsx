"use client";

import { MovieDetail } from "@/types/movie";

import { useEffect, useState } from "react";

export default function AddToList({ movie }: { movie: MovieDetail }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("MY_LIST") || "[]");
    const exists = stored.some((m: MovieDetail) => m.id === movie.id);
    setAdded(exists);
  }, [movie.id]);

  const addToList = () => {
    let stored = JSON.parse(localStorage.getItem("MY_LIST") || "[]");

    // Prevent duplicates
    if (!stored.some((m: MovieDetail) => m.id === movie.id)) {
      stored.push(movie);
      localStorage.setItem("MY_LIST", JSON.stringify(stored));
      setAdded(true);
    }
  };

  return (
    <button
      onClick={addToList}
      className="bg-white/20 px-4 py-2 md:px-8 md:py-3 text-sm md:text-lg rounded-md font-semibold border border-white/20 hover:bg-white/30 transition-all"
    >
      {added ? "✓ Added" : "+ My List"}
    </button>
  );
}
