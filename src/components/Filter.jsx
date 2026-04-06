// - Rendering region options (dropdown/buttons)
// - Notifying parent when selection changes
// - Receives: Current selected value & Change handler
// - NOT responsible for: Filtering logic, Country data, Search logic.
// - Summary: “Filter won't apply the filter — it reports user intent.”

import { useState } from "react";

export default function Filter({ theme, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="relative w-full">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full rounded-md shadow-md px-6 py-4 text-sm flex justify-between items-center
          ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
      >
        {value === "All" ? "Filter by Region" : value}

        {/* Arrow */}
        <span className="ml-2">▼</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-full rounded-md shadow-lg z-10
            ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-white"
            }`}
        >
          <div className="py-2">
            {/* All option */}
            <button
              onClick={() => {
                onChange("All");
                setIsOpen(false);
              }}
              className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              All
            </button>

            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  onChange(region);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// export default function Filter({ theme, value, onChange }) {
//   return (
//     <div>
//       <select
//         className={`w-full rounded-sm shadow-md px-6 py-4 border-none outline-none
//           ${
//             theme === "light"
//               ? "bg-white text-gray-900"
//               : "bg-gray-800 text-white"
//           }`}
//         value={value}
//         onChange={(event) => onChange(event.target.value)}
//       >
//         <option value="All">Filter by Region</option>
//         <option value="Africa">Africa</option>
//         <option value="Americas">Americas</option>
//         <option value="Asia">Asia</option>
//         <option value="Europe">Europe</option>
//         <option value="Oceania">Oceania</option>
//       </select>
//     </div>
//   );
// }
