export default function Contact() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] rounded-full bg-signal" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] bg-electric" style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-2/3 h-[3px] bg-acid" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24">
        <p className="text-mono-label text-gray">CONTACT / ONE STEP</p>
        <h1 className="text-display mt-6" style={{ fontSize: "clamp(80px, 16vw, 280px)", lineHeight: 0.82 }}>
          SAY<br />HELLO.
        </h1>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-ink pt-8">
          <div className="col-span-12 md:col-span-6">
            <p className="text-mono-label text-gray">EMAIL</p>
            <a href="mailto:hi@dvinay.com" className="text-display mt-3 block break-words text-3xl md:text-5xl">
              hi@dvinay.com
            </a>
          </div>
          <div className="col-span-12 md:col-span-3">
            <p className="text-mono-label text-gray">SOCIAL</p>
            <ul className="mt-3 space-y-2 text-lg">
              <li><a href="#">Instagram ↗</a></li>
              <li><a href="#">LinkedIn ↗</a></li>
              <li><a href="#">GitHub ↗</a></li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3">
            <p className="text-mono-label text-gray">AVAILABILITY</p>
            <p className="mt-3 text-lg">
              Q3 2026<br />
              <span className="ticker-dot inline-block h-2 w-2 rounded-full bg-signal align-middle" /> 2 SLOTS OPEN
            </p>
          </div>
        </div>

        <p className="text-mono-label mt-24 text-gray">
          PROJECT INQUIRY? INCLUDE TIMELINE · SCOPE · LINKS. I REPLY WITHIN 48H.
        </p>
      </div>
    </section>
  );
}
