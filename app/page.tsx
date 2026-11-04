"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 1024px) and (pointer: fine)";

function subscribeToDesktop(callback: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerDesktopSnapshot() {
  return false;
}

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-950 font-mono text-sm text-white/60">
      Loading...
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );

  useEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      router.replace("/classic");
    }
  }, [isDesktop, router]);

  if (!isDesktop) return <div className="h-screen w-screen bg-black" />;

  return <GameCanvas />;
}