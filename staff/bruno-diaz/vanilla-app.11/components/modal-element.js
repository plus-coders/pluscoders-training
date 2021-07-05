class ModalElement extends HTMLElement {
    constructor() {
        super()

        this.titleModal
    }

    static get observedAttributes() {
        return ['titleModal']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'titleModal':
                this.titleModal = newValue
                break
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="modal modal--editProfile">
                <div class="modal__background"></div>
                <div class="modal__wrapper">
                    <div class="modalHeader">
                        <h3 class="modalHeader__title">${this.titleModal}</h3>
                        <i class="fa fa-times modalHeader__close"></i>
                    </div>
                    <div id="modalContent" class="modal__content"></div>
                </div>
            </section>`

        var close = this.querySelector('.modalHeader__close')
        close.addEventListener('click', function(event) {
            this.remove()
        }.bind(this), true)
        var background = this.querySelector('.modal__background')
        background.addEventListener('click', function(event) {
            this.remove()
        }.bind(this), true)
    }
}
customElements.define('modal-element', ModalElement)