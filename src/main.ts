import './style.css';
import { Game } from './core/Game';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="game-container">
    <div id="hud">
      <div class="stat"><span class="label">MONEY:</span> <span id="money-value">0</span></div>
      <div class="stat"><span class="label">LIVES:</span> <span id="lives-value">0</span></div>
    </div>
    <canvas id="gameCanvas"></canvas>
    <div id="ui-layer">
      <h1>Boulder Defense</h1>
    </div>
  </div>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!;
const game = new Game(canvas);
game.start();
