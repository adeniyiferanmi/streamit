import React, { useState, useEffect, useContext, useMemo } from "react";
import "../Styles/allMovies.css";
import Footer from "../UI/Footer";
import Headers from "../UI/Headers";
import { TvShowContext } from "../Context/TvShowContext";
import Loader from "../Component/Loader";

const PAGE_SIZE = 15;

const AllShowsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const {
    getPopularTvShows,
    getTopTvShows,
    getTrendingTvShows,
    getAllTvShows,
    popularShows,
    popularTopShows,
    trendingTopShows,
    allShows,
  } = useContext(TvShowContext);

  const categories = ["All", "Popular_Show", "Trending_Show"];

  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);

        const fetchPromises = [];

        if (getAllTvShows) fetchPromises.push(getAllTvShows());
        if (getTrendingTvShows) fetchPromises.push(getTrendingTvShows());
        if (getTopTvShows) fetchPromises.push(getTopTvShows());

        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error loading TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCat, searchTerm]);

  const getTitle = (show) => {
    return show?.name || show?.title || "Untitled Show";
  };

  const getPoster = (show) => {
    const poster = show?.posterPath || show?.poster_path || show?.poster;

    if (!poster) {
      return "https://via.placeholder.com/500x750?text=No+Poster";
    }

    if (poster.startsWith("http")) {
      return poster;
    }

    return `https://image.tmdb.org/t/p/w500${poster}`;
  };

  const getBackdrop = (show) => {
    const backdrop =
      show?.backdropPath || show?.backdrop_path || show?.backdrop;

    if (!backdrop) {
      return getPoster(show);
    }

    if (backdrop.startsWith("http")) {
      return backdrop;
    }

    return `https://image.tmdb.org/t/p/original${backdrop}`;
  };

  const getYear = (show) => {
    const date =
      show?.firstAirDate ||
      show?.first_air_date ||
      show?.releaseDate ||
      show?.release_date;

    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.getFullYear();
  };

  const getRating = (show) => {
    const rating = show?.voteAverage ?? show?.vote_average ?? show?.rating;

    if (rating === undefined || rating === null || rating === "") {
      return "N/A";
    }

    const value = Number(rating);

    return Number.isNaN(value) ? "N/A" : value.toFixed(1);
  };

  const getRuntime = (show) => {
    const runtime =
      show?.episodeRunTime?.[0] ?? show?.runtime ?? show?.duration;

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

  const getGenres = (show) => {
    const list = show?.categories || show?.genres;

    if (!Array.isArray(list)) {
      return [];
    }

    return list
      .map((item) => {
        if (item?.category?.name) return item.category.name;
        if (item?.genre?.name) return item.genre.name;
        if (typeof item?.categories === "string") return item.categories;
        if (item?.name) return item.name;
        if (typeof item === "string") return item;
        return null;
      })
      .filter(Boolean)
      .slice(0, 3);
  };

  const filteredShows = useMemo(() => {
    let targetList = Array.isArray(allShows) ? allShows : [];

    if (
      selectedCat === "Popular_Show" &&
      Array.isArray(popularTopShows) &&
      popularTopShows.length > 0
    ) {
      targetList = popularTopShows;
    } else if (
      selectedCat === "Trending_Show" &&
      Array.isArray(trendingTopShows) &&
      trendingTopShows.length > 0
    ) {
      targetList = trendingTopShows;
    }

    return targetList.filter((show) => {
      const genres = getGenres(show);

      const matchesCategoryTag =
        selectedCat === "All" ||
        genres.some(
          (g) =>
            g.toLowerCase() === selectedCat.replace("_Show", "").toLowerCase(),
        ) ||
        show?.category?.toLowerCase() === selectedCat.toLowerCase();

      const title = getTitle(show);

      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        (selectedCat === "All" ||
          matchesCategoryTag ||
          targetList !== allShows) &&
        matchesSearch
      );
    });
  }, [allShows, popularShows, trendingTopShows, selectedCat, searchTerm]);

  const displayedShows = useMemo(() => {
    return filteredShows.slice(0, visibleCount);
  }, [filteredShows, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const heroMovies = useMemo(() => {
    const pool =
      Array.isArray(trendingTopShows) && trendingTopShows.length > 0
        ? trendingTopShows
        : allShows;

    if (!Array.isArray(pool)) {
      return [];
    }

    return pool.filter(Boolean).slice(2, 6);
  }, [trendingTopShows, allShows]);

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
                THE COMPLETE TV COLLECTION
              </div>

              <h1>
                Every Episode.
                <br />
                <em>One Collection.</em>
              </h1>

              <p>
                Explore our entire TV show universe from binge-worthy drama
                series and trending hit shows to timeless classics.
              </p>

              <div className="catalog-hero-stats">
                <div>
                  <strong>{allShows?.length || 0}</strong>
                  <span>SHOWS</span>
                </div>

                <div className="hero-stat-line"></div>

                <div>
                  <strong>4K</strong>
                  <span>ULTRA HD</span>
                </div>

                <div className="hero-stat-line"></div>

                <div>
                  <strong>∞</strong>
                  <span>EPISODES</span>
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
              {heroMovies.map((show, index) => (
                <div
                  className={`hero-poster hero-poster-${index + 1}`}
                  key={show.id || show.tmdb_id || index}
                >
                  <img src={getPoster(show)} alt={getTitle(show)} />
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
              SHOWING <strong>{displayedShows.length}</strong> OF{" "}
              <strong>{filteredShows.length}</strong>
            </div>
          </div>

          {displayedShows.length > 0 ? (
            <>
              <div className="premium-movie-grid">
                {displayedShows.map((show, index) => {
                  const genres = getGenres(show);

                  return (
                    <article
                      key={show.id || show.tmdb_id || index}
                      className="premium-movie-card"
                    >
                      <div className="card-image">
                        <img src={getPoster(show)} alt={getTitle(show)} />

                        <span className="card-rank">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="card-rating">
                          <span>★</span>
                          {getRating(show)}
                        </div>

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
                        <h3>{getTitle(show)}</h3>

                        <div className="card-meta">
                          <span>{getYear(show)}</span>

                          {getRuntime(show) && (
                            <>
                              <i></i>
                              <span>{getRuntime(show)}</span>
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

              {visibleCount < filteredShows.length && (
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
                    Load More Titles ({filteredShows.length - visibleCount}{" "}
                    remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-symbol">🎬</div>

              <h3>No shows found</h3>

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

export default AllShowsPage;
