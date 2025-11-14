import Image from "next/image";
import { MovieDetail } from "@/types/movie";

type Props = { params: Promise<{ id: string }> };


export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL;

  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return { title: "Movie Not Found" };

  const movie = await res.json();

  return {
    title: movie.title,
  };
}



export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL;

  let movie: MovieDetail | null = null;

  // SAFE FETCH WRAPPER - prevents crash when offline
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      movie = await res.json();
    }
  } catch (err) {
    movie = null; // offline or API error
  }

  // ------------------------------
  // 🔴 OFFLINE OR MOVIE NOT FOUND
  // ------------------------------
  if (!movie) {
    return (
      <div className="text-center p-16 text-gray-200">
        <h1 className="text-3xl font-bold text-red-500">
          You’re Offline or Movie Not Found
        </h1>
        <p className="mt-4 text-gray-400">
          Unable to load movie details. Please check your internet connection.
        </p>
      </div>
    );
  }

  // ------------------------------
  // MOVIE DATA VARIABLES
  // ------------------------------

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  const trailer = movie.videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  // ------------------------------
  // NETFLIX-STYLE UI
  // ------------------------------

  return (
    <div className="relative text-white">

      {/* FULLSCREEN BLURRED BACKDROP */}
      <div className="absolute inset-0 -z-10">
        {backdrop && (
          <>
            <Image
              src={backdrop}
              alt="Backdrop"
              fill
              className="object-cover blur-[3px] brightness-50"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
          </>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

          {/* POSTER */}
          <div className="w-[250px] md:w-[300px] lg:w-[330px]">
            <Image
              src={poster}
              alt={movie.title}
              width={330}
              height={500}
              className="rounded-lg shadow-[0px_10px_40px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* INFO BLOCK */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              {movie.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-4 text-gray-300 mt-4 text-sm md:text-base">
              {movie.release_date && (
                <span>{movie.release_date.slice(0, 4)}</span>
              )}

              <span className="px-3 py-1 bg-white/10 rounded-md">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              {movie.runtime && <span>{movie.runtime} min</span>}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-200 mt-6 leading-relaxed text-base md:text-lg max-w-2xl">
              {movie.overview}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-8">

              {/* Trailer */}
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 md:px-8 md:py-3 text-sm md:text-lg font-semibold shadow-lg transition-all rounded-md"
                >
                  ▶ Play Trailer
                </a>
              )}

              <button className="bg-white/15 px-4 py-2 md:px-8 md:py-3 text-sm md:text-lg rounded-md font-semibold border border-white/20 hover:bg-white/25 transition-all">
                + My List
              </button>
            </div>
          </div>
        </div>

        {/* Trailer Embed */}
        {trailer && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Official Trailer</h2>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
