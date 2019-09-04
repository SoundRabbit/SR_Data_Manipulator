# SR_Enum

[![Build Status](https://travis-ci.org/SoundRabbit/SR_Enum_JS.svg?branch=master)](https://travis-ci.org/SoundRabbit/SR_Enum_JS)

``` js
const { Enum, match, unMatched } = require("sr-enum");
//or: import {Enum, match} from "sr-enum";

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


// match with object - 1

const matchWithObject_1 = match(foo)({
        You : _ => 10,
        Can : _ => 11,
        Make : _ => 12,
        default: _ => 13
    });

assert(matchWithObject_1 === 10);


// match with object - 2
//
// "$" + [tag name] means Symbol of each tags

const matchWithObject_2 = match(foo)({
        [OriginalEnum.$You] : _ => 20,
        [OriginalEnum.$Can] : _ => 21,
        [OriginalEnum.$Make] : _ => 22,
        default: _ => 13
    });

assert(matchWithObject_2 === 20);


// match with pattern matcher

const matchWithPatternMatcher = match(foo)(
    [OriginalEnum.You(57), _ => 30],
    [OriginalEnum.You(OriginalEnum.Can()), _ => 31],
    [OriginalEnum.You("Each enumeratior can have a value"), _ => 32],
    [OriginalEnum.You(), _ => 33],
    [match.default, _ => 34]
);

assert(matchWithPatternMatcher === 32);


// using pattern macher with assignment
//
// "unMached" is Symbol which is returned when pattern is not matched.
//
// This can be used like "if let" in Rust
//   exapmle:
//   const a = SomeEnum.Foo()(a);
//   if (a !== unMatched) {
//     // process when a is Foo
//   }

const assignment_1 = OriginalEnum.You()(foo);
const assignment_2 = OriginalEnum.Can()(foo);
const assignment_3 = OriginalEnum.Make()(foo);

assert(assignment_1 === "Each enumeratior can have a value");
assert(assignment_2 === unMatched);
assert(assignment_3 === unMatched);


// using pattern matcher with if

let usingPatternMatcherWithIf = 0;
if(OriginalEnum.You(57)(foo) !== unMatched) {
    usingPatternMatcherWithIf = 1;
}else if(OriginalEnum.You(OriginalEnum.Can())(foo) !== unMatched) {
    usingPatternMatcherWithIf = 2;
}else if(OriginalEnum.You()(foo) !== unMatched) {
    usingPatternMatcherWithIf = 3;
}

assert(usingPatternMatcherWithIf === 3);


// using with switch
//
// ! This is not recommended. It is recommended to use match. !

let usingWithSwitch = 0;

switch(foo.name) {
    case "You":
        usingWithSwitch = 1;
        break;
    case "Can":
        usingWithSwitch = 2;
        break;
    case "Make":
        usingWithSwitch = 3;
        break;
    default:
        usingWithSwitch = 4;
}

assert(usingWithSwitch === 1);
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

```js
// using maybe with promise
const { maybe } = require("sr-enum");

const res =
    await a_promise_function()
        .then(maybe.map(v => process(v)))
        .then(maybe.andthen(v => another_promise_function(v)))
        .then(maybe.map(v => process(v)));
```

## How to install

```bash
> npm install sr-enum
```

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

### syntax

match with object

```js

// matching with priority: (1st) tag, (2nd) name, (3rd) default

match(/*enumerator*/)({
    /*tag or name*/ : /*function which is run when enumerator is matched*/,
    /*tag or name*/ : /*function which is run when enumerator is matched*/,
    /*tag or name*/ : /*function which is run when enumerator is matched*/,
    /*tag or name*/ : /*function which is run when enumerator is matched*/,
    default         : /*function which is run when enumerator is unmatched*/,
})

////////////////////////////////////////////////////////////////////////////////

// matcing with priority: order of arguments

match(/*enumerator*/)(
    {/*tag or name*/ : /*function which is run when enumerator is matched*/},
    {/*tag or name*/ : /*function which is run when enumerator is matched*/},
    {/*tag or name*/ : /*function which is run when enumerator is matched*/},
    {/*tag or name*/ : /*function which is run when enumerator is matched*/},
    {default         : /*function which is run when enumerator is unmatched*/},
)

```

match with pettern matcher

```js
match(/*enumerator*/)(
    [/*pattern matcher*/, /*function which is run when enumerator is matched*/],
    [/*pattern matcher*/, /*function which is run when enumerator is matched*/],
    [/*pattern matcher*/, /*function which is run when enumerator is matched*/],
    [/*pattern matcher*/, /*function which is run when enumerator is matched*/],
    [match.default      , /*function which is run when enumerator is unmatched*/]
)
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
