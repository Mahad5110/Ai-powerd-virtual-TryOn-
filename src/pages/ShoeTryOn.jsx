
import { useState } from "react";
import { Upload, Camera, Footprints } from "lucide-react";
import "../styles/ShoeTryOn.css";

export default function ShoeTryOn({ onHome }) {
  const [selectedMode, setSelectedMode] = useState("upload");

  return (
    <div className="shoe-tryon-page">
      <header className="shoe-header">
        <h2>TryFirst<span>.</span></h2>

        <nav>
          <button onClick={onHome}>Home</button>
          <a href="/catalog">Catalog</a>
        </nav>
      </header>

      <main className="shoe-container">
        <section className="shoe-intro">
          <p className="shoe-eyebrow">YOUR VIRTUAL FITTING ROOM</p>
          <h1>Shoe Virtual Try-On</h1>
          <p>
            See how your favourite shoes look before making a purchase.
          </p>
        </section>

        <section className="shoe-mode-section">
          <button
            className={`shoe-mode-card ${
              selectedMode === "upload" ? "active" : ""
            }`}
            onClick={() => setSelectedMode("upload")}
          >
            <Upload size={28} />
            <h3>Upload Photo</h3>
            <p>Choose a photo of your feet</p>
          </button>

          <button
            className={`shoe-mode-card ${
              selectedMode === "camera" ? "active" : ""
            }`}
            onClick={() => setSelectedMode("camera")}
          >
            <Camera size={28} />
            <h3>Live Camera</h3>
            <p>Use your webcam</p>
          </button>
        </section>

        <section className="shoe-preview-section">
          <h2>Your Try-On Preview</h2>

          <div className="shoe-preview">
            <Footprints size={55} />
            <p>Your shoe preview will appear here</p>
          </div>
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
