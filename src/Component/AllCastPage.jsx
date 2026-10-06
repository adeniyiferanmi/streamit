import React, { useContext, useEffect, useMemo, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import "../Styles/allCastPage.css";
import Headers from "../UI/Headers";
import { useNavigate } from "react-router-dom";

const TABS = [
  { label: "All", value: null },
  { label: "Actors", value: "Acting" },
  { label: "Directors", value: "Directing" },
  { label: "Producers", value: "Production" },
  { label: "Writers", value: "Writing" },
  { label: "Sound", value: "Sound" },
  { label: "Crew", value: "Crew" },
  { label: "Production", value: "Production" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TMDB_IMG = "https://image.tmdb.org/t/p/original";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AllCastPage = () => {
  const { getAllCasts, casts } = useContext(MovieContext);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCasts();
  }, []);
  const navigate = useNavigate();
  const list = Array.isArray(casts) ? casts : [];

  const filtered = list.filter((person) => {
    const matchesTab = !activeTab.value || person.job === activeTab.value;
    const matchesSearch = person.name
      ?.toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Group alphabetically by first letter of name
  const grouped = useMemo(() => {
    const map = {};
    [...filtered]
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
      .forEach((person) => {
        const letter = (person.name?.[0] || "#").toUpperCase();
        const key = ALPHABET.includes(letter) ? letter : "#";
        if (!map[key]) map[key] = [];
        map[key].push(person);
      });
    return map;
  }, [filtered]);

  const availableLetters = Object.keys(grouped);

  const scrollToLetter = (letter) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="directory-page">
      <Headers />

      {/* Toolbar */}
      <div className="directory-toolbar">
        <div className="directory-heading">
          <h1>Cast &amp; Crew</h1>
          <span className="directory-count">
            {filtered.length} of {list.length}
          </span>
        </div>

        <div className="directory-filters">
          <div className="directory-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab)}
                className={`chip ${activeTab.label === tab.label ? "chip-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find someone..."
            className="directory-search"
          />
        </div>
      </div>

      <div className="directory-body">
        {/* A–Z jump rail */}
        <nav className="az-rail">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              disabled={!availableLetters.includes(letter)}
              className="az-letter"
            >
              {letter}
            </button>
          ))}
        </nav>

        {/* Listing */}
        <div className="directory-list">
          {list.length === 0 && (
            <div className="directory-loading">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="row-skeleton" />
              ))}
            </div>
          )}

          {list.length > 0 && filtered.length === 0 && (
            <p className="directory-empty">No one matches that search.</p>
          )}

          {availableLetters.map((letter) => (
            <section
              key={letter}
              id={`letter-${letter}`}
              className="letter-section"
            >
              <h2 className="letter-heading">{letter}</h2>
              <div className="letter-group">
                {grouped[letter].map((person) => (
                  <div
                    key={person.id}
                    className="person-row"
                    onClick={() => navigate(`/cast/${person.id}`)}
                  >
                    <div className="person-avatar">
                      {person.profilePath ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${person.profilePath}`}
                          alt={person.name}
                        />
                      ) : (
                        <span>{getInitials(person.name)}</span>
                      )}
                    </div>

                    <div className="person-info">
                      <span className="person-name">{person.name}</span>
                      <span className="person-meta">
                        {person.known_for_department}
                        {person.movies?.length != null &&
                          ` · ${person.movies.length} title${
                            person.movies.length === 1 ? "" : "s"
                          }`}
                      </span>
                    </div>

                    <span className="person-arrow">›</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCastPage;
