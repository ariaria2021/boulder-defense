import { Boulder } from './Boulder';
import type { Waypoint } from '../../map/GameMap';

export class MetalBoulder extends Boulder {
    constructor(waypoints: Waypoint[]) {
        super(waypoints, 300, '#b0bec5'); // Shiny Silver/Metallic
        this.baseSpeed = 40;     // Slower because it's heavy
        this.acceleration = 100; // Harder to accelerate
        this.radius = 25;        // Slightly larger
    }
}
