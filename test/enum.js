const assert = require("assert");
const { Enum } = require("../source/enum");
const { name_, tag_, value_, index_ } = require("../source/enumerator");

describe("Enum", () => {
    describe("#name", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return "First"`, () => {
            const first = new State.First();
            assert.equal(first[name_], "First");
        });
        it(`should return "Second"`, () => {
            const second = new State.Second();
            assert.equal(second[name_], "Second");
        });
        it(`should return "Third"`, () => {
            const third = new State.Third();
            assert.equal(third[name_], "Third");
        });
        it(`should return "Last"`, () => {
            const last = new State.Last();
            assert.equal(last[name_], "Last");
        });
    });

    describe("#tag", () => {
        const state1 = new Enum("first", "second", "third", "last");
        const state2 = new Enum("first", "second", "third", "last");
        it("same tag", () => {
            assert.equal(new state1.first()[tag_], state1.$first);
        });
        it("different tag of same enum", () => {
            assert.notEqual((new state1.first()[tag_], new state1.second()[tag_]));
        });
        it("same name tag of differant enum", () => {
            assert.notEqual((new state1.first()[tag_], new state2.second()[tag_]));
        });

        it("different tag of differant enum", () => {
            assert.notEqual(new state1.first()[tag_], new state2.second()[tag_]);
        });
    });

    describe("#value", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return "Foo"`, () => {
            const first = new State.First("Foo");
            assert.equal(first[value_], "Foo");
        });
        it(`should return 1`, () => {
            const second = new State.Second(1);
            assert.equal(second[value_], 1);
        });
        it(`should return true`, () => {
            const third = new State.Third(true);
            assert.equal(third[value_], true);
        });
        it(`should return ['a', 1, true]`, () => {
            const last = new State.Last(["a", 1, true]);
            assert.equal(
                JSON.stringify(last[value_]),
                JSON.stringify(["a", 1, true])
            );
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
            assert(first.is(first[tag_]));
        });
        it(`should return false`, () => {
            const first = new State.First();
            const second = new State.Second();
            assert(!first.is(second[tag_]));
        });
    });

    describe("#index", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        it(`should return 0`, () => {
            const first = new State.First("Foo");
            assert.equal(first[index_], 0);
        });
        it(`should return 1`, () => {
            const second = new State.Second(1);
            assert.equal(second[index_], 1);
        });
        it(`should return 2`, () => {
            const third = new State.Third(true);
            assert.equal(third[index_], 2);
        });
        it(`should return 3`, () => {
            const last = new State.Last(["a", 1, true]);
            assert.equal(last[index_], 3);
        });
    });

    describe("#to", () => {
        const State = new Enum("First", "Second", "Third", "Last");
        const StateInv = new Enum("Last", "Third", "Second", "First");
        it(`should Last`, () => {
            assert.equal(new State.First().to(StateInv)[name_], "Last");
        });
        it(`should Third`, () => {
            assert.equal(new State.Second().to(StateInv)[name_], "Third");
        });
        it(`should Second`, () => {
            assert.equal(new State.Third().to(StateInv)[name_], "Second");
        });
        it(`should First`, () => {
            assert.equal(new State.Last().to(StateInv)[name_], "First");
        });
    });
});
