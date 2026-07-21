"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLoopVideoProps = {
  src: string;
  mobileSrc?: string;
  poster?: string;
};

const ACTIVE_VIDEO_EVENT = "portfolio:project-video-active";
const REEVALUATE_VIDEO_EVENT = "portfolio:project-video-reevaluate";
let activeProjectVideo: HTMLVideoElement | null = null;

function visibilityScore(video: HTMLVideoElement) {
  const rect = video.getBoundingClientRect();
  const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
  const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2) / window.innerHeight;
  return visibleRatio - centerDistance * 0.15;
}

function playExclusively(video: HTMLVideoElement, force = false) {
  if (
    !force
    && activeProjectVideo
    && activeProjectVideo !== video
    && !activeProjectVideo.paused
    && visibilityScore(activeProjectVideo) > visibilityScore(video) + 0.04
  ) {
    return;
  }

  activeProjectVideo = video;
  document.dispatchEvent(new CustomEvent<HTMLVideoElement>(ACTIVE_VIDEO_EVENT, { detail: video }));
  void video.play().catch(() => undefined);
}

export default function ProjectLoopVideo({ src, mobileSrc, poster }: ProjectLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const shouldLoadRef = useRef(false);
  const allowAutoPlayRef = useRef(true);
  const userWantsPlaybackRef = useRef(false);
  const syncPlaybackRef = useRef<() => void>(() => undefined);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    allowAutoPlayRef.current = !reducedMotion && !saveData;

    const syncPlayback = () => {
      const hasEnoughData = video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA;
      const shouldPlay = isVisibleRef.current
        && document.visibilityState === "visible"
        && video.currentSrc
        && (userWantsPlaybackRef.current || (allowAutoPlayRef.current && hasEnoughData));

      if (shouldPlay) {
        if (video.paused) playExclusively(video);
      } else {
        video.pause();
      }
    };
    syncPlaybackRef.current = syncPlayback;

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        syncPlayback();
        if (wasVisible && !isVisibleRef.current) {
          document.dispatchEvent(new Event(REEVALUATE_VIDEO_EVENT));
        }
      },
      { rootMargin: "0px", threshold: [0.01, 0.2, 0.5, 0.8, 1] },
    );

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && allowAutoPlayRef.current && !shouldLoadRef.current) {
          shouldLoadRef.current = true;
          setShouldLoad(true);
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    const handleVisibility = () => syncPlayback();
    const handleExclusivePlayback = (event: Event) => {
      const activeVideo = (event as CustomEvent<HTMLVideoElement>).detail;
      if (activeVideo !== video) video.pause();
    };
    const handlePlay = () => {
      activeProjectVideo = video;
      document.dispatchEvent(new CustomEvent<HTMLVideoElement>(ACTIVE_VIDEO_EVENT, { detail: video }));
    };
    const handleReevaluatePlayback = () => syncPlayback();
    playbackObserver.observe(video);
    preloadObserver.observe(video);
    document.addEventListener(ACTIVE_VIDEO_EVENT, handleExclusivePlayback);
    document.addEventListener(REEVALUATE_VIDEO_EVENT, handleReevaluatePlayback);
    video.addEventListener("play", handlePlay);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      playbackObserver.disconnect();
      preloadObserver.disconnect();
      document.removeEventListener(ACTIVE_VIDEO_EVENT, handleExclusivePlayback);
      document.removeEventListener(REEVALUATE_VIDEO_EVENT, handleReevaluatePlayback);
      video.removeEventListener("play", handlePlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
      if (activeProjectVideo === video) activeProjectVideo = null;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    video.load();
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
      playExclusively(video, true);
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
      muted
      loop
      playsInline
      preload={shouldLoad ? "auto" : "none"}
      onCanPlay={(event) => {
        if (userWantsPlaybackRef.current && isVisibleRef.current) {
          playExclusively(event.currentTarget, true);
        }
      }}
      onCanPlayThrough={() => syncPlaybackRef.current()}
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
