const {maybeFunction} = require("./utility");

/**
 * 列挙型の生成
 * @param  {...any} tags タグ名
 */
const Enum = function (...tags) {
    const expectThenMatch = (tag, val, res, mthodGen) => ({
        expect: mthodGen(mthodGen, tag, val, res, true),
        catch: _ => res
    });
    const expectThenUnmatch = (tag, val, res, mthodGen) => ({
        expect: mthodGen(mthodGen, tag, val, res, false),
        catch: proc => maybeFunction(proc)(val)
    });
    const expectThenPass = (tag, val, res, mthodGen) => ({
        expect: mthodGen(mthodGen, tag, val, res, true),
        catch: _ => res
    });
    const expectMehodGen = (mthodGen, tag, val, res, processed) =>
        tagId => ({
            then: proc =>
                tagId === tag && !processed ? expectThenMatch(tag, val, maybeFunction(proc)(val), mthodGen) :
                !processed ? expectThenUnmatch(tag, val, res, mthodGen) :
                expectThenPass(tag, val, res, mthodGen)
        });

    for(const tag of tags) {
        const symbol = Symbol(tag);
        this[tag] = function(val){
            this.name = () => tag;
            this.value = () => val;
            this.expect = expectMehodGen(expectMehodGen, symbol, val);
            this.tag = () => symbol;
            this.is = $ => $ == symbol;
            Object.freeze(this);
        };
        this['$'+tag] = symbol;
    }
    Object.freeze(this);
}

const match = enumeratable => ({
    with: candidate => {
        const tag = enumeratable.tag();
        if(tag in candidate) {return candidate[tag](enumeratable.value())}
        if("_" in candidate) {return candidate['_'](enumeratable.value())}
        throw "no candidate was matched.";
    }
})

const Option = new Enum("Some", "None");
const Result = new Enum("Ok", "Err");

const resultOf = async promise => {
    try {
        const result = await promise;
        return new Result.Ok(result);
    } catch(err) {
        return new Result.Err(err);
    }
};

const $Some = val => new Option.Some(val);
const $None = val => new Option.None(val);
const $Ok = val => new Result.Ok(val);
const $Err = val => new Result.Err(val);

module.exports = {Enum, match, Option, Result, resultOf, $Some, $None, $Ok, $Err};