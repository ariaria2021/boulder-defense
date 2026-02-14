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
        { id: 'METEOR', name: '隕石召喚', description: '画面内の全ての岩に大ダメージ', color: '#ff5252' },
        { id: 'FREEZE', name: '極寒の風', description: '全ての岩の速度を大幅に低下させる', color: '#40c4ff' },
        { id: 'BOOST', name: '過熱駆動', description: '5秒間、タワーの連射速度を2倍にする', color: '#ffd740' },
        { id: 'REPAIR', name: '緊急修復', description: 'ライフを5回復する', color: '#69f0ae' }
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
