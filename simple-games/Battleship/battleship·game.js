var map = [];

function createEmpty(size) {
  for (let a = 0; a < size; a += 1) {
    let line = []
    for (let b = 0; b < size; b += 1) {
      line[b] = '~'
    }
    map[a] = line
  }
  map.size = size
  map.area = 0
}

createEmpty(10)

function populate() {
  var maxArea = "20%"
  var battleships = { "2": 0,
                      "3": 0,
                      "4": 0,
                      "5": 0 }
//  while ( map.area < parseInt(maxArea) ) {
    Object.keys(battleships).forEach( function(ship) {
      generate( parseInt(ship) )
//      measure()
    })
//  }
  function generate(length) {
    var init = generateInitialCoordinates();
    function   generateInitialCoordinates() {
      var initialCoord_X = Math.floor(Math.random() * map.size)
      var initialCoord_Y = Math.floor(Math.random() * map.size)
      if (map[initialCoord_X][initialCoord_Y] !== '~') {
        generateInitialCoordinates()
      } else {
        return [initialCoord_X, initialCoord_Y]
      }
    }
    var mainAxis = Math.random() >= 0.5
    mainAxis ? mainAxis = 'X' :
               mainAxis = 'Y'
    var ship = {
      'mainAxis'   : mainAxis,
      'length'     : length,
      'coordinates': [init]
    }

    for (let k = 1; k < ship.length; k += 1) {
      var newCoord  = []
      var otherAxis = []
      ship.coordinates.forEach(function(t){
        console.log(ship.coordinates)
        otherAxis.push( t[1] )
      })
      if (ship.mainAxis === "X") {
        sameValue(0); diffValue(1)
      } else {
        sameValue(1); diffValue(0)
      }
      function sameValue(y) {
        newCoord[y] = ship.coordinates[0][y]
      }
      function diffValue(y) {
        let maxValue = Math.max.apply(null, otherAxis)
        let minValue = Math.min.apply(null, otherAxis)
        if ( minValue <= 0 ) {
          newCoord[y] = maxValue + 1
        }
        if ( maxValue === 9 ) {
          newCoord[y] = minValue - 1
        } else {
          let rand = Math.random() > 0.5
          rand ? rand = -1 :
                 rand =  1
          newCoord[y]  = minValue + rand
        }
      }
      ship.coordinates[k] = newCoord;
    }
    doMap(ship)
  }
  
  function doMap(ship) {
    ship.coordinates.forEach(function(a){
      var x = a[0]
      var y = a[1]
      map[x][y] = "🚢"
    })
  }
}
populate()
console.log(map)
