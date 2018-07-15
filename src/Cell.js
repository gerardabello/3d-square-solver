import React from 'react'
import styled from 'react-emotion'

const SEAM_COLOR = '#8A9A7A'
const SEAM_WIDTH = '1px'

const Square = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1;

  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;

  transform: rotate(${p => p.rotation * 90}deg);

  background-color: #d5efbb;
  box-shadow: 0 0 0 ${SEAM_WIDTH} ${SEAM_COLOR};

  user-select: none;
`

const BUG_SIZE = '85'

const Top = styled.div`
  position: absolute;
  top: -${BUG_SIZE / 2}px;
  left: calc(50% - ${BUG_SIZE / 2}px);
  font-size: ${BUG_SIZE}px;
  line-height: ${BUG_SIZE}px;

  transform: rotate(${p => (p.head ? 180 : 0)}deg);
`

const Left = styled.div`
  position: absolute;
  left: -${BUG_SIZE / 2}px;

  font-size: ${BUG_SIZE}px;
  line-height: ${BUG_SIZE}px;
  top: calc(50% - ${BUG_SIZE / 2}px);

  transform: rotate(${p => (p.head ? 90 : -90)}deg);
`

const Right = styled.div`
  position: absolute;
  right: -${BUG_SIZE / 2}px;

  font-size: ${BUG_SIZE}px;
  line-height: ${BUG_SIZE}px;
  top: calc(50% - ${BUG_SIZE / 2}px);

  transform: rotate(${p => (p.head ? -90 : 90)}deg);
`

const Bottom = styled.div`
  position: absolute;
  bottom: -${BUG_SIZE / 2}px;

  font-size: ${BUG_SIZE}px;
  line-height: ${BUG_SIZE}px;
  left: calc(50% - ${BUG_SIZE / 2}px);

  transform: rotate(${p => (p.head ? 0 : 180)}deg);
`

const LADYBUG = 'ladybug'
const CRICKET = 'cricket'
const SPIDER = 'spider'
const BEE = 'bee'

const colorMap = type => {
  switch (type) {
    case LADYBUG:
      return '🐞'
    case CRICKET:
      return '🐛'
    case SPIDER:
      return '🕷️'
    case BEE:
      return '🐝'
    default:
      return ''
  }
}

const Cell = ({ rotation, top, bottom, left, right }) => {
  return (
    <Square rotation={rotation}>
      {top && <Top children={colorMap(top.type)} head={top.head} />}
      {left && <Left children={colorMap(left.type)} head={left.head} />}
      {right && <Right children={colorMap(right.type)} head={right.head} />}
      {bottom && <Bottom children={colorMap(bottom.type)} head={bottom.head} />}
    </Square>
  )
}

export default Cell
