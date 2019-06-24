const maybeFunction = (f) =>
    (typeof f) == "function" ? f : (..._) => f ;
    
module.exports = {maybeFunction};