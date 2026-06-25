import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
      <Link to="/" className="flex items-center gap-2.5">
        <WaveIcon />
        <span className="text-white font-semibold text-lg tracking-tight">Volube</span>
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, to }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-white font-medium" : "text-white/55 hover:text-white"}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link
        to="/features"
        className="hidden md:inline-flex items-center px-5 py-2 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition-colors"
      >
        Analyse speech
      </Link>

      <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0b1120]/95 backdrop-blur border-t border-white/10 p-6 flex flex-col gap-4 md:hidden">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={label} to={to} onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-sm py-1">
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

function WaveIcon() {
  const heights = [8, 14, 20, 14, 9];
  return (
    <div className="flex items-end gap-[2.5px]" style={{ height: 20 }}>
      {heights.map((h, i) => (
        <span key={i} className="block w-[3px] rounded-full bg-white" style={{ height: h }} />
      ))}
    </div>
  );
}
