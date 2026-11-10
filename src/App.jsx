/* Main application component that manages theme preferences, renders the shared header, 
and defines the application routes. */

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

export default function App({ initialCountries = [] }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      const frameId = window.requestAnimationFrame(() => {
        setTheme(savedTheme);
      });

      return () => window.cancelAnimationFrame(frameId);
    }
  }, []);

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
        <Route
          path="/"
          element={<Home theme={theme} initialCountries={initialCountries} />}
        />

        <Route
          path="/country/:name"
          element={
            <CountryDetails theme={theme} initialCountries={initialCountries} />
          }
        />
      </Routes>
    </div>
  );
}
