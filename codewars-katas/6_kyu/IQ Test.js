// http://www.codewars.com/kata/iq-test/train/javascript

function iqTest(numbers){
  numbers  = numbers.split(' ')
  var nums = numbers.map(x => isEven(x) ).sort()
  if (nums[1] === false) {
    return findUnusualElement( isEven )
  } else {
    return findUnusualElement( isOdd )
  }
  
  function isEven(i) { return +i % 2 === 0 }
  function isOdd(i)  { return +i % 2 === 1 }

  function findUnusualElement(func) {
    return numbers.findIndex(func) + 1
  }
}

function iqTest2(numbers){
  numbers = numbers.split(' ')
  nums    = numbers.map(x => isEven( +x ) )
                   .sort()
                   .slice(0, 2)

  if (nums[0] !== nums[1]) {
    return retour( isOdd )
  } else {
    return retour( isEven )
  }
  
  function isEven(i) {
    return +i % 2 === 0
  }

  function isOdd(i) {
    return +i % 2 !== 0
  }

  function retour(func) {
    return numbers.findIndex(func) + 1
  }
}
