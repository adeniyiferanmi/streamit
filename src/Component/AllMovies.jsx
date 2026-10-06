import React, { useState, useEffect, useContext, useMemo } from "react";
import { MovieContext } from "../Context/MovieContext";
import "../Styles/allMovies.css";
import Footer from "../UI/Footer";
import Headers from "../UI/Headers";
import Loader from "../Component/Loader";

const PAGE_SIZE = 15;

const AllMovies = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const {
    allMovies,
    getAllMovies,
    getPopularMovies,
    movies,
    getTrendingMovies,
    trendingMovies,
    getTopRatedMovies,
    topRatedMovies,
  } = useContext(MovieContext);

  const categories = ["All", "Popular", "Trending", "Top_Rated"];

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);

        const fetchPromises = [];

        if (getAllMovies) fetchPromises.push(getAllMovies());
        if (getPopularMovies) fetchPromises.push(getPopularMovies());
        if (getTrendingMovies) fetchPromises.push(getTrendingMovies());
        if (getTopRatedMovies) fetchPromises.push(getTopRatedMovies());

        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCat, searchTerm]);

  const getTitle = (movie) => {
    return movie?.title || movie?.name || "Untitled Movie";
  };

  const getPoster = (movie) => {
    const poster = movie?.posterPath || movie?.poster_path || movie?.poster;

    if (!poster) {
      return "https://via.placeholder.com/500x750?text=No+Poster";
    }

    if (poster.startsWith("http")) {
      return poster;
    }

    return `https://image.tmdb.org/t/p/w500${poster}`;
  };

  const getBackdrop = (movie) => {
    const backdrop =
      movie?.backdropPath || movie?.backdrop_path || movie?.backdrop;

    if (!backdrop) {
      return getPoster(movie);
    }

    if (backdrop.startsWith("http")) {
      return backdrop;
    }

    return `https://image.tmdb.org/t/p/original${backdrop}`;
  };

  const getYear = (movie) => {
    const date = movie?.releaseDate || movie?.release_date;

    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.getFullYear();
  };

  const getRating = (movie) => {
    const rating = movie?.voteAverage ?? movie?.vote_average ?? movie?.rating;

    if (rating === undefined || rating === null || rating === "") {
      return "N/A";
    }

    const value = Number(rating);

    return Number.isNaN(value) ? "N/A" : value.toFixed(1);
  };

  const getRuntime = (movie) => {
    const runtime = movie?.runtime ?? movie?.duration;

    if (runtime === undefined || runtime === null || runtime === "") {
      return null;
    }

    if (typeof runtime === "string") {
      return runtime;
    }

    const value = Number(runtime);

    if (Number.isNaN(value)) {
      return null;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getGenres = (movie) => {
    const list = movie?.categories || movie?.genres;

    if (!Array.isArray(list)) {
      return [];
    }

    return list
      .map((item) => {
        if (item?.category?.name) {
          return item.category.name;
        }

        if (item?.genre?.name) {
          return item.genre.name;
        }

        if (typeof item?.categories === "string") {
          return item.categories;
        }

        if (item?.name) {
          return item.name;
        }

        if (typeof item === "string") {
          return item;
        }

        return null;
      })
      .filter(Boolean)
      .slice(0, 3);
  };

  const filteredMovies = useMemo(() => {
    let targetList = Array.isArray(allMovies) ? allMovies : [];

    if (
      selectedCat === "Popular" &&
      Array.isArray(movies) &&
      movies.length > 0
    ) {
      targetList = movies;
    } else if (
      selectedCat === "Trending" &&
      Array.isArray(trendingMovies) &&
      trendingMovies.length > 0
    ) {
      targetList = trendingMovies;
    } else if (
      selectedCat === "Top_Rated" &&
      Array.isArray(topRatedMovies) &&
      topRatedMovies.length > 0
    ) {
      targetList = topRatedMovies;
    }

    return targetList.filter((movie) => {
      const genres = getGenres(movie);

      const matchesCategoryTag =
        selectedCat === "All" ||
        genres.some((g) => g.toLowerCase() === selectedCat.toLowerCase()) ||
        movie?.category?.toLowerCase() === selectedCat.toLowerCase();

      const title = getTitle(movie);

      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        (selectedCat === "All" ||
          matchesCategoryTag ||
          targetList !== allMovies) &&
        matchesSearch
      );
    });
  }, [
    allMovies,
    movies,
    trendingMovies,
    topRatedMovies,
    selectedCat,
    searchTerm,
  ]);

  const displayedMovies = useMemo(() => {
    return filteredMovies.slice(0, visibleCount);
  }, [filteredMovies, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const heroMovies = useMemo(() => {
    if (!Array.isArray(trendingMovies)) {
      return [];
    }

    return trendingMovies.filter(Boolean).slice(3, 7);
  }, [trendingMovies]);

  const heroMovie = heroMovies[0];

  const handleExploreCollection = () => {
    document.querySelector(".movie-catalog")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  <Loader loading={loading} onFinish={() => {}} />;

  return (
    <>
      <Headers />

      <main className="all-movies-page">
        <section className="cinematic-catalog-hero">
          <div className="catalog-hero-background">
            {heroMovie && <img src={getBackdrop(heroMovie)} alt="" />}
          </div>

          <div className="catalog-hero-overlay"></div>

          <div className="catalog-hero-vignette"></div>

          <div className="catalog-hero-content">
            <div className="catalog-hero-copy">
              <div className="catalog-eyebrow hero-eyebrow">
                <span></span>
                THE COMPLETE COLLECTION
              </div>

              <h1>
                Every Story.
                <br />
                <em>One Collection.</em>
              </h1>

              <p>
                Explore our entire movie universe — from explosive blockbusters
                and unforgettable classics to hidden gems waiting to be
                discovered.
              </p>

              <div className="catalog-hero-stats">
                <div>
                  <strong>{allMovies?.length || 0}</strong>

                  <span>MOVIES</span>
                </div>

                <div className="hero-stat-line"></div>

                <div>
                  <strong>4K</strong>

                  <span>ULTRA HD</span>
                </div>

                <div className="hero-stat-line"></div>

                <div>
                  <strong>∞</strong>

                  <span>STORIES</span>
                </div>
              </div>
              <button
                type="button"
                className="hero-catalog-button"
                onClick={handleExploreCollection}
              >
                <span>EXPLORE COLLECTION</span>

                <span>↓</span>
              </button>
            </div>

            <div className="catalog-hero-artwork">
              {heroMovies.map((movie, index) => (
                <div
                  className={`hero-poster hero-poster-${index + 1}`}
                  key={movie.id || movie.tmdb_id || index}
                >
                  <img src={getPoster(movie)} alt={getTitle(movie)} />
                </div>
              ))}

              <div className="hero-artwork-label">
                <span>CURATED</span>

                <strong>FOR YOU</strong>
              </div>
            </div>
          </div>

          <div className="catalog-hero-bottom">
            <div className="hero-scroll-indicator">
              <span></span>
              SCROLL TO EXPLORE
            </div>
          </div>
        </section>

        <section className="movie-catalog">
          <div className="catalog-intro">
            <div>
              <span className="catalog-eyebrow">EXPLORE COLLECTION</span>

              <h2>
                BROWSE <em>CATALOG</em>
              </h2>
            </div>
            <div className="cinema-search">
              <span className="search-symbol">⌕</span>

              <input
                type="text"
                placeholder="Filter titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm("")}>
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="catalog-navigation">
            <nav className="genre-navigation">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={selectedCat === cat ? "genre-active" : ""}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat.replace("_", " ")}

                  {selectedCat === cat && <span className="active-line"></span>}
                </button>
              ))}
            </nav>

            <div className="catalog-result">
              SHOWING <strong>{displayedMovies.length}</strong> OF{" "}
              <strong>{filteredMovies.length}</strong>
            </div>
          </div>

          {displayedMovies.length > 0 ? (
            <>
              <div className="premium-movie-grid">
                {displayedMovies.map((movie, index) => {
                  const genres = getGenres(movie);

                  return (
                    <article
                      key={movie.id || movie.tmdb_id || index}
                      className="premium-movie-card"
                    >
                      {/* IMAGE */}

                      <div className="card-image">
                        <img src={getPoster(movie)} alt={getTitle(movie)} />

                        {/* RANK */}

                        <span className="card-rank">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                        {/* RATING */}

                        <div className="card-rating">
                          <span>★</span>

                          {getRating(movie)}
                        </div>

                        {/* HOVER */}

                        <div className="card-hover">
                          <div className="hover-content">
                            <button type="button" className="card-play">
                              ▶
                            </button>

                            <span>PREVIEW</span>
                          </div>

                          <button type="button" className="card-add">
                            ＋
                          </button>
                        </div>
                      </div>

                      <div className="card-information">
                        <h3>{getTitle(movie)}</h3>

                        <div className="card-meta">
                          <span>{getYear(movie)}</span>

                          {getRuntime(movie) && (
                            <>
                              <i></i>

                              <span>{getRuntime(movie)}</span>
                            </>
                          )}
                        </div>

                        {genres.length > 0 && (
                          <div className="card-genres">
                            {genres.map((genre) => (
                              <span key={genre}>{genre}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              {visibleCount < filteredMovies.length && (
                <div
                  className="load-more-container"
                  style={{
                    textAlign: "center",
                    marginTop: "3rem",
                  }}
                >
                  <button
                    type="button"
                    className="watch-button load-more-btn"
                    onClick={handleLoadMore}
                  >
                    Load More Titles ({filteredMovies.length - visibleCount}{" "}
                    remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-symbol">🎬</div>

              <h3>No movies found</h3>

              <p>
                Try searching for another keyword or change your category
                filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedCat("All");

                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AllMovies;
