import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaPlay,
  FaArrowLeft,
  FaStar,
  FaClock,
  FaCalendar,
  FaFilm,
  FaGlobe,
} from "react-icons/fa";
import { fetchMovieById, fetchMovieVideos } from "../../shared/api/kinopoisk";
import { useFavourites } from "../../features/favourites/context";
import Loader from "../../shared/ui/Loader";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggle, isFavourite } = useFavourites();

  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const isFav = movie ? isFavourite(movie.id) : false;

  // Открыть трейлер на YouTube
  const openTrailerOnYouTube = () => {
    if (!movie) return;
    const searchQuery = encodeURIComponent(
      `${movie.name || movie.alternativeName} ${movie.year} трейлер`,
    );
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank",
    );
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieData = await fetchMovieById(id);
        setMovie(movieData);

        // Пробуем получить видео, но не блокируем загрузку если не получится
        try {
          const videosData = await fetchMovieVideos(id);
          setVideos(videosData);
          if (videosData.length > 0) {
            setActiveVideo(videosData[0]);
          }
        } catch (videoErr) {
          console.log("Видео недоступны, будет использован YouTube");
          setVideos([]);
        }
      } catch (err) {
        setError("Не удалось загрузить информацию о фильме");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  // ОПТИМИЗАЦИЯ 8: formatDuration вызывается при каждом рендере (несколько раз).
  // Рекомендуется вынести за пределы компонента как чистую функцию или обернуть в useMemo,
  // если она зависит от состояния/пропсов. Также getYoutubeEmbedUrl создаётся при каждом рендере.

  const formatDuration = (minutes) => {
    if (!minutes) return "—";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}мин` : `${mins} мин`;
  };

  // Получение ID видео для YouTube
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    // youtube.com/watch?v=VIDEO_ID
    let match = url.match(/[?&]v=([^&]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;

    // youtu.be/VIDEO_ID
    match = url.match(/youtu\.be\/([^?]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;

    // youtube.com/embed/VIDEO_ID
    match = url.match(/youtube\.com\/embed\/([^?]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;

    return url;
  };

  if (loading) {
    return (
      <div className="movie-loader">
        <Loader />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details">
        <div className="movie-details__error">
          <h2>{error || "Фильм не найден"}</h2>
          <button onClick={() => navigate(-1)}>Назад</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details">
      {/* Кнопка назад */}
      <button className="movie-details__back" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Назад
      </button>

      {/* Hero секция с постером */}
      <div
        className="movie-details__hero"
        style={{
          backgroundImage: movie.backdrop?.url
            ? `url(${movie.backdrop.url})`
            : movie.poster?.url
              ? `url(${movie.poster.url})`
              : "none",
        }}
      >
        <div className="movie-details__hero-overlay">
          <div className="movie-details__content">
            {/* Постер */}
            <div className="movie-details__poster">
              {movie.poster?.url && (
                <img src={movie.poster.url} alt={movie.name} />
              )}
            </div>

            {/* Информация */}
            <div className="movie-details__info">
              <h1 className="movie-details__title">
                {movie.name || movie.alternativeName}
              </h1>

              {movie.alternativeName && movie.name && (
                <p className="movie-details__original-title">
                  {movie.alternativeName}
                </p>
              )}

              <div className="movie-details__meta">
                {movie.rating?.kp && (
                  <span className="movie-details__rating">
                    <FaStar /> {movie.rating.kp.toFixed(1)}
                  </span>
                )}
                {movie.year && (
                  <span>
                    <FaCalendar /> {movie.year}
                  </span>
                )}
                {movie.movieLength && (
                  <span>
                    <FaClock /> {formatDuration(movie.movieLength)}
                  </span>
                )}
                {movie.type && (
                  <span>
                    <FaFilm />{" "}
                    {movie.type === "movie"
                      ? "Фильм"
                      : movie.type === "tv-series"
                        ? "Сериал"
                        : movie.type}
                  </span>
                )}
              </div>

              <div className="movie-details__genres">
                {movie.genres?.map((g) => (
                  <span key={g.name}>{g.name}</span>
                ))}
              </div>

              <div className="movie-details__actions">
                <button
                  className={`movie-details__fav ${isFav ? "active" : ""}`}
                  onClick={() => toggle(movie)}
                >
                  {isFav ? <FaHeart /> : <FaRegHeart />}
                  {isFav ? "В избранном" : "В избранное"}
                </button>

                <button
                  className="movie-details__trailer"
                  onClick={openTrailerOnYouTube}
                >
                  <FaPlay /> Смотреть трейлер
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Описание */}
      {movie.description && (
        <div className="movie-details__section">
          <h2>Описание</h2>
          <p>{movie.description}</p>
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="movie-details__section">
        <h2>О фильме</h2>
        <div className="movie-details__facts">
          {movie.countries?.length > 0 && (
            <div className="movie-details__fact">
              <span className="label">Страна</span>
              <span className="value">
                {movie.countries.map((c) => c.name).join(", ")}
              </span>
            </div>
          )}
          {movie.genres?.length > 0 && (
            <div className="movie-details__fact">
              <span className="label">Жанр</span>
              <span className="value">
                {movie.genres.map((g) => g.name).join(", ")}
              </span>
            </div>
          )}
          {movie.year && (
            <div className="movie-details__fact">
              <span className="label">Год</span>
              <span className="value">{movie.year}</span>
            </div>
          )}
          {movie.movieLength && (
            <div className="movie-details__fact">
              <span className="label">Длительность</span>
              <span className="value">{formatDuration(movie.movieLength)}</span>
            </div>
          )}
          {movie.rating?.kp && (
            <div className="movie-details__fact">
              <span className="label">Рейтинг Кинопоиск</span>
              <span className="value rating">{movie.rating.kp.toFixed(1)}</span>
            </div>
          )}
          {movie.rating?.imdb && (
            <div className="movie-details__fact">
              <span className="label">Рейтинг IMDb</span>
              <span className="value rating">
                {movie.rating.imdb.toFixed(1)}
              </span>
            </div>
          )}
          {movie.votes?.kp && (
            <div className="movie-details__fact">
              <span className="label">Голосов</span>
              <span className="value">{movie.votes.kp.toLocaleString()}</span>
            </div>
          )}
          {movie.ageRating && (
            <div className="movie-details__fact">
              <span className="label">Возраст</span>
              <span className="value">{movie.ageRating}+</span>
            </div>
          )}
          {movie.slogan && (
            <div className="movie-details__fact">
              <span className="label">Слоган</span>
              <span className="value">"{movie.slogan}"</span>
            </div>
          )}
          {movie.director && (
            <div className="movie-details__fact">
              <span className="label">Режиссер</span>
              <span className="value">{movie.director}</span>
            </div>
          )}
        </div>
      </div>

      {/* Видео */}
      <div className="movie-details__section">
        <h2>Видео</h2>

        {videos.length > 0 ? (
          <div className="movie-details__videos">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`movie-details__video ${activeVideo?.id === video.id ? "active" : ""}`}
                onClick={() => {
                  setActiveVideo(video);
                  setShowVideo(true);
                }}
              >
                <div className="movie-details__video-thumb">
                  {video.thumbnailUrl && (
                    <img src={video.thumbnailUrl} alt={video.name} />
                  )}
                  <div className="play-overlay">
                    <FaPlay />
                  </div>
                </div>
                <span className="movie-details__video-title">{video.name}</span>
                <span className="movie-details__video-type">
                  {video.type === "trailer" ? "Трейлер" : "Тизер"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="movie-details__youtube-search">
            <p>Официальные трейлеры недоступны</p>
            <button
              className="movie-details__youtube-btn"
              onClick={openTrailerOnYouTube}
            >
              <FaPlay /> Искать трейлер на YouTube
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно с видео */}
      {showVideo && activeVideo && (
        <div
          className="movie-details__video-modal"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="movie-details__video-player"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="movie-details__video-close"
              onClick={() => setShowVideo(false)}
            >
              ×
            </button>
            {activeVideo.url.includes("youtube.com") ||
            activeVideo.url.includes("youtu.be") ? (
              <iframe
                src={getYoutubeEmbedUrl(activeVideo.url)}
                title={activeVideo.name}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={activeVideo.url}
                controls
                autoPlay
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
