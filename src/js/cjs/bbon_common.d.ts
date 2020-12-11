/// <reference types="node" />
export declare namespace __BBON_Common {
    enum Errors {
        HeaderNotMissing = 0,
        HeaderNotClosed = 1,
        HeaderKeyMissing = 2,
        HeaderKeyNotClosed = 3,
        HeaderChecksumMissing = 4,
        HeaderChecksumNotClosed = 5,
        MainObjectMissing = 6,
        MainObjectNotClosed = 7,
        IdPointerMissing = 8,
        IdPointerNotClosed = 9,
        ValueMissing = 10,
        ValueNotClosed = 11,
        ValueMissingSeparator = 12,
        TypeBoolValueMissing = 13,
        TypeStringValueMissing = 14,
        TypeStringNotClosed = 15,
        TypeNumberValueMissing = 16,
        TypeNumberNotClosed = 17,
        TypeObjectValueMissing = 18,
        TypeObjectNotClosed = 19,
        TypeArrayValueMissing = 20,
        TypeArrayNotClosed = 21,
        TypeArrayValueMissingSeparator = 22
    }
    /**
     * Gets base64 hmac-sha256 checksum of a string
     */
    function GetChecksum(str: string): string;
    /**
     * Gets an array of all keys (recursively) in an object
     */
    function DeepEntries(obj: object, includePath?: boolean): Set<string>;
    let HMAC_KEY: string;
    const VERSION: Buffer;
}
