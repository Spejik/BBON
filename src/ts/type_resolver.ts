import { BBON_Types, BBON_TypesMap } from "./types";
import Types = BBON_Types;
const TypesMap = BBON_TypesMap;

export const resolveType = (str: Buffer): Types => {
    const type = TypesMap.get(str[0]) ?? "string"
    return BBON_Types[BBON_Types[+type]];
};
