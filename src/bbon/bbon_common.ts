import crypto from "crypto";

export namespace __BBON_Common {
    export enum Errors {
        // Header
        HeaderNotMissing,
        HeaderNotClosed,
        HeaderKeyMissing,
        HeaderKeyNotClosed,
        HeaderChecksumMissing,
        HeaderChecksumNotClosed,

        // Content
        MainObjectMissing,
        MainObjectNotClosed,
        IdPointerMissing,
        IdPointerNotClosed,
        ValueMissing,
        ValueNotClosed,
        ValueMissingSeparator,

        // Types
        TypeBoolValueMissing,
        TypeStringValueMissing,
        TypeStringNotClosed,
        TypeNumberValueMissing,
        TypeNumberNotClosed,
        TypeObjectValueMissing,
        TypeObjectNotClosed,
        TypeArrayValueMissing,
        TypeArrayNotClosed,
        TypeArrayValueMissingSeparator,
    }

    /**
     * Combines 2 or more characters into one by
     * XORing the bytes with each other
     */
    export function CombineChars(...chars: string[]): string;
    export function CombineChars(chars: string): string {
        if (Array.isArray(chars)) chars = chars.join("");
        if (chars.length < 2) return "";

        let result = "/";
        for (let i = 0; i < chars.length; i++) {
            let charCode = result.charCodeAt(0) ^ ~chars.charCodeAt(i);
            result = String.fromCharCode(charCode);
            //out.debug("quacc", result);
        }

        // Characters beyond this charCode are usually
        // blank, so we need to set a limit here
        if (result.charCodeAt(0) > 65500) {
            result = String.fromCharCode(result.charCodeAt(0) - 100);
        }

        // out.debug("BBON_Common.CombineChars", `Combined character sequence '${chars}' -> '${result}' (${result.charCodeAt(0)})`);
        return result;
    }

    /**
     * Získá base64 hmac-sha256 checksum stringu
     */
    export function GetChecksum(str: string): string {
        return crypto.createHmac("sha256", HMAC_KEY).update(str).digest("base64");
    }

    /**
     * Získá array všech záznamů v objektu
     */
    export function DeepEntries(obj: object, includePath: boolean = false): Set<string> {
        let walked = [];
        let stack = [{ obj: obj, stack: "" }];
        while (stack.length > 0) {
            let item = stack.pop();
            if (!item) break;

            let obj = item?.obj as { [key: string]: any };
            for (let property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] == "object") {
                        let alreadyFound = false;
                        for (let i = 0; i < walked.length; i++) {
                            if (walked[i] === obj[property]) {
                                alreadyFound = true;
                                break;
                            }
                        }
                        if (!alreadyFound) {
                            walked.push(obj[property]);
                            stack.push({ obj: obj[property], stack: item.stack + "." + property });
                        }
                    } else {
                        console.log(item.stack + "." + property + "=" + obj[property]);
                    }
                }
            }
        }

        return new Set(walked);
    }

    export let HMAC_KEY = "Cats go meow meow";

    /**
     * Constants used in the BBON format
     */
    // Headers
    export const HEADER_START = CombineChars("=?[");
    export const HEADER_CLOSE = CombineChars("=?]");
    export const HEADER_KEYS_START = CombineChars("=+[");
    export const HEADER_KEYS_CLOSE = CombineChars("=+]");
    export const HEADER_CHECKSUM_START = CombineChars("=![");
    export const HEADER_CHECKSUM_CLOSE = CombineChars("=!]");

    // Content
    export const CONTENT_MAIN = "BBON_MAIN";
    export const CONTENT_ID_POINTER_START = CombineChars("##{");
    export const CONTENT_ID_POINTER_CLOSE = CombineChars("##}");
    export const CONTENT_VALUE_START = CombineChars("#:{");
    export const CONTENT_VALUE_CLOSE = CombineChars("#:}");
    export const CONTENT_VALUE_VALUE = CombineChars("#:;");

    // Content Types
    export const TYPE_BOOL = CombineChars("#t:b:");
    export const TYPE_STRING_START = CombineChars("#t:s[");
    export const TYPE_STRING_CLOSE = CombineChars("#t:s]");
    export const TYPE_NUMBER_START = CombineChars("#t:n[");
    export const TYPE_NUMBER_CLOSE = CombineChars("#t:n]");
    export const TYPE_OBJECT_START = CombineChars("#t:o[");
    export const TYPE_OBJECT_CLOSE = CombineChars("#t:o]");
    export const TYPE_ARRAY_START = CombineChars("#t:a[");
    export const TYPE_ARRAY_CLOSE = CombineChars("#t:a]");
    export const TYPE_ARRAY_VALUE = CombineChars("#t:a;");
}
