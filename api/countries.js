export default {
  async fetch() {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "REST Countries API key is not configured." },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://api.restcountries.com/countries/v5?limit=3",
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

    const data = await response.json();

    return Response.json(data);
  },
};
