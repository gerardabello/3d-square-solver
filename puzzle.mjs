// pieces are defined clockwise
export default {
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
