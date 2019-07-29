// if can give change

// testground.js
var c = console.log
var mycash  = []
var stats   = {} // divisors

function tickets(people, price) {
  var     queue = people.filter((el, i, a) => i === a.indexOf(el))
  var banknotes = [1, 2, 5, 10, 20, 50, 100, 200, 500]
  for (let b of banknotes) { stats[b] = [] }

  for (let banknote of banknotes) {
    stats[banknote] = getDivisors(banknote)
  }
  
  for (let person of queue) {
    processItem(person)
  }
  c(stats)

  function getDivisors(banknote) {
    var stats = []
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199 ]

    return (function retourner( banknote ) {
        
        for (let divisor of primes) {
            if (banknote === 1) {
              stats.push(1)
              return stats
            }
            if ( (banknote / divisor) === 1) {
                stats.push( divisor )
                return stats
            }
            if ( (banknote % divisor) === 0 ) {
                stats.push( divisor )
                return retourner(banknote / divisor)
            }
            if ( isPrime(banknote) ) {
                stats.push( banknote )
                return stats
            }

        }
        function isPrime(num) {
            for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false; 
            return num !== 1;
        }

    })(banknote)
  }

  function processItem(item) {
    var rest
    if (item === price) {
      mycash.push(item)
    } else {
      mycash.push(item)
      rest = item - price
    }
    if (rest) {
      checkIfRest( rest, getDivisors(rest) )
    }
  }

  function checkIfRest(rest, divisors) {
    var divisors2 = []
    for (let item of mycash) {
      divisors2 = getDivisors(item)
      c(rest)
      c(divisors)
      c('--')
      c(item)
      c(divisors2)
      c('----')
    }
    c('Shakatak')
  }
}

tickets([20, 50, 20, 100, 50], 30)
