class SearchElement extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = `
            <form class="searchComponent__form">
                <select name="searchers" class="searchComponent__select">
                    <option value="all">All</option>
                    <option value="google">Google</option>
                    <option value="yahoo">Yahoo</option>
                    <option value="bing">Bing</option>
                </select>
                <input type="text" name="searchInput" class="searchComponent__input">
                <button type="submit" class="searchComponent__submit">Search</button>
            </form>`
    }
}
customElements.define('search-element', SearchElement)