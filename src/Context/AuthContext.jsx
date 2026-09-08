import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [singingup, setSigningUp] = useState(false);
  const [loginingIn, setLoginingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const signup = async (data, setError) => {
    setSigningUp(true);
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      if (res.ok) {
        navigate("/login");
      }
      if (!res.ok) {
        setError("root", {
          type: "manual",
          message: response.message || "Something went wrong",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setSigningUp(false);
    }
  };
  const login = async (data, setError) => {
    setLoginingIn(true);
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      if (res.ok) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }
      if (!res.ok) {
        setError("root", {
          type: "manual",
          message: response.message || "Something went wrong",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoginingIn(false);
    }
  };
  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserData(null);
      return false;
    }

    try {
      const isAuth = await fetch(`${baseUrl}/auth/verifyToken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await isAuth.json();
      console.log(response);

      if (isAuth.ok) {
        setUserData(response.data);
        return true;
      }
      setUserData(null);
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (req, res) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        localStorage.removeItem("token");

        setUserData(null);

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    signup,
    login,
    handleConfirmPassword,
    handlePassword,
    isAuthenticated,
    logout,
    showPassword,
    showConfirmPassword,
    singingup,
    loginingIn,
    userData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
