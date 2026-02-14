import { Projectile } from './Projectile';
import { Boulder } from '../enemies/Boulder';

export class AcidStream extends Projectile {
    constructor(x: number, y: number, target: Boulder) {
        super(x, y, 3, '#8bc34a', target, 500, 5); // Fast, low damage
    }
}
