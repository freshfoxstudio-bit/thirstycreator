import React, { useState, useEffect } from "react";

// Constants
const SPLASH_1_IMAGE = "/freshfox-logo.png";
const SPLASH_2_IMAGE = "/drinks.png";
const JINGLE_AUDIO = "/jinglemix.mp3";
const LEGAL_AGE = 21; // adjust for your region
const ADMIN_EMAIL = "hcandlish2014@gmail.com";

export default function App() {
  const [page, setPage] = useState("splash1"); // splash1 → splash2 → ageGate → auth → main
  const [ageConfirmed, setAgeConfirmed] = useState(
    sessionStorage.getItem("ageConfirmed") === "true"
  );
  const [isOfLegalAge, setIsOfLegalAge] = useState(
    sessionStorage.getItem("isOfLegalAge") === "true"
  );
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    // Only run splash if age not confirmed
    if (!ageConfirmed && !audioPlayed) {
      const audio = new Audio(JINGLE_AUDIO);
      audio.play();
      setAudioPlayed(true);

      // Splash 1 → Splash 2
      const splash1Timer = setTimeout(() => setPage("splash2"), 5000); // first image duration
      // Splash 2 → Age Gate when audio ends
      audio.onended = () => setPage("ageGate");

      // fallback: in case audio fails, advance after 20s total
      const fallback = setTimeout(() => setPage("ageGate"), 20000);

      return () => {
        audio.pause();
        clearTimeout(splash1Timer);
        clearTimeout(fallback);
      };
    }
  }, [ageConfirmed, audioPlayed]);

  // Handle age gate confirmation
  const handleAgeSubmit = (age) => {
    const legal = age >= LEGAL_AGE;
    setIsOfLegalAge(legal);
    setAgeConfirmed(true);
    sessionStorage.setItem("ageConfirmed", "true");
    sessionStorage.setItem("isOfLegalAge", legal.toString());
    setPage("auth");
  };

  // Placeholder Sign In / Sign Up page
  const handleAuthComplete = (email) => {
    // Store admin status in session
    const isAdmin = email === ADMIN_EMAIL;
    sessionStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    setPage("main");
  };

  // Render logic
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
        <input
          type="number"
          id="ageInput"
          placeholder="Your age"
          style={{ fontSize: "16px", padding: "8px", width: "80px" }}
        />
        <button
          style={{ marginLeft: "10px", padding: "8px 16px", fontSize: "16px" }}
          onClick={() => {
            const age = parseInt(document.getElementById("ageInput").value, 10);
            if (!isNaN(age)) handleAgeSubmit(age);
            else alert("Please enter a valid age");
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  if (page === "auth") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Sign Up / Sign In</h1>
        <input
          type="email"
          id="emailInput"
          placeholder="Your email"
          style={{ fontSize: "16px", padding: "8px", width: "250px" }}
        />
        <button
          style={{ marginLeft: "10px", padding: "8px 16px", fontSize: "16px" }}
          onClick={() => {
            const email = document.getElementById("emailInput").value.trim();
            if (email) handleAuthComplete(email);
            else alert("Please enter an email");
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  if (page === "main") {
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Thirsty Creator</h1>
        {isOfLegalAge ? (
          <p>Showing alcoholic and non-alcoholic drinks</p>
        ) : (
          <p>Showing non-alcoholic drinks only</p>
        )}
        {isAdmin && (
          <p>
            <a href="/admin" style={{ color: "red", fontWeight: "bold" }}>
              Admin Panel
            </a>
          </p>
        )}
        <p>Main drink generator goes here...</p>
      </div>
    );
  }

  return null;
}
