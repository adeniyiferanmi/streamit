import React, { useContext } from "react";
import signUpLogo from "../assets/logo.png";
import "../Styles/auth.css";
import { AuthContext } from "../Context/AuthContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../Component/Loader";

const SignUpPage = () => {
  const {
    signingup,
    signup,
    showPassword,
    showConfirmPassword,
    handlePassword,
    handleConfirmPassword,
  } = useContext(AuthContext);

  const userSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    userName: yup.string().required("User Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password do not match")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSignUp = (data) => {
    signup(data, setError);
  };
  return (
    <>
      {signingup && <Loader loading={signingup} onFinish={() => {}} />}
      <div className="sign-up-page-container">
        <div className="sign-up-page">
          <div className="logo-container">
            <img src={signUpLogo} alt="Logo" />
          </div>
          <h1>Create Your Account</h1>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-group">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="username">Username*</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="error-message">{errors.userName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                />
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
                    autoComplete="new-password"
                    {...register("password")}
                  />
                  <span onClick={handlePassword}>
                    <i
                      className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </span>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="password"
                    {...register("confirmPassword")}
                  />
                  <span onClick={handleConfirmPassword}>
                    <i
                      className={
                        showConfirmPassword ? "bi bi-eye" : "bi bi-eye-slash"
                      }
                    ></i>
                  </span>
                  {errors.confirmPassword && (
                    <p className="error-message">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="form-terms">
              <input type="checkbox" required />

              <label htmlFor="terms">
                I've read and accept the
                <a href="#">terms & conditions*</a>
              </label>
            </div>
            {errors.root && (
              <p
                className="error-message"
                style={{ textAlign: "center", marginBottom: "10px" }}
              >
                {errors.root.message}
              </p>
            )}
            <div className="form-submits">
              <button type="submit" disabled={signingup}>
                Sign Up
              </button>
            </div>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
