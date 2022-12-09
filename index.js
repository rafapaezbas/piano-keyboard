const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height

const octaves = 3
const whiteKeyWidth = (width / octaves) / 7
const blackKeyWidth = whiteKeyWidth - whiteKeyWidth / 3
const blackKeyHeight = height / 2
const blackKeysOffset = whiteKeyWidth / 2 + (whiteKeyWidth / 6)

// Draw white keys
for (let i = 0; i < octaves * 7; i++) {
  ctx.lineWidth = 1
  drawBorder(whiteKeyWidth * i, 0, whiteKeyWidth, height, 1)
  ctx.fillStyle = 'white'
  ctx.fillRect(whiteKeyWidth * i, 0, whiteKeyWidth, height)
}

// Draw black keys
let i = 0
let j = 0
while (i < octaves * 5) {
  if (j % 7 !== 2 && j % 7 !== 6) {
    ctx.fillStyle = 'black'
    ctx.fillRect((whiteKeyWidth * j) + blackKeysOffset, 0, blackKeyWidth, blackKeyHeight)
    i++
  }
  j++
}

canvas.addEventListener('mousedown', function (e) {
  getCursorPosition(canvas, e)
})

function drawBorder (xPos, yPos, width, height, thickness = 2) {
  ctx.fillStyle = 'black'
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2))
}

function getCursorPosition (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log('x: ' + x + ' y: ' + y)
  console.log('note', getNote(x, y))
}

function getNote (x, y) {
  const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
  const position = Math.floor(x / whiteKeyWidth)
  const note = notes[position % 7]

  if (y < blackKeyHeight && (x % whiteKeyWidth) > blackKeysOffset && note !== 'e' && note !== 'b') {
    return note + '#'
  }
  if (y < blackKeyHeight && (x % whiteKeyWidth) < blackKeyWidth / 2 && note !== 'f' && note !== 'c') {
    return notes[(position - 1) % 7] + '#'
  }

  return note
}
