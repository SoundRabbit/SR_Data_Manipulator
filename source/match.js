const { maybeFunction } = require("./util");

/**
 * match
 * @param {Enumerator} enumerator
 * @returns {{with: function({tag: Symbol, value:any})}}
 */
const match = enumerator => ({
    with: candidate => {
        const tag = enumerator.tag;
        if (tag in candidate) {
            return maybeFunction(candidate[tag])(enumerator.value);
        }
        if ("_" in candidate) {
            return maybeFunction(candidate["_"])(enumerator.value);
        }
        throw "no candidate was matched.";
    },
    withSync: async candidate => {
        const tag = enumerator.tag;
        if (tag in candidate) {
            return await maybeFunction(candidate[tag])(enumerator.value);
        }
        if ("_" in candidate) {
            return await maybeFunction(candidate["_"])(enumerator.value);
        }
        throw "no candidate was matched.";
    },
});

module.exports = { match };
