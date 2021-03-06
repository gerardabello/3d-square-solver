import * as R from 'ramda'

import { getBugPairs } from './get-bug-pairs'

export const isValidBugPair = (bug1, bug2) =>
  bug1.type === bug2.type && bug1.head !== bug2.head

export const isFullBoard = boardState => {
  const pieceIndexes = R.chain(R.map(R.prop('pieceIndex')))(boardState)
  return R.all(R.complement(R.equals(-1)), pieceIndexes)
}

export const isValidBoard = (boardState, puzzle) =>
  R.all(
    R.equals(true),
    getBugPairs(boardState, puzzle).map(R.apply(isValidBugPair))
  )

export const isSolvedBoard = (boardState, puzzle) =>
  R.all(
    R.equals(true),
    getBugPairs(boardState, puzzle).map(R.apply(isValidBugPair))
  ) && isFullBoard(boardState)
