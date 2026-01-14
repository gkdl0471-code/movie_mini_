import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import "./MovieCard.scss";

export function MovieCard({ title, rating, posterUrl, movieId, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [portalStyle, setPortalStyle] = useState(null);
  const { trailerKey } = useMovieTrailer(hovered ? movieId : null);
  const displayRating = typeof rating === "number" ? rating.toFixed(1) : "N/A";
  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPortalStyle({
      top: rect.top - 220,
      left: rect.left + rect.width / 2,
    });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPortalStyle(null);
  };

  return (
    <>
      <div
        className="cardWrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cardBox" onClick={onClick}>
          <img src={posterUrl} alt={title} className="movie-poster" />
          <h3>{title}</h3>
          <p>⭐ {displayRating}</p>
        </div>
      </div>

      {hovered && trailerKey && portalStyle &&
        createPortal(
          <div
            className="trailerPortal"
            style={{
              top: `${portalStyle.top}px`,
              left: `${portalStyle.left}px`,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1`}
              allow="autoplay; encrypted-media"
              title={title}
            />
          </div>,
          document.body
        )}
    </>
  );
}
