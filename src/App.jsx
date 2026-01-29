import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Recipe from "./pages/Recipe";
import Admin from "./pages/Admin";

const SPLASH_1_IMAGE = "/freshfox-logo.png";
const SPLASH_2_IMAGE = "/drinks.png";
const JINGLE_AUDIO = "/jinglemix.mp3";
const LEGAL_AGE = 19;
const ADMIN_EMAIL = "hcandlish2014@gmail.com";

export default function App() {
  const [stage, setStage] = useState("splash1");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (!user) {
      const audio = new Audio(JINGLE_AUDIO);
      audio.play().catch(() => {});

      const t1 = setTimeout(() => setStage("splash2"), 4000);
      const t2 = setTimeout(() => setStage("signup"), 12000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        audio.pause();
      };
    } else {
      setStage("main");
    }
  }, [user]);

  const handleSignUpComplete = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
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
