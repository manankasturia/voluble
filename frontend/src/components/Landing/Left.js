import React from "react";
import { RotateWords } from "../templates/rotate-words.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Left = () => {
  const navigate = useNavigate();
  const { user, initializing } = useAuth();

  return (
    <div className=" h-full w-[60%] flex flex-col justify-center items-center pl-12">
      <h1 className="text-black text-7xl font-bold">
        Speak with confidence in every:
      </h1>
      <RotateWords words={["Interview", "Presentation", "Meeting"]} />
      <p className=" pr-20 mt-10 text-xl">
        Meet Voluble, your personal AI communication partner. It provides
        instant, private feedback during your live calls and presentations. Stop
        guessing and start improving with actionable insights on your pacing,
        filler words, and tone. Voluble helps you sound clear, confident, and
        compelling—all for your eyes only.
      </p>

      <button
        onClick={() =>
          initializing
            ? null
            : user
            ? navigate("/dashboard")
            : navigate("/signup")
        }
        className="self-start bg-blue-500 w-[300px] text-white px-3 py-3 my-10 rounded-lg font-bold text-lg flex justify-center items-center
    hover:bg-indigo-600 hover:text-white transition duration-300 text-2xl"
      >
        Try Voluble for Free
      </button>
    </div>
  );
};

export default Left;
