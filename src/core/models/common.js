import { Direction } from './compaction-grid';

export class Point {
    /**
     * 
     * @param { number } x 
     * @param { number } y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns other - this for x and y
     * @param { Point } other
     */
    diff(other) {
        return new Point(
            other.x - this.x,
            other.y - this.y
        );
    }

    /**
     * @param { Point } other 
     */
    plus(other) {
        return new Point(
            this.x + other.x,
            this.y + other.y,
        );
    }

    /**
     * @param { Direction } direction
     */
    static fromDirection(direction) {
        switch (direction) {
            case Direction.LEFT:
                return new Point(1, 0);
            case Direction.RIGHT:
                return new Point(-1, 0);
            case Direction.BOTTOM:
                return new Point(0, -1);
            case Direction.TOP:
                return new Point(0, 1);
            default:
                throw new Error(`Invalid direction: ${Direction}`);
        }
    }
}

export class Rectangle {

    /**
     * @param { number } x1
     * @param { number } y1
     * @param { number } x2
     * @param { number } y2
     */
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    center() {
        return new Point(
            (this.x2 - this.x1) / 2,
            (this.y2 - this.y1) / 2
        );
    }

    /**
     * Expands bounds of `this` so that it contains 'other'
     * @param { import('../typedef').IRectangle } other 
     */
    include(other) {
        this.x1 = Math.min(this.x1, other.x1);
        this.y1 = Math.min(this.y1, other.y1);
        this.x2 = Math.max(this.x2, other.x2);
        this.y2 = Math.max(this.y2, other.y2);
    }

    /**
     * 
     * @param { Rectangle } other 
     */
    includes(other) {
        return this.x1 <= other.x1 &&
            this.y1 <= other.y1 &&
            this.x2 >= other.x2 &&
            this.y2 >= other.y2;
    }

    /**
     * Returns if the position is contained in the BoundingRectangle
     * @param { number } i 
     * @param { number } j 
     */
    contains(i, j) {
        return i >= this.y1 &&
            i <= this.y2 &&
            j >= this.x1 &&
            j <= this.x2;
    }       

    get width() {
        // +1 because x2 is inclusive
        return this.x2 - this.x1 + 1;
    }

    get height() {
        // +1 because y2 is inclusive
        return this.y2 - this.y1 + 1;
    }

    get absoluteCenter() {
        return new Point(
            this.x1 + (this.width / 2),
            this.y1 + (this.height / 2),
        );
    }
}

export class Cell {
    /**
     * 
     * @param { boolean } occupied 
     * @param { boolean } visited 
     */
    constructor(occupied, visited) {
        this.occupied = occupied; //boolean to determine if the cell is occupied
        this.visited = visited; //boolean to determine if the cell was visited before while traversing the cells
    }
}