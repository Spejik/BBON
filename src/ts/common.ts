import crypto from "crypto";
import fs from "fs";
import path from "path";

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
     * Gets base64 hmac-sha256 checksum of a string
     */
    export function GetChecksum(str: string): string {
        return crypto.createHmac("sha256", HMAC_KEY).update(str).digest("base64");
    }

    /**
     * Gets an array of all keys (recursively) in an object
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

    export let HMAC_KEY = "BBON default HMAC-SHA256 key";
    export const VERSION = fs.readFileSync(path.resolve(require.main?.path + "../../package.json"));
}
