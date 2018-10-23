// https://www.codewars.com/kata/island-count

function countIslands (mapStr) {
  var length = mapStr.indexOf('\n') + 1
  var mapArr = mapStr.split('\n').join('.').split('')
  var islands = []

  for (let i = 0; i < mapArr.length; i += 1) {
    if (mapArr[i] === '0') {
      islands.push(seekNeighbors(i, [i]))
    } else if (mapArr[i] === '.') {
      mapArr[i] = false
    }
  }
  return islands.length
  
  function seekNeighbors(cell, island) {
    
    for (let coord of [ -1, 1, -length, length]) {
      let neighbor = cell + coord

      if (mapArr[neighbor] === '0') {
        mapArr[neighbor] = false
        island.push(neighbor)
        seekNeighbors(neighbor, island)
      }
    }
    return island
  }
}
var c = console.log
c(countIslands('0...0\n0...0\n00000'))
