import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";
import Footer from "./Footer";

const MAKERS = [
  { name: "Manan Kasturia", linkedin: "https://linkedin.com/in/manankasturia", github: "https://github.com/manankasturia" },
  { name: "Rohit Dangwal", linkedin: "https://linkedin.com/in/rohit-dangwal", github: "https://github.com/ROHIT-dangwal" },
];

const CONTACT_EMAIL = ["manankasturia5@gmail.com", "rdsd21104@gmail.com"];

const INCLUDED = [
  "Unlimited uploads & recordings",
  "Full transcript, timestamped",
  "Speech speed (WPM) breakdown",
  "Filler word & weak word detection",
  "Stammer & repetition analysis",
  "Confidence scoring",
  "AI coach review on every analysis",
  "History saved to your account",
];

export default function Pricing({ standalone }) {
  return (
    <>
      <section id="pricing" className={`px-6 mb-20 md:px-12 max-w-5xl mx-auto ${standalone ? "pt-36" : ""}`}>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">No catch. It's free.</h2>
          <p className="text-white/38 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Volube is a hobby project we built to learn and to show what we can do —
            not a startup with a paywall waiting behind the corner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative flex flex-col p-8 md:p-9 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 to-[#07090f]">
            <div className="absolute -top-3 left-8">
              <span className="px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full tracking-wide">
                Everything included
              </span>
            </div>

            <div className="mb-7 mt-3">
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/38 text-sm mb-1">forever</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Every feature, unlimited, no account tier to upgrade out of —
                because there isn't one.
              </p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/dashboard"
              className="w-full text-center py-3 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-700/28 transition-all"
            >
              Start analysing — free
            </Link>
          </div>

          <div className="relative flex flex-col p-8 md:p-9 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="mb-7">
              <p className="text-white/48 text-sm font-medium mb-1">Want something custom?</p>
              <h3 className="text-2xl font-bold text-white mb-3">Let's build it together.</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                We're the two people behind Volube. If you've got an idea, a feature
                this site is missing, or a project you want built from scratch —
                just reach out.
              </p>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL[0]}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium border border-white/15 text-white hover:bg-white/[0.06] hover:border-white/30 transition-all mb-7"
            >
              <FiMail size={15} />
              {CONTACT_EMAIL[0]}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL[1]}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium border border-white/15 text-white hover:bg-white/[0.06] hover:border-white/30 transition-all mb-7"
            >
              <FiMail size={15} />
              {CONTACT_EMAIL[1]}
            </a>

            <div className="flex flex-col gap-3 mt-auto">
              {MAKERS.map((m) => (
                <div key={m.name} className="flex items-center justify-between gap-3 py-2 border-t border-white/[0.06] first:border-t-0 first:pt-0">
                  <span className="text-white/60 text-sm">{m.name}</span>
                  <div className="flex items-center gap-4">
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/38 hover:text-white transition-colors">
                      <FiLinkedin size={16} />
                    </a>
                    <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-white/38 hover:text-white transition-colors">
                      <FiGithub size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}