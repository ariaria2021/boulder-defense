import { Tower } from './Tower';
import { Boulder } from '../enemies/Boulder';
import { Game } from '../../core/Game';
import { Cannonball } from '../projectiles/Cannonball';

export class Cannon extends Tower {
    constructor(x: number, y: number, game: Game) {
        super(x, y, 15, '#b71c1c', game);
        this.range = 180;
        this.maxCooldown = 1.2;
        this.cost = 100;
    }

    shoot(target: Boulder): void {
        this.game.entities.push(new Cannonball(this.x, this.y, target));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.fillStyle = '#424242';
        ctx.fillRect(this.x - 5, this.y - 18, 10, 20);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}
