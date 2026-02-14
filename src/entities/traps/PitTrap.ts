import { Entity } from '../../core/Entity';

export class PitTrap extends Entity {
    constructor(x: number, y: number) {
        super(x, y, 20, '#000000');
    }

    update(_dt: number): void { }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}
