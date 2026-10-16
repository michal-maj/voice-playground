import express from "express";
import speechRouter from "./routes/speech.js";
import voicesRouter from "./routes/voices.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "12kb" }));
app.use("/api", voicesRouter, speechRouter);
