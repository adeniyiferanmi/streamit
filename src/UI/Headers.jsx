import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import "../Styles/header.css";
import { AuthContext } from "../Context/AuthContext";

const Headers = () => {
  const { userData, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header-contain">
      <div className="header-container">
        <a href="/dashboard">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </a>
        <div className="list">
          <ul>
            <a href="/dashboard">
              <li>Home</li>
            </a>
            <a href="/genre">
              <li>Genres</li>
            </a>
            <a href="/all-movies">
              <li>Movies</li>
            </a>
            <a href="/all-shows">
              <li>Shows</li>
            </a>
            <a href="">
              <li>Cast</li>
            </a>
          </ul>
        </div>
        <div className="last">
          <div className="search-box">
            <input type="text" placeholder="Search movies, series..." />

            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
          {userData ? (
            <div className="profile">
              <div className="profile-avatar" onClick={handleClick}>
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
                    `${userData.firstName} ${userData.lastName}`,
                  )}`}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
              </div>
              {open && (
                <div className="dropdown">
                  <div className="profile-dropdown">
                    <div className="profile-avatars">
                      <img
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
                          `${userData.firstName} ${userData.lastName}`,
                        )}`}
                        alt={`${userData.firstName} ${userData.lastName}`}
                      />
                    </div>
                    <p>
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                  <a href="">
                    <div className="pro">
                      <i class="bi bi-person"></i>
                      <p>Profile</p>
                    </div>
                  </a>
                  <a href="">
                    <div className="pro">
                      <i class="bi bi-plus"></i>
                      <p>Watch List</p>
                    </div>
                  </a>
                  <a href="">
                    <div className="pro">
                      <i class="bi bi-music-note-list"></i>
                      <p>Playlist</p>
                    </div>
                  </a>
                  <a href="">
                    <div className="pro">
                      <i class="bi bi-bell"></i>
                      <p>Notification</p>
                    </div>
                  </a>
                  <button onClick={handleLogout}>
                    <i class="bi bi-box-arrow-right"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="profile" onClick={handleClick}>
              <div className="guest-profile">
                <i className="bi bi-person"></i>
              </div>
              {open && (
                <div className="dropdowns">
                  <a href="/signup">
                    <div className="pro">
                      <i className="bi bi-person-plus"></i>
                      <p>REGISTER</p>
                    </div>
                  </a>
                  <a href="/login">
                    <div className="pro">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <p>LOG IN</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headers;
