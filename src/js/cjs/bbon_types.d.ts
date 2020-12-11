export declare enum BBON_Types {
    Number = 1,
    Boolean = 2,
    String = 3,
    Object = 4,
    Array = 5,
    Date = 6,
    Null = 7,
    BigInt = 8
}
export declare const isNumber: (val: any) => boolean;
export declare const isBoolean: (val: any) => boolean;
export declare const isString: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const isArray: (val: any) => boolean;
export declare const isDate: (val: any) => boolean;
export declare const isNull: (val: any) => boolean;
export declare const isBigInt: (val: any) => boolean;
export declare const isUnknownType: (val: any) => boolean;
