import { eventBus } from '../core/EventBus';

export type SkillType = 'METEOR' | 'FREEZE' | 'BOOST' | 'REPAIR';

export interface Skill {
    id: SkillType;
    name: string;
    description: string;
    color: string;
}

export class SkillSystem {
    availableSkills: Skill[] = [
        { id: 'METEOR', name: 'Meteor Strike', description: 'Massive damage to all boulders', color: '#f44336' },
        { id: 'FREEZE', name: 'Blizzard', description: 'Slow down all boulders significantly', color: '#2196f3' },
        { id: 'BOOST', name: 'Turbo Towers', description: 'Double fire rate for 5 seconds', color: '#ffeb3b' },
        { id: 'REPAIR', name: 'Emergency Repair', description: 'Restore 5 lives', color: '#4caf50' }
    ];

    ownedSkills: Skill[] = [];

    constructor() {
        this.updateUI();
    }

    drawLottery(): Skill {
        const index = Math.floor(Math.random() * this.availableSkills.length);
        const skill = this.availableSkills[index];
        this.ownedSkills.push(skill);
        this.updateUI();
        return skill;
    }

    useSkill(index: number): Skill | null {
        if (index >= 0 && index < this.ownedSkills.length) {
            const skill = this.ownedSkills.splice(index, 1)[0];
            this.updateUI();
            eventBus.emit('SKILL_USED', skill.id);
            return skill;
        }
        return null;
    }

    updateUI() {
        const container = document.getElementById('skills-container');
        if (!container) return;

        container.innerHTML = '';
        this.ownedSkills.forEach((skill, index) => {
            const btn = document.createElement('button');
            btn.className = 'skill-btn';
            btn.style.borderColor = skill.color;
            btn.innerHTML = `<span class="skill-name">${skill.name}</span><br><small>${index + 4}</small>`; // Keys 4,5,6...
            btn.onclick = () => this.useSkill(index);
            container.appendChild(btn);
        });
    }
}
