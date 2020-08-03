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
/******/ 	return __webpack_require__(__webpack_require__.s = 107);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(17).f;
var createNonEnumerableProperty = __webpack_require__(13);
var redefine = __webpack_require__(14);
var setGlobal = __webpack_require__(60);
var copyConstructorProperties = __webpack_require__(74);
var isForced = __webpack_require__(57);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(145)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var shared = __webpack_require__(61);
var has = __webpack_require__(5);
var uid = __webpack_require__(45);
var NATIVE_SYMBOL = __webpack_require__(58);
var USE_SYMBOL_AS_UID = __webpack_require__(95);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(80);
var anObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(29);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(56);
var requireObjectCoercible = __webpack_require__(42);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(63);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(42);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var fails = __webpack_require__(1);
var has = __webpack_require__(5);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var definePropertyModule = __webpack_require__(6);
var createPropertyDescriptor = __webpack_require__(22);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var createNonEnumerableProperty = __webpack_require__(13);
var has = __webpack_require__(5);
var setGlobal = __webpack_require__(60);
var inspectSource = __webpack_require__(82);
var InternalStateModule = __webpack_require__(26);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(23);
var IndexedObject = __webpack_require__(56);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(53);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(37);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var propertyIsEnumerableModule = __webpack_require__(59);
var createPropertyDescriptor = __webpack_require__(22);
var toIndexedObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(29);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(80);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(9);
var addToUnscopables = __webpack_require__(20);
var Iterators = __webpack_require__(27);
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(54);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(128).charAt;
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(54);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(4);
var create = __webpack_require__(28);
var definePropertyModule = __webpack_require__(6);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(1);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(35);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(93);
var global = __webpack_require__(3);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(121);
var global = __webpack_require__(3);
var isObject = __webpack_require__(7);
var createNonEnumerableProperty = __webpack_require__(13);
var objectHas = __webpack_require__(5);
var sharedKey = __webpack_require__(44);
var hiddenKeys = __webpack_require__(25);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var defineProperties = __webpack_require__(87);
var enumBugKeys = __webpack_require__(55);
var hiddenKeys = __webpack_require__(25);
var html = __webpack_require__(120);
var documentCreateElement = __webpack_require__(76);
var sharedKey = __webpack_require__(44);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(64);
var redefine = __webpack_require__(14);
var toString = __webpack_require__(124);

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(2);
var global = __webpack_require__(3);
var has = __webpack_require__(5);
var isObject = __webpack_require__(7);
var defineProperty = __webpack_require__(6).f;
var copyConstructorProperties = __webpack_require__(74);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(75);

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var global = __webpack_require__(3);
var getBuiltIn = __webpack_require__(24);
var IS_PURE = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(2);
var NATIVE_SYMBOL = __webpack_require__(58);
var USE_SYMBOL_AS_UID = __webpack_require__(95);
var fails = __webpack_require__(1);
var has = __webpack_require__(5);
var isArray = __webpack_require__(16);
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(8);
var toObject = __webpack_require__(11);
var toIndexedObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(29);
var createPropertyDescriptor = __webpack_require__(22);
var nativeObjectCreate = __webpack_require__(28);
var objectKeys = __webpack_require__(41);
var getOwnPropertyNamesModule = __webpack_require__(40);
var getOwnPropertyNamesExternal = __webpack_require__(122);
var getOwnPropertySymbolsModule = __webpack_require__(88);
var getOwnPropertyDescriptorModule = __webpack_require__(17);
var definePropertyModule = __webpack_require__(6);
var propertyIsEnumerableModule = __webpack_require__(59);
var createNonEnumerableProperty = __webpack_require__(13);
var redefine = __webpack_require__(14);
var shared = __webpack_require__(61);
var sharedKey = __webpack_require__(44);
var hiddenKeys = __webpack_require__(25);
var uid = __webpack_require__(45);
var wellKnownSymbol = __webpack_require__(4);
var wrappedWellKnownSymbolModule = __webpack_require__(96);
var defineWellKnownSymbol = __webpack_require__(75);
var setToStringTag = __webpack_require__(43);
var InternalStateModule = __webpack_require__(26);
var $forEach = __webpack_require__(15).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var DOMIterables = __webpack_require__(77);
var ArrayIteratorMethods = __webpack_require__(18);
var createNonEnumerableProperty = __webpack_require__(13);
var wellKnownSymbol = __webpack_require__(4);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);
var wellKnownSymbol = __webpack_require__(4);
var V8_VERSION = __webpack_require__(78);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(29);
var definePropertyModule = __webpack_require__(6);
var createPropertyDescriptor = __webpack_require__(22);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(90);
var enumBugKeys = __webpack_require__(55);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(90);
var enumBugKeys = __webpack_require__(55);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(6).f;
var has = __webpack_require__(5);
var wellKnownSymbol = __webpack_require__(4);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(61);
var uid = __webpack_require__(45);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var forEach = __webpack_require__(70);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(2);
var global = __webpack_require__(3);
var isForced = __webpack_require__(57);
var redefine = __webpack_require__(14);
var has = __webpack_require__(5);
var classof = __webpack_require__(37);
var inheritIfRequired = __webpack_require__(81);
var toPrimitive = __webpack_require__(29);
var fails = __webpack_require__(1);
var create = __webpack_require__(28);
var getOwnPropertyNames = __webpack_require__(40).f;
var getOwnPropertyDescriptor = __webpack_require__(17).f;
var defineProperty = __webpack_require__(6).f;
var trim = __webpack_require__(129).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var DOMIterables = __webpack_require__(77);
var forEach = __webpack_require__(70);
var createNonEnumerableProperty = __webpack_require__(13);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var isArray = __webpack_require__(16);

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var isObject = __webpack_require__(7);
var isArray = __webpack_require__(16);
var toAbsoluteIndex = __webpack_require__(62);
var toLength = __webpack_require__(10);
var toIndexedObject = __webpack_require__(9);
var createProperty = __webpack_require__(38);
var wellKnownSymbol = __webpack_require__(4);
var arrayMethodHasSpeciesSupport = __webpack_require__(36);
var arrayMethodUsesToLength = __webpack_require__(12);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Polyomino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BoundingRectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_concat__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_concat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_concat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_fill__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_fill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_fill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_for_each__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_from__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_number_constructor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_number_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_number_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_object_define_property__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_string_iterator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_web_dom_collections_for_each__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_web_dom_collections_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_web_dom_collections_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__general_utils__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__ = __webpack_require__(68);









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
  function Polyomino(x1, y1, width, height, gridStep, index, componentAndRect) {
    _classCallCheck(this, Polyomino);

    this.x1 = x1; //kept to determine the amount of shift in the output

    this.y1 = y1; //kept to determine the amount of shift in the output

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
        /* //top left cell of a node
        var topLeftX = Math.floor((node.x - boundingRect.x1) / this.gridStep);
        var topLeftY = Math.floor((node.y - boundingRect.y1) / this.gridStep);
         //bottom right cell of a node
        var bottomRightX = Math.floor((node.x + node.width - boundingRect.x1) / this.gridStep);
        var bottomRightY = Math.floor((node.y + node.height - boundingRect.y1) / this.gridStep); */
        var stepX1 = Math.floor(boundingRect.x1 / _this.gridStep),
            stepY1 = Math.floor(boundingRect.y1 / _this.gridStep);
        var topLeftX = Math.floor(node.x / _this.gridStep) - stepX1,
            topLeftY = Math.floor(node.y / _this.gridStep) - stepY1,
            bottomRightX = Math.floor((node.x + node.width - 1) / _this.gridStep) - stepX1,
            bottomRightY = Math.floor((node.y + node.height - 1) / _this.gridStep) - stepY1; //all cells between topleft cell and bottom right cell should be occupied

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

        var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__general_utils__["c" /* LineSuperCover */])(p0, p1);
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
  }, {
    key: "getBoundingRectangle",
    value: function getBoundingRectangle() {
      var polyx1 = this.location.x - this.center.x;
      var polyy1 = this.location.y - this.center.y;
      return new BoundingRectangle(polyx1, polyy1, // -1 because if length == 1 then x2 == x1
      polyx1 + this.stepWidth - 1, polyy1 + this.stepHeight - 1);
    }
    /**
     * Bounding rectangle with respect to x1, y1 and width, height inside the grid area \
     * Divided by grid step
     */

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
    /**
     * width of the polyomino divided by grid steps
     */

  }, {
    key: "stepWidth",
    get: function get() {
      return this.stepX2 - this.stepX1 + 1;
    }
    /**
     * height of the polyomino divided by grid steps
     */

  }, {
    key: "stepHeight",
    get: function get() {
      return this.stepY2 - this.stepY1 + 1;
    }
    /**
     * returns the center relative to location inside the grid
     */

  }, {
    key: "gridStepCenter",
    get: function get() {
      return this.center.diff(this.location);
    }
  }, {
    key: "stepBoundingRectangle",
    get: function get() {
      return new BoundingRectangle(this.stepX1, this.stepY1, this.stepX2, this.stepY2);
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
    /**
     * @param { Point } other 
     */

  }, {
    key: "plus",
    value: function plus(other) {
      return new Point(this.x + other.x, this.y + other.y);
    }
    /**
     * @param { Direction } direction
     */

  }], [{
    key: "fromDirection",
    value: function fromDirection(direction) {
      switch (direction) {
        case __WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__["b" /* Direction */].LEFT:
          return new Point(1, 0);

        case __WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__["b" /* Direction */].RIGHT:
          return new Point(-1, 0);

        case __WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__["b" /* Direction */].BOTTOM:
          return new Point(0, -1);

        case __WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__["b" /* Direction */].TOP:
          return new Point(0, 1);

        default:
          throw new Error("Invalid direction: ".concat(__WEBPACK_IMPORTED_MODULE_9__models_compaction_grid__["b" /* Direction */]));
      }
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
    /**
     * Expands bounds of `this` so that it contains 'other'
     * @param { import('./typedef').IBoundingRectangle } other 
     */

  }, {
    key: "include",
    value: function include(other) {
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

  }, {
    key: "contains",
    value: function contains(i, j) {
      return i >= this.y1 && i <= this.y2 && j >= this.x1 && j <= this.x2;
    }
  }, {
    key: "width",
    get: function get() {
      // +1 because x2 is inclusive
      return this.x2 - this.x1 + 1;
    }
  }, {
    key: "height",
    get: function get() {
      // +1 because y2 is inclusive
      return this.y2 - this.y1 + 1;
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
     * @param { import('./typedef').IPoint[] } cells
     * @param { number } level
     * @returns { import('./typedef').IPoint[] }
     */
    value: function getDirectNeighbors(cells, level) {
      var _this3 = this;

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
        cells.forEach(function (cell) {
          resultPoints = resultPoints.concat(_this3.getCellNeighbors(cell.x, cell.y));
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

  }, {
    key: "getCellNeighbors",
    value: function getCellNeighbors(i, j) {
      /** @type { import('./typedef').IPoint[] } */
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
     * a function to place the center of the polyomino in the cell i j inside the grid
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(9);
var toLength = __webpack_require__(10);
var toAbsoluteIndex = __webpack_require__(62);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var isArray = __webpack_require__(16);
var wellKnownSymbol = __webpack_require__(4);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var createIteratorConstructor = __webpack_require__(116);
var getPrototypeOf = __webpack_require__(89);
var setPrototypeOf = __webpack_require__(91);
var setToStringTag = __webpack_require__(43);
var createNonEnumerableProperty = __webpack_require__(13);
var redefine = __webpack_require__(14);
var wellKnownSymbol = __webpack_require__(4);
var IS_PURE = __webpack_require__(39);
var Iterators = __webpack_require__(27);
var IteratorsCore = __webpack_require__(86);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);
var classof = __webpack_require__(37);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var createNonEnumerableProperty = __webpack_require__(13);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(39);
var store = __webpack_require__(94);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(63);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(4);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var from = __webpack_require__(111);
var checkCorrectnessOfIteration = __webpack_require__(72);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(2);
var objectDefinePropertyModile = __webpack_require__(6);

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = LineSuperCover;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCenter;
/* unused harmony export uniqueArray */
/* harmony export (immutable) */ __webpack_exports__["b"] = getBoundingRectangle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_flat_map__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_flat_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_flat_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_iterator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_map__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_reduce__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_reduce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_reduce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_unscopables_flat_map__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_unscopables_flat_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_unscopables_flat_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_number_constructor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_number_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_number_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_object_keys__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_object_to_string__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_object_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_object_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_string_iterator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_web_dom_collections_for_each__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_web_dom_collections_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_modules_web_dom_collections_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_web_dom_collections_iterator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_web_dom_collections_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_modules_web_dom_collections_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__ = __webpack_require__(51);
















function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * a function to determine the grid cells where a line between point p0 and p1 pass through
 * @param { import('./typedef').IPoint } p0
 * @param { import('./typedef').IPoint } p1
 */

function LineSuperCover(p0, p1) {
  var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
  var nx = Math.floor(Math.abs(dx)),
      ny = Math.floor(Math.abs(dy));
  var sign_x = dx > 0 ? 1 : -1,
      sign_y = dy > 0 ? 1 : -1;
  var p = new __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__["c" /* Point */](p0.x, p0.y);
  var points = [new __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__["c" /* Point */](p.x, p.y)];

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

    points.push(new __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__["c" /* Point */](p.x, p.y));
  }

  return points;
}
;
/**
 * finds the current center of components
 * @param { import('./typedef').Component[] } components 
 */

function getCenter(components) {
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
  return new __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__["c" /* Point */]((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
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
    if (node.x + node.width - 1 >= x2) x2 = node.x + node.width - 1;
    if (node.y + node.height - 1 >= y2) y2 = node.y + node.height - 1;
  });
  component.edges.forEach(function (edge) {
    if (edge.startX <= x1) x1 = edge.startX;
    if (edge.startY <= y1) y1 = edge.startY;
    if (edge.endX >= x2) x2 = edge.endX;
    if (edge.endY >= y2) y2 = edge.endY;
  });
  return new __WEBPACK_IMPORTED_MODULE_15__polyomino_packing__["d" /* BoundingRectangle */](x1, y1, x2, y2);
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GRID_EMPTY */
/* unused harmony export NONE_ID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompactionGrid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_concat__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_concat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_concat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_fill__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_fill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_fill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_find__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_from__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_is_array__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_is_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_is_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_iterator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_date_to_string__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_date_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_date_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_function_name__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_function_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_function_name__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_number_constructor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_number_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_number_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_object_define_property__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_to_string__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_regexp_to_string__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_regexp_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_regexp_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_set__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_string_iterator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_web_dom_collections_iterator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_web_dom_collections_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_core_js_modules_web_dom_collections_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__polyomino_packing__ = __webpack_require__(51);




















function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // TODO: move the constants when class properties are not experimental feature

var GRID_EMPTY = -1;
var NONE_ID = Number.NEGATIVE_INFINITY;
/**
 * @enum { number }
 */

var Direction = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
};
/**
 * Represents the compaction grid which packs the polyominos incrementally
 * 
 */

var CompactionGrid = /*#__PURE__*/function () {
  // TODO

  /**
   * 
   * @param { Polyomino[] } polyominos
   * @param { number } gridStep
   */
  function CompactionGrid(polyominos, gridStep) {
    var _this = this;

    _classCallCheck(this, CompactionGrid);

    // We may not need this
    this.polyominos = polyominos;
    var boundingRectangle = CompactionGrid.getRoundedBoundingRectangle(polyominos, gridStep);
    this.absoluteBounds = new __WEBPACK_IMPORTED_MODULE_19__polyomino_packing__["d" /* BoundingRectangle */](boundingRectangle.x1, boundingRectangle.y1, boundingRectangle.x2, boundingRectangle.y2);
    this.compactingBounds = new __WEBPACK_IMPORTED_MODULE_19__polyomino_packing__["d" /* BoundingRectangle */](boundingRectangle.x1, boundingRectangle.y1, boundingRectangle.x2, boundingRectangle.y2);
    /** If not `GRID_EMPTY` denotes the polyomino which owns the place */

    /** @type { number[][] } */

    this.grid = Array.from({
      length: this.height
    }, function () {
      return new Array(_this.width).fill(GRID_EMPTY);
    });

    var _iterator = _createForOfIteratorHelper(polyominos),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var poly = _step.value;
        // Set initial point to its location
        poly.location = new __WEBPACK_IMPORTED_MODULE_19__polyomino_packing__["c" /* Point */](poly.stepX1, poly.stepY1);

        for (var i = 0; i < poly.stepWidth; i += 1) {
          for (var j = 0; j < poly.stepHeight; j += 1) {
            if (poly.grid[i][j]) {
              // dimensions are reverse in CompactionGrid
              this.setGridAt(j + poly.stepY1, i + poly.stepX1, poly.index);
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
  /**
   * Tries to compact the grid from the `direction`
   * @param { Direction } direction
   */


  _createClass(CompactionGrid, [{
    key: "tryCompact",
    value: function tryCompact(direction) {
      var _this2 = this;

      /** @type { (poly: Polyomino) => boolean } */
      var checkFn;
      /** @type { (poly: Polyomino) => void } */

      var polyMoveFn;
      /** @type { (bound: BoundingRectangle) => void } */

      var boundMoveFn;

      switch (direction) {
        case Direction.LEFT:
          checkFn = function checkFn(poly) {
            return poly.location.x === _this2.compactingBounds.x1;
          };

          polyMoveFn = function polyMoveFn(poly) {
            return poly.location.x += 1;
          };

          boundMoveFn = function boundMoveFn(bound) {
            return bound.x1 += 1;
          };

          break;

        case Direction.TOP:
          checkFn = function checkFn(poly) {
            return poly.location.y === _this2.compactingBounds.y1;
          };

          polyMoveFn = function polyMoveFn(poly) {
            return poly.location.y += 1;
          };

          boundMoveFn = function boundMoveFn(bound) {
            return bound.y1 += 1;
          };

          break;

        case Direction.RIGHT:
          checkFn = function checkFn(poly) {
            return poly.location.x + poly.stepWidth - 1 === _this2.compactingBounds.x2;
          };

          polyMoveFn = function polyMoveFn(poly) {
            return poly.location.x -= 1;
          };

          boundMoveFn = function boundMoveFn(bound) {
            return bound.x2 -= 1;
          };

          break;

        case Direction.BOTTOM:
          checkFn = function checkFn(poly) {
            return poly.location.y + poly.stepHeight - 1 === _this2.compactingBounds.y2;
          };

          polyMoveFn = function polyMoveFn(poly) {
            return poly.location.y -= 1;
          };

          boundMoveFn = function boundMoveFn(bound) {
            return bound.y2 -= 1;
          };

          break;

        default:
          throw new Error('');
      }
      /** @type { Set<Polyomino> } */


      var allMovedPolys = new Set();

      var _iterator2 = _createForOfIteratorHelper(this.polyominos),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var poly = _step2.value;

          if (checkFn(poly)) {
            var movedPolys = this.tryMove(poly, direction);

            if (movedPolys !== undefined) {
              var _iterator4 = _createForOfIteratorHelper(movedPolys),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var p = _step4.value;
                  allMovedPolys.add(p);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            } else {
              // If we can't move then we can't compact
              return false;
            }
          }
        } // Shift one right

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(allMovedPolys),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var movedPoly = _step3.value;
          polyMoveFn(movedPoly);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      boundMoveFn(this.compactingBounds);
      return true;
    }
    /**
     * Returns the polyomino and its index if there is a polyomino here. Undefined otherwise
     * @param { number } i y-axis
     * @param { number } j x-axis
     * @returns { Polyomino | undefined }
     */

  }, {
    key: "polyominoAt",
    value: function polyominoAt(i, j) {
      return this.compactingBounds.contains(i, j) ? this.polyominos.find(function (p) {
        return j >= p.location.x && j <= p.location.x + p.stepWidth - 1 && i >= p.location.y && i <= p.location.y + p.stepHeight - 1 && p.grid[j - p.location.x][i - p.location.y];
      }) : undefined;
    }
    /**
     * Checks if `polyomino` can move in the direction. Returns all the polyominos necessary to move otherwise undefined
     * @param { Polyomino } polyomino 
     * @param { Direction } direction 
     * @returns { Set<Polyomino> | undefined }
     */

  }, {
    key: "tryMove",
    value: function tryMove(polyomino, direction) {
      switch (direction) {
        case Direction.LEFT:
          {
            var movedPolys = new Set();

            for (var i = 0; i < polyomino.stepHeight; i += 1) {
              // Find rightmost filled square in that height
              var j = polyomino.stepWidth - 1;

              while (!polyomino.grid[j][i]) {
                j -= 1;
              }

              var gridX = polyomino.location.x + j;
              var gridY = polyomino.location.y + i;

              if (this.compactingBounds.contains(gridY, gridX + 1)) {
                // Check if one right is another polyomino
                var next = this.polyominoAt(gridY, gridX + 1);

                if (next !== undefined) {
                  if (next === polyomino) {
                    throw new Error('Call to itself');
                  }

                  var nextTryMove = this.tryMove(next, direction);

                  if (nextTryMove !== undefined) {
                    // We need to move all these in order to move the original
                    var _iterator5 = _createForOfIteratorHelper(nextTryMove),
                        _step5;

                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var adjacent = _step5.value;
                        movedPolys.add(adjacent);
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }
                  } else {
                    return undefined;
                  }
                }
              } else {
                return undefined;
              }
            } // If we reached here it is movable


            movedPolys.add(polyomino);
            return movedPolys;
          }

        case Direction.TOP:
          {
            var _movedPolys = new Set();

            for (var _j = 0; _j < polyomino.stepWidth; _j += 1) {
              // Find rightmost filled square in that height
              var _i = polyomino.stepHeight - 1;

              while (!polyomino.grid[_j][_i]) {
                _i -= 1;
              }

              var _gridX = polyomino.location.x + _j;

              var _gridY = polyomino.location.y + _i;

              if (this.compactingBounds.contains(_gridY + 1, _gridX)) {
                // Check if one right is another polyomino
                var _next = this.polyominoAt(_gridY + 1, _gridX);

                if (_next !== undefined) {
                  if (_next === polyomino) {
                    throw new Error('Call to itself');
                  }

                  var _nextTryMove = this.tryMove(_next, direction);

                  if (_nextTryMove !== undefined) {
                    // We need to move all these in order to move the original
                    var _iterator6 = _createForOfIteratorHelper(_nextTryMove),
                        _step6;

                    try {
                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        var _adjacent = _step6.value;

                        _movedPolys.add(_adjacent);
                      }
                    } catch (err) {
                      _iterator6.e(err);
                    } finally {
                      _iterator6.f();
                    }
                  } else {
                    return undefined;
                  }
                }
              } else {
                return undefined;
              }
            } // If we reached here it is movable


            _movedPolys.add(polyomino);

            return _movedPolys;
          }

        case Direction.RIGHT:
          {
            var _movedPolys2 = new Set();

            for (var _i2 = 0; _i2 < polyomino.stepHeight; _i2 += 1) {
              // Find rightmost filled square in that height
              var _j2 = 0;

              while (!polyomino.grid[_j2][_i2]) {
                _j2 += 1;
              }

              var _gridX2 = polyomino.location.x + _j2;

              var _gridY2 = polyomino.location.y + _i2;

              if (this.compactingBounds.contains(_gridY2, _gridX2 - 1)) {
                // Check if one right is another polyomino
                var _next2 = this.polyominoAt(_gridY2, _gridX2 - 1);

                if (_next2 !== undefined) {
                  if (_next2 === polyomino) {
                    throw new Error('Call to itself');
                  }

                  var _nextTryMove2 = this.tryMove(_next2, direction);

                  if (_nextTryMove2 !== undefined) {
                    // We need to move all these in order to move the original
                    var _iterator7 = _createForOfIteratorHelper(_nextTryMove2),
                        _step7;

                    try {
                      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                        var _adjacent2 = _step7.value;

                        _movedPolys2.add(_adjacent2);
                      }
                    } catch (err) {
                      _iterator7.e(err);
                    } finally {
                      _iterator7.f();
                    }
                  } else {
                    return undefined;
                  }
                }
              } else {
                return undefined;
              }
            } // If we reached here it is movable


            _movedPolys2.add(polyomino);

            return _movedPolys2;
          }

        case Direction.BOTTOM:
          {
            var _movedPolys3 = new Set();

            for (var _j3 = 0; _j3 < polyomino.stepWidth; _j3 += 1) {
              // Find rightmost filled square in that height
              var _i3 = 0;

              while (!polyomino.grid[_j3][_i3]) {
                _i3 += 1;
              }

              var _gridX3 = polyomino.location.x + _j3;

              var _gridY3 = polyomino.location.y + _i3;

              if (this.compactingBounds.contains(_gridY3 - 1, _gridX3)) {
                // Check if one right is another polyomino
                var _next3 = this.polyominoAt(_gridY3 - 1, _gridX3);

                if (_next3 !== undefined) {
                  if (_next3 === polyomino) {
                    throw new Error('Call to itself');
                  }

                  var _nextTryMove3 = this.tryMove(_next3, direction);

                  if (_nextTryMove3 !== undefined) {
                    // We need to move all these in order to move the original
                    var _iterator8 = _createForOfIteratorHelper(_nextTryMove3),
                        _step8;

                    try {
                      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                        var _adjacent3 = _step8.value;

                        _movedPolys3.add(_adjacent3);
                      }
                    } catch (err) {
                      _iterator8.e(err);
                    } finally {
                      _iterator8.f();
                    }
                  } else {
                    return undefined;
                  }
                }
              } else {
                return undefined;
              }
            } // If we reached here it is movable


            _movedPolys3.add(polyomino);

            return _movedPolys3;
          }

        default:
          throw new Error("Invalid direction: ".concat(direction));
      }
    }
    /**
     * 
     * @param { number } i 
     */

  }, {
    key: "getRowAt",
    value: function getRowAt(i) {
      var row = this.grid[i - this.absoluteBounds.y1];

      if (row !== undefined) {
        return row;
      } else {
        throw new Error("row ".concat(i, " doesn't exist"));
      }
    }
    /**
     * @param { number } i 
     * @param { number } j 
     */

  }, {
    key: "getGridAt",
    value: function getGridAt(i, j) {
      var val = this.getRowAt(i)[j - this.absoluteBounds.x1];

      if (val !== undefined) {
        return val;
      } else {
        throw new Error("index ".concat(j, " doesn't exist on row ").concat(i));
      }
    }
    /**
     * @param { number } i 
     * @param { number } j
     * @param { number } val 
     */

  }, {
    key: "setGridAt",
    value: function setGridAt(i, j, val) {
      this.grid[i - this.absoluteBounds.y1][j - this.absoluteBounds.x1] = val;
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
    /**
     * Calculates the bounding rectangle then rounds the bounds
     * @param { Polyomino[] } polyominos
     * @param { number } gridStep
     * @returns { BoundingRectangle }
     */

  }], [{
    key: "getRoundedBoundingRectangle",
    value: function getRoundedBoundingRectangle(polyominos, gridStep) {
      // bounding rectangle by their current positions
      var boundingRectangle = new __WEBPACK_IMPORTED_MODULE_19__polyomino_packing__["d" /* BoundingRectangle */](Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

      var _iterator9 = _createForOfIteratorHelper(polyominos),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var polyomino = _step9.value;
          boundingRectangle.include(polyomino.stepBoundingRectangle);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return boundingRectangle;
    }
  }]);

  return CompactionGrid;
}();

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(15).forEach;
var arrayMethodIsStrict = __webpack_require__(21);
var arrayMethodUsesToLength = __webpack_require__(12);

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(4);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(64);
var classofRaw = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(4);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var ownKeys = __webpack_require__(92);
var getOwnPropertyDescriptorModule = __webpack_require__(17);
var definePropertyModule = __webpack_require__(6);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(93);
var has = __webpack_require__(5);
var wrappedWellKnownSymbolModule = __webpack_require__(96);
var defineProperty = __webpack_require__(6).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isObject = __webpack_require__(7);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var userAgent = __webpack_require__(117);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(73);
var Iterators = __webpack_require__(27);
var wellKnownSymbol = __webpack_require__(4);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var fails = __webpack_require__(1);
var createElement = __webpack_require__(76);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var setPrototypeOf = __webpack_require__(91);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(94);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(25);
var isObject = __webpack_require__(7);
var has = __webpack_require__(5);
var defineProperty = __webpack_require__(6).f;
var uid = __webpack_require__(45);
var FREEZING = __webpack_require__(119);

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(4);
var Iterators = __webpack_require__(27);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isArrayIteratorMethod = __webpack_require__(84);
var toLength = __webpack_require__(10);
var bind = __webpack_require__(23);
var getIteratorMethod = __webpack_require__(79);
var callWithSafeIterationClosing = __webpack_require__(71);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(89);
var createNonEnumerableProperty = __webpack_require__(13);
var has = __webpack_require__(5);
var wellKnownSymbol = __webpack_require__(4);
var IS_PURE = __webpack_require__(39);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var definePropertyModule = __webpack_require__(6);
var anObject = __webpack_require__(8);
var objectKeys = __webpack_require__(41);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toObject = __webpack_require__(11);
var sharedKey = __webpack_require__(44);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(115);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIndexedObject = __webpack_require__(9);
var indexOf = __webpack_require__(52).indexOf;
var hiddenKeys = __webpack_require__(25);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var aPossiblePrototype = __webpack_require__(109);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(24);
var getOwnPropertyNamesModule = __webpack_require__(40);
var getOwnPropertySymbolsModule = __webpack_require__(88);
var anObject = __webpack_require__(8);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = global;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var setGlobal = __webpack_require__(60);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(58);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(4);

exports.f = wellKnownSymbol;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var fails = __webpack_require__(1);
var isArray = __webpack_require__(16);
var isObject = __webpack_require__(7);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var createProperty = __webpack_require__(38);
var arraySpeciesCreate = __webpack_require__(53);
var arrayMethodHasSpeciesSupport = __webpack_require__(36);
var wellKnownSymbol = __webpack_require__(4);
var V8_VERSION = __webpack_require__(78);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var fill = __webpack_require__(110);
var addToUnscopables = __webpack_require__(20);

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $map = __webpack_require__(15).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(36);
var arrayMethodUsesToLength = __webpack_require__(12);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var defineProperty = __webpack_require__(6).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var toObject = __webpack_require__(11);
var nativeKeys = __webpack_require__(41);
var fails = __webpack_require__(1);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(14);
var anObject = __webpack_require__(8);
var fails = __webpack_require__(1);
var flags = __webpack_require__(126);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_for_each__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_includes__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_index_of__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_index_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_index_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_number_constructor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_number_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_number_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_web_dom_collections_for_each__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_web_dom_collections_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_web_dom_collections_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__packing__ = __webpack_require__(108);






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
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__packing__["a" /* pack */])(components, options);
  };

  return instance;
};

/* harmony default export */ __webpack_exports__["default"] = (layoutUtilities);

/***/ }),
/* 105 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_is_array__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_is_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_is_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_iterator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_slice__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_object_to_string__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_object_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_object_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_iterator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_web_dom_collections_iterator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_web_dom_collections_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_modules_web_dom_collections_iterator__);










function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var layoutUtilities = __webpack_require__(104)["default"]; // registers the extension on a cytoscape lib ref

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

    cytoscape('core', 'layoutUtilities',
    /**
     * @param { import("./typedef").Options | string } opts 
     */
    function (opts) {
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

  if (typeof define !== 'undefined' && __webpack_require__(105)) {
    // expose as an amd/requirejs module
    define('cytoscape-view-utilities', function () {
      return register;
    });
  }

  if (typeof cytoscape !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape);
  }
})();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(106)(module)))

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pack;
/* unused harmony export incrementalPackImpl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_symbol_description__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_filter__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_array_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_array_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_from__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_is_array__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_is_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_array_is_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_iterator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_array_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_map__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_array_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_modules_es_array_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_array_some__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_array_some___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_modules_es_array_some__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_array_sort__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_array_sort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_modules_es_array_sort__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_date_to_string__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_date_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_modules_es_date_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_function_name__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_function_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_modules_es_function_name__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_define_properties__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_define_properties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_modules_es_object_define_properties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_object_define_property__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_core_js_modules_es_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_object_get_own_property_descriptor__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_core_js_modules_es_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_object_get_own_property_descriptors__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_object_get_own_property_descriptors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_core_js_modules_es_object_get_own_property_descriptors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_es_object_keys__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_es_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_core_js_modules_es_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_core_js_modules_es_object_to_string__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_core_js_modules_es_object_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_core_js_modules_es_object_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_core_js_modules_es_object_values__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_core_js_modules_es_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_core_js_modules_es_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_core_js_modules_es_regexp_to_string__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_core_js_modules_es_regexp_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_core_js_modules_es_regexp_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_core_js_modules_es_string_iterator__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_core_js_modules_es_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_core_js_modules_es_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_core_js_modules_web_dom_collections_for_each__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_core_js_modules_web_dom_collections_for_each___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_core_js_modules_web_dom_collections_for_each__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_core_js_modules_web_dom_collections_iterator__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_core_js_modules_web_dom_collections_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_core_js_modules_web_dom_collections_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__general_utils__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__polyomino_packing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__models_compaction_grid__ = __webpack_require__(68);


























function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * This module is created so that parts of packing operations can be used in both of the packing methods
 */

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
  var currentCenter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_25__general_utils__["a" /* getCenter */])(components);
  var gridStep = calculateGridStep(components, options);

  if (options.componentSpacing > 0) {
    var spacingAmount = options.componentSpacing;
    addSpacing(components, spacingAmount);
  }

  var _createPolyominos = createPolyominos(components, gridStep),
      polyominos = _createPolyominos.polyominos,
      gridWidth = _createPolyominos.gridWidth,
      gridHeight = _createPolyominos.gridHeight; //order plyominos non-increasing order


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

  var mainGrid = new __WEBPACK_IMPORTED_MODULE_26__polyomino_packing__["a" /* Grid */](gridWidth * 2 + gridStep, gridHeight * 2 + gridStep, gridStep); //place first (biggest) polyomino in the center

  mainGrid.placePolyomino(polyominos[0], mainGrid.center.x, mainGrid.center.y); //for every polyomino try placeing it in first neighbors and calculate utility if none then second neighbor and so on..

  for (var i = 1; i < polyominos.length; i++) {
    var fullnessMax = 0;
    var adjustedFullnessMax = 0;
    var weigthFullnessAspectRatio = 0;
    var minAspectRatioDiff = 1000000;
    var placementFound = false;
    /** @type { import('./typedef').IPoint[] } */

    var cells = [];
    /** @type { import('./typedef').IPoint } */

    var resultLocation = {
      x: 0,
      y: 0
    };

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
  /** @type {{ dx: number, dy: number }[]} */

  var shifts = [];
  polyominos.forEach(function (pol) {
    var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;
    var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;
    shifts.push({
      dx: dx,
      dy: dy
    });
  }); // Calculate what would be the center of the packed layout

  var packingCenter = calculatePackingCenter(components, shifts); // Calculate the neccessary  additional shift to re-center

  var centerShift = packingCenter.diff(currentCenter); // Add the center shift

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
/**
 * 
 * @param { import('./typedef').Component[] } components 
 * @param { import('./typedef').Options } options 
 */


function incrementalPack(components, options) {
  var gridStep = calculateGridStep(components, options);

  if (options.componentSpacing > 0) {
    var spacingAmount = options.componentSpacing;
    addSpacing(components, spacingAmount);
  }

  var _createPolyominos2 = createPolyominos(components, gridStep),
      polyominos = _createPolyominos2.polyominos;

  return incrementalPackImpl(polyominos, gridStep);
}
/**
 * Rest of the function after converting components to polyomino
 * @param { Polyomino[] } polyominos
 * @param { number } gridStep
 */


function incrementalPackImpl(polyominos, gridStep) {
  var compactionGrid = new __WEBPACK_IMPORTED_MODULE_27__models_compaction_grid__["a" /* CompactionGrid */](polyominos, gridStep);
  {
    var directions = Object.values(__WEBPACK_IMPORTED_MODULE_27__models_compaction_grid__["b" /* Direction */]);
    /** @type { boolean[] } */

    var compacted = [];

    for (var _i2 = 0, _directions = directions; _i2 < _directions.length; _i2++) {
      var dir = _directions[_i2];
      compacted[dir] = true;
    }

    while (compacted.some(function (b) {
      return b;
    })) {
      var _iterator = _createForOfIteratorHelper(directions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _dir = _step.value;
          compacted[_dir] = compactionGrid.tryCompact(_dir);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  var shifts = polyominos.map(function (p) {
    return {
      dx: (p.location.x - p.stepX1) * gridStep,
      dy: (p.location.y - p.stepY1) * gridStep
    };
  });
  return {
    shifts: shifts
  };
} // Below there are functions used in both methods

/**
 * @param { import('./typedef').Component[] } components
 * @param { { dx: number, dy: number }[] } shifts
 */

function calculatePackingCenter(components, shifts) {
  components.forEach(function (component, index) {
    component.nodes.forEach(function (node) {
      node.x += shifts[index].dx;
      node.y += shifts[index].dy;
    });
  });
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_25__general_utils__["a" /* getCenter */])(components);
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
/**
 * Creates the polyominos and the calculate minimum rectangle that can cover all of them
 * @param { import('./typedef').Component[] } components
 * @param { number } gridStep
 * @returns {{ polyominos: Polyomino[], gridWidth: number, gridHeight: number, }}
 */


function createPolyominos(components, gridStep) {
  var polyominos = [];
  var gridWidth = 0,
      gridHeight = 0;

  var _iterator4 = _createForOfIteratorHelper(components.entries()),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _step4$value = _slicedToArray(_step4.value, 2),
          index = _step4$value[0],
          component = _step4$value[1];

      var boundingRect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_25__general_utils__["b" /* getBoundingRectangle */])(component);
      var componentWidth = boundingRect.width;
      var componentHeight = boundingRect.height;
      gridWidth += componentWidth;
      gridHeight += componentHeight;
      var componentPolyomino = new __WEBPACK_IMPORTED_MODULE_26__polyomino_packing__["b" /* Polyomino */](boundingRect.x1, boundingRect.y1, componentWidth, componentHeight, gridStep, index, {
        component: component,
        boundingRect: boundingRect
      });
      polyominos.push(componentPolyomino);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return {
    polyominos: polyominos,
    gridWidth: gridWidth,
    gridHeight: gridHeight
  };
}
/**
 * Calculates aspecRatio, fullness and adjustedFullness
 * @param { Grid } mainGrid 
 * @param { number } desiredAspectRatio 
 */


function calculateStatistics(mainGrid, desiredAspectRatio) {
  var aspectRatio = Math.round((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1) * 1e2) / 1e2;
  var fullness = Math.round(mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 100 * 1e2) / 1e2;
  var adjustedFullness;

  if (aspectRatio > desiredAspectRatio) {
    var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
    adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridWidth * (mainGridWidth / desiredAspectRatio)) * 100 * 1e2) / 1e2; // height = width / desiredAspectRatio;
  } else {
    var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
    adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridheight * desiredAspectRatio * mainGridheight) * 100 * 1e2) / 1e2; // width = height * desiredAspectRatio;
  }

  return {
    aspectRatio: aspectRatio,
    fullness: fullness,
    adjustedFullness: adjustedFullness
  };
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(62);
var toLength = __webpack_require__(10);

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(23);
var toObject = __webpack_require__(11);
var callWithSafeIterationClosing = __webpack_require__(71);
var isArrayIteratorMethod = __webpack_require__(84);
var toLength = __webpack_require__(10);
var createProperty = __webpack_require__(38);
var getIteratorMethod = __webpack_require__(79);

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(35);
var toObject = __webpack_require__(11);
var IndexedObject = __webpack_require__(56);
var toLength = __webpack_require__(10);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(6).f;
var create = __webpack_require__(28);
var redefineAll = __webpack_require__(125);
var bind = __webpack_require__(23);
var anInstance = __webpack_require__(69);
var iterate = __webpack_require__(85);
var defineIterator = __webpack_require__(54);
var setSpecies = __webpack_require__(127);
var DESCRIPTORS = __webpack_require__(2);
var fastKey = __webpack_require__(83).fastKey;
var InternalStateModule = __webpack_require__(26);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var global = __webpack_require__(3);
var isForced = __webpack_require__(57);
var redefine = __webpack_require__(14);
var InternalMetadataModule = __webpack_require__(83);
var iterate = __webpack_require__(85);
var anInstance = __webpack_require__(69);
var isObject = __webpack_require__(7);
var fails = __webpack_require__(1);
var checkCorrectnessOfIteration = __webpack_require__(72);
var setToStringTag = __webpack_require__(43);
var inheritIfRequired = __webpack_require__(81);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(86).IteratorPrototype;
var create = __webpack_require__(28);
var createPropertyDescriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(43);
var Iterators = __webpack_require__(27);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(24);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(16);
var toLength = __webpack_require__(10);
var bind = __webpack_require__(23);

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(1);

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(24);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var inspectSource = __webpack_require__(82);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(9);
var nativeGetOwnPropertyNames = __webpack_require__(40).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(2);
var objectKeys = __webpack_require__(41);
var toIndexedObject = __webpack_require__(9);
var propertyIsEnumerable = __webpack_require__(59).f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(64);
var classof = __webpack_require__(73);

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(8);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(24);
var definePropertyModule = __webpack_require__(6);
var wellKnownSymbol = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(63);
var requireObjectCoercible = __webpack_require__(42);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(42);
var whitespaces = __webpack_require__(130);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $filter = __webpack_require__(15).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(36);
var arrayMethodUsesToLength = __webpack_require__(12);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $find = __webpack_require__(15).find;
var addToUnscopables = __webpack_require__(20);
var arrayMethodUsesToLength = __webpack_require__(12);

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(118);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var aFunction = __webpack_require__(35);
var arraySpeciesCreate = __webpack_require__(53);

// `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $includes = __webpack_require__(52).includes;
var addToUnscopables = __webpack_require__(20);
var arrayMethodUsesToLength = __webpack_require__(12);

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $indexOf = __webpack_require__(52).indexOf;
var arrayMethodIsStrict = __webpack_require__(21);
var arrayMethodUsesToLength = __webpack_require__(12);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $reduce = __webpack_require__(112).left;
var arrayMethodIsStrict = __webpack_require__(21);
var arrayMethodUsesToLength = __webpack_require__(12);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $some = __webpack_require__(15).some;
var arrayMethodIsStrict = __webpack_require__(21);
var arrayMethodUsesToLength = __webpack_require__(12);

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var aFunction = __webpack_require__(35);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(1);
var arrayMethodIsStrict = __webpack_require__(21);

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(20);

addToUnscopables('flatMap');


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(2);
var defineProperties = __webpack_require__(87);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var fails = __webpack_require__(1);
var toIndexedObject = __webpack_require__(9);
var nativeGetOwnPropertyDescriptor = __webpack_require__(17).f;
var DESCRIPTORS = __webpack_require__(2);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(2);
var ownKeys = __webpack_require__(92);
var toIndexedObject = __webpack_require__(9);
var getOwnPropertyDescriptorModule = __webpack_require__(17);
var createProperty = __webpack_require__(38);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var $values = __webpack_require__(123).values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(114);
var collectionStrong = __webpack_require__(113);

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),
/* 145 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});