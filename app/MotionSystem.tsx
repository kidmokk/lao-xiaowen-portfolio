"use client";

import { useEffect, useRef } from "react";

export default function MotionSystem() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    let openingFailsafe: ReturnType<typeof setTimeout> | undefined;

    const releaseOpeningLock = () => {
      document.documentElement.classList.remove("is-opening");
      document.body.classList.remove("is-opening");
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const overlay = overlayRef.current;
      if (!overlay) return;

    const media = gsap.matchMedia();
    const refresh = () => ScrollTrigger.refresh();

    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 721px)",
      },
      (context) => {
        const { motion, reduced, desktop } = context.conditions as {
          motion: boolean;
          reduced: boolean;
          desktop: boolean;
        };

        if (reduced || !motion) {
          releaseOpeningLock();
          gsap.set(overlay, { display: "none" });
          return;
        }

        document.documentElement.classList.add("is-opening");
        openingFailsafe = window.setTimeout(() => {
          releaseOpeningLock();
          gsap.set(overlay, { display: "none" });
          ScrollTrigger.refresh();
        }, 5200);

        const counter = { value: 0 };
        const opening = gsap.timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => {
            if (openingFailsafe) window.clearTimeout(openingFailsafe);
            releaseOpeningLock();
            gsap.set(overlay, { display: "none" });
            ScrollTrigger.refresh();
          },
        });

        opening
          .from(".opening-meta > *", {
            y: 24,
            autoAlpha: 0,
            duration: 0.75,
            stagger: 0.08,
          })
          .from(".opening-title-mask span", {
            yPercent: 125,
            scaleY: 0.45,
            scaleX: 1.08,
            skewY: 3,
            duration: 1.1,
            stagger: 0.1,
            ease: "expo.out",
          }, 0.12)
          .to(counter, {
            value: 100,
            duration: 1.35,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
              }
            },
          }, 0)
          .fromTo(".opening-progress i", {
            scaleX: 0,
          }, {
            scaleX: 1,
            duration: 1.35,
            ease: "power2.inOut",
          }, 0)
          .to(".opening-title-mask span", {
            yPercent: -118,
            scaleY: 0.68,
            duration: 0.72,
            stagger: 0.04,
            ease: "power3.in",
          }, 1.42)
          .to(overlay, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.05,
            ease: "power4.inOut",
          }, 1.7)
          .from(".hero .nav", {
            y: -72,
            autoAlpha: 0,
            duration: 1.05,
            clearProps: "transform,opacity,visibility",
          }, 1.9)
          .from(".hero-frame", {
            y: 70,
            scale: 0.84,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.55,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          }, 1.92)
          .from(".hero-frame .doodle", {
            scale: 0,
            rotation: -24,
            autoAlpha: 0,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
            clearProps: "transform,opacity,visibility",
          }, 2.23)
          .from(".hero-portrait", {
            y: 105,
            scale: 0.82,
            autoAlpha: 0,
            duration: 1.45,
            ease: "expo.out",
            clearProps: "transform,opacity,visibility",
          }, 2.18)
          .from(".hero-side-copy", {
            x: -70,
            autoAlpha: 0,
            duration: 1.15,
            clearProps: "transform,opacity,visibility",
          }, 2.32)
          .from(".hero-work-card", {
            x: 85,
            autoAlpha: 0,
            duration: 1.15,
            clearProps: "transform,opacity,visibility",
          }, 2.38)
          .from(".hero-handline", {
            y: -38,
            scaleX: 0.62,
            autoAlpha: 0,
            duration: 1.15,
            ease: "expo.out",
            clearProps: "transform,opacity,visibility",
          }, 2.42)
          .from(".hero-title > span > i", {
            yPercent: 125,
            scaleY: 0.48,
            scaleX: 1.1,
            skewY: 2,
            duration: 1.35,
            stagger: 0.14,
            ease: "expo.out",
            clearProps: "transform",
          }, 2.48)
          .from(".hero-scroll", {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            clearProps: "transform,opacity,visibility",
          }, 2.78);

        const titleFrom = {
          y: desktop ? 150 : 90,
          scaleY: 0.58,
          scaleX: 1.07,
          clipPath: "inset(100% 0 0 0)",
          transformOrigin: "left bottom",
        };

        gsap.utils.toArray<HTMLElement>(".section-head").forEach((header) => {
          gsap.from(header, {
            xPercent: -16,
            autoAlpha: 0,
            duration: 1.1,
            ease: "power4.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
          });
        });

        const aboutTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".about-grid", start: "top 82%", once: true },
        });
        aboutTimeline
          .from(".about-copy h2", {
            ...titleFrom,
            duration: 1.45,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          })
          .from(".portrait-wrap", {
            x: -110,
            clipPath: "inset(0 100% 0 0)",
            duration: 1.35,
            ease: "power4.out",
            clearProps: "transform,clipPath",
          }, "-=0.82")
          .from([".about-copy .eyebrow", ".about-lead", ".quick-contact"], {
            y: 65,
            autoAlpha: 0,
            duration: 1.05,
            stagger: 0.16,
            ease: "power4.out",
            clearProps: "transform,opacity,visibility",
          }, "-=0.85");

        gsap.from(".stats > div", {
          y: 100,
          scaleY: 0.68,
          clipPath: "inset(100% 0 0 0)",
          duration: 1.25,
          stagger: 0.14,
          ease: "expo.out",
          clearProps: "transform,clipPath",
          scrollTrigger: { trigger: ".stats", start: "top 84%", once: true },
        });

        const experienceTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".timeline", start: "top 80%", once: true },
        });
        experienceTimeline
          .from(".timeline-intro h3", {
            ...titleFrom,
            duration: 1.35,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          })
          .from(".timeline-list article", {
            xPercent: 14,
            clipPath: "inset(0 0 0 100%)",
            duration: 1.05,
            stagger: 0.18,
            ease: "power4.out",
            clearProps: "transform,clipPath",
          }, "-=0.68");

        const workHeading = gsap.timeline({
          scrollTrigger: { trigger: ".work-title-row", start: "top 82%", once: true },
        });
        workHeading
          .from(".work-title-row h2", {
            ...titleFrom,
            duration: 1.5,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          })
          .from(".work-title-row > p", {
            x: 80,
            autoAlpha: 0,
            duration: 1.05,
            ease: "power4.out",
            clearProps: "transform,opacity,visibility",
          }, "-=0.72");

        gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
          const visual = project.querySelector<HTMLElement>(".project-visual");
          const infoItems = project.querySelectorAll<HTMLElement>(".project-info > *");
          const scene = project.querySelector<HTMLElement>(".project-visual > div");

          if (visual) {
            gsap.from(visual, {
              clipPath: "inset(0 0 100% 0)",
              scale: 1.04,
              duration: 1.45,
              ease: "power4.inOut",
              clearProps: "transform,clipPath",
              scrollTrigger: { trigger: project, start: "top 84%", once: true },
            });
          }

          if (infoItems.length) {
            gsap.from(infoItems, {
              y: 65,
              autoAlpha: 0,
              duration: 0.95,
              stagger: 0.11,
              ease: "power4.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: { trigger: project, start: "top 66%", once: true },
            });
          }

          if (scene && desktop) {
            gsap.fromTo(scene, {
              yPercent: -4,
              scale: 1.05,
            }, {
              yPercent: 5,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: visual,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.25,
              },
            });
          }
        });

        const strengthsTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".strengths-heading", start: "top 82%", once: true },
        });
        strengthsTimeline
          .from(".strengths-heading h2", {
            ...titleFrom,
            duration: 1.5,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          })
          .from(".strengths-heading > p", {
            x: 80,
            autoAlpha: 0,
            duration: 1.05,
            clearProps: "transform,opacity,visibility",
          }, "-=0.72")
          .from(".strength-card", {
            y: 130,
            scale: 0.88,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.25,
            stagger: 0.16,
            ease: "power4.out",
            clearProps: "transform,clipPath",
          }, "-=0.58");

        gsap.from(".tool-line", {
          scaleX: 0.25,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          transformOrigin: "left center",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: ".tool-line", start: "top 88%", once: true },
        });

        const contactTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".contact", start: "top 74%", once: true },
        });
        contactTimeline
          .from(".contact-main > p", {
            y: 70,
            autoAlpha: 0,
            duration: 1.05,
            clearProps: "transform,opacity,visibility",
          })
          .from(".contact-main > a", {
            ...titleFrom,
            duration: 1.55,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          }, "-=0.62")
          .from(".contact-bottom > *", {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.13,
            clearProps: "transform,opacity,visibility",
          }, "-=0.7");

        if (desktop) {
          gsap.fromTo(".portrait-frame img", {
            yPercent: -4,
            scale: 1.07,
          }, {
            yPercent: 5,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: ".portrait-frame",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.25,
            },
          });
        }
      },
    );

      window.addEventListener("load", refresh, { once: true });

      cleanup = () => {
        document.documentElement.classList.remove("is-opening");
        releaseOpeningLock();
        if (openingFailsafe) window.clearTimeout(openingFailsafe);
        window.removeEventListener("load", refresh);
        media.revert();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="opening-overlay" ref={overlayRef} aria-hidden="true">
      <div className="opening-meta">
        <span>LAO XIAOWEN®</span>
        <span>VISUAL PORTFOLIO / 2026</span>
      </div>
      <div className="opening-center">
        <div className="opening-title-mask"><span>LAO XIAOWEN</span></div>
        <div className="opening-title-mask opening-title-small"><span>VISUAL DESIGNER</span></div>
      </div>
      <div className="opening-progress">
        <i />
        <span ref={counterRef}>000</span>
      </div>
    </div>
  );
}
