// src/app/build/3d/[boatId]/page.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SketchfabViewer from "@/components/SketchfabViewer";
import MetallicColorChoices from "@/components/MetallicColorChoices";
import UpholsteryColorChoices from "@/components/UpholsteryColorChoices";
import AmenitiesSection from "@/components/AmenitySection";

export default function BuildBoat3DPage({ params }: { params: { boatId: string } }) {
  // Replace this with logic to pick a model based on boatId and any query params.
  const modelUid = "YOUR_SKETCHFAB_MODEL_UID_HERE";

  // Map boatId to a display name (this can be replaced with a real API lookup)
  const boatNameMap: { [key: string]: string } = {
    vclass: "Vanderbilt V Class",
    lclass: "Vanderbilt L Class",
  };
  const selectedBoatName = boatNameMap[params.boatId] || "Boat Builder";

  // Example: if you want to track active customization tab locally.
  const [activeTab, setActiveTab] = useState("power");

  return (
    <>
      <Head>
        <title>Customize Your Boat in 3D</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Using Bootstrap CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
      </Head>

      {/* Navigation Bar Across the Top */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            {selectedBoatName || "Boat Builder"}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-around">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "exterior" ? "active" : ""}`}
                  onClick={() => setActiveTab("exterior")}
                >
                  Exterior
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "interior" ? "active" : ""}`}
                  onClick={() => setActiveTab("interior")}
                >
                  Interior
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "amenities" ? "active" : ""}`}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "power" ? "active" : ""}`}
                  onClick={() => setActiveTab("power")}
                >
                  Power
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "summary" ? "active" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  Summary
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left Column: 3D Rendering */}
          <div className="col-md-8 p-4">
            <SketchfabViewer modelUid={modelUid} width="100%" height="600px" />
          </div>

          {/* Right Column: Customization Selection */}
          <div className="col-md-4 p-4 border-start">
            {activeTab === "exterior" && (
              <div>
                <h5>Choose your exterior</h5>
                <MetallicColorChoices />
              </div>
            )}
            {activeTab === "interior" && (
              <div>
                <h5>Choose your Interior</h5>
                <UpholsteryColorChoices />
              </div>
            )}
            {activeTab === "amenities" && (
              <div>
                <h5>Choose your Amenities</h5>
                <AmenitiesSection />
              </div>
            )}
            {activeTab === "power" && (
              <div>
                <h5>Choose your power</h5>
                
              </div>
            )}
            {activeTab === "summary" && (
              <div>
                <h5>Summary</h5>
                <p>Review your selections and total price.</p>
                <button className="btn btn-primary">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
