# SR_Data_Manipulator

**This package has possible to be diveded into some packages, and to be cold to develop when this is version 1.0.0**

[![Build Status](https://travis-ci.org/neunyan/SR_Data_Manipulator.svg?branch=master)](https://travis-ci.org/neunyan/SR_Data_Manipulator)

``` js
const {Result, match} = require("sr-data-manipulator");

const response = new Result.Ok("You can use \"Enum\" on JavaScript !");

match(response).with({
    [Result.$Ok] : message => console.log(message),
    [Result.$Err] : () => console.log()
});

// You can use "Enum" on JavaScript !
```

``` js
const {Enum} = require("sr-data-manipulator");

const OriginalEnum = new Enum("you", "can", "make", "original", "enum", "class");

const foo = new OriginalEnum.you("Each enumeratior can have a value");

// .name() method returns own tag name
console.log(foo.name == "you");   //true

// .tag() method returns Symbol of own tag
console.log(foo.tag == Symbol("you")) //false

// "$" + [tag name] means Sybom of each tags
console.log(foo.tag == OriginalEnum.$you) //true
```

## How to install

```bash
> npm install sr-data-manipulator
```

## Caution

This module is beta-version. It means that the module probably will be in radical changing.

## require / import

You can require all modules as follows.

``` js
// Enum
const {Enum, match, Option, Result, resultOf, $Some, $None, $Ok, $Err} = require("sr-data-manipulator");

// Pipeline
const {Pipeline, Pipe, Adaptor:{$, R}} = require("sr-data-manipulator");
```

You can import all modules as follows.

``` js
// Enum
import {Enum, match, Option, Result, resultOf, $Some, $None, $Ok, $Err} from "sr-data-manipulator";

// Pipeline
import {Pipeline, Pipe, Adaptor:{$, R}} from "sr-data-manipulator";
```

## What's this

This packege give you Enum and pipeline-process.

### Enum

`Enum(...tags)` make enumeration. Tags should be String witch does not begin with "$" .

Enumeration maek enumerator by `new [enumeration].[enumerator]([value])` , and enumerator can have a value.

#### expect

```js
const FooBar = new Enum("Foo", "Bar", "Baz", "Qux");

let mayBeFoo = new FooBar.Foo("fooooo!");

mayBeFoo.expect(FooBar.$Foo)
    .then(val => console.log(val))  // "fooooo!" will be shown
    .catch(val => console.log(val)) // nothing will be shown

mayBeFoo = new FooBar.Bar("FOOOOO!!");

mayBeFoo.expect(FooBar.$Foo)
    .then(val => console.log(val))  // nothing will be shown
    .catch(val => console.log(val)) // "FOOOOO!!" will be shown

mayBeFoo = new FooBar.Baz(10);

const foo = mayBeFoo.expect(FooBar.$Foo)
    .then(val => 10 + 1)
    .catch(val => 10 - 1);

console.log(foo);   // "9" will be shown
```

#### match

``` js
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

console.log(foo); // "Hello SR_D_M !" will be shown

let mayBeFoo = mayBeFoo = new FooBar.Baz("Hello");

const baz = match(mayBeFoo).with({
    [Foobar.$Foo]   : val =? val + " SR_D_M !", // when foo.tag() equals to Foobar.$Foo
    [Foobar.$Bar]   : val => val,               // when foo.tag() equals to Foobar.$Bar
    _               : _ => "Others"             // "_" means default
});

console.log(baz); // "Others" will be shown
```

#### default enums

``` js
Option = new Enum("Some", "None");
Result = new Enum("Ok", "Err");

$Some = value => new Option.Some(value);
$None = value => new Option.Some(value);
$Ok = value => new Option.Some(value);
$Err = value => new Option.Some(value);
```

### Pipeline

`Pipeline(...Adaptors)` make pipeline with adaptors. Adaptor is a function `(process: function(any -> any), data: any) -> result: any`. Each adaptor means how to adapt previous result to process.

`Pipe` is default pipeline, witch has `$` to pass through previous result and `R` to undeal `Result.Err`.

#### Pipe

```js
const someData = "Pipeline of SR_D_M";
try{
    const result = await (new Pipeline(someData))
        .$(value => value + " !")           //Pipeline of SR_D_M !
        .$(value => $Ok(value))             //Result.Ok("Pipeline of SR_D_M !")
        .R(value => value.length)           //20
        .$(_ => $Err("some thing errored")) //Result.Err("some thing errored")
        .R(value => value + "!")            //will not be dealed
        .R(value => value + "!")            //will not be dealed
        .$("Pipeline_of_SR_D_M !")          //Pipeline_of_SR_D_M !    --you can overwrite previous result
        .$(async value =>{                  //you can use "async" and "await" in pipeline
            await promiseFunction(value);
            await promiseFunction(value);
            await promiseFunction(value);
        })
        .$(some_process).$(some_process).$(some_process)
        .$(some_process).$(some_process).$(some_process)
} catch(err) {
    you_can_get_promise_exception_in_pipeline(err);
}
```
