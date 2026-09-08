import React, { createContext, useState } from "react";

export const TvShowContext = createContext();
const TvShowProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [popularShows, setPopularShows] = useState([]);
  const [popularTopShows, setPopularTopShows] = useState([]);
  const [trendingTopShows, setTrendingTopShows] = useState([]);
  const [allShows, setAllShows] = useState([]);

  const getPopularTvShows = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/tvshow/popular-series`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);

      if (res.ok) {
        setPopularShows(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTopTvShows = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/tvshow/popular-shows`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);

      if (res.ok) {
        setPopularTopShows(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingTvShows = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/tvshow/trending-shows`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);
      if (res.ok) {
        setTrendingTopShows(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTvShows = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/tvshow/all-shows`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      console.log(response);

      if (res.ok) {
        setAllShows(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    getPopularTvShows,
    getTopTvShows,
    getTrendingTvShows,
    getAllTvShows,
    popularShows,
    popularTopShows,
    trendingTopShows,
    allShows,
  };
  return (
    <TvShowContext.Provider value={value}>{children}</TvShowContext.Provider>
  );
};

export default TvShowProvider;
