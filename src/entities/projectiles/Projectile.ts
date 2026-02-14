import { Entity } from '../../core/Entity';
import { Boulder } from '../enemies/Boulder';

export abstract class Projectile extends Entity {
    target: Boulder;
    speed: number;
    damage: number;

    constructor(x: number, y: number, radius: number, color: string, target: Boulder, speed: number, damage: number) {
        super(x, y, radius, color);
        this.target = target;
        this.speed = speed;
        this.damage = damage;
    }

    update(dt: number): void {
        if (this.target.markedForDeletion) {
            this.markedForDeletion = true;
            return;
        }

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5) {
            this.hit();
        } else {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
    }

    hit() {
        this.target.health -= this.damage;
        if (this.target.health <= 0) {
            this.target.markedForDeletion = true;
        }
        this.markedForDeletion = true;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
