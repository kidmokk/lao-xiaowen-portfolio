"use client";

import type { MouseEvent } from "react";

const items = [
  { id: "top", no: "01", label: "首页" },
  { id: "about", no: "02", label: "关于我" },
  { id: "work", no: "03", label: "精选项目" },
  { id: "strengths", no: "04", label: "个人优势" },
  { id: "contact", no: "05", label: "联系方式" },
];

export default function SectionNav() {
  const jumpToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    document.documentElement.classList.remove("is-opening");
    const openingOverlay = document.querySelector<HTMLElement>(".opening-overlay");
    if (openingOverlay) openingOverlay.style.display = "none";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    event.currentTarget.blur();
  };

  return (
    <nav className="section-nav" aria-label="作品集章节导航">
      <div className="section-nav-inner shell">
        <a className="section-nav-brand" href="#top" aria-label="返回首页" onClick={(event) => jumpToSection(event, "top")}>
          <span>✳</span> LXW / INDEX
        </a>
        <div className="section-nav-links">
          {items.map((item) => (
            <a href={`#${item.id}`} onClick={(event) => jumpToSection(event, item.id)} key={item.id}>
              <small>{item.no}</small>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <span className="section-nav-note">JUMP / MENU ↘</span>
      </div>
    </nav>
  );
}
