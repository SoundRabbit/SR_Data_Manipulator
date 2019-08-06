const { Enum } = require("./enum");
const { match } = require("./match");
const util = require("./util");

const Maybe = new Enum("Just", "Nothing");

/**
 * method chain for maybe
 * @param {Maybe} _maybe maybe
 */
const $ = maybe => ({
    /**
     * map
     * @param {any} proc process or value when _maybe is Just
     * @returns {maybe(Maybe)}
     */
    map: proc => $(map(proc)(maybe)),
    /**
     * andThen
     * @param {any} proc process or value when _maybe is Just
     * @returns {maybe(Maybe)}
     */
    andThen: proc => $(andThen(proc)(maybe)),
    /**
     * withDefault
     */
    withDefault: val => withDefault(val)(maybe),
    /**
     * convert to promise
     * @returns {Promise}
     */
    promise: () => promise(maybe),
    /**
     * convert to Boolean
     * @returns {Boolean}
     */
    boolean: () => boolean(maybe)
});

const map = proc => maybe =>
    match(maybe).with({
        [Maybe.$Just]: val => new Maybe.Just(util.maybeFunction(proc)(val)),
        _: util.always(maybe)
    });

const andThen = proc => maybe =>
    match(maybe).with({
        [Maybe.$Just]: val => util.maybeFunction(proc)(val),
        _: util.always(maybe)
    });

const withDefault = val => maybe =>
    match(maybe).with({
        [Maybe.$Just]: v => v,
        _: util.always(val)
    });

const promise = maybe =>
    match(maybe).with({
        [Maybe.$Just]: val => Promise.resolve(val),
        [Maybe.$Nothing]: _ => Promise.reject()
    });

const boolean = maybe =>
    match(maybe).with({
        [Maybe.$Just]: util.always(true),
        [Maybe.$Nothing]: util.always(false)
    });

module.exports = {
    Maybe,
    $,
    map,
    andThen,
    withDefault,
    promise,
    boolean
};
