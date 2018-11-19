// https://www.codewars.com/kata/youre-a-square/javascript

var isSquare = function(n){
  newn = Math.sqrt(n)
  if (Math.floor( newn ) === newn ) {
    return true
  } else {
    return false
  }
}
