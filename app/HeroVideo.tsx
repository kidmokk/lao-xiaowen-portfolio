"use client";

import { useEffect, useRef } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const hero = video?.closest(".hero");
    if (!video || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (reducedMotion || saveData) return;

    let ready = false;
    let visible = false;
    const syncPlayback = () => {
      if (ready && visible && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        syncPlayback();
      },
      { threshold: 0.08 },
    );
    const handleVisibility = () => syncPlayback();
    const delay = window.setTimeout(() => {
      ready = true;
      syncPlayback();
    }, 700);

    observer.observe(hero);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(delay);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, []);

  return (
    <video ref={videoRef} className="hero-video" muted loop playsInline preload="none" aria-hidden="true">
      <source src="/hero-motion-optimized.mp4" type="video/mp4" />
    </video>
  );
}
