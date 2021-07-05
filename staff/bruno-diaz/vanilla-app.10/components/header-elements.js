class HeaderElement extends HTMLElement {
    constructor() {
        super()
        this.onMenuItemSelected = function() {}
    }

    connectedCallback() {
        this.innerHTML = `<header id="header">
            <h1>logo</h1>
            <dropdown-menu class="dropdownMenu"></dropdown-menu>
        </header>`

        var dropdownMenu = this.querySelector(".dropdownMenu")

        dropdownMenu.onItemSelected = function(event) {
            this.onMenuItemSelected(event)
        }.bind(this)
    }
}
customElements.define('header-element', HeaderElement)