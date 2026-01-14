import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectMovieById,
  selectMovieLoading,
  selectMovieError,
} from "../RTK/selector";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import "./Detail.scss";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const GENRE_MAP = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스터리",
  10749: "로맨스",
  878: "SF",
  53: "스릴러",
  10752: "전쟁",
};

export default function Detail({ posterURL }) {
  const { id } = useParams();
  const movieId = Number(id);

  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);
  const movie = useSelector(selectMovieById(movieId));

  const { trailerKey, loading: trailerLoading } =
    useMovieTrailer(movieId);

  if (loading) return <div className="detail-page">로딩 중...</div>;
  if (error) return <div className="detail-page">에러: {error}</div>;
  if (!movie) return <div className="detail-page">영화 정보 없음</div>;

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const backgroundImageUrl =
    movie.backdrop_path
      ? BACKDROP_BASE_URL + movie.backdrop_path
      : "";

  const posterImageUrl =
    movie.poster_path ? posterURL + movie.poster_path : "";

  const genres =
    movie.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  return (
    <div className="detail-page">
      {backgroundImageUrl && (
        <div
          className="detail-page__bg"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="detail-page__overlay" />

      <div className="detail-page__content">
        <div className="detail-page__card">
          {/* 🔹 HEADER : 포스터 + 기본 정보 */}
          <div className="detail-page__header">
            {posterImageUrl && (
              <div className="detail-page__poster-wrap">
                <img
                  src={posterImageUrl}
                  alt={movie.title}
                  className="detail-page__poster"
                />
              </div>
            )}

            <div className="detail-page__info">
              <h1 className="detail-page__title">{movie.title}</h1>

              <div className="detail-page__meta">
                <span className="detail-page__rating">⭐ {rating}</span>
                {genres.length > 0 && (
                  <span>{genres.join(" · ")}</span>
                )}
                <span>
                  개봉일: {movie.release_date || "정보 없음"}
                </span>
                <div className="detail-page__section">
                  <h2 className="detail-page__section-title">줄거리</h2>
                  <p className="detail-page__overview">
                    {movie.overview || "등록된 줄거리가 없습니다."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-page__trailer-section">
            <h2 className="detail-page__section-title">예고편</h2>

            {trailerLoading ? (
              <div className="detail-page__no-trailer">
                예고편 로딩 중...
              </div>
            ) : trailerKey ? (
              <div className="detail-page__trailer-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Movie Trailer"
                />
              </div>
            ) : (
              <div className="detail-page__no-trailer">
                🎬 예고편이 없습니다
              </div>
            )}
          </div>


          <div className="detail-page__actions">
            <button
              className="detail-page__cgv-button"
              onClick={() =>
                window.open("https://cgv.co.kr/cnm/movieBook/movie/")
              }
            >
              👉 CGV에서 예매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
