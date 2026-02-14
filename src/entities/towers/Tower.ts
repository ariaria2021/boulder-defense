import { Entity } from '../../core/Entity';
import { Boulder } from '../enemies/Boulder';
import { Game } from '../../core/Game';

export abstract class Tower extends Entity {
    game: Game;
    range: number = 150;
    cooldown: number = 0;
    maxCooldown: number = 1.0;
    cost: number = 100;

    constructor(x: number, y: number, radius: number, color: string, game: Game) {
        super(x, y, radius, color);
        this.game = game;
    }

    update(dt: number): void {
        if (this.cooldown > 0) {
            this.cooldown -= dt;
        }

        if (this.cooldown <= 0) {
            const target = this.findTarget();
            if (target) {
                this.shoot(target);
                this.cooldown = this.maxCooldown;
            }
        }
    }

    findTarget(): Boulder | null {
        let nearest: Boulder | null = null;
        let minDistance = this.range;

        this.game.entities.forEach(entity => {
            if (entity instanceof Boulder && !entity.markedForDeletion) {
                const dx = entity.x - this.x;
                const dy = entity.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearest = entity;
                }
            }
        });

        return nearest;
    }

    abstract shoot(target: Boulder): void;

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
        ctx.stroke();
    }
}
