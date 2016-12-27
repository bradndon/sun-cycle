// var SunCalc = require('suncalc')

var date1 = new Date()
var date2 = new Date(2016, 10, 22, 11,57, 43)
var boop = SunCalc.getPosition(date1, 48.749080, -122.478147)
var dates = SunCalc.getPosition(date2, 48.749080, -122.478147)
console.log(date1)
console.log(date2)

console.log(boop)
console.log(dates)
var dates = SunCalc.getTimes(new Date(), 48.749080, -122.478147)

var constant = 90/SunCalc.getPosition(dates.solarNoon, 48.749080, -122.478147).altitude
console.log(SunCalc.getPosition(dates.solarNoon, 48.749080, -122.478147).altitude * constant)
console.log(dates)
var points = []

for (var i = 0; i <= 23; i ++) {
  for (var j = 0; j < 60; j++) {
  var date = new Date(2016, 10, 22, i,j)
  var alt = (SunCalc.getPosition(date, 48.749080, -122.478147).altitude * constant)
  if (date.getTime() > dates.solarNoon.getTime()) {
    alt = 180 - alt
  }
  points.push({altitude: alt, date: date})

}
}
window.onload = function() {
  window.setTimeout(function() {
    moveSun(0)
  }, 100)
  function moveSun(i) {
    document.getElementById("date").innerHTML = points[i].date
    if (points[i].date.getTime() < dates.sunrise.getTime() || points[i].date.getTime() > dates.sunset.getTime()) {
      document.getElementById("circle").style.display = "none"

    } else {
      document.getElementById("circle").style.display = "block"

    }
    document.getElementById("circle").style.transform = "rotate(" + points[i].altitude + "deg)"

    window.setTimeout(function(alt) {
      moveSun(i+1)
    }, 10)

  }
}
