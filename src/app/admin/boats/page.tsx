// app/admin/boats/page.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Boat {
  _id: string;
  name: string;
  description?: string;
  category: string;
}

export default function AdminBoatsPage() {
  const { data: session, status } = useSession();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (session) {
      fetch("/api/boats")
        .then((res) => res.json())
        .then((data) => setBoats(data.boats));
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="container">
        <p>You must be logged in to view this page.</p>
        <button className="btn btn-primary" onClick={() => signIn()}>
          Log In
        </button>
      </div>
    );
  }

  const filteredBoats =
    activeCategory === "all"
      ? boats
      : boats.filter((boat) => boat.category === activeCategory);

  return (
    <div className="container">
      <h1 className="my-4">Admin Dashboard</h1>
      <button
        className="btn btn-secondary"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </button>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Boats
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeCategory === "vclass" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("vclass")}
          >
            V Class
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeCategory === "lclass" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("lclass")}
          >
            L Class
          </button>
        </li>
      </ul>
      <div>
        {filteredBoats.length === 0 ? (
          <p>No boats found in this category.</p>
        ) : (
          filteredBoats.map((boat) => (
            <div key={boat._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{boat.name}</h5>
                <p className="card-text">{boat.description}</p>
                <Link href={`/admin/boats/${boat._id}`}>
                  <a className="btn btn-primary">Edit</a>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
