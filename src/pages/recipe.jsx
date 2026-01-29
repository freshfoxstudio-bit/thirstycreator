import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Recipe() {
  const navigate = useNavigate();

  // Grab drink data passed via state
  const location = useLocation();
  const drink = location.state?.drink;

  if (!drink) {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Drink Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: "20px", padding: "8px 16px", borderRadius: "12px", background: "#ff66b3", color: "white", border: "none", cursor: "pointer" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{drink.name}</h1>
      <p>{drink.alcohol ? "Contains Alcohol" : "Non-Alcoholic"}</p>

      <h3>Ingredients:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {drink.ingredients.map((ing) => (
          <li key={ing} style={{ margin: "5px 0", padding: "5px", background: "#ffccff", borderRadius: "8px" }}>
            {ing}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <p style={{ marginTop: "20px" }}>
          <a href="/admin" style={{ color: "red", fontWeight: "bold" }}>
            Admin Panel
          </a>
        </p>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: "30px", padding: "8px 16px", borderRadius: "12px", background: "#ff66b3", color: "white", border: "none", cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
}
