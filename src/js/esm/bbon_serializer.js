var __BBON_Serializer = /** @class */ (function () {
    function __BBON_Serializer(_data) {
        this.data = _data;
    }
    __BBON_Serializer.prototype.Serialize = function () {
        var headerKeys = "";
        var headerChecksum = "";
        var content = "";
        // headerKeys = "".concat(
        //     common.HEADER_KEYS_START,
        //     common.GetChecksum(content),
        //     common.HEADER_KEYS_SEPAR,
        //     common.HEADER_KEYS_START
        // );
        // headerChecksum = "".concat(
        //     common.HEADER_CHECKSUM_START,
        //     common.GetChecksum(headerKeys + content),
        //     common.HEADER_CHECKSUM_CLOSE
        // );
        // const header = "".concat(common.HEADER_START, headerKeys, headerChecksum, common.HEADER_CLOSE);
        var result = "".concat("header", content);
        return result;
    };
    return __BBON_Serializer;
}());
export { __BBON_Serializer };
