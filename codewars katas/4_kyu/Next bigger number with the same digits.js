// https://www.codewars.com/kata/next-bigger-number-with-the-same-digits

function nextBigger(number) {

  var numberArr = (number + '').split('').map( x => +x )
  var length = numberArr.length

  for (let i = 0; i < length; i += 1) {
    let charAddress = length - (1 + i)
    let char = numberArr[ charAddress ]
    let rightHalf = numberArr.slice(charAddress + 1, length )

    for (let a = 0; a < rightHalf.length; a += 1) {
      var prevChar = rightHalf[ a ]
      if (char < prevChar) {
        return +operate( rightHalf, char, charAddress ).join('')
      }
    }
  }

  return -1

  function operate(rightHalf, char, charAddress) {
    let        leftHalf = numberArr.slice(0, charAddress )
    let rightHalfSorted = rightHalf.sort((x, y) => x - y)
    let result = []
    for (let el of rightHalfSorted) {

      if (el !== 0 && !result[0] && el > char) {
        rightHalfSorted.splice(rightHalfSorted.indexOf(el) , 1)

        result = leftHalf
        result.push( el )
        rightHalfSorted.push( char )
        rightHalfSorted = rightHalfSorted.sort( (x, y) => x - y )
        break
      }
    }
    return result.concat(rightHalfSorted)
  }
}
