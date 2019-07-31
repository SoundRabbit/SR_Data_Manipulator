const { Enum } = require("./enum");
const { match } = require("./match");

const Result = new Enum("Ok", "Err");

const promise = result =>
    match(result).with({
        [Result.$Ok]: val => Promise.resolve(val),
        [Result.$Err]: _ => Promise.reject()
    });
module.exports = {
    Result,
    promise
};
