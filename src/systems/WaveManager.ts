import { Game } from '../core/Game';
import { NormalBoulder } from '../entities/enemies/NormalBoulder';
import { MetalBoulder } from '../entities/enemies/MetalBoulder';
import { MagmaBoulder } from '../entities/enemies/MagmaBoulder';
import { eventBus } from '../core/EventBus';

export interface Wave {
    enemies: (typeof NormalBoulder | typeof MetalBoulder | typeof MagmaBoulder)[];
    interval: number;
}

export class WaveManager {
    game: Game;
    currentWaveIndex: number = 0;
    waves: Wave[] = [];

    isWaveActive: boolean = false;
    spawnIndex: number = 0;
    spawnTimer: number = 0;

    constructor(game: Game) {
        this.game = game;
        this.setupWaves();
    }

    private setupWaves() {
        this.waves = [
            {
                enemies: [NormalBoulder, NormalBoulder, NormalBoulder],
                interval: 2.0
            },
            {
                enemies: [NormalBoulder, MetalBoulder, NormalBoulder, MetalBoulder],
                interval: 1.5
            },
            {
                enemies: [MagmaBoulder, MagmaBoulder, MagmaBoulder, MetalBoulder, MetalBoulder],
                interval: 1.0
            }
        ];
    }

    startWave() {
        if (this.currentWaveIndex < this.waves.length) {
            this.isWaveActive = true;
            this.spawnIndex = 0;
            this.spawnTimer = 0;
            eventBus.emit('WAVE_STARTED', this.currentWaveIndex + 1);
        } else {
            eventBus.emit('ALL_WAVES_CLEARED');
        }
    }

    update(dt: number) {
        if (!this.isWaveActive) return;

        const currentWave = this.waves[this.currentWaveIndex];
        this.spawnTimer += dt;

        if (this.spawnTimer >= currentWave.interval) {
            this.spawnTimer = 0;
            if (this.spawnIndex < currentWave.enemies.length) {
                const EnemyClass = currentWave.enemies[this.spawnIndex];
                this.game.entities.push(new EnemyClass(this.game.map.waypoints));
                this.spawnIndex++;
            } else {
                // Check if all enemies in current wave are destroyed
                const enemiesLeft = this.game.entities.some(e => e instanceof NormalBoulder || e instanceof MetalBoulder || e instanceof MagmaBoulder);
                if (!enemiesLeft) {
                    this.isWaveActive = false;
                    this.currentWaveIndex++;
                    eventBus.emit('WAVE_CLEARED', this.currentWaveIndex);
                }
            }
        }
    }
}
