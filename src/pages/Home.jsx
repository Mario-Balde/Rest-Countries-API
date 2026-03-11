// - Owning state (countries, search, filter)
// - Importing mock JSON
// - Combining search + filter logic
// - Mapping countries → cards
// - Composing child components

// - NOT responsible for:**
// - Low-level UI details
// - Reusable UI patterns
// Summary: “Home.jsx decides WHAT to show; components decide HOW to show it.”

import { useState } from "react";

import countriesData from "../data/countries.json";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import Search from "../components/Search";

export default function Home({ theme }) {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [countries] = useState(countriesData); //Stores mock JSON in useState

  const [searchTerm, setSearchTerm] = useState("");

  let filtered = countries;

  //Region filter
  if (selectedRegion !== "All") {
    filtered = filtered.filter((country) => country.region === selectedRegion);
  }

  //Search filter
  if (searchTerm.trim() !== "") {
    filtered = filtered.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  const displayCountries = filtered;

  return (
    <div className="px-6 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-10 md:space-y-0">
        <div className="w-full max-w-lg">
          <Search theme={theme} value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="w-56">
          <Filter
            theme={theme}
            value={selectedRegion}
            onChange={setSelectedRegion}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 py-10 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayCountries.map((country) => (
          <CountryCard
            theme={theme}
            key={country.alpha3Code}
            country={country}
          />
        ))}
      </div>
    </div>
  );
}
