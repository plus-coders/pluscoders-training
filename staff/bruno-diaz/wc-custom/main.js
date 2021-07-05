// Definición de la clase
class WordCount extends HTMLElement {
    constructor() {
        // Siempre llamar primero a super en el constructor
        super();
    }
    
    connectedCallback() {
        setTimeout( function() {
            this.innerText = this.innerText.split(' ').length
        }.bind(this), 200)
        
    }
}

// Definición del tag
customElements.define('word-count', WordCount);


// Definición de la clase
class GlowText extends HTMLElement {
    constructor() {
        // Siempre llamar primero a super en el constructor
        super();
    }
    
    connectedCallback() {
        this.style.backgroundColor = '#0ff'
        this.style.boxShadow = '0 0 40px 20px #0ff'
    }
}

// Definición del tag
customElements.define('glow-text', GlowText);


// Definición de la clase
class SearchBox extends HTMLElement {
    constructor() {
        // Siempre llamar primero a super en el constructor
        super();
    }
    
    connectedCallback() {
        const input = document.createElement('input')
        const button = document.createElement('button')
        this.append(input, button)
        this.style.border = '1px solid black'
    }
}

// Definición del tag
customElements.define('search-box', SearchBox);
