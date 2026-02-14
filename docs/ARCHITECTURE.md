# Boulder Defense - Architecture

## System Overview

The game is built using a component-based architecture (simplified ECS) on top of the HTML5 Canvas API.

### Core Components

1.  **Game Loop (`Game.ts`)**: Manages the game state, time steps (fixed timestep for physics), and rendering loop.
2.  **Entity System (`Entity.ts`)**: Base class for all game objects (Enemies, Towers, Projectiles).
3.  **Map System (`GameMap.ts`)**: Handles path data, rendering of the track, and terrain properties (slopes).
4.  **Wave Manager (`WaveManager.ts`)**: Controls the flow of enemies and stage progression.
5.  **Event Bus (`EventBus.ts`)**: Decouples systems by allowing them to publish and subscribe to events (e.g., `ENEMY_KILLED`, `BASE_DAMAGED`).

### Coordinate System

-   **Logical Coordinates**: The game logic runs on a virtual 800x600 resolution.
-   **Rendering**: The `Game` class handles scaling the context to fit the window while maintaining aspect ratio.
-   **Input**: Mouse events are translated from screen coordinates to logical coordinates.

### Entity Lifecycle

1.  **Spawn**: Entities are created and added to the `Game.entities` list.
2.  **Update**: `update(dt)` is called every frame. `dt` is the delta time in seconds.
3.  **Draw**: `draw(ctx)` is called every frame.
4.  **Deletion**: Entities flag themselves with `markedForDeletion = true`. The `Game` loop filters these out at the end of the frame.

### Physics & Movement

-   **Waypoints**: Enemies follow a series of (x, y) points.
-   **Slopes**: Segments between waypoints can have properties (e.g., "slope").
-   **Acceleration**: Moving down a slope increases speed; moving up decreases it (or keeps constant if simplified).

### Save Data (Local Storage)

-   Unlocked stages
-   Skill inventory
-   High scores
