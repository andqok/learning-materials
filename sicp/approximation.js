
function approximation(i, guess) {
    var quotient = i / guess
    var average = (quotient + guess) / 2
    if (goodEnough(average)) {
        return average
    } else {
        return approximation(i, average)
    }

    function goodEnough(guess) {
        let tolerance = 0.000000000001
        
        if (Math.abs(i - (guess * guess)) < tolerance) {
            return true
        } else {
            return false
        }
    }
}

function sqrt (i) {
    return approximation(i, 1)
} 