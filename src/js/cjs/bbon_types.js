"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnknownType = exports.isBigInt = exports.isNull = exports.isDate = exports.isArray = exports.isObject = exports.isString = exports.isBoolean = exports.isNumber = exports.BBON_Types = void 0;
var BBON_Types;
(function (BBON_Types) {
    BBON_Types[BBON_Types["Number"] = 1] = "Number";
    BBON_Types[BBON_Types["Boolean"] = 2] = "Boolean";
    BBON_Types[BBON_Types["String"] = 3] = "String";
    BBON_Types[BBON_Types["Object"] = 4] = "Object";
    BBON_Types[BBON_Types["Array"] = 5] = "Array";
    BBON_Types[BBON_Types["Date"] = 6] = "Date";
    BBON_Types[BBON_Types["Null"] = 7] = "Null";
    BBON_Types[BBON_Types["BigInt"] = 8] = "BigInt";
})(BBON_Types = exports.BBON_Types || (exports.BBON_Types = {}));
exports.isNumber = function (val) { return typeof val === "number" && isFinite(val); };
exports.isBoolean = function (val) { return typeof val === "boolean"; };
exports.isString = function (val) { return typeof val === "string"; };
exports.isObject = function (val) { return typeof val === "object" && typeof val !== "function" && val !== null; };
exports.isArray = function (val) { return Array.isArray(val); };
exports.isDate = function (val) { return val && Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val); };
exports.isNull = function (val) { return val === null; };
exports.isBigInt = function (val) { return typeof val === "bigint"; };
exports.isUnknownType = function (val) {
    return !exports.isNumber(val) &&
        !exports.isBoolean(val) &&
        !exports.isString(val) &&
        !exports.isObject(val) &&
        !exports.isArray(val) &&
        !exports.isDate(val) &&
        !exports.isNull(val) &&
        !exports.isBigInt(val);
};
