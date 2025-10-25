import React from "react";
import Navbar from "../Navbar/Navbar.js";
import Card from "./Card.js";
import Footer from "../Footer/Footer.js";

const Pricing = () => {
  const pricingPlans = [
    {
      pack: "Basic",
      price: "$0",
      btnLabel: "Get Started",
      features: [
        "Real-Time Transcription: See your words as you speak.",
        "Pacing Analysis (WPM): Get live feedback on your speed.",
        'Filler Word Counter: Catch "ums," "ahs," and "likes."',
        "5 Sessions Per Month: Practice regularly with monthly limits.",
      ],
    },
    {
      pack: "Pro",
      price: "$4/month",
      btnLabel: "Upgrade to Pro",
      features: [
        "Everything in Basic, plus:",
        "Unlimited Sessions: Practice as much as you want.",
        "Tone & Confidence Analysis: Our advanced AI analyzes your vocal tone to gauge your confidence and sentiment.",
        "Full Session History: Track your improvements over time with saved reports.",
        'Custom Filler Word Library: Add your own crutch words (e.g., "right," "so," "actually") to track.',
      ],
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center min-h-screen bg-violet-50">
        <Navbar />
        <h1 className="text-5xl font-bold text-indigo-900 mt-12 mb-8">
          Find the Perfect Plan for Your Voice
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6 max-w-6xl">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              pack={plan.pack}
              price={plan.price}
              btnLabel={plan.btnLabel}
              features={plan.features}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
