import { eventBus } from '../core/EventBus';

export class PlayerStats {
    money: number = 200;
    lives: number = 20;
    score: number = 0;

    constructor() {
        // Initialize UI if elements exist
        this.updateUI();
    }

    addMoney(amount: number) {
        this.money += amount;
        this.updateUI();
        eventBus.emit('MONEY_CHANGED', this.money);
    }

    spendMoney(amount: number): boolean {
        if (this.money >= amount) {
            this.money -= amount;
            this.updateUI();
            eventBus.emit('MONEY_CHANGED', this.money);
            return true;
        }
        return false;
    }

    takeDamage(amount: number) {
        this.lives -= amount;
        this.updateUI();
        eventBus.emit('LIVES_CHANGED', this.lives);

        if (this.lives <= 0) {
            eventBus.emit('GAME_OVER');
        }
    }

    updateUI() {
        const moneyEl = document.getElementById('money-value');
        const livesEl = document.getElementById('lives-value');
        if (moneyEl) moneyEl.textContent = this.money.toString();
        if (livesEl) livesEl.textContent = this.lives.toString();
    }
}
