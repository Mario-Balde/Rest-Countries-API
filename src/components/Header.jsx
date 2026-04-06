// Displaying the app title/logo
// Displaying the theme toggle (later).

import { FiMoon, FiSun } from "react-icons/fi";
export default function Header({ theme, setTheme }) {
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div
      className={`${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}
    >
      <div className="flex justify-between items-center px-6 py-6 shadow-sm">
        <h1 className="font-bold">Where in the world?</h1>

        <button
          className="flex items-center gap-2 font-medium"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <>
              <FiMoon />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <FiSun />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}


// import { FiMoon, FiSun } from "react-icons/fi";
// export default function Header({ theme, setTheme }) {
//   function toggleTheme() {
//     setTheme(theme === "light" ? "dark" : "light");
//   }

//   return (
//     <div
//       className={`${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}
//     >
//       <div className="flex justify-between items-center px-6 py-6 shadow-sm">
//         <h1 className="font-bold">Where in the world?</h1>

//         <button
//           className="flex items-center gap-2 font-medium"
//           onClick={toggleTheme}
//         >
//           {theme === "light" ? (
//             <>
//               <FiMoon />
//               <span>Dark Mode</span>
//             </>
//           ) : (
//             <>
//               <FiSun />
//               <span>Light Mode</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }