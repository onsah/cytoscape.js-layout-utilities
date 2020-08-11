import { Polyomino } from "../polyomino";
import { Rectangle } from "../common";
import { QuadTree, Node } from "../../quad-tree/quad-tree";

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

        /**
         * @type { QuadTree<Polyomino> }
         */
        this.mQuadTree = new QuadTree(this.mBounds);

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
        /* return this.mBounds.contains(y, x) ?
            this.mQuadTree.findCollisionsPoint({ x, y })
                .find(p => p.grid[x - p.location.x][y - p.location.y]) : 
            undefined; */
        return this.polyominoAtImpl(this.mQuadTree.mRoot, y, x);
    }

    /**
     * This is actually a bad design because it should be in quad tree but this is a special case for polyominos so it can't be included in QuadTree class
     * @param { Node<Polyomino> } node 
     * @param { number } y 
     * @param { number } x 
     * @returns { Polyomino | undefined }
     * TODO: create QuadTreePolyomino class
     */
    polyominoAtImpl(node, y, x) {
        const values = node.mValues;
        const length = values.length;
        for (let i = 0; i < length; ++i) {
            const poly = values[i];
            if (poly.intoRectangle().contains(y, x) && poly.grid[x - poly.location.x][y - poly.location.y]) {
                return poly;
            }
        }

        if (!node.isLeaf) {
            for (let i = 0; i < node.mChildren.length; ++i) {
                let child = node.mChildren[i];
                // Some edge cases can fail so check if point can be multiple areas
                if (child.mRectangle.contains(y, x)) {
                    let result = this.polyominoAtImpl(child, y, x);
                    if (result !== undefined) {
                        return result;
                    }
                }
            }
        }

        return undefined;
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