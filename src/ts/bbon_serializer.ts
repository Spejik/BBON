import { __BBON_Common } from "./bbon_common";
import common = __BBON_Common;

export class __BBON_Serializer {
    data: object;

    constructor(_data: object) {
        this.data = _data;
    }

    public Serialize(): string {
        let headerKeys = "";
        let headerChecksum = "";
        let content = "";

        headerKeys = "".concat(
            common.HEADER_KEYS_START,
            common.GetChecksum(content),
            common.HEADER_KEYS_SEPAR,
            common.HEADER_KEYS_START
        );

        headerChecksum = "".concat(
            common.HEADER_CHECKSUM_START,
            common.GetChecksum(headerKeys + content),
            common.HEADER_CHECKSUM_CLOSE
        );
        const header = "".concat(common.HEADER_START, headerKeys, headerChecksum, common.HEADER_CLOSE);
        const result = "".concat(header, content);
        return result;
    }
}
