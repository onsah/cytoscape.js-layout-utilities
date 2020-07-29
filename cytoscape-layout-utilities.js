(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeLayoutUtilities"] = factory();
	else
		root["cytoscapeLayoutUtilities"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = LineSuperCover;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCenter;
/* unused harmony export uniqueArray */
/* harmony export (immutable) */ __webpack_exports__["b"] = getBoundingRectangle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyomino_packing__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

 //a function to determine the grid cells where a line between point p0 and p1 pass through

function LineSuperCover(p0, p1) {
  var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
  var nx = Math.floor(Math.abs(dx)),
      ny = Math.floor(Math.abs(dy));
  var sign_x = dx > 0 ? 1 : -1,
      sign_y = dy > 0 ? 1 : -1;
  var p = new __WEBPACK_IMPORTED_MODULE_0__polyomino_packing__["c" /* Point */](p0.x, p0.y);
  var points = [new __WEBPACK_IMPORTED_MODULE_0__polyomino_packing__["c" /* Point */](p.x, p.y)];

  for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
    if ((0.5 + ix) / nx == (0.5 + iy) / ny) {
      // next step is diagonal
      p.x += sign_x;
      p.y += sign_y;
      ix++;
      iy++;
    } else if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += sign_x;
      ix++;
    } else {
      // next step is vertical
      p.y += sign_y;
      iy++;
    }

    points.push(new __WEBPACK_IMPORTED_MODULE_0__polyomino_packing__["c" /* Point */](p.x, p.y));
  }

  return points;
}
;
/**
 * finds the current center of components
 * @param { Array } components 
 */

function getCenter(components) {
  // In case the platform doesn't have flatMap function
  if (typeof Array.prototype['flatMap'] === 'undefined') {
    Array.prototype['flatMap'] = function (f) {
      var concat = function concat(x, y) {
        return x.concat(y);
      };

      var flatMap = function flatMap(f, xs) {
        return xs.map(f).reduce(concat, []);
      };

      return flatMap(f, this);
    };
  } // @ts-ignore


  var bounds = components.flatMap(function (component) {
    return component.nodes;
  }).map(function (node) {
    return {
      left: node.x,
      top: node.y,
      right: node.x + node.width - 1,
      bottom: node.y + node.height - 1
    };
  }).reduce(function (bounds, currNode) {
    return {
      left: Math.min(currNode.left, bounds.left),
      right: Math.max(currNode.right, bounds.right),
      top: Math.min(currNode.top, bounds.top),
      bottom: Math.max(currNode.bottom, bounds.bottom)
    };
  }, {
    left: Number.MAX_VALUE,
    right: -Number.MAX_VALUE,
    top: Number.MAX_VALUE,
    bottom: -Number.MAX_VALUE
  });
  return new __WEBPACK_IMPORTED_MODULE_0__polyomino_packing__["c" /* Point */]((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
} //

/**
 *  a function to remove duplicate object in array 
 * @param { any[] } ar 
 */

function uniqueArray(ar) {
  /** @type any */
  var j = {};
  ar.forEach(function (v) {
    j[v + '::' + _typeof(v)] = v;
  });
  return Object.keys(j).map(function (v) {
    return j[v];
  });
}
/**
 * Calculates the bounding rectangle of a graph
 * @param { import('./typedef').Component } component 
 */

function getBoundingRectangle(component) {
  var x1 = Number.MAX_VALUE,
      x2 = -Number.MAX_VALUE,
      y1 = Number.MAX_VALUE,
      y2 = -Number.MAX_VALUE;
  component.nodes.forEach(function (node) {
    if (node.x <= x1) x1 = node.x;
    if (node.y <= y1) y1 = node.y;
    if (node.x + node.width >= x2) x2 = node.x + node.width;
    if (node.y + node.height >= y2) y2 = node.y + node.height;
  });
  component.edges.forEach(function (edge) {
    if (edge.startX <= x1) x1 = edge.startX;
    if (edge.startY <= y1) y1 = edge.startY;
    if (edge.endX >= x2) x2 = edge.endX;
    if (edge.endY >= y2) y2 = edge.endY;
  });
  return {
    x1: x1,
    x2: x2,
    y1: y1,
    y2: y2
  };
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Polyomino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Point; });
/* unused harmony export BoundingRectangle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Grid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__general_utils__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Polyomino = /*#__PURE__*/function () {
  /**
   * @param { number } width width of the polyomino in pixels
   * @param { number } height height of the polyomino in pixels
   * @param { number } index index in according to the input
   * @param { number } x1
   * @param { number } y1
   * @param { number } gridStep width and height of a grid square
   * @param {{ 
   *  component: import('./typedef').Component, 
   *  boundingRect: { x1: number, x2: number, y1: number, y2: number } 
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
  function Polyomino(x1, y1, width, height, gridStep, index, componentAndRect) {
    _classCallCheck(this, Polyomino);

    this.width = width;
    this.height = height;
    this.gridStep = gridStep;
    this.grid = new Array(this.stepWidth);

    for (var i = 0; i < this.stepWidth; i++) {
      this.grid[i] = new Array(this.stepHeight);

      for (var j = 0; j < this.stepHeight; j++) {
        this.grid[i][j] = false;
      }
    }

    this.index = index; //index of polyomino in the input of the packing function

    this.x1 = x1; //kept to determine the amount of shift in the output

    this.y1 = y1; //kept to determine the amount of shift in the output

    this.location = new Point(-1, -1); //the grid cell coordinates where the polyomino was placed

    /** inner center */

    this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2)); // center of polyomino

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


  _createClass(Polyomino, [{
    key: "fill",
    value: function fill(component, boundingRect) {
      var _this = this;

      //fill nodes to polyomino cells
      component.nodes.forEach(function (node) {
        //top left cell of a node
        var topLeftX = Math.floor((node.x - boundingRect.x1) / _this.gridStep);
        var topLeftY = Math.floor((node.y - boundingRect.y1) / _this.gridStep); //bottom right cell of a node

        var bottomRightX = Math.floor((node.x + node.width - boundingRect.x1) / _this.gridStep);
        var bottomRightY = Math.floor((node.y + node.height - boundingRect.y1) / _this.gridStep); //all cells between topleft cell and bottom right cell should be occupied

        for (var i = topLeftX; i <= bottomRightX; i++) {
          for (var j = topLeftY; j <= bottomRightY; j++) {
            _this.grid[i][j] = true;
          }
        }
      }); //fill cells where edges pass 

      component.edges.forEach(function (edge) {
        var p0 = {},
            p1 = {};
        p0.x = (edge.startX - boundingRect.x1) / _this.gridStep;
        p0.y = (edge.startY - boundingRect.y1) / _this.gridStep;
        p1.x = (edge.endX - boundingRect.x1) / _this.gridStep;
        p1.y = (edge.endY - boundingRect.y1) / _this.gridStep; //for every edge calculate the super cover 
        // This fails for some reason

        var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["c" /* LineSuperCover */])(p0, p1);
        points.forEach(function (point) {
          var indexX = Math.floor(point.x);
          var indexY = Math.floor(point.y);

          if (indexX >= 0 && indexX < _this.stepWidth && indexY >= 0 && indexY < _this.stepHeight) {
            _this.grid[Math.floor(point.x)][Math.floor(point.y)] = true;
          }
        });
      }); //update number of occupied cells in polyomino

      for (var i = 0; i < this.stepWidth; i++) {
        for (var j = 0; j < this.stepHeight; j++) {
          if (this.grid[i][j]) this.numberOfOccupiredCells++;
        }
      }
    }
    /**
     * width of the polyomino divided by grid steps
     */

  }, {
    key: "getBoundingRectangle",
    value: function getBoundingRectangle() {
      var polyx1 = this.location.x - this.center.x;
      var polyy1 = this.location.y - this.center.y;
      return new BoundingRectangle(polyx1, polyy1, // -1 because if length == 1 then x2 == x1
      polyx1 + this.stepWidth - 1, polyy1 + this.stepHeight - 1);
    }
  }, {
    key: "stepWidth",
    get: function get() {
      return Math.floor(this.width / this.gridStep) + 1;
    }
    /**
     * height of the polyomino divided by grid steps
     */

  }, {
    key: "stepHeight",
    get: function get() {
      return Math.floor(this.height / this.gridStep) + 1;
    }
  }, {
    key: "x2",
    get: function get() {
      return this.x1 + this.width;
    }
  }, {
    key: "y2",
    get: function get() {
      return this.y1 + this.height;
    }
    /**
     * returns the center relative to location inside the grid
     */

  }, {
    key: "gridStepCenter",
    get: function get() {
      return this.center.diff(this.location);
    }
  }]);

  return Polyomino;
}();
var Point = /*#__PURE__*/function () {
  /**
   * 
   * @param { number } x 
   * @param { number } y 
   */
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }
  /**
   * Returns other - this for x and y
   * @param { Point } other
   */


  _createClass(Point, [{
    key: "diff",
    value: function diff(other) {
      return new Point(other.x - this.x, other.y - this.y);
    }
  }]);

  return Point;
}();
var BoundingRectangle = /*#__PURE__*/function () {
  /**
   * @param { number } x1
   * @param { number } y1
   * @param { number } x2
   * @param { number } y2
   */
  function BoundingRectangle(x1, y1, x2, y2) {
    _classCallCheck(this, BoundingRectangle);

    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  _createClass(BoundingRectangle, [{
    key: "center",
    value: function center() {
      return new Point((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    }
  }]);

  return BoundingRectangle;
}();

var Cell =
/**
 * 
 * @param { boolean } occupied 
 * @param { boolean } visited 
 */
function Cell(occupied, visited) {
  _classCallCheck(this, Cell);

  this.occupied = occupied; //boolean to determine if the cell is occupied

  this.visited = visited; //boolean to determine if the cell was visited before while traversing the cells
};

var Grid = /*#__PURE__*/function () {
  /** 
   * @param { number } width 
   * @param { number } height 
   * @param { number } step 
   */
  function Grid(width, height, step) {
    var _this2 = this;

    _classCallCheck(this, Grid);

    this.width = width;
    this.height = height;
    this.step = step; //create and intialize the grid

    this.grid = Array.from({
      length: this.stepWidth
    }, function (_) {
      return Array.from({
        length: _this2.stepHeight
      }, function (_) {
        return new Cell(false, false);
      });
    });
    this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
    this.occupiedRectangle = new BoundingRectangle(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE); // the bounding rectanble of the occupied cells in the grid

    this.numberOfOccupiredCells = 0;
  }
  /**
   * returns the width in terms of grid steps
   */


  _createClass(Grid, [{
    key: "getDirectNeighbors",

    /**
     * function given a list of cells it returns the direct unvisited unoccupied neighboring cells 
     */
    value: function getDirectNeighbors(cells, level) {
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
        cells.forEach(function (cell) {
          resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x, cell.y));
        }.bind(this));
      }

      return resultPoints;
    }
    /**
     * given a cell at locatoin i,j get the unvistied unoccupied neighboring cell
     * @param { number } i
     * @param { number } j
     */

  }, {
    key: "getCellNeighbors",
    value: function getCellNeighbors(i, j) {
      var resultPoints = []; //check all the 8 surrounding cells 

      if (i - 1 >= 0) {
        if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
          resultPoints.push({
            x: i - 1,
            y: j
          });
          this.grid[i - 1][j].visited = true;
        }
      }

      if (i + 1 < this.stepWidth) {
        if (!this.grid[i + 1][j].occupied && !this.grid[i + 1][j].visited) {
          resultPoints.push({
            x: i + 1,
            y: j
          });
          this.grid[i + 1][j].visited = true;
        }
      }

      if (j - 1 >= 0) {
        if (!this.grid[i][j - 1].occupied && !this.grid[i][j - 1].visited) {
          resultPoints.push({
            x: i,
            y: j - 1
          });
          this.grid[i][j - 1].visited = true;
        }
      }

      if (j + 1 < this.stepHeight) {
        if (!this.grid[i][j + 1].occupied && !this.grid[i][j + 1].visited) {
          resultPoints.push({
            x: i,
            y: j + 1
          });
          this.grid[i][j + 1].visited = true;
        }
      }

      if (i - 1 >= 0) {
        if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
          resultPoints.push({
            x: i - 1,
            y: j
          });
          this.grid[i - 1][j].visited = true;
        }
      }

      if (i - 1 >= 0 && j - 1 >= 0) {
        if (!this.grid[i - 1][j - 1].occupied && !this.grid[i - 1][j - 1].visited) {
          resultPoints.push({
            x: i - 1,
            y: j - 1
          });
          this.grid[i - 1][j - 1].visited = true;
        }
      }

      if (i + 1 < this.stepWidth && j - 1 >= 0) {
        if (!this.grid[i + 1][j - 1].occupied && !this.grid[i + 1][j - 1].visited) {
          resultPoints.push({
            x: i + 1,
            y: j - 1
          });
          this.grid[i + 1][j - 1].visited = true;
        }
      }

      if (i - 1 >= 0 && j + 1 < this.stepHeight) {
        if (!this.grid[i - 1][j + 1].occupied && !this.grid[i - 1][j + 1].visited) {
          resultPoints.push({
            x: i - 1,
            y: j + 1
          });
          this.grid[i - 1][j + 1].visited = true;
        }
      }

      if (i + 1 < this.stepWidth && j + 1 < this.stepHeight) {
        if (!this.grid[i + 1][j + 1].occupied && !this.grid[i + 1][j + 1].visited) {
          resultPoints.push({
            x: i + 1,
            y: j + 1
          });
          this.grid[i + 1][j + 1].visited = true;
        }
      }

      return resultPoints;
    }
    /**
     * a function to place a given polyomino in the cell i j on the grid
     * @param { Polyomino } polyomino 
     * @param { number } i 
     * @param { number } j 
     */

  }, {
    key: "placePolyomino",
    value: function placePolyomino(polyomino, i, j) {
      polyomino.location.x = i;
      polyomino.location.y = j;

      for (var k = 0; k < polyomino.stepWidth; k++) {
        for (var l = 0; l < polyomino.stepHeight; l++) {
          if (polyomino.grid[k][l]) {
            //if [k] [l] cell is occupied in polyomino
            this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied = true;
          }
        }
      } //update number of occupired cells


      this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;
      this.updateBounds(polyomino); // reset visited cells to none

      for (var x = 0; x < this.stepWidth; x++) {
        for (var y = 0; y < this.stepHeight; y++) {
          this.grid[x][y].visited = false;
        }
      }
    }
    /**
     * Updates step rectangle bounds so that the `polyomino` fits
     * @param { Polyomino } polyomino
     */

  }, {
    key: "updateBounds",
    value: function updateBounds(polyomino) {
      var polyRect = polyomino.getBoundingRectangle();
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

  }, {
    key: "tryPlacingPolyomino",
    value: function tryPlacingPolyomino(polyomino, i, j) {
      for (var k = 0; k < polyomino.stepWidth; k++) {
        for (var l = 0; l < polyomino.stepHeight; l++) {
          //return false if polyomino goes outside the grid when placed on i,j
          if (k - polyomino.center.x + i >= this.stepWidth || k - polyomino.center.x + i < 0 || l - polyomino.center.y + j >= this.stepHeight || l - polyomino.center.y + j < 0) {
            return false;
          } //return false if the  polymino cell and the corrosponding main grid cell are both occupied


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

  }, {
    key: "calculateUtilityOfPlacing",
    value: function calculateUtilityOfPlacing(polyomino, i, j, desiredAspectRatio) {
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
        adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * (width / desiredAspectRatio)); // height = width / desiredAspectRatio;
      } else {
        adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (height * desiredAspectRatio * height); // width = height * desiredAspectRatio;
      }

      result.actualAspectRatio = actualAspectRatio;
      result.fullness = fullness;
      result.adjustedFullness = adjustedFullness;
      return result;
    }
  }, {
    key: "stepWidth",
    get: function get() {
      return Math.floor(this.width / this.step) + 1;
    }
    /**
     * returns the height in terms of grid steps
     */

  }, {
    key: "stepHeight",
    get: function get() {
      return Math.floor(this.height / this.step) + 1;
    }
  }]);

  return Grid;
}();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__packing__ = __webpack_require__(4);

/**
 * @param { * } cy 
 * @param { import('./typedef').Options } options 
 */

var layoutUtilities = function layoutUtilities(cy, options) {
  /*  var defaults = {
     idealEdgeLength : 50,
     offset : 20,
     desiredAspectRatio : 1,
     polyominoGridSizeFactor : 1,
     utilityFunction : 1
   };
     function extend(defaults, options) {
     var obj = {};
       for (var i in defaults) {
       obj[i] = defaults[i];
     }
       for (var i in options) {      
       obj[i] = options[i];
     }
       return obj;
   };
     options = extend(defaults, options); */
  var instance = {};

  instance.placeHiddenNodes = function (mainEles) {
    mainEles.forEach(function (mainEle) {
      var hiddenEles = mainEle.neighborhood().nodes(":hidden");
      hiddenEles.forEach(function (hiddenEle) {
        var neighbors = hiddenEle.neighborhood().nodes(":visible");

        if (neighbors.length > 1) {
          instance.nodeWithMultipleNeighbors(hiddenEle);
        } else instance.nodeWithOneNeighbor(mainEle, hiddenEle);
      });
    });
  };

  instance.placeNewNodes = function (eles) {
    var components = this.findComponents(eles);
    var disconnectedComp = [];

    for (var i = 0; i < components.length; i++) {
      var oneNeig = false;
      var multNeig = false;
      var mainEle;
      var multneighbors = [];
      var positioned = [];
      var x = 0;
      var y = 0;
      var isPositioned = false;

      for (var j = 0; j < components[i].length; j++) {
        var neighbors = components[i][j].neighborhood().nodes().difference(eles);
        positioned.push(false);

        if (neighbors.length > 1 && !isPositioned) {
          multNeig = true;
          positioned[j] = true;
          multneighbors = neighbors;
          instance.nodeWithMultipleNeighbors(components[i][j], multneighbors);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        } else if (neighbors.length == 1 && !isPositioned) {
          oneNeig = true;
          mainEle = neighbors[0];
          positioned[j] = true;
          instance.nodeWithOneNeighbor(mainEle, components[i][j]);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        }
      }

      if (oneNeig || multNeig) {
        for (var j = 0; j < components[i].length; j++) {
          if (positioned[j] == false) {
            var neighbors = components[i][j].neighborhood().nodes();
            var positionedNeigbors = [];
            var curr = components[i][j].neighborhood().nodes().difference(eles);
            curr.forEach(function (ele) {
              positionedNeigbors.push(ele);
            });

            for (var k = 0; k < neighbors.length; k++) {
              if (positioned[components[i].indexOf(neighbors[k])]) {
                positionedNeigbors.push(neighbors[k]);
              }
            }

            if (positionedNeigbors.length > 1) {
              instance.nodeWithMultipleNeighbors(components[i][j], positionedNeigbors);
            } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], components[i][j]);else {
              var horizontalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              var verticalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              components[i][j].position("x", x + horizontalP);
              components[i][j].position("y", y + verticalP);
            }

            positioned[j] = true;
          }
        }
      } else {
        disconnectedComp.push(components[i]);
      }
    }

    if (disconnectedComp.length >= 1) {
      instance.disconnectedNodes(disconnectedComp);
    }
  };

  instance.disconnectedNodes = function (components) {
    var leftX = Number.MAX_VALUE;
    var rightX = -Number.MAX_VALUE;
    var topY = Number.MAX_VALUE;
    var bottomY = -Number.MAX_VALUE; // Check the x and y limits of all hidden elements and store them in the variables above

    cy.nodes(':visible').forEach(function (node) {
      var halfWidth = node.outerWidth() / 2;
      var halfHeight = node.outerHeight() / 2;
      if (node.position("x") - halfWidth < leftX) leftX = node.position("x") - halfWidth;
      if (node.position("x") + halfWidth > rightX) rightX = node.position("x") + halfWidth;
      if (node.position("y") - halfHeight < topY) topY = node.position("y") - halfHeight;
      if (node.position("y") + halfHeight > bottomY) bottomY = node.position("y") + halfHeight;
    });
    var radiusy = topY - bottomY;
    var radiusx = rightX - leftX;
    var innerRadius = Math.sqrt(radiusx * radiusx + radiusy * radiusy) / 2;
    var centerX = (leftX + rightX) / 2;
    var centerY = (topY + bottomY) / 2; //var components = this.findComponents(newEles);

    var numOfComponents = components.length;
    var angle = 360 / numOfComponents;
    var count = 1;
    components.forEach(function (component) {
      var distFromCenter = instance.generateRandom(innerRadius + options.offset * 6, innerRadius + options.offset * 8, 1);
      var curAngle = angle * count;
      var angleInRadians = curAngle * Math.PI / 180;
      var x = centerX + distFromCenter * Math.cos(angleInRadians);
      var y = centerY + distFromCenter * Math.sin(angleInRadians);

      if (component.length == 1) {
        component[0].position("x", x);
        component[0].position("y", y);
      } else {
        var positioned = [];

        for (var i = 0; i < component.length; i++) {
          positioned.push(false);
        }

        positioned[0] = true;
        component[0].position("x", x);
        component[0].position("y", y);

        for (var i = 1; i < component.length; i++) {
          var neighbors = component[i].neighborhood().nodes();
          var positionedNeigbors = [];

          for (var j = 0; j < neighbors.length; j++) {
            if (positioned[component.indexOf(neighbors[j])]) {
              positionedNeigbors.push(neighbors[j]);
            }
          }

          if (positionedNeigbors.length > 1) {
            instance.nodeWithMultipleNeighbors(component[i], positionedNeigbors);
          } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], component[i]);else {
            var horizontalP = instance.generateRandom(options.offset, options.offset * 2, 0);
            var verticalP = instance.generateRandom(options.offset, options.offset * 2, 0);
            component[i].position("x", x + horizontalP);
            component[i].position("y", y + verticalP);
          }

          positioned[i] = true;
        }
      }

      count++;
    });
  };

  instance.findComponents = function (newEles) {
    var adjListArray = [];
    var current = cy.nodes().difference(newEles);
    newEles.forEach(function (ele) {
      var neighbors = ele.neighborhood().nodes().difference(current);
      var listOfIndexes = [];
      neighbors.forEach(function (neigbor) {
        var index = newEles.indexOf(neigbor);
        listOfIndexes.push(index);
      });
      adjListArray.push(listOfIndexes);
    }); // Mark all the vertices as not visited 

    var visited = [];

    for (var v = 0; v < newEles.length; v++) {
      visited.push(false);
    }

    var listOfComponents = [];

    for (var v = 0; v < newEles.length; v++) {
      var elesOfComponent = [];

      if (visited[v] == false) {
        // print all reachable vertices 
        // from v 
        this.DFSUtil(v, visited, adjListArray, newEles, elesOfComponent);
        listOfComponents.push(elesOfComponent);
      }
    }

    return listOfComponents;
  };

  instance.DFSUtil = function (v, visited, adjListArray, newEles, elesOfComponent) {
    // Mark the current node as visited and print it 
    visited[v] = true;
    elesOfComponent.push(newEles[v]); // Recur for all the vertices 
    // adjacent to this vertex 

    for (var i = 0; i < adjListArray[v].length; i++) {
      if (!visited[adjListArray[v][i]]) this.DFSUtil(adjListArray[v][i], visited, adjListArray, newEles, elesOfComponent);
    }
  };

  instance.nodeWithOneNeighbor = function (mainEle, hiddenEle) {
    var quadrants = instance.checkOccupiedQuadrants(mainEle, hiddenEle);
    var freeQuadrants = [];

    for (var property in quadrants) {
      if (quadrants[property] === "free") freeQuadrants.push(property);
    } //Can take values 1 and -1 and are used to place the hidden nodes in the random quadrant


    var horizontalMult;
    var verticalMult;

    if (freeQuadrants.length > 0) {
      if (freeQuadrants.length === 3) {
        if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('third')) {
          horizontalMult = -1;
          verticalMult = -1;
        } else if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = -1;
        } else if (freeQuadrants.includes('first') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = 1;
        } else if (freeQuadrants.includes('second') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = -1;
          verticalMult = 1;
        }
      } else {
        //Randomly picks one quadrant from the free quadrants
        var randomQuadrant = freeQuadrants[Math.floor(Math.random() * freeQuadrants.length)];

        if (randomQuadrant === "first") {
          horizontalMult = 1;
          verticalMult = -1;
        } else if (randomQuadrant === "second") {
          horizontalMult = -1;
          verticalMult = -1;
        } else if (randomQuadrant === "third") {
          horizontalMult = -1;
          verticalMult = 1;
        } else if (randomQuadrant === "fourth") {
          horizontalMult = 1;
          verticalMult = 1;
        }
      }
    } else {
      horizontalMult = 0;
      verticalMult = 0;
    } //Change the position of hidden elements


    var horizontalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, horizontalMult);
    var verticalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, verticalMult);
    var newCenterX = mainEle.position("x") + horizontalParam;
    var newCenterY = mainEle.position("y") + verticalParam;
    hiddenEle.position("x", newCenterX);
    hiddenEle.position("y", newCenterY);
  };

  instance.nodeWithMultipleNeighbors = function (ele, neighbors) {
    if (neighbors == null) {
      var neighbors = ele.neighborhood().nodes(":visible");
    }

    var x = 0;
    var y = 0;
    var count = 0;
    neighbors.forEach(function (ele1) {
      x += ele1.position("x");
      y += ele1.position("y");
      count++;
    });
    x = x / count;
    y = y / count;
    var diffx = instance.generateRandom(0, options.offset / 2, 0);
    var diffy = instance.generateRandom(0, options.offset / 2, 0);
    ele.position("x", x + diffx);
    ele.position("y", y + diffy);
  };

  instance.generateRandom = function (min, max, mult) {
    var val = [-1, 1];
    if (mult === 0) mult = val[Math.floor(Math.random() * val.length)];
    return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
  };

  instance.checkOccupiedQuadrants = function (mainEle, hiddenEles) {
    var visibleEles = mainEle.neighborhood().difference(hiddenEles).nodes();
    var occupiedQuadrants = {
      first: "free",
      second: "free",
      third: "free",
      fourth: "free"
    };
    visibleEles.forEach(function (ele) {
      if (ele.data('class') != 'compartment' && ele.data('class') != 'complex') {
        if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.second = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.first = "occupied";else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.third = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.fourth = "occupied";
      }
    });
    return occupiedQuadrants;
  };
  /**
   * @param { import('./typedef').Component[] } components 
   */


  instance.packComponents = function (components) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__packing__["a" /* pack */])(components, options);
  };

  return instance;
};

/* harmony default export */ __webpack_exports__["default"] = (layoutUtilities);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var layoutUtilities = __webpack_require__(2)["default"]; // registers the extension on a cytoscape lib ref

  /**
   * @param {typeof globalThis.cytoscape} cytoscape
   */


  var register = function register(cytoscape) {
    if (!cytoscape) {
      return;
    } // can't register if cytoscape unspecified

    /** @type {import('./typedef').Options} */


    var options = {
      idealEdgeLength: 50,
      offset: 20,
      desiredAspectRatio: 1,
      polyominoGridSizeFactor: 1,
      utilityFunction: 1,
      // Maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
      componentSpacing: 30,
      randomize: true
    };
    /*  function extend(defaults, options) {
       var obj = {};
         for (var i in defaults) {
         obj[i] = defaults[i];
       }
         for (var i in options) {
         if(i == "desiredAspectRatio"){
           var value = options[i];
            if(!isNaN(value))
            {
               if(value >= 0 && value <= 20){
                 obj[i] = options[i];
               }else if(value < 0){
                 obj[i] = 0
               }else{
                 obj[i] = 20
               }
            }
         }else{
           obj[i] = options[i];
         }
         }
         return obj;
      }; */

    cytoscape('core', 'layoutUtilities', function (opts) {
      var cy = this; // If 'get' is given as the param then return the extension instance

      if (opts === 'get') {
        return getScratch(cy).instance;
      }
      /**
      * Deep copy or merge objects - replacement for jQuery deep extend
      * Taken from http://youmightnotneedjquery.com/#deep_extend
      * and bug related to deep copy of Arrays is fixed.
      * Usage:Object.extend({}, objA, objB)
      */


      function extendOptions(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];
          if (!obj) continue;

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (Array.isArray(obj[key])) {
                out[key] = obj[key].slice();
              } else if (_typeof(obj[key]) === 'object') {
                out[key] = extendOptions(out[key], obj[key]);
              } else {
                out[key] = obj[key];
              }
            }
          }
        }

        return out;
      }

      options = extendOptions({}, options, opts);

      function getScratch(eleOrCy) {
        if (!eleOrCy.scratch("_layoutUtilities")) {
          eleOrCy.scratch("_layoutUtilities", {});
        }

        return eleOrCy.scratch("_layoutUtilities");
      } // create a view utilities instance


      var instance = layoutUtilities(cy, options); // set the instance on the scratch pad

      getScratch(cy).instance = instance;

      if (!getScratch(cy).initialized) {
        getScratch(cy).initialized = true;
        var shiftKeyDown = false;
        document.addEventListener('keydown', function (event) {
          if (event.key == "Shift") {
            shiftKeyDown = true;
          }
        });
        document.addEventListener('keyup', function (event) {
          if (event.key == "Shift") {
            shiftKeyDown = false;
          }
        }); //Select the desired neighbors after taphold-and-free

        /*  cy.on('taphold', 'node', function(event){
           var target = event.target || event.cyTarget;
           var tapheld = false;
           var neighborhood;
           var timeout = setTimeout(function(){
             if(shiftKeyDown){
               cy.elements().unselect();
               neighborhood = options.neighbor(target);
               if(neighborhood)
                 neighborhood.select();
               target.lock();
               tapheld = true;
             }
           }, options.neighborSelectTime - 500);
           cy.on('free', 'node', function(){
             var targetTapheld = event.target || event.cyTarget;
             if(target == targetTapheld && tapheld === true){
               tapheld = false;
               if(neighborhood)
                 neighborhood.select();
               target.unlock();
             }
             else{
               clearTimeout(timeout);
             }
           });
           cy.on('drag', 'node', function(){
             var targetDragged = event.target || event.cyTarget;
             if(target == targetDragged && tapheld === false){
               clearTimeout(timeout);
             }
           })
         }); */
      } // return the instance of extension


      return getScratch(cy).instance;
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    // expose as a commonjs module
    module.exports = register;
  }

  if (true) {
    // expose as an amd/requirejs module
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return register;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  if (typeof cytoscape !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape);
  }
})();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pack;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__general_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polyomino_packing__ = __webpack_require__(1);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */

function pack(components, options) {
  if (options.randomize) {
    return nonIncrementalPack(components, options);
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
  var currentCenter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["a" /* getCenter */])(components);
  var gridStep = calculateGridStep(components, options);

  if (options.componentSpacing > 0) {
    var spacingAmount = options.componentSpacing;
    addSpacing(components, spacingAmount);
  }

  var gridWidth = 0,
      gridHeight = 0;
  /** @type { Polyomino[] } */

  var polyominos = [];
  var globalX1 = Number.MAX_VALUE,
      globalX2 = -Number.MAX_VALUE,
      globalY1 = Number.MAX_VALUE,
      globalY2 = -Number.MAX_VALUE; //create polyominos for components

  components.forEach(function (component, index) {
    var _getBoundingRectangle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["b" /* getBoundingRectangle */])(component),
        x1 = _getBoundingRectangle.x1,
        x2 = _getBoundingRectangle.x2,
        y1 = _getBoundingRectangle.y1,
        y2 = _getBoundingRectangle.y2;

    if (x1 < globalX1) globalX1 = x1;
    if (x2 > globalX2) globalX2 = x2;
    if (y1 < globalY1) globalY1 = y1;
    if (y2 > globalY2) globalY2 = y2;
    var componentWidth = x2 - x1;
    var componentHeight = y2 - y1;
    gridWidth += componentWidth;
    gridHeight += componentHeight;
    var componentPolyomino = new __WEBPACK_IMPORTED_MODULE_1__polyomino_packing__["a" /* Polyomino */](x1, y1, componentWidth, componentHeight, gridStep, index, {
      component: component,
      boundingRect: {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
      }
    });
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
  }); //order plyominos non-increasing order

  polyominos.sort(function (a, b) {
    var aSize = a.stepWidth * a.stepHeight;
    var bSize = b.stepWidth * b.stepHeight; // a should come before b in the sorted order

    if (aSize > bSize) {
      return -1; // a should come after b in the sorted order
    } else if (aSize < bSize) {
      return 1; // a and b are the same
    } else {
      return 0;
    }
  }); //main grid width and height is two the times the sum of all components widths and heights (worst case scenario)
  //intialize the grid add 1 to avoid insufficient grid space due to divisin by 2 in calcuations

  var mainGrid = new __WEBPACK_IMPORTED_MODULE_1__polyomino_packing__["b" /* Grid */](gridWidth * 2 + gridStep, gridHeight * 2 + gridStep, gridStep); //place first (biggest) polyomino in the center

  mainGrid.placePolyomino(polyominos[0], mainGrid.center.x, mainGrid.center.y); //for every polyomino try placeing it in first neighbors and calculate utility if none then second neighbor and so on..

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
            var weightedUtility = utilityValue.fullness * .5 + (1 - aspectRatioDiff / Math.max(utilityValue.actualAspectRatio, options.desiredAspectRatio) * .5);

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
  } //sort polyominos according to index of input to return correct output order


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
    var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1; //+shiftX;

    var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1; // + shiftY;
    //var dx = (pol.location.x -occupiedCenterX) * gridStep + componentsCenter.x- pol.leftMostCoord;//+shiftX;
    //var dy = (pol.location.y -occupiedCenterY) * gridStep + componentsCenter.y-pol.topMostCoord;// + shiftY;

    packingResult.shifts.push({
      dx: dx,
      dy: dy
    });
  }); // Calculate what would be the center of the packed layout

  var packingCenter = calculatePackingCenter(components, packingResult.shifts); // Calculate the neccessary  additional shift to re-center

  var centerShift = packingCenter.diff(currentCenter); // Add the center shift

  var _iterator = _createForOfIteratorHelper(packingResult.shifts),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var shift = _step.value;
      shift.dx += centerShift.x;
      shift.dy += centerShift.y;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  packingResult.aspectRatio = Math.round((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1) * 1e2) / 1e2;
  packingResult.fullness = Math.round(mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 100 * 1e2) / 1e2;

  if (packingResult.aspectRatio > options.desiredAspectRatio) {
    var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
    packingResult.adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridWidth * (mainGridWidth / options.desiredAspectRatio)) * 100 * 1e2) / 1e2; // height = width / desiredAspectRatio;
  } else {
    var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
    packingResult.adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridheight * options.desiredAspectRatio * mainGridheight) * 100 * 1e2) / 1e2; // width = height * desiredAspectRatio;
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
} // Below there are functions used in both methods

/**
 * @param { { nodes: any[] }[] } components
 * @param { { dx: number, dy: number }[] } shifts
 */


function calculatePackingCenter(components, shifts) {
  components.forEach(function (component, index) {
    component.nodes.forEach(function (node) {
      node.x += shifts[index].dx;
      node.y += shifts[index].dy;
    });
  });
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["a" /* getCenter */])(components);
}
/**
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */


function calculateGridStep(components, options) {
  var gridStep = 0;
  var totalNodes = 0;
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
  var _iterator2 = _createForOfIteratorHelper(components),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var component = _step2.value;

      var _iterator3 = _createForOfIteratorHelper(component.nodes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;
          node.x = node.x - spacingAmount;
          node.y = node.y - spacingAmount;
          node.width = node.width + 2 * spacingAmount;
          node.height = node.height + 2 * spacingAmount;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5YWEzMWQzNTMwY2NiYzkxNDQzOSIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9nZW5lcmFsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3BvbHlvbWluby1wYWNraW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2xheW91dC11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcGFja2luZy5qcyJdLCJuYW1lcyI6WyJMaW5lU3VwZXJDb3ZlciIsInAwIiwicDEiLCJkeCIsIngiLCJkeSIsInkiLCJueCIsIk1hdGgiLCJmbG9vciIsImFicyIsIm55Iiwic2lnbl94Iiwic2lnbl95IiwicCIsIlBvaW50IiwicG9pbnRzIiwiaXgiLCJpeSIsInB1c2giLCJnZXRDZW50ZXIiLCJjb21wb25lbnRzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmIiwiY29uY2F0IiwiZmxhdE1hcCIsInhzIiwibWFwIiwicmVkdWNlIiwiYm91bmRzIiwiY29tcG9uZW50Iiwibm9kZXMiLCJub2RlIiwibGVmdCIsInRvcCIsInJpZ2h0Iiwid2lkdGgiLCJib3R0b20iLCJoZWlnaHQiLCJjdXJyTm9kZSIsIm1pbiIsIm1heCIsIk51bWJlciIsIk1BWF9WQUxVRSIsInVuaXF1ZUFycmF5IiwiYXIiLCJqIiwiZm9yRWFjaCIsInYiLCJPYmplY3QiLCJrZXlzIiwiZ2V0Qm91bmRpbmdSZWN0YW5nbGUiLCJ4MSIsIngyIiwieTEiLCJ5MiIsImVkZ2VzIiwiZWRnZSIsInN0YXJ0WCIsInN0YXJ0WSIsImVuZFgiLCJlbmRZIiwiUG9seW9taW5vIiwiZ3JpZFN0ZXAiLCJpbmRleCIsImNvbXBvbmVudEFuZFJlY3QiLCJncmlkIiwic3RlcFdpZHRoIiwiaSIsInN0ZXBIZWlnaHQiLCJsb2NhdGlvbiIsImNlbnRlciIsIm51bWJlck9mT2NjdXBpcmVkQ2VsbHMiLCJmaWxsIiwiYm91bmRpbmdSZWN0IiwidG9wTGVmdFgiLCJ0b3BMZWZ0WSIsImJvdHRvbVJpZ2h0WCIsImJvdHRvbVJpZ2h0WSIsInBvaW50IiwiaW5kZXhYIiwiaW5kZXhZIiwicG9seXgxIiwicG9seXkxIiwiQm91bmRpbmdSZWN0YW5nbGUiLCJkaWZmIiwib3RoZXIiLCJDZWxsIiwib2NjdXBpZWQiLCJ2aXNpdGVkIiwiR3JpZCIsInN0ZXAiLCJmcm9tIiwibGVuZ3RoIiwiXyIsIm9jY3VwaWVkUmVjdGFuZ2xlIiwiY2VsbHMiLCJsZXZlbCIsInJlc3VsdFBvaW50cyIsImdldENlbGxOZWlnaGJvcnMiLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJjZWxsIiwiYmluZCIsInBvbHlvbWlubyIsImsiLCJsIiwidXBkYXRlQm91bmRzIiwicG9seVJlY3QiLCJkZXNpcmVkQXNwZWN0UmF0aW8iLCJyZXN1bHQiLCJhY3R1YWxBc3BlY3RSYXRpbyIsImZ1bGxuZXNzIiwiYWRqdXN0ZWRGdWxsbmVzcyIsImxheW91dFV0aWxpdGllcyIsImN5Iiwib3B0aW9ucyIsImluc3RhbmNlIiwicGxhY2VIaWRkZW5Ob2RlcyIsIm1haW5FbGVzIiwibWFpbkVsZSIsImhpZGRlbkVsZXMiLCJuZWlnaGJvcmhvb2QiLCJoaWRkZW5FbGUiLCJuZWlnaGJvcnMiLCJub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzIiwibm9kZVdpdGhPbmVOZWlnaGJvciIsInBsYWNlTmV3Tm9kZXMiLCJlbGVzIiwiZmluZENvbXBvbmVudHMiLCJkaXNjb25uZWN0ZWRDb21wIiwib25lTmVpZyIsIm11bHROZWlnIiwibXVsdG5laWdoYm9ycyIsInBvc2l0aW9uZWQiLCJpc1Bvc2l0aW9uZWQiLCJkaWZmZXJlbmNlIiwicG9zaXRpb24iLCJwb3NpdGlvbmVkTmVpZ2JvcnMiLCJjdXJyIiwiZWxlIiwiaW5kZXhPZiIsImhvcml6b250YWxQIiwiZ2VuZXJhdGVSYW5kb20iLCJvZmZzZXQiLCJ2ZXJ0aWNhbFAiLCJkaXNjb25uZWN0ZWROb2RlcyIsImxlZnRYIiwicmlnaHRYIiwidG9wWSIsImJvdHRvbVkiLCJoYWxmV2lkdGgiLCJvdXRlcldpZHRoIiwiaGFsZkhlaWdodCIsIm91dGVySGVpZ2h0IiwicmFkaXVzeSIsInJhZGl1c3giLCJpbm5lclJhZGl1cyIsInNxcnQiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm51bU9mQ29tcG9uZW50cyIsImFuZ2xlIiwiY291bnQiLCJkaXN0RnJvbUNlbnRlciIsImN1ckFuZ2xlIiwiYW5nbGVJblJhZGlhbnMiLCJQSSIsImNvcyIsInNpbiIsIm5ld0VsZXMiLCJhZGpMaXN0QXJyYXkiLCJjdXJyZW50IiwibGlzdE9mSW5kZXhlcyIsIm5laWdib3IiLCJsaXN0T2ZDb21wb25lbnRzIiwiZWxlc09mQ29tcG9uZW50IiwiREZTVXRpbCIsInF1YWRyYW50cyIsImNoZWNrT2NjdXBpZWRRdWFkcmFudHMiLCJmcmVlUXVhZHJhbnRzIiwicHJvcGVydHkiLCJob3Jpem9udGFsTXVsdCIsInZlcnRpY2FsTXVsdCIsImluY2x1ZGVzIiwicmFuZG9tUXVhZHJhbnQiLCJyYW5kb20iLCJob3Jpem9udGFsUGFyYW0iLCJpZGVhbEVkZ2VMZW5ndGgiLCJ2ZXJ0aWNhbFBhcmFtIiwibmV3Q2VudGVyWCIsIm5ld0NlbnRlclkiLCJlbGUxIiwiZGlmZngiLCJkaWZmeSIsIm11bHQiLCJ2YWwiLCJ2aXNpYmxlRWxlcyIsIm9jY3VwaWVkUXVhZHJhbnRzIiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsImZvdXJ0aCIsImRhdGEiLCJwYWNrQ29tcG9uZW50cyIsInBhY2siLCJyZXF1aXJlIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiLCJwb2x5b21pbm9HcmlkU2l6ZUZhY3RvciIsInV0aWxpdHlGdW5jdGlvbiIsImNvbXBvbmVudFNwYWNpbmciLCJyYW5kb21pemUiLCJvcHRzIiwiZ2V0U2NyYXRjaCIsImV4dGVuZE9wdGlvbnMiLCJvdXQiLCJhcmd1bWVudHMiLCJvYmoiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImlzQXJyYXkiLCJzbGljZSIsImVsZU9yQ3kiLCJzY3JhdGNoIiwiaW5pdGlhbGl6ZWQiLCJzaGlmdEtleURvd24iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZpbmUiLCJub25JbmNyZW1lbnRhbFBhY2siLCJpbmNyZW1lbnRhbFBhY2siLCJjdXJyZW50Q2VudGVyIiwiY2FsY3VsYXRlR3JpZFN0ZXAiLCJzcGFjaW5nQW1vdW50IiwiYWRkU3BhY2luZyIsImdyaWRXaWR0aCIsImdyaWRIZWlnaHQiLCJwb2x5b21pbm9zIiwiZ2xvYmFsWDEiLCJnbG9iYWxYMiIsImdsb2JhbFkxIiwiZ2xvYmFsWTIiLCJjb21wb25lbnRXaWR0aCIsImNvbXBvbmVudEhlaWdodCIsImNvbXBvbmVudFBvbHlvbWlubyIsInNvcnQiLCJhIiwiYiIsImFTaXplIiwiYlNpemUiLCJtYWluR3JpZCIsInBsYWNlUG9seW9taW5vIiwiZnVsbG5lc3NNYXgiLCJhZGp1c3RlZEZ1bGxuZXNzTWF4Iiwid2VpZ3RoRnVsbG5lc3NBc3BlY3RSYXRpbyIsIm1pbkFzcGVjdFJhdGlvRGlmZiIsInBsYWNlbWVudEZvdW5kIiwicmVzdWx0TG9jYXRpb24iLCJnZXREaXJlY3ROZWlnaGJvcnMiLCJjZWlsIiwidHJ5UGxhY2luZ1BvbHlvbWlubyIsInV0aWxpdHlWYWx1ZSIsImNhbGN1bGF0ZVV0aWxpdHlPZlBsYWNpbmciLCJjZWxsQ2hvc2VuIiwiYXNwZWN0UmF0aW9EaWZmIiwid2VpZ2h0ZWRVdGlsaXR5IiwicGFja2luZ1Jlc3VsdCIsInNoaWZ0cyIsInBvbCIsInBhY2tpbmdDZW50ZXIiLCJjYWxjdWxhdGVQYWNraW5nQ2VudGVyIiwiY2VudGVyU2hpZnQiLCJzaGlmdCIsImFzcGVjdFJhdGlvIiwicm91bmQiLCJtYWluR3JpZFdpZHRoIiwibWFpbkdyaWRoZWlnaHQiLCJFcnJvciIsInRvdGFsTm9k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OlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlTGF5b3V0VXRpbGl0aWVzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUxheW91dFV0aWxpdGllc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlhYTMxZDM1MzBjY2JjOTE0NDM5IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuL3BvbHlvbWluby1wYWNraW5nJztcblxuLy9hIGZ1bmN0aW9uIHRvIGRldGVybWluZSB0aGUgZ3JpZCBjZWxscyB3aGVyZSBhIGxpbmUgYmV0d2VlbiBwb2ludCBwMCBhbmQgcDEgcGFzcyB0aHJvdWdoXG5leHBvcnQgZnVuY3Rpb24gTGluZVN1cGVyQ292ZXIocDAsIHAxKSB7XG4gIHZhciBkeCA9IHAxLnggLSBwMC54LCBkeSA9IHAxLnkgLSBwMC55O1xuICB2YXIgbnggPSBNYXRoLmZsb29yKE1hdGguYWJzKGR4KSksIG55ID0gTWF0aC5mbG9vcihNYXRoLmFicyhkeSkpO1xuICB2YXIgc2lnbl94ID0gZHggPiAwID8gMSA6IC0xLCBzaWduX3kgPSBkeSA+IDAgPyAxIDogLTE7XG5cbiAgdmFyIHAgPSBuZXcgUG9pbnQocDAueCwgcDAueSk7XG4gIHZhciBwb2ludHMgPSBbbmV3IFBvaW50KHAueCwgcC55KV07XG4gIGZvciAodmFyIGl4ID0gMCwgaXkgPSAwOyBpeCA8IG54IHx8IGl5IDwgbnk7KSB7XG4gICAgaWYgKCgwLjUgKyBpeCkgLyBueCA9PSAoMC41ICsgaXkpIC8gbnkpIHtcbiAgICAgIC8vIG5leHQgc3RlcCBpcyBkaWFnb25hbFxuICAgICAgcC54ICs9IHNpZ25feDtcbiAgICAgIHAueSArPSBzaWduX3k7XG4gICAgICBpeCsrO1xuICAgICAgaXkrKztcbiAgICB9IGVsc2UgaWYgKCgwLjUgKyBpeCkgLyBueCA8ICgwLjUgKyBpeSkgLyBueSkge1xuICAgICAgLy8gbmV4dCBzdGVwIGlzIGhvcml6b250YWxcbiAgICAgIHAueCArPSBzaWduX3g7XG4gICAgICBpeCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBuZXh0IHN0ZXAgaXMgdmVydGljYWxcbiAgICAgIHAueSArPSBzaWduX3k7XG4gICAgICBpeSsrO1xuICAgIH1cbiAgICBwb2ludHMucHVzaChuZXcgUG9pbnQocC54LCBwLnkpKTtcbiAgfVxuICByZXR1cm4gcG9pbnRzO1xufTtcblxuLyoqXG4gKiBmaW5kcyB0aGUgY3VycmVudCBjZW50ZXIgb2YgY29tcG9uZW50c1xuICogQHBhcmFtIHsgQXJyYXkgfSBjb21wb25lbnRzIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VudGVyKGNvbXBvbmVudHMpIHtcbiAgLy8gSW4gY2FzZSB0aGUgcGxhdGZvcm0gZG9lc24ndCBoYXZlIGZsYXRNYXAgZnVuY3Rpb25cbiAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGVbJ2ZsYXRNYXAnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBBcnJheS5wcm90b3R5cGVbJ2ZsYXRNYXAnXSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICBjb25zdCBjb25jYXQgPSAoeCwgeSkgPT4geC5jb25jYXQoeSk7XG4gICAgICBjb25zdCBmbGF0TWFwID0gKGYsIHhzKSA9PiB4cy5tYXAoZikucmVkdWNlKGNvbmNhdCwgW10pO1xuXG4gICAgICByZXR1cm4gZmxhdE1hcChmLCB0aGlzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBsZXQgYm91bmRzID0gY29tcG9uZW50cy5mbGF0TWFwKGNvbXBvbmVudCA9PiBjb21wb25lbnQubm9kZXMpXG4gICAgLm1hcChub2RlID0+ICh7XG4gICAgICBsZWZ0OiBub2RlLngsXG4gICAgICB0b3A6IG5vZGUueSxcbiAgICAgIHJpZ2h0OiBub2RlLnggKyBub2RlLndpZHRoIC0gMSxcbiAgICAgIGJvdHRvbTogbm9kZS55ICsgbm9kZS5oZWlnaHQgLSAxLFxuICAgIH0pKVxuICAgIC5yZWR1Y2UoKGJvdW5kcywgY3Vyck5vZGUpID0+ICh7XG4gICAgICAgIGxlZnQ6IE1hdGgubWluKGN1cnJOb2RlLmxlZnQsIGJvdW5kcy5sZWZ0KSxcbiAgICAgICAgcmlnaHQ6IE1hdGgubWF4KGN1cnJOb2RlLnJpZ2h0LCBib3VuZHMucmlnaHQpLFxuICAgICAgICB0b3A6IE1hdGgubWluKGN1cnJOb2RlLnRvcCwgYm91bmRzLnRvcCksXG4gICAgICAgIGJvdHRvbTogTWF0aC5tYXgoY3Vyck5vZGUuYm90dG9tLCBib3VuZHMuYm90dG9tKVxuICAgIH0pLCB7XG4gICAgICBsZWZ0OiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgcmlnaHQ6IC1OdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgdG9wOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgYm90dG9tOiAtTnVtYmVyLk1BWF9WQUxVRVxuICAgIH0pO1xuXG4gIHJldHVybiBuZXcgUG9pbnQoKGJvdW5kcy5sZWZ0ICsgYm91bmRzLnJpZ2h0KSAvIDIsIChib3VuZHMudG9wICsgYm91bmRzLmJvdHRvbSkgLyAyKTtcbn1cblxuLy9cbi8qKlxuICogIGEgZnVuY3Rpb24gdG8gcmVtb3ZlIGR1cGxpY2F0ZSBvYmplY3QgaW4gYXJyYXkgXG4gKiBAcGFyYW0geyBhbnlbXSB9IGFyIFxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXIpIHtcbiAgLyoqIEB0eXBlIGFueSAqL1xuICB2YXIgaiA9IHt9O1xuICBhci5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgalt2ICsgJzo6JyArIHR5cGVvZiB2XSA9IHY7XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmtleXMoaikubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIGpbdl07XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBvZiBhIGdyYXBoXG4gKiBAcGFyYW0geyBpbXBvcnQoJy4vdHlwZWRlZicpLkNvbXBvbmVudCB9IGNvbXBvbmVudCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdGFuZ2xlKGNvbXBvbmVudCkge1xuICAgIGxldCB4MSA9IE51bWJlci5NQVhfVkFMVUUsIHgyID0gLU51bWJlci5NQVhfVkFMVUUsIHkxID0gTnVtYmVyLk1BWF9WQUxVRSwgeTIgPSAtTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBjb21wb25lbnQubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUueCA8PSB4MSkgeDEgPSBub2RlLng7XG4gICAgICBpZiAobm9kZS55IDw9IHkxKSB5MSA9IG5vZGUueTtcbiAgICAgIGlmIChub2RlLnggKyBub2RlLndpZHRoID49IHgyKSB4MiA9IG5vZGUueCArIG5vZGUud2lkdGg7XG4gICAgICBpZiAobm9kZS55ICsgbm9kZS5oZWlnaHQgPj0geTIpIHkyID0gbm9kZS55ICsgbm9kZS5oZWlnaHQ7XG4gICAgfSk7XG5cbiAgICBjb21wb25lbnQuZWRnZXMuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgaWYgKGVkZ2Uuc3RhcnRYIDw9IHgxKSB4MSA9IGVkZ2Uuc3RhcnRYO1xuICAgICAgaWYgKGVkZ2Uuc3RhcnRZIDw9IHkxKSB5MSA9IGVkZ2Uuc3RhcnRZO1xuICAgICAgaWYgKGVkZ2UuZW5kWCA+PSB4MikgeDIgPSBlZGdlLmVuZFg7XG4gICAgICBpZiAoZWRnZS5lbmRZID49IHkyKSB5MiA9IGVkZ2UuZW5kWTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHgxLCB4MiwgeTEsIHkyIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvZ2VuZXJhbC11dGlscy5qcyIsImltcG9ydCB7IExpbmVTdXBlckNvdmVyIH0gZnJvbSAnLi9nZW5lcmFsLXV0aWxzJztcblxuZXhwb3J0IGNsYXNzIFBvbHlvbWlubyB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gd2lkdGggd2lkdGggb2YgdGhlIHBvbHlvbWlubyBpbiBwaXhlbHNcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBoZWlnaHQgaGVpZ2h0IG9mIHRoZSBwb2x5b21pbm8gaW4gcGl4ZWxzXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaW5kZXggaW5kZXggaW4gYWNjb3JkaW5nIHRvIHRoZSBpbnB1dFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHgxXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geTFcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBncmlkU3RlcCB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgZ3JpZCBzcXVhcmVcbiAgICAgKiBAcGFyYW0ge3sgXG4gICAgICogIGNvbXBvbmVudDogaW1wb3J0KCcuL3R5cGVkZWYnKS5Db21wb25lbnQsIFxuICAgICAqICBib3VuZGluZ1JlY3Q6IHsgeDE6IG51bWJlciwgeDI6IG51bWJlciwgeTE6IG51bWJlciwgeTI6IG51bWJlciB9IFxuICAgICAqIH19IFtjb21wb25lbnRBbmRSZWN0XVxuICAgICAqIFxuICAgICAqIEBkZXNjcmlwdGlvbiBcbiAgICAgKiBOb3RlOiB3aWR0aCBhbmQgaGVpZ2h0IGFyZSBhZGRlZCB0byBlc3RhYmxpc2ggY2VudGVyaW5nIGFjY29yZGluZyB0byBvbGQgbGF5b3V0IGNlbnRlclxuICAgICAqIFxuICAgICAqIFNpbmNlIHdpZHRoIGRpdmlkZWQgYnkgdGhlIGdyaWQgc3RlcCBjYW4gYmUgY2FsY2xhdGVkIGZyb20gcmF3IHN0ZXAgaW5zdGVhZCBvZiBhZGRpbmcgbmV3XG4gICAgICogdmFyaWFibGVzIEkgY2hhbmdlZCB3aWR0aCBhbmQgaGVpZ2h0IGFuZCBhZGRlZCBncmlkU3RlcCB2YXJpYWJsZSBzbyB0aGF0IHN0ZXBXaXRoIGFuZCBzdGVwSGVpZ2h0IGNhbiBiZSBjYWxjdWxhdGVkXG4gICAgICogZnJvbSB0aGVzZS4gXG4gICAgICogXG4gICAgICogT2xkIHdpZHRoIGFuZCBoZWlnaHQgcHJvcGVydGllcyB3ZXJlIGNvbnRhaW5pbmcgYWN0dWFsbHkgd2lkdGggYW5kIGhlaWdodCBkaXZpZGVkIGJ5IGdyaWQgc3RlcCwgc28gSSB0aG91Z2h0IHN0ZXBXaWR0aCBhbmRcbiAgICAgKiBzdGVwSGVpZ2h0IGFyZSBtb3JlIGNvbnZlbmllbnQgbmFtZXMgZm9yIHRoZW0uIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSwgd2lkdGgsIGhlaWdodCwgZ3JpZFN0ZXAsIGluZGV4LCBjb21wb25lbnRBbmRSZWN0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KHRoaXMuc3RlcFdpZHRoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0ZXBXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRbaV0gPSBuZXcgQXJyYXkodGhpcy5zdGVwSGVpZ2h0KTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zdGVwSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaV1bal0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7IC8vaW5kZXggb2YgcG9seW9taW5vIGluIHRoZSBpbnB1dCBvZiB0aGUgcGFja2luZyBmdW5jdGlvblxuICAgICAgICB0aGlzLngxID0geDE7IC8va2VwdCB0byBkZXRlcm1pbmUgdGhlIGFtb3VudCBvZiBzaGlmdCBpbiB0aGUgb3V0cHV0XG4gICAgICAgIHRoaXMueTEgPSB5MTsvL2tlcHQgdG8gZGV0ZXJtaW5lIHRoZSBhbW91bnQgb2Ygc2hpZnQgaW4gdGhlIG91dHB1dFxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbmV3IFBvaW50KC0xLCAtMSk7ICAvL3RoZSBncmlkIGNlbGwgY29vcmRpbmF0ZXMgd2hlcmUgdGhlIHBvbHlvbWlubyB3YXMgcGxhY2VkXG4gICAgICAgIC8qKiBpbm5lciBjZW50ZXIgKi9cbiAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgUG9pbnQoTWF0aC5mbG9vcih0aGlzLnN0ZXBXaWR0aCAvIDIpLCBNYXRoLmZsb29yKHRoaXMuc3RlcEhlaWdodCAvIDIpKTsvLyBjZW50ZXIgb2YgcG9seW9taW5vXG4gICAgICAgIHRoaXMubnVtYmVyT2ZPY2N1cGlyZWRDZWxscyA9IDA7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRBbmRSZWN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5maWxsKGNvbXBvbmVudEFuZFJlY3QuY29tcG9uZW50LCBjb21wb25lbnRBbmRSZWN0LmJvdW5kaW5nUmVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxscyB0aGUgYXJlYXMgY292ZXJlZCBieSB0aGUgY29tcG9uZW50XG4gICAgICogQHBhcmFtIHsgaW1wb3J0KCcuL3R5cGVkZWYnKS5Db21wb25lbnQgfSBjb21wb25lbnQgXG4gICAgICogQHBhcmFtIHt7IHgxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkxOiBudW1iZXIsIHkyOiBudW1iZXIgfX0gYm91bmRpbmdSZWN0IFxuICAgICAqIFJlY3RhbmdsZSBib3VuZGluZyBjb21wb25lbnQsIGNhbiBiZSBjYWxjdWxhdGVkIGZyb20gY29tcG9uZW50IGJ1dCB0YWtlbiBhcyBhcmd1bWVudCBzaW5jZSBpdCBpcyBhbHJlYWR5IGNhbGN1YWxhdGVkXG4gICAgICovXG4gICAgZmlsbChjb21wb25lbnQsIGJvdW5kaW5nUmVjdCkge1xuICAgICAgICAvL2ZpbGwgbm9kZXMgdG8gcG9seW9taW5vIGNlbGxzXG4gICAgICAgIGNvbXBvbmVudC5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAvL3RvcCBsZWZ0IGNlbGwgb2YgYSBub2RlXG4gICAgICAgICAgICB2YXIgdG9wTGVmdFggPSBNYXRoLmZsb29yKChub2RlLnggLSBib3VuZGluZ1JlY3QueDEpIC8gdGhpcy5ncmlkU3RlcCk7XG4gICAgICAgICAgICB2YXIgdG9wTGVmdFkgPSBNYXRoLmZsb29yKChub2RlLnkgLSBib3VuZGluZ1JlY3QueTEpIC8gdGhpcy5ncmlkU3RlcCk7XG5cbiAgICAgICAgICAgIC8vYm90dG9tIHJpZ2h0IGNlbGwgb2YgYSBub2RlXG4gICAgICAgICAgICB2YXIgYm90dG9tUmlnaHRYID0gTWF0aC5mbG9vcigobm9kZS54ICsgbm9kZS53aWR0aCAtIGJvdW5kaW5nUmVjdC54MSkgLyB0aGlzLmdyaWRTdGVwKTtcbiAgICAgICAgICAgIHZhciBib3R0b21SaWdodFkgPSBNYXRoLmZsb29yKChub2RlLnkgKyBub2RlLmhlaWdodCAtIGJvdW5kaW5nUmVjdC55MSkgLyB0aGlzLmdyaWRTdGVwKTtcblxuICAgICAgICAgICAgLy9hbGwgY2VsbHMgYmV0d2VlbiB0b3BsZWZ0IGNlbGwgYW5kIGJvdHRvbSByaWdodCBjZWxsIHNob3VsZCBiZSBvY2N1cGllZFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvcExlZnRYOyBpIDw9IGJvdHRvbVJpZ2h0WDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gdG9wTGVmdFk7IGogPD0gYm90dG9tUmlnaHRZOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaV1bal0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgLy9maWxsIGNlbGxzIHdoZXJlIGVkZ2VzIHBhc3MgXG4gICAgICBjb21wb25lbnQuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgICB2YXIgcDAgPSB7fSwgcDEgPSB7fTtcbiAgICAgICAgcDAueCA9IChlZGdlLnN0YXJ0WCAtIGJvdW5kaW5nUmVjdC54MSkgLyB0aGlzLmdyaWRTdGVwO1xuICAgICAgICBwMC55ID0gKGVkZ2Uuc3RhcnRZIC0gYm91bmRpbmdSZWN0LnkxKSAvIHRoaXMuZ3JpZFN0ZXA7XG4gICAgICAgIHAxLnggPSAoZWRnZS5lbmRYIC0gYm91bmRpbmdSZWN0LngxKSAvIHRoaXMuZ3JpZFN0ZXA7XG4gICAgICAgIHAxLnkgPSAoZWRnZS5lbmRZIC0gYm91bmRpbmdSZWN0LnkxKSAvIHRoaXMuZ3JpZFN0ZXA7XG4gICAgICAgIC8vZm9yIGV2ZXJ5IGVkZ2UgY2FsY3VsYXRlIHRoZSBzdXBlciBjb3ZlciBcbiAgICAgICAgLy8gVGhpcyBmYWlscyBmb3Igc29tZSByZWFzb25cbiAgICAgICAgdmFyIHBvaW50cyA9IExpbmVTdXBlckNvdmVyKHAwLCBwMSk7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgICAgIHZhciBpbmRleFggPSBNYXRoLmZsb29yKHBvaW50LngpO1xuICAgICAgICAgIHZhciBpbmRleFkgPSBNYXRoLmZsb29yKHBvaW50LnkpO1xuICAgICAgICAgIGlmIChpbmRleFggPj0gMCAmJiBpbmRleFggPCB0aGlzLnN0ZXBXaWR0aCAmJiBpbmRleFkgPj0gMCAmJiBpbmRleFkgPCB0aGlzLnN0ZXBIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtNYXRoLmZsb29yKHBvaW50LngpXVtNYXRoLmZsb29yKHBvaW50LnkpXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3VwZGF0ZSBudW1iZXIgb2Ygb2NjdXBpZWQgY2VsbHMgaW4gcG9seW9taW5vXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RlcFdpZHRoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnN0ZXBIZWlnaHQ7IGorKykge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRbaV1bal0pIHRoaXMubnVtYmVyT2ZPY2N1cGlyZWRDZWxscysrO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3aWR0aCBvZiB0aGUgcG9seW9taW5vIGRpdmlkZWQgYnkgZ3JpZCBzdGVwc1xuICAgICAqL1xuICAgIGdldCBzdGVwV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aGlzLmdyaWRTdGVwKSArIDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGVpZ2h0IG9mIHRoZSBwb2x5b21pbm8gZGl2aWRlZCBieSBncmlkIHN0ZXBzXG4gICAgICovXG4gICAgZ2V0IHN0ZXBIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGhpcy5ncmlkU3RlcCkgKyAxO1xuICAgIH1cblxuICAgIGdldCB4MigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDEgKyB0aGlzLndpZHRoO1xuICAgIH1cblxuICAgIGdldCB5MigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueTEgKyB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBjZW50ZXIgcmVsYXRpdmUgdG8gbG9jYXRpb24gaW5zaWRlIHRoZSBncmlkXG4gICAgICovXG4gICAgZ2V0IGdyaWRTdGVwQ2VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jZW50ZXIuZGlmZih0aGlzLmxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBnZXRCb3VuZGluZ1JlY3RhbmdsZSgpIHtcbiAgICAgICAgY29uc3QgcG9seXgxID0gdGhpcy5sb2NhdGlvbi54IC0gdGhpcy5jZW50ZXIueDsgXG4gICAgICAgIGNvbnN0IHBvbHl5MSA9IHRoaXMubG9jYXRpb24ueSAtIHRoaXMuY2VudGVyLnk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCb3VuZGluZ1JlY3RhbmdsZShcbiAgICAgICAgICAgIHBvbHl4MSxcbiAgICAgICAgICAgIHBvbHl5MSxcbiAgICAgICAgICAgIC8vIC0xIGJlY2F1c2UgaWYgbGVuZ3RoID09IDEgdGhlbiB4MiA9PSB4MVxuICAgICAgICAgICAgcG9seXgxICsgdGhpcy5zdGVwV2lkdGggLSAxLFxuICAgICAgICAgICAgcG9seXkxICsgdGhpcy5zdGVwSGVpZ2h0IC0gMSBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb2ludCB7XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geCBcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSB5IFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG90aGVyIC0gdGhpcyBmb3IgeCBhbmQgeVxuICAgICAqIEBwYXJhbSB7IFBvaW50IH0gb3RoZXJcbiAgICAgKi9cbiAgICBkaWZmKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICBvdGhlci54IC0gdGhpcy54LFxuICAgICAgICAgICAgb3RoZXIueSAtIHRoaXMueVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJvdW5kaW5nUmVjdGFuZ2xlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSB4MVxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHkxXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geDJcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSB5MlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgICB0aGlzLnkxID0geTE7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9XG5cbiAgICBjZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICAodGhpcy54MiAtIHRoaXMueDEpIC8gMixcbiAgICAgICAgICAgICh0aGlzLnkyIC0gdGhpcy55MSkgLyAyXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBDZWxsIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyBib29sZWFuIH0gb2NjdXBpZWQgXG4gICAgICogQHBhcmFtIHsgYm9vbGVhbiB9IHZpc2l0ZWQgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2NjdXBpZWQsIHZpc2l0ZWQpIHtcbiAgICAgICAgdGhpcy5vY2N1cGllZCA9IG9jY3VwaWVkOyAvL2Jvb2xlYW4gdG8gZGV0ZXJtaW5lIGlmIHRoZSBjZWxsIGlzIG9jY3VwaWVkXG4gICAgICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7IC8vYm9vbGVhbiB0byBkZXRlcm1pbmUgaWYgdGhlIGNlbGwgd2FzIHZpc2l0ZWQgYmVmb3JlIHdoaWxlIHRyYXZlcnNpbmcgdGhlIGNlbGxzXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JpZCB7XG4gICAgLyoqIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHdpZHRoIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGhlaWdodCBcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBzdGVwIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHN0ZXApIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICAgICAgLy9jcmVhdGUgYW5kIGludGlhbGl6ZSB0aGUgZ3JpZFxuICAgICAgICB0aGlzLmdyaWQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLnN0ZXBXaWR0aCB9LFxuICAgICAgICAgICAgKChfKSA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLnN0ZXBIZWlnaHQgfSxcbiAgICAgICAgICAgICAgICAoKF8pID0+IG5ldyBDZWxsKGZhbHNlLCBmYWxzZSkpKSkpO1xuICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBQb2ludChNYXRoLmZsb29yKHRoaXMuc3RlcFdpZHRoIC8gMiksIE1hdGguZmxvb3IodGhpcy5zdGVwSGVpZ2h0IC8gMikpO1xuICAgICAgICB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlID0gbmV3IEJvdW5kaW5nUmVjdGFuZ2xlKFxuICAgICAgICAgICAgTnVtYmVyLk1BWF9WQUxVRSwgTnVtYmVyLk1BWF9WQUxVRSwgXG4gICAgICAgICAgICAtTnVtYmVyLk1BWF9WQUxVRSwgLU51bWJlci5NQVhfVkFMVUVcbiAgICAgICAgKTsgIC8vIHRoZSBib3VuZGluZyByZWN0YW5ibGUgb2YgdGhlIG9jY3VwaWVkIGNlbGxzIGluIHRoZSBncmlkXG4gICAgICAgIHRoaXMubnVtYmVyT2ZPY2N1cGlyZWRDZWxscyA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgd2lkdGggaW4gdGVybXMgb2YgZ3JpZCBzdGVwc1xuICAgICAqL1xuICAgIGdldCBzdGVwV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aGlzLnN0ZXApICsgMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSBoZWlnaHQgaW4gdGVybXMgb2YgZ3JpZCBzdGVwc1xuICAgICAqL1xuICAgIGdldCBzdGVwSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIHRoaXMuc3RlcCkgKyAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZ1bmN0aW9uIGdpdmVuIGEgbGlzdCBvZiBjZWxscyBpdCByZXR1cm5zIHRoZSBkaXJlY3QgdW52aXNpdGVkIHVub2NjdXBpZWQgbmVpZ2hib3JpbmcgY2VsbHMgXG4gICAgICovXG4gICAgZ2V0RGlyZWN0TmVpZ2hib3JzKGNlbGxzLCBsZXZlbCkge1xuICAgICAgICB2YXIgcmVzdWx0UG9pbnRzID0gW107XG4gICAgICAgIGlmIChjZWxscy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0ZXBXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnN0ZXBIZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkW2ldW2pdLm9jY3VwaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMgPSByZXN1bHRQb2ludHMuY29uY2F0KHRoaXMuZ2V0Q2VsbE5laWdoYm9ycyhpLCBqKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgZW5kSW5kZXggPSByZXN1bHRQb2ludHMubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPD0gbGV2ZWw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChlbmRJbmRleCA+PSBzdGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBzdGFydEluZGV4OyBqIDw9IGVuZEluZGV4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cyA9IHJlc3VsdFBvaW50cy5jb25jYXQodGhpcy5nZXRDZWxsTmVpZ2hib3JzKHJlc3VsdFBvaW50c1tqXS54LCByZXN1bHRQb2ludHNbal0ueSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBlbmRJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgZW5kSW5kZXggPSByZXN1bHRQb2ludHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMgPSByZXN1bHRQb2ludHMuY29uY2F0KHRoaXMuZ2V0Q2VsbE5laWdoYm9ycyhjZWxsLngsIGNlbGwueSkpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0UG9pbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdpdmVuIGEgY2VsbCBhdCBsb2NhdG9pbiBpLGogZ2V0IHRoZSB1bnZpc3RpZWQgdW5vY2N1cGllZCBuZWlnaGJvcmluZyBjZWxsXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaVxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGpcbiAgICAgKi9cbiAgICBnZXRDZWxsTmVpZ2hib3JzKGksIGopIHtcbiAgICAgICAgdmFyIHJlc3VsdFBvaW50cyA9IFtdO1xuICAgICAgICAvL2NoZWNrIGFsbCB0aGUgOCBzdXJyb3VuZGluZyBjZWxscyBcbiAgICAgICAgaWYgKGkgLSAxID49IDApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkW2kgLSAxXVtqXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgLSAxXVtqXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpIC0gMSwgeTogaiB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaSAtIDFdW2pdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpICsgMSA8IHRoaXMuc3RlcFdpZHRoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpICsgMV1bal0ub2NjdXBpZWQgJiYgIXRoaXMuZ3JpZFtpICsgMV1bal0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSArIDEsIHk6IGogfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2kgKyAxXVtqXS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaiAtIDEgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaV1baiAtIDFdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaV1baiAtIDFdLnZpc2l0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMucHVzaCh7IHg6IGksIHk6IGogLSAxIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpXVtqIC0gMV0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGogKyAxIDwgdGhpcy5zdGVwSGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpXVtqICsgMV0ub2NjdXBpZWQgJiYgIXRoaXMuZ3JpZFtpXVtqICsgMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSwgeTogaiArIDEgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2ldW2ogKyAxXS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSAtIDFdW2pdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaSAtIDFdW2pdLnZpc2l0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMucHVzaCh7IHg6IGkgLSAxLCB5OiBqIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpIC0gMV1bal0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgLSAxID49IDAgJiYgaiAtIDEgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSAtIDFdW2ogLSAxXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgLSAxXVtqIC0gMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSAtIDEsIHk6IGogLSAxIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpIC0gMV1baiAtIDFdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgKyAxIDwgdGhpcy5zdGVwV2lkdGggJiYgaiAtIDEgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSArIDFdW2ogLSAxXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgKyAxXVtqIC0gMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSArIDEsIHk6IGogLSAxIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpICsgMV1baiAtIDFdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgLSAxID49IDAgJiYgaiArIDEgPCB0aGlzLnN0ZXBIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkW2kgLSAxXVtqICsgMV0ub2NjdXBpZWQgJiYgIXRoaXMuZ3JpZFtpIC0gMV1baiArIDFdLnZpc2l0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMucHVzaCh7IHg6IGkgLSAxLCB5OiBqICsgMSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaSAtIDFdW2ogKyAxXS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSArIDEgPCB0aGlzLnN0ZXBXaWR0aCAmJiBqICsgMSA8IHRoaXMuc3RlcEhlaWdodCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSArIDFdW2ogKyAxXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgKyAxXVtqICsgMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSArIDEsIHk6IGogKyAxIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpICsgMV1baiArIDFdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFBvaW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhIGZ1bmN0aW9uIHRvIHBsYWNlIGEgZ2l2ZW4gcG9seW9taW5vIGluIHRoZSBjZWxsIGkgaiBvbiB0aGUgZ3JpZFxuICAgICAqIEBwYXJhbSB7IFBvbHlvbWlubyB9IHBvbHlvbWlubyBcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBpIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGogXG4gICAgICovXG4gICAgcGxhY2VQb2x5b21pbm8ocG9seW9taW5vLCBpLCBqKSB7XG4gICAgICAgIHBvbHlvbWluby5sb2NhdGlvbi54ID0gaTtcbiAgICAgICAgcG9seW9taW5vLmxvY2F0aW9uLnkgPSBqO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHBvbHlvbWluby5zdGVwV2lkdGg7IGsrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCBwb2x5b21pbm8uc3RlcEhlaWdodDsgbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvbHlvbWluby5ncmlkW2tdW2xdKSB7IC8vaWYgW2tdIFtsXSBjZWxsIGlzIG9jY3VwaWVkIGluIHBvbHlvbWlub1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbayAtIHBvbHlvbWluby5jZW50ZXIueCArIGldW2wgLSBwb2x5b21pbm8uY2VudGVyLnkgKyBqXS5vY2N1cGllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgbnVtYmVyIG9mIG9jY3VwaXJlZCBjZWxsc1xuICAgICAgICB0aGlzLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMgKz0gcG9seW9taW5vLm51bWJlck9mT2NjdXBpcmVkQ2VsbHM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUJvdW5kcyhwb2x5b21pbm8pO1xuICAgICAgICBcbiAgICAgICAgLy8gcmVzZXQgdmlzaXRlZCBjZWxscyB0byBub25lXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zdGVwV2lkdGg7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnN0ZXBIZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVt5XS52aXNpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHN0ZXAgcmVjdGFuZ2xlIGJvdW5kcyBzbyB0aGF0IHRoZSBgcG9seW9taW5vYCBmaXRzXG4gICAgICogQHBhcmFtIHsgUG9seW9taW5vIH0gcG9seW9taW5vXG4gICAgICovXG4gICAgdXBkYXRlQm91bmRzKHBvbHlvbWlubykge1xuICAgICAgICBsZXQgcG9seVJlY3QgPSBwb2x5b21pbm8uZ2V0Qm91bmRpbmdSZWN0YW5nbGUoKTtcblxuICAgICAgICB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngxID0gTWF0aC5taW4odGhpcy5vY2N1cGllZFJlY3RhbmdsZS54MSwgcG9seVJlY3QueDEpO1xuICAgICAgICB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngyID0gTWF0aC5tYXgodGhpcy5vY2N1cGllZFJlY3RhbmdsZS54MiwgcG9seVJlY3QueDIpO1xuICAgICAgICB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkxID0gTWF0aC5taW4odGhpcy5vY2N1cGllZFJlY3RhbmdsZS55MSwgcG9seVJlY3QueTEpO1xuICAgICAgICB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkyID0gTWF0aC5tYXgodGhpcy5vY2N1cGllZFJlY3RhbmdsZS55MiwgcG9seVJlY3QueTIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGEgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGEgcG9seW9taW5vIGNhbiBiZSBwbGFjZWQgb24gdGhlIGdpdmVuIGNlbGwgaSxqXG4gICAgICogQHBhcmFtIHsgUG9seW9taW5vIH0gcG9seW9taW5vIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGkgXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaiBcbiAgICAgKi9cbiAgICB0cnlQbGFjaW5nUG9seW9taW5vKHBvbHlvbWlubywgaSwgaikge1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBvbHlvbWluby5zdGVwV2lkdGg7IGsrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBwb2x5b21pbm8uc3RlcEhlaWdodDsgbCsrKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gZmFsc2UgaWYgcG9seW9taW5vIGdvZXMgb3V0c2lkZSB0aGUgZ3JpZCB3aGVuIHBsYWNlZCBvbiBpLGpcbiAgICAgICAgICAgICAgICBpZiAoayAtIHBvbHlvbWluby5jZW50ZXIueCArIGkgPj0gdGhpcy5zdGVwV2lkdGggfHwgayAtIHBvbHlvbWluby5jZW50ZXIueCArIGkgPCAwIHx8IGwgLSBwb2x5b21pbm8uY2VudGVyLnkgKyBqID49IHRoaXMuc3RlcEhlaWdodCB8fCBsIC0gcG9seW9taW5vLmNlbnRlci55ICsgaiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3JldHVybiBmYWxzZSBpZiB0aGUgIHBvbHltaW5vIGNlbGwgYW5kIHRoZSBjb3Jyb3Nwb25kaW5nIG1haW4gZ3JpZCBjZWxsIGFyZSBib3RoIG9jY3VwaWVkXG4gICAgICAgICAgICAgICAgaWYgKHBvbHlvbWluby5ncmlkW2tdW2xdICYmIHRoaXMuZ3JpZFtrIC0gcG9seW9taW5vLmNlbnRlci54ICsgaV1bbCAtIHBvbHlvbWluby5jZW50ZXIueSArIGpdLm9jY3VwaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsY3VsYXRlcyB0aGUgdmFsdWUgb2YgdGhlIHV0aWxpdHkgKGFzcGVjdCByYXRpbykgb2YgcGxhY2luZyBhIHBvbHlvbWlubyBvbiBjZWxsIGksalxuICAgICAqIEBwYXJhbSB7IFBvbHlvbWlubyB9IHBvbHlvbWlub1xuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGlcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBqXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gZGVzaXJlZEFzcGVjdFJhdGlvXG4gICAgICovXG4gICAgY2FsY3VsYXRlVXRpbGl0eU9mUGxhY2luZyhwb2x5b21pbm8sIGksIGosIGRlc2lyZWRBc3BlY3RSYXRpbykge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBhY3R1YWxBc3BlY3RSYXRpbyA9IDE7XG4gICAgICAgIHZhciBmdWxsbmVzcyA9IDE7XG4gICAgICAgIHZhciBhZGp1c3RlZEZ1bGxuZXNzID0gMTtcbiAgICAgICAgdmFyIHgxID0gdGhpcy5vY2N1cGllZFJlY3RhbmdsZS54MTtcbiAgICAgICAgdmFyIHgyID0gdGhpcy5vY2N1cGllZFJlY3RhbmdsZS54MjtcbiAgICAgICAgdmFyIHkxID0gdGhpcy5vY2N1cGllZFJlY3RhbmdsZS55MTtcbiAgICAgICAgdmFyIHkyID0gdGhpcy5vY2N1cGllZFJlY3RhbmdsZS55MjtcbiAgICAgICAgaWYgKGkgLSBwb2x5b21pbm8uY2VudGVyLnggPCB4MSkgeDEgPSBpIC0gcG9seW9taW5vLmNlbnRlci54O1xuICAgICAgICBpZiAoaiAtIHBvbHlvbWluby5jZW50ZXIueSA8IHkxKSB5MSA9IGogLSBwb2x5b21pbm8uY2VudGVyLnk7XG4gICAgICAgIGlmIChwb2x5b21pbm8uc3RlcFdpZHRoIC0gMSAtIHBvbHlvbWluby5jZW50ZXIueCArIGkgPiB4MikgeDIgPSBwb2x5b21pbm8uc3RlcFdpZHRoIC0gMSAtIHBvbHlvbWluby5jZW50ZXIueCArIGk7XG4gICAgICAgIGlmIChwb2x5b21pbm8uc3RlcEhlaWdodCAtIDEgLSBwb2x5b21pbm8uY2VudGVyLnkgKyBqID4geTIpIHkyID0gcG9seW9taW5vLnN0ZXBIZWlnaHQgLSAxIC0gcG9seW9taW5vLmNlbnRlci55ICsgajtcbiAgICAgICAgdmFyIHdpZHRoID0geDIgLSB4MSArIDE7XG4gICAgICAgIHZhciBoZWlnaHQgPSB5MiAtIHkxICsgMTtcbiAgICAgICAgYWN0dWFsQXNwZWN0UmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgZnVsbG5lc3MgPSAodGhpcy5udW1iZXJPZk9jY3VwaXJlZENlbGxzICsgcG9seW9taW5vLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMpIC8gKHdpZHRoICogaGVpZ2h0KTtcblxuICAgICAgICBpZiAoYWN0dWFsQXNwZWN0UmF0aW8gPiBkZXNpcmVkQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIGFkanVzdGVkRnVsbG5lc3MgPSAodGhpcy5udW1iZXJPZk9jY3VwaXJlZENlbGxzICsgcG9seW9taW5vLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMpIC8gKHdpZHRoICogKHdpZHRoIC8gZGVzaXJlZEFzcGVjdFJhdGlvKSk7XG4gICAgICAgICAgICAvLyBoZWlnaHQgPSB3aWR0aCAvIGRlc2lyZWRBc3BlY3RSYXRpbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkanVzdGVkRnVsbG5lc3MgPSAodGhpcy5udW1iZXJPZk9jY3VwaXJlZENlbGxzICsgcG9seW9taW5vLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMpIC8gKChoZWlnaHQgKiBkZXNpcmVkQXNwZWN0UmF0aW8pICogaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIHdpZHRoID0gaGVpZ2h0ICogZGVzaXJlZEFzcGVjdFJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LmFjdHVhbEFzcGVjdFJhdGlvID0gYWN0dWFsQXNwZWN0UmF0aW87XG4gICAgICAgIHJlc3VsdC5mdWxsbmVzcyA9IGZ1bGxuZXNzO1xuICAgICAgICByZXN1bHQuYWRqdXN0ZWRGdWxsbmVzcyA9IGFkanVzdGVkRnVsbG5lc3M7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvcG9seW9taW5vLXBhY2tpbmcuanMiLCJpbXBvcnQgeyBwYWNrIH0gZnJvbSBcIi4vcGFja2luZ1wiO1xuXG4vKipcbiAqIEBwYXJhbSB7ICogfSBjeSBcbiAqIEBwYXJhbSB7IGltcG9ydCgnLi90eXBlZGVmJykuT3B0aW9ucyB9IG9wdGlvbnMgXG4gKi9cbnZhciBsYXlvdXRVdGlsaXRpZXMgPSBmdW5jdGlvbiAoY3ksIG9wdGlvbnMpIHtcblxuICAvKiAgdmFyIGRlZmF1bHRzID0ge1xuICAgICBpZGVhbEVkZ2VMZW5ndGggOiA1MCxcbiAgICAgb2Zmc2V0IDogMjAsXG4gICAgIGRlc2lyZWRBc3BlY3RSYXRpbyA6IDEsXG4gICAgIHBvbHlvbWlub0dyaWRTaXplRmFjdG9yIDogMSxcbiAgICAgdXRpbGl0eUZ1bmN0aW9uIDogMVxuICAgfTtcbiBcbiAgIGZ1bmN0aW9uIGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICB2YXIgb2JqID0ge307XG4gXG4gICAgIGZvciAodmFyIGkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICBvYmpbaV0gPSBkZWZhdWx0c1tpXTtcbiAgICAgfVxuIFxuICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHsgICAgICBcbiAgICAgICBvYmpbaV0gPSBvcHRpb25zW2ldO1xuICAgICB9XG4gXG4gICAgIHJldHVybiBvYmo7XG4gICB9O1xuIFxuICAgb3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7ICovXG4gIHZhciBpbnN0YW5jZSA9IHt9O1xuXG4gIFxuICBpbnN0YW5jZS5wbGFjZUhpZGRlbk5vZGVzID0gZnVuY3Rpb24gKG1haW5FbGVzKSB7XG4gICAgbWFpbkVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWFpbkVsZSkge1xuICAgICAgdmFyIGhpZGRlbkVsZXMgPSBtYWluRWxlLm5laWdoYm9yaG9vZCgpLm5vZGVzKFwiOmhpZGRlblwiKTtcbiAgICAgIGhpZGRlbkVsZXMuZm9yRWFjaChmdW5jdGlvbiAoaGlkZGVuRWxlKSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBoaWRkZW5FbGUubmVpZ2hib3Job29kKCkubm9kZXMoXCI6dmlzaWJsZVwiKTtcbiAgICAgICAgaWYgKG5laWdoYm9ycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZVdpdGhNdWx0aXBsZU5laWdoYm9ycyhoaWRkZW5FbGUpO1xuICAgICAgICB9IGVsc2UgaW5zdGFuY2Uubm9kZVdpdGhPbmVOZWlnaGJvcihtYWluRWxlLCBoaWRkZW5FbGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaW5zdGFuY2UucGxhY2VOZXdOb2RlcyA9IGZ1bmN0aW9uIChlbGVzKSB7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB0aGlzLmZpbmRDb21wb25lbnRzKGVsZXMpO1xuICAgIHZhciBkaXNjb25uZWN0ZWRDb21wID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb25lTmVpZyA9IGZhbHNlO1xuICAgICAgdmFyIG11bHROZWlnID0gZmFsc2U7XG4gICAgICB2YXIgbWFpbkVsZTtcbiAgICAgIHZhciBtdWx0bmVpZ2hib3JzID0gW107XG4gICAgICB2YXIgcG9zaXRpb25lZCA9IFtdO1xuICAgICAgdmFyIHggPSAwO1xuICAgICAgdmFyIHkgPSAwO1xuICAgICAgdmFyIGlzUG9zaXRpb25lZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb21wb25lbnRzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBjb21wb25lbnRzW2ldW2pdLm5laWdoYm9yaG9vZCgpLm5vZGVzKCkuZGlmZmVyZW5jZShlbGVzKTtcbiAgICAgICAgcG9zaXRpb25lZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgaWYgKG5laWdoYm9ycy5sZW5ndGggPiAxICYmICFpc1Bvc2l0aW9uZWQpIHtcbiAgICAgICAgICBtdWx0TmVpZyA9IHRydWU7XG4gICAgICAgICAgcG9zaXRpb25lZFtqXSA9IHRydWU7XG4gICAgICAgICAgbXVsdG5laWdoYm9ycyA9IG5laWdoYm9ycztcbiAgICAgICAgICBpbnN0YW5jZS5ub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzKGNvbXBvbmVudHNbaV1bal0sIG11bHRuZWlnaGJvcnMpO1xuICAgICAgICAgIHggPSBjb21wb25lbnRzW2ldW2pdLnBvc2l0aW9uKFwieFwiKTtcbiAgICAgICAgICB5ID0gY29tcG9uZW50c1tpXVtqXS5wb3NpdGlvbihcInlcIik7XG4gICAgICAgICAgaXNQb3NpdGlvbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZWlnaGJvcnMubGVuZ3RoID09IDEgJiYgIWlzUG9zaXRpb25lZCkge1xuICAgICAgICAgIG9uZU5laWcgPSB0cnVlO1xuICAgICAgICAgIG1haW5FbGUgPSBuZWlnaGJvcnNbMF07XG4gICAgICAgICAgcG9zaXRpb25lZFtqXSA9IHRydWU7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZVdpdGhPbmVOZWlnaGJvcihtYWluRWxlLCBjb21wb25lbnRzW2ldW2pdKTtcbiAgICAgICAgICB4ID0gY29tcG9uZW50c1tpXVtqXS5wb3NpdGlvbihcInhcIik7XG4gICAgICAgICAgeSA9IGNvbXBvbmVudHNbaV1bal0ucG9zaXRpb24oXCJ5XCIpO1xuICAgICAgICAgIGlzUG9zaXRpb25lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9uZU5laWcgfHwgbXVsdE5laWcpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb21wb25lbnRzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uZWRbal0gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvcnMgPSBjb21wb25lbnRzW2ldW2pdLm5laWdoYm9yaG9vZCgpLm5vZGVzKCk7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb25lZE5laWdib3JzID0gW107XG4gICAgICAgICAgICB2YXIgY3VyciA9IGNvbXBvbmVudHNbaV1bal0ubmVpZ2hib3Job29kKCkubm9kZXMoKS5kaWZmZXJlbmNlKGVsZXMpO1xuICAgICAgICAgICAgY3Vyci5mb3JFYWNoKGZ1bmN0aW9uIChlbGUpIHtcbiAgICAgICAgICAgICAgcG9zaXRpb25lZE5laWdib3JzLnB1c2goZWxlKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbmVpZ2hib3JzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgIGlmIChwb3NpdGlvbmVkW2NvbXBvbmVudHNbaV0uaW5kZXhPZihuZWlnaGJvcnNba10pXSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uZWROZWlnYm9ycy5wdXNoKG5laWdoYm9yc1trXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3NpdGlvbmVkTmVpZ2JvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBpbnN0YW5jZS5ub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzKGNvbXBvbmVudHNbaV1bal0sIHBvc2l0aW9uZWROZWlnYm9ycyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uZWROZWlnYm9ycy5sZW5ndGggPT0gMSkgaW5zdGFuY2Uubm9kZVdpdGhPbmVOZWlnaGJvcihwb3NpdGlvbmVkTmVpZ2JvcnNbMF0sIGNvbXBvbmVudHNbaV1bal0pO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBob3Jpem9udGFsUCA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKG9wdGlvbnMub2Zmc2V0LCBvcHRpb25zLm9mZnNldCAqIDIsIDApO1xuICAgICAgICAgICAgICB2YXIgdmVydGljYWxQID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20ob3B0aW9ucy5vZmZzZXQsIG9wdGlvbnMub2Zmc2V0ICogMiwgMCk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudHNbaV1bal0ucG9zaXRpb24oXCJ4XCIsIHggKyBob3Jpem9udGFsUCk7XG4gICAgICAgICAgICAgIGNvbXBvbmVudHNbaV1bal0ucG9zaXRpb24oXCJ5XCIsIHkgKyB2ZXJ0aWNhbFApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zaXRpb25lZFtqXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGlzY29ubmVjdGVkQ29tcC5wdXNoKGNvbXBvbmVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXNjb25uZWN0ZWRDb21wLmxlbmd0aCA+PSAxKSB7XG4gICAgICBpbnN0YW5jZS5kaXNjb25uZWN0ZWROb2RlcyhkaXNjb25uZWN0ZWRDb21wKTtcbiAgICB9XG4gIH07XG5cbiAgaW5zdGFuY2UuZGlzY29ubmVjdGVkTm9kZXMgPSBmdW5jdGlvbiAoY29tcG9uZW50cykge1xuICAgIHZhciBsZWZ0WCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIHJpZ2h0WCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHZhciB0b3BZID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgYm90dG9tWSA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuICAgIC8vIENoZWNrIHRoZSB4IGFuZCB5IGxpbWl0cyBvZiBhbGwgaGlkZGVuIGVsZW1lbnRzIGFuZCBzdG9yZSB0aGVtIGluIHRoZSB2YXJpYWJsZXMgYWJvdmVcbiAgICBjeS5ub2RlcygnOnZpc2libGUnKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgaGFsZldpZHRoID0gbm9kZS5vdXRlcldpZHRoKCkgLyAyO1xuICAgICAgdmFyIGhhbGZIZWlnaHQgPSBub2RlLm91dGVySGVpZ2h0KCkgLyAyO1xuICAgICAgaWYgKG5vZGUucG9zaXRpb24oXCJ4XCIpIC0gaGFsZldpZHRoIDwgbGVmdFgpXG4gICAgICAgIGxlZnRYID0gbm9kZS5wb3NpdGlvbihcInhcIikgLSBoYWxmV2lkdGg7XG4gICAgICBpZiAobm9kZS5wb3NpdGlvbihcInhcIikgKyBoYWxmV2lkdGggPiByaWdodFgpXG4gICAgICAgIHJpZ2h0WCA9IG5vZGUucG9zaXRpb24oXCJ4XCIpICsgaGFsZldpZHRoO1xuICAgICAgaWYgKG5vZGUucG9zaXRpb24oXCJ5XCIpIC0gaGFsZkhlaWdodCA8IHRvcFkpXG4gICAgICAgIHRvcFkgPSBub2RlLnBvc2l0aW9uKFwieVwiKSAtIGhhbGZIZWlnaHQ7XG4gICAgICBpZiAobm9kZS5wb3NpdGlvbihcInlcIikgKyBoYWxmSGVpZ2h0ID4gYm90dG9tWSlcbiAgICAgICAgYm90dG9tWSA9IG5vZGUucG9zaXRpb24oXCJ5XCIpICsgaGFsZkhlaWdodDtcbiAgICB9KTtcblxuICAgIHZhciByYWRpdXN5ID0gdG9wWSAtIGJvdHRvbVk7XG4gICAgdmFyIHJhZGl1c3ggPSByaWdodFggLSBsZWZ0WDtcbiAgICB2YXIgaW5uZXJSYWRpdXMgPSAoTWF0aC5zcXJ0KHJhZGl1c3ggKiByYWRpdXN4ICsgcmFkaXVzeSAqIHJhZGl1c3kpKSAvIDI7XG4gICAgdmFyIGNlbnRlclggPSAobGVmdFggKyByaWdodFgpIC8gMjtcbiAgICB2YXIgY2VudGVyWSA9ICh0b3BZICsgYm90dG9tWSkgLyAyO1xuICAgIC8vdmFyIGNvbXBvbmVudHMgPSB0aGlzLmZpbmRDb21wb25lbnRzKG5ld0VsZXMpO1xuICAgIHZhciBudW1PZkNvbXBvbmVudHMgPSBjb21wb25lbnRzLmxlbmd0aDtcbiAgICB2YXIgYW5nbGUgPSAzNjAgLyBudW1PZkNvbXBvbmVudHM7XG4gICAgdmFyIGNvdW50ID0gMTtcblxuICAgIGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cbiAgICAgIHZhciBkaXN0RnJvbUNlbnRlciA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKGlubmVyUmFkaXVzICsgb3B0aW9ucy5vZmZzZXQgKiA2LCBpbm5lclJhZGl1cyArIG9wdGlvbnMub2Zmc2V0ICogOCwgMSk7XG4gICAgICB2YXIgY3VyQW5nbGUgPSBhbmdsZSAqIGNvdW50O1xuICAgICAgdmFyIGFuZ2xlSW5SYWRpYW5zID0gY3VyQW5nbGUgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgdmFyIHggPSBjZW50ZXJYICsgZGlzdEZyb21DZW50ZXIgKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XG4gICAgICB2YXIgeSA9IGNlbnRlclkgKyBkaXN0RnJvbUNlbnRlciAqIE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5sZW5ndGggPT0gMSkge1xuICAgICAgICBjb21wb25lbnRbMF0ucG9zaXRpb24oXCJ4XCIsIHgpO1xuICAgICAgICBjb21wb25lbnRbMF0ucG9zaXRpb24oXCJ5XCIsIHkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBwb3NpdGlvbmVkID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcG9zaXRpb25lZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uZWRbMF0gPSB0cnVlO1xuICAgICAgICBjb21wb25lbnRbMF0ucG9zaXRpb24oXCJ4XCIsIHgpO1xuICAgICAgICBjb21wb25lbnRbMF0ucG9zaXRpb24oXCJ5XCIsIHkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY29tcG9uZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5laWdoYm9ycyA9IGNvbXBvbmVudFtpXS5uZWlnaGJvcmhvb2QoKS5ub2RlcygpO1xuICAgICAgICAgIHZhciBwb3NpdGlvbmVkTmVpZ2JvcnMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5laWdoYm9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uZWRbY29tcG9uZW50LmluZGV4T2YobmVpZ2hib3JzW2pdKV0pIHtcbiAgICAgICAgICAgICAgcG9zaXRpb25lZE5laWdib3JzLnB1c2gobmVpZ2hib3JzW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBvc2l0aW9uZWROZWlnYm9ycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5ub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzKGNvbXBvbmVudFtpXSwgcG9zaXRpb25lZE5laWdib3JzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uZWROZWlnYm9ycy5sZW5ndGggPT0gMSkgaW5zdGFuY2Uubm9kZVdpdGhPbmVOZWlnaGJvcihwb3NpdGlvbmVkTmVpZ2JvcnNbMF0sIGNvbXBvbmVudFtpXSk7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgaG9yaXpvbnRhbFAgPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbShvcHRpb25zLm9mZnNldCwgb3B0aW9ucy5vZmZzZXQgKiAyLCAwKTtcbiAgICAgICAgICAgIHZhciB2ZXJ0aWNhbFAgPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbShvcHRpb25zLm9mZnNldCwgb3B0aW9ucy5vZmZzZXQgKiAyLCAwKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFtpXS5wb3NpdGlvbihcInhcIiwgeCArIGhvcml6b250YWxQKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFtpXS5wb3NpdGlvbihcInlcIiwgeSArIHZlcnRpY2FsUCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uZWRbaV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH0pO1xuICB9O1xuXG4gIGluc3RhbmNlLmZpbmRDb21wb25lbnRzID0gZnVuY3Rpb24gKG5ld0VsZXMpIHtcblxuICAgIHZhciBhZGpMaXN0QXJyYXkgPSBbXTtcbiAgICB2YXIgY3VycmVudCA9IGN5Lm5vZGVzKCkuZGlmZmVyZW5jZShuZXdFbGVzKTtcbiAgICBuZXdFbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZSkge1xuICAgICAgdmFyIG5laWdoYm9ycyA9IGVsZS5uZWlnaGJvcmhvb2QoKS5ub2RlcygpLmRpZmZlcmVuY2UoY3VycmVudCk7XG4gICAgICB2YXIgbGlzdE9mSW5kZXhlcyA9IFtdO1xuICAgICAgbmVpZ2hib3JzLmZvckVhY2goZnVuY3Rpb24gKG5laWdib3IpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbmV3RWxlcy5pbmRleE9mKG5laWdib3IpO1xuICAgICAgICBsaXN0T2ZJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfSk7XG4gICAgICBhZGpMaXN0QXJyYXkucHVzaChsaXN0T2ZJbmRleGVzKTtcbiAgICB9KTtcblxuICAgIC8vIE1hcmsgYWxsIHRoZSB2ZXJ0aWNlcyBhcyBub3QgdmlzaXRlZCBcbiAgICB2YXIgdmlzaXRlZCA9IFtdO1xuICAgIGZvciAodmFyIHYgPSAwOyB2IDwgbmV3RWxlcy5sZW5ndGg7IHYrKykge1xuICAgICAgdmlzaXRlZC5wdXNoKGZhbHNlKTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdE9mQ29tcG9uZW50cyA9IFtdO1xuXG5cbiAgICBmb3IgKHZhciB2ID0gMDsgdiA8IG5ld0VsZXMubGVuZ3RoOyB2KyspIHtcbiAgICAgIHZhciBlbGVzT2ZDb21wb25lbnQgPSBbXTtcbiAgICAgIGlmICh2aXNpdGVkW3ZdID09IGZhbHNlKSB7XG4gICAgICAgIC8vIHByaW50IGFsbCByZWFjaGFibGUgdmVydGljZXMgXG4gICAgICAgIC8vIGZyb20gdiBcbiAgICAgICAgdGhpcy5ERlNVdGlsKHYsIHZpc2l0ZWQsIGFkakxpc3RBcnJheSwgbmV3RWxlcywgZWxlc09mQ29tcG9uZW50KTtcbiAgICAgICAgbGlzdE9mQ29tcG9uZW50cy5wdXNoKGVsZXNPZkNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RPZkNvbXBvbmVudHM7XG4gIH07XG5cbiAgaW5zdGFuY2UuREZTVXRpbCA9IGZ1bmN0aW9uICh2LCB2aXNpdGVkLCBhZGpMaXN0QXJyYXksIG5ld0VsZXMsIGVsZXNPZkNvbXBvbmVudCkge1xuICAgIC8vIE1hcmsgdGhlIGN1cnJlbnQgbm9kZSBhcyB2aXNpdGVkIGFuZCBwcmludCBpdCBcbiAgICB2aXNpdGVkW3ZdID0gdHJ1ZTtcbiAgICBlbGVzT2ZDb21wb25lbnQucHVzaChuZXdFbGVzW3ZdKTtcbiAgICAvLyBSZWN1ciBmb3IgYWxsIHRoZSB2ZXJ0aWNlcyBcbiAgICAvLyBhZGphY2VudCB0byB0aGlzIHZlcnRleCBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkakxpc3RBcnJheVt2XS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF2aXNpdGVkW2Fkakxpc3RBcnJheVt2XVtpXV0pIHRoaXMuREZTVXRpbChhZGpMaXN0QXJyYXlbdl1baV0sIHZpc2l0ZWQsIGFkakxpc3RBcnJheSwgbmV3RWxlcywgZWxlc09mQ29tcG9uZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaW5zdGFuY2Uubm9kZVdpdGhPbmVOZWlnaGJvciA9IGZ1bmN0aW9uIChtYWluRWxlLCBoaWRkZW5FbGUpIHtcbiAgICB2YXIgcXVhZHJhbnRzID0gaW5zdGFuY2UuY2hlY2tPY2N1cGllZFF1YWRyYW50cyhtYWluRWxlLCBoaWRkZW5FbGUpO1xuICAgIHZhciBmcmVlUXVhZHJhbnRzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gcXVhZHJhbnRzKSB7XG4gICAgICBpZiAocXVhZHJhbnRzW3Byb3BlcnR5XSA9PT0gXCJmcmVlXCIpXG4gICAgICAgIGZyZWVRdWFkcmFudHMucHVzaChwcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vQ2FuIHRha2UgdmFsdWVzIDEgYW5kIC0xIGFuZCBhcmUgdXNlZCB0byBwbGFjZSB0aGUgaGlkZGVuIG5vZGVzIGluIHRoZSByYW5kb20gcXVhZHJhbnRcbiAgICB2YXIgaG9yaXpvbnRhbE11bHQ7XG4gICAgdmFyIHZlcnRpY2FsTXVsdDtcbiAgICBpZiAoZnJlZVF1YWRyYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoZnJlZVF1YWRyYW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgaWYgKGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ2ZpcnN0JykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnc2Vjb25kJykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygndGhpcmQnKSkge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gLTE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnZmlyc3QnKSAmJiBmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdzZWNvbmQnKSAmJiBmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdmb3VydGgnKSkge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdmaXJzdCcpICYmIGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ3RoaXJkJykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnZm91cnRoJykpIHtcbiAgICAgICAgICBob3Jpem9udGFsTXVsdCA9IDE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdzZWNvbmQnKSAmJiBmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCd0aGlyZCcpICYmIGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ2ZvdXJ0aCcpKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAtMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy9SYW5kb21seSBwaWNrcyBvbmUgcXVhZHJhbnQgZnJvbSB0aGUgZnJlZSBxdWFkcmFudHNcbiAgICAgICAgdmFyIHJhbmRvbVF1YWRyYW50ID0gZnJlZVF1YWRyYW50c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmcmVlUXVhZHJhbnRzLmxlbmd0aCldO1xuXG4gICAgICAgIGlmIChyYW5kb21RdWFkcmFudCA9PT0gXCJmaXJzdFwiKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAxO1xuICAgICAgICAgIHZlcnRpY2FsTXVsdCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJhbmRvbVF1YWRyYW50ID09PSBcInNlY29uZFwiKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAtMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYW5kb21RdWFkcmFudCA9PT0gXCJ0aGlyZFwiKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAtMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJhbmRvbVF1YWRyYW50ID09PSBcImZvdXJ0aFwiKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAxO1xuICAgICAgICAgIHZlcnRpY2FsTXVsdCA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBob3Jpem9udGFsTXVsdCA9IDA7XG4gICAgICB2ZXJ0aWNhbE11bHQgPSAwO1xuICAgIH1cbiAgICAvL0NoYW5nZSB0aGUgcG9zaXRpb24gb2YgaGlkZGVuIGVsZW1lbnRzXG5cbiAgICB2YXIgaG9yaXpvbnRhbFBhcmFtID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20ob3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGggLSBvcHRpb25zLm9mZnNldCwgb3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGggKyBvcHRpb25zLm9mZnNldCwgaG9yaXpvbnRhbE11bHQpO1xuICAgIHZhciB2ZXJ0aWNhbFBhcmFtID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20ob3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGggLSBvcHRpb25zLm9mZnNldCwgb3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGggKyBvcHRpb25zLm9mZnNldCwgdmVydGljYWxNdWx0KTtcbiAgICB2YXIgbmV3Q2VudGVyWCA9IG1haW5FbGUucG9zaXRpb24oXCJ4XCIpICsgaG9yaXpvbnRhbFBhcmFtO1xuICAgIHZhciBuZXdDZW50ZXJZID0gbWFpbkVsZS5wb3NpdGlvbihcInlcIikgKyB2ZXJ0aWNhbFBhcmFtO1xuICAgIGhpZGRlbkVsZS5wb3NpdGlvbihcInhcIiwgbmV3Q2VudGVyWCk7XG4gICAgaGlkZGVuRWxlLnBvc2l0aW9uKFwieVwiLCBuZXdDZW50ZXJZKTtcbiAgfTtcblxuICBpbnN0YW5jZS5ub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzID0gZnVuY3Rpb24gKGVsZSwgbmVpZ2hib3JzKSB7XG4gICAgaWYgKG5laWdoYm9ycyA9PSBudWxsKSB7XG4gICAgICB2YXIgbmVpZ2hib3JzID0gZWxlLm5laWdoYm9yaG9vZCgpLm5vZGVzKFwiOnZpc2libGVcIik7XG4gICAgfVxuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgeSA9IDA7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICBuZWlnaGJvcnMuZm9yRWFjaChmdW5jdGlvbiAoZWxlMSkge1xuICAgICAgeCArPSBlbGUxLnBvc2l0aW9uKFwieFwiKTtcbiAgICAgIHkgKz0gZWxlMS5wb3NpdGlvbihcInlcIik7XG4gICAgICBjb3VudCsrO1xuICAgIH0pO1xuICAgIHggPSB4IC8gY291bnQ7XG4gICAgeSA9IHkgLyBjb3VudDtcbiAgICB2YXIgZGlmZnggPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbSgwLCBvcHRpb25zLm9mZnNldCAvIDIsIDApO1xuICAgIHZhciBkaWZmeSA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKDAsIG9wdGlvbnMub2Zmc2V0IC8gMiwgMCk7XG4gICAgZWxlLnBvc2l0aW9uKFwieFwiLCB4ICsgZGlmZngpO1xuICAgIGVsZS5wb3NpdGlvbihcInlcIiwgeSArIGRpZmZ5KTtcbiAgfTtcblxuICBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbSA9IGZ1bmN0aW9uIChtaW4sIG1heCwgbXVsdCkge1xuICAgIHZhciB2YWwgPSBbLTEsIDFdO1xuICAgIGlmIChtdWx0ID09PSAwKVxuICAgICAgbXVsdCA9IHZhbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwubGVuZ3RoKV07XG4gICAgcmV0dXJuIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluKSAqIG11bHQ7XG4gIH07XG5cbiAgaW5zdGFuY2UuY2hlY2tPY2N1cGllZFF1YWRyYW50cyA9IGZ1bmN0aW9uIChtYWluRWxlLCBoaWRkZW5FbGVzKSB7XG4gICAgdmFyIHZpc2libGVFbGVzID0gbWFpbkVsZS5uZWlnaGJvcmhvb2QoKS5kaWZmZXJlbmNlKGhpZGRlbkVsZXMpLm5vZGVzKCk7XG4gICAgdmFyIG9jY3VwaWVkUXVhZHJhbnRzID0geyBmaXJzdDogXCJmcmVlXCIsIHNlY29uZDogXCJmcmVlXCIsIHRoaXJkOiBcImZyZWVcIiwgZm91cnRoOiBcImZyZWVcIiB9O1xuXG4gICAgdmlzaWJsZUVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlKSB7XG4gICAgICBpZiAoZWxlLmRhdGEoJ2NsYXNzJykgIT0gJ2NvbXBhcnRtZW50JyAmJiBlbGUuZGF0YSgnY2xhc3MnKSAhPSAnY29tcGxleCcpIHtcbiAgICAgICAgaWYgKGVsZS5wb3NpdGlvbihcInhcIikgPCBtYWluRWxlLnBvc2l0aW9uKFwieFwiKSAmJiBlbGUucG9zaXRpb24oXCJ5XCIpIDwgbWFpbkVsZS5wb3NpdGlvbihcInlcIikpXG4gICAgICAgICAgb2NjdXBpZWRRdWFkcmFudHMuc2Vjb25kID0gXCJvY2N1cGllZFwiO1xuICAgICAgICBlbHNlIGlmIChlbGUucG9zaXRpb24oXCJ4XCIpID4gbWFpbkVsZS5wb3NpdGlvbihcInhcIikgJiYgZWxlLnBvc2l0aW9uKFwieVwiKSA8IG1haW5FbGUucG9zaXRpb24oXCJ5XCIpKVxuICAgICAgICAgIG9jY3VwaWVkUXVhZHJhbnRzLmZpcnN0ID0gXCJvY2N1cGllZFwiO1xuICAgICAgICBlbHNlIGlmIChlbGUucG9zaXRpb24oXCJ4XCIpIDwgbWFpbkVsZS5wb3NpdGlvbihcInhcIikgJiYgZWxlLnBvc2l0aW9uKFwieVwiKSA+IG1haW5FbGUucG9zaXRpb24oXCJ5XCIpKVxuICAgICAgICAgIG9jY3VwaWVkUXVhZHJhbnRzLnRoaXJkID0gXCJvY2N1cGllZFwiO1xuICAgICAgICBlbHNlIGlmIChlbGUucG9zaXRpb24oXCJ4XCIpID4gbWFpbkVsZS5wb3NpdGlvbihcInhcIikgJiYgZWxlLnBvc2l0aW9uKFwieVwiKSA+IG1haW5FbGUucG9zaXRpb24oXCJ5XCIpKVxuICAgICAgICAgIG9jY3VwaWVkUXVhZHJhbnRzLmZvdXJ0aCA9IFwib2NjdXBpZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2NjdXBpZWRRdWFkcmFudHM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IGltcG9ydCgnLi90eXBlZGVmJykuQ29tcG9uZW50W10gfSBjb21wb25lbnRzIFxuICAgKi9cbiAgaW5zdGFuY2UucGFja0NvbXBvbmVudHMgPSBmdW5jdGlvbiAoY29tcG9uZW50cykgeyAgICBcbiAgICByZXR1cm4gcGFjayhjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsYXlvdXRVdGlsaXRpZXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbGF5b3V0LXV0aWxpdGllcy5qcyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCBsYXlvdXRVdGlsaXRpZXMgPSByZXF1aXJlKFwiLi9sYXlvdXQtdXRpbGl0aWVzXCIpLmRlZmF1bHQ7XG5cbiAgLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxuICAvKipcbiAgICogQHBhcmFtIHt0eXBlb2YgZ2xvYmFsVGhpcy5jeXRvc2NhcGV9IGN5dG9zY2FwZVxuICAgKi9cbiAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGN5dG9zY2FwZSkge1xuXG4gICAgaWYgKCFjeXRvc2NhcGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZWRlZicpLk9wdGlvbnN9ICovXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICBpZGVhbEVkZ2VMZW5ndGg6IDUwLFxuICAgICAgb2Zmc2V0OiAyMCxcbiAgICAgIGRlc2lyZWRBc3BlY3RSYXRpbzogMSxcbiAgICAgIHBvbHlvbWlub0dyaWRTaXplRmFjdG9yOiAxLFxuICAgICAgdXRpbGl0eUZ1bmN0aW9uOiAxLCAgLy8gTWF4aW1pemUgYWRqdXN0ZWQgRnVsbG5lc3MgICAyOiBtYXhpbWl6ZXMgd2VpZ2h0ZWQgZnVuY3Rpb24gb2YgZnVsbG5lc3MgYW5kIGFzcGVjdCByYXRpb1xuICAgICAgY29tcG9uZW50U3BhY2luZzogMzAsXG4gICAgICByYW5kb21pemU6IHRydWUsXG4gICAgfTtcblxuXG4gICAgLyogIGZ1bmN0aW9uIGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICAgIHZhciBvYmogPSB7fTtcbiBcbiAgICAgICBmb3IgKHZhciBpIGluIGRlZmF1bHRzKSB7XG4gICAgICAgICBvYmpbaV0gPSBkZWZhdWx0c1tpXTtcbiAgICAgICB9XG4gXG4gICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICBpZihpID09IFwiZGVzaXJlZEFzcGVjdFJhdGlvXCIpe1xuICAgICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgaWYoIWlzTmFOKHZhbHVlKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIGlmKHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMjApe1xuICAgICAgICAgICAgICAgICBvYmpbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgfWVsc2UgaWYodmFsdWUgPCAwKXtcbiAgICAgICAgICAgICAgICAgb2JqW2ldID0gMFxuICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgIG9ialtpXSA9IDIwXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgb2JqW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgIH1cbiBcbiAgICAgICB9XG4gXG4gICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07ICovXG5cbiAgICBjeXRvc2NhcGUoJ2NvcmUnLCAnbGF5b3V0VXRpbGl0aWVzJywgZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgIHZhciBjeSA9IHRoaXM7XG5cbiAgICAgIC8vIElmICdnZXQnIGlzIGdpdmVuIGFzIHRoZSBwYXJhbSB0aGVuIHJldHVybiB0aGUgZXh0ZW5zaW9uIGluc3RhbmNlXG4gICAgICBpZiAob3B0cyA9PT0gJ2dldCcpIHtcbiAgICAgICAgcmV0dXJuIGdldFNjcmF0Y2goY3kpLmluc3RhbmNlO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICogRGVlcCBjb3B5IG9yIG1lcmdlIG9iamVjdHMgLSByZXBsYWNlbWVudCBmb3IgalF1ZXJ5IGRlZXAgZXh0ZW5kXG4gICAgICAqIFRha2VuIGZyb20gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI2RlZXBfZXh0ZW5kXG4gICAgICAqIGFuZCBidWcgcmVsYXRlZCB0byBkZWVwIGNvcHkgb2YgQXJyYXlzIGlzIGZpeGVkLlxuICAgICAgKiBVc2FnZTpPYmplY3QuZXh0ZW5kKHt9LCBvYmpBLCBvYmpCKVxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnMob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCB7fTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICBpZiAoIW9iailcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIG91dFtrZXldID0gb2JqW2tleV0uc2xpY2UoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgb3V0W2tleV0gPSBleHRlbmRPcHRpb25zKG91dFtrZXldLCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSBleHRlbmRPcHRpb25zKHt9LCBvcHRpb25zLCBvcHRzKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0U2NyYXRjaChlbGVPckN5KSB7XG4gICAgICAgIGlmICghZWxlT3JDeS5zY3JhdGNoKFwiX2xheW91dFV0aWxpdGllc1wiKSkge1xuICAgICAgICAgIGVsZU9yQ3kuc2NyYXRjaChcIl9sYXlvdXRVdGlsaXRpZXNcIiwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZU9yQ3kuc2NyYXRjaChcIl9sYXlvdXRVdGlsaXRpZXNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBhIHZpZXcgdXRpbGl0aWVzIGluc3RhbmNlXG4gICAgICB2YXIgaW5zdGFuY2UgPSBsYXlvdXRVdGlsaXRpZXMoY3ksIG9wdGlvbnMpO1xuXG5cbiAgICAgIC8vIHNldCB0aGUgaW5zdGFuY2Ugb24gdGhlIHNjcmF0Y2ggcGFkXG4gICAgICBnZXRTY3JhdGNoKGN5KS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXG4gICAgICBpZiAoIWdldFNjcmF0Y2goY3kpLmluaXRpYWxpemVkKSB7XG4gICAgICAgIGdldFNjcmF0Y2goY3kpLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB2YXIgc2hpZnRLZXlEb3duID0gZmFsc2U7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09IFwiU2hpZnRcIikge1xuICAgICAgICAgICAgc2hpZnRLZXlEb3duID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5rZXkgPT0gXCJTaGlmdFwiKSB7XG4gICAgICAgICAgICBzaGlmdEtleURvd24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL1NlbGVjdCB0aGUgZGVzaXJlZCBuZWlnaGJvcnMgYWZ0ZXIgdGFwaG9sZC1hbmQtZnJlZVxuICAgICAgICAvKiAgY3kub24oJ3RhcGhvbGQnLCAnbm9kZScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5jeVRhcmdldDtcbiAgICAgICAgICAgdmFyIHRhcGhlbGQgPSBmYWxzZTtcbiAgICAgICAgICAgdmFyIG5laWdoYm9yaG9vZDtcbiAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgaWYoc2hpZnRLZXlEb3duKXtcbiAgICAgICAgICAgICAgIGN5LmVsZW1lbnRzKCkudW5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgIG5laWdoYm9yaG9vZCA9IG9wdGlvbnMubmVpZ2hib3IodGFyZ2V0KTtcbiAgICAgICAgICAgICAgIGlmKG5laWdoYm9yaG9vZClcbiAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgdGFyZ2V0LmxvY2soKTtcbiAgICAgICAgICAgICAgIHRhcGhlbGQgPSB0cnVlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSwgb3B0aW9ucy5uZWlnaGJvclNlbGVjdFRpbWUgLSA1MDApO1xuICAgICAgICAgICBjeS5vbignZnJlZScsICdub2RlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICB2YXIgdGFyZ2V0VGFwaGVsZCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5jeVRhcmdldDtcbiAgICAgICAgICAgICBpZih0YXJnZXQgPT0gdGFyZ2V0VGFwaGVsZCAmJiB0YXBoZWxkID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgIHRhcGhlbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgIGlmKG5laWdoYm9yaG9vZClcbiAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgdGFyZ2V0LnVubG9jaygpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIGN5Lm9uKCdkcmFnJywgJ25vZGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHZhciB0YXJnZXREcmFnZ2VkID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LmN5VGFyZ2V0O1xuICAgICAgICAgICAgIGlmKHRhcmdldCA9PSB0YXJnZXREcmFnZ2VkICYmIHRhcGhlbGQgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pXG4gICAgICAgICB9KTsgKi9cbiAgICAgIH1cblxuICAgICAgLy8gcmV0dXJuIHRoZSBpbnN0YW5jZSBvZiBleHRlbnNpb25cbiAgICAgIHJldHVybiBnZXRTY3JhdGNoKGN5KS5pbnN0YW5jZTtcbiAgICB9KTtcblxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvLyBleHBvc2UgYXMgYSBjb21tb25qcyBtb2R1bGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHsgLy8gZXhwb3NlIGFzIGFuIGFtZC9yZXF1aXJlanMgbW9kdWxlXG4gICAgZGVmaW5lKCdjeXRvc2NhcGUtdmlldy11dGlsaXRpZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgICByZWdpc3RlcihjeXRvc2NhcGUpO1xuICB9XG5cbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCB7IGdldENlbnRlciwgZ2V0Qm91bmRpbmdSZWN0YW5nbGUgfSBmcm9tICcuL2dlbmVyYWwtdXRpbHMnO1xuaW1wb3J0IHsgUG9seW9taW5vLCBHcmlkIH0gZnJvbSAnLi9wb2x5b21pbm8tcGFja2luZyc7XG5cbi8qKlxuICogXG4gKiBAcGFyYW0geyBpbXBvcnQoJy4vdHlwZWRlZicpLkNvbXBvbmVudFtdIH0gY29tcG9uZW50cyBcbiAqIEBwYXJhbSB7IGltcG9ydCgnLi90eXBlZGVmJykuT3B0aW9ucyB9IG9wdGlvbnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWNrKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5yYW5kb21pemUpIHtcbiAgICAgICAgcmV0dXJuIG5vbkluY3JlbWVudGFsUGFjayhjb21wb25lbnRzLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbmNyZW1lbnRhbFBhY2soY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgfVxufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHsgaW1wb3J0KCcuL3R5cGVkZWYnKS5Db21wb25lbnRbXSB9IGNvbXBvbmVudHMgXG4gKiBAcGFyYW0geyBpbXBvcnQoJy4vdHlwZWRlZicpLk9wdGlvbnMgfSBvcHRpb25zIFxuICovXG5mdW5jdGlvbiBub25JbmNyZW1lbnRhbFBhY2soY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgIGxldCBjdXJyZW50Q2VudGVyID0gZ2V0Q2VudGVyKGNvbXBvbmVudHMpO1xuICAgIFxuICAgIGxldCBncmlkU3RlcCA9IGNhbGN1bGF0ZUdyaWRTdGVwKGNvbXBvbmVudHMsIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuY29tcG9uZW50U3BhY2luZyA+IDApIHtcbiAgICAgIGxldCBzcGFjaW5nQW1vdW50ID0gb3B0aW9ucy5jb21wb25lbnRTcGFjaW5nO1xuICAgICAgYWRkU3BhY2luZyhjb21wb25lbnRzLCBzcGFjaW5nQW1vdW50KTtcbiAgICB9XG4gICAgdmFyIGdyaWRXaWR0aCA9IDAsIGdyaWRIZWlnaHQgPSAwO1xuICAgIC8qKiBAdHlwZSB7IFBvbHlvbWlub1tdIH0gKi9cbiAgICB2YXIgcG9seW9taW5vcyA9IFtdO1xuICAgIHZhciBnbG9iYWxYMSA9IE51bWJlci5NQVhfVkFMVUUsIGdsb2JhbFgyID0gLU51bWJlci5NQVhfVkFMVUUsIGdsb2JhbFkxID0gTnVtYmVyLk1BWF9WQUxVRSwgZ2xvYmFsWTIgPSAtTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIC8vY3JlYXRlIHBvbHlvbWlub3MgZm9yIGNvbXBvbmVudHNcbiAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCB7IHgxLCB4MiwgeTEsIHkyIH0gPSBnZXRCb3VuZGluZ1JlY3RhbmdsZShjb21wb25lbnQpO1xuXG4gICAgICBpZiAoeDEgPCBnbG9iYWxYMSkgZ2xvYmFsWDEgPSB4MTtcbiAgICAgIGlmICh4MiA+IGdsb2JhbFgyKSBnbG9iYWxYMiA9IHgyO1xuICAgICAgaWYgKHkxIDwgZ2xvYmFsWTEpIGdsb2JhbFkxID0geTE7XG4gICAgICBpZiAoeTIgPiBnbG9iYWxZMikgZ2xvYmFsWTIgPSB5MjtcblxuICAgICAgbGV0IGNvbXBvbmVudFdpZHRoID0geDIgLSB4MTtcbiAgICAgIGxldCBjb21wb25lbnRIZWlnaHQgPSB5MiAtIHkxO1xuICAgICAgZ3JpZFdpZHRoICs9IGNvbXBvbmVudFdpZHRoO1xuICAgICAgZ3JpZEhlaWdodCArPSBjb21wb25lbnRIZWlnaHQ7XG5cbiAgICAgIHZhciBjb21wb25lbnRQb2x5b21pbm8gPSBuZXcgUG9seW9taW5vKHgxLCB5MSwgY29tcG9uZW50V2lkdGgsIGNvbXBvbmVudEhlaWdodCwgZ3JpZFN0ZXAsIGluZGV4LFxuICAgICAgICB7IGNvbXBvbmVudCwgYm91bmRpbmdSZWN0OiB7IHgxLCB4MiwgeTEsIHkyIH0gfSk7XG5cbiAgICAgIC8qIC8vZmlsbCBub2RlcyB0byBwb2x5b21pbm8gY2VsbHNcbiAgICAgIGNvbXBvbmVudC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIC8vdG9wIGxlZnQgY2VsbCBvZiBhIG5vZGVcbiAgICAgICAgdmFyIHRvcExlZnRYID0gTWF0aC5mbG9vcigobm9kZS54IC0geDEpIC8gZ3JpZFN0ZXApO1xuICAgICAgICB2YXIgdG9wTGVmdFkgPSBNYXRoLmZsb29yKChub2RlLnkgLSB5MSkgLyBncmlkU3RlcCk7XG5cbiAgICAgICAgLy9ib3R0b20gcmlnaHQgY2VsbCBvZiBhIG5vZGVcbiAgICAgICAgdmFyIGJvdHRvbVJpZ2h0WCA9IE1hdGguZmxvb3IoKG5vZGUueCArIG5vZGUud2lkdGggLSB4MSkgLyBncmlkU3RlcCk7XG4gICAgICAgIHZhciBib3R0b21SaWdodFkgPSBNYXRoLmZsb29yKChub2RlLnkgKyBub2RlLmhlaWdodCAtIHkxKSAvIGdyaWRTdGVwKTtcblxuICAgICAgICAvL2FsbCBjZWxscyBiZXR3ZWVuIHRvcGxlZnQgY2VsbCBhbmQgYm90dG9tIHJpZ2h0IGNlbGwgc2hvdWxkIGJlIG9jY3VwaWVkXG4gICAgICAgIGZvciAodmFyIGkgPSB0b3BMZWZ0WDsgaSA8PSBib3R0b21SaWdodFg7IGkrKykge1xuICAgICAgICAgIGZvciAodmFyIGogPSB0b3BMZWZ0WTsgaiA8PSBib3R0b21SaWdodFk7IGorKykge1xuICAgICAgICAgICAgY29tcG9uZW50UG9seW9taW5vLmdyaWRbaV1bal0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vZmlsbCBjZWxscyB3aGVyZSBlZGdlcyBwYXNzIFxuICAgICAgY29tcG9uZW50LmVkZ2VzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgdmFyIHAwID0ge30sIHAxID0ge307XG4gICAgICAgIHAwLnggPSAoZWRnZS5zdGFydFggLSB4MSkgLyBncmlkU3RlcDtcbiAgICAgICAgcDAueSA9IChlZGdlLnN0YXJ0WSAtIHkxKSAvIGdyaWRTdGVwO1xuICAgICAgICBwMS54ID0gKGVkZ2UuZW5kWCAtIHgxKSAvIGdyaWRTdGVwO1xuICAgICAgICBwMS55ID0gKGVkZ2UuZW5kWSAtIHkxKSAvIGdyaWRTdGVwO1xuICAgICAgICAvL2ZvciBldmVyeSBlZGdlIGNhbGN1bGF0ZSB0aGUgc3VwZXIgY292ZXIgXG4gICAgICAgIHZhciBwb2ludHMgPSBnZW5lcmFsVXRpbHMuTGluZVN1cGVyQ292ZXIocDAsIHAxKTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgdmFyIGluZGV4WCA9IE1hdGguZmxvb3IocG9pbnQueCk7XG4gICAgICAgICAgdmFyIGluZGV4WSA9IE1hdGguZmxvb3IocG9pbnQueSk7XG4gICAgICAgICAgaWYgKGluZGV4WCA+PSAwICYmIGluZGV4WCA8IGNvbXBvbmVudFBvbHlvbWluby5zdGVwV2lkdGggJiYgaW5kZXhZID49IDAgJiYgaW5kZXhZIDwgY29tcG9uZW50UG9seW9taW5vLnN0ZXBIZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFBvbHlvbWluby5ncmlkW01hdGguZmxvb3IocG9pbnQueCldW01hdGguZmxvb3IocG9pbnQueSldID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vdXBkYXRlIG51bWJlciBvZiBvY2N1cGllZCBjZWxscyBpbiBwb2x5b21pbm9cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50UG9seW9taW5vLnN0ZXBXaWR0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29tcG9uZW50UG9seW9taW5vLnN0ZXBIZWlnaHQ7IGorKykge1xuICAgICAgICAgIGlmIChjb21wb25lbnRQb2x5b21pbm8uZ3JpZFtpXVtqXSkgY29tcG9uZW50UG9seW9taW5vLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMrKztcblxuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgICBwb2x5b21pbm9zLnB1c2goY29tcG9uZW50UG9seW9taW5vKTtcbiAgICB9KTtcblxuICAgIC8vb3JkZXIgcGx5b21pbm9zIG5vbi1pbmNyZWFzaW5nIG9yZGVyXG4gICAgcG9seW9taW5vcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgYVNpemUgPSBhLnN0ZXBXaWR0aCAqIGEuc3RlcEhlaWdodDtcbiAgICAgIHZhciBiU2l6ZSA9IGIuc3RlcFdpZHRoICogYi5zdGVwSGVpZ2h0O1xuICAgICAgLy8gYSBzaG91bGQgY29tZSBiZWZvcmUgYiBpbiB0aGUgc29ydGVkIG9yZGVyXG4gICAgICBpZiAoYVNpemUgPiBiU2l6ZSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIC8vIGEgc2hvdWxkIGNvbWUgYWZ0ZXIgYiBpbiB0aGUgc29ydGVkIG9yZGVyXG4gICAgICB9IGVsc2UgaWYgKGFTaXplIDwgYlNpemUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIC8vIGEgYW5kIGIgYXJlIHRoZSBzYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL21haW4gZ3JpZCB3aWR0aCBhbmQgaGVpZ2h0IGlzIHR3byB0aGUgdGltZXMgdGhlIHN1bSBvZiBhbGwgY29tcG9uZW50cyB3aWR0aHMgYW5kIGhlaWdodHMgKHdvcnN0IGNhc2Ugc2NlbmFyaW8pXG4gICAgLy9pbnRpYWxpemUgdGhlIGdyaWQgYWRkIDEgdG8gYXZvaWQgaW5zdWZmaWNpZW50IGdyaWQgc3BhY2UgZHVlIHRvIGRpdmlzaW4gYnkgMiBpbiBjYWxjdWF0aW9uc1xuICAgIGxldCBtYWluR3JpZCA9IG5ldyBHcmlkKChncmlkV2lkdGggKiAyKSArIGdyaWRTdGVwLCAoZ3JpZEhlaWdodCAqIDIpICsgZ3JpZFN0ZXAsIGdyaWRTdGVwKTtcblxuICAgIC8vcGxhY2UgZmlyc3QgKGJpZ2dlc3QpIHBvbHlvbWlubyBpbiB0aGUgY2VudGVyXG4gICAgbWFpbkdyaWQucGxhY2VQb2x5b21pbm8ocG9seW9taW5vc1swXSwgbWFpbkdyaWQuY2VudGVyLngsIG1haW5HcmlkLmNlbnRlci55KTtcblxuICAgIC8vZm9yIGV2ZXJ5IHBvbHlvbWlubyB0cnkgcGxhY2VpbmcgaXQgaW4gZmlyc3QgbmVpZ2hib3JzIGFuZCBjYWxjdWxhdGUgdXRpbGl0eSBpZiBub25lIHRoZW4gc2Vjb25kIG5laWdoYm9yIGFuZCBzbyBvbi4uXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwb2x5b21pbm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZnVsbG5lc3NNYXggPSAwO1xuICAgICAgdmFyIGFkanVzdGVkRnVsbG5lc3NNYXggPSAwO1xuICAgICAgdmFyIHdlaWd0aEZ1bGxuZXNzQXNwZWN0UmF0aW8gPSAwO1xuICAgICAgdmFyIG1pbkFzcGVjdFJhdGlvRGlmZiA9IDEwMDAwMDA7XG4gICAgICB2YXIgcGxhY2VtZW50Rm91bmQgPSBmYWxzZTtcbiAgICAgIHZhciBjZWxscyA9IFtdO1xuICAgICAgdmFyIHJlc3VsdExvY2F0aW9uID0ge307XG4gICAgICB3aGlsZSAoIXBsYWNlbWVudEZvdW5kKSB7XG5cbiAgICAgICAgY2VsbHMgPSBtYWluR3JpZC5nZXREaXJlY3ROZWlnaGJvcnMoY2VsbHMsIE1hdGguY2VpbChNYXRoLm1heChwb2x5b21pbm9zW2ldLnN0ZXBXaWR0aCwgcG9seW9taW5vc1tpXS5zdGVwSGVpZ2h0KSAvIDIpKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIGlmIChtYWluR3JpZC50cnlQbGFjaW5nUG9seW9taW5vKHBvbHlvbWlub3NbaV0sIGNlbGwueCwgY2VsbC55KSkge1xuICAgICAgICAgICAgcGxhY2VtZW50Rm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHV0aWxpdHlWYWx1ZSA9IG1haW5HcmlkLmNhbGN1bGF0ZVV0aWxpdHlPZlBsYWNpbmcocG9seW9taW5vc1tpXSwgY2VsbC54LCBjZWxsLnksIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKTtcbiAgICAgICAgICAgIHZhciBjZWxsQ2hvc2VuID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy51dGlsaXR5RnVuY3Rpb24gPT0gMSkge1xuICAgICAgICAgICAgICBpZiAodXRpbGl0eVZhbHVlLmFkanVzdGVkRnVsbG5lc3MgPiBhZGp1c3RlZEZ1bGxuZXNzTWF4KSB7XG4gICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbGl0eVZhbHVlLmFkanVzdGVkRnVsbG5lc3MgPT0gYWRqdXN0ZWRGdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsaXR5VmFsdWUuZnVsbG5lc3MgPiBmdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHV0aWxpdHlWYWx1ZS5mdWxsbmVzcyA9PSBmdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHV0aWxpdHlWYWx1ZS5hY3R1YWxBc3BlY3RSYXRpbyAtIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKSA8PSBtaW5Bc3BlY3RSYXRpb0RpZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjZWxsQ2hvc2VuKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRGdWxsbmVzc01heCA9IHV0aWxpdHlWYWx1ZS5hZGp1c3RlZEZ1bGxuZXNzO1xuICAgICAgICAgICAgICAgIG1pbkFzcGVjdFJhdGlvRGlmZiA9IE1hdGguYWJzKHV0aWxpdHlWYWx1ZS5hY3R1YWxBc3BlY3RSYXRpbyAtIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKTtcbiAgICAgICAgICAgICAgICBmdWxsbmVzc01heCA9IHV0aWxpdHlWYWx1ZS5mdWxsbmVzcztcbiAgICAgICAgICAgICAgICByZXN1bHRMb2NhdGlvbi54ID0gY2VsbC54O1xuICAgICAgICAgICAgICAgIHJlc3VsdExvY2F0aW9uLnkgPSBjZWxsLnk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnV0aWxpdHlGdW5jdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgIHZhciBhc3BlY3RSYXRpb0RpZmYgPSBNYXRoLmFicyh1dGlsaXR5VmFsdWUuYWN0dWFsQXNwZWN0UmF0aW8gLSBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbyk7XG4gICAgICAgICAgICAgIHZhciB3ZWlnaHRlZFV0aWxpdHkgPSAodXRpbGl0eVZhbHVlLmZ1bGxuZXNzICogLjUpICsgKCgxIC0gYXNwZWN0UmF0aW9EaWZmIC8gTWF0aC5tYXgodXRpbGl0eVZhbHVlLmFjdHVhbEFzcGVjdFJhdGlvLCBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykgKiAuNSkpO1xuICAgICAgICAgICAgICBpZiAod2VpZ2h0ZWRVdGlsaXR5ID4gd2VpZ3RoRnVsbG5lc3NBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgICAgIHdlaWd0aEZ1bGxuZXNzQXNwZWN0UmF0aW8gPSB3ZWlnaHRlZFV0aWxpdHk7XG4gICAgICAgICAgICAgICAgcmVzdWx0TG9jYXRpb24ueCA9IGNlbGwueDtcbiAgICAgICAgICAgICAgICByZXN1bHRMb2NhdGlvbi55ID0gY2VsbC55O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbWFpbkdyaWQucGxhY2VQb2x5b21pbm8ocG9seW9taW5vc1tpXSwgcmVzdWx0TG9jYXRpb24ueCwgcmVzdWx0TG9jYXRpb24ueSk7XG4gICAgfVxuXG4gICAgLy9zb3J0IHBvbHlvbWlub3MgYWNjb3JkaW5nIHRvIGluZGV4IG9mIGlucHV0IHRvIHJldHVybiBjb3JyZWN0IG91dHB1dCBvcmRlclxuICAgIHBvbHlvbWlub3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGEuaW5kZXggPCBiLmluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSBpZiAoYS5pbmRleCA+IGIuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBwYWNraW5nUmVzdWx0ID0ge1xuICAgICAgc2hpZnRzOiBbXVxuICAgIH07XG5cbiAgICAvKiAgdmFyIHNoaWZ0WCA9IGNvbXBvbmVudHNDZW50ZXIueCAtICgobWFpbkdyaWQuY2VudGVyLnggLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSkqZ3JpZFN0ZXApOyBcbiAgICB2YXIgc2hpZnRZID0gY29tcG9uZW50c0NlbnRlci55IC0gKChtYWluR3JpZC5jZW50ZXIueSAtIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkxKSpncmlkU3RlcCk7IFxuICAgIHZhciBvY2N1cGllZENlbnRlclggPSBNYXRoLmZsb29yKChtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSArIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngyKS8yKTtcbiAgICB2YXIgb2NjdXBpZWRDZW50ZXJZID0gTWF0aC5mbG9vcigobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS55MikvMik7ICovXG4gICAgXG4gICAgcG9seW9taW5vcy5mb3JFYWNoKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgIHZhciBkeCA9IChwb2wubG9jYXRpb24ueCAtIHBvbC5jZW50ZXIueCAtIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngxKSAqIGdyaWRTdGVwIC0gcG9sLngxOy8vK3NoaWZ0WDtcbiAgICAgIHZhciBkeSA9IChwb2wubG9jYXRpb24ueSAtIHBvbC5jZW50ZXIueSAtIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkxKSAqIGdyaWRTdGVwIC0gcG9sLnkxOy8vICsgc2hpZnRZO1xuICAgICAgLy92YXIgZHggPSAocG9sLmxvY2F0aW9uLnggLW9jY3VwaWVkQ2VudGVyWCkgKiBncmlkU3RlcCArIGNvbXBvbmVudHNDZW50ZXIueC0gcG9sLmxlZnRNb3N0Q29vcmQ7Ly8rc2hpZnRYO1xuICAgICAgLy92YXIgZHkgPSAocG9sLmxvY2F0aW9uLnkgLW9jY3VwaWVkQ2VudGVyWSkgKiBncmlkU3RlcCArIGNvbXBvbmVudHNDZW50ZXIueS1wb2wudG9wTW9zdENvb3JkOy8vICsgc2hpZnRZO1xuICAgICAgcGFja2luZ1Jlc3VsdC5zaGlmdHMucHVzaCh7IGR4OiBkeCwgZHk6IGR5IH0pO1xuICAgIH0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHdoYXQgd291bGQgYmUgdGhlIGNlbnRlciBvZiB0aGUgcGFja2VkIGxheW91dFxuICAgIGxldCBwYWNraW5nQ2VudGVyID0gY2FsY3VsYXRlUGFja2luZ0NlbnRlcihjb21wb25lbnRzLCBwYWNraW5nUmVzdWx0LnNoaWZ0cyk7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBuZWNjZXNzYXJ5ICBhZGRpdGlvbmFsIHNoaWZ0IHRvIHJlLWNlbnRlclxuICAgIGxldCBjZW50ZXJTaGlmdCA9IHBhY2tpbmdDZW50ZXIuZGlmZihjdXJyZW50Q2VudGVyKTtcblxuICAgIC8vIEFkZCB0aGUgY2VudGVyIHNoaWZ0XG4gICAgZm9yIChsZXQgc2hpZnQgb2YgcGFja2luZ1Jlc3VsdC5zaGlmdHMpIHtcbiAgICAgIHNoaWZ0LmR4ICs9IGNlbnRlclNoaWZ0Lng7XG4gICAgICBzaGlmdC5keSArPSBjZW50ZXJTaGlmdC55O1xuICAgIH1cblxuICAgIHBhY2tpbmdSZXN1bHQuYXNwZWN0UmF0aW8gPSBNYXRoLnJvdW5kKCgobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDIgLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSArIDEpIC8gKG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxKSkgKiAxZTIpIC8gMWUyO1xuICAgIHBhY2tpbmdSZXN1bHQuZnVsbG5lc3MgPSBNYXRoLnJvdW5kKCgobWFpbkdyaWQubnVtYmVyT2ZPY2N1cGlyZWRDZWxscyAvICgobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDIgLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSArIDEpICogKG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxKSkpICogMTAwKSAqIDFlMikgLyAxZTI7XG5cbiAgICBpZiAocGFja2luZ1Jlc3VsdC5hc3BlY3RSYXRpbyA+IG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKSB7XG4gICAgICB2YXIgbWFpbkdyaWRXaWR0aCA9IG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDEgKyAxO1xuICAgICAgcGFja2luZ1Jlc3VsdC5hZGp1c3RlZEZ1bGxuZXNzID0gTWF0aC5yb3VuZCgoKChtYWluR3JpZC5udW1iZXJPZk9jY3VwaXJlZENlbGxzKSAvIChtYWluR3JpZFdpZHRoICogKG1haW5HcmlkV2lkdGggLyBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykpICogMTAwKSkgKiAxZTIpIC8gMWUyO1xuICAgICAgLy8gaGVpZ2h0ID0gd2lkdGggLyBkZXNpcmVkQXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYWluR3JpZGhlaWdodCA9IG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxO1xuICAgICAgcGFja2luZ1Jlc3VsdC5hZGp1c3RlZEZ1bGxuZXNzID0gTWF0aC5yb3VuZCgoKChtYWluR3JpZC5udW1iZXJPZk9jY3VwaXJlZENlbGxzKSAvICgobWFpbkdyaWRoZWlnaHQgKiBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykgKiBtYWluR3JpZGhlaWdodCkpICogMTAwKSAqIDFlMikgLyAxZTI7XG4gICAgICAvLyB3aWR0aCA9IGhlaWdodCAqIGRlc2lyZWRBc3BlY3RSYXRpbztcbiAgICB9XG5cblxuICAgIHJldHVybiBwYWNraW5nUmVzdWx0O1xufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHsgaW1wb3J0KCcuL3R5cGVkZWYnKS5Db21wb25lbnRbXSB9IGNvbXBvbmVudHMgXG4gKiBAcGFyYW0geyBpbXBvcnQoJy4vdHlwZWRlZicpLk9wdGlvbnMgfSBvcHRpb25zIFxuICovXG5mdW5jdGlvbiBpbmNyZW1lbnRhbFBhY2soY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IEltcGxlbWVudGVkJyk7XG59XG5cbi8vIEJlbG93IHRoZXJlIGFyZSBmdW5jdGlvbnMgdXNlZCBpbiBib3RoIG1ldGhvZHNcblxuLyoqXG4gKiBAcGFyYW0geyB7IG5vZGVzOiBhbnlbXSB9W10gfSBjb21wb25lbnRzXG4gKiBAcGFyYW0geyB7IGR4OiBudW1iZXIsIGR5OiBudW1iZXIgfVtdIH0gc2hpZnRzXG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVBhY2tpbmdDZW50ZXIoY29tcG9uZW50cywgc2hpZnRzKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbXBvbmVudC5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBub2RlLnggKz0gc2hpZnRzW2luZGV4XS5keDtcbiAgICAgICAgbm9kZS55ICs9IHNoaWZ0c1tpbmRleF0uZHk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdldENlbnRlcihjb21wb25lbnRzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyBpbXBvcnQoJy4vdHlwZWRlZicpLkNvbXBvbmVudFtdIH0gY29tcG9uZW50cyBcbiAqIEBwYXJhbSB7IGltcG9ydCgnLi90eXBlZGVmJykuT3B0aW9ucyB9IG9wdGlvbnMgXG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZUdyaWRTdGVwKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICBsZXQgZ3JpZFN0ZXAgPSAwO1xuICAgIFxuICAgIGxldCB0b3RhbE5vZGVzID0gMDtcbiAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgdG90YWxOb2RlcyArPSBjb21wb25lbnQubm9kZXMubGVuZ3RoO1xuICAgICAgY29tcG9uZW50Lm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgZ3JpZFN0ZXAgKz0gbm9kZS53aWR0aCArIG5vZGUuaGVpZ2h0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgZ3JpZFN0ZXAgPSBncmlkU3RlcCAvICgyICogdG90YWxOb2Rlcyk7XG4gICAgZ3JpZFN0ZXAgPSBNYXRoLmZsb29yKGdyaWRTdGVwICogb3B0aW9ucy5wb2x5b21pbm9HcmlkU2l6ZUZhY3Rvcik7XG5cbiAgICByZXR1cm4gZ3JpZFN0ZXA7XG59XG5cbi8qKlxuICogQHBhcmFtIHsgbnVtYmVyIH0gc3BhY2luZ0Ftb3VudFxuICogQHBhcmFtIHsgaW1wb3J0KCcuL3R5cGVkZWYnKS5Db21wb25lbnRbXSB9IGNvbXBvbmVudHNcbiAqL1xuZnVuY3Rpb24gYWRkU3BhY2luZyhjb21wb25lbnRzLCBzcGFjaW5nQW1vdW50KSB7XG4gICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBjb21wb25lbnQubm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUueCA9IG5vZGUueCAtIHNwYWNpbmdBbW91bnQ7XG4gICAgICAgICAgICBub2RlLnkgPSBub2RlLnkgLSBzcGFjaW5nQW1vdW50O1xuICAgICAgICAgICAgbm9kZS53aWR0aCA9IG5vZGUud2lkdGggKyAoMiAqIHNwYWNpbmdBbW91bnQpO1xuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBub2RlLmhlaWdodCArICgyICogc3BhY2luZ0Ftb3VudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvcGFja2luZy5qcyJdLCJzb3VyY2VSb290IjoiIn0=