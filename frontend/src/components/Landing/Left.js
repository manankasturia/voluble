import React from "react";
import { RotateWords } from "../templates/rotate-words.js";

const Left = () => {
  return (
    <div className=" h-full w-[60%] flex flex-col justify-center items-center pl-12">
      <h1 className="text-black text-8xl font-bold">
        Your AI Feedback Partner in:
      </h1>
      <RotateWords words={["interview", "presentations", "speaking"]} />
      <p className=" pr-20 mt-10 text-xl">
        Poised is your AI communication coach, offering real-time feedback to
        help you speak confidently during calls. Get personalized suggestions
        and actionable insights. Your progress is tracked privately, just for
        you.
      </p>

      <button
        className="self-start bg-blue-500 w-[300px] text-white px-3 py-3 my-10 rounded-lg font-bold text-lg flex justify-center items-center
    hover:bg-indigo-600 hover:text-white transition duration-300 text-2xl"
      >
        Try Voluble for Free
      </button>
    </div>
  );
};

export default Left;
