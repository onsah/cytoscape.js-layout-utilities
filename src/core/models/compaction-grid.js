import { BoundingRectangle, Point } from "./common";
import { Polyomino } from "./polyomino";

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

    // TODO
    /**
     * 
     * @param { Polyomino[] } polyominos
     * @param { number } gridStep
     */
    constructor(polyominos, gridStep) {
        // We may not need this
        this.polyominos = polyominos;
        
        let boundingRectangle = CompactionGrid.getRoundedBoundingRectangle(polyominos, gridStep);

        this.absoluteBounds = new BoundingRectangle(
            boundingRectangle.x1,
            boundingRectangle.y1,
            boundingRectangle.x2,
            boundingRectangle.y2
        );

        this.compactingBounds = new BoundingRectangle(
            boundingRectangle.x1,
            boundingRectangle.y1,
            boundingRectangle.x2,
            boundingRectangle.y2,
        );
        
        /** If not `GRID_EMPTY` denotes the polyomino which owns the place */
        /** @type { number[][] } */
        this.grid = Array.from(
            { length: this.height }, 
            () => new Array(this.width).fill(GRID_EMPTY)
        );

        for (let poly of polyominos) {
            // Set initial point to its location
            poly.location = new Point(poly.stepX1, poly.stepY1);
            for (let i = 0; i < poly.stepWidth; i += 1) {
                for (let j = 0; j < poly.stepHeight; j += 1) {
                    if (poly.grid[i][j]) {
                        // dimensions are reverse in CompactionGrid
                        this.setGridAt(j + poly.stepY1, i + poly.stepX1, poly.index);
                    }
                }
            }
        }
    }

    /**
     * Tries to compact the grid from the `direction`
     * @param { Direction } direction
     */
    tryCompact(direction) {
        /** @type { (poly: Polyomino) => boolean } */
        let checkFn;
        /** @type { (poly: Polyomino) => void } */
        let polyMoveFn;
        /** @type { (bound: BoundingRectangle) => void } */
        let boundMoveFn;

        switch (direction) {
            case Direction.LEFT:
                checkFn = (poly) => poly.location.x === this.compactingBounds.x1;
                polyMoveFn = (poly) => poly.location.x += 1;
                boundMoveFn = (bound) => bound.x1 += 1;
                break;
            case Direction.TOP:
                checkFn = (poly) => poly.location.y === this.compactingBounds.y1;
                polyMoveFn = (poly) => poly.location.y += 1;
                boundMoveFn = (bound) => bound.y1 += 1;
                break;
            case Direction.RIGHT:
                checkFn = (poly) => (poly.location.x + poly.stepWidth - 1) === this.compactingBounds.x2;
                polyMoveFn = (poly) => poly.location.x -= 1;
                boundMoveFn = (bound) => bound.x2 -= 1;
                break;
            case Direction.BOTTOM:
                checkFn = (poly) => (poly.location.y + poly.stepHeight - 1) === this.compactingBounds.y2;
                polyMoveFn = (poly) => poly.location.y -= 1;
                boundMoveFn = (bound) => bound.y2 -= 1;
                break;
            default:
                throw new Error('');
        }
        /** @type { Set<Polyomino> } */
        let allMovedPolys = new Set();

        for (let poly of this.polyominos) {
            if (checkFn(poly)) {
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
        }
        // Shift one right
        for (let movedPoly of allMovedPolys) {
            polyMoveFn(movedPoly);
        }

        boundMoveFn(this.compactingBounds);
        return true;
    }

    /**
     * Returns the polyomino and its index if there is a polyomino here. Undefined otherwise
     * @param { number } i y-axis
     * @param { number } j x-axis
     * @returns { Polyomino | undefined }
     */
    polyominoAt(i, j) {
        return this.compactingBounds.contains(i, j) ?
            this.polyominos.find(p => 
                j >= p.location.x &&
                j <= p.location.x + p.stepWidth - 1 &&
                i >= p.location.y &&
                i <= p.location.y + p.stepHeight - 1 &&
                p.grid[j - p.location.x][i - p.location.y]
            ) : 
            undefined;
    }

    /**
     * Checks if `polyomino` can move in the direction. Returns all the polyominos necessary to move otherwise undefined
     * @param { Polyomino } polyomino 
     * @param { Direction } direction 
     * @returns { Set<Polyomino> | undefined }
     */
    tryMove(polyomino, direction) {   
        switch (direction) {
            case Direction.LEFT: {
                let movedPolys = new Set(); 

                for (let i = 0; i < polyomino.stepHeight; i += 1) {
                    // Find rightmost filled square in that height
                    let j = polyomino.stepWidth - 1;
                    while (!polyomino.grid[j][i]) {
                        j -= 1;
                    }

                    let gridX = polyomino.location.x + j;
                    let gridY = polyomino.location.y + i;

                    if (this.compactingBounds.contains(gridY, gridX + 1)) {
                        // Check if one right is another polyomino
                        let next = this.polyominoAt(gridY, gridX + 1);

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
                                return undefined;
                            }
                        } 
                    } else {
                        return undefined;
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);
                return movedPolys;
            }
            case Direction.TOP: {
                let movedPolys = new Set(); 

                for (let j = 0; j < polyomino.stepWidth; j += 1) {
                    // Find rightmost filled square in that height
                    let i = polyomino.stepHeight - 1;
                    while (!polyomino.grid[j][i]) {
                        i -= 1;
                    }

                    let gridX = polyomino.location.x + j;
                    let gridY = polyomino.location.y + i;

                    if (this.compactingBounds.contains(gridY + 1, gridX)) {
                        // Check if one right is another polyomino
                        let next = this.polyominoAt(gridY + 1, gridX);

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
                                return undefined;
                            }
                        } 
                    } else {
                        return undefined;
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);
                return movedPolys;
            }
            case Direction.RIGHT: {
                let movedPolys = new Set(); 

                for (let i = 0; i < polyomino.stepHeight; i += 1) {
                    // Find rightmost filled square in that height
                    let j = 0;
                    while (!polyomino.grid[j][i]) {
                        j += 1;
                    }

                    let gridX = polyomino.location.x + j;
                    let gridY = polyomino.location.y + i;

                    if (this.compactingBounds.contains(gridY, gridX - 1)) {
                        // Check if one right is another polyomino
                        let next = this.polyominoAt(gridY, gridX - 1);

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
                                return undefined;
                            }
                        } 
                    } else {
                        return undefined;
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);
                return movedPolys;
            }
            case Direction.BOTTOM: {
                let movedPolys = new Set(); 

                for (let j = 0; j < polyomino.stepWidth; j += 1) {
                    // Find rightmost filled square in that height
                    let i = 0;
                    while (!polyomino.grid[j][i]) {
                        i += 1;
                    }

                    let gridX = polyomino.location.x + j;
                    let gridY = polyomino.location.y + i;

                    if (this.compactingBounds.contains(gridY - 1, gridX)) {
                        // Check if one right is another polyomino
                        let next = this.polyominoAt(gridY - 1, gridX);

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
                                return undefined;
                            }
                        } 
                    } else {
                        return undefined;
                    }
                }
                // If we reached here it is movable
                movedPolys.add(polyomino);
                return movedPolys;
            }
            default: 
                throw new Error(`Invalid direction: ${direction}`);
        }
    }

    /**
     * 
     * @param { number } i 
     */
    getRowAt(i) {
        let row = this.grid[i - this.absoluteBounds.y1];
        
        if (row !== undefined) {
            return row;
        } else {
            throw new Error(`row ${i} doesn't exist`);
        }
    }

    /**
     * @param { number } i 
     * @param { number } j 
     */
    getGridAt(i, j) {
        let val = this.getRowAt(i)[j - this.absoluteBounds.x1];
        if (val !== undefined) {
            return val;
        } else {
            throw new Error(`index ${j} doesn't exist on row ${i}`);
        }
    }

    /**
     * @param { number } i 
     * @param { number } j
     * @param { number } val 
     */
    setGridAt(i, j, val) {
        this.grid[i - this.absoluteBounds.y1][j - this.absoluteBounds.x1] = val;
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
     * @returns { BoundingRectangle }
     */
    static getRoundedBoundingRectangle(polyominos, gridStep) {
        // bounding rectangle by their current positions
        let boundingRectangle = new BoundingRectangle(
            Number.MAX_VALUE,
            Number.MAX_VALUE,
            -Number.MAX_VALUE,
            -Number.MAX_VALUE
        );
  
        for (let polyomino of polyominos) {
            boundingRectangle.include(polyomino.stepBoundingRectangle);
        }

        return boundingRectangle;
    }
}