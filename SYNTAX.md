
# Format definiton for BBON - `BeXCool Binary Object Notation`

## Terms used in this file

### Control character

- A sequence of characters whose character codes are combined into one number with the XOR ( ^ ) operator. The resulting number is then converted back to a character

### CC

- Short for Control Character

### Serializer

- The "program" that writes BBON
- Encoder

### Unserializer

- The "program" that reads BBON
- Decoder

---

## A) Headers

Headers are stored between control characters =?[ and =?]

### 1. Format Version

    Headers must always contain the version of BBON Serializer that the object was serialized with.
    If the version field is not present, the parser should return an error.

    
    =v[ 1.2.3   =v]

    Used CC:
        Starting section checksum: =![
        Closing  section checksum: =!]

### 2. Checksum

    Headers must contain HMAC-SHA256 (base64 encoded) checksum of the
    keys and the entire content after it was serialized.
    Checksum validity must be checked everytime
    when reading from the object.


    =![ abcdef1234567890 =!]

    Used CC:
        Starting section checksum: =![
        Closing  section checksum: =!]
        Value = Anything between 

B) Content

    Content is saved immediately after the headers
    Keys for the values are saved as pointers (described in A.1)
    Values must have a content type
    The whole content is wrapped with an object called
    BBON_MAIN, which will not be in the list of pointers, as it is
    used only internally

    Used control characters:
        ##{ - Start pointer at ID of the key
        ##} - CLose pointer at ID of the key
        #:{ - Start value
        #:} - End value
        #:; - Value separator
    Types:
        1. Boolean
            CC - #t:b:
            Value = 1 character after the CC
            - Value = 0 => false
            - Value = 1 => true
            - If the value is anything else => false
              - This can be changed with the setting errorCorrection
        2. String
            Starting CC - #t:s[
            Closing  CC - #t:s]
            Strings must be encoded with base64 (explained in A.1)
            Value = Everything until Closing CC is found
        3. Number
            Starting CC - #t:n[
            Closing  CC - #t:n]
            Value = Everything until Closing CC is found
        4. Object
            Starting CC - #t:o[
            Closing  CC - #t:o]
            Value = Everything until Closing CC is found
            This is basically an another BSON, but without headers and main object
        5. Array
            Starting CC - #t:a[
            Closing  CC - #t:a]
            Value separator - #t:a;
            Value = Everything between Starting and Closing CC
              - Each value must have an type and a separator after it (including the last item)


# EXAMPLE BBON

  =?[
      =&[
          0:Name;
          1:IPs;
          2:Cats;
          3:Premium;
          4:RandomObject;
      =&]

      =![
          .....
      =!]
  =?]
  BBON_MAIN
  #:{
      ##{ 0   ##}
      #:{
          #t:s[   (base64) AnExampleName     #t:s]
      #:}
      ##{ 1   ##}
      #:{
          #t:a[
              #t:s[   (base64) AnExampleIP     #t:s]   #t:a;
              #t:s[   (base64) Another__IP     #t:s]   #t:a;
          #t:a]
      #:}
      ##{ 2   ##}
      #:{
          #t:n[   123456789  #t:n]
      #:}
      ##{ 3   ##}
      #:{
          #t:b:   1
      #:}
      ##{ 4   ##}
      #:{
          #t:o[
              ##{ 0   ##}
              #:{
                  #t:s[   (base64) ThisIsAVeryRandomLookingString     #t:s]
              #:}
          #t:o]
      #:}
  #:}

/