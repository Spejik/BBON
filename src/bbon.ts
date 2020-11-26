/**
 * Format definiton for `BeXCool Binary Object Notation`
 *
 * A) Headers
 *  Headers are written between control characters (described in A.1) =?[ a =?]
 *
 *
 *  1.: Keys
 *      Every object must include an object on the start, that contains
 *      pairs of IDs and Keys.
 *      Control characters are made by combining two or more characters.
 *      To create these characters, we first get charCode of both characters.
 *      We then XOR ( ^ ) the two characters together and the new charCode
 *      then gets transformed back to a character.
 *
 *      All strings (including the keys) are encoded in base64, because it
 *      helps solve a lot of problems with unserializing.
 *
 *      Keys in the headers look like this, except the control characters aren't
 *      encoded here. Keys are located in the headers, because it kind of
 *      works like a cache, for the case the object contains multiple
 *      keys with the same name.
 *
 *      This section is also reffered to as "pointers".
 *
 *      =&[
 *          0=&:name    =&;
 *          1=&:email   =&;
 *      =&]
 *
 *
 *      Used control characters:
 *          Starting section keys: =&[
 *          Closing  section keys: =&]
 *          ID separator: =&:
 *          Value ending: =&;
 *
 *
 *  2.: Checksum
 *      Headers must contain HMAC-SHA256 checksum of the
 *      entire content after it was serialized
 *      Checksum validity must be checked everytime
 *      when reading from the object
 *
 *
 *      =![ abcdef1234567890 =!]
 *
 *      Used control characters:
 *          Starting section checksum: =![
 *          Closing  section checksum: =!]
 *
 *
 * B) Content
 *  Content is saved immediately after the headers
 *  Keys for the values are saved as pointers (described in A.1)
 *  Values must have a content type
 *  The whole content is wrapped with an object called
 *  BBON_MAIN, which will not be in the list of pointers, as it is
 *  used only internally
 *
 *  Used control characters:
 *      ##{ - Start pointer at ID of the key
 *      ##} - CLose pointer at ID of the key
 *      #:{ - Start value
 *      #:} - End value
 *      #:; - Value separator
 *  Typy:
 *      1. Boolean
 *          CC - #t:b:
 *          Value = 1 character after the CC
 *           - Value = 0 => false
 *           - Value = 1 => true
 *           - If the value is anything else => false
 *              - This can be changed with the setting errorCorrection
 *      2. String
 *          Starting CC - #t:s[
 *          Closing  CC - #t:s]
 *          Strings must be encoded with base64 (explained in A.1)
 *          Value = Everything until Closing CC is found
 *      3. Number
 *          Starting CC - #t:n[
 *          Closing  CC - #t:n]
 *          Value = Everything until Closing CC is found
 *      4. Object
 *          Starting CC - #t:o[
 *          Closing  CC - #t:o]
 *          Value = Everything until Closing CC is found
 *          This is basically an another BSON, but without headers and main object
 *      5. Array
 *          Starting CC - #t:a[
 *          Closing  CC - #t:a]
 *          Value separator - #t:a;
 *          Value = Everything between Starting and Closing CC
 *                  Each value must have an type and a separator after it (including the last item)
 *
 *
 *
 *
 *
 *
 *? EXAMPLE BBON
 *
 *  =?[
 *      =&[
 *          0:Name;
 *          1:IPs;
 *          2:Cats;
 *          3:Premium;
 *          4:RandomObject;
 *      =&]
 *
 *      =![
 *          .....
 *      =!]
 *  =?]
 *  BBON_MAIN
 *  #:{
 *      ##{ 0   ##}
 *      #:{
 *          #t:s[   (base64) AnExampleName     #t:s]
 *      #:}
 *      ##{ 1   ##}
 *      #:{
 *          #t:a[
 *              #t:s[   (base64) AnExampleIP     #t:s]   #t:a;
 *              #t:s[   (base64) Another__IP     #t:s]   #t:a;
 *          #t:a]
 *      #:}
 *      ##{ 2   ##}
 *      #:{
 *          #t:n[   123456789  #t:n]
 *      #:}
 *      ##{ 3   ##}
 *      #:{
 *          #t:b:   1
 *      #:}
 *      ##{ 4   ##}
 *      #:{
 *          #t:o[
 *              ##{ 0   ##}
 *              #:{
 *                  #t:s[   (base64) ThisIsAVeryRandomLookingString     #t:s]
 *              #:}
 *          #t:o]
 *      #:}
 *  #:}
 *
 */

import { __BBON_Common } from "./bbon_common";
import { __BBON_Serializer } from "./bbon_serializer";
import { __BBON_Unserializer } from "./bbon_unserializer";

/**
 * Type for bbon options
 */
type BBON_options = {
    /**
     * Tries to automatically trim any whitespace in BBON values
     */
    errorCorrection: boolean;
    checksumKey: string;
};

/**
 * Default bbon options
 *
 * `checksumKey` should be changed
 */
const BBON_defaultOptions: BBON_options = {
    errorCorrection: false,
    checksumKey: "meow... this is the BBON default checksumKey that you should not use",
};

/**
 * BBON Class
 */
export class BBON {
    options: BBON_options;

    constructor(_options: BBON_options = BBON_defaultOptions) {
        if (_options.checksumKey == BBON_defaultOptions.checksumKey) {
            console.warn("[BBON] Warning - Using default checksum key");
        }

        this.options = _options;
        __BBON_Common.HMAC_KEY = this.options.checksumKey;
    }

    Serialize(obj: object): string {
        const serializer = new __BBON_Serializer(obj);
        return serializer.Serialize();
    }

    Deserialize(str: string): object {
        const unserializer = new __BBON_Unserializer(str);
        return unserializer.Unserialize();
    }
}
