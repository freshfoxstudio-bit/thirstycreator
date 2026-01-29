import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Example list of drinks (name + alcohol flag)
const DRINKS = [
  { name: "Sunset Cooler", alcohol: true },
  { name: "Tropical Punch", alcohol: false },
  { name: "Minty Mojito", alcohol: true },
  { name: "Berry Lemonade", alcohol: false },
  { name: "Spicy Margarita", alcohol: true },
  { name: "Cucumber Fizz", alcohol: false },
  { name: "Electric Sunrise", alcohol: true },
  { name: "Pineapple Delight", alcohol: false }
];

export default function Main({ user, legalAge, adminEmail }) {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Filter drinks based on age
    const available = DRINKS.filter(d => {
      if (user.age >= legalAge) return true;
      return !d.alcohol;
    });

    // Shuffle drinks for randomness
    setDrinks(available.sort(() => Math.random() - 0.5));
  }, [user, legalAge]);

  // Auto-generate recipe (simple algorithm)
  const generateRecipe = drinkName => {
    const ingredients = [
      "Ice cubes",
      "Lemon juice",
      "Soda water",
      "Mint leaves",
      "Sugar syrup",
      "Orange slice",
      "Pineapple juice",
      "Grenadine",
      "Rum",
      "Tequila"
    ];

    const steps = [
      "Fill a glass with ice cubes",
      "Add 2-3 ingredients",
      "Stir gently",
      "Garnish with a slice of fruit",
      "Serve immediately"
    ];

    // Randomize 3-4 ingredients
    const selectedIngredients = ingredients.sort(() => 0.5 - Math.random()).slice(0, 4);

    return {
      name: drinkName,
      ingredients: selectedIngredients,
      steps
    };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      {user.age < legalAge && <p>Only non-alcoholic drinks are shown.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
        {drinks.map((drink, i) => (
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
            onClick={() => navigate("/recipe", { state: { recipe: generateRecipe(drink.name) } })}
          >
            <span>{drink.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
