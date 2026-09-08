import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Component/SignUpPage";
import LoginPage from "./Component/LoginPage";
import AuthProvider from "./Context/AuthContext";
import { Toaster } from "sonner";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import DashboardPage from "./Component/DashboardPage";
import Loader from "./Component/Loader";
import HomePage from "./Component/HomePage";
import MovieProvider from "./Context/MovieContext";
import TvShowProvider from "./Context/TvShowContext";
import GenrePage from "./Component/GenrePage";
import AllMovies from "./Component/AllMovies";
import AllShowsPage from "./Component/allShowsPage";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  return (
    <>
      {loading && (
        <Loader loading={loading} onFinish={() => setLoading(false)} />
      )}
      <BrowserRouter>
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#EEE9E1",
              border: "1px solid #E8B84B",
              color: "#2E2939",
              fontFamily: "serif",
              borderRadius: "12px",
              padding: "16px",
            },
            classNames: {
              title: "font-bold text-[1rem]",
              description: "text-[0.85rem] text-[#00000080]",
            },
          }}
        />
        <AuthProvider>
          <MovieProvider>
            <TvShowProvider>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/genre" element={<GenrePage />} />
                  <Route path="/all-movies" element={<AllMovies />} />
                  <Route path="/all-shows" element={<AllShowsPage />} />
                </Route>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </TvShowProvider>
          </MovieProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
