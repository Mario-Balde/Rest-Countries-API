import { useState } from "react";

import countriesData from "../data/countries.json";
import { CountryCard } from "../components/CountryCard";

export function Home() {
  //Stores mock JSON in useState
  const [countries] = useState(countriesData);

  return (
    <div>
      {countries.map((country) => (
        <CountryCard key={country.alpha3Code} country={country} />
      ))}
    </div>
  );
}
