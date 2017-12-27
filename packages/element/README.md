# @wordpress/element

Element is, quite simply, an abstraction layer atop [React](https://facebook.github.io/react/).

You may find yourself asking, "Why an abstraction layer?". For a few reasons:

- In many applications, especially those extended by a rich plugin ecosystem as is the case with WordPress, it's wise to create interfaces to underlying third-party code. The thinking is that if ever a need arises to change or even replace the underlying implementation, it can be done without catastrophic rippling effects to dependent code, so long as the interface stays the same.
- It provides a mechanism to shield implementers by omitting features with uncertain futures (`createClass`, `PropTypes`).
- It helps avoid incompatibilities between versions by ensuring that every plugin operates on a single centralized version of the code.


## Installation

Install the module

```bash
npm install @wordpress/element@next --save
```

## Usage

On the `wp.element` global object, you will find the following, ordered roughly be likelihood you'll encounter it in your code:

- [`createElement`](https://facebook.github.io/react/docs/react-api.html#createelement)
- [`render`](https://facebook.github.io/react/docs/react-dom.html#render)

### Example

Let's render a customized greeting into an empty element:

```html
<div id="greeting"></div>
<script>
function Greeting( props ) {
	return wp.element.createElement( 'span', null,
		'Hello ' + props.toWhom + '!'
	);
}

wp.element.render(
	wp.element.createElement( Greeting, { toWhom: 'World' } ),
	document.getElementById( 'app' )
);
</script>
```

Refer to the [official React Quick Start guide](https://facebook.github.io/react/docs/hello-world.html) for a more thorough walkthrough, in most cases substituting `React` and `ReactDOM` with `wp.element` in code examples.

### JSX

While not at all a requirement to use React, [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) is a recommended syntax extension to compose elements more expressively. Through a build process, JSX is converted back to the `createElement` syntax you see earlier in this document.

If you've configured [Babel](http://babeljs.io/) for your project, you can opt in to JSX syntax by specifying the `pragma` option of the [`transform-react-jsx` plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) in your [`.babelrc` configuration](http://babeljs.io/docs/usage/babelrc/).

```json
{
	"plugins": [
		[ "transform-react-jsx", {
			"pragma": "wp.element.createElement"
		} ]
	]
}
```

This config assumes `@wordpress/element` is exposed as `wp.element` global variable.