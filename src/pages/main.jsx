import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Example drink database
const DRINKS = [
  { name: "Mojito", ingredients: ["Mint", "Rum", "Sugar", "Lime"], alcohol: true },
  { name: "Virgin Mojito", ingredients: ["Mint", "Sugar", "Lime"], alcohol: false },
  { name: "Pina Colada", ingredients: ["Pineapple", "Coconut Cream", "Rum"], alcohol: true },
  { name: "Fruit Punch", ingredients: ["Orange", "Pineapple", "Grenadine"], alcohol: false },
  { name: "Martini", ingredients: ["Gin", "Vermouth"], alcohol: true },
  { name: "Lemonade", ingredients: ["Lemon", "Sugar", "Water"], alcohol: false }
];

export default function Main() {
  const navigate = useNavigate();
  const isOfLegalAge = sessionStorage.getItem("isOfLegalAge") === "true";
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const [search, setSearch] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const [randomDrinks, setRandomDrinks] = useState([]);

  useEffect(() => {
    generateRandomDrinks();
  }, []);

  useEffect(() => {
    filterDrinks();
  }, [search, ingredients]);

  const generateRandomDrinks = () => {
    const available = DRINKS.filter(d => isOfLegalAge || !d.alcohol);
    const shuffled = available.sort(() => 0.5 - Math.random());
    setRandomDrinks(shuffled.slice(0, 3));
  };

  const filterDrinks = () => {
    let filtered = DRINKS.filter(d => isOfLegalAge || !d.alcohol);

    if (search.trim() !== "") {
      filtered = filtered.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (ingredients.length > 0) {
      filtered = filtered.filter(d =>
        ingredients.every(i =>
          d.ingredients.some(di => di.toLowerCase() === i.toLowerCase())
        )
      );
    }

    setResults(filtered);
  };

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
    }
    setIngredientInput("");
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const goToRecipe = (drink) => {
    navigate("/recipe", { state: { drink } });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Thirsty Creator</h1>
      <p>{isOfLegalAge ? "Alcoholic + Non-Alcoholic Drinks" : "Non-Alcoholic Drinks Only"}</p>

      {/* Admin Link */}
      {isAdmin && (
        <p>
          <a href="/admin" style={{ color: "red", fontWeight: "bold" }}>
            Admin Panel
          </a>
        </p>
      )}

      {/* Search */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search drinks by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px", borderRadius: "8px", border: "2px solid #ff99c2" }}
        />
      </div>

      {/* Ingredients input */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Add ingredient"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          style={{ padding: "8px", width: "150px", borderRadius: "8px", border: "2px solid #ff99c2" }}
        />
        <button onClick={addIngredient} style={{ marginLeft: "10px", padding: "8px 16px" }}>
          Add
        </button>
      </div>

      {/* Ingredients list */}
      {ingredients.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <strong>Ingredients:</strong>{" "}
          {ingredients.map(i => (
            <span
              key={i}
              style={{
                margin: "0 5px",
                padding: "4px 8px",
                background: "#ffccff",
                borderRadius: "12px",
                cursor: "pointer"
              }}
              onClick={() => removeIngredient(i)}
            >
              {i} ×
            </span>
          ))}
        </div>
      )}

      {/* Filtered Results */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Results</h3>
        {results.length === 0 ? <p>No drinks found</p> :
          results.map(d => (
            <div
              key={d.name}
              style={{ margin: "10px 0", cursor: "pointer", color: "#ff3366" }}
              onClick={() => goToRecipe(d)}
            >
              {d.name} {d.alcohol && "(Alcohol)"}
            </div>
          ))}
      </div>

      {/* Random Drinks */}
      <div>
        <h3>Random Drinks</h3>
        {randomDrinks.map(d => (
          <div
            key={d.name}
            style={{ margin: "10px 0", cursor: "pointer", color: "#ff3366" }}
            onClick={() => goToRecipe(d)}
          >
            {d.name} {d.alcohol && "(Alcohol)"}
          </div>
        ))}
        <button onClick={generateRandomDrinks} style={{ marginTop: "10px", padding: "8px 16px" }}>
          Regenerate
        </button>
      </div>
    </div>
  );
}
