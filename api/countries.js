// export default {
//   async fetch() {
//     const apiKey = process.env.REST_COUNTRIES_API_KEY;

//     if (!apiKey) {
//       return Response.json(
//         { error: "REST Countries API key is not configured." },
//         { status: 500 },
//       );
//     }

//     try {
//       const response = await fetch(
//         "https://api.restcountries.com/countries/v5/names.common/Portugal",
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//           },
//         },
//       );

//       const result = await response.json();

//       return Response.json(result, {
//         status: response.status,
//       });
//     } catch (error) {
//       console.error(error);

//       return Response.json(
//         { error: "Failed to fetch Portugal." },
//         { status: 500 },
//       );
//     }
//   },
// };

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
      "https://api.restcountries.com/countries/v5?limit=100&offset=0",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const result = await response.json();

    return Response.json({
      meta: result.data?.meta,
      countries: result.data?.objects?.map((country) => country.names.common),
    });
  },
};
