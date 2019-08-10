/** @format */

class impl_Enumerator {
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
        return new Enum.$$[this.index](this.value);
    }

    mapWith(mapper) {
        return mapper(this);
    }

    wrapWith(wrapper) {
        const wrapped = wrapper(this);
        if (
            typeof wrapped == "object" &&
            "get" in wrapped &&
            typeof wrapped.get == "function"
        ) {
            return wrapped;
        } else {
            throw `wrapped enumerator: ${wrapped} should has get method.`;
        }
    }
}

const enumerator = (name, symbol, index) => {
    const Enumerator = function (value) {
        if (this instanceof Enumerator) {
            return new impl_Enumerator(name, symbol, index, value);
        } else {
            return matcher(symbol)(value);
        }
    };
    return Enumerator;
};

const matcher = symbol => matcher => {
    const impl_matcher = _enum => {
        if (typeof matcher == "undefined") {
            return [_enum.tag == symbol, _enum.value];
        } else if (matcher.isMatcher) {
            const [m, v] = matcher(_enum.value);
            return [_enum.tag == symbol && m, v];
        } else {
            return [_enum.tag == symbol && _enum.value == matcher, _enum.value];
        }
    };
    Object.defineProperty(impl_matcher, "isMatcher", { get: () => true });
    Object.freeze(impl_matcher);
    return impl_matcher;
};

module.exports = {
    enumerator
};
