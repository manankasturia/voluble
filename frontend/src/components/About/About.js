import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const PROJECT_NAME = "Voluble";

const About = () => {
  return (
    <div className="">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center border-b-2 border-gray-100 pb-5 mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            About {PROJECT_NAME}
          </h2>
        </header>
        <div>
          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4 border-b border-gray-200 pb-2">
              Our Mission: Unlock Your Most Confident Voice
            </h3>
            <p className="text-lg mb-4 text-gray-700">
              We believe that great ideas deserve to be heard clearly. But for most
              of us, public speaking is a skill shrouded in mystery. We finish a
              presentation, a meeting, or even a casual conversation and wonder:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li className="text-lg text-gray-700">"Did I speak too quickly?"</li>
              <li className="text-lg text-gray-700">"How many times did I say 'um' or 'like'?"</li>
              <li className="text-lg text-gray-700">"Did I sound as confident as I wanted to?"</li>
            </ul>
            <p className="text-lg mb-4 text-gray-700">
              Getting honest, objective feedback is difficult. You either have to
              bother a colleague, pay for an expensive coach, or painfully re-watch
              recordings of yourself—long after the moment has passed.
            </p>
            <p className="text-lg mb-4 text-gray-700">
              We knew there had to be a better way.
            </p>
            <p className="text-lg mb-4 text-gray-700">
              Our mission is to make powerful, persuasive communication accessible
              to everyone. We're here to give you the insights of a personal speaking
              coach, with the privacy and immediacy of advanced technology.
            </p>
          </div>
          

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4 border-b border-gray-200 pb-2">
              Our Solution: Your Private, Real-Time Coach
            </h3>
            <p className="text-lg mb-4 text-gray-700">
              We created <strong className="text-gray-900">{PROJECT_NAME}</strong> to be the coach that's always
              there, running discreetly in the background. It's designed to provide
              <strong className="text-gray-900"> instant insights without causing distractions.</strong>
            </p>
            <p className="text-lg mb-4 text-gray-700">
              Unlike other tools that force you to wait for a post-meeting report,
              our platform analyzes your speech <em className="italic text-blue-600">as it happens</em>.
              As you talk, you get a live, private dashboard showing you:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li className="text-lg text-gray-700">
                Your exact <strong className="text-gray-900">pace</strong> (Words Per Minute)
              </li>
              <li className="text-lg text-gray-700">
                A running count of <strong className="text-gray-900">filler words</strong>
              </li>
              <li className="text-lg text-gray-700">
                A <strong className="text-gray-900">"Confidence" meter</strong> based on your vocal tone
              </li>
            </ul>
            <p className="text-lg mb-4 text-gray-700">
              This allows you to make subtle adjustments in the moment, helping
              you build better habits with every word you speak.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4 border-b border-gray-200 pb-2">
              Our Technology: The Power of "Now"
            </h3>
            <p className="text-lg mb-4 text-gray-700">
              To make this possible, we built a system far beyond a simple "record
              and analyze" app. Our platform is built on a complex, real-time
              streaming architecture.
            </p>
            <p className="text-lg mb-4 text-gray-700">
              When you speak, we're not just recording. We're instantly streaming
              that audio, transcribing it, and running parallel AI analyses for
              pacing, fillers, and sentiment—all within milliseconds. It’s
              technically complex on the inside so that your experience can be
              beautifully simple on the outside.
            </p>
            <p className="text-lg mb-4 text-gray-700">
              You get immediate, actionable feedback. No one else knows you're
              using it.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4 border-b border-gray-200 pb-2">
              Our Philosophy
            </h3>
            <p className="text-lg mb-4 text-gray-700">We believe feedback should be:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li className="text-lg text-gray-700">
                <strong className="text-gray-900">Instant,</strong> not delayed.
              </li>
              <li className="text-lg text-gray-700">
                <strong className="text-gray-900">Actionable,</strong> not overwhelming.
              </li>
              <li className="text-lg text-gray-700">
                <strong className="text-gray-900">Private,</strong> not public.
              </li>
            </ul>
            <p className="text-lg mb-4 text-gray-700">
              Your voice is your most powerful tool. We're here to help you
              master it.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg mt-10">
            <h4 className="text-2xl font-semibold text-gray-900 mb-5">
              Ready to find your most confident voice?
            </h4>
            <button className="text-lg font-bold text-white bg-blue-600 py-3 px-7 rounded-md shadow cursor-pointer transition-colors duration-300 hover:bg-blue-700">
              Get Started for Free
            </button>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default About;