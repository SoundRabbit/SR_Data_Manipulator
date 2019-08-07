const { Enumerator } = require("./enumerator");

class Enum {
    constructor(...tags) {
        this["$$"] = [];
        for (const [tagIndex, tag] of tags.entries()) {
            const tagName = String(tag);

            if (tagName[0] == "$") {
                throw `Tag name : "${stringifyTag}" has unpermitted token. Tag name should begin with a character EXCEPT '$'.`
            }

            const tagSymbol = Symbol(tagName);
            const enumerator = Enumerator.bind(this, tagName, tagSymbol, tagIndex);
            this[tagName] = enumerator;
            this["$$"].push(enumerator);
            this["$$tag"] = tagSymbol;
            this[`$${tagName}`] = tagSymbol;
        }
        Object.freeze(this);
    }
}

module.exports = { Enum };
