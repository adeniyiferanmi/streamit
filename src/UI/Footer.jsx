import React from "react";
import "../Styles/footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand & Bio */}
        <div className="footer-col brand-col">
          <img src={logo} alt="" className="footer-logo" />

          <p className="footer-text">
            Your destination for endless entertainment. Stream popular movies,
            trending TV shows, and original series anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#movies">Movies</a>
            </li>
            <li>
              <a href="#tvshows">TV Shows</a>
            </li>
            <li>
              <a href="#genres">Genres</a>
            </li>
          </ul>
        </div>

        {/* Account / Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>
              <a href="#account">My Account</a>
            </li>
            <li>
              <a href="#faq">Help Center</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Stay Connected</h4>
          <p className="footer-text">
            Subscribe to receive updates on new releases.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StreamIt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
