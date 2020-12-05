"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__BBON_Common = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
var __BBON_Common;
(function (__BBON_Common) {
    let Errors;
    (function (Errors) {
        // Header
        Errors[Errors["HeaderNotMissing"] = 0] = "HeaderNotMissing";
        Errors[Errors["HeaderNotClosed"] = 1] = "HeaderNotClosed";
        Errors[Errors["HeaderKeyMissing"] = 2] = "HeaderKeyMissing";
        Errors[Errors["HeaderKeyNotClosed"] = 3] = "HeaderKeyNotClosed";
        Errors[Errors["HeaderChecksumMissing"] = 4] = "HeaderChecksumMissing";
        Errors[Errors["HeaderChecksumNotClosed"] = 5] = "HeaderChecksumNotClosed";
        // Content
        Errors[Errors["MainObjectMissing"] = 6] = "MainObjectMissing";
        Errors[Errors["MainObjectNotClosed"] = 7] = "MainObjectNotClosed";
        Errors[Errors["IdPointerMissing"] = 8] = "IdPointerMissing";
        Errors[Errors["IdPointerNotClosed"] = 9] = "IdPointerNotClosed";
        Errors[Errors["ValueMissing"] = 10] = "ValueMissing";
        Errors[Errors["ValueNotClosed"] = 11] = "ValueNotClosed";
        Errors[Errors["ValueMissingSeparator"] = 12] = "ValueMissingSeparator";
        // Types
        Errors[Errors["TypeBoolValueMissing"] = 13] = "TypeBoolValueMissing";
        Errors[Errors["TypeStringValueMissing"] = 14] = "TypeStringValueMissing";
        Errors[Errors["TypeStringNotClosed"] = 15] = "TypeStringNotClosed";
        Errors[Errors["TypeNumberValueMissing"] = 16] = "TypeNumberValueMissing";
        Errors[Errors["TypeNumberNotClosed"] = 17] = "TypeNumberNotClosed";
        Errors[Errors["TypeObjectValueMissing"] = 18] = "TypeObjectValueMissing";
        Errors[Errors["TypeObjectNotClosed"] = 19] = "TypeObjectNotClosed";
        Errors[Errors["TypeArrayValueMissing"] = 20] = "TypeArrayValueMissing";
        Errors[Errors["TypeArrayNotClosed"] = 21] = "TypeArrayNotClosed";
        Errors[Errors["TypeArrayValueMissingSeparator"] = 22] = "TypeArrayValueMissingSeparator";
    })(Errors = __BBON_Common.Errors || (__BBON_Common.Errors = {}));
    function CombineChars(chars) {
        if (Array.isArray(chars))
            chars = chars.join("");
        if (chars.length < 2)
            return "";
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
    __BBON_Common.CombineChars = CombineChars;
    /**
     * Gets base64 hmac-sha256 checksum of a string
     */
    function GetChecksum(str) {
        return crypto_1.default.createHmac("sha256", __BBON_Common.HMAC_KEY).update(str).digest("base64");
    }
    __BBON_Common.GetChecksum = GetChecksum;
    /**
     * Gets an array of all keys (recursively) in an object
     */
    function DeepEntries(obj, includePath = false) {
        let walked = [];
        let stack = [{ obj: obj, stack: "" }];
        while (stack.length > 0) {
            let item = stack.pop();
            if (!item)
                break;
            let obj = item?.obj;
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
                    }
                    else {
                        console.log(item.stack + "." + property + "=" + obj[property]);
                    }
                }
            }
        }
        return new Set(walked);
    }
    __BBON_Common.DeepEntries = DeepEntries;
    __BBON_Common.HMAC_KEY = "Cats go meow meow";
    /**
     * Constants used in the BBON format
     */
    // Headers
    __BBON_Common.HEADER_START = CombineChars("=?[");
    __BBON_Common.HEADER_CLOSE = CombineChars("=?]");
    __BBON_Common.HEADER_KEYS_START = CombineChars("=+[");
    __BBON_Common.HEADER_KEYS_CLOSE = CombineChars("=+]");
    __BBON_Common.HEADER_KEYS_VALUE = CombineChars("=&:");
    __BBON_Common.HEADER_KEYS_SEPAR = CombineChars("=&;");
    __BBON_Common.HEADER_CHECKSUM_START = CombineChars("=![");
    __BBON_Common.HEADER_CHECKSUM_CLOSE = CombineChars("=!]");
    // Content
    __BBON_Common.CONTENT_MAIN = "BBON_MAIN";
    __BBON_Common.CONTENT_ID_POINTER_START = CombineChars("##{");
    __BBON_Common.CONTENT_ID_POINTER_CLOSE = CombineChars("##}");
    __BBON_Common.CONTENT_VALUE_START = CombineChars("#:{");
    __BBON_Common.CONTENT_VALUE_CLOSE = CombineChars("#:}");
    __BBON_Common.CONTENT_VALUE_SEPAR = CombineChars("#:;");
    // Content Types
    __BBON_Common.TYPE_BOOL = CombineChars("#t:b:");
    __BBON_Common.TYPE_STRING_START = CombineChars("#t:s[");
    __BBON_Common.TYPE_STRING_CLOSE = CombineChars("#t:s]");
    __BBON_Common.TYPE_NUMBER_START = CombineChars("#t:n[");
    __BBON_Common.TYPE_NUMBER_CLOSE = CombineChars("#t:n]");
    __BBON_Common.TYPE_OBJECT_START = CombineChars("#t:o[");
    __BBON_Common.TYPE_OBJECT_CLOSE = CombineChars("#t:o]");
    __BBON_Common.TYPE_ARRAY_START = CombineChars("#t:a[");
    __BBON_Common.TYPE_ARRAY_CLOSE = CombineChars("#t:a]");
    __BBON_Common.TYPE_ARRAY_SEPAR = CombineChars("#t:a;");
})(__BBON_Common = exports.__BBON_Common || (exports.__BBON_Common = {}));
