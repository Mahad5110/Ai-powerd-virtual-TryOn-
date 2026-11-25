
import { useRef, useState } from "react";
import {
  Upload,
  Camera,
  Footprints,
  X,
  ImagePlus,
  Check,
} from "lucide-react";

import { products } from "../data/products";
import "../styles/ShoeTryOn.css";

export default function ShoeTryOn({ onHome }) {
  const [selectedMode, setSelectedMode] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedShoeId, setSelectedShoeId] = useState("veja-esplar");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Get actual footwear products from the existing product data
  const footwearProducts = products.filter(
    (product) => product.category === "Footwear"
  );

  const selectedShoe = footwearProducts.find(
    (product) => product.id === selectedShoeId
  );

  // Upload foot photo
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

  // Remove uploaded photo
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="shoe-tryon-page">
      {/* Header */}
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
        {/* Introduction */}
        <section className="shoe-intro">
          <p className="shoe-eyebrow">
            YOUR VIRTUAL FITTING ROOM
          </p>

          <h1>Shoe Virtual Try-On</h1>

          <p>
            See how your favourite shoes look before making a purchase.
          </p>
        </section>

        {/* Upload and Camera Modes */}
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

        {/* Try-On Preview */}
        <section className="shoe-preview-section">
          <h2>Your Try-On Preview</h2>

          <div className="shoe-preview">
            {selectedMode === "upload" && uploadedImage ? (
              <div style={{ width: "100%" }}>
                <img
                  src={uploadedImage}
                  alt="Uploaded foot preview"
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
                    color: "white",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
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
            <p style={{ color: "#c0392b", textAlign: "center" }}>
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

        {/* Actual Footwear Products */}
        <section className="shoe-selection-section">
          <h2>Choose Your Shoes</h2>

          <p style={{ color: "#777B72", marginBottom: "20px" }}>
            Select a pair from our TryFirst footwear collection.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "20px",
            }}
          >
            {footwearProducts.map((shoe) => (
              <button
                type="button"
                key={shoe.id}
                onClick={() => setSelectedShoeId(shoe.id)}
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderRadius: "12px",
                  border:
                    selectedShoeId === shoe.id
                      ? "2px solid #123D32"
                      : "1px solid #E7E7DF",
                  background:
                    selectedShoeId === shoe.id ? "#F0F4EF" : "white",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  style={{
                    width: "100%",
                    height: "145px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                {selectedShoeId === shoe.id && (
                  <span
                    style={{
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      background: "#123D32",
                      color: "white",
                      borderRadius: "50%",
                      width: "27px",
                      height: "27px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Check size={16} />
                  </span>
                )}

                <p
                  style={{
                    color: "#777B72",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  {shoe.brand}
                </p>

                <h3
                  style={{
                    color: "#20352D",
                    fontSize: "15px",
                    margin: "5px 0",
                  }}
                >
                  {shoe.name}
                </h3>

                <strong style={{ color: "#123D32" }}>
                  PKR {shoe.price.toLocaleString()}
                </strong>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Shoe Details */}
        {selectedShoe && (
          <section
            style={{
              marginTop: "35px",
              padding: "22px",
              background: "white",
              border: "1px solid #E7E7DF",
              borderRadius: "14px",
            }}
          >
            <p className="shoe-eyebrow">YOUR SELECTED PAIR</p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={selectedShoe.image}
                alt={selectedShoe.name}
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div>
                <h3 style={{ color: "#123D32" }}>
                  {selectedShoe.name}
                </h3>

                <p>{selectedShoe.brand}</p>

                <strong>
                  PKR {selectedShoe.price.toLocaleString()}
                </strong>

                <p style={{ marginTop: "8px", color: "#777B72" }}>
                  {selectedShoe.color}
                </p>
              </div>
            </div>
          </section>
        )}

        <p className="shoe-disclaimer">
          Simulation preview — not a guaranteed fit or size measurement.
        </p>
      </main>
    </div>
  );
}
