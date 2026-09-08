import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Component/Loader";

const ProtectedRoutes = () => {
  const [checking, setChecking] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getToken = async () => {
      try {
        const isAuth = await isAuthenticated();
        if (!isAuth) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setChecking(false);
      }
    };
    getToken();
  }, []);
  if (checking) {
    return <Loader loading={checking} onFinish={() => setChecking(false)} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
