import { Entity } from './Entity';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    lastTime: number;
    entities: Entity[] = [];

    // Logical resolution
    readonly logicalWidth = 800;
    readonly logicalHeight = 600;
    scale: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        const rect = canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.lastTime = 0;
    }

    resize() {
        const parent = this.canvas.parentElement;
        if (parent) {
            this.width = parent.clientWidth;
            this.height = parent.clientHeight;
        } else {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Calculate scale to fit logical resolution into window
        const scaleX = this.width / this.logicalWidth;
        const scaleY = this.height / this.logicalHeight;
        this.scale = Math.min(scaleX, scaleY);
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((ts) => this.loop(ts));
    }

    loop(timestamp: number) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame((ts) => this.loop(ts));
    }

    update(dt: number) {
        this.entities.forEach(entity => entity.update(dt));
        this.entities = this.entities.filter(entity => !entity.markedForDeletion);
    }

    draw() {
        // Clear screen with a background color
        this.ctx.fillStyle = '#1a1a1a'; // Dark background
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();

        // Center the game container
        const virtualWidth = this.logicalWidth * this.scale;
        const virtualHeight = this.logicalHeight * this.scale;
        const offsetX = (this.width - virtualWidth) / 2;
        const offsetY = (this.height - virtualHeight) / 2;

        this.ctx.translate(offsetX, offsetY);
        this.ctx.scale(this.scale, this.scale);

        // Draw game area background
        this.ctx.fillStyle = '#2d2d2d'; // Slightly lighter game area
        this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);

        // Grid for debugging
        this.drawGrid();

        this.entities.forEach(entity => entity.draw(this.ctx));

        this.ctx.restore();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.logicalWidth; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.logicalHeight);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.logicalHeight; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.logicalWidth, y);
            this.ctx.stroke();
        }
    }
}
