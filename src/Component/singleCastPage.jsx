import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TvShowContext } from "../Context/TvShowContext";
import "../Styles/singleCastPage.css";
import Footer from "../UI/Footer";
import Headers from "../UI/Headers";

const PROFILE_IMAGE = "https://image.tmdb.org/t/p/original";
const POSTER_IMAGE = "https://image.tmdb.org/t/p/w500";

const SingleCastPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cast, getCast } = useContext(TvShowContext);

  useEffect(() => {
    if (id) {
      getCast(id);
    }
  }, [id]);

  if (!cast) {
    return (
      <div className="cast-loading">
        <div className="loading-orbit">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p>Preparing profile</p>
      </div>
    );
  }

  const movies = cast.movies || [];
  const tvShows = cast.tvShows || [];

  const totalCredits = movies.length + tvShows.length;

  const department = cast.knownForDepartment || "Entertainment";

  const profession =
    department === "Acting"
      ? "Actor & Performer"
      : department === "Directing"
        ? "Director & Filmmaker"
        : department === "Writing"
          ? "Writer & Storyteller"
          : department === "Production"
            ? "Producer & Creative"
            : department;

  return (
    <>
      <Headers />

      <main className="single-cast-page">
        {/* ================= CAST FEATURE ================= */}
        <section className="cast-feature">
          <div className="cast-background">
            {cast.profilePath && (
              <img src={`${PROFILE_IMAGE}${cast.profilePath}`} alt="" />
            )}
          </div>

          <div className="cast-noise"></div>
          <div className="cast-glow"></div>
          <div className="cast-overlay"></div>

          <button className="cast-back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            <span>Back to library</span>
          </button>

          <div className="cast-side-label">
            <span>STREAM</span>
            <span>PROFILE</span>
          </div>

          <div className="cast-feature-content">
            {/* PROFILE IMAGE */}
            <div className="cast-portrait">
              <div className="image-frame">
                {cast.profilePath ? (
                  <img
                    src={`${PROFILE_IMAGE}${cast.profilePath}`}
                    alt={cast.name}
                  />
                ) : (
                  <div className="image-placeholder">
                    {cast.name?.charAt(0)}
                  </div>
                )}

                <div className="image-corner corner-one"></div>
                <div className="image-corner corner-two"></div>
              </div>

              <div className="portrait-caption">
                <span>PROFILE</span>
                <strong>{cast.name}</strong>
              </div>
            </div>

            {/* INFORMATION */}
            <div className="cast-details">
              <div className="cast-meta">
                <span className="profession-dot"></span>
                <span>{profession}</span>
              </div>

              <h1>{cast.name}</h1>

              <div className="cast-subtitle">
                <span>{department}</span>

                <i></i>

                <span>Film & Television</span>

                <i></i>

                <span>{totalCredits} Credits</span>
              </div>

              <p className="cast-bio">
                Discover the career, appearances and screen work of{" "}
                <strong>{cast.name}</strong>. Explore the movies and television
                productions connected to this profile, from memorable
                performances to the projects that have shaped their presence on
                screen.
              </p>

              <div className="cast-actions">
                <button
                  className="explore-button"
                  onClick={() =>
                    document.getElementById("filmography")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  <span>Explore Filmography</span>
                  <strong>↓</strong>
                </button>

                <button className="simple-action" onClick={() => navigate(-1)}>
                  ← Return
                </button>
              </div>

              <div className="cast-stats">
                <div className="cast-stat">
                  <span>01</span>

                  <div>
                    <small>Profession</small>
                    <strong>{department}</strong>
                  </div>
                </div>

                <div className="cast-stat">
                  <span>02</span>

                  <div>
                    <small>Movie Credits</small>
                    <strong>{movies.length}</strong>
                  </div>
                </div>

                <div className="cast-stat">
                  <span>03</span>

                  <div>
                    <small>TV Credits</small>
                    <strong>{tvShows.length}</strong>
                  </div>
                </div>

                <div className="cast-stat">
                  <span>04</span>

                  <div>
                    <small>Popularity</small>
                    <strong>
                      {cast.popularity
                        ? Number(cast.popularity).toFixed(1)
                        : "—"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cast-scroll">
            <span>SCROLL TO DISCOVER</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ================= INTRODUCTION ================= */}
        <section className="profile-introduction">
          <div className="intro-number">01</div>

          <div className="intro-main">
            <div className="section-label">ABOUT THE PROFILE</div>

            <h2>
              The work behind <span>the screen.</span>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              {cast.name} is featured on our entertainment catalog through a
              collection of movie and television credits. This profile brings
              those appearances together in one place, making it easier to
              discover the work, productions and screen projects associated with
              this performer.
            </p>

            <p>
              Browse through the filmography below to discover movies,
              television series and genres connected to {cast.name}'s career.
            </p>
          </div>
        </section>

        {/* ================= CAREER ================= */}
        <section className="career-overview">
          <div className="overview-heading">
            <div>
              <span>CAREER OVERVIEW</span>
              <h2>At a glance.</h2>
            </div>

            <p>A quick look at this profile's catalog presence.</p>
          </div>

          <div className="career-grid">
            <div className="career-card career-main">
              <span className="card-index">01</span>

              <div className="career-card-content">
                <small>PRIMARY FIELD</small>

                <h3>{cast.job || department}</h3>

                <p>{profession}</p>
              </div>

              <div className="card-symbol">✦</div>
            </div>

            <div className="career-card">
              <span className="card-index">02</span>

              <small>MOVIE APPEARANCES</small>

              <strong>{movies.length}</strong>

              <p>Feature film credits</p>
            </div>

            <div className="career-card">
              <span className="card-index">03</span>

              <small>TV APPEARANCES</small>

              <strong>{tvShows.length}</strong>

              <p>Television credits</p>
            </div>

            <div className="career-card">
              <span className="card-index">04</span>

              <small>TOTAL CREDITS</small>

              <strong>{totalCredits}</strong>

              <p>Catalog appearances</p>
            </div>
          </div>
        </section>

        {/* ================= FILMOGRAPHY ================= */}
        <section className="filmography-section" id="filmography">
          <div className="filmography-title">
            <div className="filmography-number">02</div>

            <div>
              <span>THE COMPLETE CATALOG</span>
              <h2>Filmography</h2>
            </div>
          </div>

          {/* MOVIES */}
          {movies.length > 0 && (
            <div className="filmography-category">
              <div className="category-header">
                <div>
                  <span>01 / FEATURE FILM</span>
                  <h3>Movies</h3>
                </div>

                <div className="category-total">{movies.length} titles</div>
              </div>

              <div className="filmography-grid">
                {movies.map((item) => {
                  const movie = item.movie || item;

                  return (
                    <article
                      className="film-card"
                      key={movie.id}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <div className="film-poster">
                        <img
                          src={
                            movie.posterPath
                              ? `${POSTER_IMAGE}${movie.posterPath}`
                              : "/default-movie.jpg"
                          }
                          alt={movie.title}
                        />

                        <div className="film-hover">
                          <span>WATCH DETAILS</span>
                          <strong>→</strong>
                        </div>
                      </div>

                      <div className="film-information">
                        <h4>{movie.title}</h4>

                        {movie.genres?.length > 0 && (
                          <div className="film-genres">
                            {movie.genres.slice(0, 2).map((genreItem) => (
                              <span key={genreItem.genre?.id}>
                                {genreItem.genre?.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* TV SHOWS */}
          {tvShows.length > 0 && (
            <div className="filmography-category tv-category">
              <div className="category-header">
                <div>
                  <span>02 / TELEVISION</span>
                  <h3>TV Shows</h3>
                </div>

                <div className="category-total">{tvShows.length} titles</div>
              </div>

              <div className="filmography-grid">
                {tvShows.map((item) => {
                  const show = item.tvShow || item;

                  return (
                    <article
                      className="film-card"
                      key={show.id}
                      onClick={() => navigate(`/tv/${show.id}`)}
                    >
                      <div className="film-poster">
                        <img
                          src={
                            show.posterPath
                              ? `${POSTER_IMAGE}${show.posterPath}`
                              : "/default-movie.jpg"
                          }
                          alt={show.name}
                        />

                        <div className="film-hover">
                          <span>VIEW SERIES</span>
                          <strong>→</strong>
                        </div>
                      </div>

                      <div className="film-information">
                        <h4>{show.name}</h4>

                        {show.genres?.length > 0 && (
                          <div className="film-genres">
                            {show.genres.slice(0, 2).map((genreItem) => (
                              <span key={genreItem.genre?.id}>
                                {genreItem.genre?.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* ================= END ================= */}
        <section className="cast-end">
          <div className="end-decoration">✦</div>

          <span>END OF PROFILE</span>

          <h2>Keep exploring.</h2>

          <p>
            There is always another story waiting to be discovered. Continue
            exploring movies, television and the people who bring them to life.
          </p>

          <button onClick={() => navigate(-1)}>
            Explore More <span>→</span>
          </button>
        </section>

        {/* ================= EMPTY ================= */}
        {movies.length === 0 && tvShows.length === 0 && (
          <section className="cast-empty-state">
            <span>NO CREDITS AVAILABLE</span>

            <h2>Filmography coming soon</h2>

            <p>
              There are currently no movie or television credits available for
              this profile.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default SingleCastPage;
