/**
 * Blank callback
 */
function noop() {
}

class Switchery{
    constructor(element, options) {
        options = options || {};
        let defaultOptions = {
            size: 'default',
            onText: 'Y',
            offText: 'N',
            onSwitchColor: '#64BD63',
            offSwitchColor: '#fff',
            onJackColor: '#fff',
            offJackColor: '#fff',
            showText: false,
            disabled: false,
            speed: '0.1s',
            onInit: noop,
            beforeChange: noop,
            onChange: noop,
        };
        this.element = element;
        this.options = Object.assign({}, defaultOptions, options);
        if (this.element.type !== 'checkbox') {
            console.warn('[Switchery] The element is not a checkbox element');
            return;
        }
        this.init();
    }

    init(){
        this.element.style.display = 'none';
        let switcher = this.create();
        this.element.parentNode.appendChild(switcher);
        this.correct();
        this.setPosition();
        this.handleClick();
        this.options.onInit(this);
    }

    create(){
        this.switcher = document.createElement('span');
        this.jack = document.createElement('small');
        this.switcher.appendChild(this.jack);
        return this.switcher;
    }

    correct(){
        this.switcher.style.transitionDuration = this.options.speed;
        this.jack.style.transitionDuration = this.options.speed;
        this.switcher.setAttribute('tabindex', 0);
        this.switcher.setAttribute('role', 'checkbox');
        this.switcher.setAttribute('aria-checked', this.options.checked);
        this.switcher.setAttribute('aria-disabled', this.options.disabled);
    }

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
            if (this.options.onSwitchColor) {
                this.colorize();
            }
        } else {
            jack.style.left = '0';
            switcher.style.backgroundColor = '';
            switcher.style.borderColor =  '';
        }
    }

    colorize(){
        this.switcher.style.backgroundColor = this.options.onSwitchColor;
        this.switcher.style.borderColor = this.options.onSwitchColor;
    }

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
        const classList = this.element.classList;
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

export default Switchery;