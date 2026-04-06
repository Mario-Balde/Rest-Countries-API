//Own toggle theme state and locaStorage

import { useState } from "react";
import { useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";

export function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${theme === "light" ? "bg-gray-50" : "bg-gray-950"}`}
    >
      <Header theme={theme} setTheme={setTheme} />
      <Home theme={theme} />
    </div>
  );
}

// import { useState } from "react";
// import { useEffect } from "react";
// import Home from "./pages/Home";
// import Header from "./components/Header";

// export function App() {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div
//       className={`min-h-screen overflow-x-hidden ${theme === "light" ? "bg-gray-50" : "bg-gray-950"}`}
//     >
//       <Header theme={theme} setTheme={setTheme} />
//       <Home theme={theme} />
//     </div>
//   );
// }
