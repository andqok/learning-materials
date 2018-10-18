// https://www.codewars.com/kata/calculating-with-functions/javascript

function num(number) {
    return function(fn) {
        if (fn) {
            return fn(number)
        }
        return number
    }
}

const zero  = num(0)
const one   = num(1)
const two   = num(2)
const three = num(3)
const four  = num(4)
const five  = num(5)
const six   = num(6)
const seven = num(7)
const eight = num(8)
const nine  = num(9)

function plus(func) {
    return function(n2) {
        return func + n2
    }
}
function minus (func) {
    return function (n2) {
        return func - n2
    }
}
function times(func) {
    return function (n2) {
        return func * n2
    }
}
function dividedBy(func) {
    return function (n2) {
        return Math.floor(func / n2)
    }
}

var c = console.log
c(seven(times(five())))
