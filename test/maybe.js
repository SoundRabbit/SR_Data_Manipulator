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

    describe("#map", () => {
        it("should 1", () => {
            const res = maybe
                .$(new Maybe.Just(1))
                .map(v => v + 1)
                .map(v => v - 1)
                .withDefault(10);
            assert.equal(res, 1);
        });
        it("should 1", () => {
            const res = maybe
                .$(new Maybe.Nothing())
                .map(v => v + 1)
                .withDefault(1);
            assert.equal(res, 1);
        });
    });

    describe("#andThen", () => {
        it("should 1", () => {
            const res = maybe
                .$(new Maybe.Just(1))
                .andThen(v => new Maybe.Just(v + 1))
                .andThen(v => new Maybe.Just(v - 1))
                .withDefault(10);
            assert.equal(res, 1);
        });
        it("should 1", () => {
            const res = maybe
                .$(new Maybe.Nothing())
                .andThen(v => new Maybe.Just(v + 1))
                .withDefault(1);
            assert.equal(res, 1);
        });
    });
});
