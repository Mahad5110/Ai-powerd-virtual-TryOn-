
import { useRef, useState } from "react";
import {
  Upload,
  Camera,
  Footprints,
  X,
  ImagePlus,
} from "lucide-react";

import "../styles/ShoeTryOn.css";

export default function ShoeTryOn({ onHome }) {
  const [selectedMode, setSelectedMode] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.onerror = () => {
      setError("Could not read this image. Please try another one.");
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="shoe-tryon-page">
      <header className="shoe-header">
        <h2>
          TryFirst<span>.</span>
        </h2>

        <nav>
          <button onClick={onHome}>Home</button>
          <a href="/catalog">Catalog</a>
        </nav>
      </header>

      <main className="shoe-container">
        <section className="shoe-intro">
          <p className="shoe-eyebrow">
            YOUR VIRTUAL FITTING ROOM
          </p>

          <h1>Shoe Virtual Try-On</h1>

          <p>
            See how your favourite shoes look before making a purchase.
          </p>
        </section>

        <section className="shoe-mode-section">
          <button
            type="button"
            className={`shoe-mode-card ${
              selectedMode === "upload" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedMode("upload");
              setError("");
            }}
          >
            <Upload size={28} />
            <h3>Upload Photo</h3>
            <p>Choose a photo of your feet</p>
          </button>

          <button
            type="button"
            className={`shoe-mode-card ${
              selectedMode === "camera" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedMode("camera");
              setError("");
            }}
          >
            <Camera size={28} />
            <h3>Live Camera</h3>
            <p>Use your webcam</p>
          </button>
        </section>

        <section className="shoe-preview-section">
          <h2>Your Try-On Preview</h2>

          <div className="shoe-preview">
            {selectedMode === "upload" && uploadedImage ? (
              <div style={{ width: "100%" }}>
                <img
                  src={uploadedImage}
                  alt="Uploaded feet preview"
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight: "380px",
                    objectFit: "contain",
                    borderRadius: "12px",
                  }}
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    marginTop: "16px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#123D32",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                  Remove Photo
                </button>
              </div>
            ) : selectedMode === "camera" ? (
              <div>
                <Camera size={55} />
                <p>Live camera functionality will be added next.</p>
              </div>
            ) : (
              <div>
                <Footprints size={55} />
                <p>Your shoe preview will appear here</p>
                <span>Select a photo of your feet to get started.</span>
              </div>
            )}
          </div>

          {error && (
            <p
              role="alert"
              style={{
                color: "#c0392b",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {selectedMode === "upload" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              <button
                type="button"
                className="shoe-upload-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={19} />
                {uploadedImage ? "Change Photo" : "Choose Foot Photo"}
              </button>

              <p style={{ textAlign: "center", fontSize: "13px" }}>
                Supported image formats · Maximum size 10 MB
              </p>
            </>
          )}
        </section>

        <section className="shoe-selection-section">
          <h2>Choose Your Shoes</h2>

          <div className="shoe-categories">
            <button>Sneakers</button>
            <button>Formal</button>
            <button>Casual</button>
          </div>
        </section>

        <p className="shoe-disclaimer">
          Simulation preview — not a guaranteed fit or size measurement.
        </p>
      </main>
    </div>
  );
}
