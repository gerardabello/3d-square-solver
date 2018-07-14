import React, { Component } from 'react'
import * as R from 'ramda'
import styled from 'react-emotion'

const LADYBUG = 'ladybug'
const CRICKET = 'cricket'
const SPIDER = 'spider'
const BEE = 'bee'

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
  margin: 0 auto;
`

const Row = styled.div`
  flex-basis: 100%;
  display: flex;
`

const SEAN_COLOR = '#8A9A7A'
const SEAN_WIDTH = '4px'

const Square = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  background-color: #D5EFBB;
  box-shadow:
    ${SEAN_WIDTH} 0 0 0 ${SEAN_COLOR},
    0 ${SEAN_WIDTH} 0 0 ${SEAN_COLOR},
    ${SEAN_WIDTH} ${SEAN_WIDTH} 0 0 ${SEAN_COLOR},
    ${SEAN_WIDTH} 0 0 0 ${SEAN_COLOR} inset,
    0 ${SEAN_WIDTH} 0 0 ${SEAN_COLOR} inset;
`

const BUG_SIZE = '40'

const Top = styled.div`
  position: absolute;
  top: ${SEAN_WIDTH};
  left: calc(50% - ${BUG_SIZE / 2}px);
  width: ${BUG_SIZE}px;
  height: ${BUG_SIZE}px;
  background-color: ${p => p.color};
  border-top-left-radius: ${p => (p.head ? '50%' : '')};
  border-top-right-radius: ${p => (p.head ? '50%' : '')};

  border-bottom-left-radius: ${p => (!p.head ? '50%' : '')};
  border-bottom-right-radius: ${p => (!p.head ? '50%' : '')};
`

const Left = styled.div`
  position: absolute;
  left: ${SEAN_WIDTH};
  width: ${BUG_SIZE}px;
  height: ${BUG_SIZE}px;
  top: calc(50% - ${BUG_SIZE / 2}px);
  background-color: ${p => p.color};
  border-top-left-radius: ${p => (p.head ? '50%' : '')};
  border-bottom-left-radius: ${p => (p.head ? '50%' : '')};

  border-top-right-radius: ${p => (!p.head ? '50%' : '')};
  border-bottom-right-radius: ${p => (!p.head ? '50%' : '')};
`

const Right = styled.div`
  position: absolute;
  right: 0;
  width: ${BUG_SIZE}px;
  height: ${BUG_SIZE}px;
  top: calc(50% - ${BUG_SIZE / 2}px);
  background-color: ${p => p.color};
  border-top-right-radius: ${p => (p.head ? '50%' : '')};
  border-bottom-right-radius: ${p => (p.head ? '50%' : '')};

  border-top-left-radius: ${p => (!p.head ? '50%' : '')};
  border-bottom-left-radius: ${p => (!p.head ? '50%' : '')};
`

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  width: ${BUG_SIZE}px;
  height: ${BUG_SIZE}px;
  left: calc(50% - ${BUG_SIZE / 2}px);
  background-color: ${p => p.color};
  border-bottom-left-radius: ${p => (p.head ? '50%' : '')};
  border-bottom-right-radius: ${p => (p.head ? '50%' : '')};

  border-top-left-radius: ${p => (!p.head ? '50%' : '')};
  border-top-right-radius: ${p => (!p.head ? '50%' : '')};
`

const isNotEmpty = R.complement(R.isEmpty)

const Cell = ({ top, bottom, left, right }) => {
  return (
    <Square>
      {isNotEmpty(top) && <Top color={colorMap(top.type)} head={top.head} />}
      {isNotEmpty(left) &&
        <Left color={colorMap(left.type)} head={left.head} />}
      {isNotEmpty(right) &&
        <Right color={colorMap(right.type)} head={right.head} />}
      {isNotEmpty(bottom) &&
        <Bottom color={colorMap(bottom.type)} head={bottom.head} />}
    </Square>
  )
}

class App extends Component {
  renderCell = (cell, index) => {
    const getCellByPosition = pos => cell[(pos + cell.rotation) % 4]
    return (
      <Cell
        key={index}
        top={{ ...getCellByPosition(1) }}
        bottom={{ ...getCellByPosition(3) }}
        left={{ ...getCellByPosition(0) }}
        right={{ ...getCellByPosition(2) }}
      />
    )
  }

  renderRow = (row, index) => {
    return (
      <Row key={index}>
        {row.map(this.renderCell)}
      </Row>
    )
  }

  render () {
    const { positions, pieces } = this.props

    const rows = R.map(p => {
      return R.map(piece => {
        return {
          ...pieces[piece.pieceIndex],
          rotation: piece.rotation
        }
      }, p)
    }, positions)

    return (
      <Main>
        <Board>
          {rows.map(this.renderRow)}
        </Board>
      </Main>
    )
  }
}

export default App
