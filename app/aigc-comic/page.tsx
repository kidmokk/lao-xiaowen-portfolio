import type { Metadata } from "next";
import ProjectLoopVideo from "../ProjectLoopVideo";

export const metadata: Metadata = {
  title: "AIGC 漫画制作｜劳校文",
  description: "AIGC 动画、漫画叙事与动态影像作品集。",
};

const series = [
  {
    no: "01",
    id: "ink-story",
    kicker: "HAND-DRAWN / INK / DRAMA",
    title: "水墨・手绘叙事",
    summary: "以人物情绪作为叙事入口，将近景表演与泼墨式战斗空间连接成同一段东方动画语境。",
    tone: "ink",
    films: [
      { src: "/aigc-ink-01.mp4", no: "01—A", title: "人物关系与情绪近景", note: "CHARACTER / EMOTION" },
      { src: "/aigc-ink-02.mp4", no: "01—B", title: "水墨战斗空间", note: "INK / ACTION" },
    ],
  },
  {
    no: "02",
    id: "healing-story",
    kicker: "WARM / DAILY LIFE / HEALING",
    title: "治愈系日常动画",
    summary: "用柔和线条、温暖色温与缓慢镜头建立生活感，让连续片段保持自然、安静的呼吸节奏。",
    tone: "healing",
    films: [
      { src: "/aigc-healing-01.mp4", no: "02—A", title: "暖调日常・上篇", note: "OPENING / 00—15S" },
      { src: "/aigc-healing-02.mp4", no: "02—B", title: "暖调日常・续篇", note: "CONTINUATION / 16—30S" },
    ],
  },
  {
    no: "03",
    id: "fantasy-story",
    kicker: "3D / FANTASY / OPEN WORLD",
    title: "高山花海幻想冒险",
    summary: "融合日系幻想、开放世界游戏宣传片与电影级镜头语言，完成从低空飞行到高山探索的连续冒险。",
    tone: "fantasy",
    films: [
      { src: "/aigc-comic-loop.mp4", no: "03—A", title: "花海低空飞行", note: "FLIGHT / 00—15S", poster: "/aigc-comic-flight.webp" },
      { src: "/aigc-fantasy-02.mp4", no: "03—B", title: "高山冒险・续篇", note: "CONTINUATION / 16—30S", poster: "/aigc-comic-flight.webp" },
    ],
  },
];

export default function AigcComicPage() {
  return (
    <main className="aigc-page" id="top">
      <nav className="aigc-nav aigc-shell">
        <a className="aigc-logo" href="/" aria-label="返回首页">
          <strong>LXW</strong><span>VISUAL DESIGN<br />PORTFOLIO</span>
        </a>
        <span>AIGC / COMIC / MOTION</span>
        <div>
          <a href="#series">系列作品</a>
          <a href="/#work">返回精选项目 ↗</a>
        </div>
      </nav>

      <section className="aigc-hero aigc-shell" aria-labelledby="aigc-title">
        <div className="aigc-dots" aria-hidden="true" />
        <div className="aigc-scribble" aria-hidden="true"><i /><i /><i /></div>
        <div className="aigc-hero-stage">
          <div className="aigc-hero-copy">
            <span>AI × STORY × MOTION</span>
            <p>从角色、镜头、氛围到连续动态影像，探索 AIGC 在动画叙事中的视觉可能。</p>
          </div>
          <div className="aigc-hero-film">
            <ProjectLoopVideo src="/aigc-comic-loop.mp4" poster="/aigc-comic-flight.webp" />
            <span>SHOWREEL / AUTO LOOP</span>
          </div>
          <div className="aigc-hero-badge"><small>SELECTED</small><strong>03</strong><span>SERIES</span></div>
        </div>
        <header className="aigc-hero-title" id="aigc-title">
          <span>AIGC</span><span>漫画制作</span>
        </header>
        <div className="aigc-hero-foot"><span>LAO XIAOWEN / 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="aigc-index" id="series" aria-label="作品系列导航">
        <div className="aigc-shell">
          {series.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              <span>{item.no}</span><strong>{item.title}</strong><small>{item.kicker}</small>
            </a>
          ))}
        </div>
      </section>

      {series.map((item) => (
        <section className={`aigc-series aigc-series-${item.tone}`} id={item.id} key={item.id}>
          <div className="aigc-shell">
            <header className="aigc-series-head">
              <span>{item.no}</span>
              <div><small>{item.kicker}</small><h2>{item.title}</h2></div>
              <p>{item.summary}</p>
            </header>

            <div className="aigc-film-pair">
              {item.films.map((film, index) => (
                <figure className={`aigc-film aigc-film-${index + 1}`} key={film.src}>
                  <div className="aigc-film-frame">
                    <ProjectLoopVideo src={film.src} poster={"poster" in film ? film.poster : undefined} />
                    <span className="aigc-film-status">AUTO LOOP ●</span>
                    <i className="aigc-film-corner aigc-film-corner-a" />
                    <i className="aigc-film-corner aigc-film-corner-b" />
                  </div>
                  <figcaption><span>{film.no} / {film.note}</span><strong>{film.title}</strong></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className="aigc-footer aigc-shell">
        <a href="/#work">← 返回精选项目</a>
        <strong>AIGC / COMIC / MOTION / VISUAL</strong>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
