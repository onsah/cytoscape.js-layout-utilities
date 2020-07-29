import { getCenter, getBoundingRectangle } from './general-utils';
import { Polyomino, Grid } from './polyomino-packing';

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
    var gridWidth = 0, gridHeight = 0;
    /** @type { Polyomino[] } */
    var polyominos = [];
    var globalX1 = Number.MAX_VALUE, globalX2 = -Number.MAX_VALUE, globalY1 = Number.MAX_VALUE, globalY2 = -Number.MAX_VALUE;

    //create polyominos for components
    components.forEach((component, index) => {
      let { x1, x2, y1, y2 } = getBoundingRectangle(component);

      if (x1 < globalX1) globalX1 = x1;
      if (x2 > globalX2) globalX2 = x2;
      if (y1 < globalY1) globalY1 = y1;
      if (y2 > globalY2) globalY2 = y2;

      let componentWidth = x2 - x1;
      let componentHeight = y2 - y1;
      gridWidth += componentWidth;
      gridHeight += componentHeight;

      var componentPolyomino = new Polyomino(x1, y1, componentWidth, componentHeight, gridStep, index,
        { component, boundingRect: { x1, x2, y1, y2 } });

      /* //fill nodes to polyomino cells
      component.nodes.forEach(function (node) {
        //top left cell of a node
        var topLeftX = Math.floor((node.x - x1) / gridStep);
        var topLeftY = Math.floor((node.y - y1) / gridStep);

        //bottom right cell of a node
        var bottomRightX = Math.floor((node.x + node.width - x1) / gridStep);
        var bottomRightY = Math.floor((node.y + node.height - y1) / gridStep);

        //all cells between topleft cell and bottom right cell should be occupied
        for (var i = topLeftX; i <= bottomRightX; i++) {
          for (var j = topLeftY; j <= bottomRightY; j++) {
            componentPolyomino.grid[i][j] = true;
          }
        }
      });

      //fill cells where edges pass 
      component.edges.forEach(function (edge) {
        var p0 = {}, p1 = {};
        p0.x = (edge.startX - x1) / gridStep;
        p0.y = (edge.startY - y1) / gridStep;
        p1.x = (edge.endX - x1) / gridStep;
        p1.y = (edge.endY - y1) / gridStep;
        //for every edge calculate the super cover 
        var points = generalUtils.LineSuperCover(p0, p1);
        points.forEach(function (point) {
          var indexX = Math.floor(point.x);
          var indexY = Math.floor(point.y);
          if (indexX >= 0 && indexX < componentPolyomino.stepWidth && indexY >= 0 && indexY < componentPolyomino.stepHeight) {
            componentPolyomino.grid[Math.floor(point.x)][Math.floor(point.y)] = true;
          }
        });
      });

      //update number of occupied cells in polyomino
      for (var i = 0; i < componentPolyomino.stepWidth; i++) {
        for (var j = 0; j < componentPolyomino.stepHeight; j++) {
          if (componentPolyomino.grid[i][j]) componentPolyomino.numberOfOccupiredCells++;

        }
      } */
      polyominos.push(componentPolyomino);
    });

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
      var cells = [];
      var resultLocation = {};
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

    var packingResult = {
      shifts: []
    };

    /*  var shiftX = componentsCenter.x - ((mainGrid.center.x - mainGrid.occupiedRectangle.x1)*gridStep); 
    var shiftY = componentsCenter.y - ((mainGrid.center.y - mainGrid.occupiedRectangle.y1)*gridStep); 
    var occupiedCenterX = Math.floor((mainGrid.occupiedRectangle.x1 + mainGrid.occupiedRectangle.x2)/2);
    var occupiedCenterY = Math.floor((mainGrid.occupiedRectangle.y1 + mainGrid.occupiedRectangle.y2)/2); */
    
    polyominos.forEach(function (pol) {
      var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;//+shiftX;
      var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;// + shiftY;
      //var dx = (pol.location.x -occupiedCenterX) * gridStep + componentsCenter.x- pol.leftMostCoord;//+shiftX;
      //var dy = (pol.location.y -occupiedCenterY) * gridStep + componentsCenter.y-pol.topMostCoord;// + shiftY;
      packingResult.shifts.push({ dx: dx, dy: dy });
    });

    // Calculate what would be the center of the packed layout
    let packingCenter = calculatePackingCenter(components, packingResult.shifts);
    // Calculate the neccessary  additional shift to re-center
    let centerShift = packingCenter.diff(currentCenter);

    // Add the center shift
    for (let shift of packingResult.shifts) {
      shift.dx += centerShift.x;
      shift.dy += centerShift.y;
    }

    packingResult.aspectRatio = Math.round(((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 1e2) / 1e2;
    packingResult.fullness = Math.round(((mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1))) * 100) * 1e2) / 1e2;

    if (packingResult.aspectRatio > options.desiredAspectRatio) {
      var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
      packingResult.adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / (mainGridWidth * (mainGridWidth / options.desiredAspectRatio)) * 100)) * 1e2) / 1e2;
      // height = width / desiredAspectRatio;
    } else {
      var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
      packingResult.adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / ((mainGridheight * options.desiredAspectRatio) * mainGridheight)) * 100) * 1e2) / 1e2;
      // width = height * desiredAspectRatio;
    }


    return packingResult;
}

/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */
function incrementalPack(components, options) {
    throw new Error('Not Implemented');
}

// Below there are functions used in both methods

/**
 * @param { { nodes: any[] }[] } components
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