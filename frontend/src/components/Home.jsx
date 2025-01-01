import React from "react";
import { Link } from "react-router-dom";
import faceImage from "../assets/face_verification.jpg"; // Correct path relative to the file

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Revece!
      </h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Face recognition and verification app.
      </p>
      <img
        src={faceImage} // Using the imported image
        alt="Welcome"
        className="w-64 h-64 mb-6 "
      />
      <div className="flex gap-8">
        <Link
          to="/register"
          className="px-6 py-3 text-lg font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white"
        >
          Register
        </Link>
        <Link
          to="/verify"
          className="px-6 py-3 text-lg font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Verify
        </Link>
      </div>
    </div>
  );
};

export default Home;
