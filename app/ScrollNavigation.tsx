"use client";

import { useEffect } from "react";

const STORAGE_KEY = "portfolio-scroll-target";

function releaseScrollLock() {
  document.documentElement.classList.remove("is-opening");
  document.body.classList.remove("is-opening");
  document.documentElement.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("overflow-y");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow-y");
}

function cleanCurrentUrl() {
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export default function ScrollNavigation() {
  useEffect(() => {
    let frame = 0;

    const scrollToSection = (rawId: string, behavior: ScrollBehavior) => {
      const id = decodeURIComponent(rawId.replace(/^#/, ""));
      const section = document.getElementById(id);
      if (!section) return false;

      releaseScrollLock();
      document.querySelector<HTMLElement>(".opening-overlay")?.style.setProperty("display", "none");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        section.scrollIntoView({ behavior, block: "start" });
        releaseScrollLock();
      });
      cleanCurrentUrl();
      return true;
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const clicked = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!clicked || clicked.target === "_blank" || clicked.hasAttribute("download")) return;

      const destination = new URL(clicked.href, window.location.href);
      if (destination.origin !== window.location.origin || !destination.hash) return;

      if (destination.pathname !== window.location.pathname) {
        sessionStorage.setItem(STORAGE_KEY, destination.hash.slice(1));
        releaseScrollLock();
        return;
      }

      if (scrollToSection(destination.hash, "smooth")) event.preventDefault();
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("pageshow", releaseScrollLock);

    const storedTarget = sessionStorage.getItem(STORAGE_KEY) || "";
    const requestedTarget = window.location.hash.slice(1) || storedTarget;
    if (requestedTarget) {
      if (storedTarget) {
        document.documentElement.dataset.skipOpening = "true";
        window.setTimeout(() => {
          sessionStorage.removeItem(STORAGE_KEY);
          delete document.documentElement.dataset.skipOpening;
        }, 2000);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      releaseScrollLock();
      requestAnimationFrame(() => scrollToSection(requestedTarget, "auto"));
    }

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("pageshow", releaseScrollLock);
      releaseScrollLock();
    };
  }, []);

  return null;
}
