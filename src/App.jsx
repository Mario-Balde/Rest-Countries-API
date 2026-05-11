// Main application layout with theme persistence and routing
//Own toggle theme state and locaStorage

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-[#202C37] text-white"
      }`}
    >
      <Header theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home theme={theme} />} />

        <Route
          path="/country/:name"
          element={<CountryDetails theme={theme} />}
        />
      </Routes>
    </div>
  );
}
