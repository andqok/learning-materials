// https://www.codewars.com/kata/find-the-missing-letter/javascript

function findMissingLetter(array) {
  for (let i = 1; i < array.length; i += 1) {
    if ( diff(array, i) !== 1) {
      return String.fromCharCode( array[i].charCodeAt(0) - 1 )
    } 
  }
  function diff(a, i) {
    return a[i].charCodeAt(0) - a[i - 1].charCodeAt(0)
  }
}
