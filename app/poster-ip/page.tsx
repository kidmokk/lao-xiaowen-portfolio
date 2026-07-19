import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "创意平面海报与 IP 设计｜劳校文",
  description: "劳校文的创意海报、商业视觉与 IP 角色系统设计作品。",
};

const commercialPosters = [
  { src: "/poster-commercial-aesop.webp", title: "光影与香氛", label: "PRODUCT VISUAL / 01" },
  { src: "/poster-commercial-jacket.webp", title: "机能与天气", label: "PRODUCT VISUAL / 02" },
  { src: "/poster-commercial-ring.webp", title: "数据与睡眠", label: "PRODUCT VISUAL / 03" },
  { src: "/poster-commercial-mixer.webp", title: "器物与想象", label: "PRODUCT VISUAL / 04" },
];

const editorialPosters = [
  { src: "/poster-series-train.webp", title: "THE LAST TRAIN", label: "CITY WALK / 01" },
  { src: "/poster-series-signal.webp", title: "SIGNAL", label: "CITY WALK / 02" },
  { src: "/poster-series-silence.webp", title: "RED SILENCE", label: "CITY WALK / 03" },
  { src: "/poster-series-rain.webp", title: "AFTER RAIN", label: "CITY WALK / 04" },
];

const conceptPosters = [
  { src: "/poster-art-copy.webp", title: "艺术与文案", label: "ART DIRECTION / COPY" },
  { src: "/poster-aigc-contrast.webp", title: "欲望的两面", label: "AIGC NARRATIVE" },
  { src: "/poster-pixel-dental.webp", title: "像素警示", label: "SOCIAL CAMPAIGN" },
  { src: "/poster-ip-horse.webp", title: "透明独角兽", label: "MATERIAL STUDY" },
  { src: "/poster-concept-visual.webp", title: "屏幕之外", label: "EDITORIAL IMAGE" },
  { src: "/poster-aigc-code.webp", title: "YOU ARE THE CODE", label: "TECH POSTER" },
];

const ipObjects = [
  { src: "/ip-sheep-capsule.webp", title: "透明胶囊", label: "OBJECT / 01" },
  { src: "/ip-sheep-smile.webp", title: "软体表情", label: "OBJECT / 02" },
  { src: "/ip-sheep-spring.webp", title: "弹簧摆件", label: "OBJECT / 03" },
  { src: "/ip-sheep-windup.webp", title: "发条玩具", label: "OBJECT / 04" },
];

const ipCampaigns = [
  { src: "/ip-coffee-poster-a.webp", title: "暖心咖啡", label: "BRAND POSTER / 01" },
  { src: "/ip-coffee-poster-b.webp", title: "今日加油", label: "BRAND POSTER / 02" },
  { src: "/ip-coffee-poster-c.webp", title: "慢活时光", label: "BRAND POSTER / 03" },
  { src: "/ip-coffee-poster-d.webp", title: "治愈陪伴", label: "BRAND POSTER / 04" },
];

function Artwork({ src, title, label, className = "" }: { src: string; title: string; label: string; className?: string }) {
  return (
    <figure className={`poster-art-card ${className}`}>
      <div><img src={src} alt={title} loading="lazy" decoding="async" /></div>
      <figcaption><span>{label}</span><strong>{title}</strong></figcaption>
    </figure>
  );
}

export default function PosterIpPage() {
  return (
    <main className="poster-page" id="top">
      <header className="poster-nav poster-shell">
        <a href="/#work">← 返回作品集</a>
        <span>PROJECT / 02</span>
        <nav aria-label="页面章节"><a href="#posters">创意海报</a><a href="#ip-design">IP 设计</a></nav>
      </header>

      <section className="poster-hero poster-shell">
        <div className="poster-hero-kicker"><span>VISUAL / POSTER / CHARACTER</span><span>2026</span></div>
        <h1><span>POSTER</span><span>× IP</span></h1>
        <div className="poster-hero-bottom">
          <p>从单张画面的视觉冲击，到角色系统的长期延展；让概念被看见，也让形象被记住。</p>
          <span>SCROLL TO VIEW ↓</span>
        </div>
      </section>

      <nav className="poster-index poster-shell" aria-label="作品分类">
        <a href="#posters"><span>01</span><strong>创意海报系列</strong><i>CREATIVE POSTERS ↘</i></a>
        <a href="#ip-design"><span>02</span><strong>IP 设计内容</strong><i>CHARACTER SYSTEM ↘</i></a>
      </nav>

      <section className="poster-section poster-work" id="posters">
        <div className="poster-shell">
          <header className="poster-section-head">
            <span>01 / CREATIVE POSTERS</span>
            <h2>不是装饰画面，<br />而是建立视觉观点。</h2>
            <p>从商业产品、城市编辑到实验性视觉，以构图、光影、字体和叙事建立不同主题的情绪记忆。</p>
          </header>

          <div className="poster-subhead"><span>A</span><h3>商业概念视觉</h3><p>PRODUCT / LIGHT / MATERIAL</p></div>
          <div className="poster-commercial-grid">
            {commercialPosters.map((item) => <Artwork {...item} key={item.src} />)}
          </div>

          <div className="poster-subhead"><span>B</span><h3>城市海报系列</h3><p>TYPE / EDITORIAL / SERIES</p></div>
          <div className="poster-editorial-grid">
            {editorialPosters.map((item) => <Artwork {...item} key={item.src} />)}
          </div>

          <div className="poster-subhead"><span>C</span><h3>实验视觉海报</h3><p>AIGC / IMAGE / STORY</p></div>
          <div className="poster-concept-grid">
            {conceptPosters.map((item, index) => <Artwork {...item} className={`concept-card-${index + 1}`} key={item.src} />)}
          </div>
        </div>
      </section>

      <section className="poster-section ip-work" id="ip-design">
        <div className="poster-shell">
          <header className="poster-section-head ip-section-head">
            <span>02 / IP DESIGN</span>
            <h2>从一只羊开始，<br />建立完整品牌性格。</h2>
            <p>围绕咖啡、羊毛与治愈感提炼角色特征，并延展到表情、立体摆件、品牌海报和应用物料。</p>
          </header>

          <div className="ip-character-hero">
            <div className="ip-character-copy">
              <span>MAIN CHARACTER / MIEMIE</span>
              <div>
                <h3>咩咩</h3>
                <p>以咖啡泡沫、柔軟羊毛與療癒情緒建立角色記憶點，完整展示主體比例與核心造型。</p>
              </div>
              <div className="ip-character-tags">
                <span>咖啡羊</span>
                <span>治癒系</span>
                <span>品牌 IP</span>
              </div>
            </div>
            <figure className="ip-character-main">
              <img
                src="/ip-sheep-main.webp"
                width="1100"
                height="1600"
                alt="咩咩咖啡羊完整角色形象"
                loading="lazy"
                decoding="async"
              />
              <figcaption><span>01 / FRONT VIEW</span><strong>完整角色主體</strong></figcaption>
            </figure>
          </div>

          <div className="ip-system-grid">
            <Artwork src="/ip-character-system.webp" title="角色设定系统" label="MASTER CHARACTER SYSTEM" className="ip-system-main" />
            <Artwork src="/ip-character-poses.webp" title="性格与表情" label="POSE / EXPRESSION" />
            <Artwork src="/ui-design-preview.webp" title="角色视觉探索" label="VISUAL DEVELOPMENT" />
          </div>

          <div className="poster-subhead ip-subhead"><span>A</span><h3>立体造型延展</h3><p>TOY / OBJECT / FORM</p></div>
          <div className="ip-object-grid">
            {ipObjects.map((item) => <Artwork {...item} key={item.src} />)}
          </div>

          <div className="poster-subhead ip-subhead"><span>B</span><h3>品牌内容应用</h3><p>CAMPAIGN / SOCIAL / POSTER</p></div>
          <div className="ip-campaign-grid">
            {ipCampaigns.map((item) => <Artwork {...item} key={item.src} />)}
          </div>
        </div>
      </section>

      <footer className="poster-footer poster-shell">
        <a href="/#work">← 返回精选项目</a>
        <span>LAO XIAOWEN / VISUAL DESIGNER</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
