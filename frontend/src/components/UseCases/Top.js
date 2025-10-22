import React from "react";

const Top = () => {
  return (
    <div className="w-full h-80% pt-[10%] flex flex-col justify-center items-center">
      <h1 className="text-indigo-900 text-7xl font-bold">Use Cases</h1>
      <h2 className="text-sky-900 text-2xl px-[20%] text-center font-[Roboto] mt-4">
        From the boardroom to the classroom, Voluble is your personal AI coach
        for clear, confident, and compelling communication.
      </h2>
      <p className="text-gray-600 text-lg mt-6 px-20">
        We all have to speak—in meetings, in interviews, on a stage, or just in
        daily conversation. Voluble analyzes your speech in real-time, giving
        you the instant feedback you need to eliminate filler words, master your
        pacing, and deliver your message with impact. See how it can work for
        you.
      </p>
    </div>
  );
};

export default Top;
