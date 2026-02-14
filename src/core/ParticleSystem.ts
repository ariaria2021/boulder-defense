import { Entity } from './Entity';

class Particle extends Entity {
    vx: number;
    vy: number;
    life: number;
    maxLife: number;

    constructor(x: number, y: number, color: string, vx: number, vy: number, life: number) {
        super(x, y, Math.random() * 3 + 1, color);
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
    }

    update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
        if (this.life <= 0) this.markedForDeletion = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

export class ParticleSystem {
    particles: Particle[] = [];

    emit(x: number, y: number, color: string, count: number = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            this.particles.push(new Particle(
                x, y, color,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                Math.random() * 0.5 + 0.5
            ));
        }
    }

    update(dt: number) {
        this.particles.forEach(p => p.update(dt));
        this.particles = this.particles.filter(p => !p.markedForDeletion);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach(p => p.draw(ctx));
    }
}
