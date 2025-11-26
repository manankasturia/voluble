import React from 'react';
import img5 from '../../assets/img5.png';
import img6 from '../../assets/img6.png';
import img7 from '../../assets/img7.png';
import img8 from '../../assets/img8.png';

const slideImages = [ 
  img5,
  img6,
  img7,
  img8,
];

const Left = ({ currentSlide }) => {
  return (
    <div className="h-screen w-[50%] flex justify-center items-center relative">
      
      {slideImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`img-${index}`}
          className={`absolute h-auto w-4/5 max-w-md transition-opacity duration-500 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

export default Left;