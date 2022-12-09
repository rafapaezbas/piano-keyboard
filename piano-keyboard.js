/* eslint-env browser */

window.customElements.define('piano-keyboard', class PianoKeyboard extends HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('width', this.getAttribute('width') || 600)
    this.canvas.setAttribute('height', this.getAttribute('height') || 100)
    this.canvas.style = 'border: 1px solid black'
    this.root.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.octaves = this.getAttribute('octaves') || 3
    this.whiteKeyWidth = (this.width / this.octaves) / 7
    this.blackKeyWidth = (this.whiteKeyWidth - this.whiteKeyWidth / 3) - 1
    this.blackKeyHeight = this.height / 2
    this.blackKeysOffset = this.whiteKeyWidth / 2 + (this.whiteKeyWidth / 6)
    this.notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
    this.pressedKeys = []
  }

  draw (pressedKeys = []) {
    this.drawWhiteKeys(pressedKeys)
    this.drawBlackKeys(pressedKeys)
  }

  drawWhiteKeys (pressedKeys = []) {
    for (let i = 0; i < this.octaves * 7; i++) {
      const note = this.notes[i % 7] + Math.floor(i / 7)
      this.ctx.lineWidth = 1
      this.drawBorder(this.whiteKeyWidth * i, 0, this.whiteKeyWidth, this.height, 1)
      this.ctx.fillStyle = pressedKeys.indexOf(note) !== -1 ? 'red' : 'white'
      this.ctx.fillRect(this.whiteKeyWidth * i, 0, this.whiteKeyWidth, this.height)
    }
  }

  drawBlackKeys (pressedKeys = []) {
    let i = 0
    let j = 0
    while (i < this.octaves * 5) {
      if (j % 7 !== 2 && j % 7 !== 6) {
        const note = this.notes[j % 7] + '#' + Math.floor(j / 7)
        this.drawBorder((this.whiteKeyWidth * j) + this.blackKeysOffset, 0, this.blackKeyWidth, this.blackKeyHeight, 1)
        this.ctx.fillStyle = pressedKeys.indexOf(note) !== -1 ? 'red' : 'black'
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
    return { x, y }
  }

  getNote ({ x, y }) {
    const position = Math.floor(x / this.whiteKeyWidth)
    const note = this.notes[position % 7]
    const octave = Math.floor(x / (this.whiteKeyWidth * 7))

    if (y < this.blackKeyHeight && (x % this.whiteKeyWidth) > this.blackKeysOffset && note !== 'e' && note !== 'b') {
      return note + '#' + octave
    }
    if (y < this.blackKeyHeight && (x % this.whiteKeyWidth) < this.blackKeyWidth / 2 && note !== 'f' && note !== 'c') {
      return this.notes[(position - 1) % 7] + '#' + octave
    }

    return note + (octave + 1)
  }

  async connectedCallback () {
    this.draw()

    this.canvas.addEventListener('mousedown', (e) => {
      const note = this.getNote(this.getCursorPosition(this.canvas, e))
      this.pressedKeys.push(note)
      this.draw(this.pressedKeys)
      this.dispatchEvent(new CustomEvent('key-pressed', { detail: { note }, bubbles: true, composed: true }))
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.pressedKeys = []
      this.draw(this.pressedKeys)
    })
  }
})
