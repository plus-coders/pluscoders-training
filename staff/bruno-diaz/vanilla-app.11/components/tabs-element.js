class TabsPanel extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.dom.tabs = this.shadow.querySelector(".tabsPanel__tabs")
        this.dom.content = this.shadow.querySelector(".tabsPanel__contents")



        // this.#render()
        // this.#cacheDom()
        // this.#attachEvents()
        // this.dom.tabs[this.#selectedIndex]?.classList.add("selected")
        // this.dom.contents[this.#selectedIndex]?.classList.add("selected")
    }

    // #render() {
    //     this.shadow.innerHTML = `
    //         <style>
    //             @import url("./components/tabs-panel.css");
    //         </style>

    //         <div class="tabs">
    //             <slot id="tab-slot" name="tab"></slot>
    //         </div>
    //         <div class="tab-contents">
    //             <slot id="content-slot" name="content"></slot>
    //         </div>
    //     `
    // }

    // #cacheDom() {
    //     this.dom.tabs = this.shadow.querySelector(".tabsPanel__tabs")
    //     this.dom.content = this.shadow.querySelector(".tabsPanel__contents")
    // }

    // #attachEvents() {
    //     this.dom.tabSlot.addEventListener("click", this.#onTabClick.bind(this))
    // }

    // #onTabClick(e) {
    //     const target = e.target;
    //     if (target.slot === "tab") {
    //         const tabIndex = this.dom.tabs.indexOf(target);
    //         this.#selectTabByIndex(tabIndex);
    //     }
    // }
    // #selectTabByIndex(index) {
    //     const tab = this.dom.tabs[index];
    //     const content = this.dom.contents[index];
    //     if (!tab || !content) return;
    //     this.dom.contents.forEach(element => element.classList.remove("selected"));
    //     this.dom.tabs.forEach(element => element.classList.remove("selected"));
    //     content.classList.add("selected");
    //     tab.classList.add("selected");
    // }

    static observedAttributes = ['tabs', 'contents', "selected-index"]
    #selectedIndex = 0

    attributeChangedCallback(name, oldValue, newValue) {
        switch (nameAtr) {
            case 'tabs':
                this.type = newValue
                break
            case 'contents':
                this.text = newValue
                break
        }


        if (oldValue !== newValue) {
            if(name === "selected-index"){
                this.#selectedIndex = newValue;
            } else {
                this[name] = newValue;
            }
        }
    }
}
customElements.define("tabs-panel", TabsPanel);