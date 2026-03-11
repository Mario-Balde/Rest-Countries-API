// - Rendering a text input
// - Notifying parent when input changes
// - Receives "value" & "onChange" handler.

import { FiSearch } from "react-icons/fi";

export default function Search({ theme, value, onChange }) {
  return (
    <div
      className={`shadow-sm rounded-sm relative w-full 
        ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-white"
        }`}
    >
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch />
      </div>

      <input
        className="bg-transparent w-full pl-14 py-4 border-none outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a country..."
      />
    </div>
  );
}
