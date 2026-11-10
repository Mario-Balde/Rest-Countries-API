// Simple Vercel API endpoint used to verify that serverless functions are working correctly.

export default {
  fetch() {
    return Response.json({
      message: "Vercel Function is working!",
    });
  },
};
