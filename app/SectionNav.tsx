"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "top", no: "01", label: "首页" },
  { id: "about", no: "02", label: "关于我" },
  { id: "work", no: "03", label: "精选项目" },
  { id: "strengths", no: "04", label: "个人优势" },
  { id: "contact", no: "05", label: "联系方式" },
];

export default function SectionNav() {
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    let frame = 0;
    let offsets: Array<{ id: string; top: number }> = [];

    const measureSections = () => {
      offsets = items.flatMap((item) => {
        const section = document.getElementById(item.id);
        return section
          ? [{ id: item.id, top: section.getBoundingClientRect().top + window.scrollY }]
          : [];
      });
    };

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.36;
      let current = items[0].id;

      for (const item of offsets) {
        if (item.top <= marker) current = item.id;
      }

      setActiveId((previous) => previous === current ? previous : current);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    const handleLayoutChange = () => {
      measureSections();
      scheduleUpdate();
    };

    const handleNavClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      setActiveId(id);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    measureSections();
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("load", handleLayoutChange, { once: true });
    document.querySelector(".section-nav")?.addEventListener("click", handleNavClick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("load", handleLayoutChange);
      document.querySelector(".section-nav")?.removeEventListener("click", handleNavClick);
    };
  }, []);

  return (
    <nav className="section-nav" aria-label="作品集章节导航">
      <div className="section-nav-inner shell">
        <a className="section-nav-brand" href="#top" aria-label="返回首页">
          <span>✳</span> LXW / INDEX
        </a>
        <div className="section-nav-links">
          {items.map((item) => (
            <a
              className={activeId === item.id ? "is-active" : undefined}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              key={item.id}
            >
              <small>{item.no}</small>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <span className="section-nav-note">SCROLL / MENU ↘</span>
      </div>
    </nav>
  );
}
