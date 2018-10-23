// https://www.codewars.com/kata/fill-in-the-gaps-in-my-timesheet/javascript

function fill_gaps(timesheet) {
    var newTimesheet = timesheet.slice(0);
    var current = 1;
    var gap = 1;
    while (current < timesheet.length - 1) {
        var curr = timesheet[current]
        var prev = timesheet[current  - 1];
        var next = getEventualNext(current  + 1)
        if (curr === null && next.obj === prev) {
            fillGap(current, next.index, prev)
        }
        current += 1;
    }
    function getEventualNext(current) {
        if (current >= timesheet.length)  {
            return 'noval'
        }
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
