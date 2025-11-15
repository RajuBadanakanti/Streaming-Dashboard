"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieDetail } from "@/types/movie";

export default function MyListPage() {
  const [list, setList] = useState<MovieDetail[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("MY_LIST") || "[]");
    setList(stored);
  }, []);

  const removeFromList = (id: number) => {
    const updated = list.filter((movie) => movie.id !== id);
    setList(updated);
    localStorage.setItem("MY_LIST", JSON.stringify(updated));
  };

  // Filter movies based on search
  const filteredList = list.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20 px-6 text-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search your saved movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 p-3 mb-8 rounded-md bg-black/10 border border-gray-200 text-gray-600 
        focus:ring-2 focus:ring-red-400 focus:outline-none transition"
      />

      {filteredList.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredList.map((movie) => (
            <div key={movie.id} className="relative">

              {/* Movie Poster */}
              <Link href={`/movie/${movie.id}`}>
                <div className="cursor-pointer hover:scale-105 transition-all duration-300">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={250}
                    height={400}
                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <p className="mt-2 ml-2 text-gray-500 text-sm md:text-base font-semibold">
                    {movie.title}
                  </p>
                </div>

              </Link>
              {/* Remove Button */}
              <button
                onClick={() => removeFromList(movie.id)}
                className="absolute top-2 right-2 md:right-6 bg-red-500 hover:bg-red-600 text-white text-[10px] md:text-xs px-[5px] py-1  md:px-2 md:py-1 
                rounded-md shadow-lg transition-all duration-300 cursor-pointer"
              >
                ✕
              </button>


            </div>
          ))}
        </div>
      )}
    </div>
  );
}
