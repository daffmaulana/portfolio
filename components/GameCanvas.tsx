// DIGUNAKAN UNTUK GAME SETELAH START SCREEN, TERMASUK TOMBOL DAN TEKS NAVIGASI.

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { startGame } from "@/game/start";
import type { GameHandle } from "@/game/start";
import { zones } from "@/game/world";
import ContentModal from "./ContentModal";
import StartScreen from "./StartScreen";

// Tombol keyboard kecil untuk petunjuk
function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="min-w-[1.75rem] rounded border border-amber-200/30 bg-neutral-950 px-2 py-1 text-center font-mono text-xs font-bold text-amber-100 shadow-[0_2px_0_#b88746]">
      {children}
    </kbd>
  );
}

const noteFrequency = (midiNote: number) =>
  440 * 2 ** ((midiNote - 69) / 12);

function playLeadNote(
  context: AudioContext,
  output: AudioNode,
  midiNote: number,
  start: number,
  duration: number,
  volume: number
) {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(noteFrequency(midiNote), start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1900, start);
  envelope.gain.setValueAtTime(0.001, start);
  envelope.gain.linearRampToValueAtTime(volume, start + 0.018);
  envelope.gain.setValueAtTime(volume * 0.72, start + duration * 0.55);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(filter);
  filter.connect(envelope);
  envelope.connect(output);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playGuitarNote(
  context: AudioContext,
  output: AudioNode,
  midiNote: number,
  start: number,
  volume: number
) {
  const oscillator = context.createOscillator();
  const body = context.createOscillator();
  const filter = context.createBiquadFilter();
  const envelope = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(noteFrequency(midiNote), start);
  body.type = "sine";
  body.frequency.setValueAtTime(noteFrequency(midiNote) * 2, start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, start);
  envelope.gain.setValueAtTime(volume, start);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
  oscillator.connect(filter);
  body.connect(filter);
  filter.connect(envelope);
  envelope.connect(output);
  oscillator.start(start);
  body.start(start);
  oscillator.stop(start + 0.25);
  body.stop(start + 0.25);
}

function playBassNote(
  context: AudioContext,
  output: AudioNode,
  midiNote: number,
  start: number
) {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(noteFrequency(midiNote), start);
  envelope.gain.setValueAtTime(0.001, start);
  envelope.gain.linearRampToValueAtTime(0.16, start + 0.025);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
  oscillator.connect(envelope);
  envelope.connect(output);
  oscillator.start(start);
  oscillator.stop(start + 0.34);
}

function playKick(context: AudioContext, output: AudioNode, start: number) {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(125, start);
  oscillator.frequency.exponentialRampToValueAtTime(42, start + 0.13);
  envelope.gain.setValueAtTime(0.22, start);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
  oscillator.connect(envelope);
  envelope.connect(output);
  oscillator.start(start);
  oscillator.stop(start + 0.17);
}

function playNoiseHit(
  context: AudioContext,
  output: AudioNode,
  buffer: AudioBuffer,
  start: number,
  duration: number,
  filterType: BiquadFilterType,
  cutoff: number,
  volume: number
) {
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const envelope = context.createGain();
  source.buffer = buffer;
  filter.type = filterType;
  filter.frequency.setValueAtTime(cutoff, start);
  envelope.gain.setValueAtTime(volume, start);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
  source.connect(filter);
  filter.connect(envelope);
  envelope.connect(output);
  source.start(start);
  source.stop(start + duration);
}

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<GameHandle | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameCleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicEnabledRef = useRef(false);
  const musicMasterRef = useRef<GainNode | null>(null);
  const musicIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicStepRef = useRef(0);
  const musicNoiseBufferRef = useRef<AudioBuffer | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [hintDone, setHintDone] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicError, setMusicError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("game-page");
    document.body.classList.add("game-page");

    return () => {
      document.documentElement.classList.remove("game-page");
      document.body.classList.remove("game-page");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (musicIntervalRef.current !== null) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
      const context = audioContextRef.current;
      audioContextRef.current = null;
      if (context && context.state !== "closed") {
        void context.close().catch((error: unknown) => {
          console.error("Could not close the ambient audio context.", error);
        });
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (gameCleanupTimerRef.current !== null) {
      clearTimeout(gameCleanupTimerRef.current);
      gameCleanupTimerRef.current = null;
    }

    if (!gameRef.current) {
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);
      canvasRef.current = canvas;
      gameRef.current = startGame(
        canvas,
        (t) => setTarget(t),
        (i) => setZoneIdx(i),
        (p) => setProgress(p),
        () => setReady(true)
      );
    }

    return () => {
      gameCleanupTimerRef.current = setTimeout(() => {
        gameRef.current?.stop();
        gameRef.current = null;
        canvasRef.current?.remove();
        canvasRef.current = null;
        gameCleanupTimerRef.current = null;
      }, 0);
    };
  }, []);

  // Petunjuk hilang 4 detik setelah pemain pertama kali berjalan
  useEffect(() => {
    if (!started || hintDone) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!["arrowleft", "arrowright", "a", "d"].includes(key)) return;
      if (timer) return;
      timer = setTimeout(() => setHintDone(true), 4000);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, [started, hintDone]);

  const handleStart = useCallback(() => {
    setStarted(true);
    gameRef.current?.resume();
  }, []);

  const handleClose = useCallback(() => {
    setTarget(null);
    gameRef.current?.resume();
  }, []);

  const startAmbientMusic = useCallback(async () => {
    let context = audioContextRef.current;
    try {
      if (!context) {
        context = new AudioContext();
        const master = context.createGain();
        master.gain.value = 0.72;
        const compressor = context.createDynamicsCompressor();
        compressor.threshold.value = -18;
        compressor.knee.value = 12;
        compressor.ratio.value = 4;
        compressor.attack.value = 0.008;
        compressor.release.value = 0.18;
        master.connect(compressor);
        compressor.connect(context.destination);
        musicMasterRef.current = master;

        const noiseBuffer = context.createBuffer(
          1,
          context.sampleRate,
          context.sampleRate
        );
        const noiseData = noiseBuffer.getChannelData(0);
        for (let sample = 0; sample < noiseData.length; sample += 1) {
          noiseData[sample] = Math.random() * 2 - 1;
        }
        musicNoiseBufferRef.current = noiseBuffer;

        audioContextRef.current = context;
      }

      await context.resume();
      musicEnabledRef.current = true;
      setMusicEnabled(true);
      setMusicError(null);

      if (musicIntervalRef.current === null) {
        const melody: (number | null)[] = [
          72, null, 76, 79, null, 76, 74, null,
          71, null, 74, 79, 83, null, 79, null,
          69, null, 72, 76, null, 72, 76, 81,
          77, null, 76, 74, 72, null, null, null,
        ];
        const chordTones = [
          [60, 64, 67, 72],
          [55, 59, 62, 67],
          [57, 60, 64, 69],
          [53, 57, 60, 65],
        ];
        const bassRoots = [36, 31, 33, 29];
        const stepDuration = 60 / 108 / 2;
        const noiseBuffer = musicNoiseBufferRef.current;
        let nextStepTime = context.currentTime + 0.05;

        const scheduleStep = (step: number, time: number) => {
          const master = musicMasterRef.current;
          if (!master || !context || !noiseBuffer) return;

          const barStep = step % 8;
          const bar = Math.floor(step / 8);
          const melodyNote = melody[step];
          if (melodyNote !== null) {
            playLeadNote(context, master, melodyNote, time, stepDuration * 0.78, 0.075);
          }

          const chord = chordTones[bar];
          const chordToneIndex = Math.floor(barStep / 2) % chord.length;
          playGuitarNote(
            context,
            master,
            chord[chordToneIndex],
            time,
            0.022
          );

          if (barStep === 0 || barStep === 4) {
            playBassNote(context, master, bassRoots[bar], time);
          }
          if (barStep === 0 || barStep === 4) {
            playKick(context, master, time);
          }
          if (barStep === 2 || barStep === 6) {
            playNoiseHit(context, master, noiseBuffer, time, 0.14, "bandpass", 1800, 0.055);
          }
          if (barStep % 2 === 1) {
            playNoiseHit(context, master, noiseBuffer, time, 0.035, "highpass", 6500, 0.018);
          }
        };

        const scheduler = () => {
          while (nextStepTime < context!.currentTime + 0.12) {
            scheduleStep(musicStepRef.current, nextStepTime);
            musicStepRef.current = (musicStepRef.current + 1) % melody.length;
            nextStepTime += stepDuration;
          }
        };
        scheduler();
        musicIntervalRef.current = setInterval(scheduler, 25);
      }
      return true;
    } catch (error) {
      if (context?.state === "closed") {
        console.error("Ambient audio context was closed unexpectedly.", error);
        setMusicError("Ambient music is unavailable in this browser.");
      }
      return false;
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    const enableAfterGesture = (event: Event) => {
      if (
        event.type === "pointerdown" &&
        event.target instanceof Element &&
        event.target.closest("[data-music-toggle]")
      ) {
        return;
      }
      void startAmbientMusic().then((started) => {
        if (started || disposed) {
          window.removeEventListener("pointerdown", enableAfterGesture);
          window.removeEventListener("keydown", enableAfterGesture);
          setMusicError(null);
        } else {
          setMusicError("Click or press a key to start ambient music.");
        }
      });
    };

    const autoplayTimer = window.setTimeout(() => {
      void startAmbientMusic().then((started) => {
        if (started || disposed) return;
        window.addEventListener("pointerdown", enableAfterGesture);
        window.addEventListener("keydown", enableAfterGesture);
      });
    }, 0);

    return () => {
      disposed = true;
      clearTimeout(autoplayTimer);
      window.removeEventListener("pointerdown", enableAfterGesture);
      window.removeEventListener("keydown", enableAfterGesture);
    };
  }, [startAmbientMusic]);

  const handleMusicToggle = useCallback(async () => {
    const context = audioContextRef.current;
    if (musicEnabledRef.current && context) {
      try {
        await context.suspend();
        if (musicIntervalRef.current !== null) {
          clearInterval(musicIntervalRef.current);
          musicIntervalRef.current = null;
        }
        musicEnabledRef.current = false;
        setMusicEnabled(false);
        setMusicError(null);
      } catch (error) {
        console.error("Could not pause ambient music.", error);
        setMusicError("Could not pause ambient music.");
      }
      return;
    }

    if (!(await startAmbientMusic())) {
      setMusicError("Click or press a key to start ambient music.");
    }
  }, [startAmbientMusic]);

  return (
    <div className="relative h-screen w-screen bg-black">
      <div ref={containerRef} className="h-full w-full" />

      <div className="absolute left-1/2 top-4 z-[5] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1.5 rounded-xl border-2 border-neutral-950 bg-neutral-950/85 p-1.5 shadow-[3px_3px_0_#b88746] backdrop-blur-sm">
        <a
          href="/classic"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
          >
            <rect x="3" y="4" width="18" height="13" rx="1" />
            <path d="M8 21h8m-4-4v4" />
          </svg>
          <span className="whitespace-nowrap">
            Short on time? Classic Page
          </span>
        </a>
        <span aria-hidden="true" className="h-6 w-px shrink-0 bg-white/15" />
        <button
          type="button"
          data-music-toggle
          onClick={handleMusicToggle}
          aria-pressed={musicEnabled}
          aria-label={`Turn ambient music ${musicEnabled ? "off" : "on"}`}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span>Music</span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              musicEnabled
                ? "bg-emerald-300/15 text-emerald-200"
                : "bg-white/10 text-white/55"
            }`}
          >
            {musicEnabled ? "On" : "Off"}
          </span>
        </button>
      </div>
      {musicError && (
        <div className="absolute left-1/2 top-[4.5rem] z-[5] max-w-64 -translate-x-1/2 text-center">
          <p role="status" className="text-xs text-amber-200">
            {musicError}
          </p>
        </div>
      )}

      {/* Petunjuk kontrol (tengah bawah, hilang setelah mulai berjalan) */}
      <div
        className={`pointer-events-none absolute bottom-20 left-1/2 z-[5] -translate-x-1/2 transition-opacity duration-700 ${
          started && !hintDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-xl border-2 border-neutral-950 bg-neutral-950/85 px-4 py-2.5 text-sm text-white shadow-[3px_3px_0_#b88746] backdrop-blur-sm">
          <Key>←</Key>
          <Key>→</Key>
          <span className="px-0.5 text-xs font-medium text-white/45">or</span>
          <Key>A</Key>
          <Key>D</Key>
          <span className="text-white/80">to walk</span>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/20" />
          <Key>E</Key>
          <span className="text-white/80">to interact</span>
        </div>
      </div>

      {/* Bar navigasi zona (tengah bawah) */}
      <nav
        aria-label="Navigate to portfolio areas"
        className="absolute bottom-4 left-1/2 z-[5] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 gap-1 overflow-x-auto rounded-xl border-2 border-neutral-950 bg-neutral-950/85 p-1.5 text-sm shadow-[3px_3px_0_#b88746] backdrop-blur-sm"
      >
        {zones.map((z, i) => (
          <button
            key={z.name}
            onClick={() => gameRef.current?.travelTo(z.stop)}
            className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
              i === zoneIdx
                ? "bg-amber-300 text-neutral-950"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {z.name}
          </button>
        ))}
      </nav>

      <ContentModal target={target} onClose={handleClose} />

      <StartScreen
        progress={progress}
        ready={ready}
        started={started}
        onStart={handleStart}
      />
    </div>
  );
}