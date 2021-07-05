class TabsPanel extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
            <style>
                @import "http://127.0.0.1:5500/staff/bruno-diaz/vanilla-app/components/tabs-panel.css"
            </style>

            <ul class="tabsPanel__tabs"></ul>
            <div class="tabsPanel__contents"></div>
        `
    }

    static get observedAttributes() {
        return ['labeltabs', 'contenttabs']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'labeltabs':
                this.labeltabs = newValue
                break
            case 'contenttabs':
                this.contenttabs = newValue
                break
        }
    }

    connectedCallback() {
        this.convertAttributeToArray()  

        // Convert attribute from string to array
        var tabs = this.querySelector(".tabsPanel__tabs")
        var contents = this.querySelector(".tabsPanel__contents")
    }

    convertAttributeToArray() {
        var labels = this.labeltabs
        labels = labels.replace(/'/g, '"')
        labels = JSON.parse(labels)

        var contents = this.contenttabs.split(',')
        
        this.doTabsCustom(labels, contents)
    }
 
    doTabsCustom(labels, contents) {
        var tabs = this.querySelector(".tabsPanel__tabs")

        for (var i = 0; i < labels.length; i++) {
            var tab = document.createElement('li')
            tab.classList.add('tabsPanel__tab')
            tab.innerHTML = labels[i]
            tab.id = 'tab' + i
            tabs.append(tab)

            tab.addEventListener("click", function(event) {
                var selected = tabs.querySelector(".selected")
                selected.classList.remove("selected")

                var index = event.target.id
                index = index.replace('tab', '')

                var tabsList = tabs.querySelectorAll(".tabsPanel__tab")
                tabsList[index].classList.add("selected")

                var container = this.querySelector(".tabsPanel__contents")
                container.innerHTML = contents[index]
            }.bind(this))
        }

        var tabsList = tabs.querySelectorAll(".tabsPanel__tab")
        tabsList[0].classList.add('selected')

        var container = this.querySelector(".tabsPanel__contents")
        container.innerHTML = contents[0]
    }
}
customElements.define("tabs-panel", TabsPanel)