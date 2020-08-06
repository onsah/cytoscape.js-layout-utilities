import { Cell, Rectangle, Point } from './common';
import { Polyomino } from './polyomino';

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
        this.occupiedRectangle = new Rectangle(
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
     * @param { import('../typedef').IPoint[] } cells
     * @param { number } level
     * @returns { import('../typedef').IPoint[] }
     */
    getDirectNeighbors(cells, level) {
        /** @type { import('../typedef').IPoint[] } */
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
            for (let cell of cells) {
                resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x, cell.y));
            }
        }
        return resultPoints;
    }

    /**
     * given a cell at locatoin i,j get the unvistied unoccupied neighboring cell
     * @param { number } i
     * @param { number } j
     * @returns { import('../typedef').IPoint[] }
     */
    getCellNeighbors(i, j) {
        /** @type { import('../typedef').IPoint[] } */
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