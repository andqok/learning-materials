const romanNumeral = {
    result: 0,
    romanToDecimal: (numeralStr) => {
        var numerals = {
            "I": 1,
            "V": 5,
            "X": 10,
            "L": 50,
            "C": 100,
            "D": 500,
            "M": 1000
        }
        var numeralArr = numeralStr.toUpperCase().split('')
        var arr = []
        var prev
        return processOne(0)

        function processOne(index) {
            var first = numerals[numeralArr[index]]
            if (first === prev) {
                if (arr[arr.length - 1].constructor === Array) {
                    arr[arr.length - 1].push(first)
                } else {
                    arr[arr.length - 1] = [first, first]
                }
            } else if (first != null) {
                arr.push(first)
            }
            prev = first
            if (index < numeralArr.length) {
                processOne(index + 1)
            } else {
                return processPair(arr)
            }
        }
        function processPair(group) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            var first = numOrArr(group[0])
            var second = numOrArr(group[1])
            if (first > second) {
                romanNumeral.result += sumOfNumOrArray(group[0])
            }
            if (first < second) {
                romanNumeral.result -= sumOfNumOrArray(group[0])
            }
            if (group.length >= 2) {
                processPair(group.slice(1))
            } else {
                return romanNumeral.result
            }

            function numOrArr(num) {
                if (num == null) { return 0 }
                if (num.constructor === Array) { return num[0] }
                return num
            }
            function sumOfNumOrArray(num) {
                if (num.constructor === Array) { return num.reduce(reducer) }
                return num
            }
        }
    },
    isRomanNumeral: (str) => {
        var numerals = "IVXLCDM"
        var err = 0
        str.split('').forEach((char) => {
            if (numerals.indexOf(char.toUpperCase()) === -1) {
                err += 1
            }
        })
        if (err === 0) {
            return true
        } else {
            return false
        }
    }
}

romanNumeral.romanToDecimal('LCII')
setTimeout(() => {
    console.log(romanNumeral.result)
}, 0)
