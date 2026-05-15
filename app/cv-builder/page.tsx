"use client"

export default function CVBuilderPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ─── Iframe Section ──────────────────────────── */}
      <div className="flex-1 w-full">
        <iframe
          src="https://eskandaratrakchi.github.io/CV_builder/"
          title="CV Builder"
          className="w-full h-[calc(100vh-140px)] border-0"
          allowFullScreen
        />
      </div>
    </div>
  )
}