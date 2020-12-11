"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bbonUnserialize = exports.bbonSerialize = void 0;
var bbon_serializer_1 = require("./bbon_serializer");
var bbon_unserializer_1 = require("./bbon_unserializer");
/**
 * Default bbon options
 *
 * `checksumKey` should be changed
 */
var BBON_defaultOptions = {
    errorCorrection: false,
    checksumKey: "This is the default BBON HMAC-SHA256 checksum key that you can, but should not use.",
};
function bbonSerialize(val) {
    var serializer = new bbon_serializer_1.__BBON_Serializer(val);
    return serializer.Serialize();
}
exports.bbonSerialize = bbonSerialize;
function bbonUnserialize(str, options) {
    var unserializer = new bbon_unserializer_1.__BBON_Unserializer(str);
    return unserializer.Unserialize();
}
exports.bbonUnserialize = bbonUnserialize;
