# Implementation Guide

This guide is intended for AI agents to implement the game step-by-step.

## Phase 1: Core Engine
-   [ ] Implement `Game` class with loop and canvas scaling.
-   [ ] Implement `Entity` base class.
-   [ ] Create a simple test entity (moving square).

## Phase 2: Map System
-   [ ] Implement `GameMap` loading from a JSON/Object structure.
-   [ ] Draw the path using Canvas API.
-   [ ] Define "slope" segments in map data.

## Phase 3: Enemy System
-   [ ] Create `Boulder` class extending Entity.
-   [ ] Implement path following logic.
-   [ ] Implement physics (acceleration on slopes).
-   [ ] Create `NormalBoulder`, `MetalBoulder`, `MagmaBoulder`.

## Phase 4: Tower System
-   [ ] Create `Tower` base class.
-   [ ] Implement targeting logic (find nearest/furthest/strongest).
-   [ ] Create `Projectile` system.
-   [ ] Implement `Cannon`, `AcidSprayer`, `Disintegrator`.

## Phase 5: Game Loop & UI
-   [ ] Implement Wave Manager (spawn logic).
-   [ ] Add Player Stats (Money, Lives).
-   [ ] Create HUD (Head-Up Display).
-   [ ] Implement "Game Over" and "Stage Clear" states.

## Phase 6: Polish
-   [ ] Add Traps (`PitTrap`, `JumpPad`).
-   [ ] Add Special Skills system.
-   [ ] Add sound effects (optional) and visual particles.
