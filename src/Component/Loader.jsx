import React, { useEffect, useState } from "react";
import "../Styles/loader.css";
import imageLoader from "../assets/loader.gif";

const Loader = ({ onFinish, loading }) => {
  return (
    <div className="preloader">
      <div className="image">
        <img src={imageLoader} alt="" />
      </div>
    </div>
  );
};

export default Loader;
