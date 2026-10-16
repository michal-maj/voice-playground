import "dotenv/config";

export const config = {
  port: Number(process.env.PORT || 3001),
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
  elevenLabsBaseUrl: "https://api.elevenlabs.io",
};
