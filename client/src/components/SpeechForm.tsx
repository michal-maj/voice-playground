import type { Voice } from "../types";

type SpeechFormProps = {
    voices: Voice[];
    voiceId: string;
    text: string;
    loading: boolean;
    loadingVoices: boolean;
    error: string;
    onVoiceChange: (voiceId: string) => void;
    onTextChange: (text: string) => void;
    onGenerate: () => void;
};

export function SpeechForm({
    voices,
    voiceId,
    text,
    loading,
    loadingVoices,
    error,
    onVoiceChange,
    onTextChange,
    onGenerate,
}: SpeechFormProps) {
    return (
        <section className="workspace" aria-label="Speech generator">
            <div className="section-heading">
                <span className="step">01</span>
                <h2>Create your audio</h2>
            </div>
            <div className="field">
                <label htmlFor="voice">Voice</label>
                <select
                    id="voice"
                    disabled={loadingVoices || loading}
                    value={voiceId}
                    onChange={(event) => onVoiceChange(event.target.value)}
                >
                    <option value="">
                        {loadingVoices ? "Loading voices…" : "Choose a voice"}
                    </option>
                    {voices.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                            {voice.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="field">
                <div className="label-row">
                    <label htmlFor="script">Your script</label>
                    <span>{text.length} / 1000</span>
                </div>
                <textarea
                    id="script"
                    maxLength={1000}
                    rows={5}
                    value={text}
                    onChange={(event) => onTextChange(event.target.value)}
                    placeholder="What should your voice say?"
                />
            </div>
            <button
                type="button"
                disabled={loading || !voiceId || !text.trim()}
                onClick={onGenerate}
            >
                {loading ? "Generating audio…" : "✦ Generate speech"} <span>↗</span>
            </button>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
        </section>
    );
}