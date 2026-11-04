// DIGUNAKAN UNTUK START/LOADING SCREEN PADA GAME.

"use client";

import { useEffect } from "react";
import { profile } from "@/content/data";

type Props = {
  progress: number;
  ready: boolean;
  started: boolean;
  onStart: () => void;
};

export default function StartScreen({
  progress,
  ready,
  started,
  onStart,
}: Props) {
  // Enter atau Spasi memulai game
  useEffect(() => {
    if (!ready || started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, started, onStart]);

  const pct = Math.round(Math.min(progress, 1) * 100);

  return (
    <div
      aria-hidden={started}
      className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white transition-all duration-700 ${
        started
          ? "pointer-events-none opacity-0"
          : ready
          ? "bg-black/85 backdrop-blur-[2px]"
          : "bg-neutral-950"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        Interactive portfolio
      </p>
      <h1 className="mt-3 font-mono text-4xl font-bold tracking-wide sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-2 font-mono text-lg text-white/80">{profile.role}</p>
      <p className="mt-3 max-w-md text-sm text-white/60">{profile.pitch}</p>

      <div className="mt-10 h-14 w-full max-w-xs">
        {!ready ? (
          <div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full bg-amber-300 transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-xs text-white/60">
              Loading... {pct}%
            </p>
          </div>
        ) : (
          <button
            onClick={onStart}
            className="w-full animate-pulse rounded border-2 border-amber-300 px-6 py-3 font-mono text-sm uppercase tracking-widest text-amber-300 hover:bg-amber-300 hover:text-black"
          >
            Press Enter/Click to start
          </button>
        )}
      </div>

      <p className="mt-8 font-mono text-xs text-white/50">
        ← → / A D untuk berjalan · E untuk berinteraksi
      </p>
      <div className="mt-6 flex items-center gap-1 text-xs text-white/60">
        <p>Short on time?</p>
        <a href="/classic" className="underline hover:text-white">
          Open the classic page
        </a>
      </div>
    </div>
  );
}