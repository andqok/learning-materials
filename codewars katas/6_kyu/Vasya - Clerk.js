// https://www.codewars.com/kata/vasya-clerk/javascript

function tickets(peopleInLine){
  var m25 = m50 = m100 = 0
  var flag

  for (let one of peopleInLine) {
    switch (one) {
      case  25:  calc25(); break
      case  50:  calc50(); break
      case 100: calc100(); break
    }
    if (!flag) {
      return 'NO'
    }
  }
  return 'YES'

  function calc25() {
    m25 += 1
    flag = true
  }

  function calc50() {
    m50 += 1
    if (m25 < 1) {
      flag = false
    } else {
      m25 -= 1
      flag = true
    }
  }

  function calc100() {
    m100 += 1
    if (m25 < 1) {
      flag = false
    }
    if (m50 < 1) {
      if (m25 >= 3) {
        m25 -= 3
      } else {
        flag = false
      }
    } else {
      m25 -= 1
      m50 -= 1
    }
  }
}

function tickets2(peopleInLine){
  var c = console.log
  var m25 = m50 = m100 = 0
  c(peopleInLine)
  var flag

  for (let one of peopleInLine) {
    switch (one) {
      case  25:  calc25(); break
      case  50:  calc50(); break
      case 100: calc100(); break
    }
    c(`m25: ${m25} ~~~ m50: ${m50} ~~~ m100: ${m100}`)
    if (!flag) {
      return 'NO'
    }
  }
  return 'YES'

  function calc25() {
    m25 += 1
    flag = true
  }

  function calc50() {
    m50 += 1
    if (m25 < 1) {
      flag = false
    } else {
      m25 -= 1
      flag = true
    }
  }

  function calc100() {
    m100 += 1
    if (m25 < 1) {
      flag = false
    }
    if (m50 < 1) {
      if (m25 >= 3) {
        m25 -= 3
      } else {
        flag = false
      }
    } else {
      m25 -= 1
      m50 -= 1
    }
  }
}
