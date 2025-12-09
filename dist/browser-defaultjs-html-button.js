/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLDefaultjsAnchorElement: () => (/* reexport safe */ _src_HTMLDefaultjsAnchorElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   HTMLDefaultjsButtonElement: () => (/* reexport safe */ _src_HTMLDefaultjsButtonElement__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _src_HTMLDefaultjsAnchorElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/HTMLDefaultjsAnchorElement */ "./src/HTMLDefaultjsAnchorElement.js");
/* harmony import */ var _src_HTMLDefaultjsButtonElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/HTMLDefaultjsButtonElement */ "./src/HTMLDefaultjsButtonElement.js");






/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Global.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const GLOBAL = (() => {
	if(typeof __webpack_require__.g !== "undefined") return __webpack_require__.g;
	if(typeof window !== "undefined") return window;	
	if(typeof self !== "undefined") return self;
	return {};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GLOBAL);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectProperty)
/* harmony export */ });
class ObjectProperty {
	constructor(key, context){
		this.key = key;
		this.context = context;
	}
	
	get keyDefined(){
		return this.key in this.context; 
	}
	
	get hasValue(){
		return !!this.context[this.key];
	}
	
	get value(){
		return this.context[this.key];
	}
	
	set value(data){
		this.context[this.key] = data;
	}
	
	set append(data) {
		if(!this.hasValue)
			this.value = data;
		else {
			const value = this.value;
			if(value instanceof Array)
				value.push(data);
			else
				this.value = [this.value, data];
		}
	}
	
	remove(){
		delete this.context[this.key];
	}
	
	static load(data, key, create=true) {
		let context = data;
		const keys = key.split("\.");
		let name = keys.shift().trim();
		while(keys.length > 0){
			if(!context[name]){
				if(!create)
					return null;
				
				context[name] = {}
			}
			
			context = context[name];
			name = keys.shift().trim();
		}
		
		return new ObjectProperty(name, context);
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   defGet: () => (/* binding */ defGet),
/* harmony export */   defGetSet: () => (/* binding */ defGetSet),
/* harmony export */   defValue: () => (/* binding */ defValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   equalPojo: () => (/* binding */ equalPojo),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   isNullOrUndefined: () => (/* binding */ isNullOrUndefined),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPojo: () => (/* binding */ isPojo),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");


const equalArraySet = (a, b) => {
	if (a.length !== b.length) return false;
	const length = a.length;
	for (let i = 0; i < length; i++)
		if (!equalPojo(a[i], b[i])) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalMap = (a, b) => {
	if (a.length !== b.length) return false;
	for (const key of a.keys())
		if (!equalPojo(a.get(key), b.get(key))) {
			//console.log("false");
			return false;
		}

	return true;
};

const equalClasses = (a, b) => {
	const clazzA = Object.getPrototypeOf(a);
	const clazzB = Object.getPrototypeOf(b);
	if (clazzA != clazzB) return false;

	if (!clazzA) return true;

	const propertiesA = Object.getOwnPropertyNames(clazzA);
	const propertiesB = Object.getOwnPropertyNames(clazzB);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const equalObject = (a, b) => {
	const propertiesA = Object.keys(a);
	const propertiesB = Object.keys(b);

	if (propertiesA.length !== propertiesB.length) return false;
	for (const key of propertiesA) {
		const valueA = a[key];
		const valueB = b[key];

		if (!equalPojo(valueA, valueB)) return false;
	}
	return true;
};

const isNullOrUndefined = (object) => {
	return object == null || typeof object === "undefined";
};

const isPrimitive = (object) => {
	if (object == null) return true;

	const type = typeof object;
	switch (type) {
		case "number":
		case "bigint":
		case "boolean":
		case "string":
		case "undefined":
			return true;
	}

	return false;
};

const isObject = (object) => {
	if(isNullOrUndefined(object))
		return false;

	return typeof object === "object" && (!object.constructor || object.constructor.name === "Object");
};

/**
 * equalPojo -> compares only pojos, array, set, map and primitives
 */
const equalPojo = (a, b) => {
	const nullA = isNullOrUndefined(a);
	const nullB = isNullOrUndefined(b);
	if (nullA || nullB) return a === b;

	if (isPrimitive(a) || isPrimitive(b)) return a === b;

	const typeA = typeof a;
	const typeB = typeof b;
	if (typeA != typeB) return false;
	if (typeA === "function") return a === b;
	//if (a.constructor !== b.constructor) return false;
	//if (a instanceof Array || a instanceof Set) return equalArraySet(a, b);
	//if (a instanceof Map) return equalMap(a, b);

	return equalObject(a, b) && equalClasses(a, b);
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 *
 * @param aObject:object the object to be testing
 *
 * @return boolean
 */
const isPojo = (object) => {
	if (!isObject(object)) return false;

	for (const key in object) {
		const value = object[key];
		if (typeof value === "function") return false;
	}

	return true;
};

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 *
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *
 *  @return returns the changed object
 */
const append = function (aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true);
		property.append = aData;
	}
	return aObject;
};

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other
 * value would be replaced by value from the source object.
 *
 * sample: merge(target, source-1, source-2, ...source-n)
 *
 * @param target:object the target object to merging into
 * @param sources:object
 *
 * @return object returns the target object
 */
const merge = function (target, ...sources) {
	if (!target) target = {};

	for (let source of sources) {
		if (isPojo(source)) {
			Object.getOwnPropertyNames(source).forEach((key) => {
				if (isPojo(target[key])) merge(target[key], source[key]);
				else target[key] = source[key];
			});
		}
	}

	return target;
};

const buildPropertyFilter = function ({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	};
};

const filter = function () {
	const [data, propFilter, { deep = false, recursive = true, parents = [] } = {}] = arguments;
	const result = {};

	for (let name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined)) result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object" || value instanceof Array || value instanceof Map || value instanceof Set || value instanceof RegExp || parents.includes[value] || value == data) result[name] = value;
			else result[name] = filter(value, propFilter, { deep, recursive, parents: parents.concat(data) });
		}
	}

	return result;
};

const defValue = (o, name, value) => {
	Object.defineProperty(o, name, {
		value,
		writable: false,
		configurable: false,
		enumerable: false,
	});
};
const defGet = (o, name, get) => {
	Object.defineProperty(o, name, {
		get,
		configurable: false,
		enumerable: false,
	});
};

const defGetSet = (o, name, get, set) => {
	Object.defineProperty(o, name, {
		get,
		set,
		configurable: false,
		enumerable: false,
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	isNullOrUndefined,
	isObject,
	equalPojo,
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter,
	defValue,
	defGet,
	defGetSet,
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   lazyPromise: () => (/* binding */ lazyPromise),
/* harmony export */   timeoutPromise: () => (/* binding */ timeoutPromise)
/* harmony export */ });
/* harmony import */ var _ObjectUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");


const timeoutPromise = (fn, ms) =>{
	let canceled = false;
	let timeout = null;
	const promise = new Promise((r, e) => {
		timeout = setTimeout(()=> {
			timeout = null;
			fn(r,e);
		}, ms)
	});

	const then = promise.then;
	promise.then = (fn) => {
		then.call(promise, (result) => {
			if(!undefined.canceled)
				return fn(result);
		});
	}

	;(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "cancel", () => {
		if(timeout){
			clearTimeout(timeout);
			canceled = true;
		}
	});
	(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, canceld, () => canceled);

	return promise;
}


const lazyPromise = () => {
		let promiseResolve = null;
		let promiseError = null;

		const promise = new Promise((r, e) => {
			promiseResolve = r;
			promiseError = e;
		});

		let resolved = false;
		let error = false;
		let value = undefined;

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defValue)(promise, "resolve", (result) => {
			value = result;
			resolved = true;
			if (value instanceof Error) {
				error = true;
				promiseError(value);
			} else promiseResolve(value);
		});

		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "value", () => value);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "error", () => error);
		(0,_ObjectUtils__WEBPACK_IMPORTED_MODULE_0__.defGet)(promise, "resolved", () => resolved);

		return promise;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	lazyPromise,
	timeoutPromise
});


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/UUID.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UUID_SCHEMA: () => (/* binding */ UUID_SCHEMA),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   uuid: () => (/* binding */ uuid)
/* harmony export */ });
//the solution is found here: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
const UUID_SCHEMA = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

const uuid = () => {
	const buf = new Uint32Array(4);
	window.crypto.getRandomValues(buf);
	let idx = -1;
	return UUID_SCHEMA.replace(/[xy]/g, (c) => {
		idx++;
		const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
		const v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ uuid });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js ***!
  \**********************************************************************************/
/***/ (() => {

if (!String.prototype.hashcode)
	String.prototype.hashcode = function() {
		if (this.length === 0)
			return 0;
		
		let hash = 0;
		const length = this.length;
		for (let i = 0; i < length; i++) {
			const c = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + c;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExecuterRegistry: () => (/* reexport module object */ _src_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   ExpressionResolver: () => (/* reexport safe */ _src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _src_executer_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/executer/index.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js");
/* harmony import */ var _src_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");







/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CodeCache)
/* harmony export */ });
/**
 * @typedef {Object} CacheEntry
 * @property {number} lastHit
 * @property {string} key
 * @property {Function} code
 */

/**
 * @typedef {Object} CodeCacheOptions
 * @property {number} [size=1000] - Maximum number of entries in the cache. If set to 0 or less, caching is disabled.
 */

/**
 * CodeCache class to manage caching of generated code snippets.
 */
class CodeCache {
	/** @type {boolean} */
	#disabled = false;
	/** @type {number} */
	#size = 0;
	/** @type {number} */
	#maxSize = 0;
	/** @type {Array<CacheEntry>} */
	#entries = [];
	/** @type {Map<string,CacheEntry} */
	#entryMap = new Map();

	
	 /**
	  * @param {CodeCacheOptions} options
	  */
	constructor({ size = 1000 } = {}) {
		if (size <= 0) this.#disabled = true;
		else {
			this.#size = size > 0 ? size : 1000;
			this.#maxSize = Math.floor(size * 1.1);
		}
	}

	 /**
	  * @param {CodeCacheOptions} options
	  */
	setup({ size = 1000 } = {}) {
		if (size <= 0){
			this.#disabled = true;
			this.clear();
		}
		else {
			this.#size = size > 0 ? size : 1000;
			this.#maxSize = Math.floor(size * 1.1);
			this.#trim();
		}
	}

	has(key) {
		if(this.#disabled) return false;
		return this.#entryMap.has(key);
	}

	get(key) {
		if(this.#disabled) return null;
		const data = this.#entryMap.get(key);
		if (data) {
			data.lastHit = Date.now();
			return data.value;
		}
		return null;
	}

	set(key, code) {
		if(this.#disabled) return;
		let entry = this.#entryMap.get(key);
		if (entry) {
			entry.count = Date.now();
			entry.value = code;
		} else {
			entry = {
				count: Date.now(),
				key,
				value: code,
			};
			this.#entries.push(entry);
			this.#entryMap.set(key, entry);
		}

		if (this.#entryMap.size >= this.#maxSize) this.#trim();
	}

	clear() {
		if(this.#disabled) return;
		this.#entries = [];
		this.#entryMap = new Map();
	}

	#trim() {
		console.debug(`Trimming code cache from ${this.#entries.length} entries to ${this.#size} entries.`);
		this.#entries.sort((a, b) => b.count - a.count);
		if (this.#entries.length >= this.#size) {
			const entriesToRemove = this.#entries.splice(this.#size);
			for (const entry of entriesToRemove) {
				this.#entryMap.delete(entry.key);
			}
		}
	}
};


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DefaultValue)
/* harmony export */ });
/**
 * object for default value
 *
 * @export
 * @class DefaultValue
 * @typedef {DefaultValue}
 */
class DefaultValue {
	/**
	 * Creates an instance of DefaultValue.
	 *
	 * @constructor
	 * @param {*} value
	 */
	constructor(value){
		this.hasValue = arguments.length == 1;
		this.value = value;
	}	
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/Executer.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Executer)
/* harmony export */ });
class Executer{

    #defaultContext;
    #execution;

    /**
     * 
     * @param {Object} option
     * @param {Object} option.defaultContext
     * @param {Function} option.execution
     */
    constructor({defaultContext, execution} = {}){
        this.#defaultContext = defaultContext || {};
        this.#execution = execution || (() => {throw new Error("not implemented")});
    }
    
    get defaultContext(){
        return this.#defaultContext;
    }
    
    execute(aStatement, aContext){
        return this.#execution(aStatement, aContext);
    }
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getExecuter: () => (/* binding */ getExecuter),
/* harmony export */   registrate: () => (/* binding */ registrate)
/* harmony export */ });
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");


const EXECUTERS = new Map();

/**
 *
 * @param {string} aName
 * @param {Executer} anExecuter
 */
const registrate = (aName, anExecuter) => {
	EXECUTERS.set(aName, anExecuter);
};

/**
 *
 * @param {string} aName
 * @returns {Executer}
 */
const getExecuter = (aName) => {
	const executer = EXECUTERS.get(aName);
	if (!executer) throw new Error(`Executer "${aName}" is not registrated!`);
	return executer;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getExecuter);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExpressionResolver)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");
/* harmony import */ var _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultValue.js */ "./node_modules/@default-js/defaultjs-expression-language/src/DefaultValue.js");
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _executer_WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./executer/WithScopedExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js");
/* harmony import */ var _ResolverContextHandle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResolverContextHandle.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");








/** @type {Executer} */
let DEFAULT_EXECUTER = _executer_WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_4__["default"];

const EXECUTION_WARN_TIMEOUT = 1000;
const EXPRESSION = /(\\?)(\$\{(([a-zA-Z0-9\-_\s]+)::)?([^\{\}]+)\})/;
const MATCH_ESCAPED = 1;
const MATCH_FULL_EXPRESSION = 2;
const MATCH_EXPRESSION_SCOPE = 4;
const MATCH_EXPRESSION_STATEMENT = 5;

const DEFAULT_NOT_DEFINED = new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const toDefaultValue = (value) => {
	if (value instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"]) return value;

	return new _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"](value);
};

const execute = async function (anExecuter, aStatement, aContext) {
	if (typeof aStatement !== "string") return aStatement;
	aStatement = normalize(aStatement);
	if (aStatement == null) return aStatement;

	try {
		return await new Promise((resolve) => {
			const timeout = setTimeout(
				() =>
					console.warn(`Long running statement:
				"${aStatement}"
			`),
				EXECUTION_WARN_TIMEOUT,
			);
			resolve(
				(async () => {
					let result = undefined;
					try {
						result = await anExecuter.execute(aStatement, aContext);
					} catch (e) {
						console.warn(`Execution error on statement!
							statement: 
							${aStatement}
							error:
							${e}
							`)
					} finally {
						clearTimeout(timeout);
					}
					return result;
				})(),
			);
		});
	} catch (e) {
		console.error(`Error by statement "${aStatement}":`, e);
	}
};

const resolve = async function (aExecuter = DEFAULT_EXECUTER, aResolver, aExpression, aFilter, aDefault) {
	if (aFilter && aResolver.name != aFilter) return aResolver.parent ? resolve(aResolver.parent, aExpression, aFilter, aDefault, aExecuter) : null;

	const result = await execute(aExecuter, aExpression, aResolver.context);
	if (result !== null && typeof result !== "undefined") return result;
	else if (aDefault instanceof _DefaultValue_js__WEBPACK_IMPORTED_MODULE_2__["default"] && aDefault.hasValue) return aDefault.value;
	return result;
};

const resolveMatch = async (aExecuter, resolver, match, defaultValue) => {
	if (match[MATCH_ESCAPED]) return match[MATCH_FULL_EXPRESSION];

	return resolve(aExecuter, resolver, match[MATCH_EXPRESSION_STATEMENT], normalize(match[MATCH_EXPRESSION_SCOPE]), defaultValue);
};

const normalize = (value) => {
	if (value) {
		value = value.trim();
		return value.length == 0 ? null : value;
	}
	return null;
};

/**
 * ExpressionResolver
 *
 * @export
 * @class ExpressionResolver
 * @typedef {ExpressionResolver}
 */
class ExpressionResolver {
	/**
	 * @param {string} anExecuterName
	 */
	static set defaultExecuter(anExecuter) {
		if ( anExecuter instanceof _Executer_js__WEBPACK_IMPORTED_MODULE_6__["default"]) DEFAULT_EXECUTER = anExecuter;
		else DEFAULT_EXECUTER = (0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__["default"])(anExecuter);
		console.info(`Changed default executer for ExpressionResolver!`);
	}

	static get defaultExecuter() {
		return DEFAULT_EXECUTER;
	}

	/** @type {string|null} */
	#name = null;
	/** @type {ExpressionResolver|null} */
	#parent = null;
	/** @type {function|null} */
	#executer = null;
	/** @type {Proxy|null} */
	#context = null;
	/** @type {ResolverContextHandle|null} */
	#contextHandle = null;

	/**
	 * Creates an instance of ExpressionResolver.
	 * @date 3/10/2024 - 7:27:57 PM
	 *
	 * @constructor
	 * @param {{ context?: any; parent?: any; name?: any; }} param0
	 * @param {object} [param0.context=GLOBAL]
	 * @param {ExpressionResolver} [param0.parent=null]
	 * @param {?string} [param0.name=null]
	 */
	constructor({ context = DEFAULT_EXECUTER.defaultContext, parent = null, name = null, executer } = {}) {
		this.#parent = parent instanceof ExpressionResolver ? parent : null;
		this.#name = name;
		this.#contextHandle = new _ResolverContextHandle_js__WEBPACK_IMPORTED_MODULE_5__["default"](context, this.#parent ? this.#parent.contextHandle : null);
		this.#context = this.#contextHandle.proxy;
		this.#executer = typeof executer === "string" ? (0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_3__["default"])(executer) : undefined;
	}

	get name() {
		return this.#name;
	}

	get parent() {
		return this.#parent;
	}

	get context() {
		return this.#context;
	}

	get contextHandle() {
		return this.#contextHandle;
	}

	/**
	 * get chain path
	 *
	 * @readonly
	 * @returns {string}
	 */
	get chain() {
		return this.parent ? this.parent.chain + "/" + this.name : "/" + this.name;
	}

	/**
	 * get effective chain path
	 *
	 * @readonly
	 * @returns {string}
	 */
	get effectiveChain() {
		return this.parent ? this.parent.effectiveChain + "/" + this.name : "/" + this.name;
	}

	/**
	 * get context chain
	 *
	 * @readonly
	 * @returns {Context[]}
	 */
	get contextChain() {
		const result = [];
		let resolver = this;
		while (resolver) {
			if (resolver.context) result.push(resolver.context);

			resolver = resolver.parent;
		}

		return result;
	}

	/**
	 * get data from context
	 *
	 * @param {string} key
	 * @param {?string} filter
	 * @returns {*}
	 */
	getData(key, filter) {		
		if (!key) return this.context;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.getData(key, filter);
		} else {
			return this.context[key];
		}
	}

	/**
	 * update data at context
	 *
	 * @param {string} key
	 * @param {*} value
	 * @param {?string} filter
	 */
	updateData(key, value, filter) {
		if (!key) return;
		else if (filter && filter != this.name) {
			if (this.parent) this.parent.updateData(key, value, filter);
		} else {
			this.context[key] = value;
		}
	}

	/**
	 * merge context object
	 *
	 * @param {object} context
	 * @param {?string} filter
	 */	
	mergeContext(context, filter) {
		if (filter && filter != this.name) {
			if (this.parent) this.parent.mergeContext(context, filter);
		} else 
			this.#contextHandle.mergeData(context);
	}

	/**
	 * resolved an expression string to data
	 *
	 * @async
	 * @param {string} aExpression
	 * @param {?*} aDefault
	 * @returns {Promise<*>}
	 */
	async resolve(aExpression, aDefault) {
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		try {
			aExpression = aExpression.trim();
			if (aExpression.startsWith("\\${")) return aExpression.substring(1);
			else if (aExpression.startsWith("${") && aExpression.endsWith("}")) return await resolve(this.#executer, this, normalize(aExpression.substring(2, aExpression.length - 1)), null, defaultValue);			
			else return await resolve(this.#executer, this, normalize(aExpression), null, defaultValue);
		} catch (e) {
			console.error('error at executing statment"', aExpression, '":', e);
			return defaultValue.hasValue ? defaultValue.value : aExpression;
		}
	}

	/**
	 * replace all expressions at a string	 *
	 * @async
	 * @param {string} aText
	 * @param {?*} aDefault
	 * @returns {Promise<*>}
	 */
	async resolveText(aText, aDefault) {
		let text = aText;
		let temp = aText; // required to prevent infinity loop
		let match = EXPRESSION.exec(text);
		const defaultValue = arguments.length == 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		while (match != null) {
			const result = await resolveMatch(this.#executer, this, match, defaultValue);
			temp = temp.split(match[0]).join(); // remove current match for next loop
			text = text.split(match[0]).join(typeof result === "undefined" ? "undefined" : result == null ? "null" : result);
			match = EXPRESSION.exec(temp);
		}
		return text;
	}

	/**
	 * resolve an expression string to data
	 *
	 * @static
	 * @async
	 * @param {string} aExpression
	 * @param {?object} aContext
	 * @param {?*} aDefault
	 * @param {?number} aTimeout
	 * @returns {Promise<*>}
	 */
	static async resolve(aExpression, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(resolver.resolve(aExpression, defaultValue));
				}, aTimeout);
			});

		return resolver.resolve(aExpression, defaultValue);
	}

	/**
	 * replace expression at text
	 *
	 * @static
	 * @async
	 * @param {string} aText
	 * @param {?object} aContext
	 * @param {?*} aDefault
	 * @param {?number} aTimeout
	 * @returns {Promise<*>}
	 */
	static async resolveText(aText, aContext, aDefault, aTimeout) {
		const resolver = new ExpressionResolver({ context: aContext });
		const defaultValue = arguments.length > 2 ? toDefaultValue(aDefault) : DEFAULT_NOT_DEFINED;
		if (typeof aTimeout === "number" && aTimeout > 0)
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(resolver.resolveText(aText, defaultValue));
				}, aTimeout);
			});

		return resolver.resolveText(aText, defaultValue);
	}

	/**
	 * build a secure context object
	 *
	 * @static
	 
	 * @param {object} arg
	 * @param {object} arg.context
	 * @param {function} arg.propFilter
	 * @param {{ deep: boolean; }} [arg.option={ deep: true }]
	 * @param {string} arg.name
	 * @param {ExpressionResolver} arg.parent
	 * @returns {object}
	 */
	static buildSecure({ context, propFilter, option = { deep: true }, name, parent }) {
		context = _default_js_defaultjs_common_utils_src_ObjectUtils_js__WEBPACK_IMPORTED_MODULE_1__["default"].filter({ data: context, propFilter, option });
		return new ExpressionResolver({ context, name, parent });
	}
}



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/ResolverContextHandle.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResolverContextHandle)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _ExpressionResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExpressionResolver */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");




const VARNAME_CHECK = /^[$_\p{ID_Start}][$\p{ID_Continue}]*$/u;

const createGlobalCacheWrapper = (handle) => {

	return {
		has: (property) => {
			return true;
		},
		get: (property) => {
			return handle
		},
		set: (property, value) => {			
		},
		delete: (property) => {
			delete _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"][property];
		},
		keys: () => {
			return Object.getOwnPropertyNames(_default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
		}
	}	
}


/**
 * Context object to handle data access
 *
 * @export
 * @class ResolverContextHandle
 */
class ResolverContextHandle {
	/** @type {Proxy|null} */
	#proxy = null;
	/** @type {ResolverContextHandle|null} */
	#parent = null;
	/** @type {object|null} */
	#data = null;
	/** @type {Map<string,ResolverContextHandle>|null} */
	#cache = null;

	/**
	 * Creates an instance of Context.
	 *
	 * @constructor
	 * @param {object} data
	 * @param {ExpressionResolver} resolver
	 */
	constructor(data, parent) {
		this.#data = data || {};
		this.#parent = parent ? parent : null;
		this.#cache = this.#initPropertyCache();

		this.#proxy = new Proxy(this.#data, {
			has: (data, property) => {
				//console.log("has property:", property);
				return this.#hasProperty(property);
			},
			get: (data, property) => {
				//console.log("get property:", property);
				const proxy = this.#getPropertyDef(property);
				return proxy ? proxy.#getProperty(property) : undefined;
			},
			set: (data, property, value) => {
				//console.log("set property:", property, "=", value);
				const proxy = this.#getPropertyDef(property);
				if (proxy) return proxy.#setProperty(property, value);
				else return this.#setProperty(property, value);
			},
			deleteProperty: (data, property) => {
				return this.#deleteProperty(property);
			},
			ownKeys: (data) => {
				//console.log("ownKeys");
				const result = new Set();
				let proxy = this;
				while (proxy) {
					for (let key of proxy.#cache.keys()) {
						result.add(key);
					}
					proxy = proxy.#parent;
				}
				return Array.from(result);
			},

			//@TODO need to support the other proxy actions
		});
	}

	/**
	 * @readonly
	 * @type {Proxy}
	 */
	get proxy() {
		return this.#proxy;
	}

	/**
	 * @readonly
	 * @type {ResolverContextHandle|null}
	 */
	get parent() {
		return this.#parent;
	}

	updateData(data) {
		this.#data = data || {};
		this.#cache = this.#initPropertyCache();
	}

	mergeData(data) {
		if(typeof data !== 'object' || data == null) return;
		Object.assign(this.#data, data);
		this.#cache = this.#initPropertyCache();
	}

	resetCache() {
		this.#cache = this.#initPropertyCache();
	}

	/**
	 *
	 * @returns {Map<string,PropertyDefinition>}
	 */
	#initPropertyCache() {
		const data = this.#data;
		if(data == _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__["default"]) 
			return createGlobalCacheWrapper(this);	

		const cache = new Map();
		for (let property in data) {
			if(VARNAME_CHECK.test(property))	
				cache.set(property, this);
			else
				console.warn(`Variable name is illegal ${property}, variable irgnored!`);
		}

		return cache;
	}

	/**
	 * @param {string} property
	 * @returns {ResolverContextHandle|null}
	 */
	#getPropertyDef(property) {
		if (this.#cache.has(property)) return this.#cache.get(property);
		let parent = this.#parent;
		while (parent) {
			if (parent.#cache.has(property)) return parent.#cache.get(property);
			parent = parent.#parent;
		}
		return null;
	}

	#hasProperty(property) {
		return this.#getPropertyDef(property) != null;
	}
	#getProperty(property) {
		//@TODO write tests!!!
		return this.#data[property];
	}
	#setProperty(property, value) {
		//@TODO would support this action on an proxied resolver context??? write tests!!!
		//console.log("set property data:", property, "=", value);
		this.#data[property] = value;
		this.#cache.set(property, this);
		return true;
	}
	#deleteProperty(property) {
		const propertyDef = this.#cache.get(property);
		if (propertyDef) {
			delete propertyDef.data[property];
			this.#cache.delete(property);
		}
	}
}


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




const EXECUTERNAME = "context-deconstruction-executer";

const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ size: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const generate = (aStatement, contextProperties) => {
	const code = `
return (async ({${contextProperties}}) => {
    try{
        return ${aStatement}
    }catch(e){
        throw e;
    }
})(context || {});`;

	console.log("code", code);

	return new Function("context", code);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement, contextProperties) => {
	const cacheKey = `${contextProperties}::${aStatement}`;
	if (EXPRESSION_CACHE.has(cacheKey)) {
		return EXPRESSION_CACHE.get(cacheKey);
	}
	const expression = generate(aStatement, contextProperties);
	EXPRESSION_CACHE.set(cacheKey, expression);
	return expression;
};

const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
	defaultContext: {},
	execution: (aStatement, aContext) => {
		const propertyNames = Object.getOwnPropertyNames(aContext || {});
		if(propertyNames.length > 50)
			console.warn(`High count of properties at first level, can be decrease the performence! count: ${propertyNames.length}`);

		const contextProperties = propertyNames.join(",");
		const expression = getOrCreateFunction(aStatement, contextProperties);
		return expression(aContext);
	},
});

(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




const EXECUTERNAME = "context-object-executer";
const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ aSize: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const generate = (aStatement) => {
	const code = `
return (async (ctx) => {
    try{
        return ${aStatement}
    }catch(e){
        throw e;
    }
})(context || {});`;

	//console.log("code", code);

	return new Function("context", code);
};

/**
 *
 * @param {string} aStatement
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement) => {

	const cacheKey = aStatement;

	if (EXPRESSION_CACHE.has(cacheKey)) {
		return EXPRESSION_CACHE.get(cacheKey);
	}
	const expression = generate(aStatement);
	EXPRESSION_CACHE.set(cacheKey, expression);
	return expression;
};

const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
	defaultContext: {},
	execution: (aStatement, aContext) => {
		const expression = getOrCreateFunction(aStatement);
	return expression(aContext);
	},
});

(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXECUTERNAME: () => (/* binding */ EXECUTERNAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   setupExecuter: () => (/* binding */ setupExecuter)
/* harmony export */ });
/* harmony import */ var _ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExecuterRegistry.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExecuterRegistry.js");
/* harmony import */ var _Executer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Executer.js */ "./node_modules/@default-js/defaultjs-expression-language/src/Executer.js");
/* harmony import */ var _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CodeCache.js */ "./node_modules/@default-js/defaultjs-expression-language/src/CodeCache.js");




const EXECUTERNAME = "with-scoped-executer";
const EXPRESSION_CACHE = new _CodeCache_js__WEBPACK_IMPORTED_MODULE_2__["default"]({ aSize: 5000 });

/**
 * @param {import('../CodeCache.js').CodeCacheOptions} options
 */
const setupExecuter = (options) => {
	EXPRESSION_CACHE.setup(options);
};

let initialCall = true;

/**
 * 
 * @param {string} aStatement 
 * @returns {Function}
 */
const generate = (aStatement) => {
const code = `
	return (async (context) => {
		with(context){
			try{ 
				return ${aStatement}
			}catch(e){
				throw e;
			}
		}
	})(context || {});
`;
	//console.log("code", code);

	return new Function("context", code);
};

/**
 * 
 * @param {string} aStatement 
 * @returns {Function}
 */
const getOrCreateFunction = (aStatement) => {
	if (EXPRESSION_CACHE.has(aStatement)) {
		return EXPRESSION_CACHE.get(aStatement);
	}
	const expression = generate(aStatement);
	EXPRESSION_CACHE.set(aStatement, expression);
	return expression;
};



const EXECUTER = new _Executer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({defaultContext: {}, execution: (aStatement, aContext) => {
		if(initialCall){
			initialCall = false;
			console.warn(new Error(`With Scoped expression execution is marked as deprecated.`));
		}

		const expression = getOrCreateFunction(aStatement);
		return expression(aContext);
	}});
(0,_ExecuterRegistry_js__WEBPACK_IMPORTED_MODULE_0__.registrate)(EXECUTERNAME, EXECUTER);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EXECUTER);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-expression-language/src/executer/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WithScopedExecuter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WithScopedExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/WithScopedExecuter.js");
/* harmony import */ var _ContextObjectExecuter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextObjectExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextObjectExecuter.js");
/* harmony import */ var _ContextDeconstructorExecuter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContextDeconstructorExecuter.js */ "./node_modules/@default-js/defaultjs-expression-language/src/executer/ContextDeconstructorExecuter.js");
//import "./EsprimaExecuter.js";




/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./node_modules/@default-js/defaultjs-extdom/src/index.js");


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/Global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/Global.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs || {};
_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.defaultjs.extdom || {
	VERSION : "1.0.3",
	utils : {
		Utils: _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"]
	}
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.find = function() {
	return document.find.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.ready = function() {
	return document.ready.apply(document, arguments);
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.create = function(aContent, asTemplate) {
	if (typeof arguments[0] !== "string")
		throw new Error("The first argument must be a string!");
	
	const template = document.createElement("template");
	template.innerHTML = aContent;
	if(asTemplate)
		return template;
	
	return document.importNode(template.content, true).childNodes;
};

_utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script = function(aFile, aTarget) {
	if(aFile instanceof Array)
		return Promise.all(aFile.map(file => _utils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].global.script(file, aTarget)));
	
	if(typeof aFile === "string")	
		return new Promise((r,e) => {
			const script = document.createElement("script");
			script.async = true;
			script.onload = function(){r()};
			script.onerror = function(){throw new Error("load error!")};
			!aTarget ? document.body.append(script) : aTarget.append(script);
			script.src = aFile;
		});
	else
		return Promise.reject("First parameter must be an array of strings or a string!");
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ReadyEventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Document, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

document.addEventListener("DOMContentLoaded", () => document.trigger("ready"));





/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(DocumentFragment, _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);






/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/QuerySupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js");
/* harmony import */ var _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/AttributeSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Element,_extentions_QuerySupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_AttributeSupport__WEBPACK_IMPORTED_MODULE_2__["default"], _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js");



(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(EventTarget, _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/HtmlClassSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js");
/* harmony import */ var _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ShowHideSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js");





(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLElement, _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_1__["default"], _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLInputElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLSelectElement,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLTextAreaElement,(0,_utils_Extender__WEBPACK_IMPORTED_MODULE_1__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		if(arguments.length == 0)
			return this.value;
		else
			this.value = arguments[0]
			
		return this;
	};	
}));

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(HTMLCollection, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

HTMLCollection.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

HTMLCollection.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		HTMLCollection.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

HTMLCollection.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof HTMLElement)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof HTMLCollection || arg instanceof NodeList || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof HTMLElement){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(HTMLCollection.prototype, data);
};


(0,_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			let result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof HTMLCollection)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof HTMLElement || results[0] instanceof HTMLCollection)
		return HTMLCollection.from.apply(null, results);
	else
		return results;
},HTMLCollection.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/DataSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(Node,_extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__["default"],_extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js");




(0,_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__["default"])(NodeList, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__["default"]);

NodeList.prototype.applyTo = function(){
	const args = Array.from(arguments);
	const calling = args.shift();
	const isFunction = typeof calling === "function";
	const results = [];
	for(let i = 0; i < this.length; i++){
		const node = this[i];
		let	result;
		if(isFunction)
			result = calling.apply([node].concat(args));
		else if(typeof node[calling] === "function")
			result = node[calling].apply(node, args);
		
		if(result)
			results.push(result);
	}
	
	return results;
};

NodeList.prototype.val = function() {
	if(arguments.length == 0){
		if(this.length > 0){
			const result = new Map();
			this.forEach(node => {
				if(typeof node.val === "function"){
					const value = node.val();
					if(value)
						result.set((node.name || node.id || node.selector()), node.val());
				}
			});	
			return result;
		}
	}
	else
		NodeList.prototype.applyTo.apply(this, ["val"].concat(Array.from(arguments)));
};

NodeList.from = function(){
	const args = Array.from(arguments);
	const data = {};
	let counter = 0;
	
	while(args.length > 0){
		const arg = args.shift();
		if(typeof arg !== "undefined" && arg != null){
			if(arg instanceof Node)
				data[counter++] = {value: arg, enumerable: true};
			else if(arg instanceof NodeList || arg instanceof HTMLCollection || arg instanceof Array){
				for(let i = 0; i < arg.length; i++){
					if(arg[i] && arg[i] instanceof Node){
						data[counter++] = {value: arg[i], enumerable: true};
					}
				}
			}
		}
	}
	
	data.length = {value: counter};
	return  Object.create(NodeList.prototype, data);
};


(0,_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])(function(aFunctionName, theArguments) {
	let results = [];	
	this.forEach(node => {
		if(node && typeof node[aFunctionName] === "function"){
			const result = node[aFunctionName].apply(node, theArguments);
			if(result){ 
				if(result instanceof NodeList)
					results = results.concat(Array.from(result));
				else
					results.push(result);
			}		
		}
	});
	
	if(results.length === 0)
		return undefined;
	else if(results[0] instanceof Node || results[0] instanceof NodeList)
		return NodeList.from(results);
	else
		return results;
},NodeList.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype, EventTarget.prototype);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/AttributeSupport.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("AttributeSupport", Prototype => {
	Prototype.attr = function() {
		if (arguments.length == 0)
			return this.hasAttributes() ? (() => {
				const result = {};
				this.getAttributeNames().forEach(name => {
					result[name] = this.getAttribute(name);
				});
				return result;
			})() : undefined;
		else if (arguments.length == 1)
			return this.getAttribute(arguments[0]);
		else if (typeof arguments[1] === "undefined" || arguments[1] == null)
			this.removeAttribute(arguments[0]);
		else
			this.setAttribute(arguments[0], arguments[1]);
		
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/DataSupport.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("DataSupport", Prototype => {
	Prototype.data = function() {
		const data = {};
		if (typeof this.dataset !== "undefined")
			for (name in this.dataset)
				data[name] = this.dataset[name];

		this.data = (function() {
			if (arguments.length == 0)
				return data;
			else if (arguments.length == 1)
				return data[arguments[0]];
			else if (typeof arguments[1] === "undefined" || arguments[1] == null)
				delete data[arguments[0]];
			else
				data[arguments[0]] = arguments[1];

			return this;
		}).bind(this);

		return this.data.apply(null, arguments);
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/EventSupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const DEFAULT_TIMEOUT = 100;
const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("EventSupport", (Prototype) => {
	const EVENTSPLITER = /(\s+)|(\s*,\s*)/;
	const getWrapperHandleMap = (element) => {
		if (!element.__wrapperhandlemap__) element.__wrapperhandlemap__ = new Map();

		return element.__wrapperhandlemap__;
	};

	const getTriggerTimeouts = (element) => {
		if (!element.___EVENTTRIGGERTIMEOUTS___) element.___EVENTTRIGGERTIMEOUTS___ = {};

		return element.___EVENTTRIGGERTIMEOUTS___;
	};

	const removeWrapper = (element, data, eventTypes) => {
		const { wrapper, option, events, handle } = data;
		const capture = option.capture;
		if (eventTypes) {
			eventTypes = typeof eventTypes === "string" ? eventTypes.split(EVENTSPLITER) : eventTypes;
			for (let event of eventTypes) {
				const index = events.indexOf(event);
				if (index >= 0) {
					element.removeEventListener(event, wrapper, capture);
					events.splice(index, 1);
				}
				if (events.length == 0) getWrapperHandleMap(element).delete(handle);
			}
		} else {
			for (let event of events) {
				element.removeEventListener(event, wrapper, capture);
			}
			getWrapperHandleMap(element).delete(handle);
		}
	};

	Prototype.on = function () {
		if (arguments.length < 2) throw new Error("Too less arguments!");

		const args = Array.from(arguments);
		let events = typeof args[0] === "string" ? args.shift().split(EVENTSPLITER) : args.shift();
		const filter = typeof args[0] === "string" ? args.shift() : null;
		const handle = args.shift();
		const option = typeof args[0] === "undefined" ? { capture: false, once: false, passive: false } : typeof args[0] === "boolean" ? { capture: args.shift(), once: false, passive: false } : args.shift();
		const wrapper = function (event) {
			if (filter) {
				const target = event.target;
				if (typeof target.is === "function" && !target.is(filter)) return;
			}
			const result = handle.apply(null, arguments);
			if (option.once) removeWrapper(this, wrapper);
			return result;
		};

		getWrapperHandleMap(this).set(handle, { handle, wrapper: wrapper, events, option });

		for (let event of events) {
			this.addEventListener(event, wrapper, option);
		}

		return this;
	};

	Prototype.removeOn = function (handle, event, capture) {
		const data = getWrapperHandleMap(this).get(handle);
		if (data) removeWrapper(this, data, event);
		else this.removeEventListener(handle, event, capture);

		return this;
	};

	Prototype.trigger = function () {
		const args = Array.from(arguments);
		const timeout = typeof args[0] === "number" ? args.shift() : -1;
		if (timeout >= 0) {
			const type = args[0];
			const timeouts = getTriggerTimeouts(this);
			const timeoutid = timeouts[type];
			if (timeoutid) clearTimeout(timeoutid);

			timeouts[type] = setTimeout(() => {
				delete timeouts[type];
				this.trigger.apply(this, args);
			}, timeout);
		} else {
			const type = args.shift();
			const delegate = args[0] instanceof Event ? args.shift() : null;
			const data = args.length >= 1 ? (args.length == 1 ? args.shift() : args) : delegate;
			const event = data ? new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: data }) : new Event(type, { bubbles: true, cancelable: true, composed: true });

			if (delegate) event.delegatedEvent = delegate;
			this.dispatchEvent(event);
		}
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/HtmlClassSupport.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("HtmlClassSupport", Prototype => {	
	Prototype.addClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.add(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,clazz => this.classList.add(clazz));
		
		return this;
	};
	
	Prototype.removeClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.remove(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.remove(clazz));
		
		return this;		
	};
	
	Prototype.toggleClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach(clazz => this.classList.toggle(clazz));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments, clazz => this.classList.toggle(clazz));
		
		return this;
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ListSupport.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ListSupport", Prototype => {		
	Prototype.indexOf = function() {
		for(let i = 0; i < this.length; i++)
			if(this[i] == arguments[0])
				return i;
		
		return -1;
	};

	Prototype.forEach = function(){
		return Array.prototype.forEach.apply(Array.from(this), arguments);
	};
	
	Prototype.map = function(){
		return Array.prototype.map.apply(Array.from(this), arguments);
	};
	
	Prototype.filter = function(){
		return Array.prototype.filter.apply(Array.from(this), arguments);
	};

	Prototype.first = function(){
		if(this.length > 0)
			return this[0];
	};	
	
	Prototype.last = function(){
		if(this.length > 0)
			return this[this.length - 1];
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ManipulationSupport.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");



const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ManipulationSupport", Prototype => {	
	Prototype.empty = function(){
		let nodes = this.childNodes
		while(nodes.length != 0)			
			nodes[0].remove(true);
		
		return this;
	};
	
	Prototype.content = function(){
		return this.childNodes;
	};	
	
	Prototype.html = function(){
		if(arguments.length == 0)			
			return this.innerHTML;
		else if(arguments.length == 1 && typeof arguments[0] === "boolean")
			if(arguments[0])
				return this.outerHTML;
			else
				return this.innerHTML;
		else 
			Array.from(arguments).forEach(content => {
				this.empty();
				if(typeof content === "string")
					this.append(content);
				else if(content instanceof Node || content instanceof NodeList || content instanceof HTMLCollection){
					this.append(content);
				}
			});		
			
		return this;
	};
	
	const append = function(){
		const append = Prototype.appendChild.bind(this);
		for(let i = 0; i < arguments.length; i++){
			let arg = arguments[i];
			if(arg instanceof Node)
				this.appendChild(arg);
			else if(typeof arg === "string")
				create(arg).forEach(append);
			else if(typeof arg.forEach === "function")
				arg.forEach(append);
		}
	};	
	Prototype.append = append;
	
	const prepend = function(aFirstElement, aElement){
		this.insertBefore(aElement, aFirstElement);
	};
	Prototype.prepend = function(){
		if(this.childNodes.length == 0)
			append.apply(this, arguments);
		else {
			const first = this.childNodes.first();
			const insert = prepend.bind(this, first);
			for(let i = 0; i < arguments.length; i++){
				const arg = arguments[i];
				if(arg instanceof Node)
					insert(arg);
				else if(typeof arg === "string")
					arg.forEach(insert);
				else if(typeof arg.forEach === "function")
					arg.forEach(insert);
			}
		}
	};
	
	Prototype.replace = function(){
		if(arguments.length < 1)
			throw new Error("Insufficient arguments! One or two nodes required!");
		
		const parent = arguments.length == 1 ? this.parentNode : this;
		const oldNode = arguments.length == 1 ? this : arguments[0];
		const newNode = arguments.length == 1 ? arguments[0] : arguments[1];
		
		if(newNode instanceof Array || newNode instanceof NodeList || newNode instanceof HTMLCollection){
			newNode.forEach(aItem => parent.insertBefore(aItem, oldNode));
			oldNode.remove();
		}
		else
			parent.replaceChild(newNode,oldNode);
	};
	
	Prototype.after = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const next = this.nextSibling;
		if(next)
			Prototype.before.apply(next, arguments);
		else
			Prototype.append.apply(parent, arguments);
	};	
	
	Prototype.before = function(){
		if(this.parentNode == null)
			throw new Error("Can't insert nodes after this node! Parent node not available!");
		
		const parent = this.parentNode;
		const inserter = (node) => {parent.insertBefore(node, this);}
		for(let i = 0; i < arguments.length; i++){
			const arg = arguments[i];
			if(arg instanceof Node)
				inserter(arg);
			else if(typeof arg === "string")
				arg.forEach(inserter);
			else if(typeof arg.forEach === "function")
				arg.forEach(inserter);
		}
	};	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/QuerySupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


//const parentSelector = /:parent(\(\s*"?\s*([^\)"]*)\s*"?\s*\))?/i;
const parentSelector = /:parent(\(\s*(.*)\s*\))?/i;
/**
 * @param {string} subquery 
 */
const cleanupSubSelector = (subquery) => {
	if(typeof subquery !== "string") return null;
	subquery = subquery.trim();
	if((subquery.startsWith('"') && subquery.endsWith('"'))
		|| (subquery.startsWith("'") && subquery.endsWith("'")))
		subquery = subquery.substring(1, subquery.length -1);
	return subquery.trim();
};

/**
 * 
 * @param {HTMLElement} aElement 
 * @param {string} aSelector 
 * @returns {NodeList}
 */
const queryExecuter = function (aElement, aSelector) {
	let match = parentSelector.exec(aSelector);
	if (match) {
		let result = aElement;
		if (match.index > 0) {
			result = aElement.querySelectorAll(aSelector.substr(0, match.index));
			if (result.length == 0) return;
		}
		result = result.parent(cleanupSubSelector(match[2]));
		if (result) {
			let nextSelector = aSelector.substr(match.index + match[0].length).trim();
			if (nextSelector.length > 0) result = result.find(nextSelector);

			return result;
		}
	} else return aElement.querySelectorAll(aSelector);
};

const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("QuerySupport", (Prototype) => {
	Prototype.find = function () {
		let nodes = [];
		let args = Array.from(arguments);
		let arg = args.shift();
		while (arg) {
			if (typeof arg === "string") {
				let result = queryExecuter(this, arg);
				if (result) nodes.push(result);
			}

			arg = args.shift();
		}

		let result = NodeList.from.apply(null, nodes);
		return result;
	};

	Prototype.is = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return false;
		else if (arguments.length == 1) {
			if (typeof arguments[0] === "string") return this.matches(arguments[0]);
			else if (typeof arguments[0].length === "number") {
				let filter = arguments[0];
				for (let i = 0; i < filter.length; i++) if (this.matches(filter[i])) return true;
			}
		} else if (arguments.length > 1) return this.is(Array.from(arguments));

		return false;
	};

	Prototype.parent = function (selector, ignoreShadowRoot) {
		if (!this.parentNode) return null;
		ignoreShadowRoot = typeof selector === "boolean" ? selector : ignoreShadowRoot;
		selector = typeof selector === "string" ? selector : null;

		let parent = this.parentNode;
		if (parent instanceof ShadowRoot && ignoreShadowRoot) parent = parent.host;

		if (selector) {
			try {
				while (parent && !parent.is(selector)) parent = parent.parent(selector, ignoreShadowRoot);
			} catch (e) {
				console.error("this:", this, "parent:", parent, "error:", e);
			}
			return parent;
		}
		return parent;
	};

	Prototype.parents = function () {
		let result = new Array();
		let parent = Prototype.parent.apply(this, arguments);
		while (parent) {
			result.push(parent);
			parent = Prototype.parent.apply(parent, arguments);
		}

		return NodeList.from(result);
	};

	Prototype.selector = function () {
		if (this instanceof Document || this instanceof DocumentFragment) return undefined;
		else if (this.id) return "#" + this.id;
		else {
			let selector = this.tagName.toLowerCase();
			let parent = this.parent();
			if (parent) {
				let sameTagSiblings = parent.find(":scope>" + selector);
				if (sameTagSiblings instanceof NodeList) {
					let index = sameTagSiblings.indexOf(this);
					if (index > 0) selector += ":nth-child(" + (index + 1) + ")";
				}
				let parentSelector = parent.selector();
				return parentSelector ? parentSelector + ">" + selector : selector;
			}
			return selector;
		}
	};

	Prototype.closest = function (aQuery) {
		return this.closests(aQuery).first();
	};

	Prototype.closests = function (aQuery) {
		const result = this.find(aQuery);
		if (result.length != 0) return result;
		
		const parent = this.parentElement;
		if (parent) return parent.closests(aQuery);

		return NodeList.from([]);
	};

	Prototype.nested = function (aQuery) {
		if (this.is(aQuery)) return NodeList.from(this);

		let nested = this.find(aQuery);
		if (nested && nested.length > 0) return nested;
		else return NodeList.from(this.parent(aQuery));
	};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ReadyEventSupport.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ReadyEventSupport", Prototype => {
	Prototype.ready = function(aFunction, once){	
		this.on("ready", aFunction, once);
		if(document.readyState == "complete")			
			this.trigger("ready");
		
		return this;
	};
	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ShowHideSupport.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const HIDEVALUE = "none";

const isHidden = (element) => {
	return element.style.display === HIDEVALUE
};

const init = (element) => {	
	let display = !isHidden(element) ? element.style.display : "";
	
	element.show = (function(){
		this.style.display = display;
		return this;		
	}).bind(element);
	
	element.hide = (function(){
		this.style.display = HIDEVALUE;
		return this;		
	}).bind(element);
	
	return element;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ShowHideSupport", Prototype => {
	Prototype.show = function() {
		return init(this).show.apply(null, arguments)
	};

	Prototype.hide = function() {
		return init(this).hide.apply(null, arguments)
	};

	Prototype.toggleShow = function() {
		return isHidden(this) ? this.show() : this.hide();
	};

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/dom/extentions/ValueSupport.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Extender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Extender */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js");


const InputTypes = [
	{
		selector : "select",
		get : function(){
			const result = [];
			this.find("option").forEach(option => {
				if(option.selected)
					result.push(option.value);
			});			
			return result;
		},
		set : function(){				
			let values = [];
			const args = Array.from(arguments);
			let arg = args.shift();
			while(arg){
				if(Array.isArray(arg))
					values = values.concat(arg);
				else
					values.push(arg);
				
				arg = args.shift();
			}
			this.value = values;
			this.find("option").forEach(option => option.selected = values.indexOf(option.value) >= 0);			
			this.trigger("changed");
		}			
	},
	{
		selector : "input[type=\"checkbox\"], input[type=\"radio\"]",
		get : function(){
			if(this.value == "on" || this.value == "off")
				return this.checked;
			else if(this.checked)
				return this.value;				
		},
		set : function(aValue){
			if(typeof aValue === "boolean")
				this.checked = aValue;
			else if(typeof aValue === "string")
				this.checked = this.value == aValue;
			else if(Array.isArray(aValue))
				this.checked = aValue.indexOf(this.value) >= 0;
			
			this.trigger("changed");
		}
	}
];

const DefaultInputType = {
		get : function(){
			return this.value;
		},
		set : function(aValue){
			this.value = aValue;
			this.trigger("input");
		}	
};

const getInputType = function(aElement){
	for(let i = 0; i < InputTypes.length; i++)
		if(aElement.is(InputTypes[i].selector))
			return InputTypes[i];		
	return DefaultInputType;
};


const support = (0,_utils_Extender__WEBPACK_IMPORTED_MODULE_0__["default"])("ValueSupport", Prototype => {	
	Prototype.val = function() {
		let type = getInputType(this);
		if(arguments.length == 0)
			return type.get.apply(this, arguments);
		else
			type.set.apply(this, arguments);
			
		return this;
	};	
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (support);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_EventTarget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/EventTarget */ "./node_modules/@default-js/defaultjs-extdom/src/dom/EventTarget.js");
/* harmony import */ var _dom_Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Node */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Node.js");
/* harmony import */ var _dom_Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/Element */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Element.js");
/* harmony import */ var _dom_Document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/Document */ "./node_modules/@default-js/defaultjs-extdom/src/dom/Document.js");
/* harmony import */ var _dom_DocumentFragment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/DocumentFragment */ "./node_modules/@default-js/defaultjs-extdom/src/dom/DocumentFragment.js");
/* harmony import */ var _dom_HTMLElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom/HTMLElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLElement.js");
/* harmony import */ var _dom_HTMLInputElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom/HTMLInputElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLInputElement.js");
/* harmony import */ var _dom_HTMLTextAreaElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dom/HTMLTextAreaElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLTextAreaElement.js");
/* harmony import */ var _dom_HTMLSelectElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom/HTMLSelectElement */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HTMLSelectElement.js");
/* harmony import */ var _dom_NodeList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom/NodeList */ "./node_modules/@default-js/defaultjs-extdom/src/dom/NodeList.js");
/* harmony import */ var _dom_HtmlCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom/HtmlCollection */ "./node_modules/@default-js/defaultjs-extdom/src/dom/HtmlCollection.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Global */ "./node_modules/@default-js/defaultjs-extdom/src/Global.js");














/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/DelegaterBuilder.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DelegaterBuilder = function() {
	const args = Array.from(arguments);
	const callback = args.shift();
	const source = args.shift();
	args.forEach( target =>{
		Object.getOwnPropertyNames(target)
		.forEach(name => {
			const prop = Object.getOwnPropertyDescriptor(target, name);
			if (typeof source[name] === "undefined" && typeof prop.value === "function")
				source[name] = function(){
					return callback.call(this, name, arguments);
				};										
		});
	});
	
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DelegaterBuilder);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/ExtendPrototype.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const extendPrototype = function(){
	const args = Array.from(arguments);
	const type = args.shift();	
	while(args.length > 0){
		const extender = args.shift();
		extender(type);
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extendPrototype);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Extender.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js");


const EXTENSIONS_MAP = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].globalVar("___DOM_API_EXTENSION_MAP___", {});
const Extender = function(aName, aExtention){
	return function(aType){	
		let extensions = EXTENSIONS_MAP[aType.name];
		if(!extensions)
			extensions = EXTENSIONS_MAP[aType.name] = {};		
		
		if(!extensions[aName]){
			extensions[aName] = true;
			aExtention(aType.prototype);
		}
		else
			console.warn("duplicated load of extension \"" + aName + "\"!");
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Extender);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-extdom/src/utils/Utils.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Utils = {
	global : (() => {
		if(typeof window !== "undefined") return window;
		if(typeof __webpack_require__.g !== "undefined") return __webpack_require__.g;
		if(typeof self !== "undefined") return self;
		return {};		
	})(),
	globalVar : function(aName, aInitValue){
		if(arguments.length === 2 && typeof Utils.global[aName] === "undefined")
			Utils.global[aName] = aInitValue;
		
		return Utils.global[aName];		
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils);

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   componentBaseOf: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__.componentBaseOf),
/* harmony export */   createUUID: () => (/* reexport safe */ _src_Component_js__WEBPACK_IMPORTED_MODULE_0__.createUUID),
/* harmony export */   define: () => (/* reexport safe */ _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__.define)
/* harmony export */ });
/* harmony import */ var _src_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Component.js */ "./node_modules/@default-js/defaultjs-html-components/src/Component.js");
/* harmony import */ var _src_utils_DefineComponentHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utils/DefineComponentHelper.js */ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js");







/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Component.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Component.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentBaseOf: () => (/* binding */ componentBaseOf),
/* harmony export */   createUUID: () => (/* binding */ createUUID),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/UUID */ "./node_modules/@default-js/defaultjs-common-utils/src/UUID.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");
/* harmony import */ var _utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/EventHelper */ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js");




/*
const PRIVATE_READY = privatePropertyAccessor("ready");

const TIMEOUTS = new WeakMap();
const init = (component) => {
	let timeout = TIMEOUTS.get(component);
	if (timeout) clearTimeout(timeout);

	TIMEOUTS.get(component, setTimeout(async () => {
		TIMEOUTS.delete(component);
		const ready = PRIVATE_READY(component);
		try{
			await component.init();
			ready.resolve();
		}catch(e){
			console.error("Can't initialize component!", component, e);
			ready.resolve(e);
		}
		component.trigger(componentEventname("initialzed", component));
	}, initTimeout));	
};
*/

/**
 * @function createUID
 * 
 * create an unique identifire.
 * 
 * @param {string} [prefix] 
 * @param {string} [suffix]
 * @returns 
 */
const createUUID = (prefix, suffix) => {
	let count = 0;
	let id = null;
	while (count < 100) {
		id = `${prefix ? prefix : ""}${(0,_default_js_defaultjs_common_utils_src_UUID__WEBPACK_IMPORTED_MODULE_1__.uuid)()}${suffix ? suffix : ""}`;
		if (!document.getElementById(id)) return id;

		count++;
	}
	console.error(new Error("To many retries to create an unique id - created id is not unique!"));
	return id;
};

const buildClass = (htmlBaseType) => {
	const clazz = class Component extends htmlBaseType {

		static get NODENAME() {
			return this.nodeName.toLowercase();
		}

		static get observedAttributes() {
			return [];
		}

		#ready = null;
		#postConstructs = [];

		constructor({ shadowRoot = false, content = null, createUID = false, uidPrefix = "id-", uidSuffix = "", postConstucts = null } = {}) {
			super();
			this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
			if (createUID) this.#postConstructs.push(async () => this.attr("id", createUUID(uidPrefix, uidSuffix)));
			
			if (shadowRoot) this.attachShadow({ mode: "open" });

			if (content) this.root.append(typeof content === "function" ? content(this) : content);

			if(postConstucts instanceof Array)
				for(let post of postConstucts)
					if(typeof post === "function")
						this.#postConstructs.push(post)
		}

		
		/**
		 * Array of post construct functions
		 *
		 * @readonly
		 * @type {Array<Function>}
		 */
		get postConstructs(){
			return this.#postConstructs;
		}

		
		/**
		 * root
		 *
		 * @readonly
		 * @type {HTMLElement|ShadowRoot}
		 */
		get root() {
			return this.shadowRoot || this;
		}

		
		/**
		 * ready
		 *
		 * @readonly
		 * @type {Promise}
		 */
		get ready() {
			return this.#ready;
		}

		/**
		 * @function init
		 * @async
		 *
		 * @returns {Promise}
		 */
		async init() {
			for (let func of this.#postConstructs) await func(this);
		}

		/**
		 * 
		 */
		async destroy() {
			if (this.ready.resolved) this.#ready = (0,_default_js_defaultjs_common_utils_src_PromiseUtils__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		}

		connectedCallback() {
			if (this.ownerDocument == document && this.isConnected)
				//init(this)
				this.init()
					.then((value) => this.#ready.resolve(value))
					.catch((error) => this.#ready.resolve(error));
		}

		adoptedCallback() {
			this.connectedCallback();
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue != newValue && this.isConnected) {
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.attributeChangeEventname)(name, this));
				this.trigger(_Constants__WEBPACK_IMPORTED_MODULE_2__.triggerTimeout, (0,_utils_EventHelper__WEBPACK_IMPORTED_MODULE_3__.componentEventname)("change", this));
			}
		}

		disconnectedCallback() {
			this.destroy();
		}
	};

	return clazz;
};

const CLAZZMAP = new Map();

const componentBaseOf = (htmlBaseType) => {
	let clazz = CLAZZMAP.get(htmlBaseType);
	if (clazz == null) {
		clazz = buildClass(htmlBaseType);
		CLAZZMAP.set(htmlBaseType, clazz);
	}

	return clazz;
};

const Component = componentBaseOf(HTMLElement);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/Constants.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeChangeEventPrefix: () => (/* binding */ attributeChangeEventPrefix),
/* harmony export */   componentPrefix: () => (/* binding */ componentPrefix),
/* harmony export */   initTimeout: () => (/* binding */ initTimeout),
/* harmony export */   triggerTimeout: () => (/* binding */ triggerTimeout)
/* harmony export */ });
const componentPrefix = "d-";
const attributeChangeEventPrefix = "attribute-";
const initTimeout = 10;
const triggerTimeout = 10;


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/DefineComponentHelper.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   define: () => (/* binding */ define),
/* harmony export */   toNodeName: () => (/* binding */ toNodeName)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return _Constants__WEBPACK_IMPORTED_MODULE_0__.componentPrefix + name;
};

const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (define); 


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-html-components/src/utils/EventHelper.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeChangeEventname: () => (/* binding */ attributeChangeEventname),
/* harmony export */   componentEventname: () => (/* binding */ componentEventname),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


/**
 * @function componentEventname
 * 
 * creates an event name for an component
 * 
 * @param {string} eventType 
 * @param {string|HTMLElement|Component} node 
 * @param {string} [separator] default is ":"
 * 
 * @returns {string} 
 */
const componentEventname = (eventType, node, separator = ":" ) => {	
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(`${typeof node} is not supported as parameter "node"!`);
	
   return `${nodename.toLowerCase()}${separator}${eventType}`;//use @ as separtor and not :
};

/**
 * @function attributeChangeEventname
 *  * 
 * @param {string} attribute 
 * @param {string|HTMLElement|Component} node 
 * @param {string} [separator] default is ":"
 * 
 * @returns {string}
 */
const attributeChangeEventname = (attribute, node, separator = ":"  ) => {
    return componentEventname(`${_Constants__WEBPACK_IMPORTED_MODULE_0__.attributeChangeEventPrefix}-${attribute}`, node, separator);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({componentEventname, attributeChangeEventname});

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Renderer: () => (/* reexport safe */ _src_Renderer_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Template: () => (/* reexport safe */ _src_Template_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   toAsyncTemplateLoader: () => (/* reexport safe */ _src_Template_js__WEBPACK_IMPORTED_MODULE_0__.toAsyncTemplateLoader)
/* harmony export */ });
/* harmony import */ var _src_Template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");
/* harmony import */ var _src_Renderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Renderer.js */ "./node_modules/@default-js/defaultjs-template-language/src/Renderer.js");





/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Context.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Context.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Context)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/PromiseUtils.js */ "./node_modules/@default-js/defaultjs-common-utils/src/PromiseUtils.js");
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _Template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");
/* harmony import */ var _default_js_defaultjs_expression_language_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/index.js */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _Renderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Renderer.js */ "./node_modules/@default-js/defaultjs-template-language/src/Renderer.js");






const PRIVATE_WAIT = "wait";
const PRIVATE_CALLBACKS = "callbacks";
const PRIVATE_IGNOREDIRECTIVES = "ignoreDirectives";

const CONTEXTCLONE = new Set();
const CONTEXTS = new Map();
const WARNTIME = 1000;
const CRITICALTIME = 10000;

let observerTimeout = null;
const observe = (context) => {
	CONTEXTS.set(context, Date.now());
	runObserver();
};
const runObserver = () => {
	if (observerTimeout == null) {
		observerTimeout = setTimeout(() => {
			observerTimeout = null;
			const time = Date.now();
			CONTEXTS.forEach((createTime, context) => {
				const delta = time - createTime;
				if (context.closed) CONTEXTS.delete(context);
				else {
					if (delta > CRITICALTIME) {
						console.error("context lives longer then 10s", delta / 1000, context);
					} else if (delta > WARNTIME) {
						console.warn("context lives longer then 1s", delta / 1000, context);
					}
				}
			});
			console.log("open context:", CONTEXTS.size);
			if (CONTEXTS.size > 0) runObserver();
		}, 1000);
	}
};

const toTemplate = (template) => {
	if (template instanceof _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"]) return template.importContent();
	else if (typeof template === String) return create(template);
	return template;
};

let id = 0;
class Context {
	#id;
	#depth;
	#parent;
	#renderer;
	#root;
	#template;
	#mode;
	#subcontexts;
	#wait;
	#ignoreDirectives;
	#callbacks;

	
	/**
	 * Creates an instance of Context.
	 *
	 * @constructor
	 * @param {object} options
	 * @param {NodeList} [options.content=null] 
	 * @param {ExpressionResolver} options.resolver 
	 * @param {Renderer} options.renderer 
	 * @param {Template|string} options.template 
	 * @param {HTMLElement} options.container 
	 * @param {HTMLElement} options.root 
	 * @param {string} [options.mode="replace"] 
	 * @param {HTMLElement} [options.target=null] 
	 * @param {Context} [options.parent=null] 
	 * @param {Promise<>} [options.wait=null] 
	 * @param {Array<Function>} [options.callbacks=null] 
	 * @param {Set<Directive|string>} options.ignoreDirective 
	 */
	constructor({ content = null, resolver, renderer, template, container, root, mode = "replace", target = null, parent = null, wait = null, callbacks = null, ignoreDirective }) {
		if (!resolver) throw new Error('Parameter "resolver" is required!');
		if (!renderer) throw new Error('Parameter "renderer" is required!');
		if (!template) throw new Error('Parameter "template" is required!');
		if (!container) throw new Error('Parameter "container" is required!');
		if (!root) throw new Error('Parameter "root" is required!');

		this.#id = parent ? `${parent.id}->${id++}` : `root::${id++}`;
		this.#depth = parent ? parent.depth + 1 : 0;
		this.#parent = parent;
		this.#renderer = renderer;
		this.#root = root;
		this.#template = toTemplate(template);
		this.#mode = mode;
		this.#subcontexts = new Set();
		this.#wait = wait ? wait : (0,_default_js_defaultjs_common_utils_src_PromiseUtils_js__WEBPACK_IMPORTED_MODULE_0__.lazyPromise)();
		this.#ignoreDirectives = ignoreDirective instanceof Set ? ignoreDirective : new Set();
		this.#callbacks = callbacks instanceof Array ? callbacks : [];

		this.content = content;
		this.container = container;
		this.target = target;
		this.resolver = resolver;

		/* execution flags */
		this.stop = false;
		this.ignore = false;
		//console.log(`context={"depth":${this.depth} }, "id": ${this.id}`);
		//this.createtAt = new Error();

		if (parent) {
			parent.subcontexts.add(this);
		}
	}

	get id() {
		return this.#id;
	}
	get depth() {
		return this.#depth;
	}
	get parent() {
		return this.#parent;
	}
	get renderer() {
		return this.#renderer;
	}
	get root() {
		return this.#root;
	}
	get template() {
		return this.#template;
	}
	set template(template){
		this.#template = toTemplate(template);
	}

	get mode() {
		return this.#mode;
	}
	get subcontexts() {
		return this.#subcontexts;
	}

	get closed() {
		return this.#wait.resolved;
	}

	ignoreDirective(directive) {
		const ignoreDirectives = this.#ignoreDirectives;
		directive instanceof _Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? ignoreDirectives.add(directive.name) : ignoreDirectives.add(directive);
	}

	acceptDirective(directive) {
		const ignoreDirectives = this.#ignoreDirectives;
		if (directive instanceof _Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"]) return !(ignoreDirectives.has(directive.name) || ignoreDirectives.has(directive));

		return !ignoreDirectives.has(directive);
	}

	finished(callback) {
		if (this.parent) this.parent.finished(callback);
		else this.ready(callback);
	}

	async ready(callback) {
		const callbacks = this.#callbacks;
		if (callback) {
			if (callback instanceof Array) callback.forEach((callback) => this.wait.then(callback));
			else if (callback instanceof Promise) callbacks.push(async () => await callback);
			else if (typeof callback === "function") callbacks.push(callback);
		} else {
			const wait = this.#wait;
			if (!wait.resolved) {
				if (!this.ignore) for (let callback of callbacks) await callback(this);

				for (let child of this.subcontexts) await child.ready();

				if (this.parent) this.parent.subcontexts.delete(this);

				wait.resolve(this);
			}

			return wait;
		}
	}

	subContext({ resolver = this.resolver, renderer = this.renderer, template = this.template, container = this.container, root = this.root, mode = this.mode, target = this.target, ignoreDirective = null } = {}) {
		return new Context({ resolver, renderer, template, container, mode, root, target, parent: this, ignoreDirective });
	}

	clone({ content = this.content, template = this.template, container = this.container, root = this.root, mode = this.mode, target = this.target, ignoreDirective = this.#ignoreDirectives } = {}) {
		return new Context({ content, 
			resolver: this.resolver, 
			renderer: this.renderer, 
			template, 
			container, 
			root, 
			mode, 
			target, 
			ignoreDirective,
			wait: this.#wait,
			callbacks: this.#callbacks
		 });
	}

	toRenderOption({ resolver = this.resolver, renderer = this.renderer, template = this.template, container = this.container, root = this.root, mode = this.mode, target = this.target, ignoreDirective = null } = {}) {
		return { resolver, renderer, template, container, mode, root, target, parent: null, ignoreDirective };
	}
}


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Directive.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PHASE: () => (/* binding */ PHASE),
/* harmony export */   "default": () => (/* binding */ Directive)
/* harmony export */ });
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-template-language/src/Context.js");



const DEFINED_DIRECTIVES = [];


/**
 * @param {object} options
 * @param {Directive} options.directive 
 */
const defineDirective = ({ directive }) => {
	if (!(directive instanceof Directive))
		throw new Error("Implementation dosn't extend Directive class!");

	if (directive.rank < Directive.MIN_RANK)
		throw new Error("The rank of a directive can't be lower as " + Directive.MIN_RANK + "!");

	if (directive.rank > Directive.MAX_RANK)
		throw new Error("The rank of a directive can't be grater as " + Directive.MAX_RANK + "!");

	DEFINED_DIRECTIVES.push(directive);
	DEFINED_DIRECTIVES.sort((a, b) => {
		const phase = a.phase - b.phase;
		if(phase == 0)
			return a.rank - b.rank;
			
		return phase;
	});
};

/**
 * @readonly
 * @enum {number}	
 */
const PHASE = {
	init: 0,
	data: 1,
	template: 2,
	content: 3,
	finish: 4
};

class Directive {

	/** @enum {PHASE} */
	static get PHASE() { return PHASE };
	/** @enum {number} */
	static get MIN_RANK() { return 0 };
	/** @enum {number} */
	static get MAX_RANK() { return 100000 };

	constructor() { };

	/**
	 * @abstract 
	 * @enum {string} 
	 */
	get name() { }
	/** 
	 * @abstract
	 * @enum {number} 
	 */
	get rank() { }
	/**
	 * @abstract 
	 * @enum {PHASE} 
	 */
	get phase() {return PHASE.finish}

	/**
	 * @abstract
	 * @param {Context} context 
	 * @returns 
	 */
	async execute(context) {
		return context;
	}

	/**
	 * @static
	 * @param {object} options
	 * @param {Directive} options.directive 
	 */
	static define(option) {
		defineDirective(option);
	}

	
	/**
	 * @static
	 * @readonly
	 * @type {Array<Directive>}
	 */
	static get directives() {
		return DEFINED_DIRECTIVES;
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Element.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Element.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DirectiveElement)
/* harmony export */ });
class DirectiveElement extends HTMLElement{
	constructor(){
		super();
		this.hidden = true;
	}
	
	/**
	 * need to be implemented
	 * 
	 */
	async execute({template, context}){
		context.content = template.cloneNode(true);
		return context;
	};	
}

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Renderer.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Renderer.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SCOPES: () => (/* binding */ SCOPES),
/* harmony export */   "default": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Context.js */ "./node_modules/@default-js/defaultjs-template-language/src/Context.js");
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Element.js */ "./node_modules/@default-js/defaultjs-template-language/src/Element.js");
/* harmony import */ var _directives_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/index.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/index.js");
/* harmony import */ var _elements_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements/index.js */ "./node_modules/@default-js/defaultjs-template-language/src/elements/index.js");









const SCOPES = {
	application: "application",
	data: "data",
	render: "render",
	container: "container",
	node: "node",
	directive: "directive",
};

const APPLICATION_SCOPE_RESOLVER = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.application });

const MODEWORKER = {
	replace: async ({ container, target = null, content }) => {
		if (target) {
			target.replace(content);
		} else {
			container.empty();
			container.append(content);
		}
	},
	append: async ({ container, target = null, content }) => {
		if (target) target.after(content);
		else container.append(content);
	},
	prepend: async ({ container, target = null, content }) => {
		if (target) target.before(content);
		else container.prepend(content);
	},
};

const loadTemplateContent = async (template, renderer) => {
	if (template) {
		template = await _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"].load(template);
		return template.importContent();
	} else if (renderer.template) {
		return await renderer.template.importContent();
	}

	throw new Error("No content template specified!");
};

const addContent = async (context) => {
	if (context.content) {
		const modeworker = MODEWORKER[context.mode];
		if (!modeworker) throw new Error('The "' + context.mode + '" is not supported!');
		await modeworker(context);
	}
};

const renderContainer = async (context) => {
	let { template, resolver } = context;
	if (!template || template.length == 0) return context;

	let content = [];
	for (let nodeTemplate of template) {
		nodeTemplate.normalize();
		const nodeResolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.node, context: null, parent: resolver });
		const nodeContext = await renderNode(context.subContext({ template: nodeTemplate, resolver: nodeResolver }));
		await nodeContext.ready();
		const node = nodeContext.content;
		if (node) {
			if (node instanceof Array) content = content.concat(node);
			if (node instanceof NodeList || node instanceof HTMLCollection) content = content.concat(Array.from(node));
			else if (node instanceof Node) content.push(node);
		}
	}

	context.content = content.length != 0 ? content : null;
	return context;
};

const renderNode = async (context) => {
	try {
		let { template, renderer } = context;
		if (template instanceof _Element_js__WEBPACK_IMPORTED_MODULE_5__["default"]) await template.execute(context);
		else await executeDirectives(context);

		const { ignore, content } = context;

		if (!ignore && content) {
			let { resolver } = context;
			const subTemplate = context.template.childNodes;
			if (subTemplate && subTemplate.length > 0) {
				const containerResolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.container, context: null, parent: resolver });
				const subContext = await renderer.render(context.subContext({ container: content, template: subTemplate, resolver: containerResolver }));
				await subContext.ready();
			}
		}

		if (context.content && context.content.tagName && context.content.tagName == "JSTL") context.content = context.content.childNodes; //special case to support the old "<jstl>" tag.
	} catch (e) {
		console.error("error at render node:", e, context);
	}
	return context;
};

const executeDirectives = async (context) => {
	const directives = _Directive_js__WEBPACK_IMPORTED_MODULE_4__["default"].directives;
	const length = directives.length;
	for (let i = 0; i < length && !context.stop; i++) {
		const directive = directives[i];
		try {
			if (context.acceptDirective(directive)) await directive.execute(context);
		} catch (e) {
			console.error("error at directive:", e, directive, context);
		}
	}
	return context;
};

class Renderer {
	constructor({ template, data } = {}) {
		if (template && !(template instanceof _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"])) throw new Error("template must be an instance of Template!");

		this.template = template;
		this.resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.data, context: data ? data : {}, parent: APPLICATION_SCOPE_RESOLVER });
	}

	/**
	 * @param
	 * 		container HTMLElement -> target to render in
	 * @param
	 * 		data Object|... -> data to used at rendering
	 * @param
	 * 		template Template|Node|NodeList|HTMLCollection|String -> template to render
	 * @param
	 * 		mode "append"|"insert"|"replace"
	 * @param
	 * 		target
	 */
	async render(context) {
		const calledWithContext = context instanceof _Context_js__WEBPACK_IMPORTED_MODULE_3__["default"];
		if (!calledWithContext) {
			let { template = null, data = null, container, root, mode, target } = context;
			template = await loadTemplateContent(template, this);
			const resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ name: SCOPES.render, context: data, parent: this.resolver });
			context = new _Context_js__WEBPACK_IMPORTED_MODULE_3__["default"]({ resolver, renderer: this, template: template, container, root: root ? root : container, mode: mode ? mode : "replace", target });
		} else if (context.closed) throw new Error("calling with closed context", context);

		const template = context.template;
		if (template instanceof Node) await renderNode(context);
		else await renderContainer(context);
		
		await addContent(context);

		if (!calledWithContext)
			await context.ready();

		return context;
	}

	static async build({ template, data } = {}) {
		if (template && template instanceof Promise) template = await template;

		template = template ? await _Template_js__WEBPACK_IMPORTED_MODULE_2__["default"].load(template) : null;
		return new Renderer({ template, data });
	}

	static async render({ container, data, template, mode, target }) {
		const renderer = new Renderer({ template, data });
		return renderer.render({ container, mode, target });
	}
}


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Template.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Template.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_ATTRIBUTE_TEMPLATE: () => (/* binding */ NODE_ATTRIBUTE_TEMPLATE),
/* harmony export */   "default": () => (/* binding */ Template),
/* harmony export */   toAsyncTemplateLoader: () => (/* binding */ toAsyncTemplateLoader)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/javascript/String.js */ "./node_modules/@default-js/defaultjs-common-utils/src/javascript/String.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_default_js_defaultjs_common_utils_src_javascript_String_js__WEBPACK_IMPORTED_MODULE_0__);


const NODE_ATTRIBUTE_TEMPLATE = "template";
const CACHE = {};
const getKey = (template, cache, alias) => {
	if (!cache) return null;

	let key = null;
	if (alias) key = alias;
	else if (typeof template === "string") key = template;
	else if (template instanceof URL) key = template.toString();
	else if (template instanceof HTMLElement) key = template.selector();

	if (key) return key.hashcode();

	return null;
};

const fromURL = async (url, cache, key) => {
	const response = await fetch(url.toString());
	const source = await response.text();
	return fromSource(source, cache, key);
};

const fromSource = async (source, cache, key) => {
	return fromElement(create(source, true), cache, key);
};

const fromElement = async (element, cache, key) => {
	let template = null;
	if (element instanceof HTMLTemplateElement) template = new Template(element, key);
	else {
		template = document.createElement("template");
		if (element instanceof Node || element instanceof NodeList || element instanceof HTMLCollection || element instanceof Array) template.content.append(element.cloneNode(true));
		else throw new Error("Template type is not supported!");

		template = new Template(template, key);
	}

	if (!template) throw new Error("Template can't loaded!");

	if (cache && key) CACHE[key] = template;

	return template;
};

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	const value = node.attr(NODE_ATTRIBUTE_TEMPLATE);
	if (!value) return null;
	try {
		template = find(value).first();
		if (!!template) return template;
	} catch (e) {}
	return new URL(value, location);
};

class Template {

	/**
	 * Create an instance of template.
	 * 
	 * @param template type of HTMLTemplateElement. Not null.
	 * @param key identifier at cache, if template to be cached.
	 */
	constructor(/** @type {HTMLTemplateElement} */ template,/** @type {string} */ key) {
		this.template = template;
		this.key = key;
	}

	importContent(doc = document) {
		let imported = doc.importNode(this.template, true);
		return imported.content.childNodes;
	}

	remove() {
		if (this.key && CACHE[this.key]) delete CACHE[this.key];
	}

	static async fetch(url, cache = true, alias = null) {
		if (typeof url === "string") {
			return Template.load(new URL(url, loaction), cache, alias);
		} else if (url instanceof URL) return Template.load(url, cache, alias);

		new Error("The url isn't a allowed type! -> [String|URL] required!");
	}

	static async load(template, cache = true, alias = null) {
		if (template instanceof Template) return template;

		const key = getKey(template, cache, alias);
		if (key && CACHE[key]) return CACHE[key];
		else if (typeof template === "string") {
			return fromSource(template, cache, key);
		} else if (template instanceof URL) return await fromURL(template, cache, key);
		else if (template instanceof Node || template instanceof NodeList || template instanceof HTMLCollection || template instanceof HTMLTemplateElement) return fromElement(template, cache, key);

		new Error("The template isn't a allowed type! -> [String|URL|Node|NodeList|HTMLCollection|Template] required!");
	}

	static async loadNodeTemplate(node, defaultTemplate, cache, alias) {
		try {
			const template = getTemplate(node);
			if (template) return Template.load(template, cache, alias);
		} catch (e) {
			console.warn("Can't load template from node!", node, e);
		}

		return defaultTemplate;
	}
};

const toAsyncTemplateLoader = (/*URL*/url) => {
    let template = null;

    return async () => {
        if(!template){
			if(typeof url === "function")
				url = await url();
			else if(url instanceof Promise)
				url = await url;
            template = Template.load(url);
		}

        return template;
    };
};


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/Utils.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/Utils.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isUndefinedOrNull: () => (/* binding */ isUndefinedOrNull),
/* harmony export */   isUndefinedOrNullOrBlank: () => (/* binding */ isUndefinedOrNullOrBlank)
/* harmony export */ });
const isUndefinedOrNull = (value) => {
    return typeof value === 'undefined' || value === null
}

const isUndefinedOrNullOrBlank = (value) => {
  return isUndefinedOrNull(value) || typeof value === 'string' && value.trim().length == 0;
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/AttachElement.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/AttachElement.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


const ATTRIBUTE__ATTACHELEMENT = "jstl-attach-element";
const ATTRIBUTE__ATTACHELEMENT_MODE = "jstl-attach-element-mode";

const MODE_APPEND = "append";
const MODE_PREPEND = "prepend";
const MODE_REPLACE = "replace";

const PRECHECK = /^#.+$/;

const getElement = async (template, resolver) => {
	let element = (template.attr(ATTRIBUTE__ATTACHELEMENT) || "").trim();
	if (!PRECHECK.test(element)) {
		try {
			element = await resolver.resolve(element, element);
		} catch (e) {}
		if (element instanceof HTMLElement) return element;
	}

	try {
		element = find(element);
	} catch (e) {}

	if (element && element.length > 0) return element.length == 0 ? element.first() : element;

	return null;
};

class AttachElement extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() {
		return "attach-element";
	}
	get rank() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1;
	}
	get phase() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.content;
	}

	async execute(context) {
		const { resolver, template, content } = context;
		if (!(template instanceof HTMLElement) || !template.attr(ATTRIBUTE__ATTACHELEMENT)) return context;
		try {
			let element = await getElement(template, resolver);
			if (element) {
				const mode = template.attr(ATTRIBUTE__ATTACHELEMENT_MODE) || MODE_REPLACE;
				if (mode == MODE_REPLACE) {
					content.empty().append(element);
					context.stop = true;
					context.ignore = true;
				} else {
					context.ready(({ content }) => {
						if (content) {
							if (mode == MODE_APPEND) content.append(element);
							else if (mode == MODE_PREPEND) content.prepend(element);
						}
					});
				}
			}
		} catch (e) {
			console.log(e, { context });
		}

		return context;
	}
}
_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new AttachElement() });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global.js */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");



const ATTRIBUTE_NAME = /(jstl)?(\?)?(@)?([^\?@]+)/i;

const DEFAULT_EVENT_FUNCTION = "default";
const OPTION_PREVENT_DEFAULT = "prevent-default"
const IGNORED_ATTRIBUTES = ["is"];

const FUNCTION_SPLITTER = "::";
const FUNCTION_SPLITTER_OLD = ":";

const EVENTFUNCTIONS = {
	delegate: async (event, handle, setting, type, resolver, content, options, context) => {
		const eventhandle = await resolver.resolveText(handle, handle);
		content.on(event, delegater(eventhandle, setting));
	},
	toggleclass: async (event, handle, setting, type, resolver, content, options, context) => {
		const clazz = options.shift();
		const preventDefault = options.includes(OPTION_PREVENT_DEFAULT);
		const selector = handle ? await resolver.resolveText(handle, handle) : null;		
		content.on(event, (event) => {
			if(preventDefault)
				event.preventDefault();
			if(selector)
				content.closests(selector).toggleClass(clazz);
			else
				content.toggleClass(clazz);
		});
	},
	toggleattribute: async (event, handle, setting, type, resolver, content, options, context) => {
		const attribute = options.shift();
		const preventDefault = options.includes(OPTION_PREVENT_DEFAULT);
		const selector = handle ? await resolver.resolveText(handle, handle) : null;		
		content.on(event, (event) => {
			if(preventDefault)
				event.preventDefault();
			if(selector)
				content.closests(selector).forEach(element => {
					element.toggleAttribute(attribute)				
				});
			else 
				content.toggleAttribute(attribute);
		});
	},
	[DEFAULT_EVENT_FUNCTION]: async (event, handle, setting, type, resolver, content, options, context) => {
		const eventhandle = handle ? await resolver.resolve(handle, handle) : null;

		if (!eventhandle) console.error(new Error("Can't resolve \"" + handle + '" to event handle!'));
		else if (typeof eventhandle === "function") content.on(event, eventhandle);
		else if (typeof eventhandle === "string") content.on(event, delegater(eventhandle, setting));
		else if (typeof eventhandle === "object") {
			const { capture = false, passive = false, once = false } = eventhandle;
			content.on(event, eventhandle.eventHandle, { capture, passive, once });
		}
	},
};

const bindAttribute = async ({ condition, name, value, context }) => {
	const { resolver, content, template } = context;

	let attribute = !condition ? value : template.attr(name);
	condition = condition ? value : template.attr("?" + name);
	const hasValue = isValue(attribute);

	if (condition && hasValue) {
		condition = await resolver.resolve(condition, false);
		if (condition === true) content.attr(name, await resolver.resolveText(attribute, attribute));
	} else if (condition) {
		condition = await resolver.resolve(condition, false);
		if (condition === true) content.attr(name, true);
	} else if (hasValue) {
		content.attr(name, await resolver.resolveText(attribute, attribute));
	}
};

const isValue = (value) => {
	return value != null && typeof value !== "undefined";
};

const bindEvent = async ({ condition, name, value, context }) => {
	const { resolver, template, content } = context;

	condition = condition ? value : template.attr("?@" + name);
	let handle = !condition ? value : template.attr("@" + name);
	let split = name.split(FUNCTION_SPLITTER);
	if(split.length == 1)
		split = name.split(FUNCTION_SPLITTER_OLD);

	const event = split.shift();
	const type = (split.shift() || DEFAULT_EVENT_FUNCTION).toLowerCase();
	
	if(typeof handle === "undefined" || handle == null)
		console.error(`Definition of "${event}" - event handle at`, content, "is incorrect!");

	handle = handle.trim();
	const setting = {
		bubble: true,
	};

	if (condition ) {
		if ((await resolver.resolve(condition, false)) == true) await binding(event, handle, setting, type, resolver, content, split, context);
	} else await binding(event, handle, setting, type, resolver, content, split, context);
};

const binding = async (event, handle, setting, type, resolver, content, options, context) => {
	const binder = EVENTFUNCTIONS[type];
	if (binder) return binder(event, handle, setting, type, resolver, content, options, context);
};

const delegater = function (delegate, setting) {
	return function (event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.currentTarget) event.currentTarget.trigger(delegate, event);
		else event.target.trigger(delegate, event);
	};
};

class Attribute extends _Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	constructor() {
		super();
	}

	get name() {
		return "attribute";
	}
	get rank() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"].MIN_RANK;
	}
	get phase() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"].PHASE.content;
	}

	async execute(context) {
		const { template } = context;
		if (!(template instanceof HTMLElement)) return context;

		const processed = new Set(IGNORED_ATTRIBUTES);
		for (const attribute of template.attributes) {
			const [, jstl, condition, event, name] = ATTRIBUTE_NAME.exec(attribute.name);
			if (!jstl && !processed.has(name)) {
				const value = attribute.value;

				if (event) await bindEvent({ condition, event, name, value, context });
				else await bindAttribute({ condition, name, value, context });
			}
			processed.add(name);
		}

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_1__["default"].define({ directive: new Attribute() });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


class Choose extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "choose" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template }

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || !context.template.hasAttribute("jstl-choose") || context.template.children.length == 0)
			return context;
		
		//clone template, before manipulate template
		context.template = context.template.cloneNode(true);
		const { template, resolver } = context;
		let resolved = false;
		const whens = template.find(":scope > [jstl-when]");
		const length = whens.length;
		for (let i = 0; i < length; i++) {
			const node = whens[i];
			if (!resolved && (await resolver.resolve(node.attr("jstl-when"), false)))
				resolved = true;
			else
				node.remove();
		}

		if (resolved)
			template.find(":scope > [jstl-otherwise]").remove();

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Choose() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");



const MODES = {
	"remote": async ({ data, context }) => {		
		const {resolver, template} = context;
		data = await resolver.resolveText(data);
		data = new URL(data, location.origin);
		let option = await resolver.resolveText(template.attr("jstl-data-option") || "{}");
		option = JSON.parse(option);

		data = await fetch(data.toString(), option);
		return data.json();
	},	
	"set": async ({ data, context }) => {
		const {resolver} = context;
		
		data = await resolver.resolve(data);
		return data;
	},
	"direct": async ({ data, context }) => {
		const {resolver} = context;
		
		data = await resolver.resolveText(data);
		return data;
	}
};

const updateContext = ({ varname, data, scope, context }) => {
	if (varname)
		context.resolver.updateData(varname, data, scope);
	else if (scope)
		context.resolver.mergeContext(data, scope);
	else{
		const resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: "jstl-data", parent: context.resolver });
		//context = context.subContext({resolver});
		context.resolver = resolver;
	}
	
		
	return context;
};



class Data extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "data" }
	get rank() { return 1000 }
	get phase(){return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.data}

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || !context.template.attr("jstl-data"))
			return context;
			
		try {
			const { template } = context;			
			const mode = MODES[(template.attr("jstl-data-mode") || "remote")];
			if (!mode)
				throw new Error("The jstl-data-mode is unsupported!");

			let data = template.attr("jstl-data");
			data = await mode({ data, context });

			const varname = template.attr("jstl-data-var");
			const scope = template.attr("jstl-data-scope");
			context = updateContext({ varname, data, scope, context });
		} catch (e) {
			console.error(e, context.template);
		}

		return context;

	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Data() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils.js */ "./node_modules/@default-js/defaultjs-template-language/src/Utils.js");




const ATTRIBUTE = {
	DATA: "jstl-foreach",
	VAR: "jstl-foreach-var",
	STATUS: "jstl-foreach-status",
	COUNT: "jstl-foreach-count",
	START: "jstl-foreach-start",
	STEP: "jstl-foreach-step",
	CONDITION: "jstl-foreach-condition"
};


/**
 * @param {object} option 
 * @param {number} option.start 
 * @param {number} option.step 
 * @param {number} option.count 
 * @param {string} option.varname 
 * @param {string} option.status 
 * @param {ExpressionResolver} option.resolver 
 * @returns {Promise<void>}
 */
const doCount = async (option) => {
	let { start, step, count, varname, status, resolver } = option;

	count = await resolver.resolve(count);
	const length = start + (count * step);
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {}
		iteration[varname] = i;
		iteration[status] = {
			index: i,
			number: i + 1,
			step,
			count
		};
		stop = !(await iterate(iteration, option));
	}
};



/**
 * @param {object} option 
 * @param {Array<any>|any} option.data 
 * @param {number} option.start 
 * @param {number} option.step 
 * @param {number} option.count 
 * @param {string} option.varname 
 * @param {string} option.status 
 * @param {ExpressionResolver} option.resolver 
 * @returns {Promise<void>}
 */
const doForeach = async (option) => {
	let { data, start, step, count, varname, status, resolver } = option;

	data = await resolver.resolve(data, []);
	let array = data;
	if (!(data instanceof Array))
		array = Object.getOwnPropertyNames(data);

	count = count != "" ? await resolver.resolve(count, 0) : null;
	const length = count ? Math.min(start + count, array.length) : array.length;
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {}
		iteration[varname] = data[i];
		iteration[status] = {
			index: i,
			number: i + 1,
			count: length,
			data
		};
		stop = !(await iterate(iteration, option));
	}
};

const iterate = async (data, option) => {
	let { template, resolver, renderer, container, condition, context } = option;
	resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: "jstl-foreach", parent: resolver });

	condition = condition ? await resolver.resolve(condition, false) : false;
	if (condition)
		return false;
	const itemContext = context.subContext({ resolver, container, template, mode: "append" });
	await renderer.render(itemContext);
	await itemContext.ready();
	return true;
};

class Foreach extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "foreach" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 2 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template }

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || (!context.template.attr(ATTRIBUTE.DATA) && !context.template.attr(ATTRIBUTE.COUNT)))
			return context;

		context.ignore = true;
		try {
			const { template, resolver, renderer, content } = context;
			const data = (template.attr(ATTRIBUTE.DATA) || "").trim();
			const count = (template.attr(ATTRIBUTE.COUNT) || "").trim();
			const option = {
				data,
				count,
				start: await resolver.resolve(template.attr(ATTRIBUTE.START) || "0"),
				step: await resolver.resolve(template.attr(ATTRIBUTE.STEP) || "1"),
				varname: (template.attr(ATTRIBUTE.VAR) || "item").trim(),
				status: (template.attr(ATTRIBUTE.STATUS) || "status").trim(),
				condition: template.attr(ATTRIBUTE.CONDITION),
				template: template.childNodes,
				resolver,
				renderer,
				container: content,
				context
			};
			if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__.isUndefinedOrNullOrBlank)(data) && !(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__.isUndefinedOrNullOrBlank)(count))
				await doCount(option);
			else if(!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__.isUndefinedOrNullOrBlank)(data))
				await doForeach(option);

		} catch (error) {
			console.error("error at jstl-foreach:", error);
		}
		return context;

	}
};

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Foreach() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/If.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/If.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


class If extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "if" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1000 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.init }

	async execute(context) {
		const { template } = context;
		if (!(template instanceof HTMLElement) || !template.attr("jstl-if"))
			return context;

		const expression = template.attr("jstl-if");
		const resolver = context.resolver;
		const result = await resolver.resolve(expression, false);
		if (!result) {
			context.content = null;
			context.stop = true;
			context.ignore = true;
		}

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new If() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _Template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Template.js */ "./node_modules/@default-js/defaultjs-template-language/src/Template.js");



class Include extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() {
		return "include";
	}
	get rank() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK;
	}
	get phase() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template;
	}

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || !context.template.attr("jstl-include")) return context;
		try {
			const { template, resolver, renderer } = context;
			let include = template.attr("jstl-include");
			include = await resolver.resolveText(include);
			include = new URL(include, location);
			include = await _Template_js__WEBPACK_IMPORTED_MODULE_1__["default"].load(include);

			const mode = template.attr("jstl-include-mode") || "replace";

			const subContext = context.subContext({ template: include, container: context.content, mode});
			await renderer.render(subContext);
			await subContext.ready();
			context.ignore = true;
			context.stop = true;

			return context;
		} catch (e) {
			console.error(e, context.template);
			return context;
		}
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Include() });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _elements_Replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elements/Replace.js */ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js");



const MARKER_IGNORE = "jstl-ignore";
const MARKER_IGNORE_CHILDS = "jstl-ignore-childs";
const MARKER_ASYNC = "jstl-async";
const MARKER_TAGNAME = "jstl-tagname";
const MARKER_IS = "is";

class Initial extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() {
		return "initial";
	}
	get rank() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK;
	}
	get phase() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.init;
	}

	async execute(context) {
		const { template, renderer, resolver } = context;
		if (!(template instanceof Element)) {
			context.content = document.importNode(template, true);
		} else {
			if (template.hasAttribute(MARKER_IGNORE)) {
				context.content = document.importNode(template, true);
				context.content.removeAttribute(MARKER_IGNORE);
				context.stop = true;
				context.ignore = true;
			} else if (false) // removed by dead control flow
{} else if (template instanceof HTMLTemplateElement) {
				context.content = document.createElement(template.tagName);
				const subContext = context.subContext({ template: template.content.childNodes, container: context.content.content });
				await renderer.render(subContext);
				context.stop = false;
				context.ignore = true;
			} else if (template.hasAttribute(MARKER_TAGNAME)) {
				let tagname = template.attr(MARKER_TAGNAME).trim();
				if (tagname.length > 0) context.content = document.createElement(await resolver.resolveText(template.attr(MARKER_TAGNAME)));
				else {
					context.content = document.importNode(template, true);
					context.stop = true;
					context.ignore = true;
				}
			} else if (template.tagName) {
				let is = template.attr(MARKER_IS);
				if (is) {
					is = await resolver.resolveText(is);
					const element = document.createElement(template.tagName, { is });
					element.attr(MARKER_IS, is);
					context.content = element;
				} else context.content = document.createElement(template.tagName);
			} else {
				context.content = document.importNode(template, true);
				context.stop = true;
				context.ignore = true;
			}

			if (!context.stop && template.hasAttribute(MARKER_IGNORE_CHILDS)) {
				context.ignore = true;
				const clone = document.importNode(template, true);
				if (template instanceof HTMLTemplateElement) context.content.content.append(clone.content);
				else context.content.append(clone.childNodes);
			}
		}

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Initial() });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/OnFinished.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/OnFinished.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");



const NAME = "on-finished";
const ATTRIBUTE_ON_FINISHED = `jstl-${NAME}`;
const ATTRIBUTE_ON_FINISHED_ASYNC = `${ATTRIBUTE_ON_FINISHED}-async`;

class OnFinished extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return NAME }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MAX_RANK }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.finish }



	async execute(context) {
		const { template, content, root } = context;
		if (!(template instanceof HTMLElement) || !template.hasAttribute(ATTRIBUTE_ON_FINISHED))
			return context;

		const expression = template.attr(ATTRIBUTE_ON_FINISHED);
		const asyncCall = template.hasAttribute(ATTRIBUTE_ON_FINISHED_ASYNC);

		const data = {
			$element: content,
			$root: root,
			$template: template
		};
		const resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: "jstl-data", parent: context.resolver });


		context.finished(async () => {
			try {
				if(!asyncCall)
					return resolver.resolve(expression, null);
					
				resolver.resolve(expression, null);
			} catch (e) {
				console.error(e);
			}
		});

		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new OnFinished() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Repeat.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Repeat.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");
/* harmony import */ var _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language/src/ExpressionResolver.js */ "./node_modules/@default-js/defaultjs-expression-language/src/ExpressionResolver.js");



const DIRECTIVENAME = "jstl-repeat";
const IGNOREDIRECTIVE = new Set([DIRECTIVENAME]);

const ATTRIBUTE = {
	DATA: `${DIRECTIVENAME}`,
	VAR: `${DIRECTIVENAME}-var`,
	STATUS: `${DIRECTIVENAME}-status`,
	COUNT: `${DIRECTIVENAME}-count`,
	START: `${DIRECTIVENAME}-start`,
	STEP: `${DIRECTIVENAME}-step`,
	CONDITION: `${DIRECTIVENAME}-condition`,
};

const doCount = async (option) => {
	let { start, step, count, varname, status, resolver } = option;
	count = await resolver.resolve(count);
	const length = start + count * step;
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {};
		iteration[varname] = i;
		iteration[status] = {
			index: i,
			number: i + 1,
			step,
			count,
		};
		stop = !(await iterate(iteration, option));
	}
};

const doRepeat = async (option) => {
	let { data, start, step, count, varname, status, resolver } = option;

	data = await resolver.resolve(data);
	let array = data;
	if (!(data instanceof Array)) array = Object.getOwnPropertyNames(data);

	count = count != "" ? await resolver.resolve(count, 0) : null;
	const length = count ? Math.min(start + count, array.length) : array.length;
	let stop = false;
	for (let i = start; i < length && !stop; i = i + step) {
		const iteration = {};
		iteration[varname] = data[i];
		iteration[status] = {
			index: i,
			number: i + 1,
			count: length,
			data,
		};
		stop = !(await iterate(iteration, option));
	}
};

const iterate = async (data, option) => {
	let { template, resolver, renderer, condition, context } = option;
	resolver = new _default_js_defaultjs_expression_language_src_ExpressionResolver_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ context: data, name: DIRECTIVENAME, parent: resolver });

	condition = condition ? await resolver.resolve(condition, false) : false;
	if (condition) return false;

	const itemContext =  context.subContext({ resolver, template, mode: "append", ignoreDirective: IGNOREDIRECTIVE })
	await renderer.render(itemContext);
	await itemContext.ready();

	return true;
};

class Repeat extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() {
		return DIRECTIVENAME;
	}
	get rank() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 3;
	}
	get phase() {
		return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.template;
	}

	async execute(context) {
		if (!(context.template instanceof HTMLElement) || (!context.template.attr(ATTRIBUTE.DATA) && !context.template.attr(ATTRIBUTE.COUNT))) return context;

		try {
			const { template, resolver, renderer, content, container } = context;
			const option = {
				data: (template.attr(ATTRIBUTE.DATA) || "").trim(),
				count: (template.attr(ATTRIBUTE.COUNT) || "").trim(),
				start: await resolver.resolve(template.attr(ATTRIBUTE.START) || "0"),
				step: await resolver.resolve(template.attr(ATTRIBUTE.STEP) || "1"),
				varname: (template.attr(ATTRIBUTE.VAR) || "item").trim(),
				status: (template.attr(ATTRIBUTE.STATUS) || "status").trim(),
				condition: template.attr(ATTRIBUTE.CONDITION),
				template: template,
				tagname: content.tagName,
				resolver,
				renderer,
				container,
				context,
			};
			if ((!option.data || option.data == "") && option.count) await doCount(option);
			else await doRepeat(option);
		} catch (error) {
			console.error("error at jstl-repeat:", error);
		}

		context.content = null;
		context.stop = true;
		context.ignore = true;
		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new Repeat() });


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Directive.js */ "./node_modules/@default-js/defaultjs-template-language/src/Directive.js");


const DEFAULT_OPTION = {
	mode: "text",
	unsecure: false,
	preventFormat : false,
	maxLength: 0	
};

const SECURE_HTML_FILTER = "script, style, body, html, head, object, link";

const readOption = async (parent, context) => {
	const resolver = context.resolver;
	return {
		mode: await resolver.resolveText((parent.attr("jstl-text-content-type") || "text").trim().toLowerCase()),
		unsecure: parent.hasAttribute("jstl-text-unsecure"),
		preventFormat: !!parent.attr("jstl-text-prevent-format") || false,
		maxLength: parseInt(await resolver.resolveText(parent.attr("jstl-text-trim-length") || "0"))
	};
};

const trimTextLength = (text, length) => {
	return text.length > length ? text.substring(0, length - 3).trim() + "..." : text;
};

const MODES = {
	"text" : async (option, context) => {
		const {content, resolver, template} = context;
		
		let text = await resolver.resolveText(template.textContent);		
		text = create(text,true).content.textContent;
		if(option.maxLength > 0)
			text = trimTextLength(text, option.maxLength);		
		
		content.textContent = text;		
	},
	"html": async (option, context) => {
		const {resolver, template} = context;
		
		let content = await resolver.resolveText(template.textContent);		
		content = create(content,true);		
		content = document.importNode(content.content, true);
		
		if(option.unsecure)
			context.content = content;			
		else{
			content.find(SECURE_HTML_FILTER).remove();			
			context.content = content;
		}
	}
};


class TextContent extends _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor() {
		super();
	}

	get name() { return "text" }
	get rank() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].MIN_RANK + 1 }
	get phase() { return _Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].PHASE.content }



	async execute(context) {
		const { template } = context;
		if (!(template instanceof Text) || template.textContent.trim().length == 0 || (template.parentElement && template.parentElement.hasAttribute("jstl-text-ignore")))
			return context;

		const parent = template.parentElement;
		const option = parent ? await readOption(parent, context) : DEFAULT_OPTION;
		
		const  mode = MODES[option.mode];
		if(!mode)
			throw new Error("Text mode \""+ option.mode + "\" is unsupported!");
		
		await mode(option, context);
		
		return context;
	}
}

_Directive_js__WEBPACK_IMPORTED_MODULE_0__["default"].define({ directive: new TextContent() });

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/directives/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/directives/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Initial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Initial.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Initial.js");
/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Data.js");
/* harmony import */ var _If_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./If.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/If.js");
/* harmony import */ var _Choose_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Choose.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Choose.js");
/* harmony import */ var _Include_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Include.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Include.js");
/* harmony import */ var _Foreach_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Foreach.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Foreach.js");
/* harmony import */ var _Repeat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Repeat.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Repeat.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Text.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Text.js");
/* harmony import */ var _Attributes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Attributes.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/Attributes.js");
/* harmony import */ var _AttachElement_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AttachElement.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/AttachElement.js");
/* harmony import */ var _OnFinished_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./OnFinished.js */ "./node_modules/@default-js/defaultjs-template-language/src/directives/OnFinished.js");












/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReplaceElement)
/* harmony export */ });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element.js */ "./node_modules/@default-js/defaultjs-template-language/src/Element.js");


class ReplaceElement extends _Element_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
	constructor(){
		super();
		
		this.attachShadow({mode: 'open'});
	}
	async execute({template, context}){
		return context;
	};		
}
try{customElements.define("jstl-replace", ReplaceElement);}catch(e){}//ignore

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-template-language/src/elements/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-template-language/src/elements/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Replace.js */ "./node_modules/@default-js/defaultjs-template-language/src/elements/Replace.js");


/***/ }),

/***/ "./src/ButtonLogic.js":
/*!****************************!*\
  !*** ./src/ButtonLogic.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ATTRIBUTES: () => (/* binding */ ATTRIBUTES),
/* harmony export */   ATTR__ATTRIBUTE_NAME: () => (/* binding */ ATTR__ATTRIBUTE_NAME),
/* harmony export */   ATTR__CLASS_NAME: () => (/* binding */ ATTR__CLASS_NAME),
/* harmony export */   ATTR__CONTEXT: () => (/* binding */ ATTR__CONTEXT),
/* harmony export */   ATTR__DETAIL: () => (/* binding */ ATTR__DETAIL),
/* harmony export */   ATTR__EVENT_NAME: () => (/* binding */ ATTR__EVENT_NAME),
/* harmony export */   ATTR__PREVENT_DEFAULT: () => (/* binding */ ATTR__PREVENT_DEFAULT),
/* harmony export */   ATTR__RENDER_MODE: () => (/* binding */ ATTR__RENDER_MODE),
/* harmony export */   ATTR__SELECTOR: () => (/* binding */ ATTR__SELECTOR),
/* harmony export */   ATTR__STOP_PROPAGATION: () => (/* binding */ ATTR__STOP_PROPAGATION),
/* harmony export */   ATTR__TEMPLATE: () => (/* binding */ ATTR__TEMPLATE),
/* harmony export */   ATTR__TYPE: () => (/* binding */ ATTR__TYPE),
/* harmony export */   TYPE__CALL_RENDERER: () => (/* binding */ TYPE__CALL_RENDERER),
/* harmony export */   TYPE__DELEGATE: () => (/* binding */ TYPE__DELEGATE),
/* harmony export */   TYPE__RENDER: () => (/* binding */ TYPE__RENDER),
/* harmony export */   TYPE__TOGGLE_ATTRIBUTE: () => (/* binding */ TYPE__TOGGLE_ATTRIBUTE),
/* harmony export */   TYPE__TOGGLE_CLASS: () => (/* binding */ TYPE__TOGGLE_CLASS),
/* harmony export */   VAR__EVENT: () => (/* binding */ VAR__EVENT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-expression-language */ "./node_modules/@default-js/defaultjs-expression-language/index.js");
/* harmony import */ var _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @default-js/defaultjs-template-language */ "./node_modules/@default-js/defaultjs-template-language/index.js");




const ATTR__TYPE = "type";
const ATTR__CLASS_NAME = "class-name";
const ATTR__ATTRIBUTE_NAME = "attribute-name";
const ATTR__EVENT_NAME = "event-name";
const ATTR__DETAIL = "detail";
const ATTR__SELECTOR = "selector";
const ATTR__CONTEXT = "context";
const ATTR__TEMPLATE = "template";
const ATTR__RENDER_MODE = "render-mode";

const ATTR__PREVENT_DEFAULT = "prevent-default";
const ATTR__STOP_PROPAGATION = "stop-propagation";

const ATTRIBUTES = []; //[ATTR__TYPE, ATTR__ACTION, ATTR__SELECTOR, ATTR__CONTEXT, ATTR__TEMPLATE];

const TYPE__DELEGATE = "delegate";
const TYPE__TOGGLE_CLASS = "toggle-class";
const TYPE__TOGGLE_ATTRIBUTE = "toggle-attribute";
const TYPE__CALL_RENDERER = "call-renderer";
const TYPE__RENDER = "render";

const VAR__EVENT = "$event";

const CHECK_RENDERER = /d-renderer/i;

const loadTemplate = async (template) => {
	try{
		const node = find(template).first();
		if(node)
			return _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_2__.Template.load(node);
	}catch(e){}

	return _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_2__.Template.load(new URL(template, location));
}

const cloneEvent = (event) => {
	const { target, currentTarget, detail, timeStamp } = event;
	return { target, currentTarget, detail, timeStamp };
};

const resolveText = async (text, context) => {
	return _default_js_defaultjs_expression_language__WEBPACK_IMPORTED_MODULE_1__.ExpressionResolver.resolveText(text, context, null);
};

const TYPE = {
	[TYPE__DELEGATE]: async ({ targets, eventname }, context) => {
		eventname = await resolveText(eventname, context);
		if (eventname) targets.trigger(eventname, context);
	},
	[TYPE__TOGGLE_CLASS]: async ({ targets, classname }, context) => {
		classname = await resolveText(classname, context);
		if (classname) targets.toggleClass(classname);
	},
	[TYPE__TOGGLE_ATTRIBUTE]: async ({ targets, attributename }, context) => {
		attributename = await resolveText(attributename, context);
		if (attributename) {
			if (targets instanceof HTMLElement) targets = [targets];

			for (const target of targets) {
				const value = target.attr(attributename);
				target.attr(attributename, value == null ? "" : null);
			}
		}
	},
	[TYPE__CALL_RENDERER]: async ({ targets }, context) => {
		if (targets instanceof HTMLElement) targets = [targets];

		for (const target of targets) {
			const nodename = target.nodeName;
			if (CHECK_RENDERER.test(nodename) && typeof target.render === "function") {
				try {
					target.render({ data: context });
				} catch (e) {
					console.error({ e, button, target });
				}
			}
		}
	},
	[TYPE__RENDER]: async ({ targets, template, renderMode }, context) => {
		template = await resolveText(template, context);
		if (template) template = await loadTemplate(template);

		if (targets instanceof HTMLElement) targets = [targets];

		for (const target of targets) _default_js_defaultjs_template_language__WEBPACK_IMPORTED_MODULE_2__.Renderer.render({ container: target, template, data: context, mode: renderMode || "replace" });
	},
};

class ButtonLogic {
	#element;
	#context;
	constructor(element) {
		this.#element = element;
		element.on("click", (event) => this.execute(event));
	}

	async init() {}

	async destroy() {}

	attr(key) {
		return this.#element.attr(key);
	}

	find(selector) {
		return this.#element.find(selector);
	}

	get type() {
		return this.attr(ATTR__TYPE);
	}

	get selector() {
		return this.attr(ATTR__SELECTOR);
	}

	get context() {
		if (this.#context == null) {
			try {
				const value = this.attr(ATTR__CONTEXT);
				if (value && value.length != 0) this.#context = JSON.parse(value);
				else this.#context = {};
			} catch (e) {
				this.#context = {};
			}
		}
		return this.#context;
	}

	get eventname(){
		return this.attr(ATTR__EVENT_NAME);
	}

	get classname(){
		return this.attr(ATTR__CLASS_NAME);
	}

	get attributename(){
		return this.attr(ATTR__ATTRIBUTE_NAME);
	}

	get template() {
		return this.attr(ATTR__TEMPLATE);
	}

	get rendermode() {
		return this.attr(ATTR__RENDER_MODE);
	}

	get targets() {
		const selector = this.selector;
		if (selector && selector.length != 0) {
			let targets = this.find(selector);
			if (targets && targets.length != 0) return targets;
			targets = find(selector);
			if (targets && targets.length != 0) return targets;
		}
		return this.#element;
	}

	get preventDefault() {
		return this.attr(ATTR__PREVENT_DEFAULT) != null;
	}

	get stopPropagation() {
		return this.attr(ATTR__STOP_PROPAGATION) != null;
	}

	execute(event) {
		const type = TYPE[this.type];
		const context = {
			$type: type,
			$event:cloneEvent(event),
			$context: this.context,
			$data: this.#element.data()
		};
		if (this.preventDefault) event.preventDefault();
		if (this.stopPropagation) event.stopPropagation();

		
		if (type) {
			type(this, context);
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonLogic);


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODENAME__ANCHOR: () => (/* binding */ NODENAME__ANCHOR),
/* harmony export */   NODENAME__BUTTON: () => (/* binding */ NODENAME__BUTTON)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_html_components_src_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-html-components/src/Constants */ "./node_modules/@default-js/defaultjs-html-components/src/Constants.js");


const NODENAME__BUTTON = `${_default_js_defaultjs_html_components_src_Constants__WEBPACK_IMPORTED_MODULE_0__.componentPrefix}action-button`;
const NODENAME__ANCHOR = `${_default_js_defaultjs_html_components_src_Constants__WEBPACK_IMPORTED_MODULE_0__.componentPrefix}action-anchor`;

/***/ }),

/***/ "./src/HTMLDefaultjsAnchorElement.js":
/*!*******************************************!*\
  !*** ./src/HTMLDefaultjsAnchorElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _ButtonLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonLogic */ "./src/ButtonLogic.js");




class HTMLDefaultjsAnchorElement extends (0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.componentBaseOf)(HTMLAnchorElement){
    static NODENAME = _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME__ANCHOR;

    #logic;
    constructor(options){
        super(options);
        this.#logic = new _ButtonLogic__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    }

    async init(){
        await super.init();
        await this.#logic.init();
    }

    async destroy(){
        await this.#logic.destroy();        
        await super.destroy();
    }
};

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(HTMLDefaultjsAnchorElement, {extends: "a"});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HTMLDefaultjsAnchorElement);

/***/ }),

/***/ "./src/HTMLDefaultjsButtonElement.js":
/*!*******************************************!*\
  !*** ./src/HTMLDefaultjsButtonElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");
/* harmony import */ var _default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-html-components */ "./node_modules/@default-js/defaultjs-html-components/index.js");
/* harmony import */ var _ButtonLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonLogic */ "./src/ButtonLogic.js");




class HTMLDefaultjsButtonElement extends (0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.componentBaseOf)(HTMLButtonElement){
    static NODENAME = _Constants__WEBPACK_IMPORTED_MODULE_0__.NODENAME__BUTTON;

    #logic;
    constructor(options){
        super(options);
        this.#logic = new _ButtonLogic__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    }

    async init(){
        await super.init();
        await this.#logic.init();
    }

    async destroy(){
        await this.#logic.destroy();        
        await super.destroy();
    }
};

(0,_default_js_defaultjs_html_components__WEBPACK_IMPORTED_MODULE_1__.define)(HTMLDefaultjsButtonElement, {extends: "button"});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HTMLDefaultjsButtonElement);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLDefaultjsAnchorElement: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.HTMLDefaultjsAnchorElement),
/* harmony export */   HTMLDefaultjsButtonElement: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_2__.HTMLDefaultjsButtonElement)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_extdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-extdom */ "./node_modules/@default-js/defaultjs-extdom/index.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Global */ "./node_modules/@default-js/defaultjs-common-utils/src/Global.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./index.js");




const pack = {VERSION : "1.0.3", HTMLDefaultjsAnchorElement: _index__WEBPACK_IMPORTED_MODULE_2__.HTMLDefaultjsAnchorElement, HTMLDefaultjsButtonElement: _index__WEBPACK_IMPORTED_MODULE_2__.HTMLDefaultjsButtonElement };

_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html || {};
_default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html.button = _default_js_defaultjs_common_utils_src_Global__WEBPACK_IMPORTED_MODULE_1__["default"].defaultjs.html.button || pack;



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDhCQUE4QixrQkFBa0I7QUFDdEQsaUVBQWUsMEJBQTBCLEU7Ozs7OztVQ3pCekM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05zQztBQUM2QjtBQUNZOztBQUUvRSxjQUFjLGFBQWEsUUFBUSw2QkFBNkIsNEZBQTRCOztBQUU1RixxRkFBTSxhQUFhLHFGQUFNO0FBQ3pCLHFGQUFNLGtCQUFrQixxRkFBTTtBQUM5QixxRkFBTSx5QkFBeUIscUZBQU07O0FBRTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Qcm9taXNlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSUQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0NvZGVDYWNoZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0RlZmF1bHRWYWx1ZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4ZWN1dGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhlY3V0ZXJSZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL1Jlc29sdmVyQ29udGV4dEhhbmRsZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL2V4ZWN1dGVyL0NvbnRleHREZWNvbnN0cnVjdG9yRXhlY3V0ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9leGVjdXRlci9Db250ZXh0T2JqZWN0RXhlY3V0ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9leGVjdXRlci9XaXRoU2NvcGVkRXhlY3V0ZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlL3NyYy9leGVjdXRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MSW5wdXRFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSFRNTFNlbGVjdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9IVE1MVGV4dEFyZWFFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vSHRtbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9Ob2RlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vTm9kZUxpc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0RhdGFTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9FdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL0xpc3RTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9RdWVyeVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1JlYWR5RXZlbnRTdXBwb3J0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tL3NyYy9kb20vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL2RvbS9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL0V4dGVuZFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbS9zcmMvdXRpbHMvRXh0ZW5kZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb20vc3JjL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHMvc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50cy9zcmMvdXRpbHMvRGVmaW5lQ29tcG9uZW50SGVscGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy91dGlscy9FdmVudEhlbHBlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvRGlyZWN0aXZlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9BdHRhY2hFbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvQXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL0Nob29zZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL0RhdGEuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9Gb3JlYWNoLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvSWYuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9JbmNsdWRlLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvSW5pdGlhbC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLXRlbXBsYXRlLWxhbmd1YWdlL3NyYy9kaXJlY3RpdmVzL09uRmluaXNoZWQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9SZXBlYXQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZGlyZWN0aXZlcy9UZXh0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2Uvc3JjL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy10ZW1wbGF0ZS1sYW5ndWFnZS9zcmMvZWxlbWVudHMvUmVwbGFjZS5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9zcmMvQnV0dG9uTG9naWMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9zcmMvSFRNTERlZmF1bHRqc0FuY2hvckVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uLy4vc3JjL0hUTUxEZWZhdWx0anNCdXR0b25FbGVtZW50LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWJ1dHRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtYnV0dG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1idXR0b24vLi9icm93c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIVE1MRGVmYXVsdGpzQW5jaG9yRWxlbWVudCBmcm9tIFwiLi9zcmMvSFRNTERlZmF1bHRqc0FuY2hvckVsZW1lbnRcIjtcbmltcG9ydCBIVE1MRGVmYXVsdGpzQnV0dG9uRWxlbWVudCBmcm9tIFwiLi9zcmMvSFRNTERlZmF1bHRqc0J1dHRvbkVsZW1lbnRcIjtcblxuZXhwb3J0IHtIVE1MRGVmYXVsdGpzQW5jaG9yRWxlbWVudCwgSFRNTERlZmF1bHRqc0J1dHRvbkVsZW1lbnQgfTtcbiIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XHJcblx0aWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbDtcclxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gd2luZG93O1x0XHJcblx0aWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBzZWxmO1xyXG5cdHJldHVybiB7fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdMT0JBTDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG5cclxuY29uc3QgZXF1YWxBcnJheVNldCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGNvbnN0IGxlbmd0aCA9IGEubGVuZ3RoO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXHJcblx0XHRpZiAoIWVxdWFsUG9qbyhhW2ldLCBiW2ldKSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZmFsc2VcIik7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE1hcCA9IChhLCBiKSA9PiB7XHJcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdGZvciAoY29uc3Qga2V5IG9mIGEua2V5cygpKVxyXG5cdFx0aWYgKCFlcXVhbFBvam8oYS5nZXQoa2V5KSwgYi5nZXQoa2V5KSkpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImZhbHNlXCIpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZXF1YWxDbGFzc2VzID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBjbGF6ekEgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSk7XHJcblx0Y29uc3QgY2xhenpCID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpO1xyXG5cdGlmIChjbGF6ekEgIT0gY2xhenpCKSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdGlmICghY2xhenpBKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGF6ekEpO1xyXG5cdGNvbnN0IHByb3BlcnRpZXNCID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhenpCKTtcclxuXHJcblx0aWYgKHByb3BlcnRpZXNBLmxlbmd0aCAhPT0gcHJvcGVydGllc0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0Zm9yIChjb25zdCBrZXkgb2YgcHJvcGVydGllc0EpIHtcclxuXHRcdGNvbnN0IHZhbHVlQSA9IGFba2V5XTtcclxuXHRcdGNvbnN0IHZhbHVlQiA9IGJba2V5XTtcclxuXHJcblx0XHRpZiAoIWVxdWFsUG9qbyh2YWx1ZUEsIHZhbHVlQikpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5jb25zdCBlcXVhbE9iamVjdCA9IChhLCBiKSA9PiB7XHJcblx0Y29uc3QgcHJvcGVydGllc0EgPSBPYmplY3Qua2V5cyhhKTtcclxuXHRjb25zdCBwcm9wZXJ0aWVzQiA9IE9iamVjdC5rZXlzKGIpO1xyXG5cclxuXHRpZiAocHJvcGVydGllc0EubGVuZ3RoICE9PSBwcm9wZXJ0aWVzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHRmb3IgKGNvbnN0IGtleSBvZiBwcm9wZXJ0aWVzQSkge1xyXG5cdFx0Y29uc3QgdmFsdWVBID0gYVtrZXldO1xyXG5cdFx0Y29uc3QgdmFsdWVCID0gYltrZXldO1xyXG5cclxuXHRcdGlmICghZXF1YWxQb2pvKHZhbHVlQSwgdmFsdWVCKSkgcmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IChvYmplY3QpID0+IHtcclxuXHRyZXR1cm4gb2JqZWN0ID09IG51bGwgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9IChvYmplY3QpID0+IHtcclxuXHRpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cclxuXHRjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcclxuXHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgXCJudW1iZXJcIjpcclxuXHRcdGNhc2UgXCJiaWdpbnRcIjpcclxuXHRcdGNhc2UgXCJib29sZWFuXCI6XHJcblx0XHRjYXNlIFwic3RyaW5nXCI6XHJcblx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmKGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdCkpXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmICghb2JqZWN0LmNvbnN0cnVjdG9yIHx8IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBlcXVhbFBvam8gLT4gY29tcGFyZXMgb25seSBwb2pvcywgYXJyYXksIHNldCwgbWFwIGFuZCBwcmltaXRpdmVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXF1YWxQb2pvID0gKGEsIGIpID0+IHtcclxuXHRjb25zdCBudWxsQSA9IGlzTnVsbE9yVW5kZWZpbmVkKGEpO1xyXG5cdGNvbnN0IG51bGxCID0gaXNOdWxsT3JVbmRlZmluZWQoYik7XHJcblx0aWYgKG51bGxBIHx8IG51bGxCKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0aWYgKGlzUHJpbWl0aXZlKGEpIHx8IGlzUHJpbWl0aXZlKGIpKSByZXR1cm4gYSA9PT0gYjtcclxuXHJcblx0Y29uc3QgdHlwZUEgPSB0eXBlb2YgYTtcclxuXHRjb25zdCB0eXBlQiA9IHR5cGVvZiBiO1xyXG5cdGlmICh0eXBlQSAhPSB0eXBlQikgcmV0dXJuIGZhbHNlO1xyXG5cdGlmICh0eXBlQSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYSA9PT0gYjtcclxuXHQvL2lmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcblx0Ly9pZiAoYSBpbnN0YW5jZW9mIEFycmF5IHx8IGEgaW5zdGFuY2VvZiBTZXQpIHJldHVybiBlcXVhbEFycmF5U2V0KGEsIGIpO1xyXG5cdC8vaWYgKGEgaW5zdGFuY2VvZiBNYXApIHJldHVybiBlcXVhbE1hcChhLCBiKTtcclxuXHJcblx0cmV0dXJuIGVxdWFsT2JqZWN0KGEsIGIpICYmIGVxdWFsQ2xhc3NlcyhhLCBiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGJlIHRlc3RpbmdcclxuICpcclxuICogQHJldHVybiBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNQb2pvID0gKG9iamVjdCkgPT4ge1xyXG5cdGlmICghaXNPYmplY3Qob2JqZWN0KSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFwcGVuZCBhIHByb3BlcnkgdmFsdWUgdG8gYW4gb2JqZWN0LiBJZiBwcm9wZXJ5IGV4aXN0cyBpdHMgd291bGQgYmUgY29udmVydGVkIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKlxyXG4gKiAgQHJldHVybiByZXR1cm5zIHRoZSBjaGFuZ2VkIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IGZ1bmN0aW9uIChhS2V5LCBhRGF0YSwgYU9iamVjdCkge1xyXG5cdGlmICh0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0UHJvcGVydHkubG9hZChhT2JqZWN0LCBhS2V5LCB0cnVlKTtcclxuXHRcdHByb3BlcnR5LmFwcGVuZCA9IGFEYXRhO1xyXG5cdH1cclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyXHJcbiAqIHZhbHVlIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHZhbHVlIGZyb20gdGhlIHNvdXJjZSBvYmplY3QuXHJcbiAqXHJcbiAqIHNhbXBsZTogbWVyZ2UodGFyZ2V0LCBzb3VyY2UtMSwgc291cmNlLTIsIC4uLnNvdXJjZS1uKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGFyZ2V0Om9iamVjdCB0aGUgdGFyZ2V0IG9iamVjdCB0byBtZXJnaW5nIGludG9cclxuICogQHBhcmFtIHNvdXJjZXM6b2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIC4uLnNvdXJjZXMpIHtcclxuXHRpZiAoIXRhcmdldCkgdGFyZ2V0ID0ge307XHJcblxyXG5cdGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcblx0XHRpZiAoaXNQb2pvKHNvdXJjZSkpIHtcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoaXNQb2pvKHRhcmdldFtrZXldKSkgbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuXHRcdFx0XHRlbHNlIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUHJvcGVydHlGaWx0ZXIgPSBmdW5jdGlvbiAoeyBuYW1lcywgYWxsb3dlZCB9KSB7XHJcblx0cmV0dXJuIChuYW1lLCB2YWx1ZSwgY29udGV4dCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5hbWVzLmluY2x1ZGVzKG5hbWUpID09PSBhbGxvd2VkO1xyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnN0IFtkYXRhLCBwcm9wRmlsdGVyLCB7IGRlZXAgPSBmYWxzZSwgcmVjdXJzaXZlID0gdHJ1ZSwgcGFyZW50cyA9IFtdIH0gPSB7fV0gPSBhcmd1bWVudHM7XHJcblx0Y29uc3QgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IG5hbWUgaW4gZGF0YSkge1xyXG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xyXG5cdFx0Y29uc3QgYWNjZXB0ID0gcHJvcEZpbHRlcihuYW1lLCB2YWx1ZSwgZGF0YSk7XHJcblx0XHRpZiAoYWNjZXB0ICYmICghZGVlcCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRlbHNlIGlmIChhY2NlcHQgJiYgZGVlcCkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cdFx0XHRpZiAodHlwZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5IHx8IHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHBhcmVudHMuaW5jbHVkZXNbdmFsdWVdIHx8IHZhbHVlID09IGRhdGEpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRlbHNlIHJlc3VsdFtuYW1lXSA9IGZpbHRlcih2YWx1ZSwgcHJvcEZpbHRlciwgeyBkZWVwLCByZWN1cnNpdmUsIHBhcmVudHM6IHBhcmVudHMuY29uY2F0KGRhdGEpIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZWYWx1ZSA9IChvLCBuYW1lLCB2YWx1ZSkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHR2YWx1ZSxcclxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlZkdldCA9IChvLCBuYW1lLCBnZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZkdldFNldCA9IChvLCBuYW1lLCBnZXQsIHNldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRzZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNOdWxsT3JVbmRlZmluZWQsXHJcblx0aXNPYmplY3QsXHJcblx0ZXF1YWxQb2pvLFxyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiaW1wb3J0IHtkZWZWYWx1ZSwgZGVmR2V0fSBmcm9tIFwiLi9PYmplY3RVdGlsc1wiXHJcblxyXG5leHBvcnQgY29uc3QgdGltZW91dFByb21pc2UgPSAoZm4sIG1zKSA9PntcclxuXHRsZXQgY2FuY2VsZWQgPSBmYWxzZTtcclxuXHRsZXQgdGltZW91dCA9IG51bGw7XHJcblx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKT0+IHtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdGZuKHIsZSk7XHJcblx0XHR9LCBtcylcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgdGhlbiA9IHByb21pc2UudGhlbjtcclxuXHRwcm9taXNlLnRoZW4gPSAoZm4pID0+IHtcclxuXHRcdHRoZW4uY2FsbChwcm9taXNlLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmKCF0aGlzLmNhbmNlbGVkKVxyXG5cdFx0XHRcdHJldHVybiBmbihyZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZWYWx1ZShwcm9taXNlLCBcImNhbmNlbFwiLCAoKSA9PiB7XHJcblx0XHRpZih0aW1lb3V0KXtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRjYW5jZWxlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0ZGVmR2V0KHByb21pc2UsIGNhbmNlbGQsICgpID0+IGNhbmNlbGVkKTtcclxuXHJcblx0cmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgbGF6eVByb21pc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcHJvbWlzZVJlc29sdmUgPSBudWxsO1xyXG5cdFx0bGV0IHByb21pc2VFcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyLCBlKSA9PiB7XHJcblx0XHRcdHByb21pc2VSZXNvbHZlID0gcjtcclxuXHRcdFx0cHJvbWlzZUVycm9yID0gZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVycm9yID0gZmFsc2U7XHJcblx0XHRsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0ZGVmVmFsdWUocHJvbWlzZSwgXCJyZXNvbHZlXCIsIChyZXN1bHQpID0+IHtcclxuXHRcdFx0dmFsdWUgPSByZXN1bHQ7XHJcblx0XHRcdHJlc29sdmVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuXHRcdFx0XHRlcnJvciA9IHRydWU7XHJcblx0XHRcdFx0cHJvbWlzZUVycm9yKHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlZkdldChwcm9taXNlLCBcInZhbHVlXCIsICgpID0+IHZhbHVlKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcImVycm9yXCIsICgpID0+IGVycm9yKTtcclxuXHRcdGRlZkdldChwcm9taXNlLCBcInJlc29sdmVkXCIsICgpID0+IHJlc29sdmVkKTtcclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGxhenlQcm9taXNlLFxyXG5cdHRpbWVvdXRQcm9taXNlXHJcbn1cclxuIiwiLy90aGUgc29sdXRpb24gaXMgZm91bmQgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuZXhwb3J0IGNvbnN0IFVVSURfU0NIRU1BID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG5cdGNvbnN0IGJ1ZiA9IG5ldyBVaW50MzJBcnJheSg0KTtcclxuXHR3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWYpO1xyXG5cdGxldCBpZHggPSAtMTtcclxuXHRyZXR1cm4gVVVJRF9TQ0hFTUEucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG5cdFx0aWR4Kys7XHJcblx0XHRjb25zdCByID0gKGJ1ZltpZHggPj4gM10gPj4gKChpZHggJSA4KSAqIDQpKSAmIDE1O1xyXG5cdFx0Y29uc3QgdiA9IGMgPT0gXCJ4XCIgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyB1dWlkIH07XHJcbiIsImlmICghU3RyaW5nLnByb3RvdHlwZS5oYXNoY29kZSlcclxuXHRTdHJpbmcucHJvdG90eXBlLmhhc2hjb2RlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodGhpcy5sZW5ndGggPT09IDApXHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHJcblx0XHRsZXQgaGFzaCA9IDA7XHJcblx0XHRjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Y29uc3QgYyA9IHRoaXMuY2hhckNvZGVBdChpKTtcclxuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgYztcclxuXHRcdFx0aGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuXHRcdH1cclxuXHRcdHJldHVybiBoYXNoO1xyXG5cdH07IiwiaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiLi9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5pbXBvcnQgXCIuL3NyYy9leGVjdXRlci9pbmRleC5qc1wiO1xuaW1wb3J0ICogYXMgRXhlY3V0ZXJSZWdpc3RyeSBmcm9tIFwiLi9zcmMvRXhlY3V0ZXJSZWdpc3RyeS5qc1wiXG5cbmV4cG9ydCB7IEV4cHJlc3Npb25SZXNvbHZlciwgRXhlY3V0ZXJSZWdpc3RyeSB9O1xuIiwiLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhY2hlRW50cnlcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxhc3RIaXRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleVxyXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBjb2RlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvZGVDYWNoZU9wdGlvbnNcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtzaXplPTEwMDBdIC0gTWF4aW11bSBudW1iZXIgb2YgZW50cmllcyBpbiB0aGUgY2FjaGUuIElmIHNldCB0byAwIG9yIGxlc3MsIGNhY2hpbmcgaXMgZGlzYWJsZWQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvZGVDYWNoZSBjbGFzcyB0byBtYW5hZ2UgY2FjaGluZyBvZiBnZW5lcmF0ZWQgY29kZSBzbmlwcGV0cy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZGVDYWNoZSB7XHJcblx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xyXG5cdCNkaXNhYmxlZCA9IGZhbHNlO1xyXG5cdC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xyXG5cdCNzaXplID0gMDtcclxuXHQvKiogQHR5cGUge251bWJlcn0gKi9cclxuXHQjbWF4U2l6ZSA9IDA7XHJcblx0LyoqIEB0eXBlIHtBcnJheTxDYWNoZUVudHJ5Pn0gKi9cclxuXHQjZW50cmllcyA9IFtdO1xyXG5cdC8qKiBAdHlwZSB7TWFwPHN0cmluZyxDYWNoZUVudHJ5fSAqL1xyXG5cdCNlbnRyeU1hcCA9IG5ldyBNYXAoKTtcclxuXHJcblx0XHJcblx0IC8qKlxyXG5cdCAgKiBAcGFyYW0ge0NvZGVDYWNoZU9wdGlvbnN9IG9wdGlvbnNcclxuXHQgICovXHJcblx0Y29uc3RydWN0b3IoeyBzaXplID0gMTAwMCB9ID0ge30pIHtcclxuXHRcdGlmIChzaXplIDw9IDApIHRoaXMuI2Rpc2FibGVkID0gdHJ1ZTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLiNzaXplID0gc2l6ZSA+IDAgPyBzaXplIDogMTAwMDtcclxuXHRcdFx0dGhpcy4jbWF4U2l6ZSA9IE1hdGguZmxvb3Ioc2l6ZSAqIDEuMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQgLyoqXHJcblx0ICAqIEBwYXJhbSB7Q29kZUNhY2hlT3B0aW9uc30gb3B0aW9uc1xyXG5cdCAgKi9cclxuXHRzZXR1cCh7IHNpemUgPSAxMDAwIH0gPSB7fSkge1xyXG5cdFx0aWYgKHNpemUgPD0gMCl7XHJcblx0XHRcdHRoaXMuI2Rpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbGVhcigpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuI3NpemUgPSBzaXplID4gMCA/IHNpemUgOiAxMDAwO1xyXG5cdFx0XHR0aGlzLiNtYXhTaXplID0gTWF0aC5mbG9vcihzaXplICogMS4xKTtcclxuXHRcdFx0dGhpcy4jdHJpbSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGFzKGtleSkge1xyXG5cdFx0aWYodGhpcy4jZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLiNlbnRyeU1hcC5oYXMoa2V5KTtcclxuXHR9XHJcblxyXG5cdGdldChrZXkpIHtcclxuXHRcdGlmKHRoaXMuI2Rpc2FibGVkKSByZXR1cm4gbnVsbDtcclxuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiNlbnRyeU1hcC5nZXQoa2V5KTtcclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdGRhdGEubGFzdEhpdCA9IERhdGUubm93KCk7XHJcblx0XHRcdHJldHVybiBkYXRhLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRzZXQoa2V5LCBjb2RlKSB7XHJcblx0XHRpZih0aGlzLiNkaXNhYmxlZCkgcmV0dXJuO1xyXG5cdFx0bGV0IGVudHJ5ID0gdGhpcy4jZW50cnlNYXAuZ2V0KGtleSk7XHJcblx0XHRpZiAoZW50cnkpIHtcclxuXHRcdFx0ZW50cnkuY291bnQgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRlbnRyeS52YWx1ZSA9IGNvZGU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbnRyeSA9IHtcclxuXHRcdFx0XHRjb3VudDogRGF0ZS5ub3coKSxcclxuXHRcdFx0XHRrZXksXHJcblx0XHRcdFx0dmFsdWU6IGNvZGUsXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuI2VudHJpZXMucHVzaChlbnRyeSk7XHJcblx0XHRcdHRoaXMuI2VudHJ5TWFwLnNldChrZXksIGVudHJ5KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy4jZW50cnlNYXAuc2l6ZSA+PSB0aGlzLiNtYXhTaXplKSB0aGlzLiN0cmltKCk7XHJcblx0fVxyXG5cclxuXHRjbGVhcigpIHtcclxuXHRcdGlmKHRoaXMuI2Rpc2FibGVkKSByZXR1cm47XHJcblx0XHR0aGlzLiNlbnRyaWVzID0gW107XHJcblx0XHR0aGlzLiNlbnRyeU1hcCA9IG5ldyBNYXAoKTtcclxuXHR9XHJcblxyXG5cdCN0cmltKCkge1xyXG5cdFx0Y29uc29sZS5kZWJ1ZyhgVHJpbW1pbmcgY29kZSBjYWNoZSBmcm9tICR7dGhpcy4jZW50cmllcy5sZW5ndGh9IGVudHJpZXMgdG8gJHt0aGlzLiNzaXplfSBlbnRyaWVzLmApO1xyXG5cdFx0dGhpcy4jZW50cmllcy5zb3J0KChhLCBiKSA9PiBiLmNvdW50IC0gYS5jb3VudCk7XHJcblx0XHRpZiAodGhpcy4jZW50cmllcy5sZW5ndGggPj0gdGhpcy4jc2l6ZSkge1xyXG5cdFx0XHRjb25zdCBlbnRyaWVzVG9SZW1vdmUgPSB0aGlzLiNlbnRyaWVzLnNwbGljZSh0aGlzLiNzaXplKTtcclxuXHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzVG9SZW1vdmUpIHtcclxuXHRcdFx0XHR0aGlzLiNlbnRyeU1hcC5kZWxldGUoZW50cnkua2V5KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuIiwiLyoqXG4gKiBvYmplY3QgZm9yIGRlZmF1bHQgdmFsdWVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgRGVmYXVsdFZhbHVlXG4gKiBAdHlwZWRlZiB7RGVmYXVsdFZhbHVlfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZhdWx0VmFsdWUge1xuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEZWZhdWx0VmFsdWUuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSl7XG5cdFx0dGhpcy5oYXNWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cdFxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFeGVjdXRlcntcclxuXHJcbiAgICAjZGVmYXVsdENvbnRleHQ7XHJcbiAgICAjZXhlY3V0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uLmRlZmF1bHRDb250ZXh0XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb24uZXhlY3V0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHtkZWZhdWx0Q29udGV4dCwgZXhlY3V0aW9ufSA9IHt9KXtcclxuICAgICAgICB0aGlzLiNkZWZhdWx0Q29udGV4dCA9IGRlZmF1bHRDb250ZXh0IHx8IHt9O1xyXG4gICAgICAgIHRoaXMuI2V4ZWN1dGlvbiA9IGV4ZWN1dGlvbiB8fCAoKCkgPT4ge3Rocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKX0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVmYXVsdENvbnRleHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4jZGVmYXVsdENvbnRleHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4ZWN1dGUoYVN0YXRlbWVudCwgYUNvbnRleHQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNleGVjdXRpb24oYVN0YXRlbWVudCwgYUNvbnRleHQpO1xyXG4gICAgfVxyXG59OyIsImltcG9ydCBFeGVjdXRlciBmcm9tIFwiLi9FeGVjdXRlci5qc1wiO1xyXG5cclxuY29uc3QgRVhFQ1VURVJTID0gbmV3IE1hcCgpO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhTmFtZVxyXG4gKiBAcGFyYW0ge0V4ZWN1dGVyfSBhbkV4ZWN1dGVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVnaXN0cmF0ZSA9IChhTmFtZSwgYW5FeGVjdXRlcikgPT4ge1xyXG5cdEVYRUNVVEVSUy5zZXQoYU5hbWUsIGFuRXhlY3V0ZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhTmFtZVxyXG4gKiBAcmV0dXJucyB7RXhlY3V0ZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0RXhlY3V0ZXIgPSAoYU5hbWUpID0+IHtcclxuXHRjb25zdCBleGVjdXRlciA9IEVYRUNVVEVSUy5nZXQoYU5hbWUpO1xyXG5cdGlmICghZXhlY3V0ZXIpIHRocm93IG5ldyBFcnJvcihgRXhlY3V0ZXIgXCIke2FOYW1lfVwiIGlzIG5vdCByZWdpc3RyYXRlZCFgKTtcclxuXHRyZXR1cm4gZXhlY3V0ZXI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRFeGVjdXRlcjtcclxuIiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzXCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanNcIjtcclxuaW1wb3J0IERlZmF1bHRWYWx1ZSBmcm9tIFwiLi9EZWZhdWx0VmFsdWUuanNcIjtcclxuaW1wb3J0IGdldEV4ZWN1dGVyVHlwZSBmcm9tIFwiLi9FeGVjdXRlclJlZ2lzdHJ5LmpzXCI7XHJcbmltcG9ydCBEZWZhdWx0RXhlY3V0ZXIgZnJvbSBcIi4vZXhlY3V0ZXIvV2l0aFNjb3BlZEV4ZWN1dGVyLmpzXCI7XHJcbmltcG9ydCBDb250ZXh0UHJveHkgZnJvbSBcIi4vUmVzb2x2ZXJDb250ZXh0SGFuZGxlLmpzXCI7XHJcbmltcG9ydCBFeGVjdXRlciBmcm9tIFwiLi9FeGVjdXRlci5qc1wiO1xyXG5cclxuLyoqIEB0eXBlIHtFeGVjdXRlcn0gKi9cclxubGV0IERFRkFVTFRfRVhFQ1VURVIgPSBEZWZhdWx0RXhlY3V0ZXI7XHJcblxyXG5jb25zdCBFWEVDVVRJT05fV0FSTl9USU1FT1VUID0gMTAwMDtcclxuY29uc3QgRVhQUkVTU0lPTiA9IC8oXFxcXD8pKFxcJFxceygoW2EtekEtWjAtOVxcLV9cXHNdKyk6Oik/KFteXFx7XFx9XSspXFx9KS87XHJcbmNvbnN0IE1BVENIX0VTQ0FQRUQgPSAxO1xyXG5jb25zdCBNQVRDSF9GVUxMX0VYUFJFU1NJT04gPSAyO1xyXG5jb25zdCBNQVRDSF9FWFBSRVNTSU9OX1NDT1BFID0gNDtcclxuY29uc3QgTUFUQ0hfRVhQUkVTU0lPTl9TVEFURU1FTlQgPSA1O1xyXG5cclxuY29uc3QgREVGQVVMVF9OT1RfREVGSU5FRCA9IG5ldyBEZWZhdWx0VmFsdWUoKTtcclxuY29uc3QgdG9EZWZhdWx0VmFsdWUgPSAodmFsdWUpID0+IHtcclxuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUpIHJldHVybiB2YWx1ZTtcclxuXHJcblx0cmV0dXJuIG5ldyBEZWZhdWx0VmFsdWUodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3QgZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uIChhbkV4ZWN1dGVyLCBhU3RhdGVtZW50LCBhQ29udGV4dCkge1xyXG5cdGlmICh0eXBlb2YgYVN0YXRlbWVudCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIGFTdGF0ZW1lbnQ7XHJcblx0YVN0YXRlbWVudCA9IG5vcm1hbGl6ZShhU3RhdGVtZW50KTtcclxuXHRpZiAoYVN0YXRlbWVudCA9PSBudWxsKSByZXR1cm4gYVN0YXRlbWVudDtcclxuXHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChcclxuXHRcdFx0XHQoKSA9PlxyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBMb25nIHJ1bm5pbmcgc3RhdGVtZW50OlxyXG5cdFx0XHRcdFwiJHthU3RhdGVtZW50fVwiXHJcblx0XHRcdGApLFxyXG5cdFx0XHRcdEVYRUNVVElPTl9XQVJOX1RJTUVPVVQsXHJcblx0XHRcdCk7XHJcblx0XHRcdHJlc29sdmUoXHJcblx0XHRcdFx0KGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdGxldCByZXN1bHQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBhd2FpdCBhbkV4ZWN1dGVyLmV4ZWN1dGUoYVN0YXRlbWVudCwgYUNvbnRleHQpO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYEV4ZWN1dGlvbiBlcnJvciBvbiBzdGF0ZW1lbnQhXHJcblx0XHRcdFx0XHRcdFx0c3RhdGVtZW50OiBcclxuXHRcdFx0XHRcdFx0XHQke2FTdGF0ZW1lbnR9XHJcblx0XHRcdFx0XHRcdFx0ZXJyb3I6XHJcblx0XHRcdFx0XHRcdFx0JHtlfVxyXG5cdFx0XHRcdFx0XHRcdGApXHJcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHRcdH0pKCksXHJcblx0XHRcdCk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBieSBzdGF0ZW1lbnQgXCIke2FTdGF0ZW1lbnR9XCI6YCwgZSk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGFzeW5jIGZ1bmN0aW9uIChhRXhlY3V0ZXIgPSBERUZBVUxUX0VYRUNVVEVSLCBhUmVzb2x2ZXIsIGFFeHByZXNzaW9uLCBhRmlsdGVyLCBhRGVmYXVsdCkge1xyXG5cdGlmIChhRmlsdGVyICYmIGFSZXNvbHZlci5uYW1lICE9IGFGaWx0ZXIpIHJldHVybiBhUmVzb2x2ZXIucGFyZW50ID8gcmVzb2x2ZShhUmVzb2x2ZXIucGFyZW50LCBhRXhwcmVzc2lvbiwgYUZpbHRlciwgYURlZmF1bHQsIGFFeGVjdXRlcikgOiBudWxsO1xyXG5cclxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlKGFFeGVjdXRlciwgYUV4cHJlc3Npb24sIGFSZXNvbHZlci5jb250ZXh0KTtcclxuXHRpZiAocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiByZXN1bHQ7XHJcblx0ZWxzZSBpZiAoYURlZmF1bHQgaW5zdGFuY2VvZiBEZWZhdWx0VmFsdWUgJiYgYURlZmF1bHQuaGFzVmFsdWUpIHJldHVybiBhRGVmYXVsdC52YWx1ZTtcclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZU1hdGNoID0gYXN5bmMgKGFFeGVjdXRlciwgcmVzb2x2ZXIsIG1hdGNoLCBkZWZhdWx0VmFsdWUpID0+IHtcclxuXHRpZiAobWF0Y2hbTUFUQ0hfRVNDQVBFRF0pIHJldHVybiBtYXRjaFtNQVRDSF9GVUxMX0VYUFJFU1NJT05dO1xyXG5cclxuXHRyZXR1cm4gcmVzb2x2ZShhRXhlY3V0ZXIsIHJlc29sdmVyLCBtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NUQVRFTUVOVF0sIG5vcm1hbGl6ZShtYXRjaFtNQVRDSF9FWFBSRVNTSU9OX1NDT1BFXSksIGRlZmF1bHRWYWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemUgPSAodmFsdWUpID0+IHtcclxuXHRpZiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gdmFsdWUudHJpbSgpO1xyXG5cdFx0cmV0dXJuIHZhbHVlLmxlbmd0aCA9PSAwID8gbnVsbCA6IHZhbHVlO1xyXG5cdH1cclxuXHRyZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeHByZXNzaW9uUmVzb2x2ZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgRXhwcmVzc2lvblJlc29sdmVyXHJcbiAqIEB0eXBlZGVmIHtFeHByZXNzaW9uUmVzb2x2ZXJ9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzaW9uUmVzb2x2ZXIge1xyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhbkV4ZWN1dGVyTmFtZVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXQgZGVmYXVsdEV4ZWN1dGVyKGFuRXhlY3V0ZXIpIHtcclxuXHRcdGlmICggYW5FeGVjdXRlciBpbnN0YW5jZW9mIEV4ZWN1dGVyKSBERUZBVUxUX0VYRUNVVEVSID0gYW5FeGVjdXRlcjtcclxuXHRcdGVsc2UgREVGQVVMVF9FWEVDVVRFUiA9IGdldEV4ZWN1dGVyVHlwZShhbkV4ZWN1dGVyKTtcclxuXHRcdGNvbnNvbGUuaW5mbyhgQ2hhbmdlZCBkZWZhdWx0IGV4ZWN1dGVyIGZvciBFeHByZXNzaW9uUmVzb2x2ZXIhYCk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGRlZmF1bHRFeGVjdXRlcigpIHtcclxuXHRcdHJldHVybiBERUZBVUxUX0VYRUNVVEVSO1xyXG5cdH1cclxuXHJcblx0LyoqIEB0eXBlIHtzdHJpbmd8bnVsbH0gKi9cclxuXHQjbmFtZSA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtFeHByZXNzaW9uUmVzb2x2ZXJ8bnVsbH0gKi9cclxuXHQjcGFyZW50ID0gbnVsbDtcclxuXHQvKiogQHR5cGUge2Z1bmN0aW9ufG51bGx9ICovXHJcblx0I2V4ZWN1dGVyID0gbnVsbDtcclxuXHQvKiogQHR5cGUge1Byb3h5fG51bGx9ICovXHJcblx0I2NvbnRleHQgPSBudWxsO1xyXG5cdC8qKiBAdHlwZSB7UmVzb2x2ZXJDb250ZXh0SGFuZGxlfG51bGx9ICovXHJcblx0I2NvbnRleHRIYW5kbGUgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV4cHJlc3Npb25SZXNvbHZlci5cclxuXHQgKiBAZGF0ZSAzLzEwLzIwMjQgLSA3OjI3OjU3IFBNXHJcblx0ICpcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge3sgY29udGV4dD86IGFueTsgcGFyZW50PzogYW55OyBuYW1lPzogYW55OyB9fSBwYXJhbTBcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtMC5jb250ZXh0PUdMT0JBTF1cclxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gW3BhcmFtMC5wYXJlbnQ9bnVsbF1cclxuXHQgKiBAcGFyYW0gez9zdHJpbmd9IFtwYXJhbTAubmFtZT1udWxsXVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHsgY29udGV4dCA9IERFRkFVTFRfRVhFQ1VURVIuZGVmYXVsdENvbnRleHQsIHBhcmVudCA9IG51bGwsIG5hbWUgPSBudWxsLCBleGVjdXRlciB9ID0ge30pIHtcclxuXHRcdHRoaXMuI3BhcmVudCA9IHBhcmVudCBpbnN0YW5jZW9mIEV4cHJlc3Npb25SZXNvbHZlciA/IHBhcmVudCA6IG51bGw7XHJcblx0XHR0aGlzLiNuYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuI2NvbnRleHRIYW5kbGUgPSBuZXcgQ29udGV4dFByb3h5KGNvbnRleHQsIHRoaXMuI3BhcmVudCA/IHRoaXMuI3BhcmVudC5jb250ZXh0SGFuZGxlIDogbnVsbCk7XHJcblx0XHR0aGlzLiNjb250ZXh0ID0gdGhpcy4jY29udGV4dEhhbmRsZS5wcm94eTtcclxuXHRcdHRoaXMuI2V4ZWN1dGVyID0gdHlwZW9mIGV4ZWN1dGVyID09PSBcInN0cmluZ1wiID8gZ2V0RXhlY3V0ZXJUeXBlKGV4ZWN1dGVyKSA6IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdGdldCBuYW1lKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI25hbWU7XHJcblx0fVxyXG5cclxuXHRnZXQgcGFyZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3BhcmVudDtcclxuXHR9XHJcblxyXG5cdGdldCBjb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbnRleHQ7XHJcblx0fVxyXG5cclxuXHRnZXQgY29udGV4dEhhbmRsZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNjb250ZXh0SGFuZGxlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGNoYWluIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0IGNoYWluKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuY2hhaW4gKyBcIi9cIiArIHRoaXMubmFtZSA6IFwiL1wiICsgdGhpcy5uYW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZ2V0IGVmZmVjdGl2ZSBjaGFpbiBwYXRoXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldCBlZmZlY3RpdmVDaGFpbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmVmZmVjdGl2ZUNoYWluICsgXCIvXCIgKyB0aGlzLm5hbWUgOiBcIi9cIiArIHRoaXMubmFtZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBjb250ZXh0IGNoYWluXHJcblx0ICpcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAcmV0dXJucyB7Q29udGV4dFtdfVxyXG5cdCAqL1xyXG5cdGdldCBjb250ZXh0Q2hhaW4oKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdGxldCByZXNvbHZlciA9IHRoaXM7XHJcblx0XHR3aGlsZSAocmVzb2x2ZXIpIHtcclxuXHRcdFx0aWYgKHJlc29sdmVyLmNvbnRleHQpIHJlc3VsdC5wdXNoKHJlc29sdmVyLmNvbnRleHQpO1xyXG5cclxuXHRcdFx0cmVzb2x2ZXIgPSByZXNvbHZlci5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGdldCBkYXRhIGZyb20gY29udGV4dFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICovXHJcblx0Z2V0RGF0YShrZXksIGZpbHRlcikge1x0XHRcclxuXHRcdGlmICgha2V5KSByZXR1cm4gdGhpcy5jb250ZXh0O1xyXG5cdFx0ZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5nZXREYXRhKGtleSwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRleHRba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHVwZGF0ZSBkYXRhIGF0IGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXHJcblx0ICogQHBhcmFtIHs/c3RyaW5nfSBmaWx0ZXJcclxuXHQgKi9cclxuXHR1cGRhdGVEYXRhKGtleSwgdmFsdWUsIGZpbHRlcikge1xyXG5cdFx0aWYgKCFrZXkpIHJldHVybjtcclxuXHRcdGVsc2UgaWYgKGZpbHRlciAmJiBmaWx0ZXIgIT0gdGhpcy5uYW1lKSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQudXBkYXRlRGF0YShrZXksIHZhbHVlLCBmaWx0ZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0W2tleV0gPSB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIG1lcmdlIGNvbnRleHQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7P3N0cmluZ30gZmlsdGVyXHJcblx0ICovXHRcclxuXHRtZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoZmlsdGVyICYmIGZpbHRlciAhPSB0aGlzLm5hbWUpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5tZXJnZUNvbnRleHQoY29udGV4dCwgZmlsdGVyKTtcclxuXHRcdH0gZWxzZSBcclxuXHRcdFx0dGhpcy4jY29udGV4dEhhbmRsZS5tZXJnZURhdGEoY29udGV4dCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlZCBhbiBleHByZXNzaW9uIHN0cmluZyB0byBkYXRhXHJcblx0ICpcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez8qfSBhRGVmYXVsdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFEZWZhdWx0KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YUV4cHJlc3Npb24gPSBhRXhwcmVzc2lvbi50cmltKCk7XHJcblx0XHRcdGlmIChhRXhwcmVzc2lvbi5zdGFydHNXaXRoKFwiXFxcXCR7XCIpKSByZXR1cm4gYUV4cHJlc3Npb24uc3Vic3RyaW5nKDEpO1xyXG5cdFx0XHRlbHNlIGlmIChhRXhwcmVzc2lvbi5zdGFydHNXaXRoKFwiJHtcIikgJiYgYUV4cHJlc3Npb24uZW5kc1dpdGgoXCJ9XCIpKSByZXR1cm4gYXdhaXQgcmVzb2x2ZSh0aGlzLiNleGVjdXRlciwgdGhpcywgbm9ybWFsaXplKGFFeHByZXNzaW9uLnN1YnN0cmluZygyLCBhRXhwcmVzc2lvbi5sZW5ndGggLSAxKSksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHRcdFx0XHJcblx0XHRcdGVsc2UgcmV0dXJuIGF3YWl0IHJlc29sdmUodGhpcy4jZXhlY3V0ZXIsIHRoaXMsIG5vcm1hbGl6ZShhRXhwcmVzc2lvbiksIG51bGwsIGRlZmF1bHRWYWx1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGF0IGV4ZWN1dGluZyBzdGF0bWVudFwiJywgYUV4cHJlc3Npb24sICdcIjonLCBlKTtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZS5oYXNWYWx1ZSA/IGRlZmF1bHRWYWx1ZS52YWx1ZSA6IGFFeHByZXNzaW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVwbGFjZSBhbGwgZXhwcmVzc2lvbnMgYXQgYSBzdHJpbmdcdCAqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGFUZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cclxuXHQgKi9cclxuXHRhc3luYyByZXNvbHZlVGV4dChhVGV4dCwgYURlZmF1bHQpIHtcclxuXHRcdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0XHRsZXQgdGVtcCA9IGFUZXh0OyAvLyByZXF1aXJlZCB0byBwcmV2ZW50IGluZmluaXR5IGxvb3BcclxuXHRcdGxldCBtYXRjaCA9IEVYUFJFU1NJT04uZXhlYyh0ZXh0KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA/IHRvRGVmYXVsdFZhbHVlKGFEZWZhdWx0KSA6IERFRkFVTFRfTk9UX0RFRklORUQ7XHJcblx0XHR3aGlsZSAobWF0Y2ggIT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCByZXNvbHZlTWF0Y2godGhpcy4jZXhlY3V0ZXIsIHRoaXMsIG1hdGNoLCBkZWZhdWx0VmFsdWUpO1xyXG5cdFx0XHR0ZW1wID0gdGVtcC5zcGxpdChtYXRjaFswXSkuam9pbigpOyAvLyByZW1vdmUgY3VycmVudCBtYXRjaCBmb3IgbmV4dCBsb29wXHJcblx0XHRcdHRleHQgPSB0ZXh0LnNwbGl0KG1hdGNoWzBdKS5qb2luKHR5cGVvZiByZXN1bHQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogcmVzdWx0ID09IG51bGwgPyBcIm51bGxcIiA6IHJlc3VsdCk7XHJcblx0XHRcdG1hdGNoID0gRVhQUkVTU0lPTi5leGVjKHRlbXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiByZXNvbHZlIGFuIGV4cHJlc3Npb24gc3RyaW5nIHRvIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYUV4cHJlc3Npb25cclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmUoYUV4cHJlc3Npb24sIGFDb250ZXh0LCBhRGVmYXVsdCwgYVRpbWVvdXQpIHtcclxuXHRcdGNvbnN0IHJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQ6IGFDb250ZXh0IH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyB0b0RlZmF1bHRWYWx1ZShhRGVmYXVsdCkgOiBERUZBVUxUX05PVF9ERUZJTkVEO1xyXG5cdFx0aWYgKHR5cGVvZiBhVGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiBhVGltZW91dCA+IDApXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpKTtcclxuXHRcdFx0XHR9LCBhVGltZW91dCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByZXNvbHZlci5yZXNvbHZlKGFFeHByZXNzaW9uLCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogcmVwbGFjZSBleHByZXNzaW9uIGF0IHRleHRcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYVRleHRcclxuXHQgKiBAcGFyYW0gez9vYmplY3R9IGFDb250ZXh0XHJcblx0ICogQHBhcmFtIHs/Kn0gYURlZmF1bHRcclxuXHQgKiBAcGFyYW0gez9udW1iZXJ9IGFUaW1lb3V0XHJcblx0ICogQHJldHVybnMge1Byb21pc2U8Kj59XHJcblx0ICovXHJcblx0c3RhdGljIGFzeW5jIHJlc29sdmVUZXh0KGFUZXh0LCBhQ29udGV4dCwgYURlZmF1bHQsIGFUaW1lb3V0KSB7XHJcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBhQ29udGV4dCB9KTtcclxuXHRcdGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gdG9EZWZhdWx0VmFsdWUoYURlZmF1bHQpIDogREVGQVVMVF9OT1RfREVGSU5FRDtcclxuXHRcdGlmICh0eXBlb2YgYVRpbWVvdXQgPT09IFwibnVtYmVyXCIgJiYgYVRpbWVvdXQgPiAwKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzb2x2ZXIucmVzb2x2ZVRleHQoYVRleHQsIGRlZmF1bHRWYWx1ZSkpO1xyXG5cdFx0XHRcdH0sIGFUaW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc29sdmVyLnJlc29sdmVUZXh0KGFUZXh0LCBkZWZhdWx0VmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYnVpbGQgYSBzZWN1cmUgY29udGV4dCBvYmplY3RcclxuXHQgKlxyXG5cdCAqIEBzdGF0aWNcclxuXHQgXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGFyZ1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBhcmcuY29udGV4dFxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGFyZy5wcm9wRmlsdGVyXHJcblx0ICogQHBhcmFtIHt7IGRlZXA6IGJvb2xlYW47IH19IFthcmcub3B0aW9uPXsgZGVlcDogdHJ1ZSB9XVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhcmcubmFtZVxyXG5cdCAqIEBwYXJhbSB7RXhwcmVzc2lvblJlc29sdmVyfSBhcmcucGFyZW50XHJcblx0ICogQHJldHVybnMge29iamVjdH1cclxuXHQgKi9cclxuXHRzdGF0aWMgYnVpbGRTZWN1cmUoeyBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gPSB7IGRlZXA6IHRydWUgfSwgbmFtZSwgcGFyZW50IH0pIHtcclxuXHRcdGNvbnRleHQgPSBPYmplY3RVdGlscy5maWx0ZXIoeyBkYXRhOiBjb250ZXh0LCBwcm9wRmlsdGVyLCBvcHRpb24gfSk7XHJcblx0XHRyZXR1cm4gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IGNvbnRleHQsIG5hbWUsIHBhcmVudCB9KTtcclxuXHR9XHJcbn1cclxuXHJcbiIsImltcG9ydCBHTE9CQUwgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0dsb2JhbC5qc1wiO1xyXG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCIuL0V4cHJlc3Npb25SZXNvbHZlclwiO1xyXG5cclxuXHJcbmNvbnN0IFZBUk5BTUVfQ0hFQ0sgPSAvXlskX1xccHtJRF9TdGFydH1dWyRcXHB7SURfQ29udGludWV9XSokL3U7XHJcblxyXG5jb25zdCBjcmVhdGVHbG9iYWxDYWNoZVdyYXBwZXIgPSAoaGFuZGxlKSA9PiB7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRoYXM6IChwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRnZXQ6IChwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaGFuZGxlXHJcblx0XHR9LFxyXG5cdFx0c2V0OiAocHJvcGVydHksIHZhbHVlKSA9PiB7XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0ZGVsZXRlOiAocHJvcGVydHkpID0+IHtcclxuXHRcdFx0ZGVsZXRlIEdMT0JBTFtwcm9wZXJ0eV07XHJcblx0XHR9LFxyXG5cdFx0a2V5czogKCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoR0xPQkFMKTtcclxuXHRcdH1cclxuXHR9XHRcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDb250ZXh0IG9iamVjdCB0byBoYW5kbGUgZGF0YSBhY2Nlc3NcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgUmVzb2x2ZXJDb250ZXh0SGFuZGxlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvbHZlckNvbnRleHRIYW5kbGUge1xyXG5cdC8qKiBAdHlwZSB7UHJveHl8bnVsbH0gKi9cclxuXHQjcHJveHkgPSBudWxsO1xyXG5cdC8qKiBAdHlwZSB7UmVzb2x2ZXJDb250ZXh0SGFuZGxlfG51bGx9ICovXHJcblx0I3BhcmVudCA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtvYmplY3R8bnVsbH0gKi9cclxuXHQjZGF0YSA9IG51bGw7XHJcblx0LyoqIEB0eXBlIHtNYXA8c3RyaW5nLFJlc29sdmVyQ29udGV4dEhhbmRsZT58bnVsbH0gKi9cclxuXHQjY2FjaGUgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbnRleHQuXHJcblx0ICpcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG5cdCAqIEBwYXJhbSB7RXhwcmVzc2lvblJlc29sdmVyfSByZXNvbHZlclxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGRhdGEsIHBhcmVudCkge1xyXG5cdFx0dGhpcy4jZGF0YSA9IGRhdGEgfHwge307XHJcblx0XHR0aGlzLiNwYXJlbnQgPSBwYXJlbnQgPyBwYXJlbnQgOiBudWxsO1xyXG5cdFx0dGhpcy4jY2FjaGUgPSB0aGlzLiNpbml0UHJvcGVydHlDYWNoZSgpO1xyXG5cclxuXHRcdHRoaXMuI3Byb3h5ID0gbmV3IFByb3h5KHRoaXMuI2RhdGEsIHtcclxuXHRcdFx0aGFzOiAoZGF0YSwgcHJvcGVydHkpID0+IHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiaGFzIHByb3BlcnR5OlwiLCBwcm9wZXJ0eSk7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuI2hhc1Byb3BlcnR5KHByb3BlcnR5KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0OiAoZGF0YSwgcHJvcGVydHkpID0+IHtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiZ2V0IHByb3BlcnR5OlwiLCBwcm9wZXJ0eSk7XHJcblx0XHRcdFx0Y29uc3QgcHJveHkgPSB0aGlzLiNnZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XHJcblx0XHRcdFx0cmV0dXJuIHByb3h5ID8gcHJveHkuI2dldFByb3BlcnR5KHByb3BlcnR5KSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0OiAoZGF0YSwgcHJvcGVydHksIHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcInNldCBwcm9wZXJ0eTpcIiwgcHJvcGVydHksIFwiPVwiLCB2YWx1ZSk7XHJcblx0XHRcdFx0Y29uc3QgcHJveHkgPSB0aGlzLiNnZXRQcm9wZXJ0eURlZihwcm9wZXJ0eSk7XHJcblx0XHRcdFx0aWYgKHByb3h5KSByZXR1cm4gcHJveHkuI3NldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XHJcblx0XHRcdFx0ZWxzZSByZXR1cm4gdGhpcy4jc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IChkYXRhLCBwcm9wZXJ0eSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLiNkZWxldGVQcm9wZXJ0eShwcm9wZXJ0eSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdG93bktleXM6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIm93bktleXNcIik7XHJcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IFNldCgpO1xyXG5cdFx0XHRcdGxldCBwcm94eSA9IHRoaXM7XHJcblx0XHRcdFx0d2hpbGUgKHByb3h5KSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBrZXkgb2YgcHJveHkuI2NhY2hlLmtleXMoKSkge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHQuYWRkKGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwcm94eSA9IHByb3h5LiNwYXJlbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBBcnJheS5mcm9tKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvL0BUT0RPIG5lZWQgdG8gc3VwcG9ydCB0aGUgb3RoZXIgcHJveHkgYWN0aW9uc1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7UHJveHl9XHJcblx0ICovXHJcblx0Z2V0IHByb3h5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3Byb3h5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge1Jlc29sdmVyQ29udGV4dEhhbmRsZXxudWxsfVxyXG5cdCAqL1xyXG5cdGdldCBwYXJlbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcGFyZW50O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlRGF0YShkYXRhKSB7XHJcblx0XHR0aGlzLiNkYXRhID0gZGF0YSB8fCB7fTtcclxuXHRcdHRoaXMuI2NhY2hlID0gdGhpcy4jaW5pdFByb3BlcnR5Q2FjaGUoKTtcclxuXHR9XHJcblxyXG5cdG1lcmdlRGF0YShkYXRhKSB7XHJcblx0XHRpZih0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgfHwgZGF0YSA9PSBudWxsKSByZXR1cm47XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMuI2RhdGEsIGRhdGEpO1xyXG5cdFx0dGhpcy4jY2FjaGUgPSB0aGlzLiNpbml0UHJvcGVydHlDYWNoZSgpO1xyXG5cdH1cclxuXHJcblx0cmVzZXRDYWNoZSgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0gdGhpcy4jaW5pdFByb3BlcnR5Q2FjaGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge01hcDxzdHJpbmcsUHJvcGVydHlEZWZpbml0aW9uPn1cclxuXHQgKi9cclxuXHQjaW5pdFByb3BlcnR5Q2FjaGUoKSB7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy4jZGF0YTtcclxuXHRcdGlmKGRhdGEgPT0gR0xPQkFMKSBcclxuXHRcdFx0cmV0dXJuIGNyZWF0ZUdsb2JhbENhY2hlV3JhcHBlcih0aGlzKTtcdFxyXG5cclxuXHRcdGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xyXG5cdFx0Zm9yIChsZXQgcHJvcGVydHkgaW4gZGF0YSkge1xyXG5cdFx0XHRpZihWQVJOQU1FX0NIRUNLLnRlc3QocHJvcGVydHkpKVx0XHJcblx0XHRcdFx0Y2FjaGUuc2V0KHByb3BlcnR5LCB0aGlzKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGNvbnNvbGUud2FybihgVmFyaWFibGUgbmFtZSBpcyBpbGxlZ2FsICR7cHJvcGVydHl9LCB2YXJpYWJsZSBpcmdub3JlZCFgKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2FjaGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcclxuXHQgKiBAcmV0dXJucyB7UmVzb2x2ZXJDb250ZXh0SGFuZGxlfG51bGx9XHJcblx0ICovXHJcblx0I2dldFByb3BlcnR5RGVmKHByb3BlcnR5KSB7XHJcblx0XHRpZiAodGhpcy4jY2FjaGUuaGFzKHByb3BlcnR5KSkgcmV0dXJuIHRoaXMuI2NhY2hlLmdldChwcm9wZXJ0eSk7XHJcblx0XHRsZXQgcGFyZW50ID0gdGhpcy4jcGFyZW50O1xyXG5cdFx0d2hpbGUgKHBhcmVudCkge1xyXG5cdFx0XHRpZiAocGFyZW50LiNjYWNoZS5oYXMocHJvcGVydHkpKSByZXR1cm4gcGFyZW50LiNjYWNoZS5nZXQocHJvcGVydHkpO1xyXG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQuI3BhcmVudDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0I2hhc1Byb3BlcnR5KHByb3BlcnR5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZ2V0UHJvcGVydHlEZWYocHJvcGVydHkpICE9IG51bGw7XHJcblx0fVxyXG5cdCNnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xyXG5cdFx0Ly9AVE9ETyB3cml0ZSB0ZXN0cyEhIVxyXG5cdFx0cmV0dXJuIHRoaXMuI2RhdGFbcHJvcGVydHldO1xyXG5cdH1cclxuXHQjc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XHJcblx0XHQvL0BUT0RPIHdvdWxkIHN1cHBvcnQgdGhpcyBhY3Rpb24gb24gYW4gcHJveGllZCByZXNvbHZlciBjb250ZXh0Pz8/IHdyaXRlIHRlc3RzISEhXHJcblx0XHQvL2NvbnNvbGUubG9nKFwic2V0IHByb3BlcnR5IGRhdGE6XCIsIHByb3BlcnR5LCBcIj1cIiwgdmFsdWUpO1xyXG5cdFx0dGhpcy4jZGF0YVtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuXHRcdHRoaXMuI2NhY2hlLnNldChwcm9wZXJ0eSwgdGhpcyk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0I2RlbGV0ZVByb3BlcnR5KHByb3BlcnR5KSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eURlZiA9IHRoaXMuI2NhY2hlLmdldChwcm9wZXJ0eSk7XHJcblx0XHRpZiAocHJvcGVydHlEZWYpIHtcclxuXHRcdFx0ZGVsZXRlIHByb3BlcnR5RGVmLmRhdGFbcHJvcGVydHldO1xyXG5cdFx0XHR0aGlzLiNjYWNoZS5kZWxldGUocHJvcGVydHkpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyByZWdpc3RyYXRlIH0gZnJvbSBcIi4uL0V4ZWN1dGVyUmVnaXN0cnkuanNcIjtcclxuaW1wb3J0IEV4ZWN1dGVyIGZyb20gXCIuLi9FeGVjdXRlci5qc1wiO1xyXG5pbXBvcnQgQ29kZUNhY2hlIGZyb20gXCIuLi9Db2RlQ2FjaGUuanNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFWEVDVVRFUk5BTUUgPSBcImNvbnRleHQtZGVjb25zdHJ1Y3Rpb24tZXhlY3V0ZXJcIjtcclxuXHJcbmNvbnN0IEVYUFJFU1NJT05fQ0FDSEUgPSBuZXcgQ29kZUNhY2hlKHsgc2l6ZTogNTAwMCB9KTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vQ29kZUNhY2hlLmpzJykuQ29kZUNhY2hlT3B0aW9uc30gb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldHVwRXhlY3V0ZXIgPSAob3B0aW9ucykgPT4ge1xyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0dXAob3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTdGF0ZW1lbnRcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZ2VuZXJhdGUgPSAoYVN0YXRlbWVudCwgY29udGV4dFByb3BlcnRpZXMpID0+IHtcclxuXHRjb25zdCBjb2RlID0gYFxyXG5yZXR1cm4gKGFzeW5jICh7JHtjb250ZXh0UHJvcGVydGllc319KSA9PiB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgcmV0dXJuICR7YVN0YXRlbWVudH1cclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG59KShjb250ZXh0IHx8IHt9KTtgO1xyXG5cclxuXHRjb25zb2xlLmxvZyhcImNvZGVcIiwgY29kZSk7XHJcblxyXG5cdHJldHVybiBuZXcgRnVuY3Rpb24oXCJjb250ZXh0XCIsIGNvZGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU3RhdGVtZW50XHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGdldE9yQ3JlYXRlRnVuY3Rpb24gPSAoYVN0YXRlbWVudCwgY29udGV4dFByb3BlcnRpZXMpID0+IHtcclxuXHRjb25zdCBjYWNoZUtleSA9IGAke2NvbnRleHRQcm9wZXJ0aWVzfTo6JHthU3RhdGVtZW50fWA7XHJcblx0aWYgKEVYUFJFU1NJT05fQ0FDSEUuaGFzKGNhY2hlS2V5KSkge1xyXG5cdFx0cmV0dXJuIEVYUFJFU1NJT05fQ0FDSEUuZ2V0KGNhY2hlS2V5KTtcclxuXHR9XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IGdlbmVyYXRlKGFTdGF0ZW1lbnQsIGNvbnRleHRQcm9wZXJ0aWVzKTtcclxuXHRFWFBSRVNTSU9OX0NBQ0hFLnNldChjYWNoZUtleSwgZXhwcmVzc2lvbik7XHJcblx0cmV0dXJuIGV4cHJlc3Npb247XHJcbn07XHJcblxyXG5jb25zdCBFWEVDVVRFUiA9IG5ldyBFeGVjdXRlcih7XHJcblx0ZGVmYXVsdENvbnRleHQ6IHt9LFxyXG5cdGV4ZWN1dGlvbjogKGFTdGF0ZW1lbnQsIGFDb250ZXh0KSA9PiB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYUNvbnRleHQgfHwge30pO1xyXG5cdFx0aWYocHJvcGVydHlOYW1lcy5sZW5ndGggPiA1MClcclxuXHRcdFx0Y29uc29sZS53YXJuKGBIaWdoIGNvdW50IG9mIHByb3BlcnRpZXMgYXQgZmlyc3QgbGV2ZWwsIGNhbiBiZSBkZWNyZWFzZSB0aGUgcGVyZm9ybWVuY2UhIGNvdW50OiAke3Byb3BlcnR5TmFtZXMubGVuZ3RofWApO1xyXG5cclxuXHRcdGNvbnN0IGNvbnRleHRQcm9wZXJ0aWVzID0gcHJvcGVydHlOYW1lcy5qb2luKFwiLFwiKTtcclxuXHRcdGNvbnN0IGV4cHJlc3Npb24gPSBnZXRPckNyZWF0ZUZ1bmN0aW9uKGFTdGF0ZW1lbnQsIGNvbnRleHRQcm9wZXJ0aWVzKTtcclxuXHRcdHJldHVybiBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbnJlZ2lzdHJhdGUoRVhFQ1VURVJOQU1FLCBFWEVDVVRFUik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFWEVDVVRFUjtcclxuIiwiaW1wb3J0IHsgcmVnaXN0cmF0ZSB9IGZyb20gXCIuLi9FeGVjdXRlclJlZ2lzdHJ5LmpzXCI7XHJcbmltcG9ydCBFeGVjdXRlciBmcm9tIFwiLi4vRXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IENvZGVDYWNoZSBmcm9tIFwiLi4vQ29kZUNhY2hlLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVhFQ1VURVJOQU1FID0gXCJjb250ZXh0LW9iamVjdC1leGVjdXRlclwiO1xyXG5jb25zdCBFWFBSRVNTSU9OX0NBQ0hFID0gbmV3IENvZGVDYWNoZSh7IGFTaXplOiA1MDAwIH0pO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9Db2RlQ2FjaGUuanMnKS5Db2RlQ2FjaGVPcHRpb25zfSBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0dXBFeGVjdXRlciA9IChvcHRpb25zKSA9PiB7XHJcblx0RVhQUkVTU0lPTl9DQUNIRS5zZXR1cChvcHRpb25zKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYVN0YXRlbWVudFxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBnZW5lcmF0ZSA9IChhU3RhdGVtZW50KSA9PiB7XHJcblx0Y29uc3QgY29kZSA9IGBcclxucmV0dXJuIChhc3luYyAoY3R4KSA9PiB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgcmV0dXJuICR7YVN0YXRlbWVudH1cclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG59KShjb250ZXh0IHx8IHt9KTtgO1xyXG5cclxuXHQvL2NvbnNvbGUubG9nKFwiY29kZVwiLCBjb2RlKTtcclxuXHJcblx0cmV0dXJuIG5ldyBGdW5jdGlvbihcImNvbnRleHRcIiwgY29kZSk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTdGF0ZW1lbnRcclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZ2V0T3JDcmVhdGVGdW5jdGlvbiA9IChhU3RhdGVtZW50KSA9PiB7XHJcblxyXG5cdGNvbnN0IGNhY2hlS2V5ID0gYVN0YXRlbWVudDtcclxuXHJcblx0aWYgKEVYUFJFU1NJT05fQ0FDSEUuaGFzKGNhY2hlS2V5KSkge1xyXG5cdFx0cmV0dXJuIEVYUFJFU1NJT05fQ0FDSEUuZ2V0KGNhY2hlS2V5KTtcclxuXHR9XHJcblx0Y29uc3QgZXhwcmVzc2lvbiA9IGdlbmVyYXRlKGFTdGF0ZW1lbnQpO1xyXG5cdEVYUFJFU1NJT05fQ0FDSEUuc2V0KGNhY2hlS2V5LCBleHByZXNzaW9uKTtcclxuXHRyZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuXHJcbmNvbnN0IEVYRUNVVEVSID0gbmV3IEV4ZWN1dGVyKHtcclxuXHRkZWZhdWx0Q29udGV4dDoge30sXHJcblx0ZXhlY3V0aW9uOiAoYVN0YXRlbWVudCwgYUNvbnRleHQpID0+IHtcclxuXHRcdGNvbnN0IGV4cHJlc3Npb24gPSBnZXRPckNyZWF0ZUZ1bmN0aW9uKGFTdGF0ZW1lbnQpO1xyXG5cdHJldHVybiBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9LFxyXG59KTtcclxuXHJcbnJlZ2lzdHJhdGUoRVhFQ1VURVJOQU1FLCBFWEVDVVRFUik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFWEVDVVRFUjsiLCJpbXBvcnQge3JlZ2lzdHJhdGV9IGZyb20gXCIuLi9FeGVjdXRlclJlZ2lzdHJ5LmpzXCI7XHJcbmltcG9ydCBFeGVjdXRlciBmcm9tIFwiLi4vRXhlY3V0ZXIuanNcIjtcclxuaW1wb3J0IENvZGVDYWNoZSBmcm9tIFwiLi4vQ29kZUNhY2hlLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVhFQ1VURVJOQU1FID0gXCJ3aXRoLXNjb3BlZC1leGVjdXRlclwiO1xyXG5jb25zdCBFWFBSRVNTSU9OX0NBQ0hFID0gbmV3IENvZGVDYWNoZSh7IGFTaXplOiA1MDAwIH0pO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9Db2RlQ2FjaGUuanMnKS5Db2RlQ2FjaGVPcHRpb25zfSBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0dXBFeGVjdXRlciA9IChvcHRpb25zKSA9PiB7XHJcblx0RVhQUkVTU0lPTl9DQUNIRS5zZXR1cChvcHRpb25zKTtcclxufTtcclxuXHJcbmxldCBpbml0aWFsQ2FsbCA9IHRydWU7XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU3RhdGVtZW50IFxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBnZW5lcmF0ZSA9IChhU3RhdGVtZW50KSA9PiB7XHJcbmNvbnN0IGNvZGUgPSBgXHJcblx0cmV0dXJuIChhc3luYyAoY29udGV4dCkgPT4ge1xyXG5cdFx0d2l0aChjb250ZXh0KXtcclxuXHRcdFx0dHJ5eyBcclxuXHRcdFx0XHRyZXR1cm4gJHthU3RhdGVtZW50fVxyXG5cdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0dGhyb3cgZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pKGNvbnRleHQgfHwge30pO1xyXG5gO1xyXG5cdC8vY29uc29sZS5sb2coXCJjb2RlXCIsIGNvZGUpO1xyXG5cclxuXHRyZXR1cm4gbmV3IEZ1bmN0aW9uKFwiY29udGV4dFwiLCBjb2RlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IGFTdGF0ZW1lbnQgXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGdldE9yQ3JlYXRlRnVuY3Rpb24gPSAoYVN0YXRlbWVudCkgPT4ge1xyXG5cdGlmIChFWFBSRVNTSU9OX0NBQ0hFLmhhcyhhU3RhdGVtZW50KSkge1xyXG5cdFx0cmV0dXJuIEVYUFJFU1NJT05fQ0FDSEUuZ2V0KGFTdGF0ZW1lbnQpO1xyXG5cdH1cclxuXHRjb25zdCBleHByZXNzaW9uID0gZ2VuZXJhdGUoYVN0YXRlbWVudCk7XHJcblx0RVhQUkVTU0lPTl9DQUNIRS5zZXQoYVN0YXRlbWVudCwgZXhwcmVzc2lvbik7XHJcblx0cmV0dXJuIGV4cHJlc3Npb247XHJcbn07XHJcblxyXG5cclxuXHJcbmNvbnN0IEVYRUNVVEVSID0gbmV3IEV4ZWN1dGVyKHtkZWZhdWx0Q29udGV4dDoge30sIGV4ZWN1dGlvbjogKGFTdGF0ZW1lbnQsIGFDb250ZXh0KSA9PiB7XHJcblx0XHRpZihpbml0aWFsQ2FsbCl7XHJcblx0XHRcdGluaXRpYWxDYWxsID0gZmFsc2U7XHJcblx0XHRcdGNvbnNvbGUud2FybihuZXcgRXJyb3IoYFdpdGggU2NvcGVkIGV4cHJlc3Npb24gZXhlY3V0aW9uIGlzIG1hcmtlZCBhcyBkZXByZWNhdGVkLmApKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBleHByZXNzaW9uID0gZ2V0T3JDcmVhdGVGdW5jdGlvbihhU3RhdGVtZW50KTtcclxuXHRcdHJldHVybiBleHByZXNzaW9uKGFDb250ZXh0KTtcclxuXHR9fSk7XHJcbnJlZ2lzdHJhdGUoRVhFQ1VURVJOQU1FLCBFWEVDVVRFUik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFWEVDVVRFUjtcclxuIiwiLy9pbXBvcnQgXCIuL0VzcHJpbWFFeGVjdXRlci5qc1wiO1xyXG5pbXBvcnQgXCIuL1dpdGhTY29wZWRFeGVjdXRlci5qc1wiO1xyXG5pbXBvcnQgXCIuL0NvbnRleHRPYmplY3RFeGVjdXRlci5qc1wiO1xyXG5pbXBvcnQgXCIuL0NvbnRleHREZWNvbnN0cnVjdG9yRXhlY3V0ZXIuanNcIjsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHMvVXRpbHNcIjtcclxuXHJcblV0aWxzLmdsb2JhbC5kZWZhdWx0anMgPSBVdGlscy5nbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5VdGlscy5nbG9iYWwuZGVmYXVsdGpzLmV4dGRvbSA9IFV0aWxzLmdsb2JhbC5kZWZhdWx0anMuZXh0ZG9tIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0dXRpbHMgOiB7XHJcblx0XHRVdGlsczogVXRpbHNcclxuXHR9XHJcbn07XHJcblxyXG5VdGlscy5nbG9iYWwuZmluZCA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBkb2N1bWVudC5maW5kLmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIGRvY3VtZW50LnJlYWR5LmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLmNyZWF0ZSA9IGZ1bmN0aW9uKGFDb250ZW50LCBhc1RlbXBsYXRlKSB7XHJcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gIT09IFwic3RyaW5nXCIpXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZyFcIik7XHJcblx0XHJcblx0Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcblx0dGVtcGxhdGUuaW5uZXJIVE1MID0gYUNvbnRlbnQ7XHJcblx0aWYoYXNUZW1wbGF0ZSlcclxuXHRcdHJldHVybiB0ZW1wbGF0ZTtcclxuXHRcclxuXHRyZXR1cm4gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0cnVlKS5jaGlsZE5vZGVzO1xyXG59O1xyXG5cclxuVXRpbHMuZ2xvYmFsLnNjcmlwdCA9IGZ1bmN0aW9uKGFGaWxlLCBhVGFyZ2V0KSB7XHJcblx0aWYoYUZpbGUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChhRmlsZS5tYXAoZmlsZSA9PiBVdGlscy5nbG9iYWwuc2NyaXB0KGZpbGUsIGFUYXJnZXQpKSk7XHJcblx0XHJcblx0aWYodHlwZW9mIGFGaWxlID09PSBcInN0cmluZ1wiKVx0XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHIsZSkgPT4ge1xyXG5cdFx0XHRjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG5cdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG5cdFx0XHRzY3JpcHQub25sb2FkID0gZnVuY3Rpb24oKXtyKCl9O1xyXG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwibG9hZCBlcnJvciFcIil9O1xyXG5cdFx0XHQhYVRhcmdldCA/IGRvY3VtZW50LmJvZHkuYXBwZW5kKHNjcmlwdCkgOiBhVGFyZ2V0LmFwcGVuZChzY3JpcHQpO1xyXG5cdFx0XHRzY3JpcHQuc3JjID0gYUZpbGU7XHJcblx0XHR9KTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJGaXJzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nIVwiKTtcclxufTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgUmVhZHlFdmVudFN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9SZWFkeUV2ZW50U3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50LCBRdWVyeVN1cHBvcnQsIFJlYWR5RXZlbnRTdXBwb3J0KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvY3VtZW50LnRyaWdnZXIoXCJyZWFkeVwiKSk7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBNYW5pcHVsYXRpb25TdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTWFuaXB1bGF0aW9uU3VwcG9ydFwiO1xyXG5cclxuZXh0ZW5kUHJvdG90eXBlKERvY3VtZW50RnJhZ21lbnQsIFF1ZXJ5U3VwcG9ydCwgTWFuaXB1bGF0aW9uU3VwcG9ydCk7XHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFF1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgQXR0cmlidXRlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0F0dHJpYnV0ZVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRWxlbWVudCxRdWVyeVN1cHBvcnQsIEF0dHJpYnV0ZVN1cHBvcnQsIE1hbmlwdWxhdGlvblN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xuaW1wb3J0IEV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0V2ZW50U3VwcG9ydFwiO1xuXG5leHRlbmRQcm90b3R5cGUoRXZlbnRUYXJnZXQsIEV2ZW50U3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBIdG1sQ2xhc3NTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvSHRtbENsYXNzU3VwcG9ydFwiO1xyXG5pbXBvcnQgU2hvd0hpZGVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxFbGVtZW50LCBIdG1sQ2xhc3NTdXBwb3J0LCBTaG93SGlkZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgVmFsdWVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvVmFsdWVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxJbnB1dEVsZW1lbnQsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MU2VsZWN0RWxlbWVudCxWYWx1ZVN1cHBvcnQpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxUZXh0QXJlYUVsZW1lbnQsRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMudmFsdWUgPSBhcmd1bWVudHNbMF1cclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pKTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MQ29sbGVjdGlvbiwgTGlzdFN1cHBvcnQpO1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHRIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuSFRNTENvbGxlY3Rpb24uZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXHJcblx0XHRcdFx0ZGF0YVtjb3VudGVyKytdID0ge3ZhbHVlOiBhcmcsIGVudW1lcmFibGU6IHRydWV9O1xyXG5cdFx0XHRlbHNlIGlmKGFyZyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IGFyZyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGFyZyBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJnLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmKGFyZ1tpXSAmJiBhcmdbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XHJcblx0XHRcdFx0XHRcdGRhdGFbY291bnRlcisrXSA9IHt2YWx1ZTogYXJnW2ldLCBlbnVtZXJhYmxlOiB0cnVlfTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0ZGF0YS5sZW5ndGggPSB7dmFsdWU6IGNvdW50ZXJ9O1xyXG5cdHJldHVybiAgT2JqZWN0LmNyZWF0ZShIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUsIGRhdGEpO1xyXG59O1xyXG5cclxuXHJcbkRlbGVnYXRlckJ1aWxkZXIoZnVuY3Rpb24oYUZ1bmN0aW9uTmFtZSwgdGhlQXJndW1lbnRzKSB7XHJcblx0bGV0IHJlc3VsdHMgPSBbXTtcdFxyXG5cdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdGlmKG5vZGUgJiYgdHlwZW9mIG5vZGVbYUZ1bmN0aW9uTmFtZV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGxldCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHJlc3VsdHNbMF0gaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbilcclxuXHRcdHJldHVybiBIVE1MQ29sbGVjdGlvbi5mcm9tLmFwcGx5KG51bGwsIHJlc3VsdHMpO1xyXG5cdGVsc2VcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG59LEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG4iLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERhdGFTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRGF0YVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZSxEYXRhU3VwcG9ydCxNYW5pcHVsYXRpb25TdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERlbGVnYXRlckJ1aWxkZXIgZnJvbSBcIi4uL3V0aWxzL0RlbGVnYXRlckJ1aWxkZXJcIjtcclxuaW1wb3J0IExpc3RTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTGlzdFN1cHBvcnRcIjtcclxuXHJcbmV4dGVuZFByb3RvdHlwZShOb2RlTGlzdCwgTGlzdFN1cHBvcnQpO1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgY2FsbGluZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBpc0Z1bmN0aW9uID0gdHlwZW9mIGNhbGxpbmcgPT09IFwiZnVuY3Rpb25cIjtcclxuXHRjb25zdCByZXN1bHRzID0gW107XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXNbaV07XHJcblx0XHRsZXRcdHJlc3VsdDtcclxuXHRcdGlmKGlzRnVuY3Rpb24pXHJcblx0XHRcdHJlc3VsdCA9IGNhbGxpbmcuYXBwbHkoW25vZGVdLmNvbmNhdChhcmdzKSk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBub2RlW2NhbGxpbmddID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJlc3VsdCA9IG5vZGVbY2FsbGluZ10uYXBwbHkobm9kZSwgYXJncyk7XHJcblx0XHRcclxuXHRcdGlmKHJlc3VsdClcclxuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59O1xyXG5cclxuTm9kZUxpc3QucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHRpZih0eXBlb2Ygbm9kZS52YWwgPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG5vZGUudmFsKCk7XHJcblx0XHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnNldCgobm9kZS5uYW1lIHx8IG5vZGUuaWQgfHwgbm9kZS5zZWxlY3RvcigpKSwgbm9kZS52YWwoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlXHJcblx0XHROb2RlTGlzdC5wcm90b3R5cGUuYXBwbHlUby5hcHBseSh0aGlzLCBbXCJ2YWxcIl0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpO1xyXG59O1xyXG5cclxuTm9kZUxpc3QuZnJvbSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBkYXRhID0ge307XHJcblx0bGV0IGNvdW50ZXIgPSAwO1xyXG5cdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRpZih0eXBlb2YgYXJnICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZyAhPSBudWxsKXtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZywgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdGVsc2UgaWYoYXJnIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgYXJnIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgYXJnIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYoYXJnW2ldICYmIGFyZ1tpXSBpbnN0YW5jZW9mIE5vZGUpe1xyXG5cdFx0XHRcdFx0XHRkYXRhW2NvdW50ZXIrK10gPSB7dmFsdWU6IGFyZ1tpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGRhdGEubGVuZ3RoID0ge3ZhbHVlOiBjb3VudGVyfTtcclxuXHRyZXR1cm4gIE9iamVjdC5jcmVhdGUoTm9kZUxpc3QucHJvdG90eXBlLCBkYXRhKTtcclxufTtcclxuXHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cykge1xyXG5cdGxldCByZXN1bHRzID0gW107XHRcclxuXHR0aGlzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRpZihub2RlICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBub2RlW2FGdW5jdGlvbk5hbWVdLmFwcGx5KG5vZGUsIHRoZUFyZ3VtZW50cyk7XHJcblx0XHRcdGlmKHJlc3VsdCl7IFxyXG5cdFx0XHRcdGlmKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KEFycmF5LmZyb20ocmVzdWx0KSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0aWYocmVzdWx0cy5sZW5ndGggPT09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGUgfHwgcmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0cyk7XHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuIHJlc3VsdHM7XHJcbn0sTm9kZUxpc3QucHJvdG90eXBlLCBOb2RlLnByb3RvdHlwZSwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZSwgRWxlbWVudC5wcm90b3R5cGUsIEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XHJcbiIsImltcG9ydCBFeHRlbmRlciBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0ZW5kZXJcIjtcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkF0dHJpYnV0ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcclxuXHRQcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlcygpID8gKCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRcdFx0XHR0aGlzLmdldEF0dHJpYnV0ZU5hbWVzKCkuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH0pKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXJndW1lbnRzWzBdKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkRhdGFTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB7fTtcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5kYXRhc2V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRmb3IgKG5hbWUgaW4gdGhpcy5kYXRhc2V0KVxyXG5cdFx0XHRcdGRhdGFbbmFtZV0gPSB0aGlzLmRhdGFzZXRbbmFtZV07XHJcblxyXG5cdFx0dGhpcy5kYXRhID0gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGFbYXJndW1lbnRzWzBdXTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhcmd1bWVudHNbMV0gPT0gbnVsbClcclxuXHRcdFx0XHRkZWxldGUgZGF0YVthcmd1bWVudHNbMF1dO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0ZGF0YVthcmd1bWVudHNbMF1dID0gYXJndW1lbnRzWzFdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9KS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRhdGEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDA7XHJcbmNvbnN0IHN1cHBvcnQgPSBFeHRlbmRlcihcIkV2ZW50U3VwcG9ydFwiLCAoUHJvdG90eXBlKSA9PiB7XHJcblx0Y29uc3QgRVZFTlRTUExJVEVSID0gLyhcXHMrKXwoXFxzKixcXHMqKS87XHJcblx0Y29uc3QgZ2V0V3JhcHBlckhhbmRsZU1hcCA9IChlbGVtZW50KSA9PiB7XHJcblx0XHRpZiAoIWVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18pIGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX18gPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQuX193cmFwcGVyaGFuZGxlbWFwX187XHJcblx0fTtcclxuXHJcblx0Y29uc3QgZ2V0VHJpZ2dlclRpbWVvdXRzID0gKGVsZW1lbnQpID0+IHtcclxuXHRcdGlmICghZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXykgZWxlbWVudC5fX19FVkVOVFRSSUdHRVJUSU1FT1VUU19fXyA9IHt9O1xyXG5cclxuXHRcdHJldHVybiBlbGVtZW50Ll9fX0VWRU5UVFJJR0dFUlRJTUVPVVRTX19fO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlbW92ZVdyYXBwZXIgPSAoZWxlbWVudCwgZGF0YSwgZXZlbnRUeXBlcykgPT4ge1xyXG5cdFx0Y29uc3QgeyB3cmFwcGVyLCBvcHRpb24sIGV2ZW50cywgaGFuZGxlIH0gPSBkYXRhO1xyXG5cdFx0Y29uc3QgY2FwdHVyZSA9IG9wdGlvbi5jYXB0dXJlO1xyXG5cdFx0aWYgKGV2ZW50VHlwZXMpIHtcclxuXHRcdFx0ZXZlbnRUeXBlcyA9IHR5cGVvZiBldmVudFR5cGVzID09PSBcInN0cmluZ1wiID8gZXZlbnRUeXBlcy5zcGxpdChFVkVOVFNQTElURVIpIDogZXZlbnRUeXBlcztcclxuXHRcdFx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRUeXBlcykge1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gZXZlbnRzLmluZGV4T2YoZXZlbnQpO1xyXG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIGNhcHR1cmUpO1xyXG5cdFx0XHRcdFx0ZXZlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChldmVudHMubGVuZ3RoID09IDApIGdldFdyYXBwZXJIYW5kbGVNYXAoZWxlbWVudCkuZGVsZXRlKGhhbmRsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgd3JhcHBlciwgY2FwdHVyZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Z2V0V3JhcHBlckhhbmRsZU1hcChlbGVtZW50KS5kZWxldGUoaGFuZGxlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHRocm93IG5ldyBFcnJvcihcIlRvbyBsZXNzIGFyZ3VtZW50cyFcIik7XHJcblxyXG5cdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBldmVudHMgPSB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKS5zcGxpdChFVkVOVFNQTElURVIpIDogYXJncy5zaGlmdCgpO1xyXG5cdFx0Y29uc3QgZmlsdGVyID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIgPyBhcmdzLnNoaWZ0KCkgOiBudWxsO1xyXG5cdFx0Y29uc3QgaGFuZGxlID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0Y29uc3Qgb3B0aW9uID0gdHlwZW9mIGFyZ3NbMF0gPT09IFwidW5kZWZpbmVkXCIgPyB7IGNhcHR1cmU6IGZhbHNlLCBvbmNlOiBmYWxzZSwgcGFzc2l2ZTogZmFsc2UgfSA6IHR5cGVvZiBhcmdzWzBdID09PSBcImJvb2xlYW5cIiA/IHsgY2FwdHVyZTogYXJncy5zaGlmdCgpLCBvbmNlOiBmYWxzZSwgcGFzc2l2ZTogZmFsc2UgfSA6IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGNvbnN0IHdyYXBwZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGZpbHRlcikge1xyXG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldC5pcyA9PT0gXCJmdW5jdGlvblwiICYmICF0YXJnZXQuaXMoZmlsdGVyKSkgcmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGhhbmRsZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRpZiAob3B0aW9uLm9uY2UpIHJlbW92ZVdyYXBwZXIodGhpcywgd3JhcHBlcik7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdGdldFdyYXBwZXJIYW5kbGVNYXAodGhpcykuc2V0KGhhbmRsZSwgeyBoYW5kbGUsIHdyYXBwZXI6IHdyYXBwZXIsIGV2ZW50cywgb3B0aW9uIH0pO1xyXG5cclxuXHRcdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZXIsIG9wdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnJlbW92ZU9uID0gZnVuY3Rpb24gKGhhbmRsZSwgZXZlbnQsIGNhcHR1cmUpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBnZXRXcmFwcGVySGFuZGxlTWFwKHRoaXMpLmdldChoYW5kbGUpO1xyXG5cdFx0aWYgKGRhdGEpIHJlbW92ZVdyYXBwZXIodGhpcywgZGF0YSwgZXZlbnQpO1xyXG5cdFx0ZWxzZSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlLCBldmVudCwgY2FwdHVyZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdFx0Y29uc3QgdGltZW91dCA9IHR5cGVvZiBhcmdzWzBdID09PSBcIm51bWJlclwiID8gYXJncy5zaGlmdCgpIDogLTE7XHJcblx0XHRpZiAodGltZW91dCA+PSAwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSBhcmdzWzBdO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0cyA9IGdldFRyaWdnZXJUaW1lb3V0cyh0aGlzKTtcclxuXHRcdFx0Y29uc3QgdGltZW91dGlkID0gdGltZW91dHNbdHlwZV07XHJcblx0XHRcdGlmICh0aW1lb3V0aWQpIGNsZWFyVGltZW91dCh0aW1lb3V0aWQpO1xyXG5cclxuXHRcdFx0dGltZW91dHNbdHlwZV0gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRkZWxldGUgdGltZW91dHNbdHlwZV07XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdGNvbnN0IGRlbGVnYXRlID0gYXJnc1swXSBpbnN0YW5jZW9mIEV2ZW50ID8gYXJncy5zaGlmdCgpIDogbnVsbDtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IGFyZ3MubGVuZ3RoID49IDEgPyAoYXJncy5sZW5ndGggPT0gMSA/IGFyZ3Muc2hpZnQoKSA6IGFyZ3MpIDogZGVsZWdhdGU7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gZGF0YSA/IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlLCBkZXRhaWw6IGRhdGEgfSkgOiBuZXcgRXZlbnQodHlwZSwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcclxuXHJcblx0XHRcdGlmIChkZWxlZ2F0ZSkgZXZlbnQuZGVsZWdhdGVkRXZlbnQgPSBkZWxlZ2F0ZTtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJIdG1sQ2xhc3NTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LmFkZChjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGF6eikpO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcmd1bWVudHMsIGNsYXp6ID0+IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGF6eikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcdFx0XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0YXJndW1lbnRzWzBdLnNwbGl0KC9cXHMrLykuZm9yRWFjaChjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC50b2dnbGUoY2xhenopKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBjbGF6eiA9PiB0aGlzLmNsYXNzTGlzdC50b2dnbGUoY2xhenopKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiTGlzdFN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFx0XHJcblx0UHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbigpIHtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRpZih0aGlzW2ldID09IGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5hcHBseShBcnJheS5mcm9tKHRoaXMpLCBhcmd1bWVudHMpO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApXHJcblx0XHRcdHJldHVybiB0aGlzWzBdO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmxlbmd0aCA+IDApXHJcblx0XHRcdHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XHJcblx0fTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzL1V0aWxzXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJNYW5pcHVsYXRpb25TdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHRcclxuXHRQcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpe1xyXG5cdFx0bGV0IG5vZGVzID0gdGhpcy5jaGlsZE5vZGVzXHJcblx0XHR3aGlsZShub2Rlcy5sZW5ndGggIT0gMClcdFx0XHRcclxuXHRcdFx0bm9kZXNbMF0ucmVtb3ZlKHRydWUpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkTm9kZXM7XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdGlmKGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUw7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XHJcblx0XHRlbHNlIFxyXG5cdFx0XHRBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuXHRcdFx0XHR0aGlzLmVtcHR5KCk7XHJcblx0XHRcdFx0aWYodHlwZW9mIGNvbnRlbnQgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRlbHNlIGlmKGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlIHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb250ZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pe1xyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcdFx0XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRjb25zdCBhcHBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3QgYXBwZW5kID0gUHJvdG90eXBlLmFwcGVuZENoaWxkLmJpbmQodGhpcyk7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGFyZyk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRjcmVhdGUoYXJnKS5mb3JFYWNoKGFwcGVuZCk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goYXBwZW5kKTtcclxuXHRcdH1cclxuXHR9O1x0XHJcblx0UHJvdG90eXBlLmFwcGVuZCA9IGFwcGVuZDtcclxuXHRcclxuXHRjb25zdCBwcmVwZW5kID0gZnVuY3Rpb24oYUZpcnN0RWxlbWVudCwgYUVsZW1lbnQpe1xyXG5cdFx0dGhpcy5pbnNlcnRCZWZvcmUoYUVsZW1lbnQsIGFGaXJzdEVsZW1lbnQpO1xyXG5cdH07XHJcblx0UHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRhcHBlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCBmaXJzdCA9IHRoaXMuY2hpbGROb2Rlcy5maXJzdCgpO1xyXG5cdFx0XHRjb25zdCBpbnNlcnQgPSBwcmVwZW5kLmJpbmQodGhpcywgZmlyc3QpO1xyXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRjb25zdCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdFx0aWYoYXJnIGluc3RhbmNlb2YgTm9kZSlcclxuXHRcdFx0XHRcdGluc2VydChhcmcpO1xyXG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydCk7XHJcblx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgYXJnLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRcdGFyZy5mb3JFYWNoKGluc2VydCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPCAxKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnN1ZmZpY2llbnQgYXJndW1lbnRzISBPbmUgb3IgdHdvIG5vZGVzIHJlcXVpcmVkIVwiKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gdGhpcy5wYXJlbnROb2RlIDogdGhpcztcclxuXHRcdGNvbnN0IG9sZE5vZGUgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyB0aGlzIDogYXJndW1lbnRzWzBdO1xyXG5cdFx0Y29uc3QgbmV3Tm9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50c1sxXTtcclxuXHRcdFxyXG5cdFx0aWYobmV3Tm9kZSBpbnN0YW5jZW9mIEFycmF5IHx8IG5ld05vZGUgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBuZXdOb2RlIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pe1xyXG5cdFx0XHRuZXdOb2RlLmZvckVhY2goYUl0ZW0gPT4gcGFyZW50Lmluc2VydEJlZm9yZShhSXRlbSwgb2xkTm9kZSkpO1xyXG5cdFx0XHRvbGROb2RlLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRwYXJlbnQucmVwbGFjZUNoaWxkKG5ld05vZGUsb2xkTm9kZSk7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5wYXJlbnROb2RlID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluc2VydCBub2RlcyBhZnRlciB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRjb25zdCBuZXh0ID0gdGhpcy5uZXh0U2libGluZztcclxuXHRcdGlmKG5leHQpXHJcblx0XHRcdFByb3RvdHlwZS5iZWZvcmUuYXBwbHkobmV4dCwgYXJndW1lbnRzKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0UHJvdG90eXBlLmFwcGVuZC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cyk7XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5wYXJlbnROb2RlID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluc2VydCBub2RlcyBhZnRlciB0aGlzIG5vZGUhIFBhcmVudCBub2RlIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRjb25zdCBpbnNlcnRlciA9IChub2RlKSA9PiB7cGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB0aGlzKTt9XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0Y29uc3QgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cdFx0XHRpZihhcmcgaW5zdGFuY2VvZiBOb2RlKVxyXG5cdFx0XHRcdGluc2VydGVyKGFyZyk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRhcmcuZm9yRWFjaChpbnNlcnRlcik7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0YXJnLmZvckVhY2goaW5zZXJ0ZXIpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuLy9jb25zdCBwYXJlbnRTZWxlY3RvciA9IC86cGFyZW50KFxcKFxccypcIj9cXHMqKFteXFwpXCJdKilcXHMqXCI/XFxzKlxcKSk/L2k7XHJcbmNvbnN0IHBhcmVudFNlbGVjdG9yID0gLzpwYXJlbnQoXFwoXFxzKiguKilcXHMqXFwpKT8vaTtcclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJxdWVyeSBcclxuICovXHJcbmNvbnN0IGNsZWFudXBTdWJTZWxlY3RvciA9IChzdWJxdWVyeSkgPT4ge1xyXG5cdGlmKHR5cGVvZiBzdWJxdWVyeSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XHJcblx0c3VicXVlcnkgPSBzdWJxdWVyeS50cmltKCk7XHJcblx0aWYoKHN1YnF1ZXJ5LnN0YXJ0c1dpdGgoJ1wiJykgJiYgc3VicXVlcnkuZW5kc1dpdGgoJ1wiJykpXHJcblx0XHR8fCAoc3VicXVlcnkuc3RhcnRzV2l0aChcIidcIikgJiYgc3VicXVlcnkuZW5kc1dpdGgoXCInXCIpKSlcclxuXHRcdHN1YnF1ZXJ5ID0gc3VicXVlcnkuc3Vic3RyaW5nKDEsIHN1YnF1ZXJ5Lmxlbmd0aCAtMSk7XHJcblx0cmV0dXJuIHN1YnF1ZXJ5LnRyaW0oKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYUVsZW1lbnQgXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhU2VsZWN0b3IgXHJcbiAqIEByZXR1cm5zIHtOb2RlTGlzdH1cclxuICovXHJcbmNvbnN0IHF1ZXJ5RXhlY3V0ZXIgPSBmdW5jdGlvbiAoYUVsZW1lbnQsIGFTZWxlY3Rvcikge1xyXG5cdGxldCBtYXRjaCA9IHBhcmVudFNlbGVjdG9yLmV4ZWMoYVNlbGVjdG9yKTtcclxuXHRpZiAobWF0Y2gpIHtcclxuXHRcdGxldCByZXN1bHQgPSBhRWxlbWVudDtcclxuXHRcdGlmIChtYXRjaC5pbmRleCA+IDApIHtcclxuXHRcdFx0cmVzdWx0ID0gYUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChhU2VsZWN0b3Iuc3Vic3RyKDAsIG1hdGNoLmluZGV4KSk7XHJcblx0XHRcdGlmIChyZXN1bHQubGVuZ3RoID09IDApIHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQoY2xlYW51cFN1YlNlbGVjdG9yKG1hdGNoWzJdKSk7XHJcblx0XHRpZiAocmVzdWx0KSB7XHJcblx0XHRcdGxldCBuZXh0U2VsZWN0b3IgPSBhU2VsZWN0b3Iuc3Vic3RyKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKS50cmltKCk7XHJcblx0XHRcdGlmIChuZXh0U2VsZWN0b3IubGVuZ3RoID4gMCkgcmVzdWx0ID0gcmVzdWx0LmZpbmQobmV4dFNlbGVjdG9yKTtcclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0fSBlbHNlIHJldHVybiBhRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvcik7XHJcbn07XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJRdWVyeVN1cHBvcnRcIiwgKFByb3RvdHlwZSkgPT4ge1xyXG5cdFByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0bGV0IG5vZGVzID0gW107XHJcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHR3aGlsZSAoYXJnKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0bGV0IHJlc3VsdCA9IHF1ZXJ5RXhlY3V0ZXIodGhpcywgYXJnKTtcclxuXHRcdFx0XHRpZiAocmVzdWx0KSBub2Rlcy5wdXNoKHJlc3VsdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmVzdWx0ID0gTm9kZUxpc3QuZnJvbS5hcHBseShudWxsLCBub2Rlcyk7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgdGhpcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHJldHVybiBmYWxzZTtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRoaXMubWF0Y2hlcyhhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRcdGxldCBmaWx0ZXIgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspIGlmICh0aGlzLm1hdGNoZXMoZmlsdGVyW2ldKSkgcmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHJldHVybiB0aGlzLmlzKEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpIHtcclxuXHRcdGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm4gbnVsbDtcclxuXHRcdGlnbm9yZVNoYWRvd1Jvb3QgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiYm9vbGVhblwiID8gc2VsZWN0b3IgOiBpZ25vcmVTaGFkb3dSb290O1xyXG5cdFx0c2VsZWN0b3IgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgPyBzZWxlY3RvciA6IG51bGw7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290ICYmIGlnbm9yZVNoYWRvd1Jvb3QpIHBhcmVudCA9IHBhcmVudC5ob3N0O1xyXG5cclxuXHRcdGlmIChzZWxlY3Rvcikge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgIXBhcmVudC5pcyhzZWxlY3RvcikpIHBhcmVudCA9IHBhcmVudC5wYXJlbnQoc2VsZWN0b3IsIGlnbm9yZVNoYWRvd1Jvb3QpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcInRoaXM6XCIsIHRoaXMsIFwicGFyZW50OlwiLCBwYXJlbnQsIFwiZXJyb3I6XCIsIGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5wYXJlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0bGV0IHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdFx0cmVzdWx0LnB1c2gocGFyZW50KTtcclxuXHRcdFx0cGFyZW50ID0gUHJvdG90eXBlLnBhcmVudC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE5vZGVMaXN0LmZyb20ocmVzdWx0KTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuc2VsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50IHx8IHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5pZCkgcmV0dXJuIFwiI1wiICsgdGhpcy5pZDtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgc2VsZWN0b3IgPSB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50KCk7XHJcblx0XHRcdGlmIChwYXJlbnQpIHtcclxuXHRcdFx0XHRsZXQgc2FtZVRhZ1NpYmxpbmdzID0gcGFyZW50LmZpbmQoXCI6c2NvcGU+XCIgKyBzZWxlY3Rvcik7XHJcblx0XHRcdFx0aWYgKHNhbWVUYWdTaWJsaW5ncyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XHJcblx0XHRcdFx0XHRsZXQgaW5kZXggPSBzYW1lVGFnU2libGluZ3MuaW5kZXhPZih0aGlzKTtcclxuXHRcdFx0XHRcdGlmIChpbmRleCA+IDApIHNlbGVjdG9yICs9IFwiOm50aC1jaGlsZChcIiArIChpbmRleCArIDEpICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBwYXJlbnRTZWxlY3RvciA9IHBhcmVudC5zZWxlY3RvcigpO1xyXG5cdFx0XHRcdHJldHVybiBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgXCI+XCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzZWxlY3RvcjtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb3Nlc3RzKGFRdWVyeSkuZmlyc3QoKTtcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUuY2xvc2VzdHMgPSBmdW5jdGlvbiAoYVF1ZXJ5KSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChyZXN1bHQubGVuZ3RoICE9IDApIHJldHVybiByZXN1bHQ7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuXHRcdGlmIChwYXJlbnQpIHJldHVybiBwYXJlbnQuY2xvc2VzdHMoYVF1ZXJ5KTtcclxuXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShbXSk7XHJcblx0fTtcclxuXHJcblx0UHJvdG90eXBlLm5lc3RlZCA9IGZ1bmN0aW9uIChhUXVlcnkpIHtcclxuXHRcdGlmICh0aGlzLmlzKGFRdWVyeSkpIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMpO1xyXG5cclxuXHRcdGxldCBuZXN0ZWQgPSB0aGlzLmZpbmQoYVF1ZXJ5KTtcclxuXHRcdGlmIChuZXN0ZWQgJiYgbmVzdGVkLmxlbmd0aCA+IDApIHJldHVybiBuZXN0ZWQ7XHJcblx0XHRlbHNlIHJldHVybiBOb2RlTGlzdC5mcm9tKHRoaXMucGFyZW50KGFRdWVyeSkpO1xyXG5cdH07XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0O1xyXG4iLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJSZWFkeUV2ZW50U3VwcG9ydFwiLCBQcm90b3R5cGUgPT4ge1xyXG5cdFByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGFGdW5jdGlvbiwgb25jZSl7XHRcclxuXHRcdHRoaXMub24oXCJyZWFkeVwiLCBhRnVuY3Rpb24sIG9uY2UpO1xyXG5cdFx0aWYoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpXHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcInJlYWR5XCIpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgRXh0ZW5kZXIgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dGVuZGVyXCI7XHJcblxyXG5jb25zdCBISURFVkFMVUUgPSBcIm5vbmVcIjtcclxuXHJcbmNvbnN0IGlzSGlkZGVuID0gKGVsZW1lbnQpID0+IHtcclxuXHRyZXR1cm4gZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSBISURFVkFMVUVcclxufTtcclxuXHJcbmNvbnN0IGluaXQgPSAoZWxlbWVudCkgPT4ge1x0XHJcblx0bGV0IGRpc3BsYXkgPSAhaXNIaWRkZW4oZWxlbWVudCkgPyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgOiBcIlwiO1xyXG5cdFxyXG5cdGVsZW1lbnQuc2hvdyA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdHJldHVybiB0aGlzO1x0XHRcclxuXHR9KS5iaW5kKGVsZW1lbnQpO1xyXG5cdFxyXG5cdGVsZW1lbnQuaGlkZSA9IChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gSElERVZBTFVFO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH0pLmJpbmQoZWxlbWVudCk7XHJcblx0XHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IEV4dGVuZGVyKFwiU2hvd0hpZGVTdXBwb3J0XCIsIFByb3RvdHlwZSA9PiB7XHJcblx0UHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBpbml0KHRoaXMpLnNob3cuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG5cdH07XHJcblxyXG5cdFByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaW5pdCh0aGlzKS5oaWRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuXHR9O1xyXG5cclxuXHRQcm90b3R5cGUudG9nZ2xlU2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGlzSGlkZGVuKHRoaXMpID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcclxuXHR9O1xyXG5cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IEV4dGVuZGVyIGZyb20gXCIuLi8uLi91dGlscy9FeHRlbmRlclwiO1xyXG5cclxuY29uc3QgSW5wdXRUeXBlcyA9IFtcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwic2VsZWN0XCIsXHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRpZihvcHRpb24uc2VsZWN0ZWQpXHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbigpe1x0XHRcdFx0XHJcblx0XHRcdGxldCB2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdFx0bGV0IGFyZyA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0d2hpbGUoYXJnKXtcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGFyZykpXHJcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGFyZyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goYXJnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhcmcgPSBhcmdzLnNoaWZ0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlcztcclxuXHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIpLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlcy5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMCk7XHRcdFx0XHJcblx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHR9XHRcdFx0XHJcblx0fSxcclxuXHR7XHJcblx0XHRzZWxlY3RvciA6IFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXVwiLFxyXG5cdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYodGhpcy52YWx1ZSA9PSBcIm9uXCIgfHwgdGhpcy52YWx1ZSA9PSBcIm9mZlwiKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNoZWNrZWQ7XHJcblx0XHRcdGVsc2UgaWYodGhpcy5jaGVja2VkKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1x0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0c2V0IDogZnVuY3Rpb24oYVZhbHVlKXtcclxuXHRcdFx0aWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gYVZhbHVlO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGVvZiBhVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdGhpcy52YWx1ZSA9PSBhVmFsdWU7XHJcblx0XHRcdGVsc2UgaWYoQXJyYXkuaXNBcnJheShhVmFsdWUpKVxyXG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGFWYWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID49IDA7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXTtcclxuXHJcbmNvbnN0IERlZmF1bHRJbnB1dFR5cGUgPSB7XHJcblx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcclxuXHRcdH0sXHJcblx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gYVZhbHVlO1xyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuXHRcdH1cdFxyXG59O1xyXG5cclxuY29uc3QgZ2V0SW5wdXRUeXBlID0gZnVuY3Rpb24oYUVsZW1lbnQpe1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBJbnB1dFR5cGVzLmxlbmd0aDsgaSsrKVxyXG5cdFx0aWYoYUVsZW1lbnQuaXMoSW5wdXRUeXBlc1tpXS5zZWxlY3RvcikpXHJcblx0XHRcdHJldHVybiBJbnB1dFR5cGVzW2ldO1x0XHRcclxuXHRyZXR1cm4gRGVmYXVsdElucHV0VHlwZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gRXh0ZW5kZXIoXCJWYWx1ZVN1cHBvcnRcIiwgUHJvdG90eXBlID0+IHtcdFxyXG5cdFByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCB0eXBlID0gZ2V0SW5wdXRUeXBlKHRoaXMpO1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdHlwZS5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dHlwZS5zZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBcIi4vZG9tL0V2ZW50VGFyZ2V0XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVcIjtcclxuaW1wb3J0IFwiLi9kb20vRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudEZyYWdtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxJbnB1dEVsZW1lbnRcIjtcclxuaW1wb3J0IFwiLi9kb20vSFRNTFRleHRBcmVhRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MU2VsZWN0RWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9Ob2RlTGlzdFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IdG1sQ29sbGVjdGlvblwiO1xyXG5pbXBvcnQgXCIuL0dsb2JhbFwiO1xyXG4iLCJjb25zdCBEZWxlZ2F0ZXJCdWlsZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRjb25zdCBjYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcclxuXHRjb25zdCBzb3VyY2UgPSBhcmdzLnNoaWZ0KCk7XHJcblx0YXJncy5mb3JFYWNoKCB0YXJnZXQgPT57XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXHJcblx0XHQuZm9yRWFjaChuYW1lID0+IHtcclxuXHRcdFx0Y29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBuYW1lKTtcclxuXHRcdFx0aWYgKHR5cGVvZiBzb3VyY2VbbmFtZV0gPT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHByb3AudmFsdWUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRzb3VyY2VbbmFtZV0gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgbmFtZSwgYXJndW1lbnRzKTtcclxuXHRcdFx0XHR9O1x0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgRGVsZWdhdGVyQnVpbGRlcjsiLCJjb25zdCBleHRlbmRQcm90b3R5cGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XHJcblx0Y29uc3QgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcdFxyXG5cdHdoaWxlKGFyZ3MubGVuZ3RoID4gMCl7XHJcblx0XHRjb25zdCBleHRlbmRlciA9IGFyZ3Muc2hpZnQoKTtcclxuXHRcdGV4dGVuZGVyKHR5cGUpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4dGVuZFByb3RvdHlwZTsiLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IEVYVEVOU0lPTlNfTUFQID0gVXRpbHMuZ2xvYmFsVmFyKFwiX19fRE9NX0FQSV9FWFRFTlNJT05fTUFQX19fXCIsIHt9KTtcclxuY29uc3QgRXh0ZW5kZXIgPSBmdW5jdGlvbihhTmFtZSwgYUV4dGVudGlvbil7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKGFUeXBlKXtcdFxyXG5cdFx0bGV0IGV4dGVuc2lvbnMgPSBFWFRFTlNJT05TX01BUFthVHlwZS5uYW1lXTtcclxuXHRcdGlmKCFleHRlbnNpb25zKVxyXG5cdFx0XHRleHRlbnNpb25zID0gRVhURU5TSU9OU19NQVBbYVR5cGUubmFtZV0gPSB7fTtcdFx0XHJcblx0XHRcclxuXHRcdGlmKCFleHRlbnNpb25zW2FOYW1lXSl7XHJcblx0XHRcdGV4dGVuc2lvbnNbYU5hbWVdID0gdHJ1ZTtcclxuXHRcdFx0YUV4dGVudGlvbihhVHlwZS5wcm90b3R5cGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJkdXBsaWNhdGVkIGxvYWQgb2YgZXh0ZW5zaW9uIFxcXCJcIiArIGFOYW1lICsgXCJcXFwiIVwiKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHRlbmRlcjsiLCJjb25zdCBVdGlscyA9IHtcclxuXHRnbG9iYWwgOiAoKCkgPT4ge1xyXG5cdFx0aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHdpbmRvdztcclxuXHRcdGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWw7XHJcblx0XHRpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHNlbGY7XHJcblx0XHRyZXR1cm4ge307XHRcdFxyXG5cdH0pKCksXHJcblx0Z2xvYmFsVmFyIDogZnVuY3Rpb24oYU5hbWUsIGFJbml0VmFsdWUpe1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgVXRpbHMuZ2xvYmFsW2FOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0VXRpbHMuZ2xvYmFsW2FOYW1lXSA9IGFJbml0VmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiBVdGlscy5nbG9iYWxbYU5hbWVdO1x0XHRcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiLCJpbXBvcnQgQ29tcG9uZW50ICwge2NvbXBvbmVudEJhc2VPZiwgY3JlYXRlVVVJRH0gZnJvbSBcIi4vc3JjL0NvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHtkZWZpbmV9IGZyb20gXCIuL3NyYy91dGlscy9EZWZpbmVDb21wb25lbnRIZWxwZXIuanNcIjtcblxuXG5leHBvcnQge0NvbXBvbmVudCwgY29tcG9uZW50QmFzZU9mLCBkZWZpbmUsIGNyZWF0ZVVVSUR9O1xuIiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL1VVSURcIjtcbmltcG9ydCB7IHRyaWdnZXJUaW1lb3V0IH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWUsIGNvbXBvbmVudEV2ZW50bmFtZSB9IGZyb20gXCIuL3V0aWxzL0V2ZW50SGVscGVyXCI7XG4vKlxuY29uc3QgUFJJVkFURV9SRUFEWSA9IHByaXZhdGVQcm9wZXJ0eUFjY2Vzc29yKFwicmVhZHlcIik7XG5cbmNvbnN0IFRJTUVPVVRTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGluaXQgPSAoY29tcG9uZW50KSA9PiB7XG5cdGxldCB0aW1lb3V0ID0gVElNRU9VVFMuZ2V0KGNvbXBvbmVudCk7XG5cdGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0VElNRU9VVFMuZ2V0KGNvbXBvbmVudCwgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0VElNRU9VVFMuZGVsZXRlKGNvbXBvbmVudCk7XG5cdFx0Y29uc3QgcmVhZHkgPSBQUklWQVRFX1JFQURZKGNvbXBvbmVudCk7XG5cdFx0dHJ5e1xuXHRcdFx0YXdhaXQgY29tcG9uZW50LmluaXQoKTtcblx0XHRcdHJlYWR5LnJlc29sdmUoKTtcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBjb21wb25lbnQhXCIsIGNvbXBvbmVudCwgZSk7XG5cdFx0XHRyZWFkeS5yZXNvbHZlKGUpO1xuXHRcdH1cblx0XHRjb21wb25lbnQudHJpZ2dlcihjb21wb25lbnRFdmVudG5hbWUoXCJpbml0aWFsemVkXCIsIGNvbXBvbmVudCkpO1xuXHR9LCBpbml0VGltZW91dCkpO1x0XG59O1xuKi9cblxuLyoqXG4gKiBAZnVuY3Rpb24gY3JlYXRlVUlEXG4gKiBcbiAqIGNyZWF0ZSBhbiB1bmlxdWUgaWRlbnRpZmlyZS5cbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIFxuICogQHBhcmFtIHtzdHJpbmd9IFtzdWZmaXhdXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVVVSUQgPSAocHJlZml4LCBzdWZmaXgpID0+IHtcblx0bGV0IGNvdW50ID0gMDtcblx0bGV0IGlkID0gbnVsbDtcblx0d2hpbGUgKGNvdW50IDwgMTAwKSB7XG5cdFx0aWQgPSBgJHtwcmVmaXggPyBwcmVmaXggOiBcIlwifSR7dXVpZCgpfSR7c3VmZml4ID8gc3VmZml4IDogXCJcIn1gO1xuXHRcdGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSByZXR1cm4gaWQ7XG5cblx0XHRjb3VudCsrO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKFwiVG8gbWFueSByZXRyaWVzIHRvIGNyZWF0ZSBhbiB1bmlxdWUgaWQgLSBjcmVhdGVkIGlkIGlzIG5vdCB1bmlxdWUhXCIpKTtcblx0cmV0dXJuIGlkO1xufTtcblxuY29uc3QgYnVpbGRDbGFzcyA9IChodG1sQmFzZVR5cGUpID0+IHtcblx0Y29uc3QgY2xhenogPSBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBodG1sQmFzZVR5cGUge1xuXG5cdFx0c3RhdGljIGdldCBOT0RFTkFNRSgpIHtcblx0XHRcdHJldHVybiB0aGlzLm5vZGVOYW1lLnRvTG93ZXJjYXNlKCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0I3JlYWR5ID0gbnVsbDtcblx0XHQjcG9zdENvbnN0cnVjdHMgPSBbXTtcblxuXHRcdGNvbnN0cnVjdG9yKHsgc2hhZG93Um9vdCA9IGZhbHNlLCBjb250ZW50ID0gbnVsbCwgY3JlYXRlVUlEID0gZmFsc2UsIHVpZFByZWZpeCA9IFwiaWQtXCIsIHVpZFN1ZmZpeCA9IFwiXCIsIHBvc3RDb25zdHVjdHMgPSBudWxsIH0gPSB7fSkge1xuXHRcdFx0c3VwZXIoKTtcblx0XHRcdHRoaXMuI3JlYWR5ID0gbGF6eVByb21pc2UoKTtcblx0XHRcdGlmIChjcmVhdGVVSUQpIHRoaXMuI3Bvc3RDb25zdHJ1Y3RzLnB1c2goYXN5bmMgKCkgPT4gdGhpcy5hdHRyKFwiaWRcIiwgY3JlYXRlVVVJRCh1aWRQcmVmaXgsIHVpZFN1ZmZpeCkpKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNoYWRvd1Jvb3QpIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG5cblx0XHRcdGlmIChjb250ZW50KSB0aGlzLnJvb3QuYXBwZW5kKHR5cGVvZiBjb250ZW50ID09PSBcImZ1bmN0aW9uXCIgPyBjb250ZW50KHRoaXMpIDogY29udGVudCk7XG5cblx0XHRcdGlmKHBvc3RDb25zdHVjdHMgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Zm9yKGxldCBwb3N0IG9mIHBvc3RDb25zdHVjdHMpXG5cdFx0XHRcdFx0aWYodHlwZW9mIHBvc3QgPT09IFwiZnVuY3Rpb25cIilcblx0XHRcdFx0XHRcdHRoaXMuI3Bvc3RDb25zdHJ1Y3RzLnB1c2gocG9zdClcblx0XHR9XG5cblx0XHRcblx0XHQvKipcblx0XHQgKiBBcnJheSBvZiBwb3N0IGNvbnN0cnVjdCBmdW5jdGlvbnNcblx0XHQgKlxuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtBcnJheTxGdW5jdGlvbj59XG5cdFx0ICovXG5cdFx0Z2V0IHBvc3RDb25zdHJ1Y3RzKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy4jcG9zdENvbnN0cnVjdHM7XG5cdFx0fVxuXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogcm9vdFxuXHRcdCAqXG5cdFx0ICogQHJlYWRvbmx5XG5cdFx0ICogQHR5cGUge0hUTUxFbGVtZW50fFNoYWRvd1Jvb3R9XG5cdFx0ICovXG5cdFx0Z2V0IHJvb3QoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zaGFkb3dSb290IHx8IHRoaXM7XG5cdFx0fVxuXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogcmVhZHlcblx0XHQgKlxuXHRcdCAqIEByZWFkb25seVxuXHRcdCAqIEB0eXBlIHtQcm9taXNlfVxuXHRcdCAqL1xuXHRcdGdldCByZWFkeSgpIHtcblx0XHRcdHJldHVybiB0aGlzLiNyZWFkeTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBAZnVuY3Rpb24gaW5pdFxuXHRcdCAqIEBhc3luY1xuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdFx0ICovXG5cdFx0YXN5bmMgaW5pdCgpIHtcblx0XHRcdGZvciAobGV0IGZ1bmMgb2YgdGhpcy4jcG9zdENvbnN0cnVjdHMpIGF3YWl0IGZ1bmModGhpcyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogXG5cdFx0ICovXG5cdFx0YXN5bmMgZGVzdHJveSgpIHtcblx0XHRcdGlmICh0aGlzLnJlYWR5LnJlc29sdmVkKSB0aGlzLiNyZWFkeSA9IGxhenlQcm9taXNlKCk7XG5cdFx0fVxuXG5cdFx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHRpZiAodGhpcy5vd25lckRvY3VtZW50ID09IGRvY3VtZW50ICYmIHRoaXMuaXNDb25uZWN0ZWQpXG5cdFx0XHRcdC8vaW5pdCh0aGlzKVxuXHRcdFx0XHR0aGlzLmluaXQoKVxuXHRcdFx0XHRcdC50aGVuKCh2YWx1ZSkgPT4gdGhpcy4jcmVhZHkucmVzb2x2ZSh2YWx1ZSkpXG5cdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4gdGhpcy4jcmVhZHkucmVzb2x2ZShlcnJvcikpO1xuXHRcdH1cblxuXHRcdGFkb3B0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2soKTtcblx0XHR9XG5cblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUgJiYgdGhpcy5pc0Nvbm5lY3RlZCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIodHJpZ2dlclRpbWVvdXQsIGF0dHJpYnV0ZUNoYW5nZUV2ZW50bmFtZShuYW1lLCB0aGlzKSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcih0cmlnZ2VyVGltZW91dCwgY29tcG9uZW50RXZlbnRuYW1lKFwiY2hhbmdlXCIsIHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gY2xheno7XG59O1xuXG5jb25zdCBDTEFaWk1BUCA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEJhc2VPZiA9IChodG1sQmFzZVR5cGUpID0+IHtcblx0bGV0IGNsYXp6ID0gQ0xBWlpNQVAuZ2V0KGh0bWxCYXNlVHlwZSk7XG5cdGlmIChjbGF6eiA9PSBudWxsKSB7XG5cdFx0Y2xhenogPSBidWlsZENsYXNzKGh0bWxCYXNlVHlwZSk7XG5cdFx0Q0xBWlpNQVAuc2V0KGh0bWxCYXNlVHlwZSwgY2xhenopO1xuXHR9XG5cblx0cmV0dXJuIGNsYXp6O1xufTtcblxuY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50QmFzZU9mKEhUTUxFbGVtZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIiwiZXhwb3J0IGNvbnN0IGNvbXBvbmVudFByZWZpeCA9IFwiZC1cIjtcclxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUNoYW5nZUV2ZW50UHJlZml4ID0gXCJhdHRyaWJ1dGUtXCI7XHJcbmV4cG9ydCBjb25zdCBpbml0VGltZW91dCA9IDEwO1xyXG5leHBvcnQgY29uc3QgdHJpZ2dlclRpbWVvdXQgPSAxMDtcclxuIiwiaW1wb3J0IHsgY29tcG9uZW50UHJlZml4IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgdG9Ob2RlTmFtZSA9IChuYW1lLCBwcmVmaXgpID0+IHtcblx0aWYodHlwZW9mIHByZWZpeCA9PT0gXCJzdHJpbmdcIilcblx0XHRyZXR1cm4gcHJlZml4ICsgbmFtZTtcblx0XHRcblx0cmV0dXJuIGNvbXBvbmVudFByZWZpeCArIG5hbWU7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmaW5lID0gZnVuY3Rpb24oY2xhenosIG9wdGlvbnMpIHtcblx0Y29uc3Qgbm9kZW5hbWUgPSBjbGF6ei5OT0RFTkFNRTtcblx0aWYgKCFjdXN0b21FbGVtZW50cy5nZXQobm9kZW5hbWUpKSB7XG5cdFx0Y3VzdG9tRWxlbWVudHMuZGVmaW5lKG5vZGVuYW1lLCBjbGF6eiwgb3B0aW9ucyk7XG5cdH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lOyBcbiIsImltcG9ydCB7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuLyoqXG4gKiBAZnVuY3Rpb24gY29tcG9uZW50RXZlbnRuYW1lXG4gKiBcbiAqIGNyZWF0ZXMgYW4gZXZlbnQgbmFtZSBmb3IgYW4gY29tcG9uZW50XG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxDb21wb25lbnR9IG5vZGUgXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlcGFyYXRvcl0gZGVmYXVsdCBpcyBcIjpcIlxuICogXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEV2ZW50bmFtZSA9IChldmVudFR5cGUsIG5vZGUsIHNlcGFyYXRvciA9IFwiOlwiICkgPT4ge1x0XG5cdGxldCBub2RlbmFtZSA9IFwidW5zdXBwb3J0ZWRcIjtcblx0aWYodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlO1xuXHRlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcblx0XHRub2RlbmFtZSA9IG5vZGUubm9kZU5hbWU7XG5cdGVsc2UgaWYodHlwZW9mIG5vZGUuTk9ERU5BTUUgPT09IFwic3RyaW5nXCIpXG5cdFx0bm9kZW5hbWUgPSBub2RlLk5PREVOQU1FO1xuXHRlbHNlIHRocm93IG5ldyBFcnJvcihgJHt0eXBlb2Ygbm9kZX0gaXMgbm90IHN1cHBvcnRlZCBhcyBwYXJhbWV0ZXIgXCJub2RlXCIhYCk7XG5cdFxuICAgcmV0dXJuIGAke25vZGVuYW1lLnRvTG93ZXJDYXNlKCl9JHtzZXBhcmF0b3J9JHtldmVudFR5cGV9YDsvL3VzZSBAIGFzIHNlcGFydG9yIGFuZCBub3QgOlxufTtcblxuLyoqXG4gKiBAZnVuY3Rpb24gYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lXG4gKiAgKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGUgXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudHxDb21wb25lbnR9IG5vZGUgXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlcGFyYXRvcl0gZGVmYXVsdCBpcyBcIjpcIlxuICogXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlQ2hhbmdlRXZlbnRuYW1lID0gKGF0dHJpYnV0ZSwgbm9kZSwgc2VwYXJhdG9yID0gXCI6XCIgICkgPT4ge1xuICAgIHJldHVybiBjb21wb25lbnRFdmVudG5hbWUoYCR7YXR0cmlidXRlQ2hhbmdlRXZlbnRQcmVmaXh9LSR7YXR0cmlidXRlfWAsIG5vZGUsIHNlcGFyYXRvcik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y29tcG9uZW50RXZlbnRuYW1lLCBhdHRyaWJ1dGVDaGFuZ2VFdmVudG5hbWV9IiwiaW1wb3J0IFRlbXBsYXRlLCB7dG9Bc3luY1RlbXBsYXRlTG9hZGVyfSBmcm9tIFwiLi9zcmMvVGVtcGxhdGUuanNcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9zcmMvUmVuZGVyZXIuanNcIjtcblxuZXhwb3J0IHtUZW1wbGF0ZSwgUmVuZGVyZXIsIHRvQXN5bmNUZW1wbGF0ZUxvYWRlcn07IiwiaW1wb3J0IHsgbGF6eVByb21pc2UgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvUHJvbWlzZVV0aWxzLmpzXCI7XHJcbmltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4vRGlyZWN0aXZlLmpzXCI7XHJcbmltcG9ydCBUZW1wbGF0ZSBmcm9tIFwiLi9UZW1wbGF0ZS5qc1wiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uUmVzb2x2ZXIgfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2UvaW5kZXguanNcIjtcclxuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSBcIi4vUmVuZGVyZXIuanNcIjtcclxuXHJcbmNvbnN0IFBSSVZBVEVfV0FJVCA9IFwid2FpdFwiO1xyXG5jb25zdCBQUklWQVRFX0NBTExCQUNLUyA9IFwiY2FsbGJhY2tzXCI7XHJcbmNvbnN0IFBSSVZBVEVfSUdOT1JFRElSRUNUSVZFUyA9IFwiaWdub3JlRGlyZWN0aXZlc1wiO1xyXG5cclxuY29uc3QgQ09OVEVYVENMT05FID0gbmV3IFNldCgpO1xyXG5jb25zdCBDT05URVhUUyA9IG5ldyBNYXAoKTtcclxuY29uc3QgV0FSTlRJTUUgPSAxMDAwO1xyXG5jb25zdCBDUklUSUNBTFRJTUUgPSAxMDAwMDtcclxuXHJcbmxldCBvYnNlcnZlclRpbWVvdXQgPSBudWxsO1xyXG5jb25zdCBvYnNlcnZlID0gKGNvbnRleHQpID0+IHtcclxuXHRDT05URVhUUy5zZXQoY29udGV4dCwgRGF0ZS5ub3coKSk7XHJcblx0cnVuT2JzZXJ2ZXIoKTtcclxufTtcclxuY29uc3QgcnVuT2JzZXJ2ZXIgPSAoKSA9PiB7XHJcblx0aWYgKG9ic2VydmVyVGltZW91dCA9PSBudWxsKSB7XHJcblx0XHRvYnNlcnZlclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0b2JzZXJ2ZXJUaW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0Y29uc3QgdGltZSA9IERhdGUubm93KCk7XHJcblx0XHRcdENPTlRFWFRTLmZvckVhY2goKGNyZWF0ZVRpbWUsIGNvbnRleHQpID0+IHtcclxuXHRcdFx0XHRjb25zdCBkZWx0YSA9IHRpbWUgLSBjcmVhdGVUaW1lO1xyXG5cdFx0XHRcdGlmIChjb250ZXh0LmNsb3NlZCkgQ09OVEVYVFMuZGVsZXRlKGNvbnRleHQpO1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKGRlbHRhID4gQ1JJVElDQUxUSU1FKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJjb250ZXh0IGxpdmVzIGxvbmdlciB0aGVuIDEwc1wiLCBkZWx0YSAvIDEwMDAsIGNvbnRleHQpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChkZWx0YSA+IFdBUk5USU1FKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcImNvbnRleHQgbGl2ZXMgbG9uZ2VyIHRoZW4gMXNcIiwgZGVsdGEgLyAxMDAwLCBjb250ZXh0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIm9wZW4gY29udGV4dDpcIiwgQ09OVEVYVFMuc2l6ZSk7XHJcblx0XHRcdGlmIChDT05URVhUUy5zaXplID4gMCkgcnVuT2JzZXJ2ZXIoKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHRvVGVtcGxhdGUgPSAodGVtcGxhdGUpID0+IHtcclxuXHRpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBUZW1wbGF0ZSkgcmV0dXJuIHRlbXBsYXRlLmltcG9ydENvbnRlbnQoKTtcclxuXHRlbHNlIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09IFN0cmluZykgcmV0dXJuIGNyZWF0ZSh0ZW1wbGF0ZSk7XHJcblx0cmV0dXJuIHRlbXBsYXRlO1xyXG59O1xyXG5cclxubGV0IGlkID0gMDtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dCB7XHJcblx0I2lkO1xyXG5cdCNkZXB0aDtcclxuXHQjcGFyZW50O1xyXG5cdCNyZW5kZXJlcjtcclxuXHQjcm9vdDtcclxuXHQjdGVtcGxhdGU7XHJcblx0I21vZGU7XHJcblx0I3N1YmNvbnRleHRzO1xyXG5cdCN3YWl0O1xyXG5cdCNpZ25vcmVEaXJlY3RpdmVzO1xyXG5cdCNjYWxsYmFja3M7XHJcblxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEBjb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcblx0ICogQHBhcmFtIHtOb2RlTGlzdH0gW29wdGlvbnMuY29udGVudD1udWxsXSBcclxuXHQgKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gb3B0aW9ucy5yZXNvbHZlciBcclxuXHQgKiBAcGFyYW0ge1JlbmRlcmVyfSBvcHRpb25zLnJlbmRlcmVyIFxyXG5cdCAqIEBwYXJhbSB7VGVtcGxhdGV8c3RyaW5nfSBvcHRpb25zLnRlbXBsYXRlIFxyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbnMuY29udGFpbmVyIFxyXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbnMucm9vdCBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubW9kZT1cInJlcGxhY2VcIl0gXHJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW29wdGlvbnMudGFyZ2V0PW51bGxdIFxyXG5cdCAqIEBwYXJhbSB7Q29udGV4dH0gW29wdGlvbnMucGFyZW50PW51bGxdIFxyXG5cdCAqIEBwYXJhbSB7UHJvbWlzZTw+fSBbb3B0aW9ucy53YWl0PW51bGxdIFxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSBbb3B0aW9ucy5jYWxsYmFja3M9bnVsbF0gXHJcblx0ICogQHBhcmFtIHtTZXQ8RGlyZWN0aXZlfHN0cmluZz59IG9wdGlvbnMuaWdub3JlRGlyZWN0aXZlIFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHsgY29udGVudCA9IG51bGwsIHJlc29sdmVyLCByZW5kZXJlciwgdGVtcGxhdGUsIGNvbnRhaW5lciwgcm9vdCwgbW9kZSA9IFwicmVwbGFjZVwiLCB0YXJnZXQgPSBudWxsLCBwYXJlbnQgPSBudWxsLCB3YWl0ID0gbnVsbCwgY2FsbGJhY2tzID0gbnVsbCwgaWdub3JlRGlyZWN0aXZlIH0pIHtcclxuXHRcdGlmICghcmVzb2x2ZXIpIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwicmVzb2x2ZXJcIiBpcyByZXF1aXJlZCEnKTtcclxuXHRcdGlmICghcmVuZGVyZXIpIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwicmVuZGVyZXJcIiBpcyByZXF1aXJlZCEnKTtcclxuXHRcdGlmICghdGVtcGxhdGUpIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidGVtcGxhdGVcIiBpcyByZXF1aXJlZCEnKTtcclxuXHRcdGlmICghY29udGFpbmVyKSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImNvbnRhaW5lclwiIGlzIHJlcXVpcmVkIScpO1xyXG5cdFx0aWYgKCFyb290KSB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInJvb3RcIiBpcyByZXF1aXJlZCEnKTtcclxuXHJcblx0XHR0aGlzLiNpZCA9IHBhcmVudCA/IGAke3BhcmVudC5pZH0tPiR7aWQrK31gIDogYHJvb3Q6OiR7aWQrK31gO1xyXG5cdFx0dGhpcy4jZGVwdGggPSBwYXJlbnQgPyBwYXJlbnQuZGVwdGggKyAxIDogMDtcclxuXHRcdHRoaXMuI3BhcmVudCA9IHBhcmVudDtcclxuXHRcdHRoaXMuI3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcblx0XHR0aGlzLiNyb290ID0gcm9vdDtcclxuXHRcdHRoaXMuI3RlbXBsYXRlID0gdG9UZW1wbGF0ZSh0ZW1wbGF0ZSk7XHJcblx0XHR0aGlzLiNtb2RlID0gbW9kZTtcclxuXHRcdHRoaXMuI3N1YmNvbnRleHRzID0gbmV3IFNldCgpO1xyXG5cdFx0dGhpcy4jd2FpdCA9IHdhaXQgPyB3YWl0IDogbGF6eVByb21pc2UoKTtcclxuXHRcdHRoaXMuI2lnbm9yZURpcmVjdGl2ZXMgPSBpZ25vcmVEaXJlY3RpdmUgaW5zdGFuY2VvZiBTZXQgPyBpZ25vcmVEaXJlY3RpdmUgOiBuZXcgU2V0KCk7XHJcblx0XHR0aGlzLiNjYWxsYmFja3MgPSBjYWxsYmFja3MgaW5zdGFuY2VvZiBBcnJheSA/IGNhbGxiYWNrcyA6IFtdO1xyXG5cclxuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0dGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xyXG5cclxuXHRcdC8qIGV4ZWN1dGlvbiBmbGFncyAqL1xyXG5cdFx0dGhpcy5zdG9wID0gZmFsc2U7XHJcblx0XHR0aGlzLmlnbm9yZSA9IGZhbHNlO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhgY29udGV4dD17XCJkZXB0aFwiOiR7dGhpcy5kZXB0aH0gfSwgXCJpZFwiOiAke3RoaXMuaWR9YCk7XHJcblx0XHQvL3RoaXMuY3JlYXRldEF0ID0gbmV3IEVycm9yKCk7XHJcblxyXG5cdFx0aWYgKHBhcmVudCkge1xyXG5cdFx0XHRwYXJlbnQuc3ViY29udGV4dHMuYWRkKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGlkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2lkO1xyXG5cdH1cclxuXHRnZXQgZGVwdGgoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZGVwdGg7XHJcblx0fVxyXG5cdGdldCBwYXJlbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcGFyZW50O1xyXG5cdH1cclxuXHRnZXQgcmVuZGVyZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcmVuZGVyZXI7XHJcblx0fVxyXG5cdGdldCByb290KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3Jvb3Q7XHJcblx0fVxyXG5cdGdldCB0ZW1wbGF0ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiN0ZW1wbGF0ZTtcclxuXHR9XHJcblx0c2V0IHRlbXBsYXRlKHRlbXBsYXRlKXtcclxuXHRcdHRoaXMuI3RlbXBsYXRlID0gdG9UZW1wbGF0ZSh0ZW1wbGF0ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgbW9kZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNtb2RlO1xyXG5cdH1cclxuXHRnZXQgc3ViY29udGV4dHMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jc3ViY29udGV4dHM7XHJcblx0fVxyXG5cclxuXHRnZXQgY2xvc2VkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3dhaXQucmVzb2x2ZWQ7XHJcblx0fVxyXG5cclxuXHRpZ25vcmVEaXJlY3RpdmUoZGlyZWN0aXZlKSB7XHJcblx0XHRjb25zdCBpZ25vcmVEaXJlY3RpdmVzID0gdGhpcy4jaWdub3JlRGlyZWN0aXZlcztcclxuXHRcdGRpcmVjdGl2ZSBpbnN0YW5jZW9mIERpcmVjdGl2ZSA/IGlnbm9yZURpcmVjdGl2ZXMuYWRkKGRpcmVjdGl2ZS5uYW1lKSA6IGlnbm9yZURpcmVjdGl2ZXMuYWRkKGRpcmVjdGl2ZSk7XHJcblx0fVxyXG5cclxuXHRhY2NlcHREaXJlY3RpdmUoZGlyZWN0aXZlKSB7XHJcblx0XHRjb25zdCBpZ25vcmVEaXJlY3RpdmVzID0gdGhpcy4jaWdub3JlRGlyZWN0aXZlcztcclxuXHRcdGlmIChkaXJlY3RpdmUgaW5zdGFuY2VvZiBEaXJlY3RpdmUpIHJldHVybiAhKGlnbm9yZURpcmVjdGl2ZXMuaGFzKGRpcmVjdGl2ZS5uYW1lKSB8fCBpZ25vcmVEaXJlY3RpdmVzLmhhcyhkaXJlY3RpdmUpKTtcclxuXHJcblx0XHRyZXR1cm4gIWlnbm9yZURpcmVjdGl2ZXMuaGFzKGRpcmVjdGl2ZSk7XHJcblx0fVxyXG5cclxuXHRmaW5pc2hlZChjYWxsYmFjaykge1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5maW5pc2hlZChjYWxsYmFjayk7XHJcblx0XHRlbHNlIHRoaXMucmVhZHkoY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVhZHkoY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuI2NhbGxiYWNrcztcclxuXHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBBcnJheSkgY2FsbGJhY2suZm9yRWFjaCgoY2FsbGJhY2spID0+IHRoaXMud2FpdC50aGVuKGNhbGxiYWNrKSk7XHJcblx0XHRcdGVsc2UgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgUHJvbWlzZSkgY2FsbGJhY2tzLnB1c2goYXN5bmMgKCkgPT4gYXdhaXQgY2FsbGJhY2spO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgd2FpdCA9IHRoaXMuI3dhaXQ7XHJcblx0XHRcdGlmICghd2FpdC5yZXNvbHZlZCkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5pZ25vcmUpIGZvciAobGV0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykgYXdhaXQgY2FsbGJhY2sodGhpcyk7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IGNoaWxkIG9mIHRoaXMuc3ViY29udGV4dHMpIGF3YWl0IGNoaWxkLnJlYWR5KCk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQuc3ViY29udGV4dHMuZGVsZXRlKHRoaXMpO1xyXG5cclxuXHRcdFx0XHR3YWl0LnJlc29sdmUodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB3YWl0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3ViQ29udGV4dCh7IHJlc29sdmVyID0gdGhpcy5yZXNvbHZlciwgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyLCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUsIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCByb290ID0gdGhpcy5yb290LCBtb2RlID0gdGhpcy5tb2RlLCB0YXJnZXQgPSB0aGlzLnRhcmdldCwgaWdub3JlRGlyZWN0aXZlID0gbnVsbCB9ID0ge30pIHtcclxuXHRcdHJldHVybiBuZXcgQ29udGV4dCh7IHJlc29sdmVyLCByZW5kZXJlciwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgcm9vdCwgdGFyZ2V0LCBwYXJlbnQ6IHRoaXMsIGlnbm9yZURpcmVjdGl2ZSB9KTtcclxuXHR9XHJcblxyXG5cdGNsb25lKHsgY29udGVudCA9IHRoaXMuY29udGVudCwgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlLCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciwgcm9vdCA9IHRoaXMucm9vdCwgbW9kZSA9IHRoaXMubW9kZSwgdGFyZ2V0ID0gdGhpcy50YXJnZXQsIGlnbm9yZURpcmVjdGl2ZSA9IHRoaXMuI2lnbm9yZURpcmVjdGl2ZXMgfSA9IHt9KSB7XHJcblx0XHRyZXR1cm4gbmV3IENvbnRleHQoeyBjb250ZW50LCBcclxuXHRcdFx0cmVzb2x2ZXI6IHRoaXMucmVzb2x2ZXIsIFxyXG5cdFx0XHRyZW5kZXJlcjogdGhpcy5yZW5kZXJlciwgXHJcblx0XHRcdHRlbXBsYXRlLCBcclxuXHRcdFx0Y29udGFpbmVyLCBcclxuXHRcdFx0cm9vdCwgXHJcblx0XHRcdG1vZGUsIFxyXG5cdFx0XHR0YXJnZXQsIFxyXG5cdFx0XHRpZ25vcmVEaXJlY3RpdmUsXHJcblx0XHRcdHdhaXQ6IHRoaXMuI3dhaXQsXHJcblx0XHRcdGNhbGxiYWNrczogdGhpcy4jY2FsbGJhY2tzXHJcblx0XHQgfSk7XHJcblx0fVxyXG5cclxuXHR0b1JlbmRlck9wdGlvbih7IHJlc29sdmVyID0gdGhpcy5yZXNvbHZlciwgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyLCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUsIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLCByb290ID0gdGhpcy5yb290LCBtb2RlID0gdGhpcy5tb2RlLCB0YXJnZXQgPSB0aGlzLnRhcmdldCwgaWdub3JlRGlyZWN0aXZlID0gbnVsbCB9ID0ge30pIHtcclxuXHRcdHJldHVybiB7IHJlc29sdmVyLCByZW5kZXJlciwgdGVtcGxhdGUsIGNvbnRhaW5lciwgbW9kZSwgcm9vdCwgdGFyZ2V0LCBwYXJlbnQ6IG51bGwsIGlnbm9yZURpcmVjdGl2ZSB9O1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9Db250ZXh0LmpzXCI7XG5cblxuY29uc3QgREVGSU5FRF9ESVJFQ1RJVkVTID0gW107XG5cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtEaXJlY3RpdmV9IG9wdGlvbnMuZGlyZWN0aXZlIFxuICovXG5jb25zdCBkZWZpbmVEaXJlY3RpdmUgPSAoeyBkaXJlY3RpdmUgfSkgPT4ge1xuXHRpZiAoIShkaXJlY3RpdmUgaW5zdGFuY2VvZiBEaXJlY3RpdmUpKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIkltcGxlbWVudGF0aW9uIGRvc24ndCBleHRlbmQgRGlyZWN0aXZlIGNsYXNzIVwiKTtcblxuXHRpZiAoZGlyZWN0aXZlLnJhbmsgPCBEaXJlY3RpdmUuTUlOX1JBTkspXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIHJhbmsgb2YgYSBkaXJlY3RpdmUgY2FuJ3QgYmUgbG93ZXIgYXMgXCIgKyBEaXJlY3RpdmUuTUlOX1JBTksgKyBcIiFcIik7XG5cblx0aWYgKGRpcmVjdGl2ZS5yYW5rID4gRGlyZWN0aXZlLk1BWF9SQU5LKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSByYW5rIG9mIGEgZGlyZWN0aXZlIGNhbid0IGJlIGdyYXRlciBhcyBcIiArIERpcmVjdGl2ZS5NQVhfUkFOSyArIFwiIVwiKTtcblxuXHRERUZJTkVEX0RJUkVDVElWRVMucHVzaChkaXJlY3RpdmUpO1xuXHRERUZJTkVEX0RJUkVDVElWRVMuc29ydCgoYSwgYikgPT4ge1xuXHRcdGNvbnN0IHBoYXNlID0gYS5waGFzZSAtIGIucGhhc2U7XG5cdFx0aWYocGhhc2UgPT0gMClcblx0XHRcdHJldHVybiBhLnJhbmsgLSBiLnJhbms7XG5cdFx0XHRcblx0XHRyZXR1cm4gcGhhc2U7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBAcmVhZG9ubHlcbiAqIEBlbnVtIHtudW1iZXJ9XHRcbiAqL1xuZXhwb3J0IGNvbnN0IFBIQVNFID0ge1xuXHRpbml0OiAwLFxuXHRkYXRhOiAxLFxuXHR0ZW1wbGF0ZTogMixcblx0Y29udGVudDogMyxcblx0ZmluaXNoOiA0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RpdmUge1xuXG5cdC8qKiBAZW51bSB7UEhBU0V9ICovXG5cdHN0YXRpYyBnZXQgUEhBU0UoKSB7IHJldHVybiBQSEFTRSB9O1xuXHQvKiogQGVudW0ge251bWJlcn0gKi9cblx0c3RhdGljIGdldCBNSU5fUkFOSygpIHsgcmV0dXJuIDAgfTtcblx0LyoqIEBlbnVtIHtudW1iZXJ9ICovXG5cdHN0YXRpYyBnZXQgTUFYX1JBTksoKSB7IHJldHVybiAxMDAwMDAgfTtcblxuXHRjb25zdHJ1Y3RvcigpIHsgfTtcblxuXHQvKipcblx0ICogQGFic3RyYWN0IFxuXHQgKiBAZW51bSB7c3RyaW5nfSBcblx0ICovXG5cdGdldCBuYW1lKCkgeyB9XG5cdC8qKiBcblx0ICogQGFic3RyYWN0XG5cdCAqIEBlbnVtIHtudW1iZXJ9IFxuXHQgKi9cblx0Z2V0IHJhbmsoKSB7IH1cblx0LyoqXG5cdCAqIEBhYnN0cmFjdCBcblx0ICogQGVudW0ge1BIQVNFfSBcblx0ICovXG5cdGdldCBwaGFzZSgpIHtyZXR1cm4gUEhBU0UuZmluaXNofVxuXG5cdC8qKlxuXHQgKiBAYWJzdHJhY3Rcblx0ICogQHBhcmFtIHtDb250ZXh0fSBjb250ZXh0IFxuXHQgKiBAcmV0dXJucyBcblx0ICovXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBzdGF0aWNcblx0ICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcblx0ICogQHBhcmFtIHtEaXJlY3RpdmV9IG9wdGlvbnMuZGlyZWN0aXZlIFxuXHQgKi9cblx0c3RhdGljIGRlZmluZShvcHRpb24pIHtcblx0XHRkZWZpbmVEaXJlY3RpdmUob3B0aW9uKTtcblx0fVxuXG5cdFxuXHQvKipcblx0ICogQHN0YXRpY1xuXHQgKiBAcmVhZG9ubHlcblx0ICogQHR5cGUge0FycmF5PERpcmVjdGl2ZT59XG5cdCAqL1xuXHRzdGF0aWMgZ2V0IGRpcmVjdGl2ZXMoKSB7XG5cdFx0cmV0dXJuIERFRklORURfRElSRUNUSVZFUztcblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RpdmVFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBuZWVkIHRvIGJlIGltcGxlbWVudGVkXG5cdCAqIFxuXHQgKi9cblx0YXN5bmMgZXhlY3V0ZSh7dGVtcGxhdGUsIGNvbnRleHR9KXtcblx0XHRjb250ZXh0LmNvbnRlbnQgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH07XHRcbn0iLCJpbXBvcnQgXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXh0ZG9tXCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5pbXBvcnQgVGVtcGxhdGUgZnJvbSBcIi4vVGVtcGxhdGUuanNcIjtcbmltcG9ydCBDb250ZXh0IGZyb20gXCIuL0NvbnRleHQuanNcIjtcbmltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4vRGlyZWN0aXZlLmpzXCI7XG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50LmpzXCI7XG5pbXBvcnQgXCIuL2RpcmVjdGl2ZXMvaW5kZXguanNcIjtcbmltcG9ydCBcIi4vZWxlbWVudHMvaW5kZXguanNcIjtcblxuZXhwb3J0IGNvbnN0IFNDT1BFUyA9IHtcblx0YXBwbGljYXRpb246IFwiYXBwbGljYXRpb25cIixcblx0ZGF0YTogXCJkYXRhXCIsXG5cdHJlbmRlcjogXCJyZW5kZXJcIixcblx0Y29udGFpbmVyOiBcImNvbnRhaW5lclwiLFxuXHRub2RlOiBcIm5vZGVcIixcblx0ZGlyZWN0aXZlOiBcImRpcmVjdGl2ZVwiLFxufTtcblxuY29uc3QgQVBQTElDQVRJT05fU0NPUEVfUkVTT0xWRVIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgbmFtZTogU0NPUEVTLmFwcGxpY2F0aW9uIH0pO1xuXG5jb25zdCBNT0RFV09SS0VSID0ge1xuXHRyZXBsYWNlOiBhc3luYyAoeyBjb250YWluZXIsIHRhcmdldCA9IG51bGwsIGNvbnRlbnQgfSkgPT4ge1xuXHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdHRhcmdldC5yZXBsYWNlKGNvbnRlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250YWluZXIuZW1wdHkoKTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmQoY29udGVudCk7XG5cdFx0fVxuXHR9LFxuXHRhcHBlbmQ6IGFzeW5jICh7IGNvbnRhaW5lciwgdGFyZ2V0ID0gbnVsbCwgY29udGVudCB9KSA9PiB7XG5cdFx0aWYgKHRhcmdldCkgdGFyZ2V0LmFmdGVyKGNvbnRlbnQpO1xuXHRcdGVsc2UgY29udGFpbmVyLmFwcGVuZChjb250ZW50KTtcblx0fSxcblx0cHJlcGVuZDogYXN5bmMgKHsgY29udGFpbmVyLCB0YXJnZXQgPSBudWxsLCBjb250ZW50IH0pID0+IHtcblx0XHRpZiAodGFyZ2V0KSB0YXJnZXQuYmVmb3JlKGNvbnRlbnQpO1xuXHRcdGVsc2UgY29udGFpbmVyLnByZXBlbmQoY29udGVudCk7XG5cdH0sXG59O1xuXG5jb25zdCBsb2FkVGVtcGxhdGVDb250ZW50ID0gYXN5bmMgKHRlbXBsYXRlLCByZW5kZXJlcikgPT4ge1xuXHRpZiAodGVtcGxhdGUpIHtcblx0XHR0ZW1wbGF0ZSA9IGF3YWl0IFRlbXBsYXRlLmxvYWQodGVtcGxhdGUpO1xuXHRcdHJldHVybiB0ZW1wbGF0ZS5pbXBvcnRDb250ZW50KCk7XG5cdH0gZWxzZSBpZiAocmVuZGVyZXIudGVtcGxhdGUpIHtcblx0XHRyZXR1cm4gYXdhaXQgcmVuZGVyZXIudGVtcGxhdGUuaW1wb3J0Q29udGVudCgpO1xuXHR9XG5cblx0dGhyb3cgbmV3IEVycm9yKFwiTm8gY29udGVudCB0ZW1wbGF0ZSBzcGVjaWZpZWQhXCIpO1xufTtcblxuY29uc3QgYWRkQ29udGVudCA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG5cdGlmIChjb250ZXh0LmNvbnRlbnQpIHtcblx0XHRjb25zdCBtb2Rld29ya2VyID0gTU9ERVdPUktFUltjb250ZXh0Lm1vZGVdO1xuXHRcdGlmICghbW9kZXdvcmtlcikgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCInICsgY29udGV4dC5tb2RlICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQhJyk7XG5cdFx0YXdhaXQgbW9kZXdvcmtlcihjb250ZXh0KTtcblx0fVxufTtcblxuY29uc3QgcmVuZGVyQ29udGFpbmVyID0gYXN5bmMgKGNvbnRleHQpID0+IHtcblx0bGV0IHsgdGVtcGxhdGUsIHJlc29sdmVyIH0gPSBjb250ZXh0O1xuXHRpZiAoIXRlbXBsYXRlIHx8IHRlbXBsYXRlLmxlbmd0aCA9PSAwKSByZXR1cm4gY29udGV4dDtcblxuXHRsZXQgY29udGVudCA9IFtdO1xuXHRmb3IgKGxldCBub2RlVGVtcGxhdGUgb2YgdGVtcGxhdGUpIHtcblx0XHRub2RlVGVtcGxhdGUubm9ybWFsaXplKCk7XG5cdFx0Y29uc3Qgbm9kZVJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IG5hbWU6IFNDT1BFUy5ub2RlLCBjb250ZXh0OiBudWxsLCBwYXJlbnQ6IHJlc29sdmVyIH0pO1xuXHRcdGNvbnN0IG5vZGVDb250ZXh0ID0gYXdhaXQgcmVuZGVyTm9kZShjb250ZXh0LnN1YkNvbnRleHQoeyB0ZW1wbGF0ZTogbm9kZVRlbXBsYXRlLCByZXNvbHZlcjogbm9kZVJlc29sdmVyIH0pKTtcblx0XHRhd2FpdCBub2RlQ29udGV4dC5yZWFkeSgpO1xuXHRcdGNvbnN0IG5vZGUgPSBub2RlQ29udGV4dC5jb250ZW50O1xuXHRcdGlmIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5KSBjb250ZW50ID0gY29udGVudC5jb25jYXQobm9kZSk7XG5cdFx0XHRpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IG5vZGUgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbikgY29udGVudCA9IGNvbnRlbnQuY29uY2F0KEFycmF5LmZyb20obm9kZSkpO1xuXHRcdFx0ZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGUpIGNvbnRlbnQucHVzaChub2RlKTtcblx0XHR9XG5cdH1cblxuXHRjb250ZXh0LmNvbnRlbnQgPSBjb250ZW50Lmxlbmd0aCAhPSAwID8gY29udGVudCA6IG51bGw7XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxuY29uc3QgcmVuZGVyTm9kZSA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG5cdHRyeSB7XG5cdFx0bGV0IHsgdGVtcGxhdGUsIHJlbmRlcmVyIH0gPSBjb250ZXh0O1xuXHRcdGlmICh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEVsZW1lbnQpIGF3YWl0IHRlbXBsYXRlLmV4ZWN1dGUoY29udGV4dCk7XG5cdFx0ZWxzZSBhd2FpdCBleGVjdXRlRGlyZWN0aXZlcyhjb250ZXh0KTtcblxuXHRcdGNvbnN0IHsgaWdub3JlLCBjb250ZW50IH0gPSBjb250ZXh0O1xuXG5cdFx0aWYgKCFpZ25vcmUgJiYgY29udGVudCkge1xuXHRcdFx0bGV0IHsgcmVzb2x2ZXIgfSA9IGNvbnRleHQ7XG5cdFx0XHRjb25zdCBzdWJUZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGUuY2hpbGROb2Rlcztcblx0XHRcdGlmIChzdWJUZW1wbGF0ZSAmJiBzdWJUZW1wbGF0ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGNvbnRhaW5lclJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IG5hbWU6IFNDT1BFUy5jb250YWluZXIsIGNvbnRleHQ6IG51bGwsIHBhcmVudDogcmVzb2x2ZXIgfSk7XG5cdFx0XHRcdGNvbnN0IHN1YkNvbnRleHQgPSBhd2FpdCByZW5kZXJlci5yZW5kZXIoY29udGV4dC5zdWJDb250ZXh0KHsgY29udGFpbmVyOiBjb250ZW50LCB0ZW1wbGF0ZTogc3ViVGVtcGxhdGUsIHJlc29sdmVyOiBjb250YWluZXJSZXNvbHZlciB9KSk7XG5cdFx0XHRcdGF3YWl0IHN1YkNvbnRleHQucmVhZHkoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY29udGV4dC5jb250ZW50ICYmIGNvbnRleHQuY29udGVudC50YWdOYW1lICYmIGNvbnRleHQuY29udGVudC50YWdOYW1lID09IFwiSlNUTFwiKSBjb250ZXh0LmNvbnRlbnQgPSBjb250ZXh0LmNvbnRlbnQuY2hpbGROb2RlczsgLy9zcGVjaWFsIGNhc2UgdG8gc3VwcG9ydCB0aGUgb2xkIFwiPGpzdGw+XCIgdGFnLlxuXHR9IGNhdGNoIChlKSB7XG5cdFx0Y29uc29sZS5lcnJvcihcImVycm9yIGF0IHJlbmRlciBub2RlOlwiLCBlLCBjb250ZXh0KTtcblx0fVxuXHRyZXR1cm4gY29udGV4dDtcbn07XG5cbmNvbnN0IGV4ZWN1dGVEaXJlY3RpdmVzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcblx0Y29uc3QgZGlyZWN0aXZlcyA9IERpcmVjdGl2ZS5kaXJlY3RpdmVzO1xuXHRjb25zdCBsZW5ndGggPSBkaXJlY3RpdmVzLmxlbmd0aDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggJiYgIWNvbnRleHQuc3RvcDsgaSsrKSB7XG5cdFx0Y29uc3QgZGlyZWN0aXZlID0gZGlyZWN0aXZlc1tpXTtcblx0XHR0cnkge1xuXHRcdFx0aWYgKGNvbnRleHQuYWNjZXB0RGlyZWN0aXZlKGRpcmVjdGl2ZSkpIGF3YWl0IGRpcmVjdGl2ZS5leGVjdXRlKGNvbnRleHQpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBhdCBkaXJlY3RpdmU6XCIsIGUsIGRpcmVjdGl2ZSwgY29udGV4dCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIge1xuXHRjb25zdHJ1Y3Rvcih7IHRlbXBsYXRlLCBkYXRhIH0gPSB7fSkge1xuXHRcdGlmICh0ZW1wbGF0ZSAmJiAhKHRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ0ZW1wbGF0ZSBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFRlbXBsYXRlIVwiKTtcblxuXHRcdHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblx0XHR0aGlzLnJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcih7IG5hbWU6IFNDT1BFUy5kYXRhLCBjb250ZXh0OiBkYXRhID8gZGF0YSA6IHt9LCBwYXJlbnQ6IEFQUExJQ0FUSU9OX1NDT1BFX1JFU09MVkVSIH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbVxuXHQgKiBcdFx0Y29udGFpbmVyIEhUTUxFbGVtZW50IC0+IHRhcmdldCB0byByZW5kZXIgaW5cblx0ICogQHBhcmFtXG5cdCAqIFx0XHRkYXRhIE9iamVjdHwuLi4gLT4gZGF0YSB0byB1c2VkIGF0IHJlbmRlcmluZ1xuXHQgKiBAcGFyYW1cblx0ICogXHRcdHRlbXBsYXRlIFRlbXBsYXRlfE5vZGV8Tm9kZUxpc3R8SFRNTENvbGxlY3Rpb258U3RyaW5nIC0+IHRlbXBsYXRlIHRvIHJlbmRlclxuXHQgKiBAcGFyYW1cblx0ICogXHRcdG1vZGUgXCJhcHBlbmRcInxcImluc2VydFwifFwicmVwbGFjZVwiXG5cdCAqIEBwYXJhbVxuXHQgKiBcdFx0dGFyZ2V0XG5cdCAqL1xuXHRhc3luYyByZW5kZXIoY29udGV4dCkge1xuXHRcdGNvbnN0IGNhbGxlZFdpdGhDb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIENvbnRleHQ7XG5cdFx0aWYgKCFjYWxsZWRXaXRoQ29udGV4dCkge1xuXHRcdFx0bGV0IHsgdGVtcGxhdGUgPSBudWxsLCBkYXRhID0gbnVsbCwgY29udGFpbmVyLCByb290LCBtb2RlLCB0YXJnZXQgfSA9IGNvbnRleHQ7XG5cdFx0XHR0ZW1wbGF0ZSA9IGF3YWl0IGxvYWRUZW1wbGF0ZUNvbnRlbnQodGVtcGxhdGUsIHRoaXMpO1xuXHRcdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgbmFtZTogU0NPUEVTLnJlbmRlciwgY29udGV4dDogZGF0YSwgcGFyZW50OiB0aGlzLnJlc29sdmVyIH0pO1xuXHRcdFx0Y29udGV4dCA9IG5ldyBDb250ZXh0KHsgcmVzb2x2ZXIsIHJlbmRlcmVyOiB0aGlzLCB0ZW1wbGF0ZTogdGVtcGxhdGUsIGNvbnRhaW5lciwgcm9vdDogcm9vdCA/IHJvb3QgOiBjb250YWluZXIsIG1vZGU6IG1vZGUgPyBtb2RlIDogXCJyZXBsYWNlXCIsIHRhcmdldCB9KTtcblx0XHR9IGVsc2UgaWYgKGNvbnRleHQuY2xvc2VkKSB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsaW5nIHdpdGggY2xvc2VkIGNvbnRleHRcIiwgY29udGV4dCk7XG5cblx0XHRjb25zdCB0ZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGU7XG5cdFx0aWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgTm9kZSkgYXdhaXQgcmVuZGVyTm9kZShjb250ZXh0KTtcblx0XHRlbHNlIGF3YWl0IHJlbmRlckNvbnRhaW5lcihjb250ZXh0KTtcblx0XHRcblx0XHRhd2FpdCBhZGRDb250ZW50KGNvbnRleHQpO1xuXG5cdFx0aWYgKCFjYWxsZWRXaXRoQ29udGV4dClcblx0XHRcdGF3YWl0IGNvbnRleHQucmVhZHkoKTtcblxuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGJ1aWxkKHsgdGVtcGxhdGUsIGRhdGEgfSA9IHt9KSB7XG5cdFx0aWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlIGluc3RhbmNlb2YgUHJvbWlzZSkgdGVtcGxhdGUgPSBhd2FpdCB0ZW1wbGF0ZTtcblxuXHRcdHRlbXBsYXRlID0gdGVtcGxhdGUgPyBhd2FpdCBUZW1wbGF0ZS5sb2FkKHRlbXBsYXRlKSA6IG51bGw7XG5cdFx0cmV0dXJuIG5ldyBSZW5kZXJlcih7IHRlbXBsYXRlLCBkYXRhIH0pO1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIHJlbmRlcih7IGNvbnRhaW5lciwgZGF0YSwgdGVtcGxhdGUsIG1vZGUsIHRhcmdldCB9KSB7XG5cdFx0Y29uc3QgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoeyB0ZW1wbGF0ZSwgZGF0YSB9KTtcblx0XHRyZXR1cm4gcmVuZGVyZXIucmVuZGVyKHsgY29udGFpbmVyLCBtb2RlLCB0YXJnZXQgfSk7XG5cdH1cbn1cbiIsImltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2phdmFzY3JpcHQvU3RyaW5nLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBOT0RFX0FUVFJJQlVURV9URU1QTEFURSA9IFwidGVtcGxhdGVcIjtcbmNvbnN0IENBQ0hFID0ge307XG5jb25zdCBnZXRLZXkgPSAodGVtcGxhdGUsIGNhY2hlLCBhbGlhcykgPT4ge1xuXHRpZiAoIWNhY2hlKSByZXR1cm4gbnVsbDtcblxuXHRsZXQga2V5ID0gbnVsbDtcblx0aWYgKGFsaWFzKSBrZXkgPSBhbGlhcztcblx0ZWxzZSBpZiAodHlwZW9mIHRlbXBsYXRlID09PSBcInN0cmluZ1wiKSBrZXkgPSB0ZW1wbGF0ZTtcblx0ZWxzZSBpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBVUkwpIGtleSA9IHRlbXBsYXRlLnRvU3RyaW5nKCk7XG5cdGVsc2UgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIGtleSA9IHRlbXBsYXRlLnNlbGVjdG9yKCk7XG5cblx0aWYgKGtleSkgcmV0dXJuIGtleS5oYXNoY29kZSgpO1xuXG5cdHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZnJvbVVSTCA9IGFzeW5jICh1cmwsIGNhY2hlLCBrZXkpID0+IHtcblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSk7XG5cdGNvbnN0IHNvdXJjZSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblx0cmV0dXJuIGZyb21Tb3VyY2Uoc291cmNlLCBjYWNoZSwga2V5KTtcbn07XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSBhc3luYyAoc291cmNlLCBjYWNoZSwga2V5KSA9PiB7XG5cdHJldHVybiBmcm9tRWxlbWVudChjcmVhdGUoc291cmNlLCB0cnVlKSwgY2FjaGUsIGtleSk7XG59O1xuXG5jb25zdCBmcm9tRWxlbWVudCA9IGFzeW5jIChlbGVtZW50LCBjYWNoZSwga2V5KSA9PiB7XG5cdGxldCB0ZW1wbGF0ZSA9IG51bGw7XG5cdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCkgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoZWxlbWVudCwga2V5KTtcblx0ZWxzZSB7XG5cdFx0dGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlIHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24gfHwgZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSB0ZW1wbGF0ZS5jb250ZW50LmFwcGVuZChlbGVtZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJUZW1wbGF0ZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQhXCIpO1xuXG5cdFx0dGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUodGVtcGxhdGUsIGtleSk7XG5cdH1cblxuXHRpZiAoIXRlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJUZW1wbGF0ZSBjYW4ndCBsb2FkZWQhXCIpO1xuXG5cdGlmIChjYWNoZSAmJiBrZXkpIENBQ0hFW2tleV0gPSB0ZW1wbGF0ZTtcblxuXHRyZXR1cm4gdGVtcGxhdGU7XG59O1xuXG5jb25zdCBnZXRUZW1wbGF0ZSA9IChub2RlKSA9PiB7XG5cdGxldCB0ZW1wbGF0ZSA9IG5vZGUuZmluZChcIjpzY29wZSA+IHRlbXBsYXRlXCIpLmZpcnN0KCk7XG5cdGlmICghIXRlbXBsYXRlKSByZXR1cm4gdGVtcGxhdGU7XG5cdGNvbnN0IHZhbHVlID0gbm9kZS5hdHRyKE5PREVfQVRUUklCVVRFX1RFTVBMQVRFKTtcblx0aWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG5cdHRyeSB7XG5cdFx0dGVtcGxhdGUgPSBmaW5kKHZhbHVlKS5maXJzdCgpO1xuXHRcdGlmICghIXRlbXBsYXRlKSByZXR1cm4gdGVtcGxhdGU7XG5cdH0gY2F0Y2ggKGUpIHt9XG5cdHJldHVybiBuZXcgVVJMKHZhbHVlLCBsb2NhdGlvbik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZSB7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0ZW1wbGF0ZS5cblx0ICogXG5cdCAqIEBwYXJhbSB0ZW1wbGF0ZSB0eXBlIG9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQuIE5vdCBudWxsLlxuXHQgKiBAcGFyYW0ga2V5IGlkZW50aWZpZXIgYXQgY2FjaGUsIGlmIHRlbXBsYXRlIHRvIGJlIGNhY2hlZC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKC8qKiBAdHlwZSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gKi8gdGVtcGxhdGUsLyoqIEB0eXBlIHtzdHJpbmd9ICovIGtleSkge1xuXHRcdHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblx0XHR0aGlzLmtleSA9IGtleTtcblx0fVxuXG5cdGltcG9ydENvbnRlbnQoZG9jID0gZG9jdW1lbnQpIHtcblx0XHRsZXQgaW1wb3J0ZWQgPSBkb2MuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLCB0cnVlKTtcblx0XHRyZXR1cm4gaW1wb3J0ZWQuY29udGVudC5jaGlsZE5vZGVzO1xuXHR9XG5cblx0cmVtb3ZlKCkge1xuXHRcdGlmICh0aGlzLmtleSAmJiBDQUNIRVt0aGlzLmtleV0pIGRlbGV0ZSBDQUNIRVt0aGlzLmtleV07XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZmV0Y2godXJsLCBjYWNoZSA9IHRydWUsIGFsaWFzID0gbnVsbCkge1xuXHRcdGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRyZXR1cm4gVGVtcGxhdGUubG9hZChuZXcgVVJMKHVybCwgbG9hY3Rpb24pLCBjYWNoZSwgYWxpYXMpO1xuXHRcdH0gZWxzZSBpZiAodXJsIGluc3RhbmNlb2YgVVJMKSByZXR1cm4gVGVtcGxhdGUubG9hZCh1cmwsIGNhY2hlLCBhbGlhcyk7XG5cblx0XHRuZXcgRXJyb3IoXCJUaGUgdXJsIGlzbid0IGEgYWxsb3dlZCB0eXBlISAtPiBbU3RyaW5nfFVSTF0gcmVxdWlyZWQhXCIpO1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGxvYWQodGVtcGxhdGUsIGNhY2hlID0gdHJ1ZSwgYWxpYXMgPSBudWxsKSB7XG5cdFx0aWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGUpIHJldHVybiB0ZW1wbGF0ZTtcblxuXHRcdGNvbnN0IGtleSA9IGdldEtleSh0ZW1wbGF0ZSwgY2FjaGUsIGFsaWFzKTtcblx0XHRpZiAoa2V5ICYmIENBQ0hFW2tleV0pIHJldHVybiBDQUNIRVtrZXldO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0cmV0dXJuIGZyb21Tb3VyY2UodGVtcGxhdGUsIGNhY2hlLCBrZXkpO1xuXHRcdH0gZWxzZSBpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBVUkwpIHJldHVybiBhd2FpdCBmcm9tVVJMKHRlbXBsYXRlLCBjYWNoZSwga2V5KTtcblx0XHRlbHNlIGlmICh0ZW1wbGF0ZSBpbnN0YW5jZW9mIE5vZGUgfHwgdGVtcGxhdGUgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCB0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uIHx8IHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCkgcmV0dXJuIGZyb21FbGVtZW50KHRlbXBsYXRlLCBjYWNoZSwga2V5KTtcblxuXHRcdG5ldyBFcnJvcihcIlRoZSB0ZW1wbGF0ZSBpc24ndCBhIGFsbG93ZWQgdHlwZSEgLT4gW1N0cmluZ3xVUkx8Tm9kZXxOb2RlTGlzdHxIVE1MQ29sbGVjdGlvbnxUZW1wbGF0ZV0gcmVxdWlyZWQhXCIpO1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGxvYWROb2RlVGVtcGxhdGUobm9kZSwgZGVmYXVsdFRlbXBsYXRlLCBjYWNoZSwgYWxpYXMpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgdGVtcGxhdGUgPSBnZXRUZW1wbGF0ZShub2RlKTtcblx0XHRcdGlmICh0ZW1wbGF0ZSkgcmV0dXJuIFRlbXBsYXRlLmxvYWQodGVtcGxhdGUsIGNhY2hlLCBhbGlhcyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiQ2FuJ3QgbG9hZCB0ZW1wbGF0ZSBmcm9tIG5vZGUhXCIsIG5vZGUsIGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZhdWx0VGVtcGxhdGU7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b0FzeW5jVGVtcGxhdGVMb2FkZXIgPSAoLypVUkwqL3VybCkgPT4ge1xuICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG5cbiAgICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZighdGVtcGxhdGUpe1xuXHRcdFx0aWYodHlwZW9mIHVybCA9PT0gXCJmdW5jdGlvblwiKVxuXHRcdFx0XHR1cmwgPSBhd2FpdCB1cmwoKTtcblx0XHRcdGVsc2UgaWYodXJsIGluc3RhbmNlb2YgUHJvbWlzZSlcblx0XHRcdFx0dXJsID0gYXdhaXQgdXJsO1xuICAgICAgICAgICAgdGVtcGxhdGUgPSBUZW1wbGF0ZS5sb2FkKHVybCk7XG5cdFx0fVxuXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBpc1VuZGVmaW5lZE9yTnVsbCA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzVW5kZWZpbmVkT3JOdWxsT3JCbGFuayA9ICh2YWx1ZSkgPT4ge1xyXG4gIHJldHVybiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID09IDA7XHJcbn07IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XHJcblxyXG5jb25zdCBBVFRSSUJVVEVfX0FUVEFDSEVMRU1FTlQgPSBcImpzdGwtYXR0YWNoLWVsZW1lbnRcIjtcclxuY29uc3QgQVRUUklCVVRFX19BVFRBQ0hFTEVNRU5UX01PREUgPSBcImpzdGwtYXR0YWNoLWVsZW1lbnQtbW9kZVwiO1xyXG5cclxuY29uc3QgTU9ERV9BUFBFTkQgPSBcImFwcGVuZFwiO1xyXG5jb25zdCBNT0RFX1BSRVBFTkQgPSBcInByZXBlbmRcIjtcclxuY29uc3QgTU9ERV9SRVBMQUNFID0gXCJyZXBsYWNlXCI7XHJcblxyXG5jb25zdCBQUkVDSEVDSyA9IC9eIy4rJC87XHJcblxyXG5jb25zdCBnZXRFbGVtZW50ID0gYXN5bmMgKHRlbXBsYXRlLCByZXNvbHZlcikgPT4ge1xyXG5cdGxldCBlbGVtZW50ID0gKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFX19BVFRBQ0hFTEVNRU5UKSB8fCBcIlwiKS50cmltKCk7XHJcblx0aWYgKCFQUkVDSEVDSy50ZXN0KGVsZW1lbnQpKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRlbGVtZW50ID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShlbGVtZW50LCBlbGVtZW50KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSByZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHRyeSB7XHJcblx0XHRlbGVtZW50ID0gZmluZChlbGVtZW50KTtcclxuXHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRpZiAoZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCA+IDApIHJldHVybiBlbGVtZW50Lmxlbmd0aCA9PSAwID8gZWxlbWVudC5maXJzdCgpIDogZWxlbWVudDtcclxuXHJcblx0cmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jbGFzcyBBdHRhY2hFbGVtZW50IGV4dGVuZHMgRGlyZWN0aXZlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgbmFtZSgpIHtcclxuXHRcdHJldHVybiBcImF0dGFjaC1lbGVtZW50XCI7XHJcblx0fVxyXG5cdGdldCByYW5rKCkge1xyXG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDE7XHJcblx0fVxyXG5cdGdldCBwaGFzZSgpIHtcclxuXHRcdHJldHVybiBEaXJlY3RpdmUuUEhBU0UuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xyXG5cdFx0Y29uc3QgeyByZXNvbHZlciwgdGVtcGxhdGUsIGNvbnRlbnQgfSA9IGNvbnRleHQ7XHJcblx0XHRpZiAoISh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCAhdGVtcGxhdGUuYXR0cihBVFRSSUJVVEVfX0FUVEFDSEVMRU1FTlQpKSByZXR1cm4gY29udGV4dDtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBlbGVtZW50ID0gYXdhaXQgZ2V0RWxlbWVudCh0ZW1wbGF0ZSwgcmVzb2x2ZXIpO1xyXG5cdFx0XHRpZiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdGNvbnN0IG1vZGUgPSB0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURV9fQVRUQUNIRUxFTUVOVF9NT0RFKSB8fCBNT0RFX1JFUExBQ0U7XHJcblx0XHRcdFx0aWYgKG1vZGUgPT0gTU9ERV9SRVBMQUNFKSB7XHJcblx0XHRcdFx0XHRjb250ZW50LmVtcHR5KCkuYXBwZW5kKGVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0Y29udGV4dC5zdG9wID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGNvbnRleHQuaWdub3JlID0gdHJ1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29udGV4dC5yZWFkeSgoeyBjb250ZW50IH0pID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKGNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAobW9kZSA9PSBNT0RFX0FQUEVORCkgY29udGVudC5hcHBlbmQoZWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAobW9kZSA9PSBNT0RFX1BSRVBFTkQpIGNvbnRlbnQucHJlcGVuZChlbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGUsIHsgY29udGV4dCB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29udGV4dDtcclxuXHR9XHJcbn1cclxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IEF0dGFjaEVsZW1lbnQoKSB9KTtcclxuIiwiaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsLmpzXCI7XG5pbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcblxuY29uc3QgQVRUUklCVVRFX05BTUUgPSAvKGpzdGwpPyhcXD8pPyhAKT8oW15cXD9AXSspL2k7XG5cbmNvbnN0IERFRkFVTFRfRVZFTlRfRlVOQ1RJT04gPSBcImRlZmF1bHRcIjtcbmNvbnN0IE9QVElPTl9QUkVWRU5UX0RFRkFVTFQgPSBcInByZXZlbnQtZGVmYXVsdFwiXG5jb25zdCBJR05PUkVEX0FUVFJJQlVURVMgPSBbXCJpc1wiXTtcblxuY29uc3QgRlVOQ1RJT05fU1BMSVRURVIgPSBcIjo6XCI7XG5jb25zdCBGVU5DVElPTl9TUExJVFRFUl9PTEQgPSBcIjpcIjtcblxuY29uc3QgRVZFTlRGVU5DVElPTlMgPSB7XG5cdGRlbGVnYXRlOiBhc3luYyAoZXZlbnQsIGhhbmRsZSwgc2V0dGluZywgdHlwZSwgcmVzb2x2ZXIsIGNvbnRlbnQsIG9wdGlvbnMsIGNvbnRleHQpID0+IHtcblx0XHRjb25zdCBldmVudGhhbmRsZSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGhhbmRsZSwgaGFuZGxlKTtcblx0XHRjb250ZW50Lm9uKGV2ZW50LCBkZWxlZ2F0ZXIoZXZlbnRoYW5kbGUsIHNldHRpbmcpKTtcblx0fSxcblx0dG9nZ2xlY2xhc3M6IGFzeW5jIChldmVudCwgaGFuZGxlLCBzZXR0aW5nLCB0eXBlLCByZXNvbHZlciwgY29udGVudCwgb3B0aW9ucywgY29udGV4dCkgPT4ge1xuXHRcdGNvbnN0IGNsYXp6ID0gb3B0aW9ucy5zaGlmdCgpO1xuXHRcdGNvbnN0IHByZXZlbnREZWZhdWx0ID0gb3B0aW9ucy5pbmNsdWRlcyhPUFRJT05fUFJFVkVOVF9ERUZBVUxUKTtcblx0XHRjb25zdCBzZWxlY3RvciA9IGhhbmRsZSA/IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGhhbmRsZSwgaGFuZGxlKSA6IG51bGw7XHRcdFxuXHRcdGNvbnRlbnQub24oZXZlbnQsIChldmVudCkgPT4ge1xuXHRcdFx0aWYocHJldmVudERlZmF1bHQpXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZihzZWxlY3Rvcilcblx0XHRcdFx0Y29udGVudC5jbG9zZXN0cyhzZWxlY3RvcikudG9nZ2xlQ2xhc3MoY2xhenopO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjb250ZW50LnRvZ2dsZUNsYXNzKGNsYXp6KTtcblx0XHR9KTtcblx0fSxcblx0dG9nZ2xlYXR0cmlidXRlOiBhc3luYyAoZXZlbnQsIGhhbmRsZSwgc2V0dGluZywgdHlwZSwgcmVzb2x2ZXIsIGNvbnRlbnQsIG9wdGlvbnMsIGNvbnRleHQpID0+IHtcblx0XHRjb25zdCBhdHRyaWJ1dGUgPSBvcHRpb25zLnNoaWZ0KCk7XG5cdFx0Y29uc3QgcHJldmVudERlZmF1bHQgPSBvcHRpb25zLmluY2x1ZGVzKE9QVElPTl9QUkVWRU5UX0RFRkFVTFQpO1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gaGFuZGxlID8gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQoaGFuZGxlLCBoYW5kbGUpIDogbnVsbDtcdFx0XG5cdFx0Y29udGVudC5vbihldmVudCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZihwcmV2ZW50RGVmYXVsdClcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmKHNlbGVjdG9yKVxuXHRcdFx0XHRjb250ZW50LmNsb3Nlc3RzKHNlbGVjdG9yKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdGVsZW1lbnQudG9nZ2xlQXR0cmlidXRlKGF0dHJpYnV0ZSlcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblx0XHRcdGVsc2UgXG5cdFx0XHRcdGNvbnRlbnQudG9nZ2xlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cdFx0fSk7XG5cdH0sXG5cdFtERUZBVUxUX0VWRU5UX0ZVTkNUSU9OXTogYXN5bmMgKGV2ZW50LCBoYW5kbGUsIHNldHRpbmcsIHR5cGUsIHJlc29sdmVyLCBjb250ZW50LCBvcHRpb25zLCBjb250ZXh0KSA9PiB7XG5cdFx0Y29uc3QgZXZlbnRoYW5kbGUgPSBoYW5kbGUgPyBhd2FpdCByZXNvbHZlci5yZXNvbHZlKGhhbmRsZSwgaGFuZGxlKSA6IG51bGw7XG5cblx0XHRpZiAoIWV2ZW50aGFuZGxlKSBjb25zb2xlLmVycm9yKG5ldyBFcnJvcihcIkNhbid0IHJlc29sdmUgXFxcIlwiICsgaGFuZGxlICsgJ1wiIHRvIGV2ZW50IGhhbmRsZSEnKSk7XG5cdFx0ZWxzZSBpZiAodHlwZW9mIGV2ZW50aGFuZGxlID09PSBcImZ1bmN0aW9uXCIpIGNvbnRlbnQub24oZXZlbnQsIGV2ZW50aGFuZGxlKTtcblx0XHRlbHNlIGlmICh0eXBlb2YgZXZlbnRoYW5kbGUgPT09IFwic3RyaW5nXCIpIGNvbnRlbnQub24oZXZlbnQsIGRlbGVnYXRlcihldmVudGhhbmRsZSwgc2V0dGluZykpO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiBldmVudGhhbmRsZSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0Y29uc3QgeyBjYXB0dXJlID0gZmFsc2UsIHBhc3NpdmUgPSBmYWxzZSwgb25jZSA9IGZhbHNlIH0gPSBldmVudGhhbmRsZTtcblx0XHRcdGNvbnRlbnQub24oZXZlbnQsIGV2ZW50aGFuZGxlLmV2ZW50SGFuZGxlLCB7IGNhcHR1cmUsIHBhc3NpdmUsIG9uY2UgfSk7XG5cdFx0fVxuXHR9LFxufTtcblxuY29uc3QgYmluZEF0dHJpYnV0ZSA9IGFzeW5jICh7IGNvbmRpdGlvbiwgbmFtZSwgdmFsdWUsIGNvbnRleHQgfSkgPT4ge1xuXHRjb25zdCB7IHJlc29sdmVyLCBjb250ZW50LCB0ZW1wbGF0ZSB9ID0gY29udGV4dDtcblxuXHRsZXQgYXR0cmlidXRlID0gIWNvbmRpdGlvbiA/IHZhbHVlIDogdGVtcGxhdGUuYXR0cihuYW1lKTtcblx0Y29uZGl0aW9uID0gY29uZGl0aW9uID8gdmFsdWUgOiB0ZW1wbGF0ZS5hdHRyKFwiP1wiICsgbmFtZSk7XG5cdGNvbnN0IGhhc1ZhbHVlID0gaXNWYWx1ZShhdHRyaWJ1dGUpO1xuXG5cdGlmIChjb25kaXRpb24gJiYgaGFzVmFsdWUpIHtcblx0XHRjb25kaXRpb24gPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZmFsc2UpO1xuXHRcdGlmIChjb25kaXRpb24gPT09IHRydWUpIGNvbnRlbnQuYXR0cihuYW1lLCBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dChhdHRyaWJ1dGUsIGF0dHJpYnV0ZSkpO1xuXHR9IGVsc2UgaWYgKGNvbmRpdGlvbikge1xuXHRcdGNvbmRpdGlvbiA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoY29uZGl0aW9uLCBmYWxzZSk7XG5cdFx0aWYgKGNvbmRpdGlvbiA9PT0gdHJ1ZSkgY29udGVudC5hdHRyKG5hbWUsIHRydWUpO1xuXHR9IGVsc2UgaWYgKGhhc1ZhbHVlKSB7XG5cdFx0Y29udGVudC5hdHRyKG5hbWUsIGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGF0dHJpYnV0ZSwgYXR0cmlidXRlKSk7XG5cdH1cbn07XG5cbmNvbnN0IGlzVmFsdWUgPSAodmFsdWUpID0+IHtcblx0cmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiO1xufTtcblxuY29uc3QgYmluZEV2ZW50ID0gYXN5bmMgKHsgY29uZGl0aW9uLCBuYW1lLCB2YWx1ZSwgY29udGV4dCB9KSA9PiB7XG5cdGNvbnN0IHsgcmVzb2x2ZXIsIHRlbXBsYXRlLCBjb250ZW50IH0gPSBjb250ZXh0O1xuXG5cdGNvbmRpdGlvbiA9IGNvbmRpdGlvbiA/IHZhbHVlIDogdGVtcGxhdGUuYXR0cihcIj9AXCIgKyBuYW1lKTtcblx0bGV0IGhhbmRsZSA9ICFjb25kaXRpb24gPyB2YWx1ZSA6IHRlbXBsYXRlLmF0dHIoXCJAXCIgKyBuYW1lKTtcblx0bGV0IHNwbGl0ID0gbmFtZS5zcGxpdChGVU5DVElPTl9TUExJVFRFUik7XG5cdGlmKHNwbGl0Lmxlbmd0aCA9PSAxKVxuXHRcdHNwbGl0ID0gbmFtZS5zcGxpdChGVU5DVElPTl9TUExJVFRFUl9PTEQpO1xuXG5cdGNvbnN0IGV2ZW50ID0gc3BsaXQuc2hpZnQoKTtcblx0Y29uc3QgdHlwZSA9IChzcGxpdC5zaGlmdCgpIHx8IERFRkFVTFRfRVZFTlRfRlVOQ1RJT04pLnRvTG93ZXJDYXNlKCk7XG5cdFxuXHRpZih0eXBlb2YgaGFuZGxlID09PSBcInVuZGVmaW5lZFwiIHx8IGhhbmRsZSA9PSBudWxsKVxuXHRcdGNvbnNvbGUuZXJyb3IoYERlZmluaXRpb24gb2YgXCIke2V2ZW50fVwiIC0gZXZlbnQgaGFuZGxlIGF0YCwgY29udGVudCwgXCJpcyBpbmNvcnJlY3QhXCIpO1xuXG5cdGhhbmRsZSA9IGhhbmRsZS50cmltKCk7XG5cdGNvbnN0IHNldHRpbmcgPSB7XG5cdFx0YnViYmxlOiB0cnVlLFxuXHR9O1xuXG5cdGlmIChjb25kaXRpb24gKSB7XG5cdFx0aWYgKChhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZmFsc2UpKSA9PSB0cnVlKSBhd2FpdCBiaW5kaW5nKGV2ZW50LCBoYW5kbGUsIHNldHRpbmcsIHR5cGUsIHJlc29sdmVyLCBjb250ZW50LCBzcGxpdCwgY29udGV4dCk7XG5cdH0gZWxzZSBhd2FpdCBiaW5kaW5nKGV2ZW50LCBoYW5kbGUsIHNldHRpbmcsIHR5cGUsIHJlc29sdmVyLCBjb250ZW50LCBzcGxpdCwgY29udGV4dCk7XG59O1xuXG5jb25zdCBiaW5kaW5nID0gYXN5bmMgKGV2ZW50LCBoYW5kbGUsIHNldHRpbmcsIHR5cGUsIHJlc29sdmVyLCBjb250ZW50LCBvcHRpb25zLCBjb250ZXh0KSA9PiB7XG5cdGNvbnN0IGJpbmRlciA9IEVWRU5URlVOQ1RJT05TW3R5cGVdO1xuXHRpZiAoYmluZGVyKSByZXR1cm4gYmluZGVyKGV2ZW50LCBoYW5kbGUsIHNldHRpbmcsIHR5cGUsIHJlc29sdmVyLCBjb250ZW50LCBvcHRpb25zLCBjb250ZXh0KTtcbn07XG5cbmNvbnN0IGRlbGVnYXRlciA9IGZ1bmN0aW9uIChkZWxlZ2F0ZSwgc2V0dGluZykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoZXZlbnQuY3VycmVudFRhcmdldCkgZXZlbnQuY3VycmVudFRhcmdldC50cmlnZ2VyKGRlbGVnYXRlLCBldmVudCk7XG5cdFx0ZWxzZSBldmVudC50YXJnZXQudHJpZ2dlcihkZWxlZ2F0ZSwgZXZlbnQpO1xuXHR9O1xufTtcblxuY2xhc3MgQXR0cmlidXRlIGV4dGVuZHMgRGlyZWN0aXZlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiBcImF0dHJpYnV0ZVwiO1xuXHR9XG5cdGdldCByYW5rKCkge1xuXHRcdHJldHVybiBEaXJlY3RpdmUuTUlOX1JBTks7XG5cdH1cblx0Z2V0IHBoYXNlKCkge1xuXHRcdHJldHVybiBEaXJlY3RpdmUuUEhBU0UuY29udGVudDtcblx0fVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGNvbnN0IHsgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XG5cdFx0aWYgKCEodGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBjb250ZXh0O1xuXG5cdFx0Y29uc3QgcHJvY2Vzc2VkID0gbmV3IFNldChJR05PUkVEX0FUVFJJQlVURVMpO1xuXHRcdGZvciAoY29uc3QgYXR0cmlidXRlIG9mIHRlbXBsYXRlLmF0dHJpYnV0ZXMpIHtcblx0XHRcdGNvbnN0IFssIGpzdGwsIGNvbmRpdGlvbiwgZXZlbnQsIG5hbWVdID0gQVRUUklCVVRFX05BTUUuZXhlYyhhdHRyaWJ1dGUubmFtZSk7XG5cdFx0XHRpZiAoIWpzdGwgJiYgIXByb2Nlc3NlZC5oYXMobmFtZSkpIHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG5cblx0XHRcdFx0aWYgKGV2ZW50KSBhd2FpdCBiaW5kRXZlbnQoeyBjb25kaXRpb24sIGV2ZW50LCBuYW1lLCB2YWx1ZSwgY29udGV4dCB9KTtcblx0XHRcdFx0ZWxzZSBhd2FpdCBiaW5kQXR0cmlidXRlKHsgY29uZGl0aW9uLCBuYW1lLCB2YWx1ZSwgY29udGV4dCB9KTtcblx0XHRcdH1cblx0XHRcdHByb2Nlc3NlZC5hZGQobmFtZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cbn1cblxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IEF0dHJpYnV0ZSgpIH0pO1xuIiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5cbmNsYXNzIENob29zZSBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHsgcmV0dXJuIFwiY2hvb3NlXCIgfVxuXHRnZXQgcmFuaygpIHsgcmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDEgfVxuXHRnZXQgcGhhc2UoKSB7IHJldHVybiBEaXJlY3RpdmUuUEhBU0UudGVtcGxhdGUgfVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGlmICghKGNvbnRleHQudGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIWNvbnRleHQudGVtcGxhdGUuaGFzQXR0cmlidXRlKFwianN0bC1jaG9vc2VcIikgfHwgY29udGV4dC50ZW1wbGF0ZS5jaGlsZHJlbi5sZW5ndGggPT0gMClcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXHRcdFxuXHRcdC8vY2xvbmUgdGVtcGxhdGUsIGJlZm9yZSBtYW5pcHVsYXRlIHRlbXBsYXRlXG5cdFx0Y29udGV4dC50ZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXHRcdGNvbnN0IHsgdGVtcGxhdGUsIHJlc29sdmVyIH0gPSBjb250ZXh0O1xuXHRcdGxldCByZXNvbHZlZCA9IGZhbHNlO1xuXHRcdGNvbnN0IHdoZW5zID0gdGVtcGxhdGUuZmluZChcIjpzY29wZSA+IFtqc3RsLXdoZW5dXCIpO1xuXHRcdGNvbnN0IGxlbmd0aCA9IHdoZW5zLmxlbmd0aDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gd2hlbnNbaV07XG5cdFx0XHRpZiAoIXJlc29sdmVkICYmIChhd2FpdCByZXNvbHZlci5yZXNvbHZlKG5vZGUuYXR0cihcImpzdGwtd2hlblwiKSwgZmFsc2UpKSlcblx0XHRcdFx0cmVzb2x2ZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRub2RlLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdGlmIChyZXNvbHZlZClcblx0XHRcdHRlbXBsYXRlLmZpbmQoXCI6c2NvcGUgPiBbanN0bC1vdGhlcndpc2VdXCIpLnJlbW92ZSgpO1xuXG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cbn1cblxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IENob29zZSgpIH0pOyIsImltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4uL0RpcmVjdGl2ZS5qc1wiO1xuaW1wb3J0IEV4cHJlc3Npb25SZXNvbHZlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4cHJlc3Npb24tbGFuZ3VhZ2Uvc3JjL0V4cHJlc3Npb25SZXNvbHZlci5qc1wiO1xuXG5jb25zdCBNT0RFUyA9IHtcblx0XCJyZW1vdGVcIjogYXN5bmMgKHsgZGF0YSwgY29udGV4dCB9KSA9PiB7XHRcdFxuXHRcdGNvbnN0IHtyZXNvbHZlciwgdGVtcGxhdGV9ID0gY29udGV4dDtcblx0XHRkYXRhID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQoZGF0YSk7XG5cdFx0ZGF0YSA9IG5ldyBVUkwoZGF0YSwgbG9jYXRpb24ub3JpZ2luKTtcblx0XHRsZXQgb3B0aW9uID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQodGVtcGxhdGUuYXR0cihcImpzdGwtZGF0YS1vcHRpb25cIikgfHwgXCJ7fVwiKTtcblx0XHRvcHRpb24gPSBKU09OLnBhcnNlKG9wdGlvbik7XG5cblx0XHRkYXRhID0gYXdhaXQgZmV0Y2goZGF0YS50b1N0cmluZygpLCBvcHRpb24pO1xuXHRcdHJldHVybiBkYXRhLmpzb24oKTtcblx0fSxcdFxuXHRcInNldFwiOiBhc3luYyAoeyBkYXRhLCBjb250ZXh0IH0pID0+IHtcblx0XHRjb25zdCB7cmVzb2x2ZXJ9ID0gY29udGV4dDtcblx0XHRcblx0XHRkYXRhID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShkYXRhKTtcblx0XHRyZXR1cm4gZGF0YTtcblx0fSxcblx0XCJkaXJlY3RcIjogYXN5bmMgKHsgZGF0YSwgY29udGV4dCB9KSA9PiB7XG5cdFx0Y29uc3Qge3Jlc29sdmVyfSA9IGNvbnRleHQ7XG5cdFx0XG5cdFx0ZGF0YSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGRhdGEpO1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59O1xuXG5jb25zdCB1cGRhdGVDb250ZXh0ID0gKHsgdmFybmFtZSwgZGF0YSwgc2NvcGUsIGNvbnRleHQgfSkgPT4ge1xuXHRpZiAodmFybmFtZSlcblx0XHRjb250ZXh0LnJlc29sdmVyLnVwZGF0ZURhdGEodmFybmFtZSwgZGF0YSwgc2NvcGUpO1xuXHRlbHNlIGlmIChzY29wZSlcblx0XHRjb250ZXh0LnJlc29sdmVyLm1lcmdlQ29udGV4dChkYXRhLCBzY29wZSk7XG5cdGVsc2V7XG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogZGF0YSwgbmFtZTogXCJqc3RsLWRhdGFcIiwgcGFyZW50OiBjb250ZXh0LnJlc29sdmVyIH0pO1xuXHRcdC8vY29udGV4dCA9IGNvbnRleHQuc3ViQ29udGV4dCh7cmVzb2x2ZXJ9KTtcblx0XHRjb250ZXh0LnJlc29sdmVyID0gcmVzb2x2ZXI7XG5cdH1cblx0XG5cdFx0XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxuXG5cbmNsYXNzIERhdGEgZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7IHJldHVybiBcImRhdGFcIiB9XG5cdGdldCByYW5rKCkgeyByZXR1cm4gMTAwMCB9XG5cdGdldCBwaGFzZSgpe3JldHVybiBEaXJlY3RpdmUuUEhBU0UuZGF0YX1cblxuXHRhc3luYyBleGVjdXRlKGNvbnRleHQpIHtcblx0XHRpZiAoIShjb250ZXh0LnRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICFjb250ZXh0LnRlbXBsYXRlLmF0dHIoXCJqc3RsLWRhdGFcIikpXG5cdFx0XHRyZXR1cm4gY29udGV4dDtcblx0XHRcdFxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB7IHRlbXBsYXRlIH0gPSBjb250ZXh0O1x0XHRcdFxuXHRcdFx0Y29uc3QgbW9kZSA9IE1PREVTWyh0ZW1wbGF0ZS5hdHRyKFwianN0bC1kYXRhLW1vZGVcIikgfHwgXCJyZW1vdGVcIildO1xuXHRcdFx0aWYgKCFtb2RlKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUganN0bC1kYXRhLW1vZGUgaXMgdW5zdXBwb3J0ZWQhXCIpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IHRlbXBsYXRlLmF0dHIoXCJqc3RsLWRhdGFcIik7XG5cdFx0XHRkYXRhID0gYXdhaXQgbW9kZSh7IGRhdGEsIGNvbnRleHQgfSk7XG5cblx0XHRcdGNvbnN0IHZhcm5hbWUgPSB0ZW1wbGF0ZS5hdHRyKFwianN0bC1kYXRhLXZhclwiKTtcblx0XHRcdGNvbnN0IHNjb3BlID0gdGVtcGxhdGUuYXR0cihcImpzdGwtZGF0YS1zY29wZVwiKTtcblx0XHRcdGNvbnRleHQgPSB1cGRhdGVDb250ZXh0KHsgdmFybmFtZSwgZGF0YSwgc2NvcGUsIGNvbnRleHQgfSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlLCBjb250ZXh0LnRlbXBsYXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29udGV4dDtcblxuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBEYXRhKCkgfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkT3JOdWxsT3JCbGFuaywgaXNVbmRlZmluZWRPck51bGx9IGZyb20gXCIuLi9VdGlscy5qc1wiO1xuXG5jb25zdCBBVFRSSUJVVEUgPSB7XG5cdERBVEE6IFwianN0bC1mb3JlYWNoXCIsXG5cdFZBUjogXCJqc3RsLWZvcmVhY2gtdmFyXCIsXG5cdFNUQVRVUzogXCJqc3RsLWZvcmVhY2gtc3RhdHVzXCIsXG5cdENPVU5UOiBcImpzdGwtZm9yZWFjaC1jb3VudFwiLFxuXHRTVEFSVDogXCJqc3RsLWZvcmVhY2gtc3RhcnRcIixcblx0U1RFUDogXCJqc3RsLWZvcmVhY2gtc3RlcFwiLFxuXHRDT05ESVRJT046IFwianN0bC1mb3JlYWNoLWNvbmRpdGlvblwiXG59O1xuXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uc3RhcnQgXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9uLnN0ZXAgXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9uLmNvdW50IFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi52YXJuYW1lIFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi5zdGF0dXMgXG4gKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gb3B0aW9uLnJlc29sdmVyIFxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmNvbnN0IGRvQ291bnQgPSBhc3luYyAob3B0aW9uKSA9PiB7XG5cdGxldCB7IHN0YXJ0LCBzdGVwLCBjb3VudCwgdmFybmFtZSwgc3RhdHVzLCByZXNvbHZlciB9ID0gb3B0aW9uO1xuXG5cdGNvdW50ID0gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb3VudCk7XG5cdGNvbnN0IGxlbmd0aCA9IHN0YXJ0ICsgKGNvdW50ICogc3RlcCk7XG5cdGxldCBzdG9wID0gZmFsc2U7XG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGxlbmd0aCAmJiAhc3RvcDsgaSA9IGkgKyBzdGVwKSB7XG5cdFx0Y29uc3QgaXRlcmF0aW9uID0ge31cblx0XHRpdGVyYXRpb25bdmFybmFtZV0gPSBpO1xuXHRcdGl0ZXJhdGlvbltzdGF0dXNdID0ge1xuXHRcdFx0aW5kZXg6IGksXG5cdFx0XHRudW1iZXI6IGkgKyAxLFxuXHRcdFx0c3RlcCxcblx0XHRcdGNvdW50XG5cdFx0fTtcblx0XHRzdG9wID0gIShhd2FpdCBpdGVyYXRlKGl0ZXJhdGlvbiwgb3B0aW9uKSk7XG5cdH1cbn07XG5cblxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb24gXG4gKiBAcGFyYW0ge0FycmF5PGFueT58YW55fSBvcHRpb24uZGF0YSBcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uc3RhcnQgXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9uLnN0ZXAgXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9uLmNvdW50IFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi52YXJuYW1lIFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi5zdGF0dXMgXG4gKiBAcGFyYW0ge0V4cHJlc3Npb25SZXNvbHZlcn0gb3B0aW9uLnJlc29sdmVyIFxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmNvbnN0IGRvRm9yZWFjaCA9IGFzeW5jIChvcHRpb24pID0+IHtcblx0bGV0IHsgZGF0YSwgc3RhcnQsIHN0ZXAsIGNvdW50LCB2YXJuYW1lLCBzdGF0dXMsIHJlc29sdmVyIH0gPSBvcHRpb247XG5cblx0ZGF0YSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoZGF0YSwgW10pO1xuXHRsZXQgYXJyYXkgPSBkYXRhO1xuXHRpZiAoIShkYXRhIGluc3RhbmNlb2YgQXJyYXkpKVxuXHRcdGFycmF5ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSk7XG5cblx0Y291bnQgPSBjb3VudCAhPSBcIlwiID8gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb3VudCwgMCkgOiBudWxsO1xuXHRjb25zdCBsZW5ndGggPSBjb3VudCA/IE1hdGgubWluKHN0YXJ0ICsgY291bnQsIGFycmF5Lmxlbmd0aCkgOiBhcnJheS5sZW5ndGg7XG5cdGxldCBzdG9wID0gZmFsc2U7XG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGxlbmd0aCAmJiAhc3RvcDsgaSA9IGkgKyBzdGVwKSB7XG5cdFx0Y29uc3QgaXRlcmF0aW9uID0ge31cblx0XHRpdGVyYXRpb25bdmFybmFtZV0gPSBkYXRhW2ldO1xuXHRcdGl0ZXJhdGlvbltzdGF0dXNdID0ge1xuXHRcdFx0aW5kZXg6IGksXG5cdFx0XHRudW1iZXI6IGkgKyAxLFxuXHRcdFx0Y291bnQ6IGxlbmd0aCxcblx0XHRcdGRhdGFcblx0XHR9O1xuXHRcdHN0b3AgPSAhKGF3YWl0IGl0ZXJhdGUoaXRlcmF0aW9uLCBvcHRpb24pKTtcblx0fVxufTtcblxuY29uc3QgaXRlcmF0ZSA9IGFzeW5jIChkYXRhLCBvcHRpb24pID0+IHtcblx0bGV0IHsgdGVtcGxhdGUsIHJlc29sdmVyLCByZW5kZXJlciwgY29udGFpbmVyLCBjb25kaXRpb24sIGNvbnRleHQgfSA9IG9wdGlvbjtcblx0cmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogZGF0YSwgbmFtZTogXCJqc3RsLWZvcmVhY2hcIiwgcGFyZW50OiByZXNvbHZlciB9KTtcblxuXHRjb25kaXRpb24gPSBjb25kaXRpb24gPyBhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZmFsc2UpIDogZmFsc2U7XG5cdGlmIChjb25kaXRpb24pXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHRjb25zdCBpdGVtQ29udGV4dCA9IGNvbnRleHQuc3ViQ29udGV4dCh7IHJlc29sdmVyLCBjb250YWluZXIsIHRlbXBsYXRlLCBtb2RlOiBcImFwcGVuZFwiIH0pO1xuXHRhd2FpdCByZW5kZXJlci5yZW5kZXIoaXRlbUNvbnRleHQpO1xuXHRhd2FpdCBpdGVtQ29udGV4dC5yZWFkeSgpO1xuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbmNsYXNzIEZvcmVhY2ggZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7IHJldHVybiBcImZvcmVhY2hcIiB9XG5cdGdldCByYW5rKCkgeyByZXR1cm4gRGlyZWN0aXZlLk1JTl9SQU5LICsgMiB9XG5cdGdldCBwaGFzZSgpIHsgcmV0dXJuIERpcmVjdGl2ZS5QSEFTRS50ZW1wbGF0ZSB9XG5cblx0YXN5bmMgZXhlY3V0ZShjb250ZXh0KSB7XG5cdFx0aWYgKCEoY29udGV4dC50ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCAoIWNvbnRleHQudGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuREFUQSkgJiYgIWNvbnRleHQudGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuQ09VTlQpKSlcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXG5cdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB7IHRlbXBsYXRlLCByZXNvbHZlciwgcmVuZGVyZXIsIGNvbnRlbnQgfSA9IGNvbnRleHQ7XG5cdFx0XHRjb25zdCBkYXRhID0gKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLkRBVEEpIHx8IFwiXCIpLnRyaW0oKTtcblx0XHRcdGNvbnN0IGNvdW50ID0gKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLkNPVU5UKSB8fCBcIlwiKS50cmltKCk7XG5cdFx0XHRjb25zdCBvcHRpb24gPSB7XG5cdFx0XHRcdGRhdGEsXG5cdFx0XHRcdGNvdW50LFxuXHRcdFx0XHRzdGFydDogYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZSh0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5TVEFSVCkgfHwgXCIwXCIpLFxuXHRcdFx0XHRzdGVwOiBhd2FpdCByZXNvbHZlci5yZXNvbHZlKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlNURVApIHx8IFwiMVwiKSxcblx0XHRcdFx0dmFybmFtZTogKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlZBUikgfHwgXCJpdGVtXCIpLnRyaW0oKSxcblx0XHRcdFx0c3RhdHVzOiAodGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuU1RBVFVTKSB8fCBcInN0YXR1c1wiKS50cmltKCksXG5cdFx0XHRcdGNvbmRpdGlvbjogdGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuQ09ORElUSU9OKSxcblx0XHRcdFx0dGVtcGxhdGU6IHRlbXBsYXRlLmNoaWxkTm9kZXMsXG5cdFx0XHRcdHJlc29sdmVyLFxuXHRcdFx0XHRyZW5kZXJlcixcblx0XHRcdFx0Y29udGFpbmVyOiBjb250ZW50LFxuXHRcdFx0XHRjb250ZXh0XG5cdFx0XHR9O1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkT3JOdWxsT3JCbGFuayhkYXRhKSAmJiAhaXNVbmRlZmluZWRPck51bGxPckJsYW5rKGNvdW50KSlcblx0XHRcdFx0YXdhaXQgZG9Db3VudChvcHRpb24pO1xuXHRcdFx0ZWxzZSBpZighaXNVbmRlZmluZWRPck51bGxPckJsYW5rKGRhdGEpKVxuXHRcdFx0XHRhd2FpdCBkb0ZvcmVhY2gob3B0aW9uKTtcblxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQganN0bC1mb3JlYWNoOlwiLCBlcnJvcik7XG5cdFx0fVxuXHRcdHJldHVybiBjb250ZXh0O1xuXG5cdH1cbn07XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBGb3JlYWNoKCkgfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5cbmNsYXNzIElmIGV4dGVuZHMgRGlyZWN0aXZlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gXCJpZlwiIH1cblx0Z2V0IHJhbmsoKSB7IHJldHVybiBEaXJlY3RpdmUuTUlOX1JBTksgKyAxMDAwIH1cblx0Z2V0IHBoYXNlKCkgeyByZXR1cm4gRGlyZWN0aXZlLlBIQVNFLmluaXQgfVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGNvbnN0IHsgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XG5cdFx0aWYgKCEodGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIXRlbXBsYXRlLmF0dHIoXCJqc3RsLWlmXCIpKVxuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0XHRjb25zdCBleHByZXNzaW9uID0gdGVtcGxhdGUuYXR0cihcImpzdGwtaWZcIik7XG5cdFx0Y29uc3QgcmVzb2x2ZXIgPSBjb250ZXh0LnJlc29sdmVyO1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoZXhwcmVzc2lvbiwgZmFsc2UpO1xuXHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBudWxsO1xuXHRcdFx0Y29udGV4dC5zdG9wID0gdHJ1ZTtcblx0XHRcdGNvbnRleHQuaWdub3JlID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxufVxuXG5EaXJlY3RpdmUuZGVmaW5lKHsgZGlyZWN0aXZlOiBuZXcgSWYoKSB9KTsiLCJpbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcbmltcG9ydCBUZW1wbGF0ZSBmcm9tIFwiLi4vVGVtcGxhdGUuanNcIjtcblxuY2xhc3MgSW5jbHVkZSBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gXCJpbmNsdWRlXCI7XG5cdH1cblx0Z2V0IHJhbmsoKSB7XG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSztcblx0fVxuXHRnZXQgcGhhc2UoKSB7XG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5QSEFTRS50ZW1wbGF0ZTtcblx0fVxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGlmICghKGNvbnRleHQudGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIWNvbnRleHQudGVtcGxhdGUuYXR0cihcImpzdGwtaW5jbHVkZVwiKSkgcmV0dXJuIGNvbnRleHQ7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHsgdGVtcGxhdGUsIHJlc29sdmVyLCByZW5kZXJlciB9ID0gY29udGV4dDtcblx0XHRcdGxldCBpbmNsdWRlID0gdGVtcGxhdGUuYXR0cihcImpzdGwtaW5jbHVkZVwiKTtcblx0XHRcdGluY2x1ZGUgPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dChpbmNsdWRlKTtcblx0XHRcdGluY2x1ZGUgPSBuZXcgVVJMKGluY2x1ZGUsIGxvY2F0aW9uKTtcblx0XHRcdGluY2x1ZGUgPSBhd2FpdCBUZW1wbGF0ZS5sb2FkKGluY2x1ZGUpO1xuXG5cdFx0XHRjb25zdCBtb2RlID0gdGVtcGxhdGUuYXR0cihcImpzdGwtaW5jbHVkZS1tb2RlXCIpIHx8IFwicmVwbGFjZVwiO1xuXG5cdFx0XHRjb25zdCBzdWJDb250ZXh0ID0gY29udGV4dC5zdWJDb250ZXh0KHsgdGVtcGxhdGU6IGluY2x1ZGUsIGNvbnRhaW5lcjogY29udGV4dC5jb250ZW50LCBtb2RlfSk7XG5cdFx0XHRhd2FpdCByZW5kZXJlci5yZW5kZXIoc3ViQ29udGV4dCk7XG5cdFx0XHRhd2FpdCBzdWJDb250ZXh0LnJlYWR5KCk7XG5cdFx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXG5cdFx0XHRyZXR1cm4gY29udGV4dDtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUsIGNvbnRleHQudGVtcGxhdGUpO1xuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cdFx0fVxuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBJbmNsdWRlKCkgfSk7XG4iLCJpbXBvcnQgRGlyZWN0aXZlIGZyb20gXCIuLi9EaXJlY3RpdmUuanNcIjtcbmltcG9ydCBSZXBsYWNlIGZyb20gXCIuLi9lbGVtZW50cy9SZXBsYWNlLmpzXCI7XG5cbmNvbnN0IE1BUktFUl9JR05PUkUgPSBcImpzdGwtaWdub3JlXCI7XG5jb25zdCBNQVJLRVJfSUdOT1JFX0NISUxEUyA9IFwianN0bC1pZ25vcmUtY2hpbGRzXCI7XG5jb25zdCBNQVJLRVJfQVNZTkMgPSBcImpzdGwtYXN5bmNcIjtcbmNvbnN0IE1BUktFUl9UQUdOQU1FID0gXCJqc3RsLXRhZ25hbWVcIjtcbmNvbnN0IE1BUktFUl9JUyA9IFwiaXNcIjtcblxuY2xhc3MgSW5pdGlhbCBleHRlbmRzIERpcmVjdGl2ZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gXCJpbml0aWFsXCI7XG5cdH1cblx0Z2V0IHJhbmsoKSB7XG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSztcblx0fVxuXHRnZXQgcGhhc2UoKSB7XG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5QSEFTRS5pbml0O1xuXHR9XG5cblx0YXN5bmMgZXhlY3V0ZShjb250ZXh0KSB7XG5cdFx0Y29uc3QgeyB0ZW1wbGF0ZSwgcmVuZGVyZXIsIHJlc29sdmVyIH0gPSBjb250ZXh0O1xuXHRcdGlmICghKHRlbXBsYXRlIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcblx0XHRcdGNvbnRleHQuY29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodGVtcGxhdGUuaGFzQXR0cmlidXRlKE1BUktFUl9JR05PUkUpKSB7XG5cdFx0XHRcdGNvbnRleHQuY29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsIHRydWUpO1xuXHRcdFx0XHRjb250ZXh0LmNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKE1BUktFUl9JR05PUkUpO1xuXHRcdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKGZhbHNlICYmIHRlbXBsYXRlLmhhc0F0dHJpYnV0ZShNQVJLRVJfQVNZTkMpKSB7XG5cdFx0XHRcdGNvbnRleHQuY29udGVudCA9IG5ldyBSZXBsYWNlKCk7XG5cdFx0XHRcdHRlbXBsYXRlLmF0dHIoTUFSS0VSX0FTWU5DLCBudWxsKTtcblx0XHRcdFx0Y29uc3QgcmVuZGVyT3B0aW9uID0gY29udGV4dC50b1JlbmRlck9wdGlvbih7IG1vZGU6IFwicmVwbGFjZVwiLCB0YXJnZXQ6IGNvbnRleHQuY29udGVudCB9KTtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0cmVuZGVyZXIucmVuZGVyKHJlbmRlck9wdGlvbik7XG5cdFx0XHRcdH0sIHBhcnNlSW50KHRlbXBsYXRlLmF0dHIoTUFSS0VSX0FTWU5DKSB8fCBcIjI1MFwiKSB8fCAyNTApO1xuXHRcdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCkge1xuXHRcdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLnRhZ05hbWUpO1xuXHRcdFx0XHRjb25zdCBzdWJDb250ZXh0ID0gY29udGV4dC5zdWJDb250ZXh0KHsgdGVtcGxhdGU6IHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2RlcywgY29udGFpbmVyOiBjb250ZXh0LmNvbnRlbnQuY29udGVudCB9KTtcblx0XHRcdFx0YXdhaXQgcmVuZGVyZXIucmVuZGVyKHN1YkNvbnRleHQpO1xuXHRcdFx0XHRjb250ZXh0LnN0b3AgPSBmYWxzZTtcblx0XHRcdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmICh0ZW1wbGF0ZS5oYXNBdHRyaWJ1dGUoTUFSS0VSX1RBR05BTUUpKSB7XG5cdFx0XHRcdGxldCB0YWduYW1lID0gdGVtcGxhdGUuYXR0cihNQVJLRVJfVEFHTkFNRSkudHJpbSgpO1xuXHRcdFx0XHRpZiAodGFnbmFtZS5sZW5ndGggPiAwKSBjb250ZXh0LmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KHRlbXBsYXRlLmF0dHIoTUFSS0VSX1RBR05BTUUpKSk7XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQuY29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsIHRydWUpO1xuXHRcdFx0XHRcdGNvbnRleHQuc3RvcCA9IHRydWU7XG5cdFx0XHRcdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRlbXBsYXRlLnRhZ05hbWUpIHtcblx0XHRcdFx0bGV0IGlzID0gdGVtcGxhdGUuYXR0cihNQVJLRVJfSVMpO1xuXHRcdFx0XHRpZiAoaXMpIHtcblx0XHRcdFx0XHRpcyA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KGlzKTtcblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZS50YWdOYW1lLCB7IGlzIH0pO1xuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cihNQVJLRVJfSVMsIGlzKTtcblx0XHRcdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBlbGVtZW50O1xuXHRcdFx0XHR9IGVsc2UgY29udGV4dC5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZS50YWdOYW1lKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnRleHQuY29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsIHRydWUpO1xuXHRcdFx0XHRjb250ZXh0LnN0b3AgPSB0cnVlO1xuXHRcdFx0XHRjb250ZXh0Lmlnbm9yZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghY29udGV4dC5zdG9wICYmIHRlbXBsYXRlLmhhc0F0dHJpYnV0ZShNQVJLRVJfSUdOT1JFX0NISUxEUykpIHtcblx0XHRcdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdFx0XHRjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUsIHRydWUpO1xuXHRcdFx0XHRpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MVGVtcGxhdGVFbGVtZW50KSBjb250ZXh0LmNvbnRlbnQuY29udGVudC5hcHBlbmQoY2xvbmUuY29udGVudCk7XG5cdFx0XHRcdGVsc2UgY29udGV4dC5jb250ZW50LmFwcGVuZChjbG9uZS5jaGlsZE5vZGVzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxufVxuXG5EaXJlY3RpdmUuZGVmaW5lKHsgZGlyZWN0aXZlOiBuZXcgSW5pdGlhbCgpIH0pO1xuIiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5cbmNvbnN0IE5BTUUgPSBcIm9uLWZpbmlzaGVkXCI7XG5jb25zdCBBVFRSSUJVVEVfT05fRklOSVNIRUQgPSBganN0bC0ke05BTUV9YDtcbmNvbnN0IEFUVFJJQlVURV9PTl9GSU5JU0hFRF9BU1lOQyA9IGAke0FUVFJJQlVURV9PTl9GSU5JU0hFRH0tYXN5bmNgO1xuXG5jbGFzcyBPbkZpbmlzaGVkIGV4dGVuZHMgRGlyZWN0aXZlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gTkFNRSB9XG5cdGdldCByYW5rKCkgeyByZXR1cm4gRGlyZWN0aXZlLk1BWF9SQU5LIH1cblx0Z2V0IHBoYXNlKCkgeyByZXR1cm4gRGlyZWN0aXZlLlBIQVNFLmZpbmlzaCB9XG5cblxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGNvbnN0IHsgdGVtcGxhdGUsIGNvbnRlbnQsIHJvb3QgfSA9IGNvbnRleHQ7XG5cdFx0aWYgKCEodGVtcGxhdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgIXRlbXBsYXRlLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfT05fRklOSVNIRUQpKVxuXHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cblx0XHRjb25zdCBleHByZXNzaW9uID0gdGVtcGxhdGUuYXR0cihBVFRSSUJVVEVfT05fRklOSVNIRUQpO1xuXHRcdGNvbnN0IGFzeW5jQ2FsbCA9IHRlbXBsYXRlLmhhc0F0dHJpYnV0ZShBVFRSSUJVVEVfT05fRklOSVNIRURfQVNZTkMpO1xuXG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdCRlbGVtZW50OiBjb250ZW50LFxuXHRcdFx0JHJvb3Q6IHJvb3QsXG5cdFx0XHQkdGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0fTtcblx0XHRjb25zdCByZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIoeyBjb250ZXh0OiBkYXRhLCBuYW1lOiBcImpzdGwtZGF0YVwiLCBwYXJlbnQ6IGNvbnRleHQucmVzb2x2ZXIgfSk7XG5cblxuXHRcdGNvbnRleHQuZmluaXNoZWQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYoIWFzeW5jQ2FsbClcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShleHByZXNzaW9uLCBudWxsKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0cmVzb2x2ZXIucmVzb2x2ZShleHByZXNzaW9uLCBudWxsKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBPbkZpbmlzaGVkKCkgfSk7IiwiaW1wb3J0IERpcmVjdGl2ZSBmcm9tIFwiLi4vRGlyZWN0aXZlLmpzXCI7XG5pbXBvcnQgRXhwcmVzc2lvblJlc29sdmVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtZXhwcmVzc2lvbi1sYW5ndWFnZS9zcmMvRXhwcmVzc2lvblJlc29sdmVyLmpzXCI7XG5cbmNvbnN0IERJUkVDVElWRU5BTUUgPSBcImpzdGwtcmVwZWF0XCI7XG5jb25zdCBJR05PUkVESVJFQ1RJVkUgPSBuZXcgU2V0KFtESVJFQ1RJVkVOQU1FXSk7XG5cbmNvbnN0IEFUVFJJQlVURSA9IHtcblx0REFUQTogYCR7RElSRUNUSVZFTkFNRX1gLFxuXHRWQVI6IGAke0RJUkVDVElWRU5BTUV9LXZhcmAsXG5cdFNUQVRVUzogYCR7RElSRUNUSVZFTkFNRX0tc3RhdHVzYCxcblx0Q09VTlQ6IGAke0RJUkVDVElWRU5BTUV9LWNvdW50YCxcblx0U1RBUlQ6IGAke0RJUkVDVElWRU5BTUV9LXN0YXJ0YCxcblx0U1RFUDogYCR7RElSRUNUSVZFTkFNRX0tc3RlcGAsXG5cdENPTkRJVElPTjogYCR7RElSRUNUSVZFTkFNRX0tY29uZGl0aW9uYCxcbn07XG5cbmNvbnN0IGRvQ291bnQgPSBhc3luYyAob3B0aW9uKSA9PiB7XG5cdGxldCB7IHN0YXJ0LCBzdGVwLCBjb3VudCwgdmFybmFtZSwgc3RhdHVzLCByZXNvbHZlciB9ID0gb3B0aW9uO1xuXHRjb3VudCA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoY291bnQpO1xuXHRjb25zdCBsZW5ndGggPSBzdGFydCArIGNvdW50ICogc3RlcDtcblx0bGV0IHN0b3AgPSBmYWxzZTtcblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbGVuZ3RoICYmICFzdG9wOyBpID0gaSArIHN0ZXApIHtcblx0XHRjb25zdCBpdGVyYXRpb24gPSB7fTtcblx0XHRpdGVyYXRpb25bdmFybmFtZV0gPSBpO1xuXHRcdGl0ZXJhdGlvbltzdGF0dXNdID0ge1xuXHRcdFx0aW5kZXg6IGksXG5cdFx0XHRudW1iZXI6IGkgKyAxLFxuXHRcdFx0c3RlcCxcblx0XHRcdGNvdW50LFxuXHRcdH07XG5cdFx0c3RvcCA9ICEoYXdhaXQgaXRlcmF0ZShpdGVyYXRpb24sIG9wdGlvbikpO1xuXHR9XG59O1xuXG5jb25zdCBkb1JlcGVhdCA9IGFzeW5jIChvcHRpb24pID0+IHtcblx0bGV0IHsgZGF0YSwgc3RhcnQsIHN0ZXAsIGNvdW50LCB2YXJuYW1lLCBzdGF0dXMsIHJlc29sdmVyIH0gPSBvcHRpb247XG5cblx0ZGF0YSA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmUoZGF0YSk7XG5cdGxldCBhcnJheSA9IGRhdGE7XG5cdGlmICghKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIGFycmF5ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSk7XG5cblx0Y291bnQgPSBjb3VudCAhPSBcIlwiID8gYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZShjb3VudCwgMCkgOiBudWxsO1xuXHRjb25zdCBsZW5ndGggPSBjb3VudCA/IE1hdGgubWluKHN0YXJ0ICsgY291bnQsIGFycmF5Lmxlbmd0aCkgOiBhcnJheS5sZW5ndGg7XG5cdGxldCBzdG9wID0gZmFsc2U7XG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGxlbmd0aCAmJiAhc3RvcDsgaSA9IGkgKyBzdGVwKSB7XG5cdFx0Y29uc3QgaXRlcmF0aW9uID0ge307XG5cdFx0aXRlcmF0aW9uW3Zhcm5hbWVdID0gZGF0YVtpXTtcblx0XHRpdGVyYXRpb25bc3RhdHVzXSA9IHtcblx0XHRcdGluZGV4OiBpLFxuXHRcdFx0bnVtYmVyOiBpICsgMSxcblx0XHRcdGNvdW50OiBsZW5ndGgsXG5cdFx0XHRkYXRhLFxuXHRcdH07XG5cdFx0c3RvcCA9ICEoYXdhaXQgaXRlcmF0ZShpdGVyYXRpb24sIG9wdGlvbikpO1xuXHR9XG59O1xuXG5jb25zdCBpdGVyYXRlID0gYXN5bmMgKGRhdGEsIG9wdGlvbikgPT4ge1xuXHRsZXQgeyB0ZW1wbGF0ZSwgcmVzb2x2ZXIsIHJlbmRlcmVyLCBjb25kaXRpb24sIGNvbnRleHQgfSA9IG9wdGlvbjtcblx0cmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKHsgY29udGV4dDogZGF0YSwgbmFtZTogRElSRUNUSVZFTkFNRSwgcGFyZW50OiByZXNvbHZlciB9KTtcblxuXHRjb25kaXRpb24gPSBjb25kaXRpb24gPyBhd2FpdCByZXNvbHZlci5yZXNvbHZlKGNvbmRpdGlvbiwgZmFsc2UpIDogZmFsc2U7XG5cdGlmIChjb25kaXRpb24pIHJldHVybiBmYWxzZTtcblxuXHRjb25zdCBpdGVtQ29udGV4dCA9ICBjb250ZXh0LnN1YkNvbnRleHQoeyByZXNvbHZlciwgdGVtcGxhdGUsIG1vZGU6IFwiYXBwZW5kXCIsIGlnbm9yZURpcmVjdGl2ZTogSUdOT1JFRElSRUNUSVZFIH0pXG5cdGF3YWl0IHJlbmRlcmVyLnJlbmRlcihpdGVtQ29udGV4dCk7XG5cdGF3YWl0IGl0ZW1Db250ZXh0LnJlYWR5KCk7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG5jbGFzcyBSZXBlYXQgZXh0ZW5kcyBEaXJlY3RpdmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIERJUkVDVElWRU5BTUU7XG5cdH1cblx0Z2V0IHJhbmsoKSB7XG5cdFx0cmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDM7XG5cdH1cblx0Z2V0IHBoYXNlKCkge1xuXHRcdHJldHVybiBEaXJlY3RpdmUuUEhBU0UudGVtcGxhdGU7XG5cdH1cblxuXHRhc3luYyBleGVjdXRlKGNvbnRleHQpIHtcblx0XHRpZiAoIShjb250ZXh0LnRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICghY29udGV4dC50ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5EQVRBKSAmJiAhY29udGV4dC50ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5DT1VOVCkpKSByZXR1cm4gY29udGV4dDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB7IHRlbXBsYXRlLCByZXNvbHZlciwgcmVuZGVyZXIsIGNvbnRlbnQsIGNvbnRhaW5lciB9ID0gY29udGV4dDtcblx0XHRcdGNvbnN0IG9wdGlvbiA9IHtcblx0XHRcdFx0ZGF0YTogKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLkRBVEEpIHx8IFwiXCIpLnRyaW0oKSxcblx0XHRcdFx0Y291bnQ6ICh0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5DT1VOVCkgfHwgXCJcIikudHJpbSgpLFxuXHRcdFx0XHRzdGFydDogYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZSh0ZW1wbGF0ZS5hdHRyKEFUVFJJQlVURS5TVEFSVCkgfHwgXCIwXCIpLFxuXHRcdFx0XHRzdGVwOiBhd2FpdCByZXNvbHZlci5yZXNvbHZlKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlNURVApIHx8IFwiMVwiKSxcblx0XHRcdFx0dmFybmFtZTogKHRlbXBsYXRlLmF0dHIoQVRUUklCVVRFLlZBUikgfHwgXCJpdGVtXCIpLnRyaW0oKSxcblx0XHRcdFx0c3RhdHVzOiAodGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuU1RBVFVTKSB8fCBcInN0YXR1c1wiKS50cmltKCksXG5cdFx0XHRcdGNvbmRpdGlvbjogdGVtcGxhdGUuYXR0cihBVFRSSUJVVEUuQ09ORElUSU9OKSxcblx0XHRcdFx0dGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0XHR0YWduYW1lOiBjb250ZW50LnRhZ05hbWUsXG5cdFx0XHRcdHJlc29sdmVyLFxuXHRcdFx0XHRyZW5kZXJlcixcblx0XHRcdFx0Y29udGFpbmVyLFxuXHRcdFx0XHRjb250ZXh0LFxuXHRcdFx0fTtcblx0XHRcdGlmICgoIW9wdGlvbi5kYXRhIHx8IG9wdGlvbi5kYXRhID09IFwiXCIpICYmIG9wdGlvbi5jb3VudCkgYXdhaXQgZG9Db3VudChvcHRpb24pO1xuXHRcdFx0ZWxzZSBhd2FpdCBkb1JlcGVhdChvcHRpb24pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgYXQganN0bC1yZXBlYXQ6XCIsIGVycm9yKTtcblx0XHR9XG5cblx0XHRjb250ZXh0LmNvbnRlbnQgPSBudWxsO1xuXHRcdGNvbnRleHQuc3RvcCA9IHRydWU7XG5cdFx0Y29udGV4dC5pZ25vcmUgPSB0cnVlO1xuXHRcdHJldHVybiBjb250ZXh0O1xuXHR9XG59XG5cbkRpcmVjdGl2ZS5kZWZpbmUoeyBkaXJlY3RpdmU6IG5ldyBSZXBlYXQoKSB9KTtcbiIsImltcG9ydCBEaXJlY3RpdmUgZnJvbSBcIi4uL0RpcmVjdGl2ZS5qc1wiO1xuXG5jb25zdCBERUZBVUxUX09QVElPTiA9IHtcblx0bW9kZTogXCJ0ZXh0XCIsXG5cdHVuc2VjdXJlOiBmYWxzZSxcblx0cHJldmVudEZvcm1hdCA6IGZhbHNlLFxuXHRtYXhMZW5ndGg6IDBcdFxufTtcblxuY29uc3QgU0VDVVJFX0hUTUxfRklMVEVSID0gXCJzY3JpcHQsIHN0eWxlLCBib2R5LCBodG1sLCBoZWFkLCBvYmplY3QsIGxpbmtcIjtcblxuY29uc3QgcmVhZE9wdGlvbiA9IGFzeW5jIChwYXJlbnQsIGNvbnRleHQpID0+IHtcblx0Y29uc3QgcmVzb2x2ZXIgPSBjb250ZXh0LnJlc29sdmVyO1xuXHRyZXR1cm4ge1xuXHRcdG1vZGU6IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KChwYXJlbnQuYXR0cihcImpzdGwtdGV4dC1jb250ZW50LXR5cGVcIikgfHwgXCJ0ZXh0XCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSxcblx0XHR1bnNlY3VyZTogcGFyZW50Lmhhc0F0dHJpYnV0ZShcImpzdGwtdGV4dC11bnNlY3VyZVwiKSxcblx0XHRwcmV2ZW50Rm9ybWF0OiAhIXBhcmVudC5hdHRyKFwianN0bC10ZXh0LXByZXZlbnQtZm9ybWF0XCIpIHx8IGZhbHNlLFxuXHRcdG1heExlbmd0aDogcGFyc2VJbnQoYXdhaXQgcmVzb2x2ZXIucmVzb2x2ZVRleHQocGFyZW50LmF0dHIoXCJqc3RsLXRleHQtdHJpbS1sZW5ndGhcIikgfHwgXCIwXCIpKVxuXHR9O1xufTtcblxuY29uc3QgdHJpbVRleHRMZW5ndGggPSAodGV4dCwgbGVuZ3RoKSA9PiB7XG5cdHJldHVybiB0ZXh0Lmxlbmd0aCA+IGxlbmd0aCA/IHRleHQuc3Vic3RyaW5nKDAsIGxlbmd0aCAtIDMpLnRyaW0oKSArIFwiLi4uXCIgOiB0ZXh0O1xufTtcblxuY29uc3QgTU9ERVMgPSB7XG5cdFwidGV4dFwiIDogYXN5bmMgKG9wdGlvbiwgY29udGV4dCkgPT4ge1xuXHRcdGNvbnN0IHtjb250ZW50LCByZXNvbHZlciwgdGVtcGxhdGV9ID0gY29udGV4dDtcblx0XHRcblx0XHRsZXQgdGV4dCA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVUZXh0KHRlbXBsYXRlLnRleHRDb250ZW50KTtcdFx0XG5cdFx0dGV4dCA9IGNyZWF0ZSh0ZXh0LHRydWUpLmNvbnRlbnQudGV4dENvbnRlbnQ7XG5cdFx0aWYob3B0aW9uLm1heExlbmd0aCA+IDApXG5cdFx0XHR0ZXh0ID0gdHJpbVRleHRMZW5ndGgodGV4dCwgb3B0aW9uLm1heExlbmd0aCk7XHRcdFxuXHRcdFxuXHRcdGNvbnRlbnQudGV4dENvbnRlbnQgPSB0ZXh0O1x0XHRcblx0fSxcblx0XCJodG1sXCI6IGFzeW5jIChvcHRpb24sIGNvbnRleHQpID0+IHtcblx0XHRjb25zdCB7cmVzb2x2ZXIsIHRlbXBsYXRlfSA9IGNvbnRleHQ7XG5cdFx0XG5cdFx0bGV0IGNvbnRlbnQgPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlVGV4dCh0ZW1wbGF0ZS50ZXh0Q29udGVudCk7XHRcdFxuXHRcdGNvbnRlbnQgPSBjcmVhdGUoY29udGVudCx0cnVlKTtcdFx0XG5cdFx0Y29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUoY29udGVudC5jb250ZW50LCB0cnVlKTtcblx0XHRcblx0XHRpZihvcHRpb24udW5zZWN1cmUpXG5cdFx0XHRjb250ZXh0LmNvbnRlbnQgPSBjb250ZW50O1x0XHRcdFxuXHRcdGVsc2V7XG5cdFx0XHRjb250ZW50LmZpbmQoU0VDVVJFX0hUTUxfRklMVEVSKS5yZW1vdmUoKTtcdFx0XHRcblx0XHRcdGNvbnRleHQuY29udGVudCA9IGNvbnRlbnQ7XG5cdFx0fVxuXHR9XG59O1xuXG5cbmNsYXNzIFRleHRDb250ZW50IGV4dGVuZHMgRGlyZWN0aXZlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGdldCBuYW1lKCkgeyByZXR1cm4gXCJ0ZXh0XCIgfVxuXHRnZXQgcmFuaygpIHsgcmV0dXJuIERpcmVjdGl2ZS5NSU5fUkFOSyArIDEgfVxuXHRnZXQgcGhhc2UoKSB7IHJldHVybiBEaXJlY3RpdmUuUEhBU0UuY29udGVudCB9XG5cblxuXG5cdGFzeW5jIGV4ZWN1dGUoY29udGV4dCkge1xuXHRcdGNvbnN0IHsgdGVtcGxhdGUgfSA9IGNvbnRleHQ7XG5cdFx0aWYgKCEodGVtcGxhdGUgaW5zdGFuY2VvZiBUZXh0KSB8fCB0ZW1wbGF0ZS50ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09IDAgfHwgKHRlbXBsYXRlLnBhcmVudEVsZW1lbnQgJiYgdGVtcGxhdGUucGFyZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJqc3RsLXRleHQtaWdub3JlXCIpKSlcblx0XHRcdHJldHVybiBjb250ZXh0O1xuXG5cdFx0Y29uc3QgcGFyZW50ID0gdGVtcGxhdGUucGFyZW50RWxlbWVudDtcblx0XHRjb25zdCBvcHRpb24gPSBwYXJlbnQgPyBhd2FpdCByZWFkT3B0aW9uKHBhcmVudCwgY29udGV4dCkgOiBERUZBVUxUX09QVElPTjtcblx0XHRcblx0XHRjb25zdCAgbW9kZSA9IE1PREVTW29wdGlvbi5tb2RlXTtcblx0XHRpZighbW9kZSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRleHQgbW9kZSBcXFwiXCIrIG9wdGlvbi5tb2RlICsgXCJcXFwiIGlzIHVuc3VwcG9ydGVkIVwiKTtcblx0XHRcblx0XHRhd2FpdCBtb2RlKG9wdGlvbiwgY29udGV4dCk7XG5cdFx0XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH1cbn1cblxuRGlyZWN0aXZlLmRlZmluZSh7IGRpcmVjdGl2ZTogbmV3IFRleHRDb250ZW50KCkgfSk7IiwiaW1wb3J0IFwiLi9Jbml0aWFsLmpzXCI7XG5pbXBvcnQgXCIuL0RhdGEuanNcIjtcbmltcG9ydCBcIi4vSWYuanNcIjtcbmltcG9ydCBcIi4vQ2hvb3NlLmpzXCI7XG5pbXBvcnQgXCIuL0luY2x1ZGUuanNcIjtcbmltcG9ydCBcIi4vRm9yZWFjaC5qc1wiO1xuaW1wb3J0IFwiLi9SZXBlYXQuanNcIjtcbmltcG9ydCBcIi4vVGV4dC5qc1wiO1xuaW1wb3J0IFwiLi9BdHRyaWJ1dGVzLmpzXCI7XG5pbXBvcnQgXCIuL0F0dGFjaEVsZW1lbnQuanNcIjtcbmltcG9ydCBcIi4vT25GaW5pc2hlZC5qc1wiOyIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9FbGVtZW50LmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbGFjZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXHR9XG5cdGFzeW5jIGV4ZWN1dGUoe3RlbXBsYXRlLCBjb250ZXh0fSl7XG5cdFx0cmV0dXJuIGNvbnRleHQ7XG5cdH07XHRcdFxufVxudHJ5e2N1c3RvbUVsZW1lbnRzLmRlZmluZShcImpzdGwtcmVwbGFjZVwiLCBSZXBsYWNlRWxlbWVudCk7fWNhdGNoKGUpe30vL2lnbm9yZSIsImltcG9ydCBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHRkb21cIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvblJlc29sdmVyIH0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1leHByZXNzaW9uLWxhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyLCBUZW1wbGF0ZSB9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtdGVtcGxhdGUtbGFuZ3VhZ2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSX19UWVBFID0gXCJ0eXBlXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSX19DTEFTU19OQU1FID0gXCJjbGFzcy1uYW1lXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSX19BVFRSSUJVVEVfTkFNRSA9IFwiYXR0cmlidXRlLW5hbWVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJfX0VWRU5UX05BTUUgPSBcImV2ZW50LW5hbWVcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJfX0RFVEFJTCA9IFwiZGV0YWlsXCI7XHJcbmV4cG9ydCBjb25zdCBBVFRSX19TRUxFQ1RPUiA9IFwic2VsZWN0b3JcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJfX0NPTlRFWFQgPSBcImNvbnRleHRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJfX1RFTVBMQVRFID0gXCJ0ZW1wbGF0ZVwiO1xyXG5leHBvcnQgY29uc3QgQVRUUl9fUkVOREVSX01PREUgPSBcInJlbmRlci1tb2RlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQVRUUl9fUFJFVkVOVF9ERUZBVUxUID0gXCJwcmV2ZW50LWRlZmF1bHRcIjtcclxuZXhwb3J0IGNvbnN0IEFUVFJfX1NUT1BfUFJPUEFHQVRJT04gPSBcInN0b3AtcHJvcGFnYXRpb25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBVFRSSUJVVEVTID0gW107IC8vW0FUVFJfX1RZUEUsIEFUVFJfX0FDVElPTiwgQVRUUl9fU0VMRUNUT1IsIEFUVFJfX0NPTlRFWFQsIEFUVFJfX1RFTVBMQVRFXTtcclxuXHJcbmV4cG9ydCBjb25zdCBUWVBFX19ERUxFR0FURSA9IFwiZGVsZWdhdGVcIjtcclxuZXhwb3J0IGNvbnN0IFRZUEVfX1RPR0dMRV9DTEFTUyA9IFwidG9nZ2xlLWNsYXNzXCI7XHJcbmV4cG9ydCBjb25zdCBUWVBFX19UT0dHTEVfQVRUUklCVVRFID0gXCJ0b2dnbGUtYXR0cmlidXRlXCI7XHJcbmV4cG9ydCBjb25zdCBUWVBFX19DQUxMX1JFTkRFUkVSID0gXCJjYWxsLXJlbmRlcmVyXCI7XHJcbmV4cG9ydCBjb25zdCBUWVBFX19SRU5ERVIgPSBcInJlbmRlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZBUl9fRVZFTlQgPSBcIiRldmVudFwiO1xyXG5cclxuY29uc3QgQ0hFQ0tfUkVOREVSRVIgPSAvZC1yZW5kZXJlci9pO1xyXG5cclxuY29uc3QgbG9hZFRlbXBsYXRlID0gYXN5bmMgKHRlbXBsYXRlKSA9PiB7XHJcblx0dHJ5e1xyXG5cdFx0Y29uc3Qgbm9kZSA9IGZpbmQodGVtcGxhdGUpLmZpcnN0KCk7XHJcblx0XHRpZihub2RlKVxyXG5cdFx0XHRyZXR1cm4gVGVtcGxhdGUubG9hZChub2RlKTtcclxuXHR9Y2F0Y2goZSl7fVxyXG5cclxuXHRyZXR1cm4gVGVtcGxhdGUubG9hZChuZXcgVVJMKHRlbXBsYXRlLCBsb2NhdGlvbikpO1xyXG59XHJcblxyXG5jb25zdCBjbG9uZUV2ZW50ID0gKGV2ZW50KSA9PiB7XHJcblx0Y29uc3QgeyB0YXJnZXQsIGN1cnJlbnRUYXJnZXQsIGRldGFpbCwgdGltZVN0YW1wIH0gPSBldmVudDtcclxuXHRyZXR1cm4geyB0YXJnZXQsIGN1cnJlbnRUYXJnZXQsIGRldGFpbCwgdGltZVN0YW1wIH07XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlVGV4dCA9IGFzeW5jICh0ZXh0LCBjb250ZXh0KSA9PiB7XHJcblx0cmV0dXJuIEV4cHJlc3Npb25SZXNvbHZlci5yZXNvbHZlVGV4dCh0ZXh0LCBjb250ZXh0LCBudWxsKTtcclxufTtcclxuXHJcbmNvbnN0IFRZUEUgPSB7XHJcblx0W1RZUEVfX0RFTEVHQVRFXTogYXN5bmMgKHsgdGFyZ2V0cywgZXZlbnRuYW1lIH0sIGNvbnRleHQpID0+IHtcclxuXHRcdGV2ZW50bmFtZSA9IGF3YWl0IHJlc29sdmVUZXh0KGV2ZW50bmFtZSwgY29udGV4dCk7XHJcblx0XHRpZiAoZXZlbnRuYW1lKSB0YXJnZXRzLnRyaWdnZXIoZXZlbnRuYW1lLCBjb250ZXh0KTtcclxuXHR9LFxyXG5cdFtUWVBFX19UT0dHTEVfQ0xBU1NdOiBhc3luYyAoeyB0YXJnZXRzLCBjbGFzc25hbWUgfSwgY29udGV4dCkgPT4ge1xyXG5cdFx0Y2xhc3NuYW1lID0gYXdhaXQgcmVzb2x2ZVRleHQoY2xhc3NuYW1lLCBjb250ZXh0KTtcclxuXHRcdGlmIChjbGFzc25hbWUpIHRhcmdldHMudG9nZ2xlQ2xhc3MoY2xhc3NuYW1lKTtcclxuXHR9LFxyXG5cdFtUWVBFX19UT0dHTEVfQVRUUklCVVRFXTogYXN5bmMgKHsgdGFyZ2V0cywgYXR0cmlidXRlbmFtZSB9LCBjb250ZXh0KSA9PiB7XHJcblx0XHRhdHRyaWJ1dGVuYW1lID0gYXdhaXQgcmVzb2x2ZVRleHQoYXR0cmlidXRlbmFtZSwgY29udGV4dCk7XHJcblx0XHRpZiAoYXR0cmlidXRlbmFtZSkge1xyXG5cdFx0XHRpZiAodGFyZ2V0cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB0YXJnZXRzID0gW3RhcmdldHNdO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xyXG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LmF0dHIoYXR0cmlidXRlbmFtZSk7XHJcblx0XHRcdFx0dGFyZ2V0LmF0dHIoYXR0cmlidXRlbmFtZSwgdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiBudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0W1RZUEVfX0NBTExfUkVOREVSRVJdOiBhc3luYyAoeyB0YXJnZXRzIH0sIGNvbnRleHQpID0+IHtcclxuXHRcdGlmICh0YXJnZXRzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHRhcmdldHMgPSBbdGFyZ2V0c107XHJcblxyXG5cdFx0Zm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xyXG5cdFx0XHRjb25zdCBub2RlbmFtZSA9IHRhcmdldC5ub2RlTmFtZTtcclxuXHRcdFx0aWYgKENIRUNLX1JFTkRFUkVSLnRlc3Qobm9kZW5hbWUpICYmIHR5cGVvZiB0YXJnZXQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0LnJlbmRlcih7IGRhdGE6IGNvbnRleHQgfSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcih7IGUsIGJ1dHRvbiwgdGFyZ2V0IH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0W1RZUEVfX1JFTkRFUl06IGFzeW5jICh7IHRhcmdldHMsIHRlbXBsYXRlLCByZW5kZXJNb2RlIH0sIGNvbnRleHQpID0+IHtcclxuXHRcdHRlbXBsYXRlID0gYXdhaXQgcmVzb2x2ZVRleHQodGVtcGxhdGUsIGNvbnRleHQpO1xyXG5cdFx0aWYgKHRlbXBsYXRlKSB0ZW1wbGF0ZSA9IGF3YWl0IGxvYWRUZW1wbGF0ZSh0ZW1wbGF0ZSk7XHJcblxyXG5cdFx0aWYgKHRhcmdldHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgdGFyZ2V0cyA9IFt0YXJnZXRzXTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IHRhcmdldCBvZiB0YXJnZXRzKSBSZW5kZXJlci5yZW5kZXIoeyBjb250YWluZXI6IHRhcmdldCwgdGVtcGxhdGUsIGRhdGE6IGNvbnRleHQsIG1vZGU6IHJlbmRlck1vZGUgfHwgXCJyZXBsYWNlXCIgfSk7XHJcblx0fSxcclxufTtcclxuXHJcbmNsYXNzIEJ1dHRvbkxvZ2ljIHtcclxuXHQjZWxlbWVudDtcclxuXHQjY29udGV4dDtcclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcblx0XHR0aGlzLiNlbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdGVsZW1lbnQub24oXCJjbGlja1wiLCAoZXZlbnQpID0+IHRoaXMuZXhlY3V0ZShldmVudCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHt9XHJcblxyXG5cdGFzeW5jIGRlc3Ryb3koKSB7fVxyXG5cclxuXHRhdHRyKGtleSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2VsZW1lbnQuYXR0cihrZXkpO1xyXG5cdH1cclxuXHJcblx0ZmluZChzZWxlY3Rvcikge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2VsZW1lbnQuZmluZChzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRnZXQgdHlwZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9fVFlQRSk7XHJcblx0fVxyXG5cclxuXHRnZXQgc2VsZWN0b3IoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJfX1NFTEVDVE9SKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb250ZXh0KCkge1xyXG5cdFx0aWYgKHRoaXMuI2NvbnRleHQgPT0gbnVsbCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy5hdHRyKEFUVFJfX0NPTlRFWFQpO1xyXG5cdFx0XHRcdGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggIT0gMCkgdGhpcy4jY29udGV4dCA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy4jY29udGV4dCA9IHt9O1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0dGhpcy4jY29udGV4dCA9IHt9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy4jY29udGV4dDtcclxuXHR9XHJcblxyXG5cdGdldCBldmVudG5hbWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9fRVZFTlRfTkFNRSk7XHJcblx0fVxyXG5cclxuXHRnZXQgY2xhc3NuYW1lKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hdHRyKEFUVFJfX0NMQVNTX05BTUUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGF0dHJpYnV0ZW5hbWUoKXtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9fQVRUUklCVVRFX05BTUUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHRlbXBsYXRlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSX19URU1QTEFURSk7XHJcblx0fVxyXG5cclxuXHRnZXQgcmVuZGVybW9kZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0dHIoQVRUUl9fUkVOREVSX01PREUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHRhcmdldHMoKSB7XHJcblx0XHRjb25zdCBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3I7XHJcblx0XHRpZiAoc2VsZWN0b3IgJiYgc2VsZWN0b3IubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0bGV0IHRhcmdldHMgPSB0aGlzLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAodGFyZ2V0cyAmJiB0YXJnZXRzLmxlbmd0aCAhPSAwKSByZXR1cm4gdGFyZ2V0cztcclxuXHRcdFx0dGFyZ2V0cyA9IGZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHRpZiAodGFyZ2V0cyAmJiB0YXJnZXRzLmxlbmd0aCAhPSAwKSByZXR1cm4gdGFyZ2V0cztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLiNlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0IHByZXZlbnREZWZhdWx0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSX19QUkVWRU5UX0RFRkFVTFQpICE9IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXQgc3RvcFByb3BhZ2F0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXR0cihBVFRSX19TVE9QX1BST1BBR0FUSU9OKSAhPSBudWxsO1xyXG5cdH1cclxuXHJcblx0ZXhlY3V0ZShldmVudCkge1xyXG5cdFx0Y29uc3QgdHlwZSA9IFRZUEVbdGhpcy50eXBlXTtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSB7XHJcblx0XHRcdCR0eXBlOiB0eXBlLFxyXG5cdFx0XHQkZXZlbnQ6Y2xvbmVFdmVudChldmVudCksXHJcblx0XHRcdCRjb250ZXh0OiB0aGlzLmNvbnRleHQsXHJcblx0XHRcdCRkYXRhOiB0aGlzLiNlbGVtZW50LmRhdGEoKVxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnByZXZlbnREZWZhdWx0KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0aWYgKHRoaXMuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcclxuXHRcdGlmICh0eXBlKSB7XHJcblx0XHRcdHR5cGUodGhpcywgY29udGV4dCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Mb2dpYztcclxuIiwiaW1wb3J0IHtjb21wb25lbnRQcmVmaXh9IGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtaHRtbC1jb21wb25lbnRzL3NyYy9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBOT0RFTkFNRV9fQlVUVE9OID0gYCR7Y29tcG9uZW50UHJlZml4fWFjdGlvbi1idXR0b25gO1xyXG5leHBvcnQgY29uc3QgTk9ERU5BTUVfX0FOQ0hPUiA9IGAke2NvbXBvbmVudFByZWZpeH1hY3Rpb24tYW5jaG9yYDsiLCJpbXBvcnQge05PREVOQU1FX19BTkNIT1J9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQge2NvbXBvbmVudEJhc2VPZiwgZGVmaW5lfSBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0bWwtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgQnV0dG9uTG9naWMsIHtBVFRSSUJVVEVTfSBmcm9tIFwiLi9CdXR0b25Mb2dpY1wiO1xyXG5cclxuY2xhc3MgSFRNTERlZmF1bHRqc0FuY2hvckVsZW1lbnQgZXh0ZW5kcyBjb21wb25lbnRCYXNlT2YoSFRNTEFuY2hvckVsZW1lbnQpe1xyXG4gICAgc3RhdGljIE5PREVOQU1FID0gTk9ERU5BTUVfX0FOQ0hPUjtcclxuXHJcbiAgICAjbG9naWM7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLiNsb2dpYyA9IG5ldyBCdXR0b25Mb2dpYyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0KCl7XHJcbiAgICAgICAgYXdhaXQgc3VwZXIuaW5pdCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuI2xvZ2ljLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZXN0cm95KCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy4jbG9naWMuZGVzdHJveSgpOyAgICAgICAgXHJcbiAgICAgICAgYXdhaXQgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZGVmaW5lKEhUTUxEZWZhdWx0anNBbmNob3JFbGVtZW50LCB7ZXh0ZW5kczogXCJhXCJ9KTtcclxuZXhwb3J0IGRlZmF1bHQgSFRNTERlZmF1bHRqc0FuY2hvckVsZW1lbnQ7IiwiaW1wb3J0IHtOT0RFTkFNRV9fQlVUVE9OfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHtjb21wb25lbnRCYXNlT2YsIGRlZmluZX0gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1odG1sLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IEJ1dHRvbkxvZ2ljLCB7QVRUUklCVVRFU30gZnJvbSBcIi4vQnV0dG9uTG9naWNcIjtcclxuXHJcbmNsYXNzIEhUTUxEZWZhdWx0anNCdXR0b25FbGVtZW50IGV4dGVuZHMgY29tcG9uZW50QmFzZU9mKEhUTUxCdXR0b25FbGVtZW50KXtcclxuICAgIHN0YXRpYyBOT0RFTkFNRSA9IE5PREVOQU1FX19CVVRUT047XHJcblxyXG4gICAgI2xvZ2ljO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy4jbG9naWMgPSBuZXcgQnV0dG9uTG9naWModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdCgpe1xyXG4gICAgICAgIGF3YWl0IHN1cGVyLmluaXQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLiNsb2dpYy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVzdHJveSgpe1xyXG4gICAgICAgIGF3YWl0IHRoaXMuI2xvZ2ljLmRlc3Ryb3koKTsgICAgICAgIFxyXG4gICAgICAgIGF3YWl0IHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxufTtcclxuXHJcbmRlZmluZShIVE1MRGVmYXVsdGpzQnV0dG9uRWxlbWVudCwge2V4dGVuZHM6IFwiYnV0dG9uXCJ9KTtcclxuZXhwb3J0IGRlZmF1bHQgSFRNTERlZmF1bHRqc0J1dHRvbkVsZW1lbnQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWV4dGRvbVwiO1xuaW1wb3J0IEdMT0JBTCBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvR2xvYmFsXCI7XG5pbXBvcnQge0hUTUxEZWZhdWx0anNBbmNob3JFbGVtZW50LCBIVE1MRGVmYXVsdGpzQnV0dG9uRWxlbWVudH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgcGFjayA9IHtWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsIEhUTUxEZWZhdWx0anNBbmNob3JFbGVtZW50LCBIVE1MRGVmYXVsdGpzQnV0dG9uRWxlbWVudCB9O1xuXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcbkdMT0JBTC5kZWZhdWx0anMuaHRtbCA9IEdMT0JBTC5kZWZhdWx0anMuaHRtbCB8fCB7fTtcbkdMT0JBTC5kZWZhdWx0anMuaHRtbC5idXR0b24gPSBHTE9CQUwuZGVmYXVsdGpzLmh0bWwuYnV0dG9uIHx8IHBhY2s7XG5cbmV4cG9ydCB7IEhUTUxEZWZhdWx0anNBbmNob3JFbGVtZW50LCBIVE1MRGVmYXVsdGpzQnV0dG9uRWxlbWVudCB9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==