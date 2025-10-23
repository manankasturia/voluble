import React from 'react';
const slideImages = [
  'https://yoodli.ai/assets/yoodli-HIW1.webp', 
  'https://yoodli.ai/assets/yoodli-HIW2.webp', 
  'https://yoodli.ai/assets/yoodli-HIW3.webp', 
  'https://yoodli.ai/assets/yoodli-HIW4.webp',
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