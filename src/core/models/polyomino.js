import { LineSuperCover, betterLineSupercover } from '../general-utils';
import { Rectangle, Point } from './common';

export class Polyomino {
    /**
     * @param { number } width width of the polyomino in pixels
     * @param { number } height height of the polyomino in pixels
     * @param { number } index index in according to the input
     * @param { number } x1
     * @param { number } y1
     * @param { number } gridStep width and height of a grid square
     * @param {{ 
     *  component: import('../typedef').Component, 
     *  boundingRect: import('../typedef').IRectangle 
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
        for (let i = 0; i < this.stepWidth; i++) {
            this.grid[i] = new Array(this.stepHeight);
            for (let j = 0; j < this.stepHeight; j++) {
                this.grid[i][j] = false;
            }
        }
        /**the grid cell coordinates where the polyomino was placed. Denotes center for only random packing */
        this.location = new Point(this.stepX1, this.stepY1); 
        /** inner center */
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));// center of polyomino
        this.numberOfOccupiredCells = 0;
        // Used for caching
        this.mRect = new Rectangle(
            this.location.x,
            this.location.y,
            this.location.x + this.stepWidth - 1,
            this.location.y + this.stepHeight - 1
        );
            
        if (typeof componentAndRect !== 'undefined') {
            this.fill(componentAndRect.component, componentAndRect.boundingRect);
        }
    }

    /**
     * Fills the areas covered by the component
     * @param { import('../typedef').Component } component 
     * @param {{ x1: number, x2: number, y1: number, y2: number }} boundingRect 
     * Rectangle bounding component, can be calculated from component but taken as argument since it is already calcualated
     */
    fill(component, boundingRect) {
        let stepX1 = Math.floor(boundingRect.x1 / this.gridStep),
            stepY1 = Math.floor(boundingRect.y1 / this.gridStep);

        //fill nodes to polyomino cells
        // for-of is faster than forEach https://jsperf.com/for-of-vs-foreach/10
        for (let node of component.nodes) {
            /* //top left cell of a node
            var topLeftX = Math.floor((node.x - boundingRect.x1) / this.gridStep);
            var topLeftY = Math.floor((node.y - boundingRect.y1) / this.gridStep);
    
            //bottom right cell of a node
            var bottomRightX = Math.floor((node.x + node.width - boundingRect.x1) / this.gridStep);
            var bottomRightY = Math.floor((node.y + node.height - boundingRect.y1) / this.gridStep); */
    
            
    
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
        }

        //fill cells where edges pass 
        for (let edge of component.edges) {
            let p0 = new Point(
                    (edge.startX - boundingRect.x1) / this.gridStep,
                    (edge.startY - boundingRect.y1) / this.gridStep,
                ),
                p1 = new Point(
                    (edge.endX - boundingRect.x1) / this.gridStep,
                    (edge.endY - boundingRect.y1) / this.gridStep,
                );
            //for every edge calculate the super cover 
            // This seems to work better
            var points = betterLineSupercover({ min: p0, max: p1 });
            // var points = LineSuperCover(p0, p1);
            for (let point of points) {
                let indexX = Math.floor(point.x);
                let indexY = Math.floor(point.y);
                if (indexX >= 0 && indexX < this.stepWidth && indexY >= 0 && indexY < this.stepHeight) {
                    this.grid[indexX][indexY] = true;
                }
            }
        }

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

        return new Rectangle(
            polyx1,
            polyy1,
            // -1 because if length == 1 then x2 == x1
            polyx1 + this.stepWidth - 1,
            polyy1 + this.stepHeight - 1 
        );
    }

    /**
     * Used by quadtree
     * @returns { Rectangle }
     */
    intoRectangle() {
        return this.mRect;
    }

    /**
     * 
     * @param { number } x 
     * @param { number } y
     * @returns { boolean } 
     */
    contains(x, y) {
        return this.mRect.contains(y, x);
    }

    /**
     * Changes the position of polyomino
     * @param { import('../typedef').IPoint } change 
     * @returns { void }
     */
    move(change) {
        this.location.x += change.x;
        this.location.y += change.y;

        this.mRect.x1 += change.x;
        this.mRect.x2 += change.x;
        this.mRect.y1 += change.y;
        this.mRect.y2 += change.y;
    }

    /**
     * Sets the position by ignoring the previous value
     * @param { import('../typedef').IPoint } position 
     */
    set(position) {
        this.location.x = position.x;
        this.location.y = position.y;

        this.mRect.x1 = position.x;
        this.mRect.x2 = position.x + this.stepWidth - 1;
        this.mRect.y1 = position.y;
        this.mRect.y2 = position.y + this.stepHeight - 1;
    }

    /**
     * Bounding rectangle with respect to x1, y1 and width, height inside the grid area \
     * Divided by grid step
     */
    get stepBoundingRectangle() {
        return new Rectangle(
            this.stepX1,
            this.stepY1,
            this.stepX2,
            this.stepY2
        );
    }
}

