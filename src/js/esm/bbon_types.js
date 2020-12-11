export var BBON_Types;
(function (BBON_Types) {
    BBON_Types[BBON_Types["Number"] = 1] = "Number";
    BBON_Types[BBON_Types["Boolean"] = 2] = "Boolean";
    BBON_Types[BBON_Types["String"] = 3] = "String";
    BBON_Types[BBON_Types["Object"] = 4] = "Object";
    BBON_Types[BBON_Types["Array"] = 5] = "Array";
    BBON_Types[BBON_Types["Date"] = 6] = "Date";
    BBON_Types[BBON_Types["Null"] = 7] = "Null";
    BBON_Types[BBON_Types["BigInt"] = 8] = "BigInt";
})(BBON_Types || (BBON_Types = {}));
export var isNumber = function (val) { return typeof val === "number" && isFinite(val); };
export var isBoolean = function (val) { return typeof val === "boolean"; };
export var isString = function (val) { return typeof val === "string"; };
export var isObject = function (val) { return typeof val === "object" && typeof val !== "function" && val !== null; };
export var isArray = function (val) { return Array.isArray(val); };
export var isDate = function (val) { return val && Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val); };
export var isNull = function (val) { return val === null; };
export var isBigInt = function (val) { return typeof val === "bigint"; };
export var isUnknownType = function (val) {
    return !isNumber(val) &&
        !isBoolean(val) &&
        !isString(val) &&
        !isObject(val) &&
        !isArray(val) &&
        !isDate(val) &&
        !isNull(val) &&
        !isBigInt(val);
};
