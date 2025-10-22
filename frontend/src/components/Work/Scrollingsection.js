import React, { useState, useEffect, useRef } from 'react';
import Left from './Left';
import Right from './Right';

const NUM_SLIDES = 4;
const SCROLL_HEIGHT = `${NUM_SLIDES * 100}vh`;

const Scrollingsection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { top, height } = scrollRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      let progress = (-top) / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));

      let slideIndex = Math.floor(progress * NUM_SLIDES);
      if (slideIndex === NUM_SLIDES) {
        slideIndex = NUM_SLIDES - 1;
      }

      setCurrentSlide(slideIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={scrollRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        

        <svg
          className="absolute top-0 left-0 w-full h-full -z-10" 
          style={{ height: '105vh' }} 
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
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              ></feColorMatrix>
              <feOffset dy="-5"></feOffset>
              <feGaussianBlur stdDeviation="10"></feGaussianBlur>
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
              <feColorMatrix values="0 0 0 0 0.553024 0 0 0 0 0.599289 0 0 0 0 0.640413 0 0 0 0.1 0"></feColorMatrix>
              <feBlend in2="shape" result="effect1_innerShadow_4512_10209"></feBlend>
            </filter>
          </defs>
        </svg>


        <Left currentSlide={currentSlide} />
        <Right currentSlide={currentSlide} />

      </div>
    </div>
  );
}

export default Scrollingsection;