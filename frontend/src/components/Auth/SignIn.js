import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import iconSrc from "../../assets/voluble_icon.png";

const SignIn = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log("Sign-in successful");
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={iconSrc} alt="Voluble Icon" className="w-14 h-14 mb-4" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign In to Voluble
        </h1>
        <button
          onClick={handleSignIn}
          className="w-full py-3 rounded-md bg-white text-gray-800 font-medium text-lg border border-gray-300 hover:border-gray-900 flex justify-center items-center space-x-2"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-18.6-1.7-37-5.2-54.8H272.1v103.8h146.9c-6.3 34-25.4 62.7-54.1 81.9v68.1h87.4c51.2-47.2 81.2-116.9 81.2-198.9z"
            />
            <path
              fill="#34A853"
              d="M272.1 544.3c73.4 0 135.1-24.3 180.1-66.8l-87.4-68.1c-24.3 16.3-55.4 25.9-92.7 25.9-71.1 0-131.4-47.9-153.1-112.3H28.1v70.5c45.5 90.3 138.5 150.8 244 150.8z"
            />
            <path
              fill="#FBBC05"
              d="M119 322.9c-10.2-30.3-10.2-63.2 0-93.5V158.9H28.1c-40.8 81.6-40.8 178.4 0 260l90.9-96z"
            />
            <path
              fill="#EA4335"
              d="M272.1 106.3c39.9-.6 78.1 13.8 107.4 40.2l80.2-80.2C407 24.8 345.3.5 272.1.5 166.6.5 73.6 61 28.1 151.3l90.9 70.5c21.7-64.4 82-115.5 153.1-115.5z"
            />
          </svg>
          Sign in with Google
        </button>
        <p className="mt-4 text-sm text-gray-600 flex justify-center items-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
