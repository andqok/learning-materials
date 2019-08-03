var gameStarted = false

class StateOfLife {
  constructor(cellCountH, cellCountW, stepTimeout) {
    this.cellCountH = cellCountH
    this.cellCountW = cellCountW
    this.state = []
    this.stepTimeout = stepTimeout
  }
  filterOut(index) {
    this.state = this.state.filter(el => el !== index)
  }
  push(index) {
    this.state.push(index)
  }
  clickCell(index, cell) {
    if (this.state.includes(index)) {
      this.filterOut(index)
      cell.classList.remove('alive')
    } else {
      this.push(index)
      cell.classList.add('alive')
    }
  }
  generateNewState() {
    const horiz = this.cellCountW
    const vertic = this.cellCountH
    const cellCount = horiz * vertic
    const aliveCandidates = {}
    var newState = []
    for (let cellIndex of this.state) {
      const getNeighbors = i => [
        i - horiz - 1, i - horiz, i - horiz + 1,
        i - 1, i + 1,
        i + horiz - 1, i + horiz, i + horiz + 1
      ].filter(i => (i > 0) && (i <= cellCount))
      const neighbors = getNeighbors(cellIndex)
      const aliveNeighborCount = neighbors.reduce(
        (acc, v) => acc + Number(this.state.includes(v)), 0)
      console.log(cellIndex, JSON.stringify({aliveNeighborCount}), neighbors)
    }
  }
}

function init() {
  const cellSize = 10
  const h = window.innerHeight
  const w = window.innerWidth
  const cellCountH = Math.floor(h / cellSize)
  const cellCountW = Math.floor(w / cellSize)
  const cellToIndex = new Map()
  let initialState  = new StateOfLife(cellCountH, cellCountW, 500)

  let index = 0
  for (let i = 0; i < cellCountH; i += 1) {
    for (let z = 0; z < cellCountW; z += 1) {
      const div = document.createElement('div')
      div.style.height = (h / cellCountH) + 'px'
      div.setAttribute('id', index)
      cellToIndex.set(div, index)
      document.body.appendChild(div)
      index += 1
    }
  }
  document.body.addEventListener('click', clickCell)
  document.body.addEventListener('keyup', evt => {
    if (!gameStarted && evt.key === 'Enter') {
      gameOfLife(initialState)
    }
    console.log(evt.key)
  })

  function clickCell(e) {
    const gotIndex = cellToIndex.get(e.target)
    initialState.clickCell(gotIndex, e.target)
    console.log(initialState)
  }
}

document.addEventListener('DOMContentLoaded', init)
// window.addEventListener('resize', init)

function gameOfLife(initialState) {
  turn(initialState)

  function turn(state) {
    state.generateNewState()
  }
}


  const horiz = 7
  const vertic = 7
  const cellCount = horiz * vertic
  const toCoord = i => {
    const y = Math.floor(i / horiz) + 1
    const x = (i % horiz) + 1
    return { x, y }
  }
  const getUp = i => {

  }
  const goUp    = i => i - horiz > 0 ? i - horiz : i + (cellCount - horiz)
  const goDown  = i => i + horiz > cellCount ? (i + horiz) - cellCount : i + horiz
  const goRight = i => i % horiz === 0 ? i - horiz + 1 : i + 1
  const goLeft  = i => i % (horiz + 1) === 0 ? i + horiz - 1 : i - 1
  const neighbors = i => [
    goLeft(i)
    // goLeft( goUp(i) ),   // goUp(i),   goRight( goUp(i) ),
    // goLeft(i),           //            goRight(i),
    // goLeft( goDown(i) ), // goDown(i), goRight(i)
  ]
  // console.log(
  //   neighbors(43)
  //   )
  // const topLeft = i =>
  // const top = i =>
  // const topRight = i =>
  // const left = i =>
  // const right = i =>
  // const bottomLeft = i =>
  // const bottom = i =>
  // const bottomRight = i =>
//   const aliveCandidates = {}
//   var newState = []
//   for (let cellIndex of this.state) {
//     const neighbors = []
//     neighbors[ 0 ] = cellIndex

// }
// console.log(
//   toCoord(7)
// )
