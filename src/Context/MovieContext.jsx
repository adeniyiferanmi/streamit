import { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [casts, setCasts] = useState([]);
  const [genres, setgenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const getPopularMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/popular-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setMovies(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTrendingMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/trending-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setTrendingMovies(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTopTenMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/topTen`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);
      if (res.ok) {
        setTopMovies(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTopRatedMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/topRated-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setTopRatedMovies(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUpcomingMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/upcoming-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setUpcomingMovies(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCasts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/casts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);
      if (res.ok) {
        setCasts(response.data);
      }
    } catch (error) {}
  };
  const getGenresCount = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/genre`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);

      if (res.ok) {
        setgenres(response.genres);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/movie/all-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setAllMovies(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    getPopularMovies,
    getTrendingMovies,
    getTopTenMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getAllCasts,
    getGenresCount,
    getAllMovies,
    movies,
    trendingMovies,
    topMovies,
    topRatedMovies,
    upcomingMovies,
    casts,
    genres,
    allMovies,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
