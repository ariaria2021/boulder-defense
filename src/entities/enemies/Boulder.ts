import { Entity } from '../core/Entity';
import { GameMap, Waypoint } from '../map/GameMap';

export class Boulder extends Entity {
    waypoints: Waypoint[];
    currentWaypointIndex: number = 0;

    speed: number = 0;       // Current speed
    baseSpeed: number = 60;  // Normal speed on flat ground
    acceleration: number = 150; // Gravity-like acceleration on slopes
    friction: number = 0.95;    // Air/Ground friction

    maxHealth: number;
    health: number;
    rotation: number = 0;

    constructor(waypoints: Waypoint[], health: number = 100, color: string = '#757575') {
        super(waypoints[0].x, waypoints[0].y, 20, color);
        this.waypoints = waypoints;
        this.maxHealth = health;
        this.health = health;
        this.speed = this.baseSpeed;
    }

    update(dt: number): void {
        if (this.currentWaypointIndex >= this.waypoints.length - 1) {
            this.markedForDeletion = true;
            // TODO: Emit base damaged event
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
            // Apply physics
            const segmentDx = target.x - current.x;
            const segmentDy = target.y - current.y;
            const segmentDist = Math.sqrt(segmentDx * segmentDx + segmentDy * segmentDy);

            // Calculate slope normalized (sine of angle)
            // positive means downhill (y increases)
            const sinTheta = segmentDy / segmentDist;

            // Acceleration based on slope (gravity)
            this.speed += sinTheta * this.acceleration * dt;

            // Minimal speed to keep moving
            if (this.speed < this.baseSpeed * 0.5) {
                this.speed = this.baseSpeed * 0.5;
            }

            // Move
            const moveDist = this.speed * dt;
            this.x += (dx / distance) * moveDist;
            this.y += (dy / distance) * moveDist;

            // Spin effect
            this.rotation += (this.speed / this.radius) * dt;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Boulder body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Rock texture/detail (cracks)
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.radius * 0.5, -this.radius * 0.2);
        ctx.lineTo(this.radius * 0.3, this.radius * 0.5);
        ctx.stroke();

        ctx.restore();

        // HP Bar
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
