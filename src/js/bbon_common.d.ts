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
     * Combines 2 or more characters into one by
     * XORing the bytes with each other
     */
    function CombineChars(...chars: string[]): string;
    /**
     * Gets base64 hmac-sha256 checksum of a string
     */
    function GetChecksum(str: string): string;
    /**
     * Gets an array of all keys (recursively) in an object
     */
    function DeepEntries(obj: object, includePath?: boolean): Set<string>;
    let HMAC_KEY: string;
    /**
     * Constants used in the BBON format
     */
    const HEADER_START: string;
    const HEADER_CLOSE: string;
    const HEADER_KEYS_START: string;
    const HEADER_KEYS_CLOSE: string;
    const HEADER_KEYS_VALUE: string;
    const HEADER_KEYS_SEPAR: string;
    const HEADER_CHECKSUM_START: string;
    const HEADER_CHECKSUM_CLOSE: string;
    const CONTENT_MAIN = "BBON_MAIN";
    const CONTENT_ID_POINTER_START: string;
    const CONTENT_ID_POINTER_CLOSE: string;
    const CONTENT_VALUE_START: string;
    const CONTENT_VALUE_CLOSE: string;
    const CONTENT_VALUE_SEPAR: string;
    const TYPE_BOOL: string;
    const TYPE_STRING_START: string;
    const TYPE_STRING_CLOSE: string;
    const TYPE_NUMBER_START: string;
    const TYPE_NUMBER_CLOSE: string;
    const TYPE_OBJECT_START: string;
    const TYPE_OBJECT_CLOSE: string;
    const TYPE_ARRAY_START: string;
    const TYPE_ARRAY_CLOSE: string;
    const TYPE_ARRAY_SEPAR: string;
}
