const promiseFunc = v => new Promise((res, _) => setTimeout(() => res(v), 10));

module.exports = {
    promiseFunc
}