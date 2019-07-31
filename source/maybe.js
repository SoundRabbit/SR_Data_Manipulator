const { Enum } = require("./enum");
const { match } = require("./match");

const Maybe = new Enum("Just", "Nothing");

const promise = maybe =>
    match(maybe).with({
        [Maybe.$Just]: val => Promise.resolve(val),
        [Maybe.$Nothing]: _ => Promise.reject()
    });
;

module.exports = {
    Maybe,
    promise
};