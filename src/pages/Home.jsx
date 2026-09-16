// Homepage component responsible for fetching and filtering countries

import { useState } from "react";
import { useSelector } from "react-redux";

import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import Search from "../components/Search";

export default function Home({ theme }) {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  // Get filter and search state from Redux
  const selectedRegion = useSelector((state) => state.region.selectedRegion);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      return response.json();
    })
    .then((data) => {
      setCountries(data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });

  let filtered = countries;

  // Apply region filter
  if (selectedRegion !== "All") {
    filtered = filtered.filter((country) => country.region === selectedRegion);
  }

  // Apply search filter
  if (searchTerm.trim() !== "") {
    filtered = filtered.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  const displayCountries = filtered;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-6 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-10 md:space-y-0">
        <div className="w-full max-w-lg">
          <Search theme={theme} />
        </div>

        <div className="w-56">
          <Filter theme={theme} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 py-10 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayCountries.map((country) => (
          <CountryCard theme={theme} key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}
