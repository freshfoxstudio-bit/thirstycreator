import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Recipe from "./pages/Recipe";
import Admin from "./pages/Admin";

const SPLASH_1_IMAGE = "/freshfox-logo.png";
const SPLASH_2_IMAGE = "/drinks.png";
const JINGLE_AUDIO = "/jinglemix.mp3";
const LEGAL_AGE = 19; // minimum age for alcoholic drinks
const ADMIN_EMAIL = "hcandlish2014@gmail.com";

export default function App() {
  const [stage, setStage] = useState("splash1");
  const [user, setUser] = useState(null); // { name, email, age }

  useEffect(() => {
    const audio = new Audio(JINGLE_AUDIO);
    audio.play().catch(() => {});

    const t1 = setTimeout(() => setStage("splash2"), 4000); // splash1 → splash2
    const t2 = setTimeout(() => setStage("signup"), 12000); // splash2 → signup

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      audio.pause();
    };
  }, []);

  const handleSignUpComplete = (name, email, age) => {
    setUser({ name, email, age });
    setStage("main");
  };

  if (stage === "splash1") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <img src={SPLASH_1_IMAGE} width="300" />
      </div>
    );
  }

  if (stage === "splash2") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <img src={SPLASH_2_IMAGE} width="300" />
      </div>
    );
  }

  if (stage === "signup") {
    return <SignUp onComplete={handleSignUpComplete} />;
  }

  // stage === "main" → show router
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main user={user} legalAge={LEGAL_AGE} adminEmail={ADMIN_EMAIL} />}
        />
        <Route path="/recipe" element={<Recipe user={user} adminEmail={ADMIN_EMAIL} />} />
        <Route path="/admin" element={<Admin user={user} adminEmail={ADMIN_EMAIL} />} />
      </Routes>
    </BrowserRouter>
  );
}
