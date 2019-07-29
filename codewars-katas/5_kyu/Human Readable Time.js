// https://www.codewars.com/kata/human-readable-time/javascript

function humanReadable(sec) {
    let hours   = generateCounter(3600)
    let minutes = generateCounter(60)
    let seconds = generateCounter(1)
    
    return `${hours()}:${minutes()}:${seconds()}`
  
    function generateCounter(num) {
        return function () {
            let rt = Math.floor(sec / num)
            sec -= rt * num
            return String(rt).padStart(2, '0')
        }
    }
}
