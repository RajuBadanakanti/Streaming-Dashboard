export interface Movie {
  id: number;
  title?: string;
  name?: string; // Some API endpoints return 'name' instead of 'title'
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  runtime?: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;

  genres: {
    id: number;
    name: string;
  }[];

  vote_average: number;
  vote_count: number;

  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };

  images?: {
    backdrops: {
      file_path: string;
    }[];
    posters: {
      file_path: string;
    }[];
  };
}
