const name_ = Symbol("name");
const tag_ = Symbol("tag");
const index_ = Symbol("index");
const value_ = Symbol("value");

class impl_Enumerator {
    constructor(name, symbol, index, value) {
        this[value_] = value;
        this[name_] = name;
        this[tag_] = symbol;
        this[index_] = index;
        this.tag = symbol;
        this.name = name;
        Object.freeze(this);
    }

    is(tag) {
        return this[tag_] == tag;
    }

    to(Enum) {
        const index = this[index_]
        return new Enum.$$[index](this[value_]);
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

const unMatched = Symbol("unMatched");

const matcher = symbol => matcher => {
    const impl_matcher = _enum => {
        if (typeof matcher == "undefined") {
            return _enum[tag_] == symbol ? _enum[value_] : unMatched;
        } else if (matcher.isMatcher) {
            const v = matcher(_enum[value_]);
            return _enum[tag_] == symbol ? v : unMatched;
        } else {
            return _enum[tag_] == symbol && _enum[value_] == matcher
                ? _enum[value_]
                : unMatched;
        }
    };
    Object.defineProperty(impl_matcher, "isMatcher", { get: () => true });
    Object.freeze(impl_matcher);
    return impl_matcher;
};

module.exports = {
    enumerator,
    unMatched,
    name_,
    tag_,
    index_,
    value_
};
