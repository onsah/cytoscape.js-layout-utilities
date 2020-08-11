import { Rectangle, Point } from "../common";
import { Polyomino } from "../polyomino";
import assert from "assert";
import { getCollisionStrategy, CollisionStrategyType } from "./collision-strategy";

// TODO: move the constants when class properties are not experimental feature
export const GRID_EMPTY = -1;
export const NONE_ID = Number.NEGATIVE_INFINITY;

/**
 * @enum { number }
 */
export const Direction = {
    LEFT: 0,
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
};

/**
 * Represents the compaction grid which packs the polyominos incrementally
 * 
 */
export class CompactionGrid {

    /**
     * @param { Polyomino[] } polyominos
     * @param { number } gridStep
     */
    constructor(polyominos, gridStep) {
        // We may not need this
        this.polyominos = polyominos;

        /** @type { Map<Polyomino, Set<Polyomino> | undefined> } 
         * caches if the element can be moved or not at this iteration 
         * */
        this.cache = new Map();
        
        let boundingRectangle = CompactionGrid.getRoundedBoundingRectangle(polyominos, gridStep);

        this.absoluteBounds = new Rectangle(
            boundingRectangle.x1,
            boundingRectangle.y1,
            boundingRectangle.x2,
            boundingRectangle.y2
        );

        this.compactingBounds = new Rectangle(
            boundingRectangle.x1,
            boundingRectangle.y1,
            boundingRectangle.x2,
            boundingRectangle.y2,
        );

        /** @type { import("./collision-strategy").ICollisionStrategy } */
        this.collisionStrategy = getCollisionStrategy(CollisionStrategyType.QUAD_TREE, this.polyominos, this.absoluteBounds);
    }

    /**
     * Tries to compact the grid from the `direction`
     * @param { Direction } direction
     */
    tryCompact(direction) {
        // Clear previous cache
        this.cache.clear();

        /** @type { Rectangle } */
        let boundRect;
        /** @type { import("../../typedef").IPoint } */
        let positionChange;
        /** @type { (bound: Rectangle) => void } TODO: convert this into IPoint */
        let boundChangeFn;

        switch (direction) {
            case Direction.LEFT:
                boundRect = new Rectangle(this.compactingBounds.x1, this.compactingBounds.y1, this.compactingBounds.x1, this.compactingBounds.y2);
                positionChange = { x: 1, y: 0 };
                boundChangeFn = (bound) => bound.x1 += 1;
                break;
            case Direction.TOP:
                boundRect = new Rectangle(this.compactingBounds.x1, this.compactingBounds.y1, this.compactingBounds.x2, this.compactingBounds.y1);
                positionChange = { x: 0, y: 1 };
                boundChangeFn = (bound) => bound.y1 += 1;
                break;
            case Direction.RIGHT:
                boundRect = new Rectangle(this.compactingBounds.x2, this.compactingBounds.y1, this.compactingBounds.x2, this.compactingBounds.y2);
                positionChange = { x: -1, y: 0 };
                boundChangeFn = (bound) => bound.x2 -= 1;
                break;
            case Direction.BOTTOM:
                boundRect = new Rectangle(this.compactingBounds.x1, this.compactingBounds.y2, this.compactingBounds.x2, this.compactingBounds.y2);
                positionChange = { x: 0, y: -1 };
                boundChangeFn = (bound) => bound.y2 -= 1;
                break;
            default:
                throw new Error(`Invalid direction value: ${direction}`);
        }
        /** @type { Set<Polyomino> } */
        let allMovedPolys = new Set();

        let colliding = this.collisionStrategy.findCollisions(boundRect);

        for (let i = 0; i < colliding.length; ++i) {
            let poly = colliding[i];
            let movedPolys = this.tryMove(poly, direction);
    
            if (movedPolys !== undefined) {
                for (let p of movedPolys) {
                    allMovedPolys.add(p);
                }
            } else {
                // If we can't move then we can't compact
                return false;
            }
        }
        // Apply movement
        for (let movedPoly of allMovedPolys) {
            this.collisionStrategy.move(movedPoly, positionChange);
        }

        boundChangeFn(this.compactingBounds);
        return true;
    }

    /**
     * Checks if `polyomino` can move in the direction. Returns all the polyominos necessary to move otherwise undefined
     * @param { Polyomino } polyomino 
     * @param { Direction } direction 
     * @returns { Set<Polyomino> | undefined }
     */
    tryMove(polyomino, direction) {  
        if (this.cache.has(polyomino)) {
            return this.cache.get(polyomino);
        }

        // Assume this can be moved to prevent infinite recursion
        this.cache.set(polyomino, new Set([ polyomino ]));        

        switch (direction) {
            case Direction.LEFT: {
                let movedPolys = new Set(); 

                for (let i = 0; i < polyomino.stepHeight; i += 1) {
                    let j = polyomino.stepWidth - 1;

                    while (j >= 0) {
                        // Skip empty grids
                        while (j >= 0 && !polyomino.grid[j][i]) {
                            j -= 1;
                        }

                        if (j < 0) {
                            break;
                        }

                        // Real work
                        let gridX = polyomino.location.x + j;
                        let gridY = polyomino.location.y + i;

                        if (this.compactingBounds.contains(gridY, gridX + 1)) {
                            // Check if one right is another polyomino
                            let next = this.collisionStrategy.polyominoAt(gridY, gridX + 1);
    
                            if (next !== undefined) {
                                assert(next !== polyomino, 'Call to itself');

                                let nextTryMove = this.tryMove(next, direction);
                                if (nextTryMove !== undefined) {
                                    // We need to move all these in order to move the original
                                    for (let adjacent of nextTryMove) {
                                        movedPolys.add(adjacent);
                                    }
                                } else {
                                    this.cache.set(polyomino, undefined);
                                    return undefined;
                                }
                            } 
                        } else {
                            this.cache.set(polyomino, undefined);
                            return undefined;
                        }

                        // Skip full grids
                        while (j >= 0 && polyomino.grid[j][i]) {
                            j -= 1;
                        }
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);

                // cache
                this.cache.set(polyomino, movedPolys);

                return movedPolys;
            }
            case Direction.TOP: {
                let movedPolys = new Set(); 

                for (let j = 0; j < polyomino.stepWidth; j += 1) {
                    let i = polyomino.stepHeight - 1;

                    while (i >= 0) {
                        // Skip empty grids
                        while (i >= 0 && !polyomino.grid[j][i]) {
                            i -= 1;
                        }

                        if (i < 0) {
                            break;
                        }

                        // Real work
                        let gridX = polyomino.location.x + j;
                        let gridY = polyomino.location.y + i;

                        if (this.compactingBounds.contains(gridY + 1, gridX)) {
                            // Check if one right is another polyomino
                            let next = this.collisionStrategy.polyominoAt(gridY + 1, gridX);
    
                            if (next !== undefined) {
                                if (next === polyomino) {
                                    throw new Error('Call to itself');
                                }
                                let nextTryMove = this.tryMove(next, direction);
                                if (nextTryMove !== undefined) {
                                    // We need to move all these in order to move the original
                                    for (let adjacent of nextTryMove) {
                                        movedPolys.add(adjacent);
                                    }
                                } else {
                                    this.cache.set(polyomino, undefined);
                                    return undefined;
                                }
                            } 
                        } else {
                            this.cache.set(polyomino, undefined);
                            return undefined;
                        }
                        
                        while (i >= 0 && polyomino.grid[j][i]) {
                            i -= 1;
                        }
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);

                // cache
                this.cache.set(polyomino, movedPolys);

                return movedPolys;
            }
            case Direction.RIGHT: {
                let movedPolys = new Set(); 

                for (let i = 0; i < polyomino.stepHeight; i += 1) {
                    let j = 0;

                    while (j < polyomino.stepWidth) {
                        // Skip empty grids
                        while (j <= polyomino.stepWidth - 1 && !polyomino.grid[j][i]) {
                            j += 1;
                        }

                        if (j > polyomino.stepWidth - 1) {
                            break;
                        }

                        // Real work
                        let gridX = polyomino.location.x + j;
                        let gridY = polyomino.location.y + i;
    
                        if (this.compactingBounds.contains(gridY, gridX - 1)) {
                            // Check if one right is another polyomino
                            let next = this.collisionStrategy.polyominoAt(gridY, gridX - 1);
    
                            if (next !== undefined) {
                                if (next === polyomino) {
                                    throw new Error('Call to itself');
                                }
                                let nextTryMove = this.tryMove(next, direction);
                                if (nextTryMove !== undefined) {
                                    // We need to move all these in order to move the original
                                    for (let adjacent of nextTryMove) {
                                        movedPolys.add(adjacent);
                                    }
                                } else {
                                    this.cache.set(polyomino, undefined);
                                    return undefined;
                                }
                            } 
                        } else {
                            this.cache.set(polyomino, undefined);
                            return undefined;
                        }

                        // Skip full grids
                        while (j <= polyomino.stepWidth - 1 && polyomino.grid[j][i]) {
                            j += 1;
                        }
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);

                // cache
                this.cache.set(polyomino, movedPolys);

                return movedPolys;
            }
            case Direction.BOTTOM: {
                let movedPolys = new Set(); 

                for (let j = 0; j < polyomino.stepWidth; j += 1) {
                    let i = 0;

                    while (i < polyomino.stepHeight) {
                        // Skip empty grids
                        while (i <= polyomino.stepHeight - 1 && !polyomino.grid[j][i]) {
                            i += 1;
                        }

                        if (i > polyomino.stepHeight - 1) {
                            break;
                        }

                        // Real work
                        let gridX = polyomino.location.x + j;
                        let gridY = polyomino.location.y + i;

                        if (this.compactingBounds.contains(gridY - 1, gridX)) {
                            // Check if one right is another polyomino
                            let next = this.collisionStrategy.polyominoAt(gridY - 1, gridX);

                            if (next !== undefined) {
                                if (next === polyomino) {
                                    throw new Error('Call to itself');
                                }
                                let nextTryMove = this.tryMove(next, direction);
                                if (nextTryMove !== undefined) {
                                    // We need to move all these in order to move the original
                                    for (let adjacent of nextTryMove) {
                                        movedPolys.add(adjacent);
                                    }
                                } else {
                                    this.cache.set(polyomino, undefined);
                                    return undefined;
                                }
                            } 
                        } else {
                            this.cache.set(polyomino, undefined);
                            return undefined;
                        }

                        // Skip full grids
                        while (i <= polyomino.stepHeight - 1 && polyomino.grid[j][i]) {
                            i += 1;
                        }
                    }                    
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);

                // cache
                this.cache.set(polyomino, movedPolys);

                return movedPolys;
            }
            default: 
                throw new Error(`Invalid direction: ${direction}`);
        }
    }

    get width() {
        return this.compactingBounds.x2 - this.compactingBounds.x1 + 1;
    }

    get height() {
        return this.compactingBounds.y2 - this.compactingBounds.y1 + 1;
    }

    /**
     * Calculates the bounding rectangle then rounds the bounds
     * @param { Polyomino[] } polyominos
     * @param { number } gridStep
     * @returns { Rectangle }
     */
    static getRoundedBoundingRectangle(polyominos, gridStep) {
        // bounding rectangle by their current positions
        let boundingRectangle = new Rectangle(
            Number.MAX_VALUE,
            Number.MAX_VALUE,
            -Number.MAX_VALUE,
            -Number.MAX_VALUE
        );

        for (let i = 0; i < polyominos.length; ++i) {
            boundingRectangle.include(polyominos[i].stepBoundingRectangle);
        }

        return boundingRectangle;
    }
}