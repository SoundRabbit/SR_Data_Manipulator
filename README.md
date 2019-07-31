# SR_Enum

[![Build Status](https://travis-ci.org/SoundRabbit/SR_Enum_JS.svg?branch=master)](https://travis-ci.org/SoundRabbit/SR_Enum_JS)

``` js
const { Enum } = require("sr-enum");

const OriginalEnum = new Enum(
    "You",
    "Can",
    "Make",
    "Original",
    "Enum",
    "Class"
);

const foo = new OriginalEnum.You(
    "Each enumeratior can have a value"
);

// .name property returns own tag name
assert(foo.name === "You");

// .tag property returns Symbol of own tag
assert(foo.tag !== Symbol("You")); //false

// "$" + [tag name] means Sybom of each tags
assert(foo.tag === OriginalEnum.$You); //true
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
import {Enum, match, maybe, option, result, Maybe, Option, Result} from "sr-data-manipulator";
```

## What's this

This packege give you Enum.

## `Enum`

`Enum(...tags)` make enumeration. Tags should be String witch does not begin with "$" .

Enumeration maek enumerator by `new [enumeration].[enumerator]([value])` , and enumerator can have a value.

## `match`

``` js
const { Enum, match } = require("sr-enum");

const FooBar = new Enum("Foo", "Bar", "Baz", "Qux");

let mayBeFoo = mayBeFoo = new FooBar.Foo("hello");

const foo = match(mayBeFoo).with({
    [Foobar.$Foo]   : val =? val + " SR_D_M !", // when foo.tag() equals to Foobar.$Foo
    [Foobar.$Bar]   : val => val,               // when foo.tag() equals to Foobar.$Bar
    _               : _ => "others"             // "_" means default
});

let mayBeFoo = mayBeFoo = new FooBar.Foo("Hello");

const foo = match(mayBeFoo).with({
    [Foobar.$Foo]   : val =? val + " SR_D_M !", // when foo.tag() equals to Foobar.$Foo
    [Foobar.$Bar]   : val => val,               // when foo.tag() equals to Foobar.$Bar
    _               : _ => "Others"             // "_" means default
});

assert(foo === "Hello SR_D_M !");

const mayBeFoo = new FooBar.Baz("Hello");

const baz = match(mayBeFoo).with({
    [Foobar.$Foo]   : val =? val + " SR_D_M !", // when foo.tag() equals to Foobar.$Foo
    [Foobar.$Bar]   : val => val,               // when foo.tag() equals to Foobar.$Bar
    _               : _ => "Others"             // "_" means default
});

assert(baz === "Others")
```

## `Maybe`

### definition

```js
const Maybe = new Enum("Just", "Nothing");
```

### `promise`

`maybe.promise : Maybe -> Promise`

```js
const { Maybe, maybe } = require("sr-enum");

const a = await maybe
    .promise(new Maybe.Just(1))
    .then(val => val * 10)
    .catch(_ => 100);

const b = await maybe
    .promise(new Maybe.Nothing())
    .then(val => val * 10)
    .catch(_ => 100);

assert(a === 10);
assert(b === 100);
```

## Option

### definition

```js
const Option = new Enum("Some", "None");
```

### `promise`

`option.promise : Option -> Promise`

```js
const { Option, option } = require("sr-enum");

const a = await option
    .promise(new Option.Some(1))
    .then(val => val * 10)
    .catch(_ => 100);

const b = await option
    .promise(new Option.None())
    .then(val => val * 10)
    .catch(_ => 100);

assert(a === 10);
assert(b === 100);
```

## Result

### definition

```js
const Result = new Enum("Ok", "Err");
```

### `promise`

`result.promise : Result -> Promise`

```js
const { Result, result } = require("sr-enum");

const a = await result
    .promise(new Result.Ok(1))
    .then(val => val * 10)
    .catch(_ => 100);

const b = await result
    .promise(new Result.Err("error"))
    .then(val => val * 10)
    .catch(val => val + "!");

assert(a === 10);
assert(b === "error!");
```
