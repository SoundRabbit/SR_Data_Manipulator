const assert = require("assert");
const { Enum } = require("../source/main");
const { match } = require("../source/match");

describe("#match", () => {
    const E = new Enum("a", "b", "c");
    it("should 3", () => {
        const a = new E.a(1);
        const res = match(a).with({
            [E.$a]: $ => $ + 2,
            _: $ => $
        });
        assert.equal(res, 3);
    });
    it("should 5", () => {
        const a = new E.a(5);
        const res = match(a).with({
            [E.$b]: $ => $ + 2,
            _: $ => $
        });
        assert.equal(res, 5);
    });
    it("should 8", async () => {
        const a = new E.a(6);
        const res = await match(a).withSync({
            [E.$a]: async $ => $ + 2,
            _: async $ => $
        });
        assert.equal(res, 8);
    });
    it("should 13", async () => {
        const a = new E.a(13);
        const res = await match(a).withSync({
            [E.$b]: async $ => $ + 8,
            _: async $ => $
        });
        assert.equal(res, 13);
    });
})