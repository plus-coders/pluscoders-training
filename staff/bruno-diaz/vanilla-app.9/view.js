function createAccessControlPanel(onRegister, onLogin) {

    var accessPanel = document.createElement('access-panel')

    accessPanel.onSubmit = function(event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        if (event.target.id === 'registerForm') {
            var fullname = event.target.fullname.value

            onRegister(fullname, email, password)
        }
        else if (event.target.id === 'loginForm') {
            onLogin(email, password)
        }
    }

    return accessPanel
}



// Create Edit profile form

function createEditProfile(user, onUpdate, onDelete) {
    var modal = document.createElement('modal-element')
    modal.titleModal = "Edit account"
    document.body.append(modal)

    var modalContent = modal.querySelector('#modalContent')

    var editProfile = document.createElement('edit-profile')
    editProfile.style.width = '400px'
    editProfile.style.display = 'block'
    editProfile.style.margin = '0 auto'
    modalContent.append(editProfile)

    var fullnameInput = editProfile.querySelector('input[name="fullname"]')
    fullnameInput.value = user.fullname
    var emailInput = editProfile.querySelector('input[name="email"]')
    emailInput.value = user.username

    console.log(user)

    editProfile.onSubmit = function(event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        if (event.target.id === 'informationForm') {
            var email = event.target.email.value
            var fullname = event.target.fullname.value

            onUpdate('info', fullname, email)
        } else if (event.target.id === 'loginForm') {
            var password = event.target.password.value
            var newpassword = event.target.newpassword.value

            onUpdate('info', fullname, email)
        } else if (event.target.id === 'accountForm') {
            var password = event.target.password.value

            onDelete(password)
        }
    }
}



// Create pag welcome

function createSession(user, openUserMenu, onEditProfile, onLogout, onSearch) {
    var pagWelcome = document.createElement('div')
    pagWelcome.id = 'account'

    // var header = createHeader(user, openUserMenu, onEditProfile, onLogout)
    var headerContainer = document.createElement('div')
    headerContainer.innerHTML = '<header-element></header-element>'

    var header = headerContainer.querySelector('header-element')
    header.onMenuItemSelected = function(event) {
        if(event.target.id === 'edit')
            onEditProfile()
        else if (event.target.id === 'logout')
            onLogout()
    }
    pagWelcome.append(headerContainer)
    
    var search = createSearch(onSearch);
    pagWelcome.append(search)

    return pagWelcome
}



// Create search component

function createSearch(onSearch) {
    var sectionSearch = document.createElement('section')
    sectionSearch.id = 'searchComponent'
    sectionSearch.classList.add('searchComponent--searching')

    var titleWrapper = document.createElement('div')
    titleWrapper.classList.add('searchComponent__titleWrapper')
    sectionSearch.append(titleWrapper)
    
    var title = document.createElement('h2')
    title.innerText = 'Start to look for all you want'
    title.classList.add('searchComponent__title')
    titleWrapper.append(title)

    var search = document.createElement('search-element')
    sectionSearch.append(search)

    search.onsubmit = function (event) {
        event.preventDefault()

        var searcher = event.target.searchers.value
        var query = event.target.searchInput.value
        
        onSearch(searcher, query)
    }

    return sectionSearch
}



// Loading

function setLoading() {
    var loading = document.createElement('div')
    loading.id = 'loading'
    loading.classList.add('loading')

    var loadingSpinner = document.createElement('div')
    loadingSpinner.classList.add('loading__spinner')
    loading.append(loadingSpinner)

    var spinnerRing1 = document.createElement('div')
    spinnerRing1.classList.add('loading__spinner--ring1')
    loadingSpinner.append(spinnerRing1)

    var spinnerRing2 = document.createElement('div')
    spinnerRing2.classList.add('loading__spinner--ring2')
    loadingSpinner.append(spinnerRing2)

    var spinnerDot = document.createElement('div')
    spinnerDot.classList.add('loading__spinner--dot')
    loadingSpinner.append(spinnerDot)

    return loading
}



// Create pag welcome

function createResults(searchResults, page, onPage) {

    var oldResultsWrapper = document.getElementById('resultsWrapper')
    if (oldResultsWrapper)
        oldResultsWrapper.remove()
    
    var resultsWrapper = document.createElement('section')
    resultsWrapper.style.margin = '0 auto'
    resultsWrapper.style.padding = '24px 16px'
    resultsWrapper.style.maxWidth = '1100px'
    resultsWrapper.id = 'resultsWrapper'
    document.body.append(resultsWrapper)

    if (searchResults.length === 0) {

        var noResult = document.createElement('p')
        noResult.innerText = 'No results for this search'
        noResult.style.textAlign = 'center'
        resultsWrapper.append(noResult)

    } else {
    
        var resultsList = document.createElement('ul')
        resultsList.style.padding = '0 16px'
        resultsList.style.listStyleType = 'none'
        resultsWrapper.append(resultsList)

        for (var i = 0; i < searchResults.length; i++) {
            var searchResult = searchResults[i]

            var resultItem = document.createElement('result-item')
            
            resultItem.setAttribute('url', searchResult.url)
            resultItem.setAttribute('title', searchResult.title)
            resultItem.setAttribute('preview', searchResult.preview)
            
            resultsList.append(resultItem)
        }
        
        var pagination = document.createElement('ul')
        pagination.id = 'pagination'
        resultsWrapper.append(pagination)

        for (var i = 1; i < 6; i++) {
            var pageWrapper = document.createElement('li')
            pagination.append(pageWrapper)

            var pageLink = document.createElement('a')
            pageLink.classList.add('pagination__page')
            pageLink.href = '#' + i
            pageLink.innerText = i
            pageWrapper.append(pageLink);

            // IIFE: inmediatly... RTFM
            (function(i) {
                pageLink.onclick = function () {    
                    var page = i

                    onPage(page)
                }
            })(i)

            if (i === page)
                pageLink.classList.add('pagination__page--selected')
        }
    }

    return resultsWrapper
}












// WEB COMPONENTS



class ButtonElement extends HTMLElement {
    constructor() {
        super()

        this.type
        this.text
        this.icon
    }

    static get observedAttributes() {
        return ['type', 'text', 'icon']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'type':
                this.type = newValue
                break
            case 'text':
                this.text = newValue
                break
            case 'icon':
                this.icon = newValue
                break
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <button class="button button__${this.type}">
                <i class="fa fa-${this.icon}"></i>
                ${this.text}
            </button>
        `
    }
}
customElements.define('button-element', ButtonElement)



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



class TabElement extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['text']
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'text':
                this.text = newValue
                break
        }
    }

    connectedCallback() {
        var id = this.text.replace(/ /g, "").toLowerCase()
        this.innerHTML = `
            <a href="#" id=${id}Tab class="switchButtons__link">
                ${this.text}
            </a>`

        this.addEventListener('click', function(event) {
            this.getElementsByTagName('a')[0].classList.add('switchButtons__link--active')
        })
    }
}
customElements.define('tab-element', TabElement)



// class TabsElement extends HTMLElement {
//     constructor() {
//         super()
        
//         this.elements
//     }

//     connectedCallback() {
//         this.classList.add('switchButtons')
//     }
// }
// customElements.define('tabs-element', TabsElement)



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



class AccessPanel extends HTMLElement {
    constructor() {
        super()

        this.onSubmit = function() {}
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="tabsElement switchButtons">
                <tab-element text="Register"></tab-element>
                <tab-element text="Log in"></tab-element>
            </div>

            <div class="accessPanel__form">
                <span class="form__feedback"></span>

                <form id="registerForm" class="form">
                    <input-form label='Full name' type='text' name='fullname'></input-form>
                    <input-form label='E-mail' type='email' name='email'></input-form>
                    <input-form label="Password" type="password" name="password"></input-form>
                    
                    <button id="registerSubmit" class="form__button form__button--submit" type="submit">Register</button>
                </form>

                <form id="loginForm" class="form">
                    <input-form label='E-mail' type='email' name='email'></input-form>
                    <input-form label="Password" type="password" name="password"></input-form>

                    <button id="loginSubmit" class="form__button form__button--submit" type="submit">Log in</button>
                </form>
            </div>
        `

        this.classList.add('accessPanel')

        var registerForm = this.querySelector('#registerForm')

        registerForm.onsubmit = function (event) {
            this.onSubmit(event)
        }.bind(this)

        var loginForm = this.querySelector('#loginForm')

        loginForm.onsubmit = function (event) {
            this.onSubmit(event)
        }.bind(this) 

        var tabs = this.querySelectorAll(' ')
        var forms = this.querySelectorAll('.form')

        for (var i = 0; i < tabs.length; i++) forms[i].style.display = 'none'

        tabs[0].querySelector('.switchButtons__link').classList.add('switchButtons__link--active')
        forms[0].style.display = 'flex'

        for (var i = 0; i < tabs.length; i++) {           
            tabs[i].addEventListener('click', function(event) {
                this.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')

                var formFeedback = this.querySelector('.form__feedback')

                if (formFeedback)
                    formFeedback.style.display = 'none'
            
                for (var i = 0; i < forms.length; i++) 
                    forms[i].style.display = 'none'
    
                if (event.target.id === 'registerTab')
                    var form = document.getElementById('registerForm')
                else if (event.target.id === 'loginTab')
                    var form = document.getElementById('loginForm')
    
                if (form)
                    form.style.display = 'flex'
            }.bind(this), true)
        } 
    }
}
customElements.define('access-panel', AccessPanel)



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



class EditProfile extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="tabsElement switchButtons">
                <tab-element text="Information"></tab-element>
                <tab-element text="Password"></tab-element>
                <tab-element text="Account"></tab-element>
            </div>

            <div class="accessPanel__form">
                <span class="form__feedback"></span>

                <form id="informationForm" class="form">
                    <input-form label='Full name' type='text' name='fullname'></input-form>
                    <input-form label='E-mail' type='email' name='email'></input-form>
                    
                    <button id="infoSubmit" class="form__button form__button--submit" type="submit">Save information</button>
                </form>

                <form id="passwordForm" class="form">
                    <input-form label="Password" type="password" name="password"></input-form>
                    <input-form label='New password' type='password' name='newpassword'></input-form>

                    <button id="passwordSubmit" class="form__button form__button--submit" type="submit">Save new password</button>
                </form>

                <form id="accountForm" class="form">
                    <input-form label="Password" type="password" name="password"></input-form>

                    <button id="loginSubmit" class="form__button form__button--delete" type="submit">Delete account</button>
                </form>
            </div>`

        var tabs = this.querySelectorAll('tab-element')
        var forms = this.querySelectorAll('.form')

        for (var i = 0; i < tabs.length; i++) {
            forms[i].style.display = 'none'
            forms[i].onsubmit = function (event) {
                this.onSubmit(event)
            }.bind(this)
        }

        tabs[0].querySelector('.switchButtons__link').classList.add('switchButtons__link--active')
        forms[0].style.display = 'flex'

        for (var i = 0; i < tabs.length; i++) {             
            tabs[i].addEventListener('click', function(event) {
                this.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')

                var formFeedback = this.querySelector('.form__feedback')

                if (formFeedback)
                    formFeedback.style.display = 'none'
            
                for (var i = 0; i < forms.length; i++) 
                    forms[i].style.display = 'none'
    
                if (event.target.id === 'informationTab')
                    var form = document.getElementById('informationForm')
                else if (event.target.id === 'passwordTab')
                    var form = document.getElementById('passwordForm')
                else if (event.target.id === 'accountTab')
                    var form = document.getElementById('accountForm')
    
                form.style.display = 'flex'
            }.bind(this), true)
        }  
    }
}
customElements.define('edit-profile', EditProfile)



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
            </section>`
    }
}
customElements.define('search-element', SearchElement)




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