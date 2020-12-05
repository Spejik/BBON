const { BBON } = require("./index");
const prefix = "[BBON.test]";
const { __BBON_Common } = require("./dist/bbon_common");
const Common = __BBON_Common;

try {
    const BBONCommonTest = Object.entries(Common)
        // Filter out keys that don't have the constant format (all caps)
        .filter((value) => {
            if (value[0] !== value[0].toUpperCase()) return false; // skip
            return true;
        })
        .map((value) => {
            return [
                value[0],
                value[1],
                String(value[1]).charCodeAt(0),
                Object.values(Common)
                    .filter((e) => e !== value[1])
                    .includes(value[1]),
            ];
        });

    console.debug(prefix, "(BBON_Common) - Any control characters are the same as other", "\n", BBONCommonTest);
    console.debug(prefix, "(BBON_Common) - SUMMARY", BBONCommonTest.every((v) => v[3] === true));

} catch (e) {
    console.error(prefix, "BBON_Common Constants tests failed", e)
}


// Object that 
const testObject = {
    aaaaa: {
        ban: {
            a: "jeff",
            meow: "yellow",
            dDdDDDdDD: {
                c: ["6", 0],
                x: "cat",
            },
        },
        blizzard: false,
        bexcool: true,
        smirk: [
            "a very cool string", 
            987654321, 
            true, 
            [
                "this is an array", " of strings", 3121, ", numbers", false, ", booleans", 
                [ "aaaaaaaaaaaaa", { screaming: false, meow: "transparent" }, ], 
                ", arrays", 
                { reeeee: 3456, meow: "green" }, 
                " and objects"
            ]
        ],
        function: function () {},
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

    const bbonTest_ErrCor = new BBON({ errorCorrection: true, checksumKey: "bbon testing - enabled error correction" });
    const bbonTest_DefSet = new BBON({ checksumKey: "bbon testing - default settings" });


    console.debug(prefix, "Error Correction - Serialize",   bbonTest_ErrCor.Serialize(testObject));
    console.debug(prefix, "Error Correction - Unserialize", bbonTest_ErrCor.Unserialize(testObject));
    console.debug(prefix, "Default Settings - Serialize",   bbonTest_DefSet.Serialize(testObject));
    console.debug(prefix, "Default Settings - Unserialize", bbonTest_DefSet.Unserialize(testObject));


} catch (e) {
    console.error(prefix, "BBON Class tests failed", e)
}


// Keep process running so vscode can inspect objects
process.stdin.resume();
