const assert = require("assert");
const maybe = require("../source/maybe");
const { Maybe } = maybe;

describe("Maybe", () => {
    describe("#promise", () => {
        it("should 4", async () => {
            const res = await maybe
                .promise(new Maybe.Just(1))
                .then($ => maybe.promise(new Maybe.Just($ + 1)))
                .then($ => maybe.promise(new Maybe.Just($ + 1)))
                .then($ => maybe.promise(new Maybe.Just($ + 1)))
                .catch(_ => 0);
            assert.equal(res, 4);
        });

        it("should catch", async () => {
            const res = await maybe
                .promise(new Maybe.Just(1))
                .then(_ => maybe.promise(new Maybe.Nothing()))
                .then(_ => 1)
                .catch(_ => 0);
            assert.equal(res, 0);
        });
    });
});
