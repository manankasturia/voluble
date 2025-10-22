import React from 'react';

const slideContent = [
  { 
    id: 0, 
    content: (
      <>
        <h1 className="font-bold text-3xl">Start Your Session</h1>
        <p className="text-2xl text-gray-600 mt-3">One click to activate your real-time coach.</p>
      </>
    )
  },
  { 
    id: 1, 
    content: (
      <>
        <h1 className="font-bold text-3xl">Speak Your Mind</h1>
        <p className="text-2xl text-gray-600 mt-3">The app privately transcribes and analyzes as you go.</p>
      </>
    ) 
  },
  { 
    id: 2, 
    content: (
      <>
        <h1 className="font-bold text-3xl">Get Live Feedback</h1>
        <p className="text-2xl text-gray-600 mt-3">Instantly see your Pacing, Filler Words, and Confidence.</p>
      </>
    )
  },
  { 
    id: 3, 
    content: (
      <>
        <h1 className="font-bold text-3xl">Make Real-Time Adjustments</h1>
        <p className="text-2xl text-gray-600 mt-3">Use the discreet dashboard to perfect your delivery on the fly.</p>
      </>
    )
  },
];


const Right = ({ currentSlide }) => {
  return (

    <div className="h-screen w-[50%] relative overflow-visible">
      
      <div className="absolute top-1/2 -mt-40 -left-10 w-4/5 flex items-center space-x-2 px-10">
        {slideContent.map((_, index) => (
          <div
            key={`bar-${index}`}

            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>



      {slideContent.map((slide, index) => {
        
        const position = index - currentSlide;
        
        let topClass = '';
        let opacityClass = 'opacity-0';

        if (position === 0) {
          topClass = 'top-1/2 -translate-y-1/2';
          opacityClass = 'opacity-100';
        } else if (position < 0) {
          topClass = 'top-[-50%] -translate-y-1/2';
          opacityClass = 'opacity-0';
        } else {
          topClass = 'top-[150%] -translate-y-1/2';
          opacityClass = 'opacity-0';
        }

        return (
          <div 
            key={slide.id}
            className={`absolute -left-10 flex flex-col justify-center items-start bg-white h-auto p-10 rounded-lg w-4/5 shadow-lg transition-all duration-500 ease-in-out ${topClass} ${opacityClass}`}
          >
            {slide.content}
          </div>
        );
      })}

      <div 
        className={`absolute bottom-32 -left-10 w-4/5 transition-opacity duration-500 ease-in-out ${
          currentSlide === slideContent.length - 1 
            ? 'opacity-100' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <button className=" bg-blue-300 text-indigo-900 border-black font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-blue-700  hover:text-white transition-colors text-lg">
          Try Voluble Now
        </button>
      </div>

    </div>
  );
}

export default Right;