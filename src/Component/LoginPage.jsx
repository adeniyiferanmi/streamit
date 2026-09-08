import React, { useContext } from "react";
import signUpLogo from "../assets/logo.png";
import "../Styles/auth.css";
import { AuthContext } from "../Context/AuthContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../Component/Loader";

const LoginPage = () => {
  const { loginingIn, login, showPassword, handlePassword } =
    useContext(AuthContext);
  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLoginSubmit = (data) => {
    login(data, setError);
  };
  return (
    <>
      {loginingIn && <Loader loading={loginingIn} onFinish={() => {}} />}
      <div className="sign-up-page-containers">
        <div className="sign-up-pages">
          <div className="logo-container">
            <img src={signUpLogo} alt="Logo" />
          </div>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="form-groups">
              <div>
                <label htmlFor="email">Email*</label>
                <input type="email" {...register("email")} />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password*</label>
                <div className="password-container">
                  <input
                    className="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <span onClick={handlePassword}>
                    <i
                      className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            {errors.password && (
              <p className="error-message" style={{ textAlign: "center" }}>
                {errors.password.message}
              </p>
            )}
            {errors.root && (
              <p
                className="error-message"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                {errors.root.message}
              </p>
            )}
            <div className="form-submit">
              <button type="submit" disabled={loginingIn}>
                Log In
              </button>
            </div>
          </form>
          <div className="login-link">
            <p>
              If You are new? <a href="/signup">Sign Up</a>
            </p>
          </div>
          <div className="or-separator">
            <p>OR</p>
          </div>
          <button class="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
