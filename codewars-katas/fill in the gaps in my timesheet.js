function fill_gaps(timesheet) {
    var newTimesheet = timesheet.slice(0);
    var gap = 1;

    for (let current = 1; current < timesheet.length - 1; current += 1) {
        var prev = timesheet[current  - 1];
        var next = getEventualNext(current  + 1)
        if (timesheet[current] === null && next.obj === prev) {
            fillGap(current, next.index, prev)
        }
    }

    function getEventualNext(current) {
        if (timesheet [ current ] !== null) {
            return {
                obj: timesheet[ current ],
                index: current,
            }
        }
        gap += 1;
        return getEventualNext(current + 1)
    }
    
    function fillGap(current, index, filler) {
        while (index - current) {
            newTimesheet[ current ] = filler;
            current += 1;
        }
    }
    return newTimesheet
}

console.log( fill_gaps( [2,null,null,2,1,null,1,3,null,null,null,3] ) )