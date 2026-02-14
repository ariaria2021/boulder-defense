import { Tower } from './Tower';
import { Boulder } from '../enemies/Boulder';
import { Game } from '../../core/Game';
import { AcidStream } from '../projectiles/AcidStream';

export class AcidSprayer extends Tower {
    constructor(x: number, y: number, game: Game) {
        super(x, y, 15, '#2e7d32', game);
        this.range = 100;
        this.maxCooldown = 0.2;
        this.cost = 150;
    }

    shoot(target: Boulder): void {
        this.game.entities.push(new AcidStream(this.x, this.y, target));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.fillStyle = '#8bc34a';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}
