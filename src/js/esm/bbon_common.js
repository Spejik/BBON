import crypto from "crypto";
import fs from "fs";
import path from "path";
export var __BBON_Common;
(function (__BBON_Common) {
    var _a;
    var Errors;
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
    /**
     * Gets base64 hmac-sha256 checksum of a string
     */
    function GetChecksum(str) {
        return crypto.createHmac("sha256", __BBON_Common.HMAC_KEY).update(str).digest("base64");
    }
    __BBON_Common.GetChecksum = GetChecksum;
    /**
     * Gets an array of all keys (recursively) in an object
     */
    function DeepEntries(obj, includePath) {
        if (includePath === void 0) { includePath = false; }
        var walked = [];
        var stack = [{ obj: obj, stack: "" }];
        while (stack.length > 0) {
            var item = stack.pop();
            if (!item)
                break;
            var obj_1 = item === null || item === void 0 ? void 0 : item.obj;
            for (var property in obj_1) {
                if (obj_1.hasOwnProperty(property)) {
                    if (typeof obj_1[property] == "object") {
                        var alreadyFound = false;
                        for (var i = 0; i < walked.length; i++) {
                            if (walked[i] === obj_1[property]) {
                                alreadyFound = true;
                                break;
                            }
                        }
                        if (!alreadyFound) {
                            walked.push(obj_1[property]);
                            stack.push({ obj: obj_1[property], stack: item.stack + "." + property });
                        }
                    }
                    else {
                        console.log(item.stack + "." + property + "=" + obj_1[property]);
                    }
                }
            }
        }
        return new Set(walked);
    }
    __BBON_Common.DeepEntries = DeepEntries;
    __BBON_Common.HMAC_KEY = "BBON default HMAC-SHA256 key";
    __BBON_Common.VERSION = fs.readFileSync(path.resolve(((_a = require.main) === null || _a === void 0 ? void 0 : _a.path) + "../../package.json"));
})(__BBON_Common || (__BBON_Common = {}));
