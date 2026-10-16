export function PageHeader() {
  return (
    <>
      <div className="eyebrow">
        <span className="spark">✦</span> API INTEGRATION STUDY{" "}
        <span className="dot" /> REACT + TYPESCRIPT
      </div>
      <header>
        <div>
          <h1>
            Give your ideas
            <br />
            <em>a voice.</em>
          </h1>
          <p>
            Explore expressive speech generation with ElevenLabs. Pick a voice,
            write something worth saying, and hear it come alive.
          </p>
        </div>
        <div className="wave" aria-hidden="true">
          ◖◗◖◗◖◗
        </div>
      </header>
    </>
  );
}