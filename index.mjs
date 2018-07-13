import R from 'ramda'
import puzzle from './puzzle'

import { getBugPairs } from './get-bug-pairs'
import { isSolvedBoard } from './validations'

let boardState = R.range(0, puzzle.size[0]).map(_ =>
  R.range(0, puzzle.size[1]).map(_ => ({
    pieceIndex: -1,
    rotation: 0
  }))
)

boardState[0][0] = { pieceIndex: 0, rotation: 0 }
boardState[0][1] = { pieceIndex: 1, rotation: 0 }
boardState[1][0] = { pieceIndex: 2, rotation: 0 }
boardState[1][1] = { pieceIndex: 3, rotation: 0 }

const validatePuzzle = puzzle =>
  puzzle.pieces.length === R.apply(R.multiply, puzzle.size) &&
  R.all(R.equals(4), puzzle.pieces.map(R.length))

if (!validatePuzzle(puzzle)) {
  throw new Error('puzzle not valid')
}

console.log(getBugPairs(boardState, puzzle))
console.log('solved: ', isSolvedBoard(boardState, puzzle))
