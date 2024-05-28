import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null); // State to store the selected file
  const [prediction, setPrediction] = useState(null); // State to store the prediction result
  const [imagePreview, setImagePreview] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the file to the backend for prediction
      const response = await axios.post("/api/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(response.data.predictions); // Store the prediction result
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  return (
    <div className="body">
      <div className="upload-form">
        <div className="upload-form-heading">
          <h1>Vehicle Type Identification</h1>
        </div>
        <div className="upload-form-content">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <br />
            <br />
            <button type="submit">Upload and Identify</button>
            <br />
            <br />
          </form>
          {imagePreview && (
            <div className="imageContainer">
              <h3>Image Preview:</h3>
              <img
                src={imagePreview}
                alt="Selected"
                style={{
                  justifyContent: "center",
                  Width: "100%",
                  height: "70%",
                }}
              />
              <br />
            </div>
          )}
        </div>

        {prediction && (
          <div>
            <h3>Identification Results:</h3>
            <pre>{JSON.stringify(prediction, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
