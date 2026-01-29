import React from "react";
import { useLocation } from "react-router-dom";

export default function Recipe({ user, adminEmail }) {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) return <p>No recipe data available.</p>;

  const isAdmin = user?.email === adminEmail;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{recipe.name}</h1>
      {isAdmin && <p style={{ color: "red" }}>Admin Link</p>}

      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2>Steps:</h2>
      <ol>
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
