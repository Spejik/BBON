/**
 * Type for bbon options
 */
declare type BBON_options = {
    /**
     * Tries to automatically trim any whitespace in BBON values
     */
    errorCorrection: boolean;
    checksumKey: string;
};
export declare function bbonSerialize(val: any): string;
export declare function bbonUnserialize(str: string, options: BBON_options): object;
export {};
