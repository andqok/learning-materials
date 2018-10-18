// https://www.codewars.com/kata/persistent-bugger/javascript

function persistence(num) {
  var counter = 0
  return recursiva( prepare( num ) )

  function recursiva(array) {
    let newnum = array.reduce(function (previousValue, currentValue, index, array) {
      return +previousValue * +currentValue
    })
    if (newnum.length !== 1) {
      counter += 1
      recursiva( prepare( newnum ) )
    }
    return counter
  }

  function prepare(n) {
    return (n + '').split('')
  }
}
