import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as R from 'ramda'

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
    pieceIndex: -1
  }))
)

boardState[0][0] = { pieceIndex: 0, rotation: 0 }
boardState[0][1] = { pieceIndex: 1, rotation: 0 }
boardState[1][0] = { pieceIndex: 2, rotation: 0 }
boardState[1][1] = { pieceIndex: 3, rotation: 0 }

ReactDOM.render(
  <App size={puzzle.size} pieces={puzzle.pieces} positions={boardState} />,
  document.getElementById('root')
)
