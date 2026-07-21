"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLoopVideoProps = {
  src: string;
  mobileSrc?: string;
  poster?: string;
};

const ACTIVE_VIDEO_EVENT = "portfolio:project-video-active";
const REEVALUATE_VIDEO_EVENT = "portfolio:project-video-reevaluate";

function playExclusively(video: HTMLVideoElement) {
  document.dispatchEvent(new CustomEvent<HTMLVideoElement>(ACTIVE_VIDEO_EVENT, { detail: video }));
  void video.play().catch(() => undefined);
}

export default function ProjectLoopVideo({ src, mobileSrc, poster }: ProjectLoopVideoProps) {
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

      if (shouldPlay) playExclusively(video);
      else video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNear = entry.isIntersecting;
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = isNear && entry.intersectionRatio >= 0.2;
        if (isNear && allowAutoPlayRef.current && !shouldLoadRef.current) {
          shouldLoadRef.current = true;
          setShouldLoad(true);
        }
        syncPlayback();
        if (wasVisible && !isVisibleRef.current) {
          document.dispatchEvent(new Event(REEVALUATE_VIDEO_EVENT));
        }
      },
      { rootMargin: "0px", threshold: [0.01, 0.2] },
    );

    const handleVisibility = () => syncPlayback();
    const handleExclusivePlayback = (event: Event) => {
      const activeVideo = (event as CustomEvent<HTMLVideoElement>).detail;
      if (activeVideo !== video) video.pause();
    };
    const handlePlay = () => {
      document.dispatchEvent(new CustomEvent<HTMLVideoElement>(ACTIVE_VIDEO_EVENT, { detail: video }));
    };
    const handleReevaluatePlayback = () => syncPlayback();
    observer.observe(video);
    document.addEventListener(ACTIVE_VIDEO_EVENT, handleExclusivePlayback);
    document.addEventListener(REEVALUATE_VIDEO_EVENT, handleReevaluatePlayback);
    video.addEventListener("play", handlePlay);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener(ACTIVE_VIDEO_EVENT, handleExclusivePlayback);
      document.removeEventListener(REEVALUATE_VIDEO_EVENT, handleReevaluatePlayback);
      video.removeEventListener("play", handlePlay);
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
      playExclusively(video);
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
      playExclusively(video);
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
          playExclusively(event.currentTarget);
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
      {shouldLoad ? (
        <>
          {mobileSrc ? <source src={mobileSrc} type="video/mp4" media="(max-width: 720px)" /> : null}
          <source src={src} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
