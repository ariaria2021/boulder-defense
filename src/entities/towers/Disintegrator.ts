import { Tower } from './Tower';
import { Boulder } from '../enemies/Boulder';
import { Game } from '../../core/Game';
import { DisintegratorBeam } from '../projectiles/DisintegratorBeam';

export class Disintegrator extends Tower {
    constructor(x: number, y: number, game: Game) {
        super(x, y, 18, '#4a148c', game);
        this.range = 250;
        this.maxCooldown = 3.0;
        this.cost = 300;
    }

    shoot(target: Boulder): void {
        this.game.entities.push(new DisintegratorBeam(this.x, this.y, target));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.fillStyle = '#ea80fc';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 15);
        ctx.lineTo(this.x + 8, this.y);
        ctx.lineTo(this.x, this.y + 15);
        ctx.lineTo(this.x - 8, this.y);
        ctx.closePath();
        ctx.fill();
    }
}
