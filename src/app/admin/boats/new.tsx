// src/app/admin/boats/new.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBoat() {
  const [name, setName] = useState("");
  const [modelUid, setModelUid] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed");
        return;
      }
      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    // Create a new boat document with imageUrl included
    const res = await fetch("/api/boats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, modelUid, imageUrl }),
    });

    if (res.ok) {
      router.push("/admin/boats");
    } else {
      alert("Failed to save boat data");
    }
  };

  return (
    <div className="container">
      <h1>Add New Boat</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Boat Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelUid" className="form-label">
            Sketchfab Model UID
          </label>
          <input
            type="text"
            id="modelUid"
            className="form-control"
            value={modelUid}
            onChange={(e) => setModelUid(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Boat Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Boat
        </button>
      </form>
    </div>
  );
}
