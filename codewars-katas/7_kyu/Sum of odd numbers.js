// https://www.codewars.com/kata/sum-of-odd-numbers

function rowSumOddNumbers(n) {
  var row = [1]
  n -= 1

  while (n--) {
    let newstart = row.pop()
    let length   = row.length + 2
    row = []
    while (length--) {
      newstart += 2
      row.push(newstart)
    }
  }
  return row.reduce( function (a, b) {
    return a + b
  })
}
