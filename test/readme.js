const assert = require("assert");

describe("readme", () => {
    describe("Intro", () => {
        it("1", () => {
            const { Enum, match, unMatched } = require("../source/main");

            const OriginalEnum = new Enum(
                "You",
                "Can",
                "Make",
                "Original",
                "Enum",
                "Class"
            );


            // [Enum].[Enumerator] is constructor for enumerator.

            const foo = new OriginalEnum.You(
                "Each enumeratior can have a value"
            );


            // match with object - 1

            const matchWithObject_1 = match(foo)({
                You: _ => 10,
                Can: _ => 11,
                Make: _ => 12,
                default: _ => 13
            });

            assert(matchWithObject_1 === 10);


            // match with object - 2
            //
            // "$" + [tag name] means Symbol of each tags

            const matchWithObject_2 = match(foo)({
                [OriginalEnum.$You]: _ => 20,
                [OriginalEnum.$Can]: _ => 21,
                [OriginalEnum.$Make]: _ => 22,
                default: _ => 13
            });

            assert(matchWithObject_2 === 20);


            // match with pattern matcher

            const matchWithPatternMatcher = match(foo)(
                [OriginalEnum.You(57), _ => 30],
                [OriginalEnum.You(OriginalEnum.Can()), _ => 31],
                [OriginalEnum.You("Each enumeratior can have a value"), _ => 32],
                [OriginalEnum.You(), _ => 33],
                [match.default, _ => 34]
            );

            assert(matchWithPatternMatcher === 32);


            // using pattern macher with assignment
            //
            // "unMached" is Symbol which is returned when pattern is not matched.
            //
            // This can be used like "if let" in Rust
            //   exapmle:
            //   const a = SomeEnum.Foo()(a);
            //   if (a !== unMatched) {
            //     // process when a is Foo
            //   }

            const assignment_1 = OriginalEnum.You()(foo);
            const assignment_2 = OriginalEnum.Can()(foo);
            const assignment_3 = OriginalEnum.Make()(foo);

            assert(assignment_1 === "Each enumeratior can have a value");
            assert(assignment_2 === unMatched);
            assert(assignment_3 === unMatched);


            // using pattern matcher with if

            let usingPatternMatcherWithIf = 0;
            if (OriginalEnum.You(57)(foo) !== unMatched) {
                usingPatternMatcherWithIf = 1;
            } else if (OriginalEnum.You(OriginalEnum.Can())(foo) !== unMatched) {
                usingPatternMatcherWithIf = 2;
            } else if (OriginalEnum.You()(foo) !== unMatched) {
                usingPatternMatcherWithIf = 3;
            }

            assert(usingPatternMatcherWithIf === 3);


            // using with switch
            //
            // ! This is not recommended. It is recommended to use match. !

            let usingWithSwitch = 0;

            switch (foo.name) {
                case "You":
                    usingWithSwitch = 1;
                    break;
                case "Can":
                    usingWithSwitch = 2;
                    break;
                case "Make":
                    usingWithSwitch = 3;
                    break;
                default:
                    usingWithSwitch = 4;
            }

            assert(usingWithSwitch === 1);
        });
    });

    describe("match", () => {
        it("1", () => {
            const { Enum, match } = require("../source/main");

            const FooBar = new Enum("Foo", "Bar", "Baz", "Qux");

            let mayBeFoo = new FooBar.Bar(new FooBar.Foo("Hello"));

            const foo = match(mayBeFoo)(
                [FooBar.Foo(FooBar.Bar()), v => v],
                [FooBar.Foo("Hi"), v => v + "!"],
                [FooBar.Bar("Hello"), v => v + "!!"],
                [FooBar.Bar(FooBar.Foo("Hi")), v => v + "?"],
                [FooBar.Bar(FooBar.Foo("Hello")), v => v + " SR_EM !"],
                [match.default, v => v + "!?"]
            );

            assert.equal(foo, "Hello SR_EM !");
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
