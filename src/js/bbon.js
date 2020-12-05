"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BBON = void 0;
const bbon_common_1 = require("./bbon_common");
const bbon_serializer_1 = require("./bbon_serializer");
const bbon_unserializer_1 = require("./bbon_unserializer");
/**
 * Default bbon options
 *
 * `checksumKey` should be changed
 */
const BBON_defaultOptions = {
    errorCorrection: false,
    checksumKey: "meow... this is the BBON default checksumKey that you should not use",
};
/**
 * BBON Class
 */
class BBON {
    constructor(_options = BBON_defaultOptions) {
        if (_options.checksumKey == BBON_defaultOptions.checksumKey) {
            console.warn("[BBON] Warning - Using default checksum key");
        }
        this.options = _options;
        bbon_common_1.__BBON_Common.HMAC_KEY = this.options.checksumKey;
    }
    Serialize(obj) {
        const serializer = new bbon_serializer_1.__BBON_Serializer(obj);
        return serializer.Serialize();
    }
    Unserialize(str) {
        const unserializer = new bbon_unserializer_1.__BBON_Unserializer(str);
        return unserializer.Unserialize();
    }
}
exports.BBON = BBON;
