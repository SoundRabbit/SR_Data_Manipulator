const { Enum } = require("./enum");
const { match } = require("./match");
const util = require("./util");

const Option = new Enum("Some", "None");

const $ = option => ({
    map: proc => $(map(proc)(option)),
    andThen: proc => $(andThen(proc)(option)),
    withDefault: val => withDefault(val)(option),
    promise: () => promise(option),
    boolean: () => boolean(option),
    get: () => option
});

const map = proc => option =>
    match(option)(
        [Option.Some(), val => new Option.Some(util.maybeFunction(proc)(val))],
        [Option.None(), util.always(option)]
    );

const andThen = proc => option =>
    match(option)(
        [Option.Some(), val => util.maybeFunction(proc)(val)],
        [Option.None(), util.always(option)]
    );

const withDefault = val => option =>
    match(option)(
        [Option.Some(), util.lazy],
        [Option.None(), util.always(val)]
    );

const promise = option =>
    match(option)(
        [Option.Some(), val => Promise.resolve(val)],
        [Option.None(), _ => Promise.reject()]
    );

const boolean = option =>
    match(option)(
        [Option.Some(), util.always(true)],
        [Option.None(), util.always(false)]
    );

module.exports = {
    Option,
    $,
    map,
    andThen,
    withDefault,
    promise,
    boolean
};
