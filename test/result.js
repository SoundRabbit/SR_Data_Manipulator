const assert = require("assert");
const result = require("../source/result");
const { Result } = result;

describe("Result", () => {
    describe("#promise", () => {
        it("should 4", async () => {
            const res = await result
                .promise(new Result.Ok(1))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .then($ => result.promise(new Result.Ok($ + 1)))
                .catch(_ => 0);
            assert.equal(res, 4);
        });

        it("should catch", async () => {
            const res = await result
                .promise(new Result.Ok(1))
                .then(_ => result.promise(new Result.Err()))
                .then(_ => 1)
                .catch(_ => 0);
            assert.equal(res, 0);
        });
    });

    describe("#map", () => {
        it("should 1", () => {
            const res = result
                .$(new Result.Ok(1))
                .map(v => v + 1)
                .map(v => v - 1)
                .withDefault(10);
            assert.equal(res, 1);
        });
        it("should 1", () => {
            const res = result
                .$(new Result.Err())
                .map(v => v + 1)
                .withDefault(1);
            assert.equal(res, 1);
        });
    });

    describe("#andThen", () => {
        it("should 1", () => {
            const res = result
                .$(new Result.Ok(1))
                .andThen(v => new Result.Ok(v + 1))
                .andThen(v => new Result.Ok(v - 1))
                .withDefault(10);
            assert.equal(res, 1);
        });
        it("should 1", () => {
            const res = result
                .$(new Result.Err())
                .andThen(v => new Result.Ok(v + 1))
                .withDefault(1);
            assert.equal(res, 1);
        });
    });
});
