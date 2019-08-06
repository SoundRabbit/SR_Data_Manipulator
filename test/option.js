const assert = require("assert");
const option = require("../source/option");
const { Option } = option;

describe("Option", () => {
    describe("#promise", () => {
        it("should 4", async () => {
            const res = await option
                .promise(new Option.Some(1))
                .then($ => option.promise(new Option.Some($ + 1)))
                .then($ => option.promise(new Option.Some($ + 1)))
                .then($ => option.promise(new Option.Some($ + 1)))
                .catch(_ => 0);
            assert.equal(res, 4);
        });

        it("should catch", async () => {
            const res = await option
                .promise(new Option.Some(1))
                .then(_ => option.promise(new Option.None()))
                .then(_ => 1)
                .catch(_ => 0);
            assert.equal(res, 0);
        });

        describe("#map", () => {
            it("should 1", () => {
                const res = option
                    .$(new Option.Some(1))
                    .map(v => v + 1)
                    .map(v => v - 1)
                    .withDefault(10);
                assert.equal(res, 1);
            });
            it("should 1", () => {
                const res = option
                    .$(new Option.None())
                    .map(v => v + 1)
                    .withDefault(1);
                assert.equal(res, 1);
            });
        });

        describe("#andThen", () => {
            it("should 1", () => {
                const res = option
                    .$(new Option.Some(1))
                    .andThen(v => new Option.Some(v + 1))
                    .andThen(v => new Option.Some(v - 1))
                    .withDefault(10);
                assert.equal(res, 1);
            });
            it("should 1", () => {
                const res = option
                    .$(new Option.None())
                    .andThen(v => new Option.Some(v + 1))
                    .withDefault(1);
                assert.equal(res, 1);
            });
        });
    });
});
