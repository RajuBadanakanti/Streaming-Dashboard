import MovieRow from "./components/MovieRow";
import HeroBanner from "./components/HeroBanner";
import { Movie } from "@/types/movie";

export default async function Home() {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL;

  let popular: Movie[] | null = null;
  let topRated: Movie[] | null = null;
  let nowPlaying: Movie[] | null = null;
  let trending: Movie[] | null = null;

  try {
    const [popularRes, topRatedRes, nowPlayingRes, trendingRes] =
      await Promise.all([
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
          next: { revalidate: 120 },
        }),
        fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, {
          next: { revalidate: 120 },
        }),
        fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`, {
          next: { revalidate: 120 },
        }),
        fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, {
          next: { revalidate: 120 },
        }),
      ]);

    if (popularRes.ok) popular = (await popularRes.json()).results;
    if (topRatedRes.ok) topRated = (await topRatedRes.json()).results;
    if (nowPlayingRes.ok) nowPlaying = (await nowPlayingRes.json()).results;
    if (trendingRes.ok) trending = (await trendingRes.json()).results;
  } catch (err) {
    // Offline or API error
    popular = null;
  }

  // 🔴 OFFLINE OR FAILED FETCH HANDLER
  if (!popular || !topRated || !nowPlaying || !trending) {
    return (
      <div className="text-center p-12 text-gray-300">
        <h2 className="text-3xl font-bold text-red-500">You're Offline</h2>
        <p className="mt-4 text-gray-400">
          We couldn't load movies because there's no internet connection.
        </p>
        <p className="mt-2">Please reconnect and refresh.</p>
      </div>
    );
  }

  // Use first popular movie as hero
  const heroMovie = popular[0];

  return (
    <section id="home">
      {/* HERO BANNER */}
      {heroMovie && <HeroBanner movie={heroMovie} />}

      {/* MOVIE ROWS */}
    <section id="popular" className="scroll-mt-24">
       <MovieRow movies={popular} categoryTitle="Popular Movies" />
    </section>

    <section id="now-playing">
  <MovieRow movies={nowPlaying} categoryTitle="Now Playing" />
    </section>

    <section id="top-rated" className="scroll-mt-24">
      <MovieRow movies={topRated} categoryTitle="Top Rated" />
    </section>

    <section id="trending" className="scroll-mt-24">
      <MovieRow movies={trending} categoryTitle="Trending This Week" />
    </section>

    </section>
  );
}
