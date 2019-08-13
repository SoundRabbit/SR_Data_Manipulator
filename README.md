# SR_Enum

[![Build Status](https://travis-ci.org/SoundRabbit/SR_Enum_JS.svg?branch=master)](https://travis-ci.org/SoundRabbit/SR_Enum_JS)

``` js
const { Enum, match, unMatched } = require("sr-enum"); //or: import {Enum, match} from "sr-enum";

// this means
//
// ```
// enum OriginalEnum {
//     You: any,
//     Can: any,
//     .
//     .
//     .
// };
// ```
const OriginalEnum = new Enum(
    "You",
    "Can",
    "Make",
    "Original",
    "Enum",
    "Class"
);

// [Enum].[Enumerator] is constructor for enumerator.
const foo = new OriginalEnum.You(
    "Each enumeratior can have a value"
);

// .name property returns own tag name
assert(foo.name === "You");

// .tag property returns Symbol of own tag
assert(foo.tag !== Symbol("You"));

// "$" + [tag name] means Sybom of each tags
assert(foo.tag === OriginalEnum.$You);

// pattern match
const isFoo = match(foo)(
    // [Enum].[Enumerator]() is mathcer for enumerator.
    [OriginalEnum.You(12345), v => v + " !!?"],
    [OriginalEnum.You(), _ => "matched !!"],
    [OriginalEnum.Can(), v => v + " !"],
    [OriginalEnum.Make(), v => v + "."],
    [OriginalEnum.Original(), v => v + " ??"],
    [OriginalEnum.Enum(), v => v + " ?"],
    [OriginalEnum.Class(), v => v + "!?"],
    // in this case, default pattern will match foo is not enumerator of OriginalEnum
    [match.default, _ => "matched !!"]
);

assert(isFoo == "Each enumeratior can have a value !!");

// pattern match - 2
let isFoo_2;
if(OriginalEnum.You(12345)(foo) !== unMatched) {
    isFoo_2 = "foo is You(12345)";
}else if(OriginalEnum.You()(foo) !== unMatched) {
    isFoo_2 = "foo is You( not 12345 )";
}else {
    isFoo_2 = "unmatched !!";
}

assert(isFoo_2 == "foo is You( not 12345 )";
```

``` js
const { Maybe, maybe } = require("sr-enum");
const res = [
    maybe
        .$(new Maybe.Just(1))   // create method chain
        .map(v => v + 1)        // map : (a -> b) -> Maybe b
        .map(v => v + 1)
        .map(v => v + 1)
        .withDefault(0),
    maybe
        .$(new Maybe.Just(1))
        .andThen(_ => new Maybe.Nothing())  // andThen : (a -> Maybe b) -> Maybe b
        .withDefault(0)
];

assert(res[0] === 4);
assert(res[1] === 0);
```

## How to install

```bash
> npm install sr-enum
```

## Caution

This module is beta-version. It means that the module probably will be in radical changing.

## require / import

You can require all modules as follows.

``` js
// Enum
const {Enum, match, maybe, option, result, Maybe, Option, Result} = require("sr-enum");
```

You can import all modules as follows.

``` js
// Enum
import {Enum, match, maybe, option, result, Maybe, Option, Result} from "sr-enum";
```

## What's this

This packege give you Enum.

## Usage

### To make new enumeration type

To make new enumeration type, you can use `new Enum(...tags)`.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
```

### To make new enumerator of an enumeration type

To make new enumerator of an enumeration type, you can use `new [Enum].[Enumerator](value)`.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
const foo = new EnumType.Foo(112358);
```

## `match`

definition: `match: enumerator -> candidates -> any`

syntax: `match([enumerator])({candidates})`

candidates: `[candidate]`

candidate: `[mathcer, process]`

sample

``` js
const { Enum, match } = require("sr-enum");

const FooBar = new Enum("Foo", "Bar", "Baz", "Qux");

let mayBeFoo = new FooBar.Bar(new FooBar.Foo("Hello"));

const foo = match(mayBeFoo)(
    [FooBar.Foo(FooBar.Bar()),          v => v],
    [FooBar.Foo("Hi"),                  v => v + "!"],
    [FooBar.Bar("Hello"),               v => v + "!!"],
    [FooBar.Bar(FooBar.Foo("Hi")),      v => v + "?"],
    [FooBar.Bar(FooBar.Foo("Hello")),   v => " SR_EM !"],
    [match.default,                     v => v + v "!?"]
)

assert(foo === "Hello SR_EM !");
```

## mehods and propaties in `Enumerator`

### `value` : any

The value each enumerator has.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
const foo = new EnumType.Foo(112358);

assert(foo.value === 112358);
```

### `name` : string

The tag name each enumerator has.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
const foo = new EnumType.Foo(112358);

assert(foo.name === "Foo");
```

### `tag` : Symbol

The tag symbol each enumerator has.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
const foo = new EnumType.Foo(112358);

assert(foo.tag === EnumType.$Foo);
```

### `index` : number

The index each enumerator has.

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");

assert((new EnumType.Foo(112358)).index === 0);
assert((new EnumType.Bar(112358)).index === 1);
assert((new EnumType.Baz(112358)).index === 2);
assert((new EnumType.Qux(112358)).index === 3);
```

### `is` : function(Symbol) -> boolean

sample

```js
const EnumType = new Enum("Foo", "Bar", "Baz", "Qux");
const foo = new EnumType.Foo(112358);

assert(foo.is(EnumType.$Foo));
assert(! foo.is(EnumType.$Bar));
```

### `to` : function(Enum) -> Enumerator

map Enumerator to other Enumerator by index.

sample

```js
const State = new Enum("First", "Second", "Third", "Last");
const StateInv = new Enum("Last", "Third", "Second", "First");

assert((new State.First()).to(StateInv).name === "Last");
assert((new State.Second()).to(StateInv).name === "Third");
assert((new State.Third()).to(StateInv).name === "Second");
assert((new State.Last()).to(StateInv).name === "First");
```

### `mapWith` : function( function(Enumerator) -> any ) -> any

map Enumerator to other value with mapper.

### `wrapWith` : function( function(Enumerator) -> wrapper ) -> wrapper

wrap Enumerator. wrapper should has "get" mehod to unwrap.

## buildin enum

### `Maybe`

```js
const Maybe = new Enum("Just", "Nothing");
```

### `Option`

```js
const Option = new Enum("Some", "None");
```

### `Result`

```js
const Option = new Enum("Ok", "Err");
```

## functions

### `$`

`maybe.$` , `option.$` and `result.$` can make method chain for each enumerators.

sample with Maybe - 1

```js
const {maybe} = require("sr-enum");
const methodChain = maybe.$( /*some maybe value*/ );
```

sample with Maybe - 2

```js
const {maybe} = require("sr-enum");
const methodChain = ( /*some maybe value*/ ).wrapWith(maybe.$);
```

#### `map(function | value)`

`maybe.$.map` map value when enumerator is `Maybe.Just`.

`option.$.map` map value when enumerator is `Option.Some`.

`result.$.map` map value when enumerator is `Result.Ok`.

sample with Maybe

```js
// it will return new Maybe.Just(2)
maybe.$( new Maybe.Just(1) ).map(v => v + 1);
```

#### `andThen(function | value)`

`maybe.$.andThen` chain value when enumerator is `Maybe.Just`.

`option.$.andThen` chain value when enumerator is `Option.Some`.

`result.$.andThen` chain value when enumerator is `Result.Ok`.

sample with Maybe

```js
// it will return new Maybe.Just(2)
maybe.$( new Maybe.Just(1) ).andThen(v => new Maybe.Just(v + 1));
```

#### `withDefault(any)`

`withDefault` return value of enumerator with default value.

sample with Maybe

```js
// it will return 100
maybe.$( new Maybe.Nothing(1) ).map(v => v + 1).withDefault(100);
```

#### `boolean`

Convert to `Boolean`.

sample with Result.

```js
// it will return false
result.$( new Result.Err(1) ).boolean();

// it will return true
result.$( new Result.Ok(1) ).boolean();
```

#### `promise`

Convert to `Promise.resolve` or `Promise.reject`.

sample with Option

```js
const { Option, option } = require("sr-enum");

const a = await option
    .$(new Option.Some(1))
    .promise()
    .then(val => val * 10)
    .catch(_ => 100);

const b = await option
    .$(new Option.None())
    .promise()
    .then(val => val * 10)
    .catch(_ => 100);

assert(a === 10);
assert(b === 100);
```

### map, andThen, withDefault, boolean, promise

You can use these as not a menber of $. This is useful when you use sr_enum in context of lodash, promise methodcahin and so on.
