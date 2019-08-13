const { maybeFunction } = require("./util");
const { unMatched } = require("./enumerator");

const match = enumerator => (...candidates) => {
    for (candidate of candidates) {
        if (candidate.length < 2) {
            throw new Error(
                "there is a candidate whitch has too few arguments"
            );
        }
        const v = candidate[0](enumerator);
        if (unMatched !== v) {
            return maybeFunction(candidate[1])(v);
        }
    }
    throw new Error("no candidate was matched.");
};

match.default = enumerator => enumerator.value;

module.exports = { match };
