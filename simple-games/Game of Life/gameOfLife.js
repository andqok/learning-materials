var cellCountH, cellCountW, cellToIndex, indexToCell

class StateOfLife {
  constructor(state) {
    this.state = state
  }

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
    becameDead.forEach(cell => {
      indexToCell.get(cell).classList.remove('alive')
    })
    cameToLife.forEach(cellNum => {
      indexToCell.get(cellNum).classList.add('alive')
    })
  }
  generateNewState() {
    const cellCount = cellCountW * cellCountH
    const aliveCandidates = {}
    const continueLiving = []
    const becameDead = []
    const getNeighbors = i => [
      i - cellCountW - 1, i - cellCountW, i - cellCountW + 1,
      i - 1, i + 1,
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
    this.updateView({ becameDead, cameToLife })
    return new StateOfLife([...continueLiving, ...cameToLife])
  }
}

function init() {
  const cellSize = 10 /** Should also change this in grid style. */
  cellCountH = Math.floor(window.innerHeight / cellSize)
  cellCountW = Math.floor(window.innerWidth / cellSize)
  cellToIndex = new Map()
  indexToCell = new Map()
  let initialState  = new StateOfLife([])

  let index = 0
  for (let i = 0; i < cellCountH; i += 1) {
    for (let z = 0; z < cellCountW; z += 1, index += 1) {
      const div = document.createElement('div')
      div.style.height = (window.innerHeight / cellCountH) + 'px'
      div.setAttribute('id', index)
      cellToIndex.set(div, index)
      indexToCell.set(index, div)
      document.body.appendChild(div)
      index += 1
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
    states.push(state)
    const newState = state.generateNewState()
    setTimeout(() => turn(newState), 500)
  }
}

document.addEventListener('DOMContentLoaded', init)
