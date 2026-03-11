// - Rendering region options (dropdown/buttons)
// - Notifying parent when selection changes
// - Receives: Current selected value & Change handler
// - NOT responsible for: Filtering logic, Country data, Search logic.
// - Summary: “Filter won't apply the filter — it reports user intent.”

export default function Filter({ theme, value, onChange }) {
  return (
    <div>
      <select
        className={`w-full rounded-sm shadow-md px-6 py-4 border-none outline-none 
          ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
