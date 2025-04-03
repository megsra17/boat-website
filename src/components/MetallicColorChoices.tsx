"use client";
import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap"; // Only needed if you use Bootstrap tooltips

interface ColorSwatch {
  color: string;
  label: string;
}

const colorSwatches: ColorSwatch[] = [
  { color: "#d1d1d1", label: "Silver" },
  { color: "#a39b63", label: "Gold" },
  { color: "#282828", label: "Black" },
  { color: "#4a4a4a", label: "Gunmetal" },
];

export default function MetallicColorChoices() {
  // Start open, but allow toggling
  const [isOpen, setIsOpen] = useState(true);

  // Initialize tooltips if you're using Bootstrap's tooltip functionality
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [isOpen]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      {/* Header row with label and arrow toggle */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 500 }}>Metallic Color Choices</span>
        {/* Show an up arrow when open, down arrow when closed */}
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Conditionally render the swatches when open */}
      {isOpen && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            {colorSwatches.map((swatch, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={swatch.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: swatch.color,
                    border: "1px solid #999",
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
  );
}
