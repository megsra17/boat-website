"use client";
import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";

interface ColorSwatch {
  color: string;
  label: string;
}

const colorSwatches: ColorSwatch[] = [
  { color: "#d1d1d1", label: "Latte Upholstery with  Havana Woven Flooring" },
  { color: "#a39b63", label: "Cashmere Upholstery with Magnetic Woven Flooring" },
  { color: "#282828", label: "Arctic Upholstery with Magnetic Woven Flooring" },
];

export default function MetallicColorChoices() {
  const [isOpen, setIsOpen] = useState(true);

  // Initialize all tooltips after render
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
      {/* Header row with label and arrow */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 500 }}>Upholstery & Flooring Choices</span>
        <span>{isOpen ? "▼" : "▲"}</span>
      </div>

      {/* If open, display color swatches */}
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
