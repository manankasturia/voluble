import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Try Volube with no commitment.",
    features: [
      "5 analyses / month",
      "Transcript + filler word count",
      "Basic speed metric",
      "Export as text",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For speakers who take practice seriously.",
    features: [
      "Unlimited analyses",
      "Full stammer + confidence report",
      "Segment-by-segment breakdown",
      "Progress tracking over time",
      "PDF & CSV export",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Teams",
    price: "Custom",
    period: "",
    desc: "For coaches, agencies, and enterprises.",
    features: [
      "Everything in Pro",
      "Multi-speaker support",
      "Coach dashboard",
      "API access",
      "Priority support & SLA",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export default function Pricing({ standalone }) {
  return (
    <section id="pricing" className={`py-28 px-6 md:px-12 max-w-6xl mx-auto ${standalone ? "pt-36" : ""}`}>
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
          Pricing
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Simple, clear pricing.</h2>
        <p className="text-white/38 mt-4 max-w-sm mx-auto text-sm">
          Start free. Upgrade when your practice gets serious.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-2xl border transition-all ${
              plan.highlight
                ? "border-blue-500/50 bg-gradient-to-b from-blue-950/55 to-[#07090f] shadow-xl shadow-blue-900/20"
                : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full tracking-wide">
                  Most popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <p className="text-white/48 text-sm font-medium mb-1">{plan.name}</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-white/38 text-sm mb-1">{plan.period}</span>}
              </div>
              <p className="text-white/32 text-sm mt-2">{plan.desc}</p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/58">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/features"
              className={`w-full text-center py-3 rounded-full text-sm font-medium transition-all ${
                plan.highlight
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-700/28"
                  : "border border-white/15 text-white/65 hover:text-white hover:border-white/30"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
