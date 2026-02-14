import { Boulder } from './Boulder';
import type { Waypoint } from '../../map/GameMap';

export class NormalBoulder extends Boulder {
    constructor(waypoints: Waypoint[]) {
        super(waypoints, 100, '#757575'); // Standard Gray
        this.baseSpeed = 60;
        this.acceleration = 150;
    }
}
