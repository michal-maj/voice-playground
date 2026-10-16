import { Router } from "express";
import { config } from "../config.js";

const router = Router();

router.get("/voices", async (_req, res) => {
  if (!config.elevenLabsApiKey) {
    res.status(503).json({ error: "Server API key is not configured." });
    return;
  }

  try {
    const response = await fetch(
      `${config.elevenLabsBaseUrl}/v2/voices?page_size=40`,
      {
        headers: { "xi-api-key": config.elevenLabsApiKey },
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: `Unable to load voices (${response.status}).` });
      return;
    }

    const payload = (await response.json()) as {
      voices?: Array<{ voice_id?: string; name?: string }>;
    };

    res.json({
      voices: (payload.voices ?? [])
        .filter((voice) => voice.voice_id && voice.name)
        .map((voice) => ({ id: voice.voice_id, name: voice.name })),
    });
  } catch {
    res.status(502).json({
      error: "Voice service is unavailable. Try again.",
    });
  }
});

export default router;
