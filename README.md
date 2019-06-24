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

This packege give you Enum 

## How to use ?