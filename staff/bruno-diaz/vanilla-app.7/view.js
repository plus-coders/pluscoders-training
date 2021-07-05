function createAccessControlPanel(onRegister, onLogin, onSwitch) {

    var backofficeForm = document.createElement('div')
    backofficeForm.classList.add('backofficeAccess')
    backofficeForm.id = 'backofficeAccess'
    
    
    var navListBackofficeForm = document.createElement('ul')
    navListBackofficeForm.classList.add('switchButtons')
    backofficeForm.append(navListBackofficeForm)
    
    var navItemRegister = document.createElement('li')
    navListBackofficeForm.append(navItemRegister)

    var navItemLogin = document.createElement('li')
    navListBackofficeForm.append(navItemLogin)

    var registerLink = createLinkActionBackoffice('Register', navItemRegister, onSwitch)
    registerLink.classList.add('switchButtons__link--active')

    var loginLink = createLinkActionBackoffice('Log in', navItemLogin, onSwitch)


    var formWrapper = document.createElement('div')
    formWrapper.classList.add('backofficeAccess__form')
    backofficeForm.append(formWrapper)

    var feedback = document.createElement('span')
    feedback.classList.add("form__feedback")
    formWrapper.append(feedback)

    
    var registerForm = document.createElement('form')
    registerForm.id = 'registerForm'
    registerForm.classList.add('form')
    formWrapper.append(registerForm)

    createInputBackoffice('Full name', 'text', 'fullname', registerForm)
    createInputBackoffice('E-mail', 'email', 'email', registerForm)
    createInputBackoffice('Password', 'password', 'password', registerForm)

    var submit = document.createElement('button')
    submit.classList.add('backofficeForm__submit')
    submit.innerText = 'Register'
    submit.classList.add('form__button')
    submit.classList.add('form__button--submit')
    registerForm.append(submit)

    registerForm.onsubmit = function (event) {
        event.preventDefault()

        var fullname = event.target.fullname.value
        var email = event.target.email.value
        var password = event.target.password.value

        onRegister(fullname, email, password)
    }


    var loginForm = document.createElement('form')
    loginForm.id = 'loginForm'
    loginForm.classList.add('form')
    loginForm.style.display = 'none'
    formWrapper.append(loginForm)

    createInputBackoffice('E-mail', 'email', 'email', loginForm)
    createInputBackoffice('Password', 'password', 'password', loginForm)

    var submit = document.createElement('button')
    submit.innerText = 'Log in'
    submit.classList.add('form__button')
    submit.classList.add('form__button--submit')
    loginForm.append(submit)

    loginForm.onsubmit = function (event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        onLogin(email, password)
    }

    return backofficeForm
}



// Add a link of backoffice form

function createLinkActionBackoffice(text, where, callback) {
    var element = document.createElement('a')
    element.title = text
    element.href = '#'
    element.innerHTML = text
    element.classList.add('switchButtons__link')
    
    where.append(element)

    element.onclick = callback

    return element
}



// Add a input of backoffice form

function createInputBackoffice(text, type, name, where) {
    var width = '300px'

    var elementWrapper = document.createElement('span')
    elementWrapper.classList.add('form__element')
    elementWrapper.style.width = width
    where.append(elementWrapper)

    var elementLabel = document.createElement('label')
    elementLabel.innerText = text
    elementLabel.for = type
    elementLabel.style.width = width
    elementWrapper.append(elementLabel)

    var element = document.createElement('input')
    element.type = type
    element.name = name
    element.id = name
    element.style.width = width
    element.classList.add('form__element--input')

    elementLabel.append(element)

    return elementLabel
}



// Create a header of session

function createHeader(user, openUserMenu, onEditProfile, onLogout) {
    var header = document.createElement('header')
    header.id = 'header'

    var logo = document.createElement('h1')
    logo.innerText = 'logo'
    header.append(logo)

    var accountDropdown = document.createElement('div')
    accountDropdown.classList.add("acountDropdown")
    header.append(accountDropdown)

    var accountNameWrapper = document.createElement('div')
    accountNameWrapper.classList.add("acountDropdown__link")
    accountDropdown.append(accountNameWrapper)

    accountDropdown.onclick = openUserMenu

    var accountName = document.createElement('span')
    accountName.classList.add("acountDropdown__name")
    accountName.innerText = user.fullname
    accountNameWrapper.append(accountName)
    
    var accountIcon = document.createElement('i')
    accountIcon.classList.add('fa')
    accountIcon.classList.add('fa-angle-down')
    accountNameWrapper.append(accountIcon)
    
    var accountMenu = document.createElement('ul')
    accountMenu.classList.add("acountDropdown__menu")
    accountDropdown.append(accountMenu)
    
    var accountMenuEdit = document.createElement('li')
    accountMenuEdit.onclick = onEditProfile
    accountMenu.append(accountMenuEdit)

    var accountTextEdit = document.createElement('span')
    accountTextEdit.innerText = 'Edit account'
    accountMenuEdit.append(accountTextEdit)

    var accountIconEdit = document.createElement('i')
    accountIconEdit.classList.add('fa')
    accountIconEdit.classList.add('fa-pencil-square-o')
    accountMenuEdit.append(accountIconEdit)
    
    var accountMenuLogout = document.createElement('li')
    accountMenuLogout.onclick = onLogout
    accountMenu.append(accountMenuLogout)

    var accountTextLogout = document.createElement('span')
    accountTextLogout.innerText = 'Log out'
    accountMenuLogout.append(accountTextLogout)
    
    var accountIconLogout = document.createElement('i')
    accountIconLogout.classList.add('fa')
    accountIconLogout.classList.add('fa-sign-out')
    accountMenuLogout.append(accountIconLogout)

    return header
}



// Create Edit profile form

function createEditProfile(user, onSwitchInfo, onSwitchPassword, onSwitchAccount, closeModal, onUpdate, onDelete) {

    var modal = document.createElement('section')
    modal.classList.add('modal')
    modal.classList.add('modal--editProfile')

    var modalBackground = document.createElement('div')
    modalBackground.classList.add('modal__background')
    modalBackground.onclick = function() {
        closeModal(modal)
    }
    modal.append(modalBackground)

    var modalContainer = document.createElement('div')
    modalContainer.classList.add('modal__container')
    modal.append(modalContainer)

    var modalHeader = document.createElement('div')
    modalHeader.classList.add('modalHeader')
    modalContainer.append(modalHeader)

    var modalTitle = document.createElement('h3')
    modalTitle.innerText = 'Edit Account'
    modalTitle.classList.add('modalHeader__title')
    modalHeader.append(modalTitle)

    var modalClose = document.createElement('i')
    modalClose.classList.add('fa')
    modalClose.classList.add('fa-times')
    modalClose.classList.add('modalHeader__close')
    modalClose.onclick = function() {
        closeModal(modal)
    }
    modalHeader.append(modalClose)

    var editProfile = document.createElement('div')
    editProfile.classList.add('formContainer')
    modalContainer.append(editProfile)
    
    var navListEditProfile = document.createElement('ul')
    navListEditProfile.classList.add('switchButtons')
    editProfile.append(navListEditProfile)
    
    var navItemInfo = document.createElement('li')
    navListEditProfile.append(navItemInfo)

    var navItemPassword = document.createElement('li')
    navListEditProfile.append(navItemPassword)

    var navItemAccount = document.createElement('li')
    navListEditProfile.append(navItemAccount)

    var navInfoLink = createLinkActionBackoffice('Info', navItemInfo, onSwitchInfo)
    navInfoLink.classList.add('switchButtons__link--active')

    var navPasswordLink = createLinkActionBackoffice('Password', navItemPassword, onSwitchPassword)

    var navAccountLink = createLinkActionBackoffice('Delete Account', navItemAccount, onSwitchAccount)

    var formWrapper = document.createElement('div')
    formWrapper.classList.add('backofficeAccess__form')
    editProfile.append(formWrapper)

    var feedback = document.createElement('span')
    feedback.classList.add("form__feedback")
    formWrapper.append(feedback)

    var editInfoForm = document.createElement('form')
    editInfoForm.classList.add('form')
    editInfoForm.id = 'editInfoForm'
    formWrapper.append(editInfoForm)

    var fullnameInput = createInputBackoffice('Full name', 'text', 'fullname', editInfoForm)
    fullnameInput = fullnameInput.querySelector('#fullname.form__element--input')
    fullnameInput.value= user.fullname

    var emailInput = createInputBackoffice('E-mail', 'email', 'email', editInfoForm)
    emailInput = emailInput.querySelector('#email.form__element--input')
    emailInput.value = user.username

    var submit = document.createElement('button')
    submit.classList.add('form__button')
    submit.classList.add('form__button--submit')
    submit.innerText = 'Save'
    editInfoForm.append(submit)

    editInfoForm.onsubmit = function (event) {
        event.preventDefault()

        var fullname = event.target.fullname.value
        var email = event.target.email.value

        onUpdate('info', fullname, email)
    }

    var changePasswordForm = document.createElement('form')
    changePasswordForm.classList.add('form')
    changePasswordForm.id = 'changePasswordForm'
    changePasswordForm.style.display = 'none'
    formWrapper.append(changePasswordForm)

    var password = createInputBackoffice('Password', 'password', 'oldPassword', changePasswordForm)
    var passwordNew = createInputBackoffice('New password', 'password', 'password', changePasswordForm)

    var submit = document.createElement('button')
    submit.classList.add('form__button')
    submit.classList.add('form__button--submit')
    submit.innerText = 'Save'
    changePasswordForm.append(submit)

    changePasswordForm.onsubmit = function (event) {
        event.preventDefault()
        var oldPassword = event.target.oldPassword.value
        var password = event.target.password.value

        onUpdate('password', oldPassword, password)
    }

    var deleteAccountForm = document.createElement('form')
    deleteAccountForm.classList.add('form')
    deleteAccountForm.id = 'deleteAccountForm'
    deleteAccountForm.style.display = 'none'
    formWrapper.append(deleteAccountForm)

    var password = createInputBackoffice('Password', 'password', 'password', deleteAccountForm)

    var submit = document.createElement('button')
    submit.classList.add('form__button')
    submit.classList.add('form__button--delete')
    submit.innerText = 'Delete account'
    deleteAccountForm.append(submit)

    deleteAccountForm.onsubmit = function (event) {
        event.preventDefault()

        var password = event.target.password.value

        onDelete(password)
    }

    return modal
}



// Create pag welcome

function createSession(user, openUserMenu, onEditProfile, onLogout, onSearch) {
    var pagWelcome = document.createElement('div')
    pagWelcome.id = 'account'

    var header = createHeader(user, openUserMenu, onEditProfile, onLogout)
    pagWelcome.append(header)
    
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

    var form = document.createElement('form')
    form.classList.add('searchComponent__form')
    sectionSearch.append(form)

    var searchSearchers = document.createElement('select')
    searchSearchers.name = 'searchers'
    searchSearchers.classList.add('searchComponent__select')
    form.append(searchSearchers)

    var searchSearchersAll = document.createElement('option')
    searchSearchersAll.value = 'all'
    searchSearchersAll.innerText = 'All'
    searchSearchers.append(searchSearchersAll)

    var searchSearchersGoogle = document.createElement('option')
    searchSearchersGoogle.value = 'google'
    searchSearchersGoogle.innerText = 'Google'
    searchSearchers.append(searchSearchersGoogle)

    var searchSearchersYahoo = document.createElement('option')
    searchSearchersYahoo.value = 'yahoo'
    searchSearchersYahoo.innerText = 'Yahoo'
    searchSearchers.append(searchSearchersYahoo)

    var searchSearchersBing = document.createElement('option')
    searchSearchersBing.value = 'bing'
    searchSearchersBing.innerText = 'Bing'
    searchSearchers.append(searchSearchersBing)
    
    var searchInput = document.createElement('input')
    searchInput.type = 'text'
    searchInput.name = 'searchInput'
    searchInput.classList.add('searchComponent__input')
    form.append(searchInput)

    var searchSubmit = document.createElement('button')
    searchSubmit.innerText = 'Search'
    searchSubmit.classList.add('searchComponent__submit')
    form.append(searchSubmit)

    
    form.onsubmit = function (event) {
        event.preventDefault()

        var searcher = event.target.searchers.value
        var query = event.target.searchInput.value
        
        onSearch(searcher, query)
    }

    return sectionSearch
}



// loading results component

function setLoading(dimmer) {
    var submitSearchLoading = document.querySelector('.searchComponent__submit')

    var searchComponentLoading = document.getElementById('searchComponent')

    var resultsWrapper = document.getElementById('resultsWrapper')

    if (dimmer === 'start') {
        searchComponentLoading.classList.add('searchComponent--searching')

        submitSearchLoading.innerText = ''
        submitSearchLoading.disabled = true
        
        for (var i = 0; i < 5; i++) {
            var element = document.createElement('span')
            submitSearchLoading.append(element)
        }
        
        if (resultsWrapper) resultsWrapper.style.opacity = '0.3'
        
    } else if (dimmer === 'stop') {
        searchComponentLoading.classList.remove('searchComponent--searching')
        
        submitSearchLoading.innerText = 'search'
        submitSearchLoading.disabled = false

        if (resultsWrapper) resultsWrapper.style.opacity = '1'
    }
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

            var resultItem = document.createElement('li')
            resultItem.style.margin = '24px 0'
            resultsList.append(resultItem)
            
            var result = document.createElement('a')
            result.href = searchResult.url
            result.target = '_blank'
            resultItem.append(result)
            
            var resultTitle = document.createElement('p')
            resultTitle.innerHTML = searchResult.title
            resultTitle.over = searchResult.title
            resultTitle.style.fontSize = '20px'
            // resultTitle.style.fontWeight = 'bold'
            resultTitle.style.color = 'Teal'
            resultTitle.style.margin = '8px 0'
            resultTitle.classList.add('result__title')
            result.append(resultTitle)

            var resultDescription = document.createElement('p')
            resultDescription.innerHTML = searchResult.preview
            resultDescription.style.fontSize = '14px'
            resultDescription.style.opacity = '.8'
            result.append(resultDescription)
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



// loading results component

function createLoading1() {
    var searchComponentLoading = document.getElementById('searchComponent')
    searchComponentLoading.classList.add('searchComponent--searching')

    var submitSearchLoading = document.querySelector('.searchComponent__submit')
    submitSearchLoading.innerText = ''
    submitSearchLoading.classList.add('searchComponent__submit--searching')

    var circle1 = document.createElement('span')
    submitSearchLoading.append(circle1)
    var circle2 = document.createElement('span')
    submitSearchLoading.append(circle2)
    var circle3 = document.createElement('span')
    submitSearchLoading.append(circle3)
    var circle4 = document.createElement('span')
    submitSearchLoading.append(circle4)
    var circle5 = document.createElement('span')
    submitSearchLoading.append(circle5)

    return loading
}