import React, { Component } from 'react'
import * as R from 'ramda'
import styled from 'react-emotion'
import Cell from './Cell.js'

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
  width: 600px;
  height: 600px;
  margin: 0 auto;
`

const Row = styled.div`
  flex-basis: 100%;
  display: flex;
`

class App extends Component {
  renderCell = (cell, index) => {
    const getCellByPosition = pos => cell[(pos + cell.rotation) % 4]
    return (
      <Cell
        key={index}
        left={{ ...getCellByPosition(0) }}
        top={{ ...getCellByPosition(1) }}
        right={{ ...getCellByPosition(2) }}
        bottom={{ ...getCellByPosition(3) }}
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
