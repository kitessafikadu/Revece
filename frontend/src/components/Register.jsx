import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    if (!name || !file) {
      setMessage("Please provide a name and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        formData
      );
      if (response.data.status === "success") {
        setMessage("User registered successfully!");
      } else {
        setMessage("Failed to register user.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Register User</h1>
      <div className="flex flex-col gap-4 items-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 border px-4 py-2 rounded-md"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-64 border px-4 py-2 rounded-md"
        />
        <button
          onClick={registerUser}
          className="px-6 py-3 text-lg font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white"
        >
          Register
        </button>
        {message && <p className="text-gray-700 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
