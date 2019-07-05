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

    describe("#name", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return "First"`, () => {
            const first = new State.First();
            assert.equal(first.name, "First");
        });
        it(`should return "Second"`, () => {
            const second = new State.Second();
            assert.equal(second.name, "Second");
        });
        it(`should return "Third"`, () => {
            const third = new State.Third();
            assert.equal(third.name, "Third");
        });
        it(`should return "Last"`, () => {
            const last = new State.Last();
            assert.equal(last.name, "Last");
        });
    });

    describe("#tag", () => {
        const state1 = new Enum("first", "second", "third", "last");
        const state2 = new Enum("first", "second", "third", "last");
        it("same tag", () => {
            assert.equal((new state1.first()).tag, state1.$first);
        });
        it("different tag of same enum", () => {
            assert.notEqual((new state1.first().tag, (new state1.second()).tag));
        });
        it("same name tag of differant enum", () => {
            assert.notEqual((new state1.first().tag, (new state2.second().tag)));
        });

        it("different tag of differant enum", () => {
            assert.notEqual((new state1.first()).tag, (new state2.second()).tag);
        });
    });

    describe("#value", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return "Foo"`, () => {
            const first = new State.First("Foo");
            assert.equal(first.value, "Foo");
        });
        it(`should return 1`, () => {
            const second = new State.Second(1);
            assert.equal(second.value, 1);
        });
        it(`should return true`, () => {
            const third = new State.Third(true);
            assert.equal(third.value, true);
        });
        it(`should return ['a', 1, true]`, () => {
            const last = new State.Last(['a', 1, true]);
            assert.equal(JSON.stringify(last.value), JSON.stringify(['a', 1, true]));
        });
    });

    describe("#is", () => {
        const State = new Enum("First", "Second");
        it(`should return true`, () => {
            const first = new State.First();
            assert(first.is(State.$First));
        });
        it(`should return false`, () => {
            const first = new State.First();
            assert(!first.is(State.$Second));
        });
        it(`should return true`, () => {
            const first = new State.First();
            assert(first.is(first.tag));
        });
        it(`should return false`, () => {
            const first = new State.First();
            const second = new State.Second();
            assert(!first.is(second.tag));
        });
    });

    describe("#isEnumeratorOf", () => {
        const State1 = new Enum("First");
        const State2 = new Enum("Second");
        it(`should return true`, () => {
            const first = new State1.First();
            assert(first.isEnumeratorOf(State1.$$));
        });
        it(`should return false`, () => {
            const first = new State1.First();
            assert(!first.isEnumeratorOf(State2.$$));
        });
    });

    describe("#index", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return 0`, () => {
            const first = new State.First("Foo");
            assert.equal(first.index, 0);
        });
        it(`should return 1`, () => {
            const second = new State.Second(1);
            assert.equal(second.index, 1);
        });
        it(`should return 2`, () => {
            const third = new State.Third(true);
            assert.equal(third.index, 2);
        });
        it(`should return 3`, () => {
            const last = new State.Last(['a', 1, true]);
            assert.equal(last.index, 3);
        });
    });
});