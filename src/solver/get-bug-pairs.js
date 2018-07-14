import * as R from 'ramda'

// direction = 0:left, 1: top, 2: right, 3: bottom
const getBugInDirection = (piece, rotation, direction) =>
  piece[(direction + rotation) % 4]

// seamDirection true=horizontal
const generatePairsFromSeam = (
  puzzle,
  boardState,
  seamDirection,
  seamIndex
) => {
  const nPairs = seamDirection ? puzzle.size[1] : puzzle.size[0]
  const bugDirections = seamDirection ? [3, 1] : [2, 0]
  const positions = R.range(0, nPairs).map(
    i =>
      seamDirection
        ? [[seamIndex, i], [seamIndex + 1, i]]
        : [[i, seamIndex], [i, seamIndex + 1]]
  )

  const indexesRotations = R.map(
    R.map(position => boardState[position[0]][position[1]])
  )(positions)

  const pieces = R.map(
    R.map(indexRotation => {
      return {
        ...indexRotation,
        piece: puzzle.pieces[indexRotation.pieceIndex]
      }
    })
  )(indexesRotations)

  const filteredPairs = pieces.filter(pair => pair[0].piece && pair[1].piece)

  return R.map(pairPieces => [
    getBugInDirection(
      pairPieces[0].piece,
      pairPieces[0].rotation,
      bugDirections[0]
    ),
    getBugInDirection(
      pairPieces[1].piece,
      pairPieces[1].rotation,
      bugDirections[1]
    )
  ])(filteredPairs)
}

export const getBugPairs = (board, puzzle) => {
  const seams = puzzle.size.map(R.dec)

  return R.chain(i =>
    R.chain(j => generatePairsFromSeam(puzzle, board, i === 0, j))(
      R.range(0, seams[1])
    )
  )(R.range(0, seams[0]))
}
