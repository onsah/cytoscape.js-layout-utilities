(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["cytoscapeLayoutUtilities"] = factory(); else root["cytoscapeLayoutUtilities"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
            return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 6);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Point;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return Rectangle;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return Cell;
        });
        var __WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__ = __webpack_require__(4);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var Point = function() {
            function Point(x, y) {
                _classCallCheck(this, Point);
                this.x = x;
                this.y = y;
            }
            _createClass(Point, [ {
                key: "diff",
                value: function diff(other) {
                    return new Point(other.x - this.x, other.y - this.y);
                }
            }, {
                key: "plus",
                value: function plus(other) {
                    return new Point(this.x + other.x, this.y + other.y);
                }
            } ], [ {
                key: "fromDirection",
                value: function fromDirection(direction) {
                    switch (direction) {
                      case __WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__["b"].LEFT:
                        return new Point(1, 0);

                      case __WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__["b"].RIGHT:
                        return new Point(-1, 0);

                      case __WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__["b"].BOTTOM:
                        return new Point(0, -1);

                      case __WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__["b"].TOP:
                        return new Point(0, 1);

                      default:
                        throw new Error("Invalid direction: ".concat(__WEBPACK_IMPORTED_MODULE_0__compaction_compaction_grid__["b"]));
                    }
                }
            } ]);
            return Point;
        }();
        var Rectangle = function() {
            function Rectangle(x1, y1, x2, y2) {
                _classCallCheck(this, Rectangle);
                this.x1 = x1;
                this.x2 = x2;
                this.y1 = y1;
                this.y2 = y2;
            }
            _createClass(Rectangle, [ {
                key: "center",
                value: function center() {
                    return new Point((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
                }
            }, {
                key: "include",
                value: function include(other) {
                    this.x1 = Math.min(this.x1, other.x1);
                    this.y1 = Math.min(this.y1, other.y1);
                    this.x2 = Math.max(this.x2, other.x2);
                    this.y2 = Math.max(this.y2, other.y2);
                }
            }, {
                key: "includes",
                value: function includes(other) {
                    return this.x1 <= other.x1 && this.y1 <= other.y1 && this.x2 >= other.x2 && this.y2 >= other.y2;
                }
            }, {
                key: "intersects",
                value: function intersects(other) {
                    return this.x2 >= other.x1 && this.x1 <= other.x2 && this.y2 >= other.y1 && this.y1 <= other.y2;
                }
            }, {
                key: "contains",
                value: function contains(i, j) {
                    return i >= this.y1 && i <= this.y2 && j >= this.x1 && j <= this.x2;
                }
            }, {
                key: "move",
                value: function move(point) {
                    this.x1 += point.x;
                    this.x2 += point.x;
                    this.y1 += point.y;
                    this.y2 += point.y;
                    return this;
                }
            }, {
                key: "width",
                get: function get() {
                    return this.x2 - this.x1 + 1;
                }
            }, {
                key: "height",
                get: function get() {
                    return this.y2 - this.y1 + 1;
                }
            }, {
                key: "absoluteCenter",
                get: function get() {
                    return new Point((this.x2 + this.x1) / 2, (this.y2 + this.y1) / 2);
                }
            } ]);
            return Rectangle;
        }();
        var Cell = function Cell(occupied, visited) {
            _classCallCheck(this, Cell);
            this.occupied = occupied;
            this.visited = visited;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Polyomino;
        });
        var __WEBPACK_IMPORTED_MODULE_0__general_utils__ = __webpack_require__(3);
        var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(0);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var Polyomino = function() {
            function Polyomino(x1, y1, width, height, gridStep, index, componentAndRect) {
                _classCallCheck(this, Polyomino);
                this.x1 = x1;
                this.y1 = y1;
                this.index = index;
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
                this.location = new __WEBPACK_IMPORTED_MODULE_1__common__["a"](this.stepX1, this.stepY1);
                this.center = new __WEBPACK_IMPORTED_MODULE_1__common__["a"](Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
                this.numberOfOccupiredCells = 0;
                this.mRect = new __WEBPACK_IMPORTED_MODULE_1__common__["b"](this.location.x, this.location.y, this.location.x + this.stepWidth - 1, this.location.y + this.stepHeight - 1);
                if (typeof componentAndRect !== "undefined") {
                    this.fill(componentAndRect.component, componentAndRect.boundingRect);
                }
            }
            _createClass(Polyomino, [ {
                key: "fill",
                value: function fill(component, boundingRect) {
                    var stepX1 = Math.floor(boundingRect.x1 / this.gridStep), stepY1 = Math.floor(boundingRect.y1 / this.gridStep);
                    for (var n = 0; n < component.nodes.length; ++n) {
                        var node = component.nodes[n];
                        var topLeftX = Math.floor(node.x / this.gridStep) - stepX1, topLeftY = Math.floor(node.y / this.gridStep) - stepY1, bottomRightX = Math.floor((node.x + node.width - 1) / this.gridStep) - stepX1, bottomRightY = Math.floor((node.y + node.height - 1) / this.gridStep) - stepY1;
                        for (var _i = topLeftX; _i <= bottomRightX; _i++) {
                            for (var _j = topLeftY; _j <= bottomRightY; _j++) {
                                this.grid[_i][_j] = true;
                            }
                        }
                    }
                    for (var _i2 = 0; _i2 < component.edges.length; ++_i2) {
                        var edge = component.edges[_i2];
                        var p0 = new __WEBPACK_IMPORTED_MODULE_1__common__["a"](edge.startX - boundingRect.x1, edge.startY - boundingRect.y1), p1 = new __WEBPACK_IMPORTED_MODULE_1__common__["a"](edge.endX - boundingRect.x1, edge.endY - boundingRect.y1);
                        var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["c"])({
                            min: p0,
                            max: p1
                        });
                        for (var _j2 = 0; _j2 < points.length; ++_j2) {
                            var point = points[_j2];
                            var indexX = Math.floor(point.x / this.gridStep);
                            var indexY = Math.floor(point.y / this.gridStep);
                            if (indexX >= 0 && indexX < this.stepWidth && indexY >= 0 && indexY < this.stepHeight) {
                                this.grid[indexX][indexY] = true;
                            }
                        }
                    }
                    for (var i = 0; i < this.stepWidth; i++) {
                        for (var j = 0; j < this.stepHeight; j++) {
                            if (this.grid[i][j]) this.numberOfOccupiredCells++;
                        }
                    }
                }
            }, {
                key: "getBoundingRectangle",
                value: function getBoundingRectangle() {
                    var polyx1 = this.location.x - this.center.x;
                    var polyy1 = this.location.y - this.center.y;
                    return new __WEBPACK_IMPORTED_MODULE_1__common__["b"](polyx1, polyy1, polyx1 + this.stepWidth - 1, polyy1 + this.stepHeight - 1);
                }
            }, {
                key: "intoRectangle",
                value: function intoRectangle() {
                    return this.mRect;
                }
            }, {
                key: "contains",
                value: function contains(x, y) {
                    return this.mRect.contains(y, x);
                }
            }, {
                key: "move",
                value: function move(change) {
                    this.location.x += change.x;
                    this.location.y += change.y;
                    this.mRect.x1 += change.x;
                    this.mRect.x2 += change.x;
                    this.mRect.y1 += change.y;
                    this.mRect.y2 += change.y;
                }
            }, {
                key: "set",
                value: function set(position) {
                    this.location.x = position.x;
                    this.location.y = position.y;
                    this.mRect.x1 = position.x;
                    this.mRect.x2 = position.x + this.stepWidth - 1;
                    this.mRect.y1 = position.y;
                    this.mRect.y2 = position.y + this.stepHeight - 1;
                }
            }, {
                key: "x2",
                get: function get() {
                    return this.x1 + this.width - 1;
                }
            }, {
                key: "y2",
                get: function get() {
                    return this.y1 + this.height - 1;
                }
            }, {
                key: "stepX1",
                get: function get() {
                    return Math.floor(this.x1 / this.gridStep);
                }
            }, {
                key: "stepY1",
                get: function get() {
                    return Math.floor(this.y1 / this.gridStep);
                }
            }, {
                key: "stepX2",
                get: function get() {
                    return Math.floor(this.x2 / this.gridStep);
                }
            }, {
                key: "stepY2",
                get: function get() {
                    return Math.floor(this.y2 / this.gridStep);
                }
            }, {
                key: "stepWidth",
                get: function get() {
                    return this.stepX2 - this.stepX1 + 1;
                }
            }, {
                key: "stepHeight",
                get: function get() {
                    return this.stepY2 - this.stepY1 + 1;
                }
            }, {
                key: "gridStepCenter",
                get: function get() {
                    return this.center.diff(this.location);
                }
            }, {
                key: "stepBoundingRectangle",
                get: function get() {
                    return new __WEBPACK_IMPORTED_MODULE_1__common__["b"](this.stepX1, this.stepY1, this.stepX2, this.stepY2);
                }
            } ]);
            return Polyomino;
        }();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            var objectAssign = __webpack_require__(13);
            function compare(a, b) {
                if (a === b) {
                    return 0;
                }
                var x = a.length;
                var y = b.length;
                for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                    if (a[i] !== b[i]) {
                        x = a[i];
                        y = b[i];
                        break;
                    }
                }
                if (x < y) {
                    return -1;
                }
                if (y < x) {
                    return 1;
                }
                return 0;
            }
            function isBuffer(b) {
                if (global.Buffer && typeof global.Buffer.isBuffer === "function") {
                    return global.Buffer.isBuffer(b);
                }
                return !!(b != null && b._isBuffer);
            }
            var util = __webpack_require__(16);
            var hasOwn = Object.prototype.hasOwnProperty;
            var pSlice = Array.prototype.slice;
            var functionsHaveNames = function() {
                return function foo() {}.name === "foo";
            }();
            function pToString(obj) {
                return Object.prototype.toString.call(obj);
            }
            function isView(arrbuf) {
                if (isBuffer(arrbuf)) {
                    return false;
                }
                if (typeof global.ArrayBuffer !== "function") {
                    return false;
                }
                if (typeof ArrayBuffer.isView === "function") {
                    return ArrayBuffer.isView(arrbuf);
                }
                if (!arrbuf) {
                    return false;
                }
                if (arrbuf instanceof DataView) {
                    return true;
                }
                if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
                    return true;
                }
                return false;
            }
            var assert = module.exports = ok;
            var regex = /\s*function\s+([^\(\s]*)\s*/;
            function getName(func) {
                if (!util.isFunction(func)) {
                    return;
                }
                if (functionsHaveNames) {
                    return func.name;
                }
                var str = func.toString();
                var match = str.match(regex);
                return match && match[1];
            }
            assert.AssertionError = function AssertionError(options) {
                this.name = "AssertionError";
                this.actual = options.actual;
                this.expected = options.expected;
                this.operator = options.operator;
                if (options.message) {
                    this.message = options.message;
                    this.generatedMessage = false;
                } else {
                    this.message = getMessage(this);
                    this.generatedMessage = true;
                }
                var stackStartFunction = options.stackStartFunction || fail;
                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, stackStartFunction);
                } else {
                    var err = new Error();
                    if (err.stack) {
                        var out = err.stack;
                        var fn_name = getName(stackStartFunction);
                        var idx = out.indexOf("\n" + fn_name);
                        if (idx >= 0) {
                            var next_line = out.indexOf("\n", idx + 1);
                            out = out.substring(next_line + 1);
                        }
                        this.stack = out;
                    }
                }
            };
            util.inherits(assert.AssertionError, Error);
            function truncate(s, n) {
                if (typeof s === "string") {
                    return s.length < n ? s : s.slice(0, n);
                } else {
                    return s;
                }
            }
            function inspect(something) {
                if (functionsHaveNames || !util.isFunction(something)) {
                    return util.inspect(something);
                }
                var rawname = getName(something);
                var name = rawname ? ": " + rawname : "";
                return "[Function" + name + "]";
            }
            function getMessage(self) {
                return truncate(inspect(self.actual), 128) + " " + self.operator + " " + truncate(inspect(self.expected), 128);
            }
            function fail(actual, expected, message, operator, stackStartFunction) {
                throw new assert.AssertionError({
                    message: message,
                    actual: actual,
                    expected: expected,
                    operator: operator,
                    stackStartFunction: stackStartFunction
                });
            }
            assert.fail = fail;
            function ok(value, message) {
                if (!value) fail(value, true, message, "==", assert.ok);
            }
            assert.ok = ok;
            assert.equal = function equal(actual, expected, message) {
                if (actual != expected) fail(actual, expected, message, "==", assert.equal);
            };
            assert.notEqual = function notEqual(actual, expected, message) {
                if (actual == expected) {
                    fail(actual, expected, message, "!=", assert.notEqual);
                }
            };
            assert.deepEqual = function deepEqual(actual, expected, message) {
                if (!_deepEqual(actual, expected, false)) {
                    fail(actual, expected, message, "deepEqual", assert.deepEqual);
                }
            };
            assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
                if (!_deepEqual(actual, expected, true)) {
                    fail(actual, expected, message, "deepStrictEqual", assert.deepStrictEqual);
                }
            };
            function _deepEqual(actual, expected, strict, memos) {
                if (actual === expected) {
                    return true;
                } else if (isBuffer(actual) && isBuffer(expected)) {
                    return compare(actual, expected) === 0;
                } else if (util.isDate(actual) && util.isDate(expected)) {
                    return actual.getTime() === expected.getTime();
                } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
                    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
                } else if ((actual === null || typeof actual !== "object") && (expected === null || typeof expected !== "object")) {
                    return strict ? actual === expected : actual == expected;
                } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
                    return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;
                } else if (isBuffer(actual) !== isBuffer(expected)) {
                    return false;
                } else {
                    memos = memos || {
                        actual: [],
                        expected: []
                    };
                    var actualIndex = memos.actual.indexOf(actual);
                    if (actualIndex !== -1) {
                        if (actualIndex === memos.expected.indexOf(expected)) {
                            return true;
                        }
                    }
                    memos.actual.push(actual);
                    memos.expected.push(expected);
                    return objEquiv(actual, expected, strict, memos);
                }
            }
            function isArguments(object) {
                return Object.prototype.toString.call(object) == "[object Arguments]";
            }
            function objEquiv(a, b, strict, actualVisitedObjects) {
                if (a === null || a === undefined || b === null || b === undefined) return false;
                if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
                if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
                var aIsArgs = isArguments(a);
                var bIsArgs = isArguments(b);
                if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
                if (aIsArgs) {
                    a = pSlice.call(a);
                    b = pSlice.call(b);
                    return _deepEqual(a, b, strict);
                }
                var ka = objectKeys(a);
                var kb = objectKeys(b);
                var key, i;
                if (ka.length !== kb.length) return false;
                ka.sort();
                kb.sort();
                for (i = ka.length - 1; i >= 0; i--) {
                    if (ka[i] !== kb[i]) return false;
                }
                for (i = ka.length - 1; i >= 0; i--) {
                    key = ka[i];
                    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
                }
                return true;
            }
            assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                if (_deepEqual(actual, expected, false)) {
                    fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
                }
            };
            assert.notDeepStrictEqual = notDeepStrictEqual;
            function notDeepStrictEqual(actual, expected, message) {
                if (_deepEqual(actual, expected, true)) {
                    fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual);
                }
            }
            assert.strictEqual = function strictEqual(actual, expected, message) {
                if (actual !== expected) {
                    fail(actual, expected, message, "===", assert.strictEqual);
                }
            };
            assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                if (actual === expected) {
                    fail(actual, expected, message, "!==", assert.notStrictEqual);
                }
            };
            function expectedException(actual, expected) {
                if (!actual || !expected) {
                    return false;
                }
                if (Object.prototype.toString.call(expected) == "[object RegExp]") {
                    return expected.test(actual);
                }
                try {
                    if (actual instanceof expected) {
                        return true;
                    }
                } catch (e) {}
                if (Error.isPrototypeOf(expected)) {
                    return false;
                }
                return expected.call({}, actual) === true;
            }
            function _tryBlock(block) {
                var error;
                try {
                    block();
                } catch (e) {
                    error = e;
                }
                return error;
            }
            function _throws(shouldThrow, block, expected, message) {
                var actual;
                if (typeof block !== "function") {
                    throw new TypeError('"block" argument must be a function');
                }
                if (typeof expected === "string") {
                    message = expected;
                    expected = null;
                }
                actual = _tryBlock(block);
                message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : ".");
                if (shouldThrow && !actual) {
                    fail(actual, expected, "Missing expected exception" + message);
                }
                var userProvidedMessage = typeof message === "string";
                var isUnwantedException = !shouldThrow && util.isError(actual);
                var isUnexpectedException = !shouldThrow && actual && !expected;
                if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
                    fail(actual, expected, "Got unwanted exception" + message);
                }
                if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
                    throw actual;
                }
            }
            assert.throws = function(block, error, message) {
                _throws(true, block, error, message);
            };
            assert.doesNotThrow = function(block, error, message) {
                _throws(false, block, error, message);
            };
            assert.ifError = function(err) {
                if (err) throw err;
            };
            function strict(value, message) {
                if (!value) fail(value, true, message, "==", strict);
            }
            assert.strict = objectAssign(strict, assert, {
                equal: assert.strictEqual,
                deepEqual: assert.deepStrictEqual,
                notEqual: assert.notStrictEqual,
                notDeepEqual: assert.notDeepStrictEqual
            });
            assert.strict.strict = assert.strict;
            var objectKeys = Object.keys || function(obj) {
                var keys = [];
                for (var key in obj) {
                    if (hasOwn.call(obj, key)) keys.push(key);
                }
                return keys;
            };
        }).call(exports, __webpack_require__(17));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__["a"] = getCenter;
        __webpack_exports__["b"] = getBoundingRectangle;
        __webpack_exports__["c"] = betterLineSupercover;
        var __WEBPACK_IMPORTED_MODULE_0__models_common__ = __webpack_require__(0);
        function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it;
            if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it) o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function e(_e) {
                            throw _e;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = o[Symbol.iterator]();
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function e(_e2) {
                    didErr = true;
                    err = _e2;
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null) it["return"]();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function LineSuperCover(p0, p1) {
            var dx = p1.x - p0.x, dy = p1.y - p0.y;
            var nx = Math.floor(Math.abs(dx)), ny = Math.floor(Math.abs(dy));
            var sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;
            var p = new __WEBPACK_IMPORTED_MODULE_0__models_common__["a"](p0.x, p0.y);
            var points = [ new __WEBPACK_IMPORTED_MODULE_0__models_common__["a"](p.x, p.y) ];
            for (var ix = 0, iy = 0; ix < nx || iy < ny; ) {
                if ((.5 + ix) / nx == (.5 + iy) / ny) {
                    p.x += sign_x;
                    p.y += sign_y;
                    ix++;
                    iy++;
                } else if ((.5 + ix) / nx < (.5 + iy) / ny) {
                    p.x += sign_x;
                    ix++;
                } else {
                    p.y += sign_y;
                    iy++;
                }
                points.push(new __WEBPACK_IMPORTED_MODULE_0__models_common__["a"](p.x, p.y));
            }
            return points;
        }
        function getCenter(components) {
            var bounds = components.flatMap(function(component) {
                return component.nodes;
            }).map(function(node) {
                return {
                    left: node.x,
                    top: node.y,
                    right: node.x + node.width - 1,
                    bottom: node.y + node.height - 1
                };
            }).reduce(function(bounds, currNode) {
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
            return new __WEBPACK_IMPORTED_MODULE_0__models_common__["a"]((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
        }
        function uniqueArray(ar) {
            var j = {};
            var _iterator = _createForOfIteratorHelper(ar), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var v = _step.value;
                    j[v + "::" + _typeof(v)] = v;
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            return Object.keys(j).map(function(v) {
                return j[v];
            });
        }
        function getBoundingRectangle(component) {
            var x1 = Number.MAX_VALUE, x2 = -Number.MAX_VALUE, y1 = Number.MAX_VALUE, y2 = -Number.MAX_VALUE;
            for (var i = 0; i < component.nodes.length; ++i) {
                var node = component.nodes[i];
                if (node.x <= x1) x1 = node.x;
                if (node.y <= y1) y1 = node.y;
                if (node.x + node.width - 1 >= x2) x2 = node.x + node.width - 1;
                if (node.y + node.height - 1 >= y2) y2 = node.y + node.height - 1;
            }
            for (var _i = 0; _i < component.edges.length; ++_i) {
                var edge = component.edges[_i];
                if (edge.startX <= x1) x1 = edge.startX;
                if (edge.startY <= y1) y1 = edge.startY;
                if (edge.endX >= x2) x2 = edge.endX;
                if (edge.endY >= y2) y2 = edge.endY;
            }
            return new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](x1, y1, x2, y2);
        }
        function betterLineSupercover(line) {
            var p = {
                x: line.min.x,
                y: line.min.y
            };
            var points = [ {
                x: p.x,
                y: p.y
            } ];
            var dx = line.max.x - line.min.x, dy = line.max.y - line.min.y, xStep = Math.sign(dx), yStep = Math.sign(dy);
            dx = Math.abs(dx);
            dy = Math.abs(dy);
            var ddx = 2 * dx, ddy = 2 * dy;
            if (ddx >= ddy) {
                var error = dx, errorprev = dx;
                for (var i = 0; i < dx; ++i) {
                    p.x += xStep;
                    error += ddy;
                    if (error > ddx) {
                        p.y += yStep;
                        error -= ddx;
                        if (error + errorprev < ddx) {
                            points.push({
                                x: p.x,
                                y: p.y - yStep
                            });
                        } else if (error + errorprev > ddx) {
                            points.push({
                                x: p.x - xStep,
                                y: p.y
                            });
                        } else {
                            points.push({
                                x: p.x,
                                y: p.y - yStep
                            });
                            points.push({
                                x: p.x - xStep,
                                y: p.y
                            });
                        }
                    }
                    points.push({
                        x: p.x,
                        y: p.y
                    });
                    errorprev = error;
                }
            } else {
                var _error = dy, _errorprev = dy;
                for (var _i2 = 0; _i2 < dy; ++_i2) {
                    p.y += yStep;
                    _error += ddx;
                    if (_error > ddy) {
                        p.x += xStep;
                        _error -= ddy;
                        if (_error + _errorprev < ddy) {
                            points.push({
                                x: p.x - xStep,
                                y: p.y
                            });
                        } else if (_error + _errorprev > ddy) {
                            points.push({
                                x: p.x,
                                y: p.y - yStep
                            });
                        } else {
                            points.push({
                                x: p.x - xStep,
                                y: p.y
                            });
                            points.push({
                                x: p.x,
                                y: p.y - yStep
                            });
                        }
                    }
                    points.push({
                        x: p.y,
                        y: p.y
                    });
                    _errorprev = _error;
                }
            }
            return points;
        }
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return Direction;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CompactionGrid;
        });
        var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
        var __WEBPACK_IMPORTED_MODULE_1__polyomino__ = __webpack_require__(1);
        var __WEBPACK_IMPORTED_MODULE_2_assert__ = __webpack_require__(2);
        var __WEBPACK_IMPORTED_MODULE_2_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_assert__);
        var __WEBPACK_IMPORTED_MODULE_3__collision_strategy__ = __webpack_require__(7);
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it;
            if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it) o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function e(_e) {
                            throw _e;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = o[Symbol.iterator]();
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function e(_e2) {
                    didErr = true;
                    err = _e2;
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null) it["return"]();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var GRID_EMPTY = -1;
        var NONE_ID = Number.NEGATIVE_INFINITY;
        var Direction = {
            LEFT: 0,
            TOP: 1,
            RIGHT: 2,
            BOTTOM: 3
        };
        var CompactionGrid = function() {
            function CompactionGrid(polyominos, gridStep) {
                _classCallCheck(this, CompactionGrid);
                this.polyominos = polyominos;
                this.cache = new Map();
                var boundingRectangle = CompactionGrid.getRoundedBoundingRectangle(polyominos, gridStep);
                this.absoluteBounds = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](boundingRectangle.x1, boundingRectangle.y1, boundingRectangle.x2, boundingRectangle.y2);
                this.compactingBounds = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](boundingRectangle.x1, boundingRectangle.y1, boundingRectangle.x2, boundingRectangle.y2);
                this.collisionStrategy = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__collision_strategy__["a"])(__WEBPACK_IMPORTED_MODULE_3__collision_strategy__["b"].QUAD_TREE, this.polyominos, this.absoluteBounds);
            }
            _createClass(CompactionGrid, [ {
                key: "tryCompact",
                value: function tryCompact(direction) {
                    this.cache.clear();
                    var boundRect;
                    var positionChange;
                    var boundChangeFn;
                    switch (direction) {
                      case Direction.LEFT:
                        boundRect = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](this.compactingBounds.x1, this.compactingBounds.y1, this.compactingBounds.x1, this.compactingBounds.y2);
                        positionChange = {
                            x: 1,
                            y: 0
                        };
                        boundChangeFn = function boundChangeFn(bound) {
                            return bound.x1 += 1;
                        };
                        break;

                      case Direction.TOP:
                        boundRect = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](this.compactingBounds.x1, this.compactingBounds.y1, this.compactingBounds.x2, this.compactingBounds.y1);
                        positionChange = {
                            x: 0,
                            y: 1
                        };
                        boundChangeFn = function boundChangeFn(bound) {
                            return bound.y1 += 1;
                        };
                        break;

                      case Direction.RIGHT:
                        boundRect = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](this.compactingBounds.x2, this.compactingBounds.y1, this.compactingBounds.x2, this.compactingBounds.y2);
                        positionChange = {
                            x: -1,
                            y: 0
                        };
                        boundChangeFn = function boundChangeFn(bound) {
                            return bound.x2 -= 1;
                        };
                        break;

                      case Direction.BOTTOM:
                        boundRect = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](this.compactingBounds.x1, this.compactingBounds.y2, this.compactingBounds.x2, this.compactingBounds.y2);
                        positionChange = {
                            x: 0,
                            y: -1
                        };
                        boundChangeFn = function boundChangeFn(bound) {
                            return bound.y2 -= 1;
                        };
                        break;

                      default:
                        throw new Error("Invalid direction value: ".concat(direction));
                    }
                    var allMovedPolys = new Set();
                    var colliding = this.collisionStrategy.findCollisions(boundRect);
                    for (var i = 0; i < colliding.length; ++i) {
                        var poly = colliding[i];
                        var movedPolys = this.tryMove(poly, direction);
                        if (movedPolys !== undefined) {
                            var _iterator = _createForOfIteratorHelper(movedPolys), _step;
                            try {
                                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                    var p = _step.value;
                                    allMovedPolys.add(p);
                                }
                            } catch (err) {
                                _iterator.e(err);
                            } finally {
                                _iterator.f();
                            }
                        } else {
                            return false;
                        }
                    }
                    var _iterator2 = _createForOfIteratorHelper(allMovedPolys), _step2;
                    try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                            var movedPoly = _step2.value;
                            this.collisionStrategy.move(movedPoly, positionChange);
                        }
                    } catch (err) {
                        _iterator2.e(err);
                    } finally {
                        _iterator2.f();
                    }
                    boundChangeFn(this.compactingBounds);
                    return true;
                }
            }, {
                key: "tryMove",
                value: function tryMove(polyomino, direction) {
                    if (this.cache.has(polyomino)) {
                        return this.cache.get(polyomino);
                    }
                    this.cache.set(polyomino, new Set([ polyomino ]));
                    switch (direction) {
                      case Direction.LEFT:
                        {
                            var movedPolys = new Set();
                            for (var i = 0; i < polyomino.stepHeight; i += 1) {
                                var j = polyomino.stepWidth - 1;
                                while (j >= 0) {
                                    while (j >= 0 && !polyomino.grid[j][i]) {
                                        j -= 1;
                                    }
                                    if (j < 0) {
                                        break;
                                    }
                                    var gridX = polyomino.location.x + j;
                                    var gridY = polyomino.location.y + i;
                                    if (this.compactingBounds.contains(gridY, gridX + 1)) {
                                        var next = this.collisionStrategy.polyominoAt(gridY, gridX + 1);
                                        if (next !== undefined) {
                                            __WEBPACK_IMPORTED_MODULE_2_assert___default()(next !== polyomino, "Call to itself");
                                            var nextTryMove = this.tryMove(next, direction);
                                            if (nextTryMove !== undefined) {
                                                var _iterator3 = _createForOfIteratorHelper(nextTryMove), _step3;
                                                try {
                                                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                                                        var adjacent = _step3.value;
                                                        movedPolys.add(adjacent);
                                                    }
                                                } catch (err) {
                                                    _iterator3.e(err);
                                                } finally {
                                                    _iterator3.f();
                                                }
                                            } else {
                                                this.cache.set(polyomino, undefined);
                                                return undefined;
                                            }
                                        }
                                    } else {
                                        this.cache.set(polyomino, undefined);
                                        return undefined;
                                    }
                                    while (j >= 0 && polyomino.grid[j][i]) {
                                        j -= 1;
                                    }
                                }
                            }
                            movedPolys.add(polyomino);
                            this.cache.set(polyomino, movedPolys);
                            return movedPolys;
                        }

                      case Direction.TOP:
                        {
                            var _movedPolys = new Set();
                            for (var _j = 0; _j < polyomino.stepWidth; _j += 1) {
                                var _i = polyomino.stepHeight - 1;
                                while (_i >= 0) {
                                    while (_i >= 0 && !polyomino.grid[_j][_i]) {
                                        _i -= 1;
                                    }
                                    if (_i < 0) {
                                        break;
                                    }
                                    var _gridX = polyomino.location.x + _j;
                                    var _gridY = polyomino.location.y + _i;
                                    if (this.compactingBounds.contains(_gridY + 1, _gridX)) {
                                        var _next = this.collisionStrategy.polyominoAt(_gridY + 1, _gridX);
                                        if (_next !== undefined) {
                                            if (_next === polyomino) {
                                                throw new Error("Call to itself");
                                            }
                                            var _nextTryMove = this.tryMove(_next, direction);
                                            if (_nextTryMove !== undefined) {
                                                var _iterator4 = _createForOfIteratorHelper(_nextTryMove), _step4;
                                                try {
                                                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                                                        var _adjacent = _step4.value;
                                                        _movedPolys.add(_adjacent);
                                                    }
                                                } catch (err) {
                                                    _iterator4.e(err);
                                                } finally {
                                                    _iterator4.f();
                                                }
                                            } else {
                                                this.cache.set(polyomino, undefined);
                                                return undefined;
                                            }
                                        }
                                    } else {
                                        this.cache.set(polyomino, undefined);
                                        return undefined;
                                    }
                                    while (_i >= 0 && polyomino.grid[_j][_i]) {
                                        _i -= 1;
                                    }
                                }
                            }
                            _movedPolys.add(polyomino);
                            this.cache.set(polyomino, _movedPolys);
                            return _movedPolys;
                        }

                      case Direction.RIGHT:
                        {
                            var _movedPolys2 = new Set();
                            for (var _i2 = 0; _i2 < polyomino.stepHeight; _i2 += 1) {
                                var _j2 = 0;
                                while (_j2 < polyomino.stepWidth) {
                                    while (_j2 <= polyomino.stepWidth - 1 && !polyomino.grid[_j2][_i2]) {
                                        _j2 += 1;
                                    }
                                    if (_j2 > polyomino.stepWidth - 1) {
                                        break;
                                    }
                                    var _gridX2 = polyomino.location.x + _j2;
                                    var _gridY2 = polyomino.location.y + _i2;
                                    if (this.compactingBounds.contains(_gridY2, _gridX2 - 1)) {
                                        var _next2 = this.collisionStrategy.polyominoAt(_gridY2, _gridX2 - 1);
                                        if (_next2 !== undefined) {
                                            if (_next2 === polyomino) {
                                                throw new Error("Call to itself");
                                            }
                                            var _nextTryMove2 = this.tryMove(_next2, direction);
                                            if (_nextTryMove2 !== undefined) {
                                                var _iterator5 = _createForOfIteratorHelper(_nextTryMove2), _step5;
                                                try {
                                                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                                                        var _adjacent2 = _step5.value;
                                                        _movedPolys2.add(_adjacent2);
                                                    }
                                                } catch (err) {
                                                    _iterator5.e(err);
                                                } finally {
                                                    _iterator5.f();
                                                }
                                            } else {
                                                this.cache.set(polyomino, undefined);
                                                return undefined;
                                            }
                                        }
                                    } else {
                                        this.cache.set(polyomino, undefined);
                                        return undefined;
                                    }
                                    while (_j2 <= polyomino.stepWidth - 1 && polyomino.grid[_j2][_i2]) {
                                        _j2 += 1;
                                    }
                                }
                            }
                            _movedPolys2.add(polyomino);
                            this.cache.set(polyomino, _movedPolys2);
                            return _movedPolys2;
                        }

                      case Direction.BOTTOM:
                        {
                            var _movedPolys3 = new Set();
                            for (var _j3 = 0; _j3 < polyomino.stepWidth; _j3 += 1) {
                                var _i3 = 0;
                                while (_i3 < polyomino.stepHeight) {
                                    while (_i3 <= polyomino.stepHeight - 1 && !polyomino.grid[_j3][_i3]) {
                                        _i3 += 1;
                                    }
                                    if (_i3 > polyomino.stepHeight - 1) {
                                        break;
                                    }
                                    var _gridX3 = polyomino.location.x + _j3;
                                    var _gridY3 = polyomino.location.y + _i3;
                                    if (this.compactingBounds.contains(_gridY3 - 1, _gridX3)) {
                                        var _next3 = this.collisionStrategy.polyominoAt(_gridY3 - 1, _gridX3);
                                        if (_next3 !== undefined) {
                                            if (_next3 === polyomino) {
                                                throw new Error("Call to itself");
                                            }
                                            var _nextTryMove3 = this.tryMove(_next3, direction);
                                            if (_nextTryMove3 !== undefined) {
                                                var _iterator6 = _createForOfIteratorHelper(_nextTryMove3), _step6;
                                                try {
                                                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
                                                        var _adjacent3 = _step6.value;
                                                        _movedPolys3.add(_adjacent3);
                                                    }
                                                } catch (err) {
                                                    _iterator6.e(err);
                                                } finally {
                                                    _iterator6.f();
                                                }
                                            } else {
                                                this.cache.set(polyomino, undefined);
                                                return undefined;
                                            }
                                        }
                                    } else {
                                        this.cache.set(polyomino, undefined);
                                        return undefined;
                                    }
                                    while (_i3 <= polyomino.stepHeight - 1 && polyomino.grid[_j3][_i3]) {
                                        _i3 += 1;
                                    }
                                }
                            }
                            _movedPolys3.add(polyomino);
                            this.cache.set(polyomino, _movedPolys3);
                            return _movedPolys3;
                        }

                      default:
                        throw new Error("Invalid direction: ".concat(direction));
                    }
                }
            }, {
                key: "width",
                get: function get() {
                    return this.compactingBounds.x2 - this.compactingBounds.x1 + 1;
                }
            }, {
                key: "height",
                get: function get() {
                    return this.compactingBounds.y2 - this.compactingBounds.y1 + 1;
                }
            } ], [ {
                key: "getRoundedBoundingRectangle",
                value: function getRoundedBoundingRectangle(polyominos, gridStep) {
                    var boundingRectangle = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                    for (var i = 0; i < polyominos.length; ++i) {
                        boundingRectangle.include(polyominos[i].stepBoundingRectangle);
                    }
                    return boundingRectangle;
                }
            } ]);
            return CompactionGrid;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        var __WEBPACK_IMPORTED_MODULE_0__packing__ = __webpack_require__(9);
        var layoutUtilities = function layoutUtilities(cy, options) {
            var instance = {};
            instance.placeHiddenNodes = function(mainEles) {
                mainEles.forEach(function(mainEle) {
                    var hiddenEles = mainEle.neighborhood().nodes(":hidden");
                    hiddenEles.forEach(function(hiddenEle) {
                        var neighbors = hiddenEle.neighborhood().nodes(":visible");
                        if (neighbors.length > 1) {
                            instance.nodeWithMultipleNeighbors(hiddenEle);
                        } else instance.nodeWithOneNeighbor(mainEle, hiddenEle);
                    });
                });
            };
            instance.placeNewNodes = function(eles) {
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
                                curr.forEach(function(ele) {
                                    positionedNeigbors.push(ele);
                                });
                                for (var k = 0; k < neighbors.length; k++) {
                                    if (positioned[components[i].indexOf(neighbors[k])]) {
                                        positionedNeigbors.push(neighbors[k]);
                                    }
                                }
                                if (positionedNeigbors.length > 1) {
                                    instance.nodeWithMultipleNeighbors(components[i][j], positionedNeigbors);
                                } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], components[i][j]); else {
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
            instance.disconnectedNodes = function(components) {
                var leftX = Number.MAX_VALUE;
                var rightX = -Number.MAX_VALUE;
                var topY = Number.MAX_VALUE;
                var bottomY = -Number.MAX_VALUE;
                cy.nodes(":visible").forEach(function(node) {
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
                var centerY = (topY + bottomY) / 2;
                var numOfComponents = components.length;
                var angle = 360 / numOfComponents;
                var count = 1;
                components.forEach(function(component) {
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
                            } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], component[i]); else {
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
            instance.findComponents = function(newEles) {
                var adjListArray = [];
                var current = cy.nodes().difference(newEles);
                newEles.forEach(function(ele) {
                    var neighbors = ele.neighborhood().nodes().difference(current);
                    var listOfIndexes = [];
                    neighbors.forEach(function(neigbor) {
                        var index = newEles.indexOf(neigbor);
                        listOfIndexes.push(index);
                    });
                    adjListArray.push(listOfIndexes);
                });
                var visited = [];
                for (var v = 0; v < newEles.length; v++) {
                    visited.push(false);
                }
                var listOfComponents = [];
                for (var v = 0; v < newEles.length; v++) {
                    var elesOfComponent = [];
                    if (visited[v] == false) {
                        this.DFSUtil(v, visited, adjListArray, newEles, elesOfComponent);
                        listOfComponents.push(elesOfComponent);
                    }
                }
                return listOfComponents;
            };
            instance.DFSUtil = function(v, visited, adjListArray, newEles, elesOfComponent) {
                visited[v] = true;
                elesOfComponent.push(newEles[v]);
                for (var i = 0; i < adjListArray[v].length; i++) {
                    if (!visited[adjListArray[v][i]]) this.DFSUtil(adjListArray[v][i], visited, adjListArray, newEles, elesOfComponent);
                }
            };
            instance.nodeWithOneNeighbor = function(mainEle, hiddenEle) {
                var quadrants = instance.checkOccupiedQuadrants(mainEle, hiddenEle);
                var freeQuadrants = [];
                for (var property in quadrants) {
                    if (quadrants[property] === "free") freeQuadrants.push(property);
                }
                var horizontalMult;
                var verticalMult;
                if (freeQuadrants.length > 0) {
                    if (freeQuadrants.length === 3) {
                        if (freeQuadrants.includes("first") && freeQuadrants.includes("second") && freeQuadrants.includes("third")) {
                            horizontalMult = -1;
                            verticalMult = -1;
                        } else if (freeQuadrants.includes("first") && freeQuadrants.includes("second") && freeQuadrants.includes("fourth")) {
                            horizontalMult = 1;
                            verticalMult = -1;
                        } else if (freeQuadrants.includes("first") && freeQuadrants.includes("third") && freeQuadrants.includes("fourth")) {
                            horizontalMult = 1;
                            verticalMult = 1;
                        } else if (freeQuadrants.includes("second") && freeQuadrants.includes("third") && freeQuadrants.includes("fourth")) {
                            horizontalMult = -1;
                            verticalMult = 1;
                        }
                    } else {
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
                }
                var horizontalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, horizontalMult);
                var verticalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, verticalMult);
                var newCenterX = mainEle.position("x") + horizontalParam;
                var newCenterY = mainEle.position("y") + verticalParam;
                hiddenEle.position("x", newCenterX);
                hiddenEle.position("y", newCenterY);
            };
            instance.nodeWithMultipleNeighbors = function(ele, neighbors) {
                if (neighbors == null) {
                    var neighbors = ele.neighborhood().nodes(":visible");
                }
                var x = 0;
                var y = 0;
                var count = 0;
                neighbors.forEach(function(ele1) {
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
            instance.generateRandom = function(min, max, mult) {
                var val = [ -1, 1 ];
                if (mult === 0) mult = val[Math.floor(Math.random() * val.length)];
                return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
            };
            instance.checkOccupiedQuadrants = function(mainEle, hiddenEles) {
                var visibleEles = mainEle.neighborhood().difference(hiddenEles).nodes();
                var occupiedQuadrants = {
                    first: "free",
                    second: "free",
                    third: "free",
                    fourth: "free"
                };
                visibleEles.forEach(function(ele) {
                    if (ele.data("class") != "compartment" && ele.data("class") != "complex") {
                        if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.second = "occupied"; else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.first = "occupied"; else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.third = "occupied"; else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.fourth = "occupied";
                    }
                });
                return occupiedQuadrants;
            };
            instance.packComponents = function(components) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__packing__["a"])(components, options);
            };
            instance.stepPack = function(components) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__packing__["b"])(components, options);
            };
            return instance;
        };
        __webpack_exports__["default"] = layoutUtilities;
    }, function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        (function() {
            "use strict";
            var layoutUtilities = __webpack_require__(5)["default"];
            var register = function register(cytoscape) {
                if (!cytoscape) {
                    return;
                }
                var options = {
                    idealEdgeLength: 50,
                    offset: 20,
                    desiredAspectRatio: 1,
                    polyominoGridSizeFactor: 1,
                    utilityFunction: 1,
                    componentSpacing: 30,
                    randomize: true
                };
                cytoscape("core", "layoutUtilities", function(opts) {
                    var cy = this;
                    if (opts === "get") {
                        return getScratch(cy).instance;
                    }
                    function extendOptions(out) {
                        out = out || {};
                        for (var i = 1; i < arguments.length; i++) {
                            var obj = arguments[i];
                            if (!obj) continue;
                            for (var key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                    if (Array.isArray(obj[key])) {
                                        out[key] = obj[key].slice();
                                    } else if (_typeof(obj[key]) === "object") {
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
                    }
                    var instance = layoutUtilities(cy, options);
                    getScratch(cy).instance = instance;
                    if (!getScratch(cy).initialized) {
                        getScratch(cy).initialized = true;
                        var shiftKeyDown = false;
                        document.addEventListener("keydown", function(event) {
                            if (event.key == "Shift") {
                                shiftKeyDown = true;
                            }
                        });
                        document.addEventListener("keyup", function(event) {
                            if (event.key == "Shift") {
                                shiftKeyDown = false;
                            }
                        });
                    }
                    return getScratch(cy).instance;
                });
            };
            if (typeof module !== "undefined" && module.exports) {
                module.exports = register;
            }
            if (true) {
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return register;
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
            if (typeof cytoscape !== "undefined") {
                register(cytoscape);
            }
        })();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return CollisionStrategyType;
        });
        __webpack_exports__["a"] = getCollisionStrategy;
        var __WEBPACK_IMPORTED_MODULE_0__polyomino__ = __webpack_require__(1);
        var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(0);
        var __WEBPACK_IMPORTED_MODULE_2__quad_tree_polyomino_quad_tree__ = __webpack_require__(10);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var CollisionStrategyType = {
            NAIVE: "NAIVE",
            QUAD_TREE: "QUAD_TREE",
            COLLISION_GRID: "COLLISION_GRID"
        };
        function getCollisionStrategy(strategy, polyominos, bounds) {
            switch (strategy) {
              case CollisionStrategyType.NAIVE:
                return new NaiveCollisionStrategy(polyominos, bounds);

              case CollisionStrategyType.QUAD_TREE:
                return new QuadTreeStrategy(polyominos, bounds);

              case CollisionStrategyType.COLLISION_GRID:
                return new CollisionGridStrategy(polyominos, bounds);

              default:
                throw new Error("Invalid strategy: ".concat(strategy));
            }
        }
        var NaiveCollisionStrategy = function() {
            function NaiveCollisionStrategy(polyominos, compactingBounds) {
                _classCallCheck(this, NaiveCollisionStrategy);
                this.mPolyominos = polyominos;
                this.mCompactingBounds = compactingBounds;
            }
            _createClass(NaiveCollisionStrategy, [ {
                key: "move",
                value: function move(polyomino, change) {
                    polyomino.move(change);
                }
            }, {
                key: "polyominoAt",
                value: function polyominoAt(y, x) {
                    return this.mCompactingBounds.contains(y, x) ? this.mPolyominos.find(function(p) {
                        return p.contains(x, y) && p.grid[x - p.location.x][y - p.location.y];
                    }) : undefined;
                }
            }, {
                key: "findCollisions",
                value: function findCollisions(rectangle) {
                    var result = [];
                    for (var i = 0; i < this.mPolyominos.length; i += 1) {
                        var poly = this.mPolyominos[i];
                        if (rectangle.intersects(poly.intoRectangle())) {
                            result.push(poly);
                        }
                    }
                    return result;
                }
            } ]);
            return NaiveCollisionStrategy;
        }();
        var QuadTreeStrategy = function() {
            function QuadTreeStrategy(polyominos, bounds) {
                _classCallCheck(this, QuadTreeStrategy);
                this.mPolyominos = polyominos;
                this.mBounds = bounds;
                this.mQuadTree = new __WEBPACK_IMPORTED_MODULE_2__quad_tree_polyomino_quad_tree__["a"](this.mBounds);
                for (var i = 0; i < this.mPolyominos.length; ++i) {
                    var poly = this.mPolyominos[i];
                    this.mQuadTree.add(poly);
                }
            }
            _createClass(QuadTreeStrategy, [ {
                key: "move",
                value: function move(polyomino, change) {
                    this.mQuadTree.move(polyomino, change);
                }
            }, {
                key: "polyominoAt",
                value: function polyominoAt(y, x) {
                    return this.mQuadTree.polyominoAt(y, x);
                }
            }, {
                key: "findCollisions",
                value: function findCollisions(rectangle) {
                    return this.mQuadTree.findCollisions(rectangle);
                }
            } ]);
            return QuadTreeStrategy;
        }();
        var CollisionGridStrategy = function() {
            function CollisionGridStrategy(polyominos, compactingBounds) {
                _classCallCheck(this, CollisionGridStrategy);
                throw new Error("Not Implemented");
            }
            _createClass(CollisionGridStrategy, [ {
                key: "move",
                value: function move(polyomino, change) {
                    throw new Error("Not Implemented");
                }
            }, {
                key: "polyominoAt",
                value: function polyominoAt(x, y) {
                    throw new Error("Not Implemented");
                }
            }, {
                key: "findCollisions",
                value: function findCollisions(rectangle) {
                    throw new Error("Not implemented");
                }
            } ]);
            return CollisionGridStrategy;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Grid;
        });
        var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
        var __WEBPACK_IMPORTED_MODULE_1__polyomino__ = __webpack_require__(1);
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it;
            if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it) o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function e(_e) {
                            throw _e;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = o[Symbol.iterator]();
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function e(_e2) {
                    didErr = true;
                    err = _e2;
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null) it["return"]();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var Grid = function() {
            function Grid(width, height, step) {
                var _this = this;
                _classCallCheck(this, Grid);
                this.width = width;
                this.height = height;
                this.step = step;
                this.grid = Array.from({
                    length: this.stepWidth
                }, function(_) {
                    return Array.from({
                        length: _this.stepHeight
                    }, function(_) {
                        return new __WEBPACK_IMPORTED_MODULE_0__common__["c"](false, false);
                    });
                });
                this.center = new __WEBPACK_IMPORTED_MODULE_0__common__["a"](Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
                this.occupiedRectangle = new __WEBPACK_IMPORTED_MODULE_0__common__["b"](Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                this.numberOfOccupiredCells = 0;
            }
            _createClass(Grid, [ {
                key: "getDirectNeighbors",
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
                        var _iterator = _createForOfIteratorHelper(cells), _step;
                        try {
                            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                var cell = _step.value;
                                resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x, cell.y));
                            }
                        } catch (err) {
                            _iterator.e(err);
                        } finally {
                            _iterator.f();
                        }
                    }
                    return resultPoints;
                }
            }, {
                key: "getCellNeighbors",
                value: function getCellNeighbors(i, j) {
                    var resultPoints = [];
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
            }, {
                key: "placePolyomino",
                value: function placePolyomino(polyomino, i, j) {
                    polyomino.location.x = i;
                    polyomino.location.y = j;
                    for (var k = 0; k < polyomino.stepWidth; k++) {
                        for (var l = 0; l < polyomino.stepHeight; l++) {
                            if (polyomino.grid[k][l]) {
                                this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied = true;
                            }
                        }
                    }
                    this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;
                    this.updateBounds(polyomino);
                    for (var x = 0; x < this.stepWidth; x++) {
                        for (var y = 0; y < this.stepHeight; y++) {
                            this.grid[x][y].visited = false;
                        }
                    }
                }
            }, {
                key: "updateBounds",
                value: function updateBounds(polyomino) {
                    var polyRect = polyomino.getBoundingRectangle();
                    this.occupiedRectangle.x1 = Math.min(this.occupiedRectangle.x1, polyRect.x1);
                    this.occupiedRectangle.x2 = Math.max(this.occupiedRectangle.x2, polyRect.x2);
                    this.occupiedRectangle.y1 = Math.min(this.occupiedRectangle.y1, polyRect.y1);
                    this.occupiedRectangle.y2 = Math.max(this.occupiedRectangle.y2, polyRect.y2);
                }
            }, {
                key: "tryPlacingPolyomino",
                value: function tryPlacingPolyomino(polyomino, i, j) {
                    for (var k = 0; k < polyomino.stepWidth; k++) {
                        for (var l = 0; l < polyomino.stepHeight; l++) {
                            if (k - polyomino.center.x + i >= this.stepWidth || k - polyomino.center.x + i < 0 || l - polyomino.center.y + j >= this.stepHeight || l - polyomino.center.y + j < 0) {
                                return false;
                            }
                            if (polyomino.grid[k][l] && this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
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
                        adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * (width / desiredAspectRatio));
                    } else {
                        adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (height * desiredAspectRatio * height);
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
            }, {
                key: "stepHeight",
                get: function get() {
                    return Math.floor(this.height / this.step) + 1;
                }
            } ]);
            return Grid;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__["a"] = pack;
        __webpack_exports__["b"] = incrementalSinglePack;
        var __WEBPACK_IMPORTED_MODULE_0__general_utils__ = __webpack_require__(3);
        var __WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__ = __webpack_require__(4);
        var __WEBPACK_IMPORTED_MODULE_2__models_polyomino__ = __webpack_require__(1);
        var __WEBPACK_IMPORTED_MODULE_3__models_grid__ = __webpack_require__(8);
        function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                if (enumerableOnly) symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
                keys.push.apply(keys, symbols);
            }
            return keys;
        }
        function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? arguments[i] : {};
                if (i % 2) {
                    ownKeys(Object(source), true).forEach(function(key) {
                        _defineProperty(target, key, source[key]);
                    });
                } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                } else {
                    ownKeys(Object(source)).forEach(function(key) {
                        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    });
                }
            }
            return target;
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it;
            if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it) o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function e(_e) {
                            throw _e;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = o[Symbol.iterator]();
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function e(_e2) {
                    didErr = true;
                    err = _e2;
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null) it["return"]();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function pack(components, options) {
            if (options.randomize) {
                return nonIncrementalPack(components, options);
            } else {
                return incrementalPack(components, options);
            }
        }
        function nonIncrementalPack(components, options) {
            var currentCenter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["a"])(components);
            var gridStep = calculateGridStep(components, options);
            if (options.componentSpacing > 0) {
                var spacingAmount = options.componentSpacing;
                addSpacing(components, spacingAmount);
            }
            var _createPolyominos = createPolyominos(components, gridStep), polyominos = _createPolyominos.polyominos, gridWidth = _createPolyominos.gridWidth, gridHeight = _createPolyominos.gridHeight;
            polyominos.sort(function(a, b) {
                var aSize = a.stepWidth * a.stepHeight;
                var bSize = b.stepWidth * b.stepHeight;
                if (aSize > bSize) {
                    return -1;
                } else if (aSize < bSize) {
                    return 1;
                } else {
                    return 0;
                }
            });
            var mainGrid = new __WEBPACK_IMPORTED_MODULE_3__models_grid__["a"](gridWidth * 2 + gridStep, gridHeight * 2 + gridStep, gridStep);
            mainGrid.placePolyomino(polyominos[0], mainGrid.center.x, mainGrid.center.y);
            for (var i = 1; i < polyominos.length; i++) {
                var fullnessMax = 0;
                var adjustedFullnessMax = 0;
                var weigthFullnessAspectRatio = 0;
                var minAspectRatioDiff = 1e6;
                var placementFound = false;
                var cells = [];
                var resultLocation = {
                    x: 0,
                    y: 0
                };
                while (!placementFound) {
                    cells = mainGrid.getDirectNeighbors(cells, Math.ceil(Math.max(polyominos[i].stepWidth, polyominos[i].stepHeight) / 2));
                    var _iterator = _createForOfIteratorHelper(cells), _step;
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                            var cell = _step.value;
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
                        }
                    } catch (err) {
                        _iterator.e(err);
                    } finally {
                        _iterator.f();
                    }
                }
                mainGrid.placePolyomino(polyominos[i], resultLocation.x, resultLocation.y);
            }
            polyominos.sort(function(a, b) {
                if (a.index < b.index) {
                    return -1;
                } else if (a.index > b.index) {
                    return 1;
                } else {
                    return 0;
                }
            });
            var shifts = [];
            var _iterator2 = _createForOfIteratorHelper(polyominos), _step2;
            try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                    var pol = _step2.value;
                    var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;
                    var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;
                    shifts.push({
                        dx: dx,
                        dy: dy
                    });
                }
            } catch (err) {
                _iterator2.e(err);
            } finally {
                _iterator2.f();
            }
            var packingCenter = calculatePackingCenter(components, shifts);
            var centerShift = packingCenter.diff(currentCenter);
            for (var _i = 0, _shifts = shifts; _i < _shifts.length; _i++) {
                var shift = _shifts[_i];
                shift.dx += centerShift.x;
                shift.dy += centerShift.y;
            }
            var stats = calculateStatistics(mainGrid, options.desiredAspectRatio);
            var packingResult = _objectSpread({
                shifts: shifts
            }, stats);
            return packingResult;
        }
        function incrementalPack(components, options) {
            var gridStep = calculateGridStep(components, options);
            console.log("gridStep: ".concat(gridStep));
            if (options.componentSpacing > 0) {
                var spacingAmount = options.componentSpacing;
                addSpacing(components, spacingAmount);
            }
            var _createPolyominos2 = createPolyominos(components, gridStep), polyominos = _createPolyominos2.polyominos;
            return incrementalPackImpl(polyominos, gridStep);
        }
        function incrementalPackImpl(polyominos, gridStep) {
            var compactionGrid = new __WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__["a"](polyominos, gridStep);
            {
                var directions = Object.values(__WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__["b"]);
                var compacted = [];
                for (var i = 0; i < directions.length; ++i) {
                    var dir = directions[i];
                    compacted[dir] = true;
                }
                while (compacted.some(function(b) {
                    return b;
                })) {
                    for (var _i2 = 0; _i2 < directions.length; ++_i2) {
                        var _dir = directions[_i2];
                        compacted[_dir] = compactionGrid.tryCompact(_dir);
                    }
                }
            }
            var shifts = polyominos.map(function(p) {
                return {
                    dx: (p.location.x - p.stepX1) * gridStep,
                    dy: (p.location.y - p.stepY1) * gridStep
                };
            });
            return {
                shifts: shifts
            };
        }
        function incrementalSinglePack(components, options) {
            var gridStep = calculateGridStep(components, options);
            if (options.componentSpacing > 0) {
                var spacingAmount = options.componentSpacing;
                addSpacing(components, spacingAmount);
            }
            var _createPolyominos3 = createPolyominos(components, gridStep), polyominos = _createPolyominos3.polyominos;
            var compactionGrid = new __WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__["a"](polyominos, gridStep);
            var dir = __WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__["b"].LEFT;
            var func = function func() {
                dir += 1;
                dir %= Object.values(__WEBPACK_IMPORTED_MODULE_1__models_compaction_compaction_grid__["b"]).length;
                var didCompact = compactionGrid.tryCompact(dir);
                if (didCompact) {
                    var shifts = polyominos.map(function(p) {
                        return {
                            dx: (p.location.x - p.stepX1) * gridStep,
                            dy: (p.location.y - p.stepY1) * gridStep
                        };
                    });
                    for (var i = 0; i < polyominos.length; ++i) {
                        var poly = polyominos[i];
                        poly.x1 += shifts[i].dx;
                        poly.y1 += shifts[i].dy;
                    }
                    return {
                        shifts: shifts
                    };
                } else {
                    return null;
                }
            };
            return func;
        }
        function calculatePackingCenter(components, shifts) {
            for (var i = 0; i < components.length; ++i) {
                var component = components[i];
                for (var j = 0; j < component.nodes.length; ++j) {
                    var node = component.nodes[j];
                    node.x += shifts[i].dx;
                    node.y += shifts[i].dy;
                }
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["a"])(components);
        }
        function calculateGridStep(components, options) {
            var gridStep = 0;
            var totalNodes = 0;
            for (var i = 0; i < components.length; ++i) {
                var component = components[i];
                totalNodes += component.nodes.length;
                gridStep += component.nodes.reduce(function(gridStep, node) {
                    return gridStep + node.width + node.height;
                }, 0);
            }
            gridStep = gridStep / (2 * totalNodes);
            gridStep = Math.floor(gridStep * options.polyominoGridSizeFactor);
            return gridStep;
        }
        function addSpacing(components, spacingAmount) {
            for (var i = 0; i < components.length; ++i) {
                var component = components[i];
                for (var j = 0; j < component.nodes.length; ++j) {
                    var node = component.nodes[j];
                    node.x = node.x - spacingAmount;
                    node.y = node.y - spacingAmount;
                    node.width = node.width + 2 * spacingAmount;
                    node.height = node.height + 2 * spacingAmount;
                }
            }
        }
        function createPolyominos(components, gridStep) {
            var polyominos = [];
            var gridWidth = 0, gridHeight = 0;
            for (var i = 0; i < components.length; ++i) {
                var component = components[i];
                var boundingRect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__general_utils__["b"])(component);
                var componentWidth = boundingRect.width;
                var componentHeight = boundingRect.height;
                gridWidth += componentWidth;
                gridHeight += componentHeight;
                var componentPolyomino = new __WEBPACK_IMPORTED_MODULE_2__models_polyomino__["a"](boundingRect.x1, boundingRect.y1, componentWidth, componentHeight, gridStep, i, {
                    component: component,
                    boundingRect: boundingRect
                });
                polyominos.push(componentPolyomino);
            }
            return {
                polyominos: polyominos,
                gridWidth: gridWidth,
                gridHeight: gridHeight
            };
        }
        function calculateStatistics(mainGrid, desiredAspectRatio) {
            var aspectRatio = Math.round((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1) * 100) / 100;
            var fullness = Math.round(mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 100 * 100) / 100;
            var adjustedFullness;
            if (aspectRatio > desiredAspectRatio) {
                var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
                adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridWidth * (mainGridWidth / desiredAspectRatio)) * 100 * 100) / 100;
            } else {
                var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
                adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridheight * desiredAspectRatio * mainGridheight) * 100 * 100) / 100;
            }
            return {
                aspectRatio: aspectRatio,
                fullness: fullness,
                adjustedFullness: adjustedFullness
            };
        }
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return PolyominoQuadTree;
        });
        var __WEBPACK_IMPORTED_MODULE_0__quad_tree__ = __webpack_require__(11);
        var __WEBPACK_IMPORTED_MODULE_1__models_polyomino__ = __webpack_require__(1);
        function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
            };
            return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget);
                } else {
                    result = Super.apply(this, arguments);
                }
                return _possibleConstructorReturn(this, result);
            };
        }
        function _possibleConstructorReturn(self, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call;
            }
            return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self;
        }
        function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
                Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
                return true;
            } catch (e) {
                return false;
            }
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            };
            return _getPrototypeOf(o);
        }
        var PolyominoQuadTree = function(_QuadTree) {
            _inherits(PolyominoQuadTree, _QuadTree);
            var _super = _createSuper(PolyominoQuadTree);
            function PolyominoQuadTree() {
                _classCallCheck(this, PolyominoQuadTree);
                return _super.apply(this, arguments);
            }
            _createClass(PolyominoQuadTree, [ {
                key: "polyominoAt",
                value: function polyominoAt(y, x) {
                    return polyominoAtImpl(this.mRoot, y, x);
                }
            } ]);
            return PolyominoQuadTree;
        }(__WEBPACK_IMPORTED_MODULE_0__quad_tree__["a"]);
        function polyominoAtImpl(node, y, x) {
            var values = node.mValues;
            var length = values.length;
            for (var i = 0; i < length; ++i) {
                var poly = values[i];
                if (poly.intoRectangle().contains(y, x) && poly.grid[x - poly.location.x][y - poly.location.y]) {
                    return poly;
                }
            }
            if (!node.isLeaf) {
                for (var _i = 0; _i < node.mChildren.length; ++_i) {
                    var child = node.mChildren[_i];
                    if (child.mRectangle.contains(y, x)) {
                        var result = polyominoAtImpl(child, y, x);
                        if (result !== undefined) {
                            return result;
                        }
                    }
                }
            }
            return undefined;
        }
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return QuadTree;
        });
        var __WEBPACK_IMPORTED_MODULE_0__models_common__ = __webpack_require__(0);
        var __WEBPACK_IMPORTED_MODULE_1_assert__ = __webpack_require__(2);
        var __WEBPACK_IMPORTED_MODULE_1_assert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_assert__);
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _iterableToArrayLimit(arr, i) {
            if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"] != null) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it;
            if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                    if (it) o = it;
                    var i = 0;
                    var F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function e(_e2) {
                            throw _e2;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var normalCompletion = true, didErr = false, err;
            return {
                s: function s() {
                    it = o[Symbol.iterator]();
                },
                n: function n() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function e(_e3) {
                    didErr = true;
                    err = _e3;
                },
                f: function f() {
                    try {
                        if (!normalCompletion && it["return"] != null) it["return"]();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var Quadrant = {
            NW: 0,
            NE: 1,
            SW: 2,
            SE: 3
        };
        var THRESHOLD = 16;
        var MAX_DEPTH = 8;
        var QuadTree = function() {
            function QuadTree(area) {
                _classCallCheck(this, QuadTree);
                this.mRoot = new Node(area);
            }
            _createClass(QuadTree, [ {
                key: "add",
                value: function add(value) {
                    this.mRoot.add(value, 0);
                }
            }, {
                key: "remove",
                value: function remove(value) {
                    this.mRoot.remove(value);
                }
            }, {
                key: "findCollisions",
                value: function findCollisions(rectangle) {
                    var collisions = [];
                    this.mRoot.findCollisions(rectangle, collisions);
                    return collisions;
                }
            }, {
                key: "findCollisionsPoint",
                value: function findCollisionsPoint(point) {
                    var collisions = [];
                    this.mRoot.findCollisions(new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](point.x, point.y, point.x, point.y), collisions);
                    return collisions;
                }
            }, {
                key: "move",
                value: function move(value, change) {
                    this.mRoot.remove(value);
                    value.move(change);
                    this.mRoot.add(value, 0);
                    return true;
                }
            }, {
                key: "depth",
                get: function get() {
                    return this.mRoot.depth;
                }
            }, {
                key: "root",
                get: function get() {
                    return this.mRoot;
                }
            } ]);
            return QuadTree;
        }();
        var Node = function() {
            function Node(rectangle) {
                _classCallCheck(this, Node);
                this.mRectangle = rectangle;
                this.mChildren = [];
                this.mValues = [];
            }
            _createClass(Node, [ {
                key: "add",
                value: function add(value, depth) {
                    var boundingRectangle = value.intoRectangle();
                    if (this.isLeaf) {
                        if (depth >= MAX_DEPTH || this.mValues.length < THRESHOLD) {
                            this.mValues.push(value);
                        } else {
                            this.split();
                            this.add(value, depth);
                        }
                    } else {
                        var quad = this.getQuadrant(boundingRectangle);
                        if (quad !== null) {
                            this.getChild(quad).add(value, depth + 1);
                        } else {
                            this.mValues.push(value);
                        }
                    }
                }
            }, {
                key: "remove",
                value: function remove(value) {
                    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                    var boundingRectangle = value.intoRectangle();
                    if (this.isLeaf) {
                        this.removeValue(value);
                        if (parent !== null) {
                            parent.tryMerge();
                        }
                    } else {
                        var quad = this.getQuadrant(boundingRectangle);
                        if (quad !== null) {
                            this.mChildren[quad].remove(value, this);
                        } else {
                            this.removeValue(value);
                        }
                    }
                }
            }, {
                key: "removeValue",
                value: function removeValue(value) {
                    var index = this.mValues.findIndex(function(v) {
                        return v === value;
                    });
                    __WEBPACK_IMPORTED_MODULE_1_assert___default()(index !== -1, "Value ".concat(value, " is not present in this node"));
                    {
                        var lastIndex = this.mValues.length - 1;
                        var temp = this.mValues[index];
                        this.mValues[index] = this.mValues[lastIndex];
                        this.mValues[lastIndex] = temp;
                    }
                    this.mValues.pop();
                }
            }, {
                key: "tryMerge",
                value: function tryMerge() {
                    var totalValues = this.mValues.length;
                    var children = this.mChildren;
                    for (var i = 0; i < children.length; ++i) {
                        var child = children[i];
                        if (!child.isLeaf) {
                            return false;
                        } else {
                            totalValues += child.mValues.length;
                        }
                    }
                    if (totalValues <= THRESHOLD) {
                        for (var _i = 0; _i < children.length; ++_i) {
                            var _child = children[_i];
                            for (var j = 0; j < _child.mValues.length; ++j) {
                                this.mValues.push(_child.mValues[j]);
                            }
                            _child.mValues = [];
                        }
                        this.mChildren = [];
                    }
                    return true;
                }
            }, {
                key: "findCollisions",
                value: function findCollisions(rectangle, collisions) {
                    var values = this.mValues;
                    for (var i = 0; i < values.length; ++i) {
                        var value = values[i];
                        if (rectangle.intersects(value.intoRectangle())) {
                            collisions.push(value);
                        }
                    }
                    if (!this.isLeaf) {
                        var children = this.mChildren;
                        for (var _i2 = 0; _i2 < children.length; ++_i2) {
                            var child = children[_i2];
                            if (rectangle.intersects(child.mRectangle)) {
                                child.findCollisions(rectangle, collisions);
                            }
                        }
                    }
                }
            }, {
                key: "getQuadrant",
                value: function getQuadrant(rectangle) {
                    var center = this.mRectangle.absoluteCenter;
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
            }, {
                key: "split",
                value: function split() {
                    for (var i = 0; i < Node.CHILDREN_COUNT; i += 1) {
                        this.mChildren.push(new Node(this.getSubArea(i)));
                    }
                    var oldValues = this.mValues;
                    var newValues = [];
                    for (var _i3 = 0; _i3 < oldValues.length; ++_i3) {
                        var value = oldValues[_i3];
                        var quad = this.getQuadrant(value.intoRectangle());
                        if (quad !== null) {
                            this.mChildren[quad].mValues.push(value);
                        } else {
                            newValues.push(value);
                        }
                    }
                    this.mValues = newValues;
                }
            }, {
                key: "getChild",
                value: function getChild(quadrant) {
                    if (quadrant in Object.values(Quadrant)) {
                        return this.mChildren[quadrant];
                    } else {
                        throw new Error("Invalid quadrant: ".concat(quadrant));
                    }
                }
            }, {
                key: "getSubArea",
                value: function getSubArea(quadrant) {
                    var center = this.mRectangle.absoluteCenter;
                    switch (quadrant) {
                      case Quadrant.NW:
                        return new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](this.mRectangle.x1, this.mRectangle.y1, center.x, center.y);

                      case Quadrant.NE:
                        return new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](center.x, this.mRectangle.y1, this.mRectangle.x2, center.y);

                      case Quadrant.SW:
                        return new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](this.mRectangle.x1, center.y, center.x, this.mRectangle.y2);

                      case Quadrant.SE:
                        return new __WEBPACK_IMPORTED_MODULE_0__models_common__["b"](center.x, center.y, this.mRectangle.x2, this.mRectangle.y2);

                      default:
                        throw new Error("Invalid subarea value: ".concat(quadrant));
                    }
                }
            }, {
                key: "print",
                value: function print(depth) {
                    console.log("Node ".concat(JSON.stringify(this.mRectangle), " (Depth ").concat(depth, ")"));
                    console.log("Root values: ".concat(this.mValues));
                    var _iterator = _createForOfIteratorHelper(this.mChildren.entries()), _step;
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                            var _step$value = _slicedToArray(_step.value, 2), i = _step$value[0], child = _step$value[1];
                            console.log("Child ".concat(i));
                            child.print(depth + 1);
                        }
                    } catch (err) {
                        _iterator.e(err);
                    } finally {
                        _iterator.f();
                    }
                    console.log("End Node ".concat(JSON.stringify(this.mRectangle), "===================="));
                }
            }, {
                key: "isLeaf",
                get: function get() {
                    return this.mChildren.length === 0;
                }
            }, {
                key: "depth",
                get: function get() {
                    if (this.isLeaf) {
                        return 1;
                    } else {
                        return this.mChildren.map(function(c) {
                            return c.depth;
                        }).reduce(function(maxDepth, depth) {
                            return Math.max(maxDepth, depth);
                        }, 0) + 1;
                    }
                }
            } ]);
            return Node;
        }();
        Node.CHILDREN_COUNT = Object.values(Quadrant).length;
    }, function(module, exports) {
        if (typeof Object.create === "function") {
            module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            };
        } else {
            module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = function() {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
            };
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        function toObject(val) {
            if (val === null || val === undefined) {
                throw new TypeError("Object.assign cannot be called with null or undefined");
            }
            return Object(val);
        }
        function shouldUseNative() {
            try {
                if (!Object.assign) {
                    return false;
                }
                var test1 = new String("abc");
                test1[5] = "de";
                if (Object.getOwnPropertyNames(test1)[0] === "5") {
                    return false;
                }
                var test2 = {};
                for (var i = 0; i < 10; i++) {
                    test2["_" + String.fromCharCode(i)] = i;
                }
                var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                    return test2[n];
                });
                if (order2.join("") !== "0123456789") {
                    return false;
                }
                var test3 = {};
                "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                    test3[letter] = letter;
                });
                if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                    return false;
                }
                return true;
            } catch (err) {
                return false;
            }
        }
        module.exports = shouldUseNative() ? Object.assign : function(target, source) {
            var from;
            var to = toObject(target);
            var symbols;
            for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);
                for (var key in from) {
                    if (hasOwnProperty.call(from, key)) {
                        to[key] = from[key];
                    }
                }
                if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) {
                        if (propIsEnumerable.call(from, symbols[i])) {
                            to[symbols[i]] = from[symbols[i]];
                        }
                    }
                }
            }
            return to;
        };
    }, function(module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        (function() {
            try {
                if (typeof setTimeout === "function") {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === "function") {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        })();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
            return [];
        };
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, function(module, exports) {
        module.exports = function isBuffer(arg) {
            return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
        };
    }, function(module, exports, __webpack_require__) {
        (function(process) {
            var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
                var keys = Object.keys(obj);
                var descriptors = {};
                for (var i = 0; i < keys.length; i++) {
                    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
                }
                return descriptors;
            };
            var formatRegExp = /%[sdj%]/g;
            exports.format = function(f) {
                if (!isString(f)) {
                    var objects = [];
                    for (var i = 0; i < arguments.length; i++) {
                        objects.push(inspect(arguments[i]));
                    }
                    return objects.join(" ");
                }
                var i = 1;
                var args = arguments;
                var len = args.length;
                var str = String(f).replace(formatRegExp, function(x) {
                    if (x === "%%") return "%";
                    if (i >= len) return x;
                    switch (x) {
                      case "%s":
                        return String(args[i++]);

                      case "%d":
                        return Number(args[i++]);

                      case "%j":
                        try {
                            return JSON.stringify(args[i++]);
                        } catch (_) {
                            return "[Circular]";
                        }

                      default:
                        return x;
                    }
                });
                for (var x = args[i]; i < len; x = args[++i]) {
                    if (isNull(x) || !isObject(x)) {
                        str += " " + x;
                    } else {
                        str += " " + inspect(x);
                    }
                }
                return str;
            };
            exports.deprecate = function(fn, msg) {
                if (typeof process !== "undefined" && process.noDeprecation === true) {
                    return fn;
                }
                if (typeof process === "undefined") {
                    return function() {
                        return exports.deprecate(fn, msg).apply(this, arguments);
                    };
                }
                var warned = false;
                function deprecated() {
                    if (!warned) {
                        if (process.throwDeprecation) {
                            throw new Error(msg);
                        } else if (process.traceDeprecation) {
                            console.trace(msg);
                        } else {
                            console.error(msg);
                        }
                        warned = true;
                    }
                    return fn.apply(this, arguments);
                }
                return deprecated;
            };
            var debugs = {};
            var debugEnviron;
            exports.debuglog = function(set) {
                if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || "";
                set = set.toUpperCase();
                if (!debugs[set]) {
                    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
                        var pid = process.pid;
                        debugs[set] = function() {
                            var msg = exports.format.apply(exports, arguments);
                            console.error("%s %d: %s", set, pid, msg);
                        };
                    } else {
                        debugs[set] = function() {};
                    }
                }
                return debugs[set];
            };
            function inspect(obj, opts) {
                var ctx = {
                    seen: [],
                    stylize: stylizeNoColor
                };
                if (arguments.length >= 3) ctx.depth = arguments[2];
                if (arguments.length >= 4) ctx.colors = arguments[3];
                if (isBoolean(opts)) {
                    ctx.showHidden = opts;
                } else if (opts) {
                    exports._extend(ctx, opts);
                }
                if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
                if (isUndefined(ctx.depth)) ctx.depth = 2;
                if (isUndefined(ctx.colors)) ctx.colors = false;
                if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
                if (ctx.colors) ctx.stylize = stylizeWithColor;
                return formatValue(ctx, obj, ctx.depth);
            }
            exports.inspect = inspect;
            inspect.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            };
            inspect.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            };
            function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];
                if (style) {
                    return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m";
                } else {
                    return str;
                }
            }
            function stylizeNoColor(str, styleType) {
                return str;
            }
            function arrayToHash(array) {
                var hash = {};
                array.forEach(function(val, idx) {
                    hash[val] = true;
                });
                return hash;
            }
            function formatValue(ctx, value, recurseTimes) {
                if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
                    var ret = value.inspect(recurseTimes, ctx);
                    if (!isString(ret)) {
                        ret = formatValue(ctx, ret, recurseTimes);
                    }
                    return ret;
                }
                var primitive = formatPrimitive(ctx, value);
                if (primitive) {
                    return primitive;
                }
                var keys = Object.keys(value);
                var visibleKeys = arrayToHash(keys);
                if (ctx.showHidden) {
                    keys = Object.getOwnPropertyNames(value);
                }
                if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
                    return formatError(value);
                }
                if (keys.length === 0) {
                    if (isFunction(value)) {
                        var name = value.name ? ": " + value.name : "";
                        return ctx.stylize("[Function" + name + "]", "special");
                    }
                    if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                    }
                    if (isDate(value)) {
                        return ctx.stylize(Date.prototype.toString.call(value), "date");
                    }
                    if (isError(value)) {
                        return formatError(value);
                    }
                }
                var base = "", array = false, braces = [ "{", "}" ];
                if (isArray(value)) {
                    array = true;
                    braces = [ "[", "]" ];
                }
                if (isFunction(value)) {
                    var n = value.name ? ": " + value.name : "";
                    base = " [Function" + n + "]";
                }
                if (isRegExp(value)) {
                    base = " " + RegExp.prototype.toString.call(value);
                }
                if (isDate(value)) {
                    base = " " + Date.prototype.toUTCString.call(value);
                }
                if (isError(value)) {
                    base = " " + formatError(value);
                }
                if (keys.length === 0 && (!array || value.length == 0)) {
                    return braces[0] + base + braces[1];
                }
                if (recurseTimes < 0) {
                    if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                    } else {
                        return ctx.stylize("[Object]", "special");
                    }
                }
                ctx.seen.push(value);
                var output;
                if (array) {
                    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                } else {
                    output = keys.map(function(key) {
                        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                    });
                }
                ctx.seen.pop();
                return reduceToSingleString(output, base, braces);
            }
            function formatPrimitive(ctx, value) {
                if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
                if (isString(value)) {
                    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return ctx.stylize(simple, "string");
                }
                if (isNumber(value)) return ctx.stylize("" + value, "number");
                if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
                if (isNull(value)) return ctx.stylize("null", "null");
            }
            function formatError(value) {
                return "[" + Error.prototype.toString.call(value) + "]";
            }
            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                var output = [];
                for (var i = 0, l = value.length; i < l; ++i) {
                    if (hasOwnProperty(value, String(i))) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
                    } else {
                        output.push("");
                    }
                }
                keys.forEach(function(key) {
                    if (!key.match(/^\d+$/)) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
                    }
                });
                return output;
            }
            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                desc = Object.getOwnPropertyDescriptor(value, key) || {
                    value: value[key]
                };
                if (desc.get) {
                    if (desc.set) {
                        str = ctx.stylize("[Getter/Setter]", "special");
                    } else {
                        str = ctx.stylize("[Getter]", "special");
                    }
                } else {
                    if (desc.set) {
                        str = ctx.stylize("[Setter]", "special");
                    }
                }
                if (!hasOwnProperty(visibleKeys, key)) {
                    name = "[" + key + "]";
                }
                if (!str) {
                    if (ctx.seen.indexOf(desc.value) < 0) {
                        if (isNull(recurseTimes)) {
                            str = formatValue(ctx, desc.value, null);
                        } else {
                            str = formatValue(ctx, desc.value, recurseTimes - 1);
                        }
                        if (str.indexOf("\n") > -1) {
                            if (array) {
                                str = str.split("\n").map(function(line) {
                                    return "  " + line;
                                }).join("\n").substr(2);
                            } else {
                                str = "\n" + str.split("\n").map(function(line) {
                                    return "   " + line;
                                }).join("\n");
                            }
                        }
                    } else {
                        str = ctx.stylize("[Circular]", "special");
                    }
                }
                if (isUndefined(name)) {
                    if (array && key.match(/^\d+$/)) {
                        return str;
                    }
                    name = JSON.stringify("" + key);
                    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                        name = name.substr(1, name.length - 2);
                        name = ctx.stylize(name, "name");
                    } else {
                        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                        name = ctx.stylize(name, "string");
                    }
                }
                return name + ": " + str;
            }
            function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0;
                var length = output.reduce(function(prev, cur) {
                    numLinesEst++;
                    if (cur.indexOf("\n") >= 0) numLinesEst++;
                    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0);
                if (length > 60) {
                    return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
                }
                return braces[0] + base + " " + output.join(", ") + " " + braces[1];
            }
            function isArray(ar) {
                return Array.isArray(ar);
            }
            exports.isArray = isArray;
            function isBoolean(arg) {
                return typeof arg === "boolean";
            }
            exports.isBoolean = isBoolean;
            function isNull(arg) {
                return arg === null;
            }
            exports.isNull = isNull;
            function isNullOrUndefined(arg) {
                return arg == null;
            }
            exports.isNullOrUndefined = isNullOrUndefined;
            function isNumber(arg) {
                return typeof arg === "number";
            }
            exports.isNumber = isNumber;
            function isString(arg) {
                return typeof arg === "string";
            }
            exports.isString = isString;
            function isSymbol(arg) {
                return typeof arg === "symbol";
            }
            exports.isSymbol = isSymbol;
            function isUndefined(arg) {
                return arg === void 0;
            }
            exports.isUndefined = isUndefined;
            function isRegExp(re) {
                return isObject(re) && objectToString(re) === "[object RegExp]";
            }
            exports.isRegExp = isRegExp;
            function isObject(arg) {
                return typeof arg === "object" && arg !== null;
            }
            exports.isObject = isObject;
            function isDate(d) {
                return isObject(d) && objectToString(d) === "[object Date]";
            }
            exports.isDate = isDate;
            function isError(e) {
                return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
            }
            exports.isError = isError;
            function isFunction(arg) {
                return typeof arg === "function";
            }
            exports.isFunction = isFunction;
            function isPrimitive(arg) {
                return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
            }
            exports.isPrimitive = isPrimitive;
            exports.isBuffer = __webpack_require__(15);
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            function pad(n) {
                return n < 10 ? "0" + n.toString(10) : n.toString(10);
            }
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            function timestamp() {
                var d = new Date();
                var time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
                return [ d.getDate(), months[d.getMonth()], time ].join(" ");
            }
            exports.log = function() {
                console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
            };
            exports.inherits = __webpack_require__(12);
            exports._extend = function(origin, add) {
                if (!add || !isObject(add)) return origin;
                var keys = Object.keys(add);
                var i = keys.length;
                while (i--) {
                    origin[keys[i]] = add[keys[i]];
                }
                return origin;
            };
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : undefined;
            exports.promisify = function promisify(original) {
                if (typeof original !== "function") throw new TypeError('The "original" argument must be of type Function');
                if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
                    var fn = original[kCustomPromisifiedSymbol];
                    if (typeof fn !== "function") {
                        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                    }
                    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                        value: fn,
                        enumerable: false,
                        writable: false,
                        configurable: true
                    });
                    return fn;
                }
                function fn() {
                    var promiseResolve, promiseReject;
                    var promise = new Promise(function(resolve, reject) {
                        promiseResolve = resolve;
                        promiseReject = reject;
                    });
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    args.push(function(err, value) {
                        if (err) {
                            promiseReject(err);
                        } else {
                            promiseResolve(value);
                        }
                    });
                    try {
                        original.apply(this, args);
                    } catch (err) {
                        promiseReject(err);
                    }
                    return promise;
                }
                Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
                if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                    value: fn,
                    enumerable: false,
                    writable: false,
                    configurable: true
                });
                return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
            };
            exports.promisify.custom = kCustomPromisifiedSymbol;
            function callbackifyOnRejected(reason, cb) {
                if (!reason) {
                    var newReason = new Error("Promise was rejected with a falsy value");
                    newReason.reason = reason;
                    reason = newReason;
                }
                return cb(reason);
            }
            function callbackify(original) {
                if (typeof original !== "function") {
                    throw new TypeError('The "original" argument must be of type Function');
                }
                function callbackified() {
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    var maybeCb = args.pop();
                    if (typeof maybeCb !== "function") {
                        throw new TypeError("The last argument must be of type Function");
                    }
                    var self = this;
                    var cb = function() {
                        return maybeCb.apply(self, arguments);
                    };
                    original.apply(this, args).then(function(ret) {
                        process.nextTick(cb, null, ret);
                    }, function(rej) {
                        process.nextTick(callbackifyOnRejected, rej, cb);
                    });
                }
                Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
                Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
                return callbackified;
            }
            exports.callbackify = callbackify;
        }).call(exports, __webpack_require__(14));
    }, function(module, exports) {
        var g;
        g = function() {
            return this;
        }();
        try {
            g = g || Function("return this")() || (1, eval)("this");
        } catch (e) {
            if (typeof window === "object") g = window;
        }
        module.exports = g;
    } ]);
});