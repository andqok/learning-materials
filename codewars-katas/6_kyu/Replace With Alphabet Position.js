// https://www.codewars.com/kata/replace-with-alphabet-position/javascript

function alphabetPosition(text) {
  let tex = text.toLowerCase()
  let result = []
  for (let char of tex) {
    let res = char.charCodeAt(0) - 96
    if (res > 0 && res <= 26) {
      result.push( res )
    }
  }
  return result.join(' ')
}
