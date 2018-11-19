// https://www.codewars.com/kata/descending-order/javascript

function descendingOrder(n){
  return  +((n + '')
    .split('')
    .sort( (a, b) => {
      return b - a
    })
    .join('') 
    )
}
