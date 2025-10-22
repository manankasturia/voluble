import React from "react";
import Card from "./Card";

const Bottom = () => {
  const useCases = [
    {
      id: 1,
      title: "For Professionals & Teams",
      description:
        "Stop wondering if your message landed. Practice your client pitches, quarterly reviews, and team updates with Voluble. Our real-time pacing gauge ensures you're clear and not rushed, while the filler-word counter helps you sound polished and authoritative.",
      bg_color: "bg-teal-100",
    },
    {
      id: 2,
      title: "For Job Seekers",
      description:
        "In a competitive job market, clarity is your advantage. Use Voluble to practice answering tough interview questions. Our 'Confidence' analysis helps you monitor your tone, ensuring you sound energetic and capable, not nervous or unsure.",
      bg_color: "bg-lime-100",
    },
    {
      id: 3,
      title: "For Students & Educators",
      description:
        "Present your ideas with confidence. Whether it's a class presentation or a group project, Voluble provides instant feedback on your speech patterns. Improve your pacing and reduce filler words to keep your audience engaged and make a lasting impression.",
      bg_color: "bg-sky-200",
    },
    {
      id: 4,
      title: "For Public Speakers & Content Creators",
      description:
        "Whether you're on a stage, a podcast, or a YouTube video, your delivery is everything. Voluble helps you find the perfect cadence to keep listeners hooked. Fine-tune your script and delivery to create a seamless, engaging experience for your audience.",
      bg_color: "bg-violet-200",
    },
    {
      id: 5,
      title: "For Language Learners",
      description:
        "Speaking a new language is about more than just vocabulary—it's about rhythm and flow. Use Voluble as a private, non-judgmental practice partner. Get instant feedback on your pacing and see your words transcribed live to build fluency.",
      bg_color: "bg-pink-200",
    },
    {
      id: 6,
      title: "For Everyday Conversations",
      description:
        "Want to sound more confident in daily interactions? Voluble helps you become a better communicator in meetings, social gatherings, and virtual calls. Track your progress over time and see how small changes lead to big improvements in your speaking skills.",
      bg_color: "bg-cyan-100",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 mt-20">
      <h2 className="text-4xl text-slate-800 font-bold mb-12">
        Real-World Applications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {useCases.map((useCase) => (
          <Card
            title={useCase.title}
            description={useCase.description}
            bg_color={useCase.bg_color}
          />
        ))}
      </div>
    </div>
  );
};

export default Bottom;
