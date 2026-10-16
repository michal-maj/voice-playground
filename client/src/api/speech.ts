import type { Voice } from "../types";

async function getErrorMessage(response: Response, fallback: string) {
  const payload: unknown = await response.json().catch(() => null);
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }
  return fallback;
}

export async function fetchVoices(signal?: AbortSignal): Promise<Voice[]> {
  const response = await fetch("/api/voices", { signal });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Unable to load voices"));
  }

  const payload = (await response.json()) as { voices: Voice[] };
  return payload.voices;
}

export async function generateSpeech(text: string, voiceId: string) {
  const response = await fetch("/api/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voiceId }),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Could not generate audio"),
    );
  }

  return response.blob();
}
