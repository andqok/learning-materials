var cellCountH, cellCountW, cellToIndex, indexToCell

class StateOfLife {
  constructor(state) {
    this.state = state || []
  }
  getStr() { return JSON.stringify(this.state) }
  clickCell(index) {
    if (this.state.includes(index)) {
      this.state = this.state.filter(el => el !== index)
      this.updateView({ becameDead: [ index ] })
    } else {
      this.state.push(index)
      this.updateView({ cameToLife: [ index ] })
    }
  }
  updateView({ becameDead = [], cameToLife = [] }) {
    const cellClassList = cell => indexToCell.get(cell).classList
    becameDead.forEach(cell => cellClassList(cell).remove('alive') )
    cameToLife.forEach(cell => cellClassList(cell).add('alive') )
  }
  generateNewState() {
    const cellCount = cellCountW * cellCountH
    const aliveCandidates = {}
    const continueLiving = []
    const becameDead = []
    const getNeighbors = i => [
      i - cellCountW - 1, i - cellCountW, i - cellCountW + 1,
      i - 1,                              i + 1,
      i + cellCountW - 1, i + cellCountW, i + cellCountW + 1
    ].filter(i => (i > 0) && (i <= cellCount))

    for (let cellIndex of this.state) {
      const neighbors = getNeighbors(cellIndex)
      const aliveNeighborCount = neighbors.reduce(
        (acc, v) => acc + Number(this.state.includes(v)), 0)

      neighbors.forEach(n => aliveCandidates[n] ?
        aliveCandidates[n] += 1 : aliveCandidates[n] = 1)

      const isAlive = [ 2, 3 ].includes(aliveNeighborCount)
      isAlive ? continueLiving.push(cellIndex) : becameDead.push(cellIndex)
    }
    const cameToLife = Object.entries(aliveCandidates)
      .filter(([a, b]) => b === 3)
      .map(([a, b]) => Number(a))
      .filter(u => !continueLiving.includes(u))
    const profile = { becameDead, cameToLife, continueLiving }
    console.log(profile)
    this.updateView(profile)
    return new StateOfLife([...continueLiving, ...cameToLife])
  }
}

function init() {
  const cellSize = 20 /** Should also change this in grid style. */
  cellCountH = Math.floor(window.innerHeight / cellSize)
  cellCountW = Math.floor(window.innerWidth / cellSize)
  cellToIndex = new Map()
  indexToCell = new Map()
  let initialState  = new StateOfLife()
  let index = 0
  for (let i = 0; i < cellCountH; i += 1) {
    for (let z = 0; z < cellCountW; z += 1, index += 1) {
      const div = document.createElement('div')
      div.style.height = (window.innerHeight / cellCountH) + 'px'
      div.setAttribute('id', index)
      cellToIndex.set(div, index)
      indexToCell.set(index, div)
      document.body.appendChild(div)
    }
  }
  document.body.addEventListener('click', clickCell)
  document.body.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
      gameOfLifeLoop(initialState)
    }
  })

  function clickCell(e) {
    if (e.target.tagName === 'DIV') {
      const gotIndex = cellToIndex.get(e.target)
      initialState.clickCell(gotIndex)
    }
  }
}

function gameOfLifeLoop(initialState) {
  const states = []
  turn(initialState)

  function turn(state) {
    console.log(states)
    states.push(state.getStr())
    const newState = state.generateNewState()
    setTimeout(() => turn(newState), 100)
  }
}

document.addEventListener('DOMContentLoaded', init)
