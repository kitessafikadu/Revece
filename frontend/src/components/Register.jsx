import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("webcam"); // Default to webcam
  const webcamRef = React.useRef(null);

  // Function to capture an image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setFile(null); // Clear any uploaded file if capturing from webcam
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setImage(null); // Clear the captured image if uploading a file
  };

  // Function to register the user by sending the name and image to the backend
  const registerUser = async () => {
    if (!name || (!image && !file)) {
      setMessage("Please provide a name and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      // Convert the base64 image to a blob
      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append("file", blob, "image.jpg");
    } else if (file) {
      // Append uploaded file to the form data
      formData.append("file", file);
    }

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
      <div className="flex flex-col items-center gap-6">
        {/* Dropdown to choose between Webcam or File Upload */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="mb-4 px-4 py-2 border rounded-md"
        >
          <option value="webcam">Use Webcam</option>
          <option value="upload">Upload Image</option>
        </select>

        {/* Webcam capture section */}
        {method === "webcam" && (
          <div className="flex flex-col items-center gap-6">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="border-4 border-gray-800 rounded-lg shadow-lg"
            />
            <button
              onClick={captureImage}
              className="mt-4 px-6 py-3 text-lg font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              Capture Image
            </button>

            {image && (
              <div className="mt-6">
                <img
                  src={image}
                  alt="Captured"
                  className="w-64 h-64 object-cover rounded-lg mb-4"
                />
              </div>
            )}
          </div>
        )}

        {/* File upload section */}
        {method === "upload" && (
          <div className="my-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              className="w-full border px-4 py-2 rounded-md"
              onChange={handleFileUpload}
            />
          </div>
        )}

        {/* Input for user's name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 border px-4 py-2 rounded-md"
        />
        <button
          onClick={registerUser}
          className="mt-4 px-6 py-3 text-lg font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register
        </button>

        {/* Display registration message */}
        {message && <p className="text-gray-700 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
