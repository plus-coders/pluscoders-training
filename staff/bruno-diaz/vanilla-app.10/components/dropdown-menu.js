class DropdownMenu extends HTMLElement {
    constructor() {
        super()
        this.onItemSelected = function() {}
    }

    connectedCallback() {
        var accountNameWrapper = document.createElement('div')
        accountNameWrapper.classList.add("dropdownMenu__link")
        this.append(accountNameWrapper)

        this.onclick = function() {
            var elementOpened = this.querySelector('.dropdownMenu__menu--opened')
            var iconOpened =  this.querySelector('.dropdownMenu__link > i.fa-angle-down')
            
            if (elementOpened) {
                elementOpened.classList.remove("dropdownMenu__menu--opened")
                iconOpened.classList.remove("fa-opened")
            } else {
                this.querySelector('.dropdownMenu__menu').classList.add("dropdownMenu__menu--opened")
                iconOpened.classList.add("fa-opened")
            }   
        }

        var accountName = document.createElement('span')
        accountName.classList.add('dropdownMenu__name')
        // accountName.innerText = user.fullname
        accountName.innerText = 'Pepe'
        accountNameWrapper.append(accountName)
        
        var accountIcon = document.createElement('i')
        accountIcon.classList.add('fa')
        accountIcon.classList.add('fa-angle-down')
        accountNameWrapper.append(accountIcon)
        
        var accountMenu = document.createElement('ul')
        accountMenu.classList.add('dropdownMenu__menu')
        this.append(accountMenu)
        
        var accountMenuEdit = document.createElement('li')
        accountMenuEdit.classList.add('dropdownMenu__item')
        accountMenuEdit.addEventListener('click', function(event) {
            this.onItemSelected(event)
        }.bind(this), true)
        accountMenu.append(accountMenuEdit)

        var accountTextEdit = document.createElement('span')
        accountTextEdit.innerText = 'Edit account'
        accountTextEdit.id = 'edit'
        accountMenuEdit.append(accountTextEdit)

        var accountIconEdit = document.createElement('i')
        accountIconEdit.classList.add('fa')
        accountIconEdit.classList.add('fa-pencil-square-o')
        accountMenuEdit.append(accountIconEdit)
        
        var accountMenuLogout = document.createElement('li')
        accountMenuLogout.classList.add('dropdownMenu__item')
        accountMenuLogout.addEventListener('click', function(event) {
            this.onItemSelected(event)
        }.bind(this), true)
        accountMenu.append(accountMenuLogout)

        var accountTextLogout = document.createElement('span')
        accountTextLogout.innerText = 'Log out'
        accountTextLogout.id = 'logout'
        accountMenuLogout.append(accountTextLogout)
        
        var accountIconLogout = document.createElement('i')
        accountIconLogout.classList.add('fa')
        accountIconLogout.classList.add('fa-sign-out')
        accountMenuLogout.append(accountIconLogout)
    }
}
customElements.define('dropdown-menu', DropdownMenu);