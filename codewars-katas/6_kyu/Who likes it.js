// https://www.codewars.com/kata/who-likes-it

function likes(names) {
  var and, like, res
  and = 'and'
  // Why are you breaking at the end of your case? You returned you don't need to break, it is redundant and will never be executed.
  switch(names.length) {
    case  0: res = 'no one'; break
    case  1: res = `${names[0]}`; break
    case  2: res = `${names[0]} ${and} ${names[1]}`; break
    case  3: res = `${names[0]}, ${names[1]} ${and} ${names[2]}`; break
    default: res = `${names[0]}, ${names[1]} ${and} ${names.length - 2} others`; break
  }
  (names.length >= 2) ? like = ' like this'
                      : like = ' likes this'
  return res + like
}

function likes2(names) {
  var like = ' like this'
  switch(names.length) {
    case 0:
      return 'no one likes this'
    break
    case 1:
      return names[0] + ' likes this'
    break
    case 2:
      return names[0] + ' and ' + names[1] + like
    break
    case 3:
      return names[0] + ', ' + names[1] + ' and ' + names[2] + like
    break
    default:
      return names[0] + ', ' + names[1] + ' and ' + (names.length - 2) + ' others' + like
  }
}
