class WcTabPanel extends HTMLElement {
    // Atributos cambiantes que se están observando: valor de la pestaña seleccionada | dirección que tienen las tabs (row|column)
    static observedAttributes = ["selected-index", "direction"]
    // Inicialización de variables privadas???????
    #selectedIndex = 0
    #direction = "row"

    constructor() {
        super()
        this.bind(this)
    }

    bind(element) {
        element.render = element.render.bind(element)
        element.attachEvents = element.attachEvents.bind(element)
        element.cacheDom = element.cacheDom.bind(element)
        element.onTabClick = element.onTabClick.bind(element)
        element.selectTabByIndex = element.selectTabByIndex.bind(element)
        element.onContentSlotChange = element.onContentSlotChange.bind(element)
        element.onTabSlotChange = element.onTabSlotChange.bind(element)
    }

    connectedCallback() {
        this.render()
        this.cacheDom()
        this.attachEvents()
        this.dom.tabs[this.#selectedIndex]?.classList.add("selected")
        this.dom.contents[this.#selectedIndex]?.classList.add("selected")
    }

    // SHADOW DOM Configuration: Estilos y Cómo será el DOM que se verá al imprimir el componente en pantalla
    render() {
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.innerHTML = `
                <style>
                    :host { display: flex; flex-direction: column; }
                    :host([direction="column"]) { flex-direction: row; }
                    :host([direction="column"]) .tabs { flex-direction: column; }
                    .tabs { display: flex; flex-direction: row; flex-wrap: nowrap; gap: var(--tab-gap, 0px); }
                    
                    .tabs ::slotted(*) { padding: 5px; border: 1px solid #ccc; user-select: none; cursor: pointer; }
                    .tabs ::slotted(.selected) { background: #efefef; }
                    .tab-contents ::slotted(*) { display: none; }
                    .tab-contents ::slotted(.selected) { display: block; padding: 5px; }
                </style>

                <div class="tabs">
                    <slot id="tab-slot" name="tab"></slot>
                </div>
                <div class="tab-contents">
                    <slot id="content-slot" name="content"></slot>
                </div>
            `
    }

    // Acces to SHADOW DOM elements
    cacheDom() {
        // Objeto dom con los elementos del SHADOW DOM
        this.dom = {
            tabSlot: this.shadow.querySelector("#tab-slot"),
            contentSlot: this.shadow.querySelector("#content-slot")
        }
        // .assignedElements() sirve para tener acceso al elemento
        this.dom.tabs = this.dom.tabSlot.assignedElements()
        this.dom.contents = this.dom.contentSlot.assignedElements()
    }

    // Events
    attachEvents() {
        // Evento principal --> hacer click sobre una tab
        this.dom.tabSlot.addEventListener("click", this.onTabClick)
        // EventListener que vigila la modificación de elementos en tab
        this.dom.tabSlot.addEventListener("slotchange", this.onTabSlotChange)
        // EventListener que vigila la modificación de elementos en content
        this.dom.contentSlot.addEventListener("slotchange", this.onContentSlotChange)
    }
    // qué ocurre cuando eventListener (descrito en 'attachEvents()') advierte cambios en elementos de tabs
    onTabSlotChange(){
        // .assignedElements() sirve para tener acceso al elemento
        this.dom.tabs = this.dom.tabSlot.assignedElements();
    }
    // qué ocurre cuando eventListener (descrito en 'attachEvents()') advierte cambios en elementos de content
    onContentSlotChange(){
        // .assignedElements() sirve para tener acceso al elemento
        this.dom.contents = this.dom.contentSlot.assignedElements();
    }

    // qué ocurre cuando salta el Evento Principal descrito en 'attachEvents()'
    onTabClick(e) {
        // se mira en qué tab se ha hecho click -'tabIndex'- y se ejecuta 'selectTabByIndex(tabIndex)'
        const target = e.target;
        if (target.slot === "tab") {
            const tabIndex = this.dom.tabs.indexOf(target);
            this.selectTabByIndex(tabIndex);
        }
    }
    // qué ocurre cuando ya sabemos en qué tab se ha hecho click, descrito en 'onTabClick(e)'
    selectTabByIndex(index) {
        // Se verifica que para el index del tab clicado existe un content con el mismo index
        const tab = this.dom.tabs[index];
        const content = this.dom.contents[index];
        if (!tab || !content) return;
        // Se borra a todos los items de tabs y content la clase 'selected' (se restablecen las clases) y se le aplica ésta a los que ocupan el lugar index
        this.dom.contents.forEach(p => p.classList.remove("selected"));
        this.dom.tabs.forEach(p => p.classList.remove("selected"));
        content.classList.add("selected");
        tab.classList.add("selected");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if(name === "selected-index"){
                this.selectedIndex = newValue;
            } else {
                this[name] = newValue;
            }
        }
    }

    set selectedIndex(value) {
        this.#selectedIndex = value;
    }
    get selectedIndex() {
        return this.#selectedIndex;
    }
    set direction(value){
        this.#direction = value;
        this.setAttribute("direction", value);
    }
    get direction(){
        return this.#direction;
    }
}

customElements.define("wc-tab-panel", WcTabPanel);



//Page UI

document.addEventListener("DOMContentLoaded", () => {
      const panel = document.querySelector("wc-tab-panel");
      const dirButton = document.querySelector("#direction");
      const addButton = document.querySelector("#add-tab");
      let charCode = 68;

      dirButton.addEventListener("click", () => {
        if (panel.direction === "row") {
          panel.direction = "column";
          dirButton.textContent = "column";
        } else if (panel.direction === "column") {
          panel.direction = "row";
          dirButton.textContent = "row";
        }
      });
      addButton.addEventListener("click", () => {
        const letter = String.fromCharCode(charCode);
        const h1 = document.createElement("h1");
        h1.textContent = `Tab ${letter}`;
        h1.slot = "tab";
        const content = document.createElement("div");
        content.textContent = `Hello Tab ${letter}`;
        content.slot = "content";
        panel.appendChild(h1);
        panel.appendChild(content);
        charCode++;
      });
});