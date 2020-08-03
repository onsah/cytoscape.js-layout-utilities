import { LineSuperCover } from './general-utils';
import { Direction } from './models/compaction-grid';

export class Polyomino {
    /**
     * @param { number } width width of the polyomino in pixels
     * @param { number } height height of the polyomino in pixels
     * @param { number } index index in according to the input
     * @param { number } x1
     * @param { number } y1
     * @param { number } gridStep width and height of a grid square
     * @param {{ 
     *  component: import('./typedef').Component, 
     *  boundingRect: import('./typedef').IBoundingRectangle 
     * }} [componentAndRect]
     * 
     * @description 
     * Note: width and height are added to establish centering according to old layout center
     * 
     * Since width divided by the grid step can be calclated from raw step instead of adding new
     * variables I changed width and height and added gridStep variable so that stepWith and stepHeight can be calculated
     * from these. 
     * 
     * Old width and height properties were containing actually width and height divided by grid step, so I thought stepWidth and
     * stepHeight are more convenient names for them. 
     */
    constructor(x1, y1, width, height, gridStep, index, componentAndRect) {
        this.x1 = x1; //kept to determine the amount of shift in the output
        this.y1 = y1;//kept to determine the amount of shift in the output
        this.index = index; //order of polyomino in the input of the packing function
        this.width = width;
        this.height = height;
        this.gridStep = gridStep;
        /** @type { boolean[][] } */
        this.grid = new Array(this.stepWidth);
        for (var i = 0; i < this.stepWidth; i++) {
            this.grid[i] = new Array(this.stepHeight);
            for (var j = 0; j < this.stepHeight; j++) {
                this.grid[i][j] = false;
            }
        }
        /**the grid cell coordinates where the polyomino was placed. Denotes center */
        this.location = new Point(-1, -1); 
        /** inner center */
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));// center of polyomino
        this.numberOfOccupiredCells = 0;

        if (typeof componentAndRect !== 'undefined') {
            this.fill(componentAndRect.component, componentAndRect.boundingRect);
        }
    }

    /**
     * Fills the areas covered by the component
     * @param { import('./typedef').Component } component 
     * @param {{ x1: number, x2: number, y1: number, y2: number }} boundingRect 
     * Rectangle bounding component, can be calculated from component but taken as argument since it is already calcualated
     */
    fill(component, boundingRect) {
        //fill nodes to polyomino cells
        component.nodes.forEach((node) => {
            /* //top left cell of a node
            var topLeftX = Math.floor((node.x - boundingRect.x1) / this.gridStep);
            var topLeftY = Math.floor((node.y - boundingRect.y1) / this.gridStep);

            //bottom right cell of a node
            var bottomRightX = Math.floor((node.x + node.width - boundingRect.x1) / this.gridStep);
            var bottomRightY = Math.floor((node.y + node.height - boundingRect.y1) / this.gridStep); */

            let stepX1 = Math.floor(boundingRect.x1 / this.gridStep),
                stepY1 = Math.floor(boundingRect.y1 / this.gridStep);

            let topLeftX = Math.floor(node.x / this.gridStep) - stepX1,
                topLeftY = Math.floor(node.y / this.gridStep) - stepY1,
                bottomRightX = Math.floor((node.x + node.width - 1) / this.gridStep) - stepX1,
                bottomRightY = Math.floor((node.y + node.height - 1) / this.gridStep) - stepY1;
                
            //all cells between topleft cell and bottom right cell should be occupied
            for (var i = topLeftX; i <= bottomRightX; i++) {
                for (var j = topLeftY; j <= bottomRightY; j++) {
                    this.grid[i][j] = true;
                }
            }
        });

        //fill cells where edges pass 
        component.edges.forEach((edge) => {
            var p0 = {}, p1 = {};
            p0.x = (edge.startX - boundingRect.x1) / this.gridStep;
            p0.y = (edge.startY - boundingRect.y1) / this.gridStep;
            p1.x = (edge.endX - boundingRect.x1) / this.gridStep;
            p1.y = (edge.endY - boundingRect.y1) / this.gridStep;
            //for every edge calculate the super cover 
            // This fails for some reason
            var points = LineSuperCover(p0, p1);
            points.forEach((point) => {
                var indexX = Math.floor(point.x);
                var indexY = Math.floor(point.y);
                if (indexX >= 0 && indexX < this.stepWidth && indexY >= 0 && indexY < this.stepHeight) {
                    this.grid[Math.floor(point.x)][Math.floor(point.y)] = true;
                }
            });
        });

        //update number of occupied cells in polyomino
        for (var i = 0; i < this.stepWidth; i++) {
            for (var j = 0; j < this.stepHeight; j++) {
                if (this.grid[i][j]) 
                    this.numberOfOccupiredCells++;
            }
        }
    }

    get x2() {
        return this.x1 + this.width - 1;
    }

    get y2() {
        return this.y1 + this.height - 1;
    }

    get stepX1() {
        return Math.floor(this.x1 / this.gridStep);
    }

    get stepY1() {
        return Math.floor(this.y1 / this.gridStep);
    }

    get stepX2() {
        return Math.floor(this.x2 / this.gridStep);
    }

    get stepY2() {
        return Math.floor(this.y2 / this.gridStep);
    }

    /**
     * width of the polyomino divided by grid steps
     */
    get stepWidth() {
        return this.stepX2 - this.stepX1 + 1;
    }

    /**
     * height of the polyomino divided by grid steps
     */
    get stepHeight() {
        return this.stepY2 - this.stepY1 + 1;
    }

    /**
     * returns the center relative to location inside the grid
     */
    get gridStepCenter() {
        return this.center.diff(this.location);
    }

    getBoundingRectangle() {
        const polyx1 = this.location.x - this.center.x; 
        const polyy1 = this.location.y - this.center.y;

        return new BoundingRectangle(
            polyx1,
            polyy1,
            // -1 because if length == 1 then x2 == x1
            polyx1 + this.stepWidth - 1,
            polyy1 + this.stepHeight - 1 
        );
    }

    /**
     * Bounding rectangle with respect to x1, y1 and width, height inside the grid area \
     * Divided by grid step
     */
    get stepBoundingRectangle() {
        return new BoundingRectangle(
            this.stepX1,
            this.stepY1,
            this.stepX2,
            this.stepY2
        );
    }
}

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

export class BoundingRectangle {

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
     * @param { import('./typedef').IBoundingRectangle } other 
     */
    include(other) {
        this.x1 = Math.min(this.x1, other.x1);
        this.y1 = Math.min(this.y1, other.y1);
        this.x2 = Math.max(this.x2, other.x2);
        this.y2 = Math.max(this.y2, other.y2);
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
}

class Cell {
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

export class Grid {
    /** 
     * @param { number } width 
     * @param { number } height 
     * @param { number } step 
     */
    constructor(width, height, step) {
        this.width = width;
        this.height = height;
        this.step = step;
        //create and intialize the grid
        this.grid = Array.from({ length: this.stepWidth },
            ((_) => Array.from({ length: this.stepHeight },
                ((_) => new Cell(false, false)))));
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
        this.occupiedRectangle = new BoundingRectangle(
            Number.MAX_VALUE, Number.MAX_VALUE, 
            -Number.MAX_VALUE, -Number.MAX_VALUE
        );  // the bounding rectanble of the occupied cells in the grid
        this.numberOfOccupiredCells = 0;
    }

    /**
     * returns the width in terms of grid steps
     */
    get stepWidth() {
        return Math.floor(this.width / this.step) + 1;
    }

    /**
     * returns the height in terms of grid steps
     */
    get stepHeight() {
        return Math.floor(this.height / this.step) + 1;
    }

    /**
     * function given a list of cells it returns the direct unvisited unoccupied neighboring cells
     * @param { import('./typedef').IPoint[] } cells
     * @param { number } level
     * @returns { import('./typedef').IPoint[] }
     */
    getDirectNeighbors(cells, level) {
        /** @type { import('./typedef').IPoint[] } */
        var resultPoints = [];

        if (cells.length == 0) {
            for (var i = 0; i < this.stepWidth; i++) {
                for (var j = 0; j < this.stepHeight; j++) {
                    if (this.grid[i][j].occupied) {
                        resultPoints = resultPoints.concat(this.getCellNeighbors(i, j));
                    }
                }
            }
            var startIndex = 0;
            var endIndex = resultPoints.length - 1;

            for (var i = 2; i <= level; i++) {
                if (endIndex >= startIndex) {
                    for (var j = startIndex; j <= endIndex; j++) {
                        resultPoints = resultPoints.concat(this.getCellNeighbors(resultPoints[j].x, resultPoints[j].y));
                    }
                }
                startIndex = endIndex + 1;
                endIndex = resultPoints.length - 1;
            }
        } else {
            cells.forEach((cell) => {
                resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x, cell.y));
            });
        }
        return resultPoints;
    }

    /**
     * given a cell at locatoin i,j get the unvistied unoccupied neighboring cell
     * @param { number } i
     * @param { number } j
     * @returns { import('./typedef').IPoint[] }
     */
    getCellNeighbors(i, j) {
        /** @type { import('./typedef').IPoint[] } */
        var resultPoints = [];
        //check all the 8 surrounding cells 
        if (i - 1 >= 0) {
            if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
                resultPoints.push({ x: i - 1, y: j });
                this.grid[i - 1][j].visited = true;
            }
        }
        if (i + 1 < this.stepWidth) {
            if (!this.grid[i + 1][j].occupied && !this.grid[i + 1][j].visited) {
                resultPoints.push({ x: i + 1, y: j });
                this.grid[i + 1][j].visited = true;
            }
        }
        if (j - 1 >= 0) {
            if (!this.grid[i][j - 1].occupied && !this.grid[i][j - 1].visited) {
                resultPoints.push({ x: i, y: j - 1 });
                this.grid[i][j - 1].visited = true;
            }
        }
        if (j + 1 < this.stepHeight) {
            if (!this.grid[i][j + 1].occupied && !this.grid[i][j + 1].visited) {
                resultPoints.push({ x: i, y: j + 1 });
                this.grid[i][j + 1].visited = true;
            }
        }
        if (i - 1 >= 0) {
            if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
                resultPoints.push({ x: i - 1, y: j });
                this.grid[i - 1][j].visited = true;
            }
        }
        if (i - 1 >= 0 && j - 1 >= 0) {
            if (!this.grid[i - 1][j - 1].occupied && !this.grid[i - 1][j - 1].visited) {
                resultPoints.push({ x: i - 1, y: j - 1 });
                this.grid[i - 1][j - 1].visited = true;
            }
        }

        if (i + 1 < this.stepWidth && j - 1 >= 0) {
            if (!this.grid[i + 1][j - 1].occupied && !this.grid[i + 1][j - 1].visited) {
                resultPoints.push({ x: i + 1, y: j - 1 });
                this.grid[i + 1][j - 1].visited = true;
            }
        }

        if (i - 1 >= 0 && j + 1 < this.stepHeight) {
            if (!this.grid[i - 1][j + 1].occupied && !this.grid[i - 1][j + 1].visited) {
                resultPoints.push({ x: i - 1, y: j + 1 });
                this.grid[i - 1][j + 1].visited = true;
            }
        }
        if (i + 1 < this.stepWidth && j + 1 < this.stepHeight) {
            if (!this.grid[i + 1][j + 1].occupied && !this.grid[i + 1][j + 1].visited) {
                resultPoints.push({ x: i + 1, y: j + 1 });
                this.grid[i + 1][j + 1].visited = true;
            }
        }

        return resultPoints;
    }

    /**
     * a function to place the center of the polyomino in the cell i j inside the grid
     * @param { Polyomino } polyomino 
     * @param { number } i 
     * @param { number } j 
     */
    placePolyomino(polyomino, i, j) {
        polyomino.location.x = i;
        polyomino.location.y = j;
        for (let k = 0; k < polyomino.stepWidth; k++) {
            for (let l = 0; l < polyomino.stepHeight; l++) {
                if (polyomino.grid[k][l]) { //if [k] [l] cell is occupied in polyomino
                    this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied = true;
                }
            }
        }

        //update number of occupired cells
        this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;
        
        this.updateBounds(polyomino);
        
        // reset visited cells to none
        for (let x = 0; x < this.stepWidth; x++) {
            for (let y = 0; y < this.stepHeight; y++) {
                this.grid[x][y].visited = false;
            }
        }
    }

    /**
     * Updates step rectangle bounds so that the `polyomino` fits
     * @param { Polyomino } polyomino
     */
    updateBounds(polyomino) {
        let polyRect = polyomino.getBoundingRectangle();

        this.occupiedRectangle.x1 = Math.min(this.occupiedRectangle.x1, polyRect.x1);
        this.occupiedRectangle.x2 = Math.max(this.occupiedRectangle.x2, polyRect.x2);
        this.occupiedRectangle.y1 = Math.min(this.occupiedRectangle.y1, polyRect.y1);
        this.occupiedRectangle.y2 = Math.max(this.occupiedRectangle.y2, polyRect.y2);
    }

    /**
     * a function to determine if a polyomino can be placed on the given cell i,j
     * @param { Polyomino } polyomino 
     * @param { number } i 
     * @param { number } j 
     */
    tryPlacingPolyomino(polyomino, i, j) {
        for (var k = 0; k < polyomino.stepWidth; k++) {
            for (var l = 0; l < polyomino.stepHeight; l++) {
                //return false if polyomino goes outside the grid when placed on i,j
                if (k - polyomino.center.x + i >= this.stepWidth || k - polyomino.center.x + i < 0 || l - polyomino.center.y + j >= this.stepHeight || l - polyomino.center.y + j < 0) {
                    return false;
                }
                //return false if the  polymino cell and the corrosponding main grid cell are both occupied
                if (polyomino.grid[k][l] && this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * calculates the value of the utility (aspect ratio) of placing a polyomino on cell i,j
     * @param { Polyomino } polyomino
     * @param { number } i
     * @param { number } j
     * @param { number } desiredAspectRatio
     */
    calculateUtilityOfPlacing(polyomino, i, j, desiredAspectRatio) {
        var result = {};
        var actualAspectRatio = 1;
        var fullness = 1;
        var adjustedFullness = 1;
        var x1 = this.occupiedRectangle.x1;
        var x2 = this.occupiedRectangle.x2;
        var y1 = this.occupiedRectangle.y1;
        var y2 = this.occupiedRectangle.y2;
        if (i - polyomino.center.x < x1) x1 = i - polyomino.center.x;
        if (j - polyomino.center.y < y1) y1 = j - polyomino.center.y;
        if (polyomino.stepWidth - 1 - polyomino.center.x + i > x2) x2 = polyomino.stepWidth - 1 - polyomino.center.x + i;
        if (polyomino.stepHeight - 1 - polyomino.center.y + j > y2) y2 = polyomino.stepHeight - 1 - polyomino.center.y + j;
        var width = x2 - x1 + 1;
        var height = y2 - y1 + 1;
        actualAspectRatio = width / height;
        fullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * height);

        if (actualAspectRatio > desiredAspectRatio) {
            adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * (width / desiredAspectRatio));
            // height = width / desiredAspectRatio;
        } else {
            adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / ((height * desiredAspectRatio) * height);
            // width = height * desiredAspectRatio;
        }

        result.actualAspectRatio = actualAspectRatio;
        result.fullness = fullness;
        result.adjustedFullness = adjustedFullness;

        return result;
    }
}