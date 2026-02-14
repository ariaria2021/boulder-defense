import { Entity } from '../../core/Entity';

export class JumpPad extends Entity {
    cooldown: number = 0;
    readonly maxCooldown: number = 2.0;

    constructor(x: number, y: number) {
        super(x, y, 20, '#ff9800');
    }

    update(dt: number): void {
        if (this.cooldown > 0) this.cooldown -= dt;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.cooldown > 0 ? '#ffcc80' : this.color;
        ctx.fillRect(this.x - 15, this.y - 15, 30, 30);
    }
}
