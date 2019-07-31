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
    });
});
