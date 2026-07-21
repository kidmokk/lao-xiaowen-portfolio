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
    if (reducedMotion || saveData) {
      video.autoplay = false;
      video.pause();
      return;
    }

    let ready = video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
    let visible = false;
    const syncPlayback = () => {
      if (ready && visible && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const handleCanPlay = () => {
      ready = true;
      syncPlayback();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        syncPlayback();
      },
      { threshold: 0.08 },
    );
    const handleVisibility = () => syncPlayback();

    observer.observe(hero);
    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibility);
    syncPlayback();
    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/hero-motion-optimized.mp4" type="video/mp4" />
    </video>
  );
}
