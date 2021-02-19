
/**
 * Blank callback
 */
function noop() {
}

class Switchery{

    constructor(element, options) {
        options = options || {};
        this.defaults = {
            size: 'default',
            onText: 'Y',
            offText: 'N',
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
            onChange: noop,
        };
        this.element = element;
        this.options = Object.assign({}, this.defaults, options);
        if (this.element.type !== 'checkbox') {
            console.warn('[Switchery] The element is not a checkbox element');
            return;
        }
        this.init();
    }

    /**
     * Initialize switch
     * @private
     */
    init(){
        this.hide();
        this.show();
        this.correct();
        this.setPosition();
        this.handleClick();
        this.options.onInit(this);
    }

    /**
     * Hide the checkbox element
     * @private
     */
    hide(){
        this.element.style.display = 'none';
    }

    /**
     * Show the switch after checkbox
     * @private
     */
    show(){
        let switcher = this.create();
        this.element.parentNode.insertBefore(switcher, this.element.nextSibling);
    }

    /**
     * Create switch element
     * @private
     * @returns {HTMLSpanElement}
     */
    create(){
        this.switcher = document.createElement('span');
        this.jack = document.createElement('small');
        this.switcher.appendChild(this.jack);
        this.switcher.className = this.options.className + ' ' + `switchery-${this.options.size}`;
        return this.switcher;
    }

    /**
     * Correct the switch element attributes
     * @private
     */
    correct(){
        this.switcher.setAttribute('tabindex', 0);
        this.switcher.setAttribute('role', 'checkbox');
        this.switcher.setAttribute('aria-checked', this.element.checked);
        this.switcher.setAttribute('aria-disabled', this.options.disabled);
    }

    /**
     * Set switch jack proper position.
     * @private
     */
    setPosition(){
        let checked = this.isChecked();
        let switcher = this.switcher;
        let jack = this.jack;

        if (checked === true) {
            if (window.getComputedStyle) {
                jack.style.left = parseInt(window.getComputedStyle(switcher).width) - jack.offsetWidth + 'px';
            } else {
                jack.style.left = parseInt(switcher.currentStyle['width']) - jack.offsetWidth + 'px';
            }
            if (this.options.color) {
                this.colorize();
            }
            this.setSpeed();
        } else {
            jack.style.left = '0';
            switcher.style.boxShadow = 'inset 0 0 0 0 ' + this.options.secondaryColor;
            switcher.style.borderColor = this.options.secondaryColor;
            switcher.style.backgroundColor = (this.options.secondaryColor !== this.defaults.secondaryColor) ? this.options.secondaryColor : '#fff';
            jack.style.backgroundColor = (this.options.jackSecondaryColor !== this.options.jackColor) ? this.options.jackSecondaryColor : this.options.jackColor;
            this.setSpeed();
        }
    }

    /**
     * Set switch color.
     *
     * @api private
     */
    colorize(){
        const switcherHeight = this.switcher.offsetHeight / 2;
        this.switcher.style.backgroundColor = this.options.color;
        this.switcher.style.borderColor = this.options.color;
        this.switcher.style.boxShadow = 'inset 0 0 0 ' + switcherHeight + 'px ' + this.options.color;
        this.jack.style.backgroundColor = this.options.jackColor;
    }

    /**
     * Set speed.
     *
     * @private
     */
    setSpeed(){
        let switcherProp;
        const jackProp = {
            'background-color': this.options.speed,
            'left': this.options.speed.replace(/[a-z]/, '') / 2 + 's'
        };

        if (this.isChecked()) {
            switcherProp = {
                'border': this.options.speed,
                'box-shadow': this.options.speed,
                'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
            };
        } else {
            switcherProp = {
                'border': this.options.speed,
                'box-shadow': this.options.speed
            };
        }

        this.applyTransition(this.switcher, switcherProp);
        this.applyTransition(this.jack, jackProp);
    };

    applyTransition(element, props){
        const transitions = [];
        for (let key in props) {
            transitions.push(key + ' ' + props[key]);
        }
        element.style.transition = transitions.join(', ');
    }

    /**
     *  Handle the click event.
     *  @private
     */
    handleClick() {
        const _this = this;
        const switcher = this.switcher;
        const handler = function () {
            if (_this.isDisabled()) {
                return false;
            }
            _this.toggle();
            _this.setPosition();
        };
        if (switcher.addEventListener) {
            switcher.addEventListener('click', handler);
        } else {
            switcher.attachEvent('onclick', handler);
        }
    }

    /**
     * See if input is checked.
     *
     * @returns {Boolean}
     * @public
     */
    isChecked(){
        return this.element.checked;
    }

    /**
     * Alias for isChecked
     *
     * @returns {Boolean}
     * @public
     * @deprecated
     */
    getChecked(){
        return this.isChecked();
    }

    /**
     * Toggle switch and the checkbox.
     * @public
     */
    toggle(checked){
        this.options.beforeChange(this, this.element.checked);
        this.element.checked = checked === undefined ? !this.element.checked : checked;
        this.options.onChange(this, this.element.checked);
        const classList = this.switcher.classList;
        if (this.element.checked) {
            classList.add('switchery-on');
            classList.remove('switchery-off');
        } else {
            classList.remove('switchery-on');
            classList.add('switchery-off');
        }
        this.switcher.setAttribute('aria-checked', this.element.checked);
    }

    /**
     * Set switch ON
     * @public
     */
    on(){
        this.toggle(true);
    }

    /**
     * Set switch OFF
     * @public
     */
    off(){
        this.toggle(false);
    }

    isDisabled() {
        return this.options.disabled || this.element.disabled;
    }

    toggleDisabled(disabled) {
        this.options.disabled = disabled;
        this.element.disabled = disabled;
        if (disabled) {
            this.switcher.classList.add('switchery-disabled');
        } else {
            this.switcher.classList.remove('switchery-disabled');
        }
        this.switcher.setAttribute('aria-disabled', disabled);
    }

    disable(){
        this.toggleDisabled(true);
    }

    enable(){
        this.toggleDisabled(false);
    }
}

module.exports = Switchery;