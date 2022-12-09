/* eslint-env browser */

window.customElements.define('piano-keyboard', class PianoKeyboard extends HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({ mode: 'open' })

    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('width', this.getAttribute('width') || 600)
    this.canvas.setAttribute('height', this.getAttribute('width') || 100)

    this.root.appendChild(this.canvas)

    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height

    this.octaves = 3
    this.whiteKeyWidth = (this.width / this.octaves) / 7
    this.blackKeyWidth = this.whiteKeyWidth - this.whiteKeyWidth / 3
    this.blackKeyHeight = this.height / 2
    this.blackKeysOffset = this.whiteKeyWidth / 2 + (this.whiteKeyWidth / 6)

    // Draw white keys

    for (let i = 0; i < this.octaves * 7; i++) {
      this.ctx.lineWidth = 1
      this.drawBorder(this.whiteKeyWidth * i, 0, this.whiteKeyWidth, this.height, 1)
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(this.whiteKeyWidth * i, 0, this.whiteKeyWidth, this.height)
    }

    // Draw black keys

    let i = 0
    let j = 0
    while (i < this.octaves * 5) {
      if (j % 7 !== 2 && j % 7 !== 6) {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect((this.whiteKeyWidth * j) + this.blackKeysOffset, 0, this.blackKeyWidth, this.blackKeyHeight)
        i++
      }
      j++
    }
  }

  drawBorder (xPos, yPos, width, height, thickness = 2) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2))
  }

  getCursorPosition (canvas, event) {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log('x: ' + x + ' y: ' + y)
    console.log('note', this.getNote(x, y))
  }

  getNote (x, y) {
    const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
    const position = Math.floor(x / this.whiteKeyWidth)
    const note = notes[position % 7]

    if (y < this.blackKeyHeight && (x % this.whiteKeyWidth) > this.blackKeysOffset && note !== 'e' && note !== 'b') {
      return note + '#'
    }
    if (y < this.blackKeyHeight && (x % this.whiteKeyWidth) < this.blackKeyWidth / 2 && note !== 'f' && note !== 'c') {
      return notes[(position - 1) % 7] + '#'
    }

    return note
  }

  async connectedCallback () {
    this.canvas.addEventListener('mousedown', (e) => {
      this.getCursorPosition(this.canvas, e)
    })
  }
})
