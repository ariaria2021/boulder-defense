# Boulder Defense - Game Design Document

## Concept

Defend your base from giant rolling boulders using towers, traps, and special skills.

## Enemies (Boulders)

| Name | HP | Speed | Traits | Visual |
| :--- | :--- | :--- | :--- | :--- |
| **Normal Boulder** | Medium | Medium | None | Gray Rock |
| **Metal Boulder** | High | Low | Resistant to Acid (50%) | Silver Sphere |
| **Magma Boulder** | Low | High | Accelerates 2x on slopes | Glowing Red Rock |

*Mechanic*: As boulders take damage, they may shrink (visual effect) or chip away.

## Towers (Defense)

| Name | Damage | Range | Fire Rate | Cost | Effect |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cannon** | High | Medium | Slow | 100 | Physical damage. Knocks back small boulders slightly. |
| **Acid Sprayer** | Low (DoT) | Short | Continuous | 150 | Melts enemies armor. Good vs Metal. |
| **Disintegrator** | Extreme | Long | Very Slow | 300 | Single-target nuke. Long cooldown. |

## Traps

Placed on the path.

1.  **Pit Trap**:
    *   Captures boulders that are below 50% HP (small size).
    *   One-time use (consumes the trap).
2.  **Jump Pad**:
    *   Launches boulders into the air (removes them from path for 2 seconds, no damage but delays them).
    *   Infinite uses, has cooldown.

## Special Skills (One-time Use)

Earned via lottery after clearing a stage. Max 3 can be held.

1.  **Road Destroyer**: Creates a hole in the path that swallows the next 5 enemies.
2.  **Meteor Strike**: Deals massive damage to all enemies on screen.
3.  **Shield Boost**: Repairs base HP by 5.
4.  **Gold Rush**: Doubles money earned for the next wave.

## Stage Structure

-   **World 1**: Grassy Hills (Introduction to slopes)
-   **World 2**: Iron Mountain (Metal boulders introduced)
-   **World 3**: Volcano (Magma boulders introduced)

Each stage has 1-5 waves.

## Economy

-   **Money**: Earned by destroying boulders.
-   **Lives**: Base HP. Lost when a boulder reaches the end.
