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
        
        {/* === THIS IS THE ONLY CHANGE === */}
        {/* Pass the prop to Left, just like we do for Right */}
        <Left currentSlide={currentSlide} />
        
        <Right currentSlide={currentSlide} />
      </div>
    </div>
  );
}

export default Scrollingsection;