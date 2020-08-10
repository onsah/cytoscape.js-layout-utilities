import { Rectangle } from '../models/common';
import assert from 'assert';

/**
 * Heavily inspired from https://pvigier.github.io/2019/08/04/quadtree-collision-detection.html 
 * 
 * @typedef {{
 * intoRectangle(): Rectangle;
 * move(change: import('../typedef').IPoint): void;
 * }} IntoRectangle
 */

/**
 * @enum { number }
 */
export const Quadrant = {
    NW: 0,
    NE: 1,
    SW: 2,
    SE: 3
};

/** Maximum number of values a node can hold before split */
const THRESHOLD = 16; 
/** Maximum quad tree depth */
const MAX_DEPTH = 8;

/**
 * 
 * @template {IntoRectangle} T
 */
export class QuadTree {

    /**
     * @param { Rectangle } area 
     */
    constructor(area) {
        /** @type { Node<T> } */
        this.mRoot = new Node(area);
    }

    /**
     * @param { T } value
     * @returns { void } 
     */
    add(value) {
        // assert(this.mRoot.mRectangle.includes(value.intoRectangle()), `Area: ${JSON.stringify(this.mRoot.mRectangle)}, Value: ${JSON.stringify(value.intoRectangle())}`);

        this.mRoot.add(value, 0);
    }

    /**
     * @param { T } value
     */
    remove(value) {
        this.mRoot.remove(value);
    }

    /**
     * @param { Rectangle } rectangle
     */
    findCollisions(rectangle) {
        /** @type { T[] } */
        let collisions = [];
        this.mRoot.findCollisions(rectangle, collisions);
        return collisions;
    }

    /**
     * @param { import('../typedef').IPoint } point 
     */
    findCollisionsPoint(point) {
        /** @type { T[] } */
        let collisions = [];
        this.mRoot.findCollisions(new Rectangle(point.x, point.y, point.x, point.y), collisions);
        return collisions;
    }

    /**
     * Moves the value if it is already in the area
     * @param { T } value
     * @param { import('../typedef').IPoint } change 
     * @returns { boolean } true if moved
     */
    move(value, change) {
        // return this.mRoot.move(0, value, null, change);

        this.mRoot.remove(value);

        value.move(change);

        this.mRoot.add(value, 0);
        return true;
    }

    get depth() {
        return this.mRoot.depth;
    }

    get root() {
        return this.mRoot;
    }
}



/**
 * 
 * @template {IntoRectangle} T
 */
export class Node {

    /**
     * 
     * @param { Rectangle } rectangle 
     */
    constructor(rectangle) {
        this.mRectangle = rectangle;
        /** @type { Node<T>[] } */
        this.mChildren = [];
        /** @type { T[] } */
        this.mValues = [];
    }

    /**
     * @param { T } value
     * @param { number } depth
     * @returns { void }
     */
    add(value, depth) {
        // console.log(`Adding value ${JSON.stringify(value.intoRectangle())} into ${JSON.stringify(this.mRectangle)}`);

        const boundingRectangle = value.intoRectangle();
        // assert(this.mRectangle.includes(boundingRectangle), `Doesn't contain: this: ${JSON.stringify(this.mRectangle)}, value: ${JSON.stringify(boundingRectangle)}`);

        if (this.isLeaf) {
            if (depth >= MAX_DEPTH || this.mValues.length < THRESHOLD) {
                this.mValues.push(value);
            } else {
                this.split();
                this.add(value, depth);
            }
        } else {
            let quad = this.getQuadrant(boundingRectangle);

            if (quad !== null) {
                this.getChild(quad).add(value, depth + 1);
            } else {
                this.mValues.push(value);
            }
        }
    }

    /**
     * @param { T } value
     * @param { Node<T>? } parent 
     * @returns { void } 
     */
    remove(value, parent = null) {
        const boundingRectangle = value.intoRectangle();
        // assert(this.mRectangle.includes(boundingRectangle), `Doesn't contain: this: ${JSON.stringify(this.mRectangle)}, value: ${JSON.stringify(boundingRectangle)}`);

        if (this.isLeaf) {
            this.removeValue(value);

            if (parent !== null) {
                parent.tryMerge();
            }
        } else {
            let quad = this.getQuadrant(boundingRectangle);
            
            if (quad !== null) {
                this.mChildren[quad].remove(value, this);
            } else {
                this.removeValue(value);
            }
        }
    }

    /**
     * @param { T } value
     * @returns { void } 
     */
    removeValue(value) {
        let index = this.mValues.findIndex((v) => v === value);

        assert(index !== -1, `Value ${value} is not present in this node`);

        // Swap
        {
            let lastIndex = this.mValues.length - 1;
            let temp = this.mValues[index];
            this.mValues[index] = this.mValues[lastIndex];
            this.mValues[lastIndex] = temp;
        }

        this.mValues.pop();
    }

    /**
     * @returns { boolean }
     */
    tryMerge() {
        let totalValues = this.mValues.length;

        for (let child of this.mChildren) {
            if (!child.isLeaf) {
                return false;
            } else {
                totalValues += child.mValues.length;
            }
        }
     
        if (totalValues <= THRESHOLD) {
            for (let child of this.mChildren) {
                for (let value of child.mValues) {
                    this.mValues.push(value);
                }
                // Clear the values
                child.mValues = [];
            }
            // No children
            this.mChildren = [];
        }

        return true;
    }

    /**
     * Adds the all colliding rectangles into `collisions` array
     * @param { Rectangle } rectangle
     * @param { T[] } collisions
     */
    findCollisions(rectangle, collisions) {
        for (let value of this.mValues) {
            if (rectangle.intersects(value.intoRectangle())) {
                // yield value;
                collisions.push(value);
            }
        }

        if (!this.isLeaf) {
            for (let child of this.mChildren) {
                if (child.mRectangle.intersects(rectangle)) {
                    child.findCollisions(rectangle, collisions);
                }
            }
        }
    }

    get isLeaf() {
        return this.mChildren.length === 0;
    }

    /**
     * @returns { number }
     */
    get depth() {
        if (this.isLeaf) {
            return 1;
        } else {
            return this.mChildren
                .map(c => c.depth)
                .reduce((maxDepth, depth) => Math.max(maxDepth, depth), 0) + 1;
        }
    }

    /**
     * @param { Rectangle } rectangle
     * @returns { Quadrant | null } 
     */
    getQuadrant(rectangle) {
        let center = this.mRectangle.absoluteCenter;
        // console.log(`center: ${JSON.stringify(center)}`);

        if (rectangle.x2 < center.x) {
            if (rectangle.y2 < center.y) {
                return Quadrant.NW;
            } else if (rectangle.y1 >= center.y) {
                return Quadrant.SW;
            } else {
                return null;
            }
        } else if (rectangle.x1 >= center.x) {
            if (rectangle.y2 < center.y) {
                return Quadrant.NE;
            } else if (rectangle.y1 >= center.y) {
                return Quadrant.SE;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * @returns { void }
     */
    split() {
        for (let i = 0; i < Node.CHILDREN_COUNT; i += 1) {
            this.mChildren.push(new Node(this.getSubArea(i)));
        }

        let newValues = [];
        for (let value of this.mValues) {
            let quad = this.getQuadrant(value.intoRectangle());

            if (quad !== null) {
                this.mChildren[quad].mValues.push(value);
            } else {
                newValues.push(value);
            }
        }
        this.mValues = newValues;
    }

    /**
     * @param { Quadrant } quadrant
     * @returns { Node<T> } 
     */
    getChild(quadrant) {
        if (quadrant in Object.values(Quadrant)) {
            return this.mChildren[quadrant];
        } else {
            throw new Error(`Invalid quadrant: ${quadrant}`);
        }
    }

    /**
     * Returns a rectangle with 1 / 4 of the current node
     * @param { Quadrant } quadrant the position of the subarea
     * @returns { Rectangle } 
     */
    getSubArea(quadrant) {
        const center = this.mRectangle.absoluteCenter;
    
        switch (quadrant) {
            case Quadrant.NW:
                return new Rectangle(
                    this.mRectangle.x1, 
                    this.mRectangle.y1, 
                    center.x,
                    center.y
                );
            case Quadrant.NE:
                return new Rectangle(
                    center.x, 
                    this.mRectangle.y1, 
                    this.mRectangle.x2,
                    center.y
                );
            case Quadrant.SW:
                return new Rectangle(
                    this.mRectangle.x1, 
                    center.y, 
                    center.x,
                    this.mRectangle.y2
                );
            case Quadrant.SE:
                return new Rectangle(
                    center.x, 
                    center.y, 
                    this.mRectangle.x2,
                    this.mRectangle.y2
                );
            default:
                throw new Error(`Invalid subarea value: ${quadrant}`);
        }
    }

    /**
     * Use only for debugging
     * @param { number } depth
     */
    print(depth) {
        console.log(`Node ${JSON.stringify(this.mRectangle)} (Depth ${depth})`);

        console.log(`Root values: ${this.mValues}`);

        for (let [i, child] of this.mChildren.entries()) {
            console.log(`Child ${i}`);
            child.print(depth + 1);
        }

        console.log(`End Node ${JSON.stringify(this.mRectangle)}====================`);
    }
}

Node.CHILDREN_COUNT = Object.values(Quadrant).length;