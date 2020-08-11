import { Polyomino } from "../polyomino";
import { Rectangle } from "../common";
import { PolyominoQuadTree } from "../../quad-tree/polyomino-quad-tree";

/**
 * @enum { string }
 */
export const CollisionStrategyType = {
    NAIVE: "NAIVE",
    QUAD_TREE: "QUAD_TREE",
    COLLISION_GRID: "COLLISION_GRID"
};

/**
 * @typedef {{
 *      move(polyomino: Polyomino, change: import("../../typedef").IPoint): void;
 *      polyominoAt(i: number, j: number): Polyomino | undefined;
 *      findCollisions(rectangle: Rectangle): Polyomino[];
 * }} ICollisionStrategy
 */

 /**
  * @param { CollisionStrategyType } strategy 
  * @param { Polyomino[] } polyominos
  * @param { Rectangle } bounds
  * @returns { ICollisionStrategy }
  */
export function getCollisionStrategy(strategy, polyominos, bounds) {
    switch (strategy) {
        case CollisionStrategyType.NAIVE:
            return new NaiveCollisionStrategy(polyominos, bounds);
        case CollisionStrategyType.QUAD_TREE:
            return new QuadTreeStrategy(polyominos, bounds);
        case CollisionStrategyType.COLLISION_GRID:
            return new CollisionGridStrategy(polyominos, bounds);
        default: 
            throw new Error(`Invalid strategy: ${strategy}`);
    }
}

class NaiveCollisionStrategy {
    
    /**
     * @param { Polyomino[] } polyominos
     * @param { Rectangle } compactingBounds 
     */
    constructor(polyominos, compactingBounds) {
        this.mPolyominos = polyominos;
        this.mCompactingBounds = compactingBounds;
    }

    /**
     * 
     * @param { Polyomino } polyomino 
     * @param { import("../../typedef").IPoint } change 
     * @returns { void }
     */
    move(polyomino, change) {
        polyomino.move(change);
    }

    /**
     * 
     * @param { number } x 
     * @param { number } y
     * @returns { Polyomino | undefined } 
     */
    polyominoAt(y, x) {
        return this.mCompactingBounds.contains(y, x) ?
            this.mPolyominos.find(p => 
                p.contains(x, y) &&
                p.grid[x - p.location.x][y - p.location.y]
            ) :
            undefined;
    }

    /**
     * @param { Rectangle } rectangle 
     * @returns { Polyomino[] }
     */
    findCollisions(rectangle) {
        let result = [];

        for (let i = 0; i < this.mPolyominos.length; i += 1) {
            const poly = this.mPolyominos[i];

            if (rectangle.intersects(poly.intoRectangle())) {
                result.push(poly);
            }
        }

        return result;
    }
}

class QuadTreeStrategy {
    /**
     * @param { Polyomino[] } polyominos
     * @param { Rectangle } bounds 
     */
    constructor(polyominos, bounds) {
        this.mPolyominos = polyominos;
        this.mBounds = bounds;

        /** @type { PolyominoQuadTree } */
        this.mQuadTree = new PolyominoQuadTree(this.mBounds);

        for (let i = 0; i < this.mPolyominos.length; ++i) {
            const poly = this.mPolyominos[i];
            this.mQuadTree.add(poly);
        }
    }

    /**
     * 
     * @param { Polyomino } polyomino 
     * @param { import("../../typedef").IPoint } change 
     * @returns { void }
     */
    move(polyomino, change) {
        this.mQuadTree.move(polyomino, change);
    }

    /**
     * 
     * @param { number } x 
     * @param { number } y
     * @returns { Polyomino | undefined } 
     */
    polyominoAt(y, x) {
        return this.mQuadTree.polyominoAt(y, x);
    }

    /**
     * @param { Rectangle } rectangle 
     * @returns { Polyomino[] }
     */
    findCollisions(rectangle) {
        return this.mQuadTree.findCollisions(rectangle);
    }
}

class CollisionGridStrategy {
    /**
     * @param { Polyomino[] } polyominos
     * @param { Rectangle } compactingBounds 
     */
    constructor(polyominos, compactingBounds) {
        throw new Error('Not Implemented');
    }

    /**
     * 
     * @param { Polyomino } polyomino 
     * @param { import("../../typedef").IPoint } change 
     * @returns { void }
     */
    move(polyomino, change) {
        throw new Error('Not Implemented');
    }

    /**
     * 
     * @param { number } x 
     * @param { number } y
     * @returns { Polyomino | undefined } 
     */
    polyominoAt(x, y) {
        throw new Error('Not Implemented');
    }

    /**
     * @param { Rectangle } rectangle 
     * @returns { Polyomino[] }
     */
    findCollisions(rectangle) {
        throw new Error('Not implemented');
    }
}