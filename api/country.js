export default {
  async fetch(request) {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "REST Countries API key is not configured." },
        { status: 500 },
      );
    }

    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (!name) {
      return Response.json(
        { error: "Country name is required." },
        { status: 400 },
      );
    }

    try {
      // Fetch the selected country
      const response = await fetch(
        `https://api.restcountries.com/countries/v5/names.common/${encodeURIComponent(name)}`,
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
      const country = result.data.objects[0];

      // Fetch border countries
      const borderCountries = await Promise.all(
        (country.borders ?? []).filter(Boolean).map(async (code) => {
          const borderResponse = await fetch(
            `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            },
          );

          if (!borderResponse.ok) {
            return null;
          }

          const borderResult = await borderResponse.json();
          const border = borderResult.data.objects[0];

          return {
            name: {
              common: border.names.common,
            },
            cca3: border.codes.alpha_3,
          };
        }),
      );

      return Response.json({
        country: {
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
        },

        borderCountries: borderCountries.filter(Boolean),
      });
    } catch (error) {
      console.error(error);

      return Response.json(
        { error: "Failed to fetch country." },
        { status: 500 },
      );
    }
  },
};
