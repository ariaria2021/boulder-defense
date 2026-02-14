import { Boulder } from './Boulder';
import type { Waypoint } from '../../map/GameMap';

export class MagmaBoulder extends Boulder {
    constructor(waypoints: Waypoint[]) {
        super(waypoints, 60, '#f44336'); // Glowing Red/Orange
        this.baseSpeed = 80;     // Faster base speed
        this.acceleration = 300; // Double acceleration on slopes!
        this.radius = 15;        // Smaller and nimble
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        // Add a glow effect for Magma
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff5722';
        ctx.strokeStyle = '#ff9800';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}
