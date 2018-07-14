import * as R from 'ramda'
import { isValidBoard } from './validations'

export const generateEmptyBoard = puzzle =>
  R.range(0, puzzle.size[0]).map(_ =>
    R.range(0, puzzle.size[1]).map(_ => ({
      pieceIndex: -1,
      rotation: 0
    }))
  )

const getUsedPieces = boardState =>
  R.chain(R.map(R.prop('pieceIndex')))(boardState).filter(R.gte(R.__, 0))

const getUnusedPieces = (puzzle, boardState) => {
  const piecesIndexes = R.range(0, R.apply(R.multiply, puzzle.size))

  const usedPieces = getUsedPieces(boardState)

  return R.difference(piecesIndexes, usedPieces)
}

export default (puzzle, render) => {
  let boardState = generateEmptyBoard(puzzle)

  return followSolution(render)(puzzle, boardState, 0)
}

const followSolution = render => (puzzle, boardState, solveIndex) => {
  const target = [
    solveIndex % puzzle.size[1],
    Math.floor(solveIndex / puzzle.size[1])
  ]

  console.log('solveIndex: ', solveIndex)
  console.log('target: ', target)

  const unused = getUnusedPieces(puzzle, boardState)

  for (let i = 0; i < unused.length; i++) {
    const pieceIndex = unused[i]
    for (let rotation = 0; rotation < 4; rotation++) {
      boardState[target[0]][target[1]].pieceIndex = pieceIndex
      boardState[target[0]][target[1]].rotation = rotation

      render(boardState)

      if (isValidBoard(boardState, puzzle)) {
        const solution = followSolution(render)(
          puzzle,
          R.clone(boardState),
          solveIndex + 1
        )
        if (solution) return solution
      }
    }
  }
}
