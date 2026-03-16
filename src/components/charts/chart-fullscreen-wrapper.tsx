"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface ChartFullscreenWrapperProps {
  children: React.ReactNode;
  ariaDescription?: string;
}

export function ChartFullscreenWrapper({ children, ariaDescription }: ChartFullscreenWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (screen.orientation as any).lock("landscape");
      } catch {
        // orientation lock non supportato su desktop
      }
    } else {
      await document.exitFullscreen();
    }
  }, []);

  return (
    <div ref={containerRef} className="relative fullscreen-chart" role="img" aria-label={ariaDescription}>
      {ariaDescription && <span className="sr-only">{ariaDescription}</span>}
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-white/80 hover:bg-white border border-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label={isFullscreen ? "Esci da schermo intero" : "Schermo intero"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
      {children}
    </div>
  );
}
