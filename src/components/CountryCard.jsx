// Reusable card component for displaying country summary information

import { Link } from "react-router-dom";

export default function CountryCard({ theme, country }) {
  return (
    <Link to={`/country/${country.name.common}`}>
      <div
        className={`rounded-sm overflow-hidden shadow-md
      ${
        theme === "light" ? "bg-white text-gray-900" : "bg-[#2B3945] text-white"
      }`}
      >
        <img
          className="w-full h-40 object-cover"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
        />

        <div className="px-6 pt-5 pb-12 space-y-4">
          <h2 className="text-2xl font-bold">{country.name.common}</h2>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Population: </span>
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region: </span>
              {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital: </span>
              {country.capital?.[0]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
