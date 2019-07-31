const { Enum } = require("./enum");
const maybe = require("./maybe");
const option = require("./option");
const result = require("./result");
const { match } = require("./match");

module.exports = {
    Enum,
    match,
    maybe,
    option,
    result,
    Maybe: maybe.Maybe,
    Option: option.Option,
    Result: result.Result
};
