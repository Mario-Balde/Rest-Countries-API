// - Displaying information about ONE country.
// - Receives only one country object via props.

export default function CountryCard({ theme, country }) {
  return (
    <div
      className={`rounded-sm overflow-hidden shadow-md
      ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
      }`}
    >
      <img
        className="w-full h-40 object-cover"
        src={country.flags.png}
        alt={`Flag of ${country.name}`}
      />

      <div className="px-6 pt-5 pb-12 space-y-4">
        <h2 className="text-2xl font-bold">{country.name}</h2>
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
            {country.capital}
          </p>
        </div>
      </div>
    </div>
  );
}
