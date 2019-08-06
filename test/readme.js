const assert = require("assert");

describe("readme", () => {
    describe("Intro", () => {
        it("1", () => {
            const { Enum } = require("../source/main");

            const OriginalEnum = new Enum(
                "You",
                "Can",
                "Make",
                "Original",
                "Enum",
                "Class"
            );

            const foo = new OriginalEnum.You(
                "Each enumeratior can have a value"
            );

            // .name property returns own tag name
            assert(foo.name === "You");

            // .tag property returns Symbol of own tag
            assert(foo.tag !== Symbol("You")); //false

            // "$" + [tag name] means Sybom of each tags
            assert(foo.tag === OriginalEnum.$You); //true
        });
        it("2", () => {
            const { Maybe, maybe } = require("../source/main");
            const res = [
                maybe
                    .$(new Maybe.Just(1))
                    .map(v => v + 1)
                    .map(v => v + 1)
                    .map(v => v + 1)
                    .withDefault(0),
                maybe
                    .$(new Maybe.Just(1))
                    .andThen(_ => new Maybe.Nothing())
                    .withDefault(0)
            ];

            assert(res[0] === 4);
            assert(res[1] === 0);
        });
    });

    describe("Maybe", () => {
        it("promise", async () => {
            const { Maybe, maybe } = require("../source/main");

            const a = await maybe
                .promise(new Maybe.Just(1))
                .then(val => val * 10)
                .catch(_ => 100);

            const b = await maybe
                .promise(new Maybe.Nothing())
                .then(val => val * 10)
                .catch(_ => 100);

            assert(a === 10);
            assert(b === 100);
        });
    });
});
