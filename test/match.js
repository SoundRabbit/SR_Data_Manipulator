const assert = require("assert");
const { Enum } = require("../source/main");
const { match } = require("../source/match");
const { promiseFunc } = require("./util");

describe("#match", () => {
    const E = new Enum("a", "b", "c");
    describe("array", () => {
        it("should 3", () => {
            const a = new E.a(1);
            const res = match(a)([E.a(), $ => $ + 2], [match.default, $ => $]);
            assert.equal(res, 3);
        });
        it("should 5", () => {
            const a = new E.a(5);
            const res = match(a)([E.b(), $ => $ + 2], [match.default, $ => $]);
            assert.equal(res, 5);
        });
        it("should 8", async () => {
            const a = new E.a(6);
            const res = await match(a)(
                [E.a(), async $ => (await promiseFunc($)) + 2],
                [match.default, async $ => $]
            );
            assert.equal(res, 8);
        });
        it("should 13", async () => {
            const a = new E.a(13);
            const res = await match(a)(
                [E.b(), async $ => $ + 8],
                [match.default, async $ => $]
            );
            assert.equal(res, 13);
        });
    });
    describe("object", () => {
        it("should 3", () => {
            const a = new E.a(1);
            const res = match(a)({
                [E.$a]: $ => $ + 2,
                default: $ => $
            });
            assert.equal(res, 3);
        });
        it("should 5", () => {
            const a = new E.a(3);
            const res = match(a)({
                a: $ => $ + 2,
                default: $ => $
            });
            assert.equal(res, 5);
        });
        it("should 8", () => {
            const a = new E.a(8);
            const res = match(a)({
                [E.$b]: $ => $ + 2,
                default: $ => $
            });
            assert.equal(res, 8);
        });
        it("should 13", () => {
            const a = new E.a(13);
            const res = match(a)({
                b: $ => $ + 2,
                default: $ => $
            });
            assert.equal(res, 13);
        });
    });
    describe("pattern", () => {
        it("should 3", () => {
            const a = new E.a(1);
            const res = match(a)([E.a(), $ => $ + 2], [match.default, $ => $]);
            assert.equal(res, 3);
        });
        it("should 5", () => {
            const a = new E.a(5);
            const res = match(a)([E.b(), $ => $ + 2], [match.default, $ => $]);
            assert.equal(res, 5);
        });
        it("should 8", async () => {
            const a = new E.a(6);
            const res = await match(a)(
                [E.a(), async $ => (await promiseFunc($)) + 2],
                [match.default, async $ => $]
            );
            assert.equal(res, 8);
        });
        it("should 13", async () => {
            const a = new E.a(13);
            const res = await match(a)(
                [E.b(), async $ => $ + 8],
                [match.default, async $ => $]
            );
            assert.equal(res, 13);
        });
    });
});
