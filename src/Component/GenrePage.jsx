import React, { useContext, useEffect } from "react";
import Genre from "../UI/genre";

import actionImg from "../assets/action.webp";
import adventureImg from "../assets/adventure.webp";
import animationImg from "../assets/animation.webp";
import crimeImg from "../assets/crime.webp";
import horrorImg from "../assets/horror.webp";
import mysteryImg from "../assets/mystery.webp";
import fantasyImg from "../assets/user6.jpg";
import romanceImg from "../assets/s3e4-legacy-of-the-sea.webp";
import sciFiImg from "../assets/kali-portrait.webp";
import dramaImg from "../assets/images (1).jpg";
import comedyImg from "../assets/images (2).jpg";
import documentaryImg from "../assets/images.jpg";
import familyImg from "../assets/family.jpg";
import warImg from "../assets/war.jpg";
import kidsImg from "../assets/kids.jpg";
import newsImg from "../assets/news.jpg";
import historyImg from "../assets/history.jpg";
import westernImg from "../assets/western.jpg";
import musicImg from "../assets/images (3).jpg";
import trillerImg from "../assets/thriller.jpg";

import Headers from "../UI/Headers";
import Footer from "../UI/Footer";
import "../Styles/genre.css";
import { MovieContext } from "../Context/MovieContext";

const GenrePage = () => {
  const { genres, getGenresCount } = useContext(MovieContext);
  const GENRES_LIST = [
    { id: 1, name: "Action", image: actionImg },
    { id: 8, name: "Adventure", image: adventureImg },
    { id: 6, name: "Animation", image: animationImg },
    { id: 10, name: "Crime", image: crimeImg },
    { id: 11, name: "Horror", image: horrorImg },
    { id: 12, name: "Mystery", image: mysteryImg },
    { id: 5, name: "Fantasy", image: fantasyImg },
    { id: 2, name: "Romance", image: romanceImg },
    { id: 4, name: "Comedy", image: comedyImg },
    { id: 99, name: "Documentary", image: documentaryImg },
    { id: 3, name: "Drama", image: dramaImg },
    { id: 17, name: "Science Fiction", image: sciFiImg },
    { id: 14, name: "War", image: warImg },
    { id: 21, name: "News", image: newsImg },
    { id: 7, name: "Family", image: familyImg },
    { id: 15, name: "Music", image: musicImg },
    { id: 9, name: "Thriller", image: trillerImg },
    { id: 18, name: "Western", image: westernImg },
    { id: 127, name: "Kids", image: kidsImg },
  ];

  useEffect(() => {
    getGenresCount();
  }, []);

  return (
    <div className="genre-page">
      <Headers />

      <main>
        <section className="genre-hero">
          <div className="genre-hero-content">
            <div className="genre-breadcrumb">
              <span>Home</span>
              <span>›</span>
              <span>Genres</span>
            </div>

            <div className="genre-hero-text">
              <h1>
                DISCOVER.
                <br />
                EXPLORE.
                <br />
                <span>BINGE.</span>
              </h1>

              <p>
                Find movies and shows across all genres.
                <br />
                Your next favorite is here.
              </p>

              <button className="genre-hero-button">
                Explore Movies
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="genre-showcase">
            <div className="genre-showcase-card card-one">
              <img src={actionImg} alt="Action" />
              <span>ACTION</span>
            </div>

            <div className="genre-showcase-card card-two">
              <img src={adventureImg} alt="Adventure" />
              <span>ADVENTURE</span>
            </div>

            <div className="genre-showcase-card card-three">
              <img src={mysteryImg} alt="Thriller" />
              <span>THRILLER</span>
            </div>

            <div className="genre-showcase-card card-four">
              <img src={sciFiImg} alt="Sci-Fi" />
              <span>SCI-FI</span>
            </div>

            <div className="genre-showcase-card card-five">
              <img src={animationImg} alt="Fantasy" />
              <span>Animation</span>
            </div>

            <div className="genre-glow"></div>
          </div>
        </section>

        <section className="genre-section">
          <div className="genre-header">
            <div>
              <span className="section-label">BROWSE BY CATEGORY</span>

              <h2>Movie Genres</h2>
            </div>

            <p>Pick a genre and start watching.</p>
          </div>

          <div className="genre-grid">
            {GENRES_LIST.map((genre, index) => {
              const backendGenre = genres?.find(
                (item) => item.name.toLowerCase() === genre.name.toLowerCase(),
              );

              return (
                <div className="genres-card" key={genre.id}>
                  <img src={genre.image} alt={genre.name} />

                  <div className="genres-card-overlay"></div>

                  <div className="genres-card-content">
                    <div>
                      <h3>{genre.name}</h3>

                      <p>{backendGenre?.movieCount || 0} Movies</p>
                    </div>

                    <span className="genre-arrow">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GenrePage;
