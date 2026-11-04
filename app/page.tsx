"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Desktop = wide screen AND a mouse (not touch-only)
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    setIsDesktop(desktop);
    if (!desktop) router.replace("/classic");
  }, [router]);

  // Black screen for a split second while we check
  if (!isDesktop) return <div className="h-screen w-screen bg-black" />;

  return <GameCanvas />;
}