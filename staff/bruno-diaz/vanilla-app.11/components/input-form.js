class InputForm extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['type', 'label', 'name']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'type':
                this.type = newValue
                break
            case 'label':
                this.label = newValue
                break
            case 'name':
                this.name = newValue
                break
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <span class="form__element">
                <label>${this.label}</label>
                <input type="${this.type}" name="${this.name}" class="form__element--input"></input>
            </span>`
    }
}
customElements.define('input-form', InputForm)