/**
 * match
 * @param {Enumerator} enumerator
 * @returns {{with: function({tag: Symbol, value:any})}}
 */
const match = enumerator => ({
    with: candidate => {
        const tag = enumerator.tag;
        if (tag in candidate) {
            return candidate[tag](enumerator.value);
        }
        if ("_" in candidate) {
            return candidate["_"](enumerator.value);
        }
        throw "no candidate was matched.";
    }
});

module.exports = { match };
