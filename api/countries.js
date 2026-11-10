export default {
  async fetch() {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "REST Countries API key is not configured." },
        { status: 500 },
      );
    }

    const allCountries = [];
    const limit = 100;
    let offset = 0;
    let more = true;

    try {
      while (more) {
        const response = await fetch(
          `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );

        if (!response.ok) {
          const error = await response.text();

          return new Response(error, {
            status: response.status,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        const result = await response.json();

        allCountries.push(...result.data.objects);

        more = result.data.meta.more;
        offset += limit;
      }

      const countries = allCountries.map((country) => ({
        name: {
          common: country.names.common,
          nativeName: country.names.native,
        },
        flags: {
          png: country.flag.url_png,
          svg: country.flag.url_svg,
          alt: country.flag.description,
        },
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        capital: country.capitals?.map((capital) => capital.name) ?? [],
        tld: country.tld ?? [],
        currencies: country.currencies ?? {},
        languages: country.languages ?? {},
        borders: country.borders ?? [],
        cca3: country.codes.alpha_3,
      }));

      return Response.json(countries, {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    } catch (error) {
      console.error(error);

      return Response.json(
        { error: "Failed to fetch countries." },
        { status: 500 },
      );
    }
  },
};
