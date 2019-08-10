const assert = require("assert");

describe("readme", () => {
    describe("Intro", () => {
        it("1", () => {
            const { Enum, match } = require("../source/main");

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

            // match
            const isFoo = match(foo)(
                // [Enum].$[Enumerator] is tag for enumerator.
                [OriginalEnum.You(12345), v => v + " !!?"],
                [OriginalEnum.You(), v => v + " !!"],
                [OriginalEnum.Can(), v => v + " !"],
                [OriginalEnum.Make(), v => v + "."],
                [OriginalEnum.Original(), v => v + " ??"],
                [OriginalEnum.Enum(), v => v + " ?"],
                [OriginalEnum.Class(), v => v + "!?"],
                // in this case, default pattern will match foo is not enumerator of OriginalEnum
                [match.default, _ => "foo is not enumerator of OriginalEnum"]
            );

            assert(isFoo == "Each enumeratior can have a value !!");
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

    describe("match", () => {
        it("1", () => {
            const { Enum, match } = require("sr-enum");

            const FooBar = new Enum("Foo", "Bar", "Baz", "Qux");

            let mayBeFoo = new FooBar.Bar(new FooBar.Foo("Hello"));

            const foo = match(mayBeFoo)(
                [FooBar.Foo(FooBar.Bar()), v => v],
                [FooBar.Foo("Hi"), v => v + "!"],
                [FooBar.Bar("Hello"), v => v + "!!"],
                [FooBar.Bar(FooBar.Foo("Hi")), v => v + "?"],
                [FooBar.Bar(FooBar.Foo("Hello")), v => v + " SR_EM !"],
                [match.default, v => v + "!?"]
            )

            assert.equal(foo, "Hello SR_EM !");
        })
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
