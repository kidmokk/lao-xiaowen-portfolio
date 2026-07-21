import type { Metadata } from "next";
import ClickSpark from "./ClickSpark";
import DotGrid from "./DotGrid";
import HeroVideo from "./HeroVideo";
import MotionSystem from "./MotionSystem";
import ProjectLoopVideo from "./ProjectLoopVideo";
import SectionNav from "./SectionNav";

export const metadata: Metadata = {
  title: "劳校文｜视觉设计师",
  description: "劳校文的个人作品集：AIGC 视觉、品牌设计、产品可视化与视频制作。",
};

const projects = [
  {
    no: "01",
    title: "UI 设计与 App 应用",
    subtitle: "从交互框架到高保真界面的完整应用体验",
    tags: ["UI DESIGN", "APP", "PROTOTYPE"],
    href: "/ui-app",
    external: false,
    ariaLabel: "打开 UI 设计与 App 应用二级网站",
    className: "visual-commerce",
    coverLabel: "UI DESIGN × APP",
    visual: (
      <div className="single-cover single-cover-ui" aria-hidden="true">
        <img src="/ui-app-cover-visual.webp" alt="" loading="lazy" decoding="async" />
        <div className="cover-index">01 / INTERFACE</div>
      </div>
    ),
  },
  {
    no: "02",
    title: "创意平面海报与 IP 设计",
    subtitle: "以创意海报与角色 IP 建立鲜明、可延展的视觉表达",
    tags: ["POSTER", "IP DESIGN", "ART DIRECTION"],
    href: "/poster-ip",
    external: false,
    ariaLabel: "打开创意平面海报与 IP 设计二级网站",
    className: "visual-event",
    coverLabel: "POSTER × IP DESIGN",
    visual: (
      <div className="single-cover single-cover-poster" aria-hidden="true">
        <img src="/ui-design-preview.webp" alt="" loading="lazy" decoding="async" />
        <div className="cover-index">02 / POSTER &amp; CHARACTER</div>
      </div>
    ),
  },
  {
    no: "03",
    title: "AIGC 漫画制作",
    subtitle: "从角色设定、分镜到连续画面的 AI 漫画叙事",
    tags: ["AIGC", "COMIC", "STORYBOARD"],
    href: "/aigc-comic",
    external: false,
    ariaLabel: "打开 AIGC 漫画制作二级网站",
    className: "visual-data",
    coverLabel: "AIGC × COMIC",
    visual: (
      <div className="single-cover single-cover-comic" aria-hidden="true">
        <ProjectLoopVideo
          src="/aigc-comic-loop.mp4"
          mobileSrc="/aigc-comic-loop-mobile.mp4"
          poster="/aigc-comic-flight.webp"
        />
        <div className="cover-index">03 / FRAME &amp; STORY</div>
      </div>
    ),
  },
  {
    no: "04",
    title: "准落地企业官网",
    subtitle: "从品牌梳理、UI/UX 设计到开发上线的完整企业官网方案",
    tags: ["CORPORATE WEBSITE", "UI / UX", "LAUNCH"],
    href: "https://haihuitong-pipe-site.pages.dev/",
    external: true,
    ariaLabel: "打开海汇通塑料管企业官网（新窗口）",
    className: "visual-web",
    coverLabel: "CORPORATE × WEBSITE",
    visual: (
      <div className="single-cover single-cover-corporate" aria-hidden="true">
        <img src="/corporate-site-cover.webp" alt="" loading="lazy" decoding="async" />
        <div className="cover-index">04 / CORPORATE WEB</div>
      </div>
    ),
  },
];

const strengths = [
  { no: "A", title: "AI 工作流", en: "AI WORKFLOW", text: "熟练运用 Codex、GPT、Midjourney、即梦（Jimeng）及多类图像与视频生成工具；能够搭建 Prompt 架构、参考图控制、角色与风格一致性、批量生成、多模态协作及 Vibe Coding 原型工作流，把创意生产转化为可复用的系统。", accent: "blue" },
  { no: "B", title: "品牌视觉", en: "BRAND SYSTEM", text: "从品牌定位、视觉策略与核心识别出发，建立可延展的品牌视觉语言；覆盖 VI、海报、电商视觉、包装、产品样册、展会与海外传播物料，让品牌在不同平台与触点保持一致且具有辨识度。", accent: "lime" },
  { no: "C", title: "商业落地", en: "DELIVERY", text: "能够将创意从概念推进至真实业务场景，统筹信息架构、视觉设计、内容生产与执行规范；兼顾审美、传播效率、制作成本和上线条件，完成从提案到交付、从界面到企业官网的完整落地。", accent: "silver" },
  { no: "D", title: "动态内容", en: "MOTION", text: "具备脚本拆解、分镜设计、镜头提示词、连续画面控制、AI 视频生成与后期制作能力；可针对品牌宣传、产品发布、社交媒体及活动传播，建立兼具节奏、叙事与电影感的动态内容。", accent: "violet" },
];

export default function Home() {
  return (
    <ClickSpark
      sparkColor="#ffcc00"
      sparkSize={18}
      sparkRadius={42}
      sparkCount={10}
      duration={600}
    >
    <MotionSystem />
    <main>
      <section className="hero" id="top">
        <div className="hero-dot-grid" aria-hidden="true">
          <DotGrid
            dotSize={10}
            gap={42}
            baseColor="#000000"
            activeColor="#EAB308"
            proximity={180}
            speedTrigger={220}
            shockRadius={250}
            shockStrength={5}
            maxSpeed={3500}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <nav className="nav shell" aria-label="主导航">
          <a className="wordmark" href="#top" aria-label="返回首页">
            <strong>LXW</strong>
            <span>VISUAL DESIGN<br />PORTFOLIO</span>
          </a>
          <div className="nav-links">
            <a href="#work">精选项目</a>
            <a href="#about">关于我</a>
            <a href="#strengths">设计能力</a>
            <a href="#contact">联系方式</a>
          </div>
          <a className="nav-contact" href="mailto:472899590@qq.com"><span>↳</span> 讨论合作</a>
        </nav>

        <div className="hero-stage shell">
          <div className="hero-side-copy">
            <b>把创意转译成<br />清晰、有记忆点的<br />视觉语言</b>
            <span>FOSHAN · CHINA</span>
          </div>

          <div className="hero-frame">
            <HeroVideo />
            <div className="hero-frame-wash" aria-hidden="true" />
            <div className="doodle doodle-one" aria-hidden="true"><i /><i /><i /><i /><i /><b /></div>
            <div className="doodle doodle-two" aria-hidden="true"><i /><i /><i /><i /><i /><b /></div>
            <div className="doodle doodle-three" aria-hidden="true"><i /><i /><i /><i /><i /><b /></div>
            <img className="hero-portrait" src="/hero-subject-latest.webp" width="997" height="927" fetchPriority="high" decoding="async" alt="首页手绘多眼角色主体" />
            <i className="corner corner-tl" aria-hidden="true" />
            <i className="corner corner-tr" aria-hidden="true" />
            <i className="corner corner-bl" aria-hidden="true" />
            <i className="corner corner-br" aria-hidden="true" />
            <span className="frame-label">PORTRAIT / 001</span>
          </div>

          <a className="hero-work-card" href="#work">
            <span>SELECTED</span>
            <strong>WORK</strong>
            <i>VIEW PROJECTS ·</i>
          </a>
        </div>

        <div className="hero-handline">AIGC — BRAND — MOTION — VISUAL</div>
        <h1 className="hero-title" aria-label="视觉设计师 劳校文">
          <span><i>视觉设计师</i></span>
          <span><i>LAO XIAOWEN</i></span>
        </h1>
        <a className="hero-scroll" href="#about">SCROLL TO EXPLORE ↓</a>
      </section>

      <SectionNav />

      <section className="about section shell" id="about">
        <header className="section-head">
          <span>02 / PROFILE</span>
          <p>关于我与经历</p>
        </header>
        <div className="about-grid">
          <div className="portrait-wrap">
            <div className="portrait-frame">
              <img src="/portrait.webp" width="1131" height="1395" loading="lazy" decoding="async" alt="视觉设计师劳校文的个人照片" />
              <span>LAO XIAOWEN®</span>
            </div>
            <div className="portrait-note"><i /> OPEN TO CREATIVE COLLABORATION</div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">HELLO, I AM XIAOWEN.</p>
            <h2>我关注的不只是画面，<br />还有画面背后的<span>方法。</span></h2>
            <p className="about-lead">以视觉设计为核心，深度整合 AIGC 与创意技术工作流。熟练运用 AI 完成影像生成、视觉创作、动态内容与 Vibe Coding（AI 编程）原型开发，将概念快速转化为兼具审美、叙事与商业落地能力的完整体验。</p>
            <div className="quick-contact">
              <a href="mailto:472899590@qq.com">472899590@qq.com <span>↗</span></a>
              <a href="tel:+8613549980934">+86 135 4998 0934 <span>↗</span></a>
            </div>
          </div>
        </div>

        <div className="stats" aria-label="个人数据">
          <div><b>3.6</b><span>GPA / 专业前 10%</span></div>
          <div><b>10<sup>+</sup></b><span>统筹校园活动</span></div>
          <div><b>1000<sup>+</sup></b><span>活动累计参与人数</span></div>
          <div><b>04</b><span>视觉设计核心方向</span></div>
        </div>

        <div className="timeline">
          <div className="timeline-intro">
            <p className="eyebrow">EXPERIENCE</p>
            <h3>实践中的<br />设计成长</h3>
          </div>
          <div className="timeline-list">
            <article>
              <time>2025.10 — 2026.04</time>
              <div><h4>广东小艺科技</h4><p>海报设计 / 平面设计</p></div>
              <span>电商视觉、产品精修、视频、包装、展会与品牌物料</span>
            </article>
            <article>
              <time>2025.06 — 2025.09</time>
              <div><h4>佛山市诺那托电气有限公司</h4><p>活动策划 / 品牌设计</p></div>
              <span>活动视觉、导视系统、品牌物料与数据可视化</span>
            </article>
            <article>
              <time>任职期间</time>
              <div><h4>海汇通塑料有限公司</h4><p>平面设计师</p></div>
              <span>电商视觉、宣传海报、展会与品牌物料；视频制作与宣发；官方网站制作及上线</span>
            </article>
            <article>
              <time>任职期间</time>
              <div><h4>佛山市元赫科技</h4><p>产品设计师</p></div>
              <span>产品精修与上架、Amazon 与速卖通海外宣传视觉；公司年会整体策划、设计排版与 PPT 制作；平台搭建</span>
            </article>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <header className="section-head">
            <span>03 / SELECTED WORK</span>
            <p>精选项目</p>
          </header>
          <div className="work-title-row">
            <h2>工作不是堆叠，<br />是<span>清晰的选择。</span></h2>
            <p>当前为根据简历方向搭建的项目结构。<br />真实作品图将在下一版替换。</p>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const content = <>
                <div className={`project-visual ${project.className}`}>{project.visual}<span className="replace-label">{project.coverLabel}</span></div>
                <div className="project-info">
                  <div className="project-number">/ {project.no}</div>
                  <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-arrow" aria-hidden="true">↗</div>
                </div>
              </>;

              return project.href ? (
                <a
                  className="project project-link"
                  href={project.href}
                  aria-label={project.ariaLabel}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noreferrer" : undefined}
                  key={project.no}
                >
                  {content}
                </a>
              ) : (
                <article className="project" key={project.no}>{content}</article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <header className="section-head">
          <span>04 / CAPABILITIES</span>
          <p>个人优势</p>
        </header>
        <div className="strengths-heading">
          <h2>设计判断力，<br />加上<span>新工具。</span></h2>
          <p>AI 是加速器，审美、逻辑和对商业场景的理解，才是最终输出的边界。</p>
        </div>
        <div className="strength-grid">
          {strengths.map((item) => (
            <article className={`strength-card accent-${item.accent}`} key={item.no}>
              <div className="card-top"><span>{item.no}</span><i /></div>
              <div><p>{item.en}</p><h3>{item.title}</h3></div>
              <p className="card-copy">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="tool-line">
          <span>TOOLS & FOCUS</span>
          <p>CODEX · GPT · MIDJOURNEY · JIMENG · AIGC · PROMPT SYSTEM · VIDEO · VIBE CODING · UI · BRAND</p>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-orb" aria-hidden="true">
          <ProjectLoopVideo src="/contact-loop.mp4" />
        </div>
        <div className="shell contact-inner">
          <div className="contact-top">
            <span>05 / CONTACT</span>
            <p><i className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</p>
          </div>
          <div className="contact-main">
            <p>有想法？让我们把它<br />变成真正好用的视觉。</p>
            <a href="mailto:472899590@qq.com">一起合作<span>↗</span></a>
          </div>
          <div className="contact-bottom">
            <div><span>EMAIL</span><a href="mailto:472899590@qq.com">472899590@qq.com</a></div>
            <div><span>PHONE</span><a href="tel:+8613549980934">+86 135 4998 0934</a></div>
            <div><span>BASE</span><p>FOSHAN, GUANGDONG</p></div>
            <a className="back-top" href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
    </main>
    </ClickSpark>
  );
}
