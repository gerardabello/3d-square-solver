import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as R from 'ramda'

import { throttle } from './utils'
import puzzle from './data'
import solvePuzzle from './solver/solver'

const validatePuzzle = puzzle =>
  puzzle.pieces.length === R.apply(R.multiply, puzzle.size) &&
  R.all(R.equals(4), puzzle.pieces.map(R.length))

if (!validatePuzzle(puzzle)) {
  throw new Error('puzzle not valid')
}

const render = puzzle => boardState =>
  ReactDOM.render(
    <App size={puzzle.size} pieces={puzzle.pieces} positions={boardState} />,
    document.getElementById('root')
  )

solvePuzzle(puzzle, render(puzzle)).then(solutionBoard => {
  if (solutionBoard) {
    console.log('SOLVED!')
  }
})
