import { Router } from "express";
import { z } from "zod";
import { config } from "../config.js";

const router = Router();
const speechRequestSchema = z.object({
  text: z.string().trim().min(1).max(1000),
  voiceId: z.string().regex(/^[a-zA-Z0-9_-]{8,80}$/),
});

router.post("/speech", async (req, res) => {
  if (!config.elevenLabsApiKey) {
    res.status(503).json({ error: "Server API key is not configured." });
    return;
  }

  const parsed = speechRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: "Enter up to 1000 characters and select a valid voice." });
    return;
  }

  const { text, voiceId } = parsed.data;
  try {
    const response = await fetch(
      `${config.elevenLabsBaseUrl}/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": config.elevenLabsApiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({ text, model_id: "eleven_multilingual_v2" }),
        signal: AbortSignal.timeout(45000),
      },
    );

    if (!response.ok) {
      res.status(response.status).json({
        error:
          response.status === 429
            ? "Rate limit reached. Try later."
            : `Speech generation failed (${response.status}). Check API permissions or credits.`,
      });
      return;
    }

    const bytes = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.send(Buffer.from(bytes));
  } catch {
    res.status(502).json({
      error: "Speech service timed out or is unavailable.",
    });
  }
});

export default router;
