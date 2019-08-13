const { Enum } = require("./enum");
const { match } = require("./match");
const util = require("./util");

const Result = new Enum("Ok", "Err");

const $ = result => ({
    map: proc => $(map(proc)(result)),
    andThen: proc => $(andThen(proc)(result)),
    withDefault: val => withDefault(val)(result),
    promise: () => promise(result),
    boolean: () => boolean(result),
    get: () => result
});

const map = proc => result =>
    match(result)(
        [Result.Ok(), val => new Result.Ok(util.maybeFunction(proc)(val))],
        [Result.Err(), util.always(result)]
    );

const andThen = proc => result =>
    match(result)(
        [Result.Ok(), val => util.maybeFunction(proc)(val)],
        [Result.Err(), util.always(result)]
    );

const withDefault = val => result =>
    match(result)([Result.Ok(), util.lazy], [Result.Err(), util.always(val)]);

const promise = result =>
    match(result)(
        [Result.Ok(), val => Promise.resolve(val)],
        [Result.Err(), _ => Promise.reject()]
    );

const boolean = result =>
    match(result)(
        [Result.Ok(), util.always(true)],
        [Result.Err(), util.always(false)]
    );

module.exports = {
    Result,
    promise,
    $,
    map,
    andThen,
    withDefault,
    promise,
    boolean
};
