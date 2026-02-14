import './style.css';
import { Game } from './core/Game';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="game-container">
    <div id="hud">
      <div class="stat"><span class="label">所持金</span> <span id="money-value">0</span></div>
      <div class="stat"><span class="label">ライフ</span> <span id="lives-value">0</span></div>
    </div>
    <div id="skills-container"></div>
    <div id="lottery-overlay">
      <h2 style="color: var(--accent-gold); font-size: 1.5rem;">ウェーブクリア！</h2>
      <p style="opacity: 0.8;">特別スキルを獲得しました</p>
      <div id="lottery-result"></div>
      <button class="skill-btn" id="lottery-close" style="text-align: center; width: 100%;">次へ進む</button>
    </div>
    <canvas id="gameCanvas"></canvas>
    <div id="ui-layer">
      <h1>崖っぷち防衛隊</h1>
    </div>
  </div>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!;
const game = new Game(canvas);
game.start();
