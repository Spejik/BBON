const { bbonSerialize, bbonUnserialize } = require("../index");
const { __BBON_Common } = require("../src/js/cjs/bbon_common");
const prefix = "[BBON.test]";
const Common = __BBON_Common;


// Object that is used for testing serializing and unserializing
// First occurence of a type has a BBON type identifier
//? T4 - Object
const testObject = {
    aaaaa: {
        ban: {
            //? 3 - String
            a: "jeff",
            meow: "yellow",
            dDdDDDdDD: {
                x: "cat",
            },
        },
        //? 2 - Boolean
        blizzard: false,
        bexcool: true,
        //? 5 - Array
        smirk: [
            "a very cool string", 
            //? 1 - Number
            987654321, 
            true, 
            [
                "this is an array", " of strings", 3121, ", numbers", false, ", booleans", 
                [ "aaaaaaaaaaaaa", { screaming: false, meow: "transparent" }, ], 
                ", arrays", 
                { reeeee: 3456, meow: "green" }, 
                " and objects"
            ],
            //? 7 - Null
            null,
        ],
        //? Unknown type - should get converted to string
        function: function () {},
        fire: {
            //? 6 - Date
            started: new Date(),
            //? 8 - BigInt
            size: 123456789000987654321n,
        },
    },
    a: "pogchamp",
};



try {
    console.debug(prefix, "BBON_Common.DeepEntries", Common.DeepEntries(testObject, false));
    console.debug(prefix, "BBON_Common.DeepEntries", Common.DeepEntries(testObject, true));

} catch (e) {
    console.error(prefix, "BBON_Common.DeepEntries tests failed", e)
}




try {

    const bbonTest_ErrCor = { errorCorrection: true, checksumKey: "bbon testing - enabled error correction" };
    const bbonTest_DefSet = { checksumKey: "bbon testing - default settings" };


    console.debug(prefix, "Default Settings - Serialize",   bbonSerialize(testObject, bbonTest_DefSet));
    console.debug(prefix, "Default Settings - Unserialize", bbonUnserialize(testObject, bbonTest_DefSet));
    console.debug(prefix, "Error Correction - Serialize",   bbonSerialize(testObject, bbonTest_ErrCor));
    console.debug(prefix, "Error Correction - Unserialize", bbonUnserialize(testObject, bbonTest_ErrCor));


} catch (e) {
    console.error(prefix, "BBON Class tests failed", e)
}


// Keep process running so vscode can inspect objects
process.stdin.resume();
