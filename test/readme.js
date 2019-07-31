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
