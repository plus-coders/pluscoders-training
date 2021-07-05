function createAccessControlPanel(onRegister, onLogin) {

    var accessPanel = document.createElement('div')
    accessPanel.classList.add("accessPanel")
    document.body.append(accessPanel)

    var labelTabs = "['Log in', 'Register']"

    var contentTabsLogin = "<form id='loginForm'><input-form label='E-mail' type='email' name='email'></input-form><input-form label='Password' type='password' name='password'></input-form><button class='button button__cta'>Log in</button></form>"
    var contentTabsRegister = "<form id='registerForm'><input-form label='Full name' type='text' name='fullname'></input-form><input-form label='E-mail' type='email' name='email'></input-form><input-form label='Password' type='password' name='password'></input-form><button class='button button__cta'>Register</button></form>"
    var contentTabs = [contentTabsLogin, contentTabsRegister]

    accessPanel.innerHTML = `<tabs-panel labeltabs="${labelTabs}" contenttabs="${contentTabs}"></tabs-panel>`

    var form = accessPanel.querySelector('form')
    
    form.addEventListener("submit", function(event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        if (event.target.id === 'loginForm') {
            onLogin(email, password)
        } else {
            var fullname = event.target.fullname.value
            onRegister(fullname, email, password)
        }
    })

    return accessPanel
}



// Create Edit profile form

function createEditProfile(user, onUpdate, onDelete) {
    var modal = document.createElement('modal-element')
    modal.titleModal = "Edit account"
    document.body.append(modal)

    var labelTabs = "['Information', 'Password', 'Account']"

    var contentTabsInformation = "<form id='informationForm'><input-form label='Fullname' type='text' name='fullname'></input-form><input-form label='E-mail' type='email' name='email'></input-form><button class='button button__cta'>Save changes</button></form>"
    var contentTabsPassword = "<form id='passwordForm'><input-form label='Password' type='password' name='password'></input-form><input-form label='New password' type='password' name='newpassword'></input-form><button class='button button__cta'>Save password</button></form>"
    var contentTabsAccount = "<form id='accountForm'><input-form label='Password' type='password' name='password'></input-form><button class='button button__cta'>Delete account</button></form>"
    var contentTabs = [contentTabsInformation, contentTabsPassword, contentTabsAccount]

    var modalContent = modal.querySelector('#modalContent')
    modalContent.innerHTML = `<tabs-panel labeltabs="${labelTabs}" contenttabs="${contentTabs}"></tabs-panel>`

    var fullnameInput = modalContent.querySelector('input[name="fullname"]')
    fullnameInput.value = user.fullname
    var emailInput = modalContent.querySelector('input[name="email"]')
    emailInput.value = user.username

    var form = modalContent.querySelector('form')
    
    form.addEventListener("submit", function(event) {
        event.preventDefault()

        if (event.target.id === "informationForm") {
            var fullname = event.target.fullname.value
            var email = event.target.email.value
            onUpdate('info', fullname, email)
        } else if (event.target.id === "passwordForm") {
            var password = event.target.password.value
            var newpassword = event.target.newpassword.value
            onUpdate('password', password, newpassword)
        } else if (event.target.id === "passwordForm") {
            var password = event.target.password.value
            onDelete(password)
        }
    })
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
    document.body.append(loading)

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