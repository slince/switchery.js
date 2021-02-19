# Switchery.js

A simple and powerful iOS style switch for checkbox.

## Installation

##### Standalone:

```html
<link rel="stylesheet" href="dist/switchery.min.css" />
<script src="dist/switchery.min.js"></script>
```

##### npm:

```bash
$ npm install switchery.js 
```

## Usage

````html
<input type="checkbox" class="checkbox-switch" />
````

standalone version

````javascript
const el = document.querySelector('.checkbox-switch');
const switchery = new Switchery(el, options);
````

work with module bundle

```javascript
import Switchery from 'switchery.js';

const el = document.querySelector('.checkbox-switch');
const switchery = new Switchery(el, options);
```

## Settings and Defaults

```js
defaults = {
    size: 'default',
    color: '#64BD63',
    secondaryColor: '#dfdfdf',
    jackColor: '#fff',
    jackSecondaryColor: null,
    disabled: false,
    disabledOpacity   : 0.5,
    speed: '0.4s',
    className: 'switchery',
    onInit: noop,
    beforeChange: noop,
    onChange: noop
};
```

- `size` : size of switch element, can be `default` | `small` | `large`
- `color` : color of checked switch element
- `secondaryColor` : color of unchecked switch element
- `jackColor` : color of checked jack element
- `jackSecondaryColor` : color of unchecked jack element
- `disabled` : enable or disable click events and changing the state of the switch
- `onInit` : called when switch init finish
- `beforeChange` : called before original checkbox's `checked` change
- `onChange` : called when original checkbox's `checked` change

## API

##### .isChecked()

See if input is checked.

##### .on()

Set switch ON.

##### .off()

Set switch OFF.

##### .toggle()

Toggle switch.

##### .disable()

Disable events bind to switch.

##### .enable()

Enable events bind to switch.

##### .destroy()

Remove switch form DOM and show the checkbox.

## License

Licensed under MIT

