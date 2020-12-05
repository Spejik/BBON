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
/**
 * BBON Class
 */
export declare class BBON {
    options: BBON_options;
    constructor(_options?: BBON_options);
    Serialize(obj: object): string;
    Unserialize(str: string): object;
}
export {};
