
# Format definiton for BBON - `BeXCool Binary Object Notation`

## Terms used in this file

### Control character (CC)

- Any character code below 32

### Serializer

- The "program" that writes BBON
- Encoder

### Unserializer

- The "program" that reads BBON
- Decoder

## A) Headers

Headers are stored on the first line and are everything until a newline (0x0a) is found

### I. Format Version

Headers must contain the version of BBON Serializer that the object was serialized with.n  
If the version field is not present, the parser should throw an error.
Each part of the version has max size of 3 bytes.

    0x01    001000025   0x01

The version here is 1.0.25

### II. Checksum

Headers can contain HMAC-SHA256 checksum of the entire content after it was serialized.  
Checksum validity should be checked everytime when reading from the object.

    0x02    abcdef...1234567890     0x02

## B) Content

Content is saved immediately after the headers and it is everything until the end of file.  
Each value must have a content type.  
The content as a whole can have any type, not only object.

### I. Types

Types should be stored in an enum, as they are identified by a number and not their name.  
Tables are used here to explain the data types and how they would look when actually used.  
**Every value must end with a NULL byte (0x00)**

#### 1. Number (double)

CC = 0x01  
If you need to store big numbers, use type [BigInt](#8.-BigInt) instead.  
If the number is over a language-specific limit it may get encoded as "INF".  
Size is hex encoded.

| Type | Size | Value            |
| ---- | ---- | ---------------- |
| 0x01 | 0x09 | 123654789.987123 |

#### 2. Boolean

CC = 0x02  
Value = single byte - 0 (false) or 1 (true)  
Value can be modified by the option [errorCorrection](#errorCorrection)

| Type | Value |
| ---- | ----- |
| 0x02 | 1     |

#### 3. String

CC = 0x03  
Value may be encoded by the option [encodeStrings](#encodeStrings)  
Length is hex encoded.

| Type | Length | Value     |
| ---- | ------ | --------- |
| 0x03 | 0x09   | Meow Meow |

#### 4. Object

CC = 0x04  
Size & Length are hex encoded.

| Type | Size | Key Length\* | Key\* | Value* |
| ---- | ---- | ------------ | ----- | ------ |
| 0x04 | 0x01 | 0x04         | Meow  | ...... |

\* - repeated per element

#### 5. Array

CC = 0x05  
Size is count of all elements in the array.  
Size is hex encoded.

| Type | Size | Value* |
| ---- | ---- | ------ |
| 0x05 | 0x01 | ...... |

\* - repeated per element

#### 6. Date

CC = 0x06  
Date is written as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)  
Is basically just a string that creates a Date object upon unserialization.
Length is hex encoded.

| Type | Length | Value                    |
| ---- | ------ | ------------------------ |
| 0x06 | 0x24   | 2020-01-01T00:00:00.000Z |

The value should always be 24 characters, but it's better to store the length.

#### 7. Null

CC = 0x07

Does not have a value.

#### 8. BigInt

CC = 0x08  
Has almost no limits on how big it can be.
Size is hex encoded.

| Type | Size | Value                              |
| ---- | ---- | ---------------------------------- |
| 0x08 | 0x34 | 3126546516516486488466135164897789 |

## Options

Note: Some options may have different capitalization because of the language style.

### errorCorrection

Type: `Boolean`  
Default: `false`

If a boolean contains anything else than 0 or 1, set it's value to 1

### encodeStrings

Type: `Boolean | String`  
Default: `false`  
Default if `true`: `"base64"`  
Available options (String): `"base64" | "hex"`

All strings will be encoded with the specified algorithm (doesn't get changed by the [checksumKey](#checksumKey))

### encodeKeys

Type: `Boolean`  
Default: `true`  
Default if encodeStrings is disabled: `"base64"`  
Uses the same algorithm as [encodeStrings](#encodeStrings)

### includeChecksum

Type: `Boolean`
Default: `true`

Headers won't contain a checksum if this option is set to false.  
Must also be enabled while reading from the object, else error InvalidChecksum will be thrown.

### checksumKey

Type: `String`  
Default: `"This is the default BBON HMAC-SHA256 checksum key that you can, but should not use."`

Key for HMAC to generate unique checksum.  
If two same objects are serialized two different checksum keys, the checksums should be different.  
[includeChecksum](#includeChecksum) must be enabled for this option to have any effect.

# EXAMPLE BBON

Comments are marked with `#`, but they aren't allowed in normally generated BBON.  
Note: Control Characters are marked as 0x00

```md
# Headers
# Version...........    Checksum.............    Headers ending (newline)
0x01 001001025  0x01    0x02 (checksum)  0x02    0x0a

# Content
# Object, size 2
0x04    0x02

# Element with key length of 4, value type is Boolean (false)
    0x04    Bool    0x02    0   0x00

# Element with key length of 3, value type is String with length of 27
    0x03    Str     0x03    0x27     A wild String just appeared    0x00

# Ending of the object
0x00
```
