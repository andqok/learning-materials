// nextBigger

function nextBigger(n){
    var array  = permutations((n + ''))
                 .map(x => +x)
                 .sort((x, y) => x - y)
    
    return array[array.indexOf(n) + 1]
  
    function permutations(string) {
      if (string.length < 2) return string;
      var res = [];
      for (var i = 0; i < string.length; i += 1) {
          var char = string[i];
          if (string.indexOf(char) != i)
              continue;
          var remainingString = string.slice(0, i) 
                              + string.slice(i + 1, string.length);
          for (var subPermutation of permutations(remainingString))
              res.push(char + subPermutation)
      }
      return res;
    }
}