# SR_Data_Manipulator

``` JavaScript
const response = new Result.Ok("You can use \"Enum\" on JavaScript !");

match(response).with({
    [Result.$Ok] : message => console.log(message),
    [Result.$Err] : () => console.log()
});

// You can use "Enum" on JavaScript !
```

``` JavaScript
const OriginalEnum = new Enum("you", "can", "make", "original", "enum", "class");

const foo = new OriginalEnum.you("Each enumeratior can have a value");

// .name() method returns own tag name
console.log(foo.name() == "you");   //true

// .tag() method returns Symbol of own tag
console.log(foo.tag() == Symbol("you")) //false

// "$" + [tag name] means Sybom of each tags
console.log(foo.tag() == OriginalEnum.$you) //true
```

## What's this ?

This packege give you Enum and pipeline-process.

### Enum

`Enum(...tags)` create enumeration. Tags should be String witch does not begin with "$" or "_" .

Enumeration create enumerator by `new [enumeration].[enumerator]([value])` , and enumerator can have a value.

#### expect

```js
const FizzBuzz = new Enum("Fizz", "Buzz", "FizzFizz");

let mayBeFizz = new FizzBuzz.Fizz("fooooo!");

mayBeFizz.expect(FizzBuzz.$Fizz)
    .then(val => console.log(val))  // "fooooo!" will be shown
    .catch(val => console.log(val)) // nothing will be shown

mayBeFizz = new FizzBuzz.Buzz("FOOOOO!!");

mayBeFizz.expect(FizzBuzz.$Fizz)
    .then(val => console.log(val))  // nothing will be shown
    .catch(val => console.log(val)) // "FOOOOO!!" will be shown
```

#### match

#### default enums

``` JavaScript
Option = new Enum("Some", "None");
Result = new Enum("Ok", "Err");

$Some = value => new Option.Some(value);
$None = value => new Option.Some(value);
$Ok = value => new Option.Some(value);
$Err = value => new Option.Some(value);
```

### pipeline

## How to use ?