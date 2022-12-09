# Piano keyboard

[Web component](https://developer.mozilla.org/es/docs/Web/Web_Components) canvas based piano keyboard.

![piano-keyboard](https://user-images.githubusercontent.com/15270736/206792513-31a22280-c278-404e-91bd-47df1571e82b.png)

## Example

``` html
<html>
  <body>
    <piano-keyboard height="100" width="800" octaves="5"></piano-keyboard>
  </body>
  <script src="https://cdn.jsdelivr.net/gh/rafapaezbas/piano-keyboard/piano-keyboard.js"></script>
  <script>
    document.querySelector('piano-keyboard').addEventListener('key-pressed', ({ detail }) => {
      console.log(detail.note)
    })
  </script>
  <style>
    piano-keyboard {
      display: block;
      text-align: center;
    }
  </style>
</html>
```

## Attributes

### `width` 

Set the width in pixels of the piano keyboard canvas (default 600).

### `height` 

Set the height in pixels of the piano keyboard canvas (default 100).

### `octaves` 

Set the number of octaves in the keyboard (default 3).

## Events

### `piano-keyboard.on('key-pressed', (event) => {})` 

`event.detail.note` contains the pressed note (english notation).

## API

### `piano-keyboard.draw(pressedKeys = [])` 

Redraws the keyboard with `pressedKeys` highlighted in red.
