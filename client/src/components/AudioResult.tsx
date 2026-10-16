type AudioResultProps = {
    audioUrl: string | null;
};

export function AudioResult({ audioUrl }: AudioResultProps) {
    return (
        <section className="result" aria-label="Audio output">
            <div className="section-heading">
                <span className="step">02</span>
                <h2>Listen &amp; download</h2>
            </div>
            {audioUrl ? (
                <>
                    <audio controls src={audioUrl} aria-label="Generated speech" />
                    <a
                        className="download"
                        download="elevenlabs-speech.mp3"
                        href={audioUrl}
                    >
                        Download MP3 ↗
                    </a>
                </>
            ) : (
                <p className="empty">Your generated audio will appear here.</p>
            )}
        </section>
    );
}