const { Enum } = require("./enum");
const { match } = require("./match");

const Option = new Enum("Some", "None");

const promise = option =>
    match(option).with({
        [Option.$Some]: val => Promise.resolve(val),
        [Option.$None]: _ => Promise.reject()
    });

module.exports = {
    Option,
    promise
};
