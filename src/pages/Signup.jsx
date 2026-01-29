import React, { useState } from "react";

export default function SignUp({ onComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !birthday) {
      alert("All fields are required!");
      return;
    }
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    onComplete({ name, email, age, birthday });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Sign Up / Sign In</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />
      <input
        type="date"
        placeholder="Birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "15px" }}>
        Continue
      </button>
    </div>
  );
}
