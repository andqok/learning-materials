// https://www.codewars.com/kata/josephus-permutation

function josephus(items,k){
  var res = []
  var pos = 0

  while (items.length > 0) {
      pos += k - 1
      if (pos >= items.length) pos = pos % items.length 
      res.push( items.splice(pos, 1)[0] )
  }
  return res
}

function josephus2(items,k){
  var res = []
  var position = 0
  var len = items.length
  for (let a = 0; a < len; a += 1) {
      position += k - 1
      console.log(items + "  " + position)
      if (position >= items.length) {
        position = position % items.length      
      }
      res.push( items[position] )
      items.splice(position, 1)
  }
  return res
}
