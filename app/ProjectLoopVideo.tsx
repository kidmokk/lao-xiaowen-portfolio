"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLoopVideoProps = {
  src: string;
  poster?: string;
};

export default function ProjectLoopVideo({ src, poster }: ProjectLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const shouldLoadRef = useRef(false);
  const allowAutoPlayRef = useRef(true);
  const userWantsPlaybackRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    allowAutoPlayRef.current = !reducedMotion && !saveData;

    const syncPlayback = () => {
      const shouldPlay = isVisibleRef.current
        && document.visibilityState === "visible"
        && video.currentSrc
        && (allowAutoPlayRef.current || userWantsPlaybackRef.current);

      if (shouldPlay) void video.play().catch(() => undefined);
      else video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNear = entry.isIntersecting;
        isVisibleRef.current = isNear && entry.intersectionRatio >= 0.2;

        if (isNear && allowAutoPlayRef.current) {
          if (!shouldLoadRef.current) {
            shouldLoadRef.current = true;
            setShouldLoad(true);
          }
        }
        syncPlayback();
      },
      { rootMargin: "0px", threshold: [0.01, 0.2] },
    );

    const handleVisibility = () => syncPlayback();

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
    if (
      isVisibleRef.current
      && document.visibilityState === "visible"
      && (allowAutoPlayRef.current || userWantsPlaybackRef.current)
    ) {
      void video.play().catch(() => undefined);
    }
  }, [shouldLoad]);

  const requestPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldLoadRef.current) {
      shouldLoadRef.current = true;
      userWantsPlaybackRef.current = true;
      setShouldLoad(true);
      return;
    }

    if (video.paused) {
      userWantsPlaybackRef.current = true;
      void video.play().catch(() => undefined);
    } else {
      userWantsPlaybackRef.current = false;
      video.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      className="project-loop-video"
      poster={poster}
      autoPlay={shouldLoad && allowAutoPlayRef.current}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      onCanPlay={(event) => {
        if (
          isVisibleRef.current
          && document.visibilityState === "visible"
          && (allowAutoPlayRef.current || userWantsPlaybackRef.current)
        ) {
          void event.currentTarget.play().catch(() => undefined);
        }
      }}
      onClick={requestPlayback}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          requestPlayback();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="播放或暂停视频"
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
