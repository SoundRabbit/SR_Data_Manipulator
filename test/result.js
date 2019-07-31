const assert = require("assert");
const result = require("../source/result");
const { Result } = result;

describe("Result", () => {
    describe("#promise", () => {
        it("should 4", async () => {
            const res = await result.promise(new Result.Ok(1))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .catch(_ => 0);
            assert.equal(res, 4);
        });

        it("should catch", async () => {
            const res = await result.promise(new Result.Ok(1))
                .then(_ => result.promise(new Result.Err()))
                .then(_ => 1)
                .catch(_ => 0);
            assert.equal(res, 0);
        });
    });
});