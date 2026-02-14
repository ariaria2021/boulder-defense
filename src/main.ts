import './style.css';
import { Game } from './core/Game';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="game-container">
    <canvas id="gameCanvas"></canvas>
    <div id="ui-layer">
      <h1>Boulder Defense</h1>
      <p>Under Construction</p>
    </div>
  </div>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas')!;
const game = new Game(canvas);
game.start();
