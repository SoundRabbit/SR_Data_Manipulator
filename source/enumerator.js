class Enumerator {
    constructor(name, symbol, index, value) {
        this.value = value;
        this.name = name;
        this.tag = symbol;
        this.index = index;
        Object.freeze(this);
    }

    is(tag) {
        return this.tag == tag;
    }
}

module.exports = {
    Enumerator
};
