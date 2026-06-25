import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <AuthSpinner />;
  }

  if (!user) {
    // Save the page they were trying to reach so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AuthSpinner() {
  return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-end gap-[3px]" style={{ height: 28 }}>
          {[8, 14, 22, 14, 9].map((h, i) => (
            <span
              key={i}
              className="block w-[3px] rounded-full bg-blue-400"
              style={{
                height: h,
                animation: `pulse 1.1s ease-in-out ${i * 0.12}s infinite alternate`,
              }}
            />
          ))}
        </div>
        <p className="text-white/30 text-sm">Loading Volube…</p>
      </div>
      <style>{`
        @keyframes pulse {
          from { opacity: 0.25; transform: scaleY(0.6); }
          to   { opacity: 1;    transform: scaleY(1);   }
        }
      `}</style>
    </div>
  );
}