"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__BBON_Serializer = void 0;
const bbon_common_1 = require("./bbon_common");
var common = bbon_common_1.__BBON_Common;
class __BBON_Serializer {
    constructor(_data) {
        this.data = _data;
    }
    Serialize() {
        let headerKeys = "";
        let headerChecksum = "";
        let content = "";
        headerChecksum = "".concat(common.HEADER_CHECKSUM_START, common.GetChecksum(content), common.HEADER_CHECKSUM_CLOSE);
        const header = "".concat(common.HEADER_START, headerKeys, headerChecksum, common.HEADER_CLOSE);
        const result = "".concat(header, content);
        return result;
    }
    GetKeys() {
        Object.values(this.data);
        return [""];
    }
}
exports.__BBON_Serializer = __BBON_Serializer;
//# sourceMappingURL=bbon_serializer.js.map