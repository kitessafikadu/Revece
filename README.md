# Face Recognition App

This project is a face recognition web application that allows users to register their face using a webcam or uploaded image 
and later verify their identity using the same methods. The backend is built with FastAPI, while the frontend is powered by React and Tailwind CSS.

## Features

- **User Registration**: Users can register by capturing a live photo from their webcam or uploading an image file.
- **Identity Verification**: Users can verify their identity using a webcam or uploaded image.
- **Face Recognition**: The backend uses the FaceNet model for generating embeddings and comparing facial features.
- **In-Memory Storage**: User embeddings are stored temporarily in memory.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Webcam.js**: A library for accessing webcam streams.

### Backend
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs.
- **FaceNet**: A face recognition model for extracting facial embeddings.
- **Python Libraries**:
  - `keras_facenet` for using FaceNet.
  - `numpy` and `opencv-python` for image processing.
  - `Pillow` for handling image files.

---

## Prerequisites

### Backend Requirements
- Python 3.9+
- FastAPI
- Uvicorn
- keras-facenet
- numpy
- opencv-python
- Pillow
- python-multipart

### Frontend Requirements
- Node.js 16+
- npm or yarn

---

## Installation

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Kitessafikadu/Revece.git
    cd Revece/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows: .\env\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the backend server:
    ```bash
    uvicorn main:app --reload
    ```

The backend will be accessible at `http://127.0.0.1:8000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The frontend will be accessible at `http://127.0.0.1:5173`.

---

## Usage

1. **Homepage**: The homepage greets users and provides navigation to the registration and verification pages.

2. **Registration**:
    - Use the dropdown to select either `Upload Image` or `Use Webcam`.
    - Enter your name and upload a photo or take a live shot using your webcam.
    - Click the `Register` button to save your data.

3. **Verification**:
    - Use the dropdown to select either `Upload Image` or `Use Webcam`.
    - Upload a photo or take a live shot using your webcam.
    - Click the `Verify` button to verify your identity.

---

## Project Structure

### Backend
```
backend/
├── main.py           # Main FastAPI application
├── requirements.txt  # Python dependencies
└── user_images/      # Directory to store user images temporarily
```

### Frontend
```
frontend/
├── src/
│   ├── components/   # React components
│   ├── assets/       # Static assets like images
│   └── App.jsx       # Main application component
├── public/           # Public static files
└── package.json      # npm configuration
``

