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

    to(Enum) {
        return new (Enum.$$[this.index])(this.value);
    }

    mapWith(mapper) {
        return mapper(this);
    }

    wrapWith(wrapper) {
        const wrapped = wrapper(this);
        if (typeof wrapped == "object" && "get" in wrapped && typeof wrapped.get == "function") {
            return wrapped;
        } else {
            throw `wrapped enumerator: ${wrapped} should has get method.`;
        }
    }
}

module.exports = {
    Enumerator
};
