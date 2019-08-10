const { maybeFunction } = require("./util");

const match = enumerator => (...candidates) => {
    for (candidate of candidates) {
        if (candidate.length < 2) {
            throw new Error(
                "there is a candidate whitch has too few arguments"
            );
        }
        const [m, v] = candidate[0](enumerator);
        if (m) {
            return maybeFunction(candidate[1])(v);
        }
    }
    throw new Error("no candidate was matched.");
};

match.default = enumerator => [true, enumerator.value];

module.exports = { match };
