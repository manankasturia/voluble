import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const { user, initializing, signOutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-black/50 backdrop-blur justify-between px-6 py-4 md:px-12">
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

      <div className="hidden md:block">
        {initializing ? (
          <div className="w-9 h-9 rounded-full bg-white/[0.06] animate-pulse" />
        ) : user ? (
          <ProfileMenu user={user} onSignOut={() => signOutUser().then(() => navigate("/"))} />
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-sm text-white font-medium transition-colors"
          >
            Log in
          </Link>
        )}
      </div>

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

          <div className="h-px bg-white/10 my-1" />

          {initializing ? null : user ? (
            <>
              <div className="flex items-center gap-3 py-1">
                <Avatar user={user} size={36} />
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user.displayName || "User"}</p>
                  <p className="text-white/35 text-xs truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  signOutUser().then(() => navigate("/"));
                }}
                className="text-left text-red-400/90 hover:text-red-400 text-sm py-1"
              >
                Sign out
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-sm py-1">
              Log in
            </NavLink>
          )}

        </div>
      )}
    </nav>
  );
}

function ProfileMenu({ user, onSignOut }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setShow((s) => !s)}
        className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
      >
        <Avatar user={user} size={30} />
        <span className="text-white/85 text-sm font-medium max-w-[120px] truncate">
          {firstName(user)}
        </span>
        <ChevronDown open={show} />
      </button>

      {show && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/[0.08] bg-[#0b1120] shadow-2xl shadow-black/40 overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
            <Avatar user={user} size={38} />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.displayName || "User"}</p>
              <p className="text-white/35 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <div className="p-1.5">
            <MenuItem
              icon={<HistoryIcon />}
              label="View history"
              onClick={() => {
                setShow(false);
                navigate("/dashboard#history");
                // react-router doesn't auto-scroll to a hash when already on
                // /dashboard, so nudge it manually after navigation settles.
                setTimeout(() => {
                  document.getElementById("history")?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
            />
            <MenuItem
              icon={<SignOutIcon />}
              label="Sign out"
              danger
              onClick={() => {
                setShow(false);
                onSignOut();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${danger ? "text-red-400/90 hover:bg-red-500/[0.08] hover:text-red-400" : "text-white/75 hover:bg-white/[0.06] hover:text-white"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Avatar({ user, size }) {
  const initial = (user?.displayName?.[0] || user?.email?.[0] || "U").toUpperCase();
  if (user?.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || "User"}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-blue-600/25 border border-blue-400/20 text-blue-200 flex items-center justify-center font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}

function firstName(user) {
  const name = user?.displayName || user?.email?.split("@")[0] || "User";
  return name.split(" ")[0];
}

function ChevronDown({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="transition-transform"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 2.5H3.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 11l3-3-3-3M13.3 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
