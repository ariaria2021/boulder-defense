export interface Waypoint {
    x: number;
    y: number;
}

export interface StageData {
    id: number;
    name: string;
    waypoints: Waypoint[];
    pathWidth: number;
}

export class GameMap {
    waypoints: Waypoint[] = [];
    pathWidth: number = 40;

    constructor(stageData: StageData) {
        this.waypoints = stageData.waypoints;
        this.pathWidth = stageData.pathWidth;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.waypoints.length < 2) return;

        // Draw shadow/depth for the path
        ctx.strokeStyle = '#3d2b1f'; // Darker brown for depth
        ctx.lineWidth = this.pathWidth + 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        this.strokePath(ctx);

        // Draw the main path
        ctx.strokeStyle = '#5d4037'; // Earthy brown
        ctx.lineWidth = this.pathWidth;
        this.strokePath(ctx);

        // Draw markers
        this.drawMarker(ctx, this.waypoints[0], '#4caf50'); // Start (Green)
        this.drawMarker(ctx, this.waypoints[this.waypoints.length - 1], '#f44336'); // Goal (Red)
    }

    private strokePath(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.waypoints[0].x, this.waypoints[0].y);
        for (let i = 1; i < this.waypoints.length; i++) {
            ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y);
        }
        ctx.stroke();
    }

    private drawMarker(ctx: CanvasRenderingContext2D, point: Waypoint, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    getDistanceBetweenWaypoints(index1: number, index2: number): number {
        const p1 = this.waypoints[index1];
        const p2 = this.waypoints[index2];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
