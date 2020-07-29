import { getCenter, getBoundingRectangle } from './general-utils';
import { Polyomino, Grid, BoundingRectangle } from './polyomino-packing';

/**
 * This module is created so that parts of packing operations can be used in both of the packing methods
 */

/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
export function pack(components, options) {
    if (options.randomize) {
        return nonIncrementalPack(components, options)
    } else {
        return incrementalPack(components, options);
    }
}

/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
function nonIncrementalPack(components, options) {
    let currentCenter = getCenter(components);
    
    let gridStep = calculateGridStep(components, options);

    if (options.componentSpacing > 0) {
      let spacingAmount = options.componentSpacing;
      addSpacing(components, spacingAmount);
    }

    let { polyominos, gridWidth, gridHeight } = createPolyominos(components, gridStep);

    //order plyominos non-increasing order
    polyominos.sort(function (a, b) {
      var aSize = a.stepWidth * a.stepHeight;
      var bSize = b.stepWidth * b.stepHeight;
      // a should come before b in the sorted order
      if (aSize > bSize) {
        return -1;
        // a should come after b in the sorted order
      } else if (aSize < bSize) {
        return 1;
        // a and b are the same
      } else {
        return 0;
      }
    });
    
    //main grid width and height is two the times the sum of all components widths and heights (worst case scenario)
    //intialize the grid add 1 to avoid insufficient grid space due to divisin by 2 in calcuations
    let mainGrid = new Grid((gridWidth * 2) + gridStep, (gridHeight * 2) + gridStep, gridStep);

    //place first (biggest) polyomino in the center
    mainGrid.placePolyomino(polyominos[0], mainGrid.center.x, mainGrid.center.y);

    //for every polyomino try placeing it in first neighbors and calculate utility if none then second neighbor and so on..
    for (var i = 1; i < polyominos.length; i++) {
      var fullnessMax = 0;
      var adjustedFullnessMax = 0;
      var weigthFullnessAspectRatio = 0;
      var minAspectRatioDiff = 1000000;
      var placementFound = false;
      /** @type { import('./typedef').IPoint[] } */
      var cells = [];
      /** @type { import('./typedef').IPoint } */
      var resultLocation = { x: 0, y: 0 };
      while (!placementFound) {

        cells = mainGrid.getDirectNeighbors(cells, Math.ceil(Math.max(polyominos[i].stepWidth, polyominos[i].stepHeight) / 2));
        cells.forEach(function (cell) {
          if (mainGrid.tryPlacingPolyomino(polyominos[i], cell.x, cell.y)) {
            placementFound = true;
            var utilityValue = mainGrid.calculateUtilityOfPlacing(polyominos[i], cell.x, cell.y, options.desiredAspectRatio);
            var cellChosen = false;
            if (options.utilityFunction == 1) {
              if (utilityValue.adjustedFullness > adjustedFullnessMax) {
                cellChosen = true;
              } else if (utilityValue.adjustedFullness == adjustedFullnessMax) {
                if (utilityValue.fullness > fullnessMax) {
                  cellChosen = true;

                } else if (utilityValue.fullness == fullnessMax) {
                  if (Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio) <= minAspectRatioDiff) {
                    cellChosen = true;
                  }
                }
              }
              if (cellChosen) {
                adjustedFullnessMax = utilityValue.adjustedFullness;
                minAspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio);
                fullnessMax = utilityValue.fullness;
                resultLocation.x = cell.x;
                resultLocation.y = cell.y;
              }

            } else if (options.utilityFunction == 2) {
              var aspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio);
              var weightedUtility = (utilityValue.fullness * .5) + ((1 - aspectRatioDiff / Math.max(utilityValue.actualAspectRatio, options.desiredAspectRatio) * .5));
              if (weightedUtility > weigthFullnessAspectRatio) {
                weigthFullnessAspectRatio = weightedUtility;
                resultLocation.x = cell.x;
                resultLocation.y = cell.y;
              }
            }
          }
        });
      }

      mainGrid.placePolyomino(polyominos[i], resultLocation.x, resultLocation.y);
    }

    //sort polyominos according to index of input to return correct output order
    polyominos.sort(function (a, b) {
      if (a.index < b.index) {
        return -1;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return 0;
      }
    });
    
    /** @type {{ dx: number, dy: number }[]} */
    let shifts = [];
    
    polyominos.forEach(function (pol) {
      var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;
      var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;
      shifts.push({ dx: dx, dy: dy });
    });

    // Calculate what would be the center of the packed layout
    let packingCenter = calculatePackingCenter(components, shifts);
    // Calculate the neccessary  additional shift to re-center
    let centerShift = packingCenter.diff(currentCenter);

    // Add the center shift
    for (let shift of shifts) {
      shift.dx += centerShift.x;
      shift.dy += centerShift.y;
    }

    let stats = calculateStatistics(mainGrid, options.desiredAspectRatio);

    let packingResult = { shifts, ...stats };

    return packingResult;
}

/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
function incrementalPack(components, options) {
    let gridStep = calculateGridStep(components, options);

    if (options.componentSpacing > 0) {
      let spacingAmount = options.componentSpacing;
      addSpacing(components, spacingAmount);
    }

    let { polyominos } = createPolyominos(components, gridStep);

    // bounding rectangle by their current positions
    let localBoundingRectangle = new BoundingRectangle(
      Number.MAX_VALUE,
      Number.MAX_VALUE,
      -Number.MAX_VALUE,
      -Number.MAX_VALUE
    );

    for (let polyomino of polyominos) {
      
    }

    throw new Error('Not Implemented');
}

// Below there are functions used in both methods

/**
 * @param { import('./typedef').Component[] } components
 * @param { { dx: number, dy: number }[] } shifts
 */
function calculatePackingCenter(components, shifts) {
    components.forEach((component, index) => {
        component.nodes.forEach(node => {
        node.x += shifts[index].dx;
        node.y += shifts[index].dy;
        });
    });

    return getCenter(components);
}

/**
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
function calculateGridStep(components, options) {
    let gridStep = 0;
    
    let totalNodes = 0;
    components.forEach(function (component) {
      totalNodes += component.nodes.length;
      component.nodes.forEach(function (node) {
        gridStep += node.width + node.height;
      });
    });
    
    gridStep = gridStep / (2 * totalNodes);
    gridStep = Math.floor(gridStep * options.polyominoGridSizeFactor);

    return gridStep;
}

/**
 * @param { number } spacingAmount
 * @param { import('./typedef').Component[] } components
 */
function addSpacing(components, spacingAmount) {
    for (let component of components) {
        for (let node of component.nodes) {
            node.x = node.x - spacingAmount;
            node.y = node.y - spacingAmount;
            node.width = node.width + (2 * spacingAmount);
            node.height = node.height + (2 * spacingAmount);
        }
    }
}

/**
 * Creates the polyominos and the calculate minimum rectangle that can cover all of them
 * @param { import('./typedef').Component[] } components
 * @param { number } gridStep
 * @returns {{ polyominos: Polyomino[], gridWidth: number, gridHeight: number, }}
 */
function createPolyominos(components, gridStep) {
    let polyominos = [];
    let gridWidth = 0, gridHeight = 0;

    for (let [index, component] of components.entries()) {
        let { x1, x2, y1, y2 } = getBoundingRectangle(component);

        let componentWidth = x2 - x1;
        let componentHeight = y2 - y1;

        gridWidth += componentWidth;
        gridHeight += componentHeight;

        let componentPolyomino = new Polyomino(
          x1, y1, 
          componentWidth, 
          componentHeight, 
          gridStep, index,
          { component, boundingRect: { x1, x2, y1, y2 } }
        );

        polyominos.push(componentPolyomino);
    }

    return { polyominos, gridWidth, gridHeight };
}

/**
 * Calculates aspecRatio, fullness and adjustedFullness
 * @param { Grid } mainGrid 
 * @param { number } desiredAspectRatio 
 */
function calculateStatistics(mainGrid, desiredAspectRatio) {
    let aspectRatio = Math.round(((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 1e2) / 1e2;
    let fullness = Math.round(((mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1))) * 100) * 1e2) / 1e2;

    let adjustedFullness;

    if (aspectRatio > desiredAspectRatio) {
      var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
      adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / (mainGridWidth * (mainGridWidth / desiredAspectRatio)) * 100)) * 1e2) / 1e2;
      // height = width / desiredAspectRatio;
    } else {
      var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
      adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / ((mainGridheight * desiredAspectRatio) * mainGridheight)) * 100) * 1e2) / 1e2;
      // width = height * desiredAspectRatio;
    }

    return { aspectRatio, fullness, adjustedFullness };
}