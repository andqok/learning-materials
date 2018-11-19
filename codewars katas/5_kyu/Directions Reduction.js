// https://www.codewars.com/kata/directions-reduction

function dirReduc(arr){
  if (arr.length <= 1) { return arr }

  if ( check(arr) ) {
    return dirReduc( sliced(arr, 2) )
  } else {
      let previous = [arr[0]].concat(
          dirReduc( sliced(arr, 1) )
        )
      if (check(previous)) {
          previous = sliced(previous, 2)
      }
      return previous
  }

  function check (arr) {
      if (arr.length < 2) { return false }
      return Boolean({ "NORTH": { "SOUTH": true },
                       "WEST":  { "EAST":  true },
                       "EAST":  { "WEST":  true }, 
                       "SOUTH": { "NORTH": true }}[arr[0]]
                                                  [arr[1]])
  }
  function sliced(arr, i) {
      return arr.slice(i, arr.length)
  }
}

console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]))
