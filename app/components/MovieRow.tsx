"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieRow({
  movies,
  categoryTitle,
}: {
  movies: Movie[];
  categoryTitle: string;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        {categoryTitle}
      </h2>

      <div
        className="
          flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600
          pb-4 snap-x snap-mandatory
        "
      >
        {movies.map((movie) => {
          const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "/no-poster.png";

          return (
            <Link
             id="#top-rated"
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="min-w-[150px] max-w-[150px] snap-start hover:text-red-500 transition-all duration-400"
            >
              <div className="w-full h-[225px] relative rounded-md overflow-hidden shadow-md hover:scale-105 transition-all duration-400">
                <Image
                  src={poster}
                  alt={movie.title || movie.name || "Movie Poster"}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 40vw,(max-width: 1200px) 20vw,15vw"
                />

              </div>

              <p className="mt-2 text-sm line-clamp-2">
                {movie.title || movie.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
