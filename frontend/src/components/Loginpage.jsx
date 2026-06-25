import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, initializing, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to send user after login — defaults to "/"
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!initializing && user) {
      navigate(from, { replace: true });
    }
  }, [user, initializing, navigate, from]);

  return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center px-4">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(96,165,250,0.06) 1px,transparent 1px),
                            linear-gradient(to bottom,rgba(96,165,250,0.06) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-end gap-[3px] mb-3" style={{ height: 28 }}>
            {[8, 14, 22, 14, 9].map((h, i) => (
              <span
                key={i}
                className="block w-[3.5px] rounded-full bg-white"
                style={{ height: h }}
              />
            ))}
          </div>
          <span className="text-white font-semibold text-xl tracking-tight">Volube</span>
          <p className="text-white/35 text-sm mt-1">Speech intelligence</p>
        </div>

        {/* Panel */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-white font-semibold text-xl mb-1">Welcome back</h1>
            <p className="text-white/40 text-sm">Sign in to analyse your speech</p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium transition-all active:scale-[0.98]"
          >
            <GoogleLogo />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}