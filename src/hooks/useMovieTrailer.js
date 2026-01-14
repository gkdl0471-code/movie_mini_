import { useEffect, useState } from "react";

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export function useMovieTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        const data = await res.json();

        const trailer = data.results?.find(
          v => v.site === "YouTube" && v.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (e) {
        console.error("트레일러 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return { trailerKey, loading };
}
