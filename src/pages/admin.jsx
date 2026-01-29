import React from "react";

export default function Admin() {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Admin Panel</h1>
      <p>Welcome, admin! You can manage recipes and users here.</p>
      {/* Placeholder for admin features */}
      <div style={{ marginTop: "30px" }}>
        <button style={{ padding: "10px 20px", background: "#ff66b3", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}>
          Add New Recipe
        </button>
      </div>
    </div>
  );
}
