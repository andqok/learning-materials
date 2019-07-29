function fizzbuzz() {
    var times = 1
    for (; times < 100; times += 1) {
        var res = ''

        res +=  isDivisible(3) ? 'Fizz': ''
        res +=  isDivisible(5) ? 'Buzz': ''
        res += !isDivisible(3) && !isDivisible(5) ? times : ''

        console.log(res)
    }
    function isDivisible(num) {
        if (times % num === 0) {
            return true
        } else {
            return false
        }
    }
}
fizzbuzz()
