import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Recipe from "./pages/Recipe";
import Admin from "./pages/Admin";

const SPLASH_1_IMAGE = "/freshfox-logo.png";
const SPLASH_2_IMAGE = "/drinks.png";
const JINGLE_AUDIO = "/jinglemix.mp3";
const LEGAL_AGE = 21;
const ADMIN_EMAIL = "hcandlish2014@gmail.com";

export default function App() {
  const [page, setPage] = useState("splash1");
  const [ageConfirmed, setAgeConfirmed] = useState(sessionStorage.getItem("ageConfirmed") === "true");
  const [isOfLegalAge, setIsOfLegalAge] = useState(sessionStorage.getItem("isOfLegalAge") === "true");
  const [authEmail, setAuthEmail] = useState(sessionStorage.getItem("authEmail") || "");

  useEffect(() => {
    let splash2Timer, ageGateTimer;
    const audio = new Audio(JINGLE_AUDIO);

    const playAudio = async () => {
      try { await audio.play(); } 
      catch {}
    };

    if (!ageConfirmed) {
      playAudio();

      // Splash1 → Splash2
      const splash1Timer = setTimeout(() => setPage("splash2"), 5000);

      // Splash2 → AgeGate
      splash2Timer = setTimeout(() => setPage("ageGate"), 15000);

      return () => {
        audio.pause();
        clearTimeout(splash1Timer);
        clearTimeout(splash2Timer);
        clearTimeout(ageGateTimer);
      };
    }
  }, [ageConfirmed]);

  const handleAgeSubmit = (age) => {
    const legal = age >= LEGAL_AGE;
    setIsOfLegalAge(legal);
    setAgeConfirmed(true);
    sessionStorage.setItem("ageConfirmed", "true");
    sessionStorage.setItem("isOfLegalAge", legal.toString());
    setPage("auth");
  };

  const handleAuthComplete = (email) => {
    const isAdmin = email === ADMIN_EMAIL;
    sessionStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    sessionStorage.setItem("authEmail", email);
    setAuthEmail(email);
    setPage("main");
  };

  if (page === "splash1") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <img src={SPLASH_1_IMAGE} alt="Freshfox Logo" width="300" />
      </div>
    );
  }

  if (page === "splash2") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <img src={SPLASH_2_IMAGE} alt="Drinks" width="300" />
      </div>
    );
  }

  if (page === "ageGate") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Age Verification</h1>
        <p>Please enter your age:</p>
        <input type="number" id="ageInput" placeholder="Your age" />
        <button onClick={() => {
          const age = parseInt(document.getElementById("ageInput").value, 10);
          if (!isNaN(age)) handleAgeSubmit(age);
          else alert("Please enter a valid age");
        }}>Submit</button>
      </div>
    );
  }

  if (page === "auth") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Sign Up / Sign In</h1>
        <input type="email" id="emailInput" placeholder="Your email" />
        <button onClick={() => {
          const email = document.getElementById("emailInput").value.trim();
          if (email) handleAuthComplete(email);
          else alert("Please enter an email");
        }}>Continue</button>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Main isOfLegalAge={isOfLegalAge} authEmail={authEmail} />} />
      <Route path="/recipe" element={<Recipe isOfLegalAge={isOfLegalAge} />} />
      <Route path="/admin" element={<Admin authEmail={authEmail} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
