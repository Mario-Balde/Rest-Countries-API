export function normaliseCountry(country) {
  return {
    name: {
      common: country.names?.common || "Unknown",
      nativeName: country.names?.native || {},
    },

    flags: {
      png: country.flag?.url_png || "",
      svg: country.flag?.url_svg || "",
      alt: country.flag?.alt || "",
    },

    population: country.population || 0,

    region: country.region || "",

    subregion: country.subregion || "",

    capital: country.capitals?.map((capital) => capital.name) || [],

    cca3: country.codes?.alpha_3 || "",

    tld: country.tld || [],

    currencies: country.currencies || {},

    languages: country.languages || {},

    borders: country.borders || [],
  };
}
