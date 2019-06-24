const {maybeFunction} = require("../utility");
const {Result} = require("../enumerate")

module.exports.$ = (process, data) => maybeFunction(process)(data);
module.exports.R = (process, data) =>
    data.expect(Result.$Ok)
    .then(maybeFunction(process)(data.value()))
    .catch($=>$)
