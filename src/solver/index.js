import * as R from 'ramda'
import puzzle from './../data'

import { getBugPairs } from './get-bug-pairs'
import { isSolvedBoard } from './validations'
import solvePuzzle from './solver'

const validatePuzzle = puzzle =>
  puzzle.pieces.length === R.apply(R.multiply, puzzle.size) &&
  R.all(R.equals(4), puzzle.pieces.map(R.length))

if (!validatePuzzle(puzzle)) {
  throw new Error('puzzle not valid')
}

const solutionBoard = solvePuzzle(puzzle)

if (!solutionBoard) console.log('Solution not found')
if (solutionBoard) {
  console.log('solved: ', isSolvedBoard(solutionBoard, puzzle))
}
