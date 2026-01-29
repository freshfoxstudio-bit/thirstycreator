import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DRINKS = [
  "Sunset Cooler",
  "Tropical Punch",
  "Minty Mojito",
  "Berry Lemonade",
  "Spicy Margarita",
  "Cucumber Fizz",
  "Electric Sunrise",
  "Pineapple Delight"
];

export default function Main({ user, legalAge, adminEmail }) {
  const navigate = useNavigate();
  const [availableDrinks, setAvailableDrinks] = useState([]);

  useEffect(() => {
    const filtered = DRINKS.filter(name => {
      const alcoholic = ["Mojito", "Margarita", "Sunset Cooler", "Electric Sunrise"].some(a => name.includes(a));
      return user.age >= legalAge || !alcoholic;
    });
    setAvailableDrinks(filtered.sort(() => Math.random() - 0.5));
  }, [user, legalAge]);

  const handleClick = async (drinkName) => {
    try {
      const response = await axios.post("/api/generateRecipe", {
        drinkName,
        age: user.age
      });

      const recipe = response.data;
      navigate("/recipe", { state: { recipe } });
    } catch (err) {
      console.error(err);
      alert("Failed to generate recipe. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      {user.age < legalAge && <p>Only non-alcoholic drinks are shown.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
        {availableDrinks.map((drink, i) => (
          <div
            key={i}
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.2)"
            }}
            onClick={() => handleClick(drink)}
          >
            {drink}
          </div>
        ))}
      </div>
    </div>
  );
}
