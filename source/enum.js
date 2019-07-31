const { Enumerator } = require("./enumerator");

class Enum {
    constructor(...tags) {
        for (const [tagIndex, tag] of tags.entries()) {
            const tagName = String(tag);

            if (tagName[0] == "$") {
                throw $Err(
                    `Tag name : "${stringifyTag}" has unpermitted token. Tag name should begin with a character EXCEPT '$'.`
                );
            }

            const tagSymbol = Symbol(tagName);
            this[tagName] = Enumerator.bind(this, tagName, tagSymbol, tagIndex);
            this[`$${tagName}`] = tagSymbol;
        }
        Object.freeze(this);
    }
}

module.exports = { Enum };
