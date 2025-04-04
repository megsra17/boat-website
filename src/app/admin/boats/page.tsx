"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UsersSection from "@/components/UsersSection";

// Helper to get initials from a name.
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);

  const userName = session?.user?.name || "User";
  const initials = session?.user?.name ? getInitials(session.user.name) : "U";
  const router = useRouter();

  useEffect(() => {
    console.log("Session updated:", session);
  }, [session]);

  useEffect(() => {
    async function fetchActiveUsers() {
      try {
        const res = await fetch("/api/users/count");
        if (res.ok) {
          const data = await res.json();
          setActiveUserCount(data.count);
        } else {
          console.error("Failed to fetch active user count");
        }
      } catch (error) {
        console.error("Error fetching active user count:", error);
      }
    }
    fetchActiveUsers();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
        <div className="navbar-brand d-flex align-items-center">
          {/* Add Logo or Text */}
          <span className="ms-2 fs-4">Vanderbilt</span>
        </div>
        {/* User Info with Clickable Avatar */}
        <div className="position-relative">
          <div
            className="d-flex align-items-center text-white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            <div style={{ fontWeight: 500 }}>{userName}</div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {initials}
            </div>
          </div>
          {/* Dropdown Menu */}
          {showUserMenu && (
            <div
              className="position-absolute"
              style={{
                right: 0,
                top: "100%",
                backgroundColor: "#333",
                border: "1px solid #444",
                borderRadius: "4px",
                padding: "8px 0",
                width: "180px",
                zIndex: 1000,
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={async () => {
                  await signOut({ redirect: false, callbackUrl: "/login" });
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="row g-0" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div className="col-2 bg-dark text-white p-3" style={{ maxWidth: 220 }}>
          {/* User Info in Sidebar */}
          <div className="d-flex align-items-center mb-4">
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginRight: 10,
              }}
            >
              {initials}
            </div>
            <div>
              <strong>{userName}</strong>
            </div>
          </div>

          {/* Nav Items */}
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white ${
                  activeMenu === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("dashboard")}
                style={{ background: "none", border: "none" }}
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white ${
                  activeMenu === "users" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("users")}
                style={{ background: "none", border: "none" }}
              >
                <i className="bi bi-people me-2"></i>
                Users
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white ${
                  activeMenu === "boats" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("boats")}
                style={{ background: "none", border: "none" }}
              >
                <i className="bi bi-boat me-2"></i>
                Boats
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col bg-light p-4">
          {activeMenu === "dashboard" && (
            <DashboardContent activeUserCount={activeUserCount} />
          )}
          {activeMenu === "users" && <UsersSection />}
          {activeMenu === "boats" && (
            <div>
              <h2>Boats</h2>
              <p>Manage your boats here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DashboardContent now accepts activeUserCount as a prop.
function DashboardContent({
  activeUserCount,
}: {
  activeUserCount: number | null;
}) {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p>{activeUserCount !== null ? activeUserCount : "Loading..."}</p>
            </div>
          </div>
        </div>
        {/* Additional cards or statistics can be added here */}
      </div>
    </div>
  );
}
