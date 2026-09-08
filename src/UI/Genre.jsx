import React, { useState } from "react";
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

const Genre = () => {
  const [genreSlide, setGenreSlide] = useState(0);
  const visibleCount = 5;

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
    { id: 17, name: "Sci-Fi", image: sciFiImg },
    { id: 14, name: "War", image: warImg },
    { id: 21, name: "News", image: newsImg },
    { id: 7, name: "Family", image: familyImg },
    { id: 15, name: "Music", image: musicImg },
    { id: 9, name: "Thriller", image: trillerImg },
    { id: 18, name: "Western", image: westernImg },
    { id: 127, name: "Kids", image: kidsImg },
  ];

  const nextGenreSlider = () => {
    setGenreSlide((prev) =>
      prev + 1 >= GENRES_LIST.length - visibleCount + 1 ? 0 : prev + 1,
    );
  };
  const previousGenreSlider = () => {
    setGenreSlide((prev) =>
      prev === 0 ? Math.max(GENRES_LIST.length - visibleCount, 0) : prev - 1,
    );
  };
  return (
    <section className="genres-section">
      <div className="genres-header">
        <h2>Movie Genres</h2>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="genres-slider-wrapper">
        <button
          className="genre-arrow left"
          onClick={previousGenreSlider}
          type="button"
        >
          ‹
        </button>

        <div className="genres-grid">
          {GENRES_LIST.slice(genreSlide, genreSlide + visibleCount).map(
            (genre) => (
              <div className="genre-card" key={genre.id}>
                <img src={genre.image} alt={genre.name} />
                <div className="genre-card-overlay">
                  <h3 className="genre-title">{genre.name}</h3>
                </div>
              </div>
            ),
          )}
        </div>

        <button
          className="genre-arrow right"
          onClick={nextGenreSlider}
          type="button"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Genre;
