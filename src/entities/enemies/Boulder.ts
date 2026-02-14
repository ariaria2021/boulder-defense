import { Entity } from '../../core/Entity';
import type { Waypoint } from '../../map/GameMap';

export class Boulder extends Entity {
    waypoints: Waypoint[];
    currentWaypointIndex: number = 0;

    speed: number = 0;
    baseSpeed: number = 60;
    acceleration: number = 150;
    friction: number = 0.95;

    maxHealth: number;
    health: number;
    rotation: number = 0;
    baseRadius: number;

    constructor(waypoints: Waypoint[], health: number = 100, color: string = '#757575') {
        super(waypoints[0].x, waypoints[0].y, 20, color);
        this.waypoints = waypoints;
        this.maxHealth = health;
        this.health = health;
        this.speed = this.baseSpeed;
        this.baseRadius = 20;
    }

    update(dt: number): void {
        if (this.currentWaypointIndex >= this.waypoints.length - 1) {
            this.markedForDeletion = true;
            return;
        }

        const target = this.waypoints[this.currentWaypointIndex + 1];
        const current = this.waypoints[this.currentWaypointIndex];

        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            this.currentWaypointIndex++;
        } else {
            const segmentDx = target.x - current.x;
            const segmentDy = target.y - current.y;
            const segmentDist = Math.sqrt(segmentDx * segmentDx + segmentDy * segmentDy);

            const sinTheta = segmentDy / segmentDist;
            this.speed += sinTheta * this.acceleration * dt;

            if (this.speed < this.baseSpeed * 0.5) {
                this.speed = this.baseSpeed * 0.5;
            }

            const moveDist = this.speed * dt;
            this.x += (dx / distance) * moveDist;
            this.y += (dy / distance) * moveDist;

            this.rotation += (this.speed / this.radius) * dt;

            // Shrink based on health
            const hpPercent = this.health / this.maxHealth;
            this.radius = 8 + (this.baseRadius - 8) * hpPercent;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.radius * 0.5, -this.radius * 0.2);
        ctx.lineTo(this.radius * 0.3, this.radius * 0.5);
        ctx.stroke();

        ctx.restore();

        this.drawHPBar(ctx);
    }

    private drawHPBar(ctx: CanvasRenderingContext2D) {
        const barWidth = 30;
        const barHeight = 4;
        const hpPercent = this.health / this.maxHealth;

        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - barWidth / 2, this.y - this.radius - 10, barWidth, barHeight);

        ctx.fillStyle = hpPercent > 0.5 ? '#4caf50' : hpPercent > 0.2 ? '#ffeb3b' : '#f44336';
        ctx.fillRect(this.x - barWidth / 2, this.y - this.radius - 10, barWidth * hpPercent, barHeight);
    }
}
