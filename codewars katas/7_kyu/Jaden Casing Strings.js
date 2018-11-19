// https://www.codewars.com/kata/jaden-casing-strings

String.prototype.toJadenCase = function () {
  let newwords = []
  for (let word of this.split(' ')) {
    let newword = ''
    for (let charnum = 0; charnum < word.length; charnum += 1) {
      if (charnum === 0) {
        newword += word[charnum].toUpperCase()
      } else {
        newword += word[charnum]
      }
    }
    newwords.push(newword)
  }
  return newwords.join(' ')
};
