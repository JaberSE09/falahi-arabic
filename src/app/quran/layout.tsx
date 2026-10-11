export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Full-screen dark layer behind the Quran section (unmounts when leaving /quran) */}
      <div
        aria-hidden
        style={{ position: "fixed", inset: 0, background: "#0D1117", zIndex: -1 }}
      />
      <div style={{ color: "#f3f4f6", minHeight: "100vh" }}>{children}</div>
    </>
  );
}
