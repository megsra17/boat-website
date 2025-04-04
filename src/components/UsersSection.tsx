"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string; // or null if you use initials
}

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch user list from your API
    // Adjust the endpoint as needed (e.g., /api/users).
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users); // assume { users: [...] }
          setFilteredUsers(data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Filter users whenever 'search' changes
  useEffect(() => {
    if (!search) {
      setFilteredUsers(users);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(lowerSearch) ||
            u.username.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, users]);

  // Helper for user initials if no avatar
  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  }

  return (
    <div className="p-3" style={{ backgroundColor: "#1f1f1f", color: "#fff" }}>
      {/* Header Row: Search & Add New */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center" style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: "#2b2b2b",
              border: "1px solid #444",
              color: "#fff",
            }}
          />
          <i
            className="bi bi-search ms-2"
            style={{ fontSize: "1.2rem", color: "#ccc" }}
          ></i>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => console.log("Add New clicked")}
        >
          + Add New
        </button>
      </div>

      {/* Table-like list */}
      <div
        className="rounded"
        style={{
          backgroundColor: "#2b2b2b",
          border: "1px solid #444",
          padding: "1rem",
        }}
      >
        <div
          className="d-flex justify-content-between mb-2 px-2"
          style={{ color: "#ccc" }}
        >
          <span style={{ width: "30%" }}>Name</span>
          <span style={{ width: "30%" }}>Username</span>
          <span style={{ width: "10%" }}></span>
        </div>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="d-flex align-items-center mb-2 px-2"
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "4px",
              padding: "0.5rem 0",
            }}
          >
            {/* Name column */}
            <div style={{ width: "30%" }} className="d-flex align-items-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    marginRight: "8px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    backgroundColor: "#444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#fff",
                    marginRight: 8,
                  }}
                >
                  {getInitials(user.name)}
                </div>
              )}
              <span>{user.name}</span>
            </div>
            {/* Username column */}
            <div style={{ width: "30%" }}>{user.username}</div>
            {/* Actions column */}
            <div
              style={{ width: "10%" }}
              className="d-flex justify-content-end gap-2"
            >
              {/* Example icons for Edit/Delete. Replace with your logic. */}
              <button
                className="btn p-0"
                style={{ color: "#ccc", background: "none", border: "none" }}
                onClick={() => console.log("Edit user:", user.id)}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn p-0"
                style={{ color: "#ccc", background: "none", border: "none" }}
                onClick={() => console.log("Delete user:", user.id)}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
