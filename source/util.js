const maybeFunction = (f) => {
    if (typeof f == "function") {
        return f;
    } else {
        return (...args) => f;
    }
}

module.exports = {
    maybeFunction
}