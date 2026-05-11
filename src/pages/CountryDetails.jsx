import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryDetail({ theme }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { name } = useParams();
  const [country, setCountry] = useState(null);

  // Store fetched border country data
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch country");
        }

        return res.json();
      })
      .then((data) => setCountry(data[0]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [name]);

  // Fetch border country details using border country codes
  useEffect(() => {
    if (!country?.borders) return;
    fetch(
      `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`,
    )
      .then((res) => res.json())
      .then((data) => setBorderCountries(data));
  }, [country]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((item) => item.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <main
      className={`p-6 md:p-12 ${
        theme === "light" ? "text-gray-900" : "text-white"
      }`}
    >
      <Link
        to="/"
        className={`inline-flex items-center gap-2 px-6 py-2 shadow rounded mb-12
        ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
      >
        ← Back
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* FLAG */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full max-w-lg"
        />

        {/* CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {country.name.common}
          </h1>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* LEFT COLUMN */}
            <div className="space-y-2">
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital?.[0]}
              </p>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-2">
              <p>
                <strong>Top Level Domain:</strong> {country.tld?.join(", ")}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies}
              </p>
              <p>
                <strong>Languages:</strong> {languages}
              </p>
            </div>
          </div>

          {/* BORDERS */}
          <div className="flex flex-wrap gap-3 items-center">
            <strong>Border Countries:</strong>

            {borderCountries.length ? (
              borderCountries.map((border) => (
                <Link
                  key={border.cca3}
                  to={`/country/${border.name.common}`}
                  className={`px-4 py-1 shadow rounded text-sm
                  ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
                >
                  {border.name.common}
                </Link>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
