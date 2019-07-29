var $ = {
    // util functions
    create: function (i) {
        return document.createElement(i)
    },
    get: function (i) {
        return document.getElementById(i)
    }
}

google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
document.addEventListener("DOMContentLoaded", drawControls)
var percent = $.get('percent')

function drawControls() {
    let category1, category2, year
    categoriesLevelOne()

    function categoriesLevelOne () {
        var   select = $.create('select')
        var platform = $.get('platform')
        createOptions(select, categories)
        platform.appendChild(select)

        select.addEventListener('change', function (event) {
            var calLevel2 = $.get('calLevel2')
            if (calLevel2) calLevel2.remove()
            var calLevel3 = $.get('calLevel3')
            if (calLevel3) calLevel3.remove()
            percent.textContent = '0'
            category1 = event.target.value
            console.log(category1)
            categoriesLevelTwo()
        })
    }

    function categoriesLevelTwo() {
        var select = $.create('select')
        select.id = 'calLevel2'
        
        createOptions(select, categories[category1])

        select.addEventListener('change', function (event) {
            console.log(category2)
            var calLevel3 = $.get('calLevel3')
            if (calLevel3) calLevel3.remove()
            category2 = event.target.value
            categoriesLevelThree()
        })
        platform.appendChild(select)
    }

    function categoriesLevelThree() {
        var select = $.create('select')
        select.id = 'calLevel3'
        year = (new Date).getYear() + 1900
        while (year > 1970) {
            const option = $.create('option')
            option.textContent = year
            select.appendChild(option)
            year -= 1
        }
        select.addEventListener('change', function (event) {
            year = event.target.value
            const indicator = categories[category1][category2]
            getApis(indicator, year + '')
        })
        platform.appendChild(select)
    }

    function createOptions(select, categories) {
        for (let cat in categories) {
            const option = $.create('option')
            option.textContent = cat
            select.appendChild(option)
        }
    }
}

function getApis(indicator, year){

    // collect data from World bank servers
    var res = [['Country', 'Popularity']]
    var fullLen = Object.keys(ISOCodes).length
    var len = 0
    var prevPercent

    for (let code in ISOCodes) {
        const url = 'http://api.worldbank.org/v2/countries/' 
                    + code + '/indicators/' + indicator + '?format=json'
        fetch(url)
        .then(function(response){
            return response.text()
        })
        .then(function(text) {
            var a = JSON.parse(text)
            var country = ISOCodes[code]
            var value = findYear(a[1], year)
            if (value == null) {
                
            } else {
                res.push([country, Math.floor(value)])
            }
            len += 1
            let nowPercent = Math.floor((len / fullLen) * 100)
            if (nowPercent > prevPercent) {
                percent.textContent = nowPercent + '%'
            }
            prevPercent = nowPercent
            if (len === fullLen) {
                percent.textContent = '100%'
                drawRegionsMap(res)
            }
        })
    }
}
function drawRegionsMap(stats) {
    var options = {
        colorAxis: {
            colors: ['white', '#0000FF'],
        },
    };

    var data = google.visualization.arrayToDataTable(stats);
    var chart = new google.visualization.GeoChart($.get('regions_div'));
    chart.draw(data, options);
}

function findYear(i, year){
    for (let obj in i) {
        if (+i[obj]['date'] == year) {
            return i[obj]['value']
        }
    }
    return null
}
