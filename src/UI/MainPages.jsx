import React, { useContext, useEffect, useRef, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import "../Styles/mainpage.css";
import { TvShowContext } from "../Context/TvShowContext";
import topimage from "../assets/trending-label.webp";
import Genre from "./genre";

const MainPages = () => {
  const {
    getPopularMovies,
    movies,
    getTrendingMovies,
    trendingMovies,
    getTopTenMovies,
    topMovies,
    topRatedMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    upcomingMovies,
    getAllCasts,
    casts,
  } = useContext(MovieContext);

  const { getPopularTvShows, popularShows, getTopTvShows, popularTopShows } =
    useContext(TvShowContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeShowIndex, setActiveShowIndex] = useState(0);
  const [activeTopIndex, setActiveTopIndex] = useState(0);
  const [activeSlide, setActiveSlider] = useState(0);
  const [activeTopSlide, setActiveTopSlider] = useState(0);
  const [activeTrendSlide, setActiveTrendSlider] = useState(0);
  const [activeTopRatedslide, setActiveTopRatedSlider] = useState(0);
  const [activeUpcomingSlide, setActiveUpcomingSlide] = useState(0);
  const [activefavShowSlide, setActivefavShowSSlide] = useState(0);

  const [activeCastSlide, setActiveCastSlide] = useState(0);
  const [activePopularShowSlide, setActivePopularShowSlide] = useState(0);

  const [showSeason, setShowSeason] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
    getTopTenMovies();
    getTopRatedMovies();
    getUpcomingMovies();
    getPopularTvShows();
    getTopTvShows();
    getAllCasts();
  }, []);

  if (!movies || movies.length === 0) {
    return <div className="movie-loading">Loading movies...</div>;
  }
  if (!topRatedMovies || topRatedMovies.length === 0) {
    return <div className="movie-loading">Loading movies...</div>;
  }
  if (!popularShows || popularShows.length === 0) {
    return <div className="movie-loading">Loading movies...</div>;
  }
  const activeShow = popularShows[activeShowIndex];
  const activeMovie = movies[activeIndex];

  const firstSideMovie = movies[(activeIndex + 0) % movies.length];

  const secondSideMovie = movies[(activeIndex + 1) % movies.length];
  const nextShow = () => {
    setActiveShowIndex((prev) =>
      prev === popularShows.length - 1 ? 0 : prev + 1,
    );
  };

  const previousShow = () => {
    setActiveShowIndex((prev) =>
      prev === 0 ? popularShows.length - 1 : prev - 1,
    );
  };
  const nextMovie = () => {
    setActiveIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const previousMovie = () => {
    setActiveIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  const nextTopMovie = () => {
    setActiveTopIndex((prev) =>
      prev === topRatedMovies.length - 1 ? 0 : prev + 1,
    );
  };

  const previousTopMovie = () => {
    setActiveTopIndex((prev) =>
      prev === 0 ? topRatedMovies.length - 1 : prev - 1,
    );
  };

  const selectFirstMovie = () => {
    const index = movies.findIndex((movie) => movie.id === firstSideMovie.id);

    setActiveIndex(index);
  };
  const hours = Math.floor(activeMovie?.runtime / 60);
  const minutes = activeMovie?.runtime % 60;

  const selectSecondMovie = () => {
    const index = movies.findIndex((movie) => movie.id === secondSideMovie.id);

    setActiveIndex(index);
  };
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsPlaying(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsPlaying(false);
  };
  const nextSlider = () => {
    setActiveSlider((prev) => {
      if (prev + 6 >= movies.length) {
        return 0;
      }

      return prev + 1;
    });
  };
  const nextTopSlider = () => {
    setActiveTopSlider((prev) => {
      if (prev + 6 >= topMovies.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const nextUpcomingSlider = () => {
    setActiveUpcomingSlide((prev) => {
      if (prev + 5 >= upcomingMovies.length) {
        return 0;
      }

      return prev + 1;
    });
  };
  const nextTrendSlider = () => {
    setActiveTrendSlider((prev) => {
      if (prev + 3 >= trendingMovies.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const nextRatedSlider = () => {
    setActiveTopRatedSlider((prev) => {
      if (prev + 3 >= topRatedMovies.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const nextCastSlider = () => {
    setActiveCastSlide((prev) => {
      if (prev + 7 >= casts.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const nextPopularShowsSlider = () => {
    setActivePopularShowSlide((prev) => {
      if (prev + 7 >= popularShows.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const nextFavShowSlider = () => {
    setActivefavShowSSlide((prev) => {
      if (prev + 6 >= popularShows.length) {
        return 0;
      }
      return prev + 1;
    });
  };
  const previousSlider = () => {
    setActiveSlider((prev) => {
      if (prev === 0) {
        return Math.max(movies.length - 6, 0);
      }

      return prev - 1;
    });
  };
  const previousPopularShowsSlider = () => {
    setActivePopularShowSlide((prev) => {
      if (prev === 0) {
        return Math.max(popularShows.length - 6, 0);
      }

      return prev - 1;
    });
  };
  const previousTopSlider = () => {
    setActiveTopSlider((prev) => {
      if (prev === 0) {
        return Math.max(topMovies.length - 6, 0);
      }
      return prev - 1;
    });
  };
  const previousTrendSlider = () => {
    setActiveTrendSlider((prev) => {
      if (prev === 0) {
        return Math.max(trendingMovies.length - 3, 0);
      }
      return prev - 1;
    });
  };
  const previousRatedSlider = () => {
    setActiveTopRatedSlider((prev) => {
      if (prev === 0) {
        return Math.max(topRatedMovies.length - 3, 0);
      }
      return prev - 1;
    });
  };
  const previousUpcomingSlider = () => {
    setActiveUpcomingSlide((prev) => {
      if (prev === 0) {
        return Math.max(upcomingMovies.length - 5, 0);
      }

      return prev - 1;
    });
  };
  const previousCastSlider = () => {
    setActiveCastSlide((prev) => {
      if (prev === 0) {
        return Math.max(casts.length - 7, 0);
      }
      return prev - 1;
    });
  };
  const previousFavShowSlider = () => {
    setActiveFavShowSlide((prev) => {
      if (prev === 0) {
        return Math.max(popularShows.length - 6, 0);
      }
      return prev - 1;
    });
  };
  const displayNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });
  const getLanguageName = (code) => {
    if (!code || typeof code !== "string") {
      return "Unknown";
    }

    try {
      return displayNames.of(code) || "Unknown";
    } catch (error) {
      return "Unknown";
    }
  };
  const activeTopMovie = topRatedMovies[activeTopIndex];
  const TopFirstSideMovie =
    topRatedMovies[
      (activeTopIndex - 1 + topRatedMovies.length) % topRatedMovies.length
    ];

  const TopSecondSideMovie =
    topRatedMovies[activeTopIndex % topRatedMovies.length];
  const TopThirdSideMovie =
    topRatedMovies[(activeTopIndex + 1) % topRatedMovies.length];
  const topHours = Math.floor(activeTopMovie?.runtime / 60);
  const TopMinutes = activeTopMovie?.runtime % 60;
  const selectTopFirstMovie = () => {
    const index = topRatedMovies.findIndex(
      (movie) => movie.id === TopFirstSideMovie.id,
    );

    setActiveTopIndex(index);
  };
  const selectTopSecondMovie = () => {
    const index = topRatedMovies.findIndex(
      (movie) => movie.id === TopSecondSideMovie.id,
    );

    setActiveTopIndex(index);
  };
  const selectTopThirdMovie = () => {
    setActiveTopIndex((prev) =>
      prev === topRatedMovies.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <main className="main-page">
      <section className="hero-section">
        <img
          className="hero-image"
          src={`https://image.tmdb.org/t/p/original${activeMovie.backdropPath}`}
          alt={activeMovie.title}
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            {" "}
            {activeMovie.title.length > 20
              ? activeMovie.title.slice(0, 10) + "..."
              : activeMovie.title}
          </h1>

          <div className="hero-meta">
            <span className="season">{`▶ ${hours}h ${minutes}m`}</span>

            <span className="stars">★{activeMovie.rating}</span>
            <span className="date">
              ◷{" "}
              {activeMovie.releaseDate
                ? new Date(activeMovie.releaseDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    },
                  )
                : ""}
            </span>
          </div>

          <p className="hero-description">{activeMovie.overview}</p>

          <div className="movie-information">
            <p>
              <span>Tags:</span>{" "}
              {activeMovie.tags
                .slice(0, 3)
                .map((tag) => tag)
                .join(",")}
            </p>

            <p>
              <span>Genres:</span>{" "}
              {activeMovie.genres
                .slice(0, 3)
                .map((g) => g.genre.name)
                .join(", ")}
            </p>

            <p>
              <span>Starring:</span>{" "}
              {activeMovie.cast
                .slice(0, 3)
                .map((c) => c.cast.name)
                .join(", ")}
            </p>
          </div>

          <button className="play-button">
            Play Now
            <span>▶</span>
          </button>
        </div>

        <div className="side-movies">
          <div className="side-movie-card" onClick={selectFirstMovie}>
            <img
              src={`https://image.tmdb.org/t/p/w500${firstSideMovie.posterPath}`}
              alt={firstSideMovie.title}
            />

            <div className="side-card-overlay"></div>

            <div className="side-card-content">
              <h3>{firstSideMovie.title}</h3>

              <p>
                ◷{" "}
                {firstSideMovie.releaseDate
                  ? new Date(firstSideMovie.releaseDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : ""}
              </p>
            </div>
          </div>

          <div className="side-movie-card" onClick={selectSecondMovie}>
            <img
              src={`https://image.tmdb.org/t/p/w500${secondSideMovie.posterPath}`}
              alt={secondSideMovie.title}
            />

            <div className="side-card-overlay"></div>

            <div className="side-card-content">
              <h3>{secondSideMovie.title}</h3>

              <p>
                ◷{" "}
                {secondSideMovie.releaseDate
                  ? new Date(secondSideMovie.releaseDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : ""}
              </p>
            </div>
          </div>

          <div className="slider-arrows">
            <button onClick={previousMovie}>‹</button>

            <button onClick={nextMovie}>›</button>
          </div>
        </div>
      </section>
      <section className="top-movie">
        <h2>top 10 movies to watch</h2>
        <div>
          <button
            type="button"
            onClick={previousTopSlider}
            className="genre-arrow top-left"
          >
            ‹
          </button>
        </div>
        <div className="trend">
          {topMovies
            .slice(activeTopSlide, activeTopSlide + 10)
            .map((movie, index) => (
              <div className="trend-image" key={movie.id}>
                <span className="movie-number">
                  {" "}
                  {activeTopSlide + index + 1}
                </span>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                />
              </div>
            ))}
        </div>
        <div>
          <button onClick={nextTopSlider} className="genre-arrow top-right">
            ›
          </button>
        </div>
      </section>
      <section className="popular-section">
        <h2>Popular Movies</h2>

        <div>
          <button onClick={previousSlider} className="genre-arrow left-popular">
            ‹
          </button>
        </div>
        <div className="movie-slider">
          <div className="movie-grid">
            {movies.slice(activeSlide, activeSlide + 15).map((movie) => (
              <div className="movie-container" key={movie.id}>
                <div className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                  />
                </div>

                <div className="movie-card-two">
                  <div className="movie-card-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="movie-card-info">
                    <p className="movie-genre">
                      {movie.genres
                        .slice(0, 3)
                        .map((g) => g.genre.name)
                        .join(", ")}
                    </p>
                    <h3>
                      {movie.title.length > 20
                        ? movie.title.slice(0, 10) + "..."
                        : movie.title}
                    </h3>
                    <p className="movie-language">
                      <span>文A</span> {getLanguageName(movie.originalLanguage)}
                    </p>
                    <div className="movie-button">
                      <div className="plus">
                        <i class="bi bi-plus"></i>
                      </div>
                      <div className="play-container">
                        <button className="play-buttons">
                          Play Now
                          <span>▶</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={nextSlider} className="genre-arrow right-popular">
            ›
          </button>
        </div>
      </section>
      <section className="trending-section">
        <h2>Top Picks For You</h2>
        <div>
          <button
            type="button"
            onClick={previousTrendSlider}
            className="genre-arrow trend-left"
          >
            ‹
          </button>
        </div>
        <div className="movie-hide">
          <div className="movie-trend">
            {trendingMovies
              .slice(activeTrendSlide + 15, activeTrendSlide + 50)
              .map((movie, index) => (
                <div
                  className="trending-card"
                  key={movie.id}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="poster-image">
                    <img
                      className="card-poster"
                      src={`https://image.tmdb.org/t/p/w780${movie.posterPath}`}
                      alt={movie.title}
                    />
                    <div className="card-overlay">
                      <h4 className="card-title">{movie.title}</h4>
                    </div>
                  </div>

                  <div className="trend-iframe-contain">
                    <div className="trend-iframe">
                      <iframe
                        className="card-video"
                        src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailerKey}&enablejsapi=1`}
                        title={movie.title}
                        allow="autoplay; encrypted-media"
                      />
                    </div>

                    <div className="trend-card-info">
                      <p className="movie-genre">
                        {movie.genres
                          .slice(0, 1)
                          .map((g) => g.genre.name)
                          .join(", ")}
                      </p>
                      <h3>
                        {movie.title.length > 20
                          ? movie.title.slice(0, 10) + "..."
                          : movie.title}
                      </h3>
                      <div className="movie-button">
                        <div className="plus">
                          <i class="bi bi-plus"></i>
                        </div>
                        <div className="trend-plays">
                          <button className="play-buttons">
                            Play Now
                            <span>▶</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button onClick={nextTrendSlider} className="genre-arrow trend-right">
            ›
          </button>
        </div>
      </section>
      <section className="rated-section">
        <img
          className="rated-image"
          src={`https://image.tmdb.org/t/p/original${activeTopMovie?.backdropPath} `}
          alt={activeTopMovie.title}
        />

        <div className="rated-overlay"></div>
        <div className="rated-side-movies">
          <div>
            <button
              type="button"
              onClick={nextTopMovie}
              className="genre-arrow rated-top"
            >
              ▲
            </button>
          </div>
          <div
            className={`rated-side-movie-card ${TopFirstSideMovie?.id === activeTopMovie?.id ? "active" : ""}`}
            onClick={selectTopFirstMovie}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${TopFirstSideMovie?.posterPath || TopFirstSideMovie?.posterPath}`}
              alt={TopFirstSideMovie?.title}
            />
            <div className="rated-side-card-overlay"></div>
            <div className="rated-side-card-content">
              <h3>{TopFirstSideMovie?.title}</h3>
            </div>
          </div>
          <div
            className={`rated-side-movie-card ${TopSecondSideMovie?.id === activeTopMovie?.id ? "active" : ""}`}
            onClick={selectTopSecondMovie}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${TopSecondSideMovie?.backdropPath || TopSecondSideMovie?.posterPath}`}
              alt={TopSecondSideMovie?.title}
            />
            <div className="rated-side-card-overlay"></div>
            <div className="rated-side-card-content">
              <h3>{TopSecondSideMovie?.title}</h3>
            </div>
          </div>

          <div
            className={`rated-side-movie-card ${TopThirdSideMovie?.id === activeTopMovie?.id ? "active" : ""}`}
            onClick={selectTopThirdMovie}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${TopThirdSideMovie?.backdropPath || TopThirdSideMovie?.posterPath}`}
              alt={TopThirdSideMovie?.title}
            />
            <div className="rated-side-card-overlay"></div>
            <div className="rated-side-card-content">
              <h3>{TopThirdSideMovie?.title}</h3>
            </div>
          </div>
          <div>
            <button
              onClick={previousTopMovie}
              className="genre-arrow rated-bottom"
            >
              ▼
            </button>
          </div>
        </div>

        <div className="rated-content">
          <div className="rated-genres">
            {activeTopMovie?.genres?.map((g) => (
              <span key={g.genre.name} className="rated-genre">
                {g.genre.name}
              </span>
            ))}
          </div>
          <h1 className="rated-title">
            {" "}
            {activeTopMovie?.title.length > 20
              ? activeTopMovie?.title.slice(0, 10) + "..."
              : activeTopMovie?.title}
          </h1>

          <div className="rated-meta">
            <span className="season">{`▶ ${topHours}h ${TopMinutes}m`}</span>

            <span className="stars">★{activeTopMovie.rating}</span>
            <span className="rated-date">
              ◷{" "}
              {activeTopMovie.releaseDate
                ? new Date(activeTopMovie.releaseDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    },
                  )
                : ""}
            </span>
          </div>

          <p className="rated-description">{activeTopMovie.overview}</p>
          <button className="play-button">
            Play Now
            <span>▶</span>
          </button>
        </div>
      </section>
      <Genre />
      <section className="upcoming-section">
        <div className="upcoming-header">
          <div>
            <span className="coming-soon">✦ COMING SOON</span>
            <h2>Upcoming Movies</h2>
            <p>Exciting stories are on their way. Mark your calendar!</p>
          </div>

          <button className="view-all">View All →</button>
        </div>
        <div>
          <button
            type="button"
            onClick={previousUpcomingSlider}
            className="genre-arrow upcoming-right"
          >
            ‹
          </button>
        </div>

        <div className="upcoming-hide">
          <div className="upcoming-hero">
            {upcomingMovies
              .slice(activeUpcomingSlide + 1, activeUpcomingSlide + 20)
              .map((movie) => (
                <div className="upcoming-image" key={movie.id}>
                  <div className="upcoming-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${
                        movie.posterPath || movie.backdropPath
                      }`}
                      alt={movie.title}
                    />
                  </div>

                  <div className="upcoming-info">
                    <h3>{movie.title}</h3>

                    <p className="release-date">
                      📅{" "}
                      {movie.releaseDate
                        ? new Date(movie.releaseDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Coming Soon"}
                    </p>

                    <button className="remind-btn">♧ Remind Me</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button
            onClick={nextUpcomingSlider}
            className="genre-arrow upcoming-left"
          >
            ›
          </button>
        </div>
      </section>

      <section className="hero-tvshow">
        <img
          className="show-image"
          src={`https://image.tmdb.org/t/p/original${activeShow.backdropPath}`}
          alt={activeShow.title}
        />

        <div className="show-overlay"></div>

        <div className="show-content">
          <div className="top-series">
            <img src={topimage} alt="top image" />
            <span>#{activeShowIndex + 1} in Series Today</span>
          </div>
          <h1 className="hero-title">
            {" "}
            {activeShow.title.length > 20
              ? activeShow.title.slice(0, 10) + "..."
              : activeShow.title}
          </h1>

          <p className="hero-description">{activeShow.overview}</p>
          <div className="hero-meta">
            <span className="date">
              {" "}
              {activeShow.firstAirDate
                ? new Date(activeShow.firstAirDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    },
                  )
                : ""}
            </span>
            ●<span>{activeShow.numberOfSeasons} Seasons</span>
          </div>

          <button className="play-button">
            Stream Now
            <span>▶</span>
          </button>
          <div className="show-arrow">
            <div>
              <button onClick={nextShow} className="genre-arrow show-left">
                ›
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={previousShow}
                className="genre-arrow show-right"
              >
                ‹
              </button>
            </div>
          </div>
        </div>

        <div className="show-season">
          <h2>ALL EPISODES</h2>
          <div>
            <div className="seasons">
              <div className="active-season">
                {activeShow?.seasons && activeShow.seasons.length > 0 ? (
                  activeShow.seasons.map((season) => (
                    <button
                      key={season.id || season.seasonNumber}
                      className={`tab-btn ${showSeason === season.seasonNumber ? "active" : ""}`}
                      onClick={() => setShowSeason(season.seasonNumber)}
                    >
                      Season {season.seasonNumber}
                    </button>
                  ))
                ) : (
                  <p>No seasons available</p>
                )}
              </div>
            </div>
            <div className="episodes-scroll-container">
              {activeShow?.seasons
                ?.find((s) => s.seasonNumber === showSeason)
                ?.episodes?.map((episode) => (
                  <div key={episode.id} className="episode-item">
                    <div className="episode-thumbnail">
                      <img
                        src={
                          episode.stillPath
                            ? `https://image.tmdb.org/t/p/w300${episode.stillPath}`
                            : activeShow?.backdropPath
                              ? `https://image.tmdb.org/t/p/w300${activeShow.backdropPath}`
                              : "/placeholder.jpg"
                        }
                        alt={episode.name}
                      />
                    </div>
                    <div className="episode-details">
                      <h4 className="episode-title">
                        {episode.episodeNumber}. {episode.name}
                      </h4>
                      <span className="episode-duration">
                        ◷ {episode.runtime ? `${episode.runtime}m` : "45m"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <h2>Recommended Tv Shows</h2>

        <div>
          <button
            onClick={previousPopularShowsSlider}
            className="genre-arrow left-popular"
          >
            ‹
          </button>
        </div>
        <div className="movie-slider">
          <div className="movie-grid">
            {popularTopShows
              .slice(activePopularShowSlide + 5, activePopularShowSlide + 20)
              .map((movie) => (
                <div className="movie-container" key={movie.id}>
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                    />
                  </div>

                  <div className="movie-card-two">
                    <div className="movie-card-poster">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="movie-card-info">
                      <p className="movie-genre">
                        {movie.genres
                          .slice(0, 3)
                          .map((g) => g.genre.name)
                          .join(", ")}
                      </p>
                      <h3>
                        {movie.title.length > 20
                          ? movie.title.slice(0, 10) + "..."
                          : movie.title}
                      </h3>
                      <p className="movie-language">
                        <span>文A</span>{" "}
                        {getLanguageName(movie.originalLanguage)}
                      </p>
                      <div className="movie-button">
                        <div className="plus">
                          <i class="bi bi-plus"></i>
                        </div>
                        <div className="play-container">
                          <button className="play-buttons">
                            Play Now
                            <span>▶</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button
            onClick={nextPopularShowsSlider}
            className="genre-arrow right-popular"
          >
            ›
          </button>
        </div>
      </section>

      <section className="cast-section">
        <div className="cast-header">
          <h2>Your Favourite Personality</h2>
        </div>

        <button
          className="genre-arrow cast-left"
          onClick={previousCastSlider}
          type="button"
        >
          ‹
        </button>

        <div className="cast-grid">
          {casts
            .slice(activeCastSlide + 40, activeCastSlide + 70)
            .map((person) => (
              <div className="cast-card" key={person.id}>
                <div className="cast-image-wrapper">
                  <img
                    src={`https://image.tmdb.org/t/p/original${person.profilePath}`}
                    alt={person.name}
                  />
                </div>
                <div className="cast-info">
                  <h4 className="cast-name">{person.name}</h4>
                </div>
              </div>
            ))}
        </div>
        <button
          className="genre-arrow cast-right"
          onClick={nextCastSlider}
          type="button"
        >
          ›
        </button>
      </section>

      <section className="popular-section">
        <h2>Top Shows For You</h2>

        <div>
          <button
            onClick={previousFavShowSlider}
            className="genre-arrow left-popular"
          >
            ‹
          </button>
        </div>
        <div className="movie-slider">
          <div className="movie-grid">
            {popularTopShows
              .slice(activefavShowSlide + 30, activefavShowSlide + 50)
              .map((movie) => (
                <div className="movie-container" key={movie.id}>
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                    />
                  </div>

                  <div className="movie-card-two">
                    <div className="movie-card-poster">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="movie-card-info">
                      <p className="movie-genre">
                        {movie.genres
                          .slice(0, 3)
                          .map((g) => g.genre.name)
                          .join(", ")}
                      </p>
                      <h3>
                        {movie.title.length > 20
                          ? movie.title.slice(0, 10) + "..."
                          : movie.title}
                      </h3>
                      <p className="movie-language">
                        <span>文A</span>{" "}
                        {getLanguageName(movie.originalLanguage)}
                      </p>
                      <div className="movie-button">
                        <div className="plus">
                          <i class="bi bi-plus"></i>
                        </div>
                        <div className="play-container">
                          <button className="play-buttons">
                            Play Now
                            <span>▶</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button
            onClick={nextFavShowSlider}
            className="genre-arrow right-popular"
          >
            ›
          </button>
        </div>
      </section>
    </main>
  );
};

export default MainPages;
