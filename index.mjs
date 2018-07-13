import R from 'ramda'

// pieces are defined clockwise
const puzzle = {
  size: [3, 3],
  pieces: [
    [
      { type: 'spider', head: true },
      { type: 'cricket', head: false },
      { type: 'spider', head: false },
      { type: 'bee', head: true }
    ],
    [
      { type: 'cricket', head: true },
      { type: 'bee', head: true },
      { type: 'spider', head: false },
      { type: 'ladybug', head: true }
    ],
    [
      { type: 'spider', head: true },
      { type: 'ladybug', head: true },
      { type: 'ladybug', head: false },
      { type: 'cricket', head: true }
    ],
    [
      { type: 'ladybug', head: true },
      { type: 'cricket', head: false },
      { type: 'bee', head: true },
      { type: 'spider', head: true }
    ],
    [
      { type: 'ladybug', head: false },
      { type: 'spider', head: true },
      { type: 'bee', head: true },
      { type: 'cricket', head: false }
    ],
    [
      { type: 'bee', head: false },
      { type: 'cricket', head: false },
      { type: 'ladybug', head: true },
      { type: 'bee', head: true }
    ],
    [
      { type: 'spider', head: false },
      { type: 'bee', head: false },
      { type: 'ladybug', head: false },
      { type: 'cricket', head: false }
    ],
    [
      { type: 'spider', head: false },
      { type: 'bee', head: false },
      { type: 'cricket', head: true },
      { type: 'ladybug', head: true }
    ],
    [
      { type: 'bee', head: true },
      { type: 'spider', head: true },
      { type: 'ladybug', head: false },
      { type: 'cricket', head: false }
    ]
  ]
}

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

const isValidBugPair = (bug1, bug2) =>
  bug1.type === bug2.type && bug1.head !== bug2.head

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

const getBoardBugPairs = (board, puzzle) => {
  const seams = puzzle.size.map(R.dec)

  return R.chain(i =>
    R.chain(j => generatePairsFromSeam(puzzle, board, i === 0, j))(
      R.range(0, seams[1])
    )
  )(R.range(0, seams[0]))
}

const isFullBoard = R.compose(
  R.all(R.complement(R.equals(-1))),
  R.map(R.prop('pieceIndex'))
)

if (!validatePuzzle(puzzle)) {
  throw new Error('puzzle not valid')
}

console.log(getBoardBugPairs(boardState, puzzle))
console.log(getBoardBugPairs(boardState, puzzle).map(R.apply(isValidBugPair)))
