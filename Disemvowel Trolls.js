// https://www.codewars.com/kata/disemvowel-trolls

function disemvowel(str) {
  let vovels = 'aeoiu'.split('')

  return str.split('').map(char => {
    if (vovels.includes(char.toLowerCase())) {
      return ''
    } else {
      return char
    }
  }).join('')
}
