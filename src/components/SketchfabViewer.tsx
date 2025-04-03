import React from "react";

interface SketchfabViewerProps {
  modelUid: string;
  width?: string;
  height?: string;
}

export default function SketchfabViewer({
  modelUid,
  width = "100%",
  height = "500px",
}: SketchfabViewerProps) {
  const embedUrl = `https://sketchfab.com/models/${modelUid}/embed`;

  return (
    <iframe
      title="Sketchfab 3D Model"
      width={width}
      height={height}
      src={embedUrl}
      frameBorder="0"
      allow="autoplay; fullscreen; vr"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      style={{ border: "none" }}
    ></iframe>
  );
}
