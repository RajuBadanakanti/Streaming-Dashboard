"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function HeroBanner({ movie }: { movie: Movie }) {
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] rounded-lg overflow-hidden mb-8">

      {/* Background Image */}
      {backdrop && (
        <Image
          src={backdrop}
          alt={movie.title || movie.name || "Movie Poster"}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-10 left-6 md:left-10 max-w-xl">
        <h1 className="text-gray-200 text-3xl md:text-5xl font-bold mb-4">
          {movie.title || movie.name}
        </h1>

        <p className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-4 mb-4">
          {movie.overview}
        </p>

        <Link
          href={`/movie/${movie.id}`}
          className="inline-block text-red-50 bg-red-600 px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Watch Info →
        </Link>
      </div>
    </div>
  );
}
