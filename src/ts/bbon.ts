import { __BBON_Serializer } from "./serializer";
import { __BBON_Unserializer } from "./unserializer";

/**
 * Type for bbon options
 */
type BBON_options = {
    /**
     * Tries to automatically trim any whitespace in BBON values
     */
    errorCorrection: boolean;
    checksumKey: string;
};

/**
 * Default bbon options
 *
 * `checksumKey` should be changed
 */
const BBON_defaultOptions: BBON_options = {
    errorCorrection: false,
    checksumKey: "This is the default BBON HMAC-SHA256 checksum key that you can, but should not use.",
};

export function bbonSerialize(val: any) {
    const serializer = new __BBON_Serializer(val);
    return serializer.Serialize();
}

export function bbonUnserialize(str: string, options: BBON_options) {
    const unserializer = new __BBON_Unserializer(str);
    return unserializer.Unserialize();
}
