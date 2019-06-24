const assert = require("assert");
const {Enum} = require("../source/enumerate");

describe("Enum", () => {
    describe("#expect", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        const value = "state::first";
        const first = new State.First(value);
        it("match -> pass -> catch", () => {
            assert.equal(first.expect(State.$First).then(1).expect(State.$Second).then($=>$).catch("catched"), 1);
        });
        it("unmatch -> match -> catch", () => {
            assert.equal(first.expect(State.$Second).then(1).expect(State.$First).then($=>$).catch("catched"), value);
        });
        it("unmatch -> unmatch -> catch", () => {
            assert.equal(first.expect(State.$Second).then(1).expect(State.$Third).then($=>$).catch("catched"), "catched");
        });

        it("match -> match -> catch", () => {
            assert.equal(first.expect(State.$First).then(1).expect(State.$First).then($=>$).catch("catched"), 1);
        });
    });

    describe("#tag", () => {
        const state1 = new Enum("first", "second", "third", "last");
        const state2 = new Enum("first", "second", "third", "last");
        it("same tag", () => {
            assert.equal((new state1.first()).tag(), state1.$first);
        });
        it("different tag of same enum", () => {
            assert.notEqual((new state1.first().tag()), (new state1.second()).tag());
        });
        it("same name tag of differant enum", () => {
            assert.notEqual((new state1.first().tag()), (new state2.second().tag()));
        });

        it("different tag of differant enum", () => {
            assert.notEqual((new state1.first()).tag(), (new state2.second()).tag());
        });
    });
});