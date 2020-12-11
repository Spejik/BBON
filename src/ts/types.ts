export enum BBON_Types {
    Number = 0x01,
    Boolean = 0x02,
    String = 0x03,
    Object = 0x04,
    Array = 0x05,
    Date = 0x06,
    Null = 0x07,
    BigInt = 0x08,
}

export const BBON_TypesMap = new Map<number, string>();
BBON_TypesMap.set(BBON_Types.Number, "Number");
BBON_TypesMap.set(BBON_Types.Boolean, "Boolean");
BBON_TypesMap.set(BBON_Types.String, "String");
BBON_TypesMap.set(BBON_Types.Object, "Object");
BBON_TypesMap.set(BBON_Types.Array, "Array");
BBON_TypesMap.set(BBON_Types.Date, "Date");
BBON_TypesMap.set(BBON_Types.Null, "Null");
BBON_TypesMap.set(BBON_Types.BigInt, "BigInt");

export const isNumber = (val: any) => typeof val === "number" && isFinite(val);
export const isBoolean = (val: any) => typeof val === "boolean";
export const isString = (val: any) => typeof val === "string";
export const isObject = (val: any) => typeof val === "object" && typeof val !== "function" && val !== null;
export const isArray = (val: any) => Array.isArray(val);
export const isDate = (val: any) => val && Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val);
export const isNull = (val: any) => val === null;
export const isBigInt = (val: any) => typeof val === "bigint";
export const isUnknownType = (val: any) =>
    !isNumber(val) &&
    !isBoolean(val) &&
    !isString(val) &&
    !isObject(val) &&
    !isArray(val) &&
    !isDate(val) &&
    !isNull(val) &&
    !isBigInt(val);
