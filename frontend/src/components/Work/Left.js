import React from 'react';

// --- Define the content for all 4 slides ---
// I found the other images from the yoodli.ai site
const slideImages = [
  'https://yoodli.ai/assets/yoodli-HIW1.webp', // Slide 0
  'https://yoodli.ai/assets/yoodli-HIW2.webp', // Slide 1
  'https://yoodli.ai/assets/yoodli-HIW3.webp', // Slide 2
  'https://yoodli.ai/assets/yoodli-HIW4.webp', // Slide 3
];

// We accept the `currentSlide` prop
const Left = ({ currentSlide }) => {
  return (
    // 1. Change to `relative` to allow stacking the images
    <div className="h-screen w-[50%] flex justify-center items-center relative">
      
      {/* 2. Map over the images */}
      {slideImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`img-${index}`}
          // 3. Stack all images on top of each other
          className={`absolute h-auto w-4/5 max-w-md transition-opacity duration-500 ease-in-out ${
            // 4. Show the active one, hide the others
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

export default Left;