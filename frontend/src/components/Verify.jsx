import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Verify = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("webcam"); // State to manage source (webcam/upload)
  const webcamRef = React.useRef(null);

  const verifyUser = async () => {
    setLoading(true);
    setName(""); // Clear the name before processing

    const formData = new FormData();

    if (source === "webcam") {
      // Capture image from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append("file", blob, "image.jpg");
    } else if (source === "upload") {
      // Use uploaded file
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/verify",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "success") {
        setName(`Hello, ${response.data.name}!`);
      } else {
        setName("No match found.");
      }
    } catch (error) {
      console.error(error);
      setName("Error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Verify Identity</h1>

      {/* Dropdown to select the verification source */}
      <div className="mb-6">
        <select
          className="p-2 border rounded-md"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="webcam">Webcam</option>
          <option value="upload">Upload Image</option>
        </select>
      </div>

      {/* Conditional rendering of webcam or file input */}
      {source === "webcam" && (
        <div className="flex flex-col items-center gap-6 mb-6">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border-4 border-gray-800 rounded-lg shadow-lg"
          />
          <button
            onClick={verifyUser}
            disabled={loading}
            className={`px-6 py-3 text-lg font-semibold rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Verify from Webcam"}
          </button>
        </div>
      )}

      {source === "upload" && (
        <div className="my-6 text-center">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            className="w-full border px-4 py-2 rounded-md"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={verifyUser}
            disabled={loading || !file}
            className={`mt-4 px-6 py-3 text-lg font-semibold rounded-md ${
              loading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Verify from Upload"}
          </button>
        </div>
      )}

      {name && (
        <h2 className="text-2xl font-medium text-gray-700 mt-6">{name}</h2>
      )}
    </div>
  );
};

export default Verify;
