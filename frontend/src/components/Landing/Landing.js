import React from "react";
import Left from "./Left.js";
import Right from "./Right.js";
import Navbar from "../Navbar/Navbar.js";
import Tagline from "../Benefits/Tagline.js";
import Card from "../Benefits/Card.js";
import Benefits from "../Benefits/Benefits.js";
import Work from "../Work/Work.js";
import Footer from "../Footer/Footer.js";
const Landing = () => {
  return (
    <>
      <div className="w-full h-screen ">
        <svg
          className="absolute top-0 left-0 w-full h-screen -z-10"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "105vh" }}
          fill="none"
          viewBox="0 0 1280 643"
          preserveAspectRatio="none"
        >
          <g filter="url(#lp-hero-bg_svg__a)">
            <path
              fill="#F6F8FF"
              d="M1279.5 546.051s-125.75 96.547-626.142 96.547C152.962 642.598 0 541.77 0 541.77V-943.057h1280z"
            ></path>
          </g>
          <defs>
            <filter
              id="lp-hero-bg_svg__a"
              width="1280"
              height="1590.65"
              x="0"
              y="-948.057"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              ></feColorMatrix>
              <feOffset dy="-5"></feOffset>
              <feGaussianBlur stdDeviation="10"></feGaussianBlur>
              <feComposite
                in2="hardAlpha"
                k2="-1"
                k3="1"
                operator="arithmetic"
              ></feComposite>
              <feColorMatrix values="0 0 0 0 0.553024 0 0 0 0 0.599289 0 0 0 0 0.640413 0 0 0 0.1 0"></feColorMatrix>
              <feBlend
                in2="shape"
                result="effect1_innerShadow_4512_10209"
              ></feBlend>
            </filter>
          </defs>
        </svg>
        <Navbar />
        <div className="flex  items-center h-[90%] w-full">
          <Left />
          <Right />
        </div>
      </div>

      <Tagline />
      <Benefits />
      <Work />
      <Footer />
    </>
  );
};

export default Landing;
