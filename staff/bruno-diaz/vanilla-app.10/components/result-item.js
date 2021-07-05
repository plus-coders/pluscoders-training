class ResultItem extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['url', 'title', 'preview']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'url':
                this.url = newValue
                break
            case 'title':
                if (oldValue !== newValue) {
                    this.title = newValue;
                }
                break
            case 'preview':
                this.preview = newValue
                break
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <li class="resultsItem">
                <a href="${this.url}" target="_blank">
                    <p class="resultsItem__title">${this.title}</p>
                    <p class="resultsItem__preview">${this.preview}</p>
                </a>
            </li>`
    }
}
customElements.define('result-item', ResultItem)