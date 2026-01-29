import React, { useState, useEffect } from "react";

export default function SignUp({ onComplete }) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  });
  const [isExisting, setIsExisting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const checkExistingUser = () => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    setIsExisting(!!found);
    return found;
  };

  const handleSignIn = () => {
    const user = checkExistingUser();
    if (!user) {
      setError("Email not found. Please sign up.");
      return;
    }
    const age = calculateAge(new Date(user.birthdate));
    onComplete(user.name, user.email, age);
  };

  const handleSignUp = () => {
    if (!name || !email || !birthdate) {
      setError("All fields are required.");
      return;
    }
    const newUser = { name, email, birthdate };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    const age = calculateAge(new Date(birthdate));
    onComplete(name, email, age);
  };

  const calculateAge = dob => {
    const diff = new Date() - dob;
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 365.25);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>{isExisting ? "Sign In" : "Sign Up"}</h1>
      {!isExisting && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        onBlur={checkExistingUser}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      {!isExisting && (
        <input
          type="date"
          placeholder="Birthdate"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={isExisting ? handleSignIn : handleSignUp}
        style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer" }}
      >
        {isExisting ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
}
