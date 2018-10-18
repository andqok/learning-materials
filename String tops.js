// https://www.codewars.com/kata/string-tops/javascript

function tops(msg) {
  var msgArray = msg.split('');
  var resArray = [];
  var  step = 1;
  var coord = 1;
  while (coord <= msgArray.length) {
    resArray.push( msgArray[ coord ] )
    step  += 1;
    coord += step; 
    step  += 1;
    coord += step;
  }

  return resArray.reverse().join('')
}
