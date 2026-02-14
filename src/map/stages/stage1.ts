import { StageData } from '../GameMap';

export const stage1: StageData = {
    id: 1,
    name: "Grassy Hills",
    pathWidth: 50,
    waypoints: [
        { x: 50, y: 100 },   // Start (High ground)
        { x: 200, y: 100 },
        { x: 400, y: 400 },  // Steep slope down
        { x: 600, y: 400 },
        { x: 750, y: 300 },  // Slight slope up
    ]
};
