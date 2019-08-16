const { maybeFunction } = require("./util");
const { unMatched } = require("./enumerator");

const match = enumerator => (...arms) => {
    for (arm of arms) {
        if (Array.isArray(arm)) {
            if (arm.length < 2) {
                throw new Error(
                    "INVALID ARM : there is a arm which has too few arguments"
                );
            }
            const v = arm[0](enumerator);
            if (unMatched !== v) {
                return maybeFunction(arm[1])(v);
            }
        } else if (typeof arm == "object") {
            if (enumerator.tag in arm) {
                return maybeFunction(arm[enumerator.tag])(enumerator.value);
            } else if (enumerator.name in arm) {
                return maybeFunction(arm[enumerator.name])(enumerator.value)
            } else if ("default" in arm) {
                return maybeFunction(arm["default"])(enumerator.value)
            }
        } else {
            throw new Error(
                "INVALID ARM : there is a arm which type is NOT array or object"
            );
        }
    }
    throw new Error("INVALID ARM : no arm was matched.");
};

match.default = enumerator => enumerator.value;

module.exports = { match };
