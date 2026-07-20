"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLoopVideoProps = {
  src: string;
  poster?: string;
};

export default function ProjectLoopVideo({ src, poster }: ProjectLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearRef = useRef(false);
  const shouldLoadRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!shouldLoadRef.current) {
            shouldLoadRef.current = true;
            setShouldLoad(true);
          } else {
            void video.play().catch(() => undefined);
          }
        } else {
          video.pause();
        }
      },
      { rootMargin: "96px 0px", threshold: 0.02 },
    );

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") video.pause();
      else if (isNearRef.current && shouldLoadRef.current) void video.play().catch(() => undefined);
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    video.load();
    if (isNearRef.current) void video.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="project-loop-video"
      poster={poster}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      onCanPlay={(event) => {
        if (isNearRef.current) void event.currentTarget.play().catch(() => undefined);
      }}
      aria-hidden="true"
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
