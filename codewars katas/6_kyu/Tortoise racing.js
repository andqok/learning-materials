// https://www.codewars.com/kata/tortoise-racing/javascript

function race(v1, v2, g) {
  if (v1 >= v2) {
    return null
  }
  var seconds = Math.floor( g * 3600/ (v2 - v1) )
  var hours = count(3600)
  var minutes = count (60)

  function count(num) {
    let res = Math.floor(seconds / num)
    if (res > 0) {
      seconds -= num * res
    }
    return res
  }

  return [hours, minutes, seconds]
}
