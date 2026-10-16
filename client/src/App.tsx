import { useEffect, useRef, useState } from "react";
import { fetchVoices, generateSpeech } from "./api/speech";
import { AudioResult } from "./components/AudioResult";
import { PageFooter } from "./components/PageFooter";
import { PageHeader } from "./components/PageHeader";
import { SpeechForm } from "./components/SpeechForm";
import type { Voice } from "./types";

export function App() {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [voiceId, setVoiceId] = useState("");
    const [text, setText] = useState(
        "The best products turn complex technology into something that feels simple.",
    );
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingVoices, setLoadingVoices] = useState(true);
    const [error, setError] = useState("");
    const currentUrl = useRef<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchVoices(controller.signal)
            .then((availableVoices) => {
                setVoices(availableVoices);
                setVoiceId(availableVoices[0]?.id ?? "");
            })
            .catch((err: unknown) => {
                if (!controller.signal.aborted) {
                    setError(err instanceof Error ? err.message : "Unknown error");
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoadingVoices(false);
            });

        return () => {
            controller.abort();
            if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
        };
    }, []);

    async function generate() {
        const trimmedText = text.trim();
        if (loading || !voiceId || !trimmedText) return;

        setLoading(true);
        setError("");
        try {
            const blob = await generateSpeech(trimmedText, voiceId);
            const nextUrl = URL.createObjectURL(blob);
            if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
            currentUrl.current = nextUrl;
            setAudioUrl(nextUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page">
            <div className="shell">
                <PageHeader />
                <SpeechForm
                    voices={voices}
                    voiceId={voiceId}
                    text={text}
                    loading={loading}
                    loadingVoices={loadingVoices}
                    error={error}
                    onVoiceChange={setVoiceId}
                    onTextChange={setText}
                    onGenerate={generate}
                />
                <AudioResult audioUrl={audioUrl} />
                <PageFooter />
            </div>
        </main>
    );
}