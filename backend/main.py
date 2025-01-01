from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from keras_facenet import FaceNet
import cv2
from PIL import Image
import os

embedder = FaceNet()

os.makedirs("user_images", exist_ok=True)

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB
    return image

def get_embeddings(image):
    detections = embedder.extract(image, threshold=0.95)  # Extract faces and embeddings
    if detections:
        return detections[0]['embedding']  # Get the embedding of the first detected face
    return None

database = {}

app = FastAPI()

# Add CORS middleware to handle frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing, adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register(name: str = Form(...), file: UploadFile = File(...)):
    try:
        file_path = f"user_images/{name}.jpg"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        image = preprocess_image(file_path)
        embedding = get_embeddings(image)

        if embedding is not None:
            database[name] = embedding
            return JSONResponse({"status": "success", "message": f"User {name} registered successfully."})
        else:
            return JSONResponse({"status": "failed", "message": "No face detected in the image."})

    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)})

@app.post("/verify")
async def verify(file: UploadFile = File(...)):
    try:
        temp_file_path = "temp.jpg"
        with open(temp_file_path, "wb") as f:
            f.write(await file.read())

        image = preprocess_image(temp_file_path)
        input_embedding = get_embeddings(image)

        if input_embedding is not None:
            for name, stored_embedding in database.items():
                similarity = np.linalg.norm(input_embedding - stored_embedding)
                if similarity < 0.9:  # You can adjust this threshold
                    return JSONResponse({"status": "success", "name": name})
            return JSONResponse({"status": "failed", "message": "No match found"})
        else:
            return JSONResponse({"status": "failed", "message": "No face detected in the image."})

    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)})

    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)  


