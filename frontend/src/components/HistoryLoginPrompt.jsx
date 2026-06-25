import { Link } from "react-router-dom";

// shown when the user is not logged in
export default function HistoryLoginPrompt() {
    return (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                <LockIcon />
            </div>
            <p className="text-white font-medium text-base mb-1.5">Sign in to save your feedback</p>
            <p className="text-white/35 text-sm max-w-sm mb-6">
                You can still upload or record and get full feedback without an account —
                it just won't be saved here for next time.
            </p>
            <Link
                to="/login"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
            >
                Log in to view history
            </Link>
        </div>
    );
}

function LockIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="4" y="8" width="10" height="7" rx="1.5" stroke="#60a5fa" strokeWidth="1.3" />
            <path d="M6 8V5.5a3 3 0 0 1 6 0V8" stroke="#60a5fa" strokeWidth="1.3" />
        </svg>
    );
}