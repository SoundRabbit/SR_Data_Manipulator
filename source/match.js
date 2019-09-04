const { maybeFunction } = require("./util");
const { unMatched, name_, tag_, value_ } = require("./enumerator");

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
            if (enumerator[tag_] in arm) {
                return maybeFunction(arm[enumerator[tag_]])(enumerator[value_]);
            } else if (enumerator[name_] in arm) {
                return maybeFunction(arm[enumerator[name_]])(enumerator[value_])
            } else if ("default" in arm) {
                return maybeFunction(arm["default"])(enumerator[value_])
            }
        } else {
            throw new Error(
                "INVALID ARM : there is a arm which type is NOT array or object\n" +
                `\tEnumerator : ${enumerator[name_]}`
            );
        }
    }
    throw new Error("INVALID ARM : no arm was matched.");
};

match.default = enumerator => enumerator[value_];

module.exports = { match };
