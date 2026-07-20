"use client";

const items = [
  { id: "top", no: "01", label: "首页" },
  { id: "about", no: "02", label: "关于我" },
  { id: "work", no: "03", label: "精选项目" },
  { id: "strengths", no: "04", label: "个人优势" },
  { id: "contact", no: "05", label: "联系方式" },
];

export default function SectionNav() {
  return (
    <nav className="section-nav" aria-label="作品集章节导航">
      <div className="section-nav-inner shell">
        <a className="section-nav-brand" href="#top" aria-label="返回首页">
          <span>✳</span> LXW / INDEX
        </a>
        <div className="section-nav-links">
          {items.map((item) => (
            <a
              href={`#${item.id}`}
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
