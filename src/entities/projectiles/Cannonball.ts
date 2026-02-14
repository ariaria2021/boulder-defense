import { Projectile } from './Projectile';
import { Boulder } from '../enemies/Boulder';

export class Cannonball extends Projectile {
    constructor(x: number, y: number, target: Boulder) {
        super(x, y, 5, '#424242', target, 300, 25);
    }
}
