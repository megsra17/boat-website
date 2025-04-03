// src/app/build/3d/[boatId]/page.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SketchfabViewer from "@/components/SketchfabViewer";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <ul className="navbar-nav ms-auto">
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
                  className={`nav-link btn btn-link ${activeTab === "paint" ? "active" : ""}`}
                  onClick={() => setActiveTab("paint")}
                >
                  Paint
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
                  className={`nav-link btn btn-link ${activeTab === "options" ? "active" : ""}`}
                  onClick={() => setActiveTab("options")}
                >
                  Options
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
            {activeTab === "power" && (
              <div>
                <h5>Power Options</h5>
                <p>Select your engine or outboard configuration.</p>
              </div>
            )}
            {activeTab === "paint" && (
              <div>
                <h5>Paint Options</h5>
                <p>Choose your hull color and finish.</p>
              </div>
            )}
            {activeTab === "interior" && (
              <div>
                <h5>Interior Options</h5>
                <p>Select interior color and materials.</p>
              </div>
            )}
            {activeTab === "options" && (
              <div>
                <h5>Options & Amenities</h5>
                <p>Choose additional features and extras.</p>
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
