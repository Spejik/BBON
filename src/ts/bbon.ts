import { __BBON_Common } from "./bbon_common";
import { __BBON_Serializer } from "./bbon_serializer";
import { __BBON_Unserializer } from "./bbon_unserializer";

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
    checksumKey: "meow... this is the BBON default checksumKey that you should not use",
};

/**
 * BBON Class
 */
export class BBON {
    options: BBON_options;

    constructor(_options: BBON_options = BBON_defaultOptions) {
        if (_options.checksumKey == BBON_defaultOptions.checksumKey) {
            console.warn("[BBON] Warning - Using default checksum key");
        }

        this.options = _options;
        __BBON_Common.HMAC_KEY = this.options.checksumKey;
    }

    Serialize(obj: object): string {
        const serializer = new __BBON_Serializer(obj);
        return serializer.Serialize();
    }

    Unserialize(str: string): object {
        const unserializer = new __BBON_Unserializer(str);
        return unserializer.Unserialize();
    }
}
