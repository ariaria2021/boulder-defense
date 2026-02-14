import { Entity } from './Entity';
import { GameMap } from '../map/GameMap';
import { stage1 } from '../map/stages/stage1';
import { Boulder } from '../entities/enemies/Boulder';
import { Cannon } from '../entities/towers/Cannon';
import { AcidSprayer } from '../entities/towers/AcidSprayer';
import { Disintegrator } from '../entities/towers/Disintegrator';
import { PlayerStats } from '../systems/PlayerStats';
import { Tower } from '../entities/towers/Tower';
import { PitTrap } from '../entities/traps/PitTrap';
import { JumpPad } from '../entities/traps/JumpPad';

type TowerType = 'CANNON' | 'ACID' | 'DISINTEGRATOR';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    lastTime: number = 0;
    entities: Entity[] = [];

    map: GameMap;
    stats: PlayerStats;

    selectedTower: TowerType = 'CANNON';

    spawnTimer: number = 0;
    spawnInterval: number = 3.0;

    readonly logicalWidth = 800;
    readonly logicalHeight = 600;
    scale: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.map = new GameMap(stage1);
        this.stats = new PlayerStats();

        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        this.entities.push(new PitTrap(600, 400));
        this.entities.push(new JumpPad(300, 250));
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key === '1') this.selectedTower = 'CANNON';
        if (e.key === '2') this.selectedTower = 'ACID';
        if (e.key === '3') this.selectedTower = 'DISINTEGRATOR';
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.width = parent ? parent.clientWidth : window.innerWidth;
        this.height = parent ? parent.clientHeight : window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        const scaleX = this.width / this.logicalWidth;
        const scaleY = this.height / this.logicalHeight;
        this.scale = Math.min(scaleX, scaleY);
    }

    handleClick(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const virtualWidth = this.logicalWidth * this.scale;
        const virtualHeight = this.logicalHeight * this.scale;
        const offsetX = (this.width - virtualWidth) / 2;
        const offsetY = (this.height - virtualHeight) / 2;

        const lx = (e.clientX - rect.left - offsetX) / this.scale;
        const ly = (e.clientY - rect.top - offsetY) / this.scale;

        if (lx < 0 || lx > this.logicalWidth || ly < 0 || ly > this.logicalHeight) return;

        const snapX = Math.round(lx / 40) * 40;
        const snapY = Math.round(ly / 40) * 40;

        const exists = this.entities.some(ent => (ent instanceof Tower || ent instanceof PitTrap || ent instanceof JumpPad) && ent.x === snapX && ent.y === snapY);
        if (exists) return;

        let tower: Tower | null = null;
        if (this.selectedTower === 'CANNON' && this.stats.spendMoney(100)) {
            tower = new Cannon(snapX, snapY, this);
        } else if (this.selectedTower === 'ACID' && this.stats.spendMoney(150)) {
            tower = new AcidSprayer(snapX, snapY, this);
        } else if (this.selectedTower === 'DISINTEGRATOR' && this.stats.spendMoney(300)) {
            tower = new Disintegrator(snapX, snapY, this);
        }

        if (tower) this.entities.push(tower);
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
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnRandomEnemy();
        }

        this.entities.forEach(entity => {
            entity.update(dt);

            if (entity instanceof Boulder) {
                this.checkTrapCollision(entity);
                if (entity.markedForDeletion) {
                    if (entity.currentWaypointIndex >= this.map.waypoints.length - 1) {
                        this.stats.takeDamage(1);
                    } else if (entity.health <= 0) {
                        this.stats.addMoney(25);
                    }
                }
            }
        });

        this.entities = this.entities.filter(entity => !entity.markedForDeletion);
    }

    private checkTrapCollision(boulder: Boulder) {
        this.entities.forEach(trap => {
            if (trap instanceof PitTrap && !trap.markedForDeletion) {
                const dist = Math.sqrt((boulder.x - trap.x) ** 2 + (boulder.y - trap.y) ** 2);
                if (dist < 20 && boulder.health < 50) {
                    boulder.markedForDeletion = true;
                    trap.markedForDeletion = true;
                }
            } else if (trap instanceof JumpPad && trap.cooldown <= 0) {
                const dist = Math.sqrt((boulder.x - trap.x) ** 2 + (boulder.y - trap.y) ** 2);
                if (dist < 20) {
                    boulder.speed = -100;
                    trap.cooldown = trap.maxCooldown;
                }
            }
        });
    }

    private async spawnRandomEnemy() {
        const rand = Math.random();
        // Use dynamic imports to avoid circular dependency if needed, but here we can just use them
        if (rand < 0.6) {
            const { NormalBoulder } = await import('../entities/enemies/NormalBoulder');
            this.entities.push(new NormalBoulder(this.map.waypoints));
        } else if (rand < 0.8) {
            const { MetalBoulder } = await import('../entities/enemies/MetalBoulder');
            this.entities.push(new MetalBoulder(this.map.waypoints));
        } else {
            const { MagmaBoulder } = await import('../entities/enemies/MagmaBoulder');
            this.entities.push(new MagmaBoulder(this.map.waypoints));
        }
    }

    draw() {
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();
        const virtualWidth = this.logicalWidth * this.scale;
        const virtualHeight = this.logicalHeight * this.scale;
        const offsetX = (this.width - virtualWidth) / 2;
        const offsetY = (this.height - virtualHeight) / 2;
        this.ctx.translate(offsetX, offsetY);
        this.ctx.scale(this.scale, this.scale);

        this.ctx.fillStyle = '#2e7d32';
        this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);

        this.map.draw(this.ctx);
        this.entities.forEach(entity => entity.draw(this.ctx));

        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Selected: ${this.selectedTower} (1,2,3 to switch)`, 10, 580);

        this.ctx.restore();
    }
}
