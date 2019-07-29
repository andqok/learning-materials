function scramble(str1, str2) {
  str1 = str1.split('')
  str2 = str2.split('')

  for (let a of str2) {
    if (str1[str1.indexOf(a)]) {
        str1[str1.indexOf(a)] = null;
    } else {
      return false
    }
  }
  return true
}

console.time('sentiment')
var a = scramble('javscripts', 'javascript')
console.timeEnd('sentiment')
console.log(a)
