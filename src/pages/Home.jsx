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
import { useEffect } from "react";

import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import Search from "../components/Search";

export default function Home({ theme }) {
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Runs once when the component mounts (because of [])
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3", // Makes a request to the REST Countries API
    )
      .then((response) => response.json()) // Makes a request to the REST Countries API
      .then((data) => {
        setCountries(data);
        setLoading(false);
      }); // Stores the fetched data into React state (countries)
  }, []); // Empty dependency array → run only once when component loads

  let filtered = countries;

  //Region filter
  if (selectedRegion !== "All") {
    filtered = filtered.filter((country) => country.region === selectedRegion);
  }

  //Search filter
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
          <CountryCard theme={theme} key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useEffect } from "react";

// import CountryCard from "../components/CountryCard";
// import Filter from "../components/Filter";
// import Search from "../components/Search";

// export default function Home({ theme }) {
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Runs once when the component mounts (because of [])
//     fetch(
//       "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3", // Makes a request to the REST Countries API
//     )
//       .then((response) => response.json()) // Makes a request to the REST Countries API
//       .then((data) => setCountries(data)); // Stores the fetched data into React state (countries)
//   }, []); // Empty dependency array → run only once when component loads

//   let filtered = countries;

//   //Region filter
//   if (selectedRegion !== "All") {
//     filtered = filtered.filter((country) => country.region === selectedRegion);
//   }

//   //Search filter
//   if (searchTerm.trim() !== "") {
//     filtered = filtered.filter((country) =>
//       country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//   }

//   const displayCountries = filtered;

//   return (
//     <div className="px-6 mt-10">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-10 md:space-y-0">
//         <div className="w-full max-w-lg">
//           <Search theme={theme} value={searchTerm} onChange={setSearchTerm} />
//         </div>
//         <div className="w-56">
//           <Filter
//             theme={theme}
//             value={selectedRegion}
//             onChange={setSelectedRegion}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-12 py-10 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {displayCountries.map((country) => (
//           <CountryCard theme={theme} key={country.cca3} country={country} />
//         ))}
//       </div>
//     </div>
//   );
// }
