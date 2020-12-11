import { __BBON_Serializer } from "./bbon_serializer";
import { __BBON_Unserializer } from "./bbon_unserializer";
/**
 * Default bbon options
 *
 * `checksumKey` should be changed
 */
var BBON_defaultOptions = {
    errorCorrection: false,
    checksumKey: "This is the default BBON HMAC-SHA256 checksum key that you can, but should not use.",
};
export function bbonSerialize(val) {
    var serializer = new __BBON_Serializer(val);
    return serializer.Serialize();
}
export function bbonUnserialize(str, options) {
    var unserializer = new __BBON_Unserializer(str);
    return unserializer.Unserialize();
}
