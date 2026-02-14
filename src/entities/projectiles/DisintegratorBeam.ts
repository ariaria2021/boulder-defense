import { Projectile } from './Projectile';
import { Boulder } from '../enemies/Boulder';

export class DisintegratorBeam extends Projectile {
    constructor(x: number, y: number, target: Boulder) {
        super(x, y, 2, '#ea80fc', target, 1000, 150);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
    }
}
