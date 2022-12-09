# Piano keyboard

[Web component](https://developer.mozilla.org/es/docs/Web/Web_Components) canvas based piano keyboard.

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

## Atributes

`width` 

Set the width in pixels of the piano keyboard canvas (default 600).

`height` 

Set the height in pixels of the piano keyboard canvas (default 100).

`octaves` 

Set the number of octaves in the keyboard.

## Events

`piano-keyboard.on('key-pressed', (event) => {})` 

`Event.detail.note` contains the pressed note (english notation)

## Api

`piano-keyboard.draw(pressedKeys = [])` 

Redraws the keyboard with `pressedKeys` highlighted in red.
