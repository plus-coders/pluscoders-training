class ButtonElement extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['type', 'text', 'icon']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'type':
                this.type = newValue
                break
            case 'text':
                this.text = newValue
                break
            case 'icon':
                this.icon = newValue
                break
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <button class="button button__${this.type}">
                <i class="fa fa-${this.icon}"></i>
                ${this.text}
            </button>
        `
    }
}
customElements.define('button-element', ButtonElement)