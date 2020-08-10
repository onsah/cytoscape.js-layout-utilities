import { getCenter, getBoundingRectangle } from './general-utils';
import { CompactionGrid, Direction } from './models/compaction/compaction-grid';
import { Polyomino } from './models/polyomino';
import { Grid } from './models/grid';

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
        for (let cell of cells) {
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
        }
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
    
    for (let pol of polyominos) {
      var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;
      var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;
      shifts.push({ dx: dx, dy: dy });
    }

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
    console.log(`gridStep: ${gridStep}`);

    if (options.componentSpacing > 0) {
      let spacingAmount = options.componentSpacing;
      addSpacing(components, spacingAmount);
    }

    let { polyominos } = createPolyominos(components, gridStep);

    return incrementalPackImpl(polyominos, gridStep);
}

/**
 * Rest of the function after converting components to polyomino
 * @param { Polyomino[] } polyominos
 * @param { number } gridStep
 */
export function incrementalPackImpl(polyominos, gridStep) {
    let compactionGrid = new CompactionGrid(polyominos, gridStep);    
      
    {
      const directions = Object.values(Direction);
      /** @type { boolean[] } */
      let compacted = [];
      for (let dir of directions) {
        compacted[dir] = true;
      }

      while (compacted.some(b => b)) {
        for (let dir of directions) {
          compacted[dir] = compactionGrid.tryCompact(dir);
        }
      }
    }

    let shifts = polyominos.map(p => ({
        dx: (p.location.x - p.stepX1) * gridStep,
        dy: (p.location.y - p.stepY1) * gridStep,
      })
    );

    // compactionGrid.quadTree.mRoot.print(0);

    return { shifts };
}

/**
 * Single iteration each time
 * @param { import('./typedef').Component[] } components
 * @param { import('./typedef').Options } options
 */
export function incrementalSinglePack(components, options) {
    let gridStep = calculateGridStep(components, options);
    console.log(`gridStep: ${gridStep}`);

    if (options.componentSpacing > 0) {
      let spacingAmount = options.componentSpacing;
      addSpacing(components, spacingAmount);
    }

    let { polyominos } = createPolyominos(components, gridStep);

  let compactionGrid = new CompactionGrid(polyominos, gridStep);
  
  let dir = Direction.LEFT;

  const func = () => {
    dir += 1;
    dir %= Object.values(Direction).length;

    let didCompact = compactionGrid.tryCompact(dir);

    if (didCompact) {
      let shifts = polyominos.map(p => ({
          dx: (p.location.x - p.stepX1) * gridStep,
          dy: (p.location.y - p.stepY1) * gridStep,
        })
      );

      for (let [i, poly] of polyominos.entries()) {
        poly.x1 += shifts[i].dx;
        poly.y1 += shifts[i].dy;
      }

      return { shifts };
    } else {
      return null;
    }
  };

  return func;
}

// Below there are functions used in both methods

/**
 * @param { import('./typedef').Component[] } components
 * @param { { dx: number, dy: number }[] } shifts
 */
function calculatePackingCenter(components, shifts) {
    for (let [index, component] of components.entries()) {
        for (let node of component.nodes) {
            node.x += shifts[index].dx;
            node.y += shifts[index].dy;
        }
    }

    return getCenter(components);
}

/**
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
function calculateGridStep(components, options) {
    let gridStep = 0;
    
    let totalNodes = 0;
    for (let component of components) {
        totalNodes += component.nodes.length;
        gridStep += component.nodes.reduce(
            (gridStep, node) => gridStep + node.width + node.height, 0);
    }
    
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
        let boundingRect = getBoundingRectangle(component);

        let componentWidth = boundingRect.width;
        let componentHeight = boundingRect.height;

        gridWidth += componentWidth;
        gridHeight += componentHeight;

        let componentPolyomino = new Polyomino(
          boundingRect.x1, boundingRect.y1, 
          componentWidth, 
          componentHeight, 
          gridStep, index,
          { component, boundingRect }
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