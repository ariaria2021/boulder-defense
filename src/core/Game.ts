import { Entity } from './Entity';
import { GameMap } from '../map/GameMap';
import { stage1 } from '../map/stages/stage1';
import { Boulder } from '../entities/enemies/Boulder';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    lastTime: number;
    entities: Entity[] = [];

    map: GameMap;
    spawnTimer: number = 0;
    spawnInterval: number = 2; // Spawn every 2 seconds

    // Logical resolution
    readonly logicalWidth = 800;
    readonly logicalHeight = 600;
    scale: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.map = new GameMap(stage1);

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
        // Spawn boulders for testing
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.entities.push(new Boulder(this.map.waypoints));
        }

        this.entities.forEach(entity => entity.update(dt));
        this.entities = this.entities.filter(entity => !entity.markedForDeletion);
    }

    draw() {
        // Clear background
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();

        const virtualWidth = this.logicalWidth * this.scale;
        const virtualHeight = this.logicalHeight * this.scale;
        const offsetX = (this.width - virtualWidth) / 2;
        const offsetY = (this.height - virtualHeight) / 2;

        this.ctx.translate(offsetX, offsetY);
        this.ctx.scale(this.scale, this.scale);

        // Background terrain (Grass)
        this.ctx.fillStyle = '#2e7d32';
        this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);

        // Draw Map
        this.map.draw(this.ctx);

        // Draw Entities
        this.entities.forEach(entity => entity.draw(this.ctx));

        this.ctx.restore();
    }
}
