import type { Metadata } from "next";

const appUrl = "/savor-ai/";

const gameUiScreens = [
  { src: "/game-ui-character.webp", title: "角色选择", label: "CHARACTER SELECT" },
  { src: "/game-ui-loadout.webp", title: "武器配置", label: "WEAPON LOADOUT" },
  { src: "/game-ui-map.webp", title: "关卡地图", label: "STAGE MAP" },
  { src: "/game-ui-briefing.webp", title: "任务简报", label: "MISSION BRIEFING" },
  { src: "/game-ui-crafting.webp", title: "安全屋与制作", label: "SAFE ROOM / CRAFTING" },
  { src: "/game-ui-inventory.webp", title: "背包系统", label: "INVENTORY" },
  { src: "/game-ui-skills.webp", title: "角色技能", label: "SKILL TREE" },
  { src: "/game-ui-gameplay.webp", title: "关卡 HUD", label: "GAMEPLAY HUD" },
  { src: "/game-ui-combat-a.webp", title: "战斗警报", label: "COMBAT STATE A" },
  { src: "/game-ui-combat-b.webp", title: "战斗状态", label: "COMBAT STATE B" },
  { src: "/game-ui-complete.webp", title: "任务结算", label: "MISSION COMPLETE" },
];

export const metadata: Metadata = {
  title: "UI 设计与 App 应用｜劳校文",
  description: "UI 设计方法与 SAVOR AI 智能饮食决策 App 应用展示。",
};

export default function UiAppCasePage() {
  return (
    <main className="case-page" id="top">
      <header className="case-nav case-shell">
        <a href="/#work">← 返回作品集</a>
        <span>PROJECT / 01</span>
        <a href={appUrl}>SAVOR AI ↗</a>
      </header>

      <section className="case-hero case-shell">
        <div className="case-kicker"><span>UI / UX</span><span>APP EXPERIENCE</span><span>2026</span></div>
        <h1><span>UI DESIGN</span><span>× APP</span></h1>
        <div className="case-hero-bottom">
          <p>由界面语言、交互路径到真实产品应用，展示设计如何转化成一套清晰、易用、有辨识度的数字体验。</p>
          <span>SCROLL TO CHOOSE ↓</span>
        </div>
      </section>

      <section className="case-choices case-shell" aria-label="选择查看内容">
        <a className="case-choice case-choice-ui" href="#ui-design">
          <figure className="case-choice-media" aria-hidden="true">
            <img src="/ui-app-cover-visual.webp" width="1672" height="941" loading="lazy" decoding="async" alt="" />
          </figure>
          <span>01 / PROCESS</span>
          <div>
            <p>界面、系统与体验</p>
            <h2>UI 设计</h2>
          </div>
          <i>↓</i>
        </a>
        <a className="case-choice case-choice-app" href="#app-application">
          <figure className="case-choice-media" aria-hidden="true">
            <img src="/app-application-preview.webp" width="1024" height="1536" loading="lazy" decoding="async" alt="" />
          </figure>
          <span>02 / PRODUCT</span>
          <div>
            <p>从设计到可操作产品</p>
            <h2>App 应用</h2>
          </div>
          <i>↓</i>
        </a>
      </section>

      <section className="case-section case-ui-section" id="ui-design">
        <div className="case-shell">
          <header className="case-section-head">
            <span>01 / GAME UI DESIGN</span>
            <h2>从选择到战斗，<br />让每一步都清晰。</h2>
            <p>围绕末日生存游戏的完整玩家路径，统一角色、装备、任务、地图、战斗 HUD 与结算体验。</p>
          </header>

          <div className="game-ui-overview">
            <article>
              <span>DEAD QUARANTINE / UI SYSTEM</span>
              <h3>一套覆盖完整游戏流程的界面语言</h3>
              <p>以低照度末日场景为基底，通过荧光绿状态反馈、紧凑信息层级与模块化卡片，让玩家在高压战斗中仍能快速识别目标和操作路径。</p>
            </article>
            <div className="game-ui-flow" aria-label="游戏 UI 设计范围">
              <div><b>01</b><span>选择与配置</span></div>
              <div><b>02</b><span>任务与地图</span></div>
              <div><b>03</b><span>战斗与状态</span></div>
              <div><b>04</b><span>结果与反馈</span></div>
            </div>
          </div>

          <div className="game-ui-gallery" aria-label="DEAD QUARANTINE 游戏 UI 界面展示">
            {gameUiScreens.map((screen, index) => (
              <figure className="game-ui-shot" key={screen.src}>
                <div className="game-ui-image-wrap">
                  <img
                    src={screen.src}
                    width="1456"
                    height="1092"
                    loading="lazy"
                    decoding="async"
                    alt={`DEAD QUARANTINE ${screen.title}界面`}
                  />
                </div>
                <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{screen.title}</strong><i>{screen.label}</i></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-app-section" id="app-application">
        <div className="case-shell app-application-grid">
          <div className="app-copy">
            <span>02 / APP APPLICATION</span>
            <p className="app-label">SAVOR AI · SMART FOOD DECISION</p>
            <h2>智能饮食<br />决策 App</h2>
            <p>一款围绕“今天吃什么”而设计的智能饮食决策产品。通过 AI 分析用户偏好、现有食材与健康目标，把复杂信息转化为清晰、即时的用餐建议。</p>
            <p className="app-intro-detail">从食材扫描、个性化菜式推荐到临期提醒，让用户更快作出选择，同时减少食物浪费。</p>
            <div className="app-features">
              <span>AI 智能推荐</span><span>食材扫描</span><span>临期提醒</span><span>健康模式</span>
            </div>
            <a className="app-launch" href={appUrl}>打开 SAVOR AI <span>↗</span></a>
          </div>

          <figure className="app-visual">
            <div className="app-orbit app-orbit-one" aria-hidden="true" />
            <div className="app-orbit app-orbit-two" aria-hidden="true" />
            <div className="app-phone-cluster" aria-label="SAVOR AI 智能饮食决策 App 手机界面展示">
              <div className="app-real-phone app-real-phone-left" aria-hidden="true">
                <i className="app-phone-speaker" />
                <img src="/app-application-preview.webp" width="1024" height="1536" loading="lazy" decoding="async" alt="" />
                <i className="app-phone-side-key app-phone-side-key-a" />
              </div>
              <div className="app-real-phone app-real-phone-main">
                <i className="app-phone-speaker" aria-hidden="true" />
                <img src="/app-application-preview.webp" width="1024" height="1536" loading="lazy" decoding="async" alt="SAVOR AI 智能饮食决策 App 首页界面" />
                <i className="app-phone-side-key app-phone-side-key-a" aria-hidden="true" />
                <i className="app-phone-side-key app-phone-side-key-b" aria-hidden="true" />
              </div>
              <div className="app-real-phone app-real-phone-right" aria-hidden="true">
                <i className="app-phone-speaker" />
                <img src="/app-application-preview.webp" width="1024" height="1536" loading="lazy" decoding="async" alt="" />
                <i className="app-phone-side-key app-phone-side-key-b" />
              </div>
            </div>
            <figcaption>PRODUCT UI / AI FOOD DECISION / 2026</figcaption>
          </figure>
        </div>
      </section>

      <footer className="case-footer case-shell">
        <a href="/#work">← 返回精選項目</a>
        <span>LAO XIAOWEN / VISUAL DESIGNER</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
