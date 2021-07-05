function createBackofficeForm(onEvent) {

    var backofficeForm = document.createElement('div')
    backofficeForm.style.width = '400px'
    backofficeForm.style.border = '1px solid #cccccc'
    backofficeForm.style.margin = '42px auto'


    var navBackofficeForm = document.createElement('nav')
    backofficeForm.append(navBackofficeForm)


    var navListBackofficeForm = document.createElement('ul')
    navListBackofficeForm.style.margin = '0'
    navListBackofficeForm.style.padding = '0'
    navListBackofficeForm.style.border = '0'
    navListBackofficeForm.style.listStyle = 'none'
    navListBackofficeForm.style.display = 'flex'
    navListBackofficeForm.style.flexFlow = 'row nowrap'
    navBackofficeForm.append(navListBackofficeForm)

    
    var navItemRegister = document.createElement('li')
    navListBackofficeForm.append(navItemRegister)

    var registerLink = document.createElement('a')
    registerLink.title = 'Register'
    registerLink.href = '#'
    registerLink.innerHTML = 'REGISTER'
    registerLink.style.textDecoration = 'none'
    registerLink.style.fontSize = '12px'
    registerLink.style.fontWeight = 'bold'
    registerLink.style.width = '200px'
    registerLink.style.height = '40px'
    registerLink.style.display = 'flex'
    registerLink.style.justifyContent = 'center'
    registerLink.style.alignItems = 'center'
    registerLink.style.color = 'Teal'
    registerLink.style.boxSizing = 'border-box'
    navItemRegister.append(registerLink)

    registerLink.onclick = function() {
        registerLink.style.backgroundColor = '#ffffff'
        registerLink.style.border = 'none'
        loginLink.style.backgroundColor = '#f7f7f7'
        loginLink.style.borderBottom = '1px solid #cccccc'
        loginLink.style.borderLeft = '1px solid #cccccc'
        submit.innerText = 'Register'
    }


    var navItemLogin = document.createElement('li')
    navListBackofficeForm.append(navItemLogin)

    var loginLink = document.createElement('a')
    loginLink.title = 'Log in'
    loginLink.href = '#'
    loginLink.innerHTML = 'LOG IN'
    loginLink.style.textDecoration = 'none'
    loginLink.style.fontSize = '12px'
    loginLink.style.fontWeight = 'bold'
    loginLink.style.width = '200px'
    loginLink.style.height = '40px'
    loginLink.style.display = 'flex'
    loginLink.style.justifyContent = 'center'
    loginLink.style.alignItems = 'center'
    loginLink.style.color = 'Teal'
    loginLink.style.backgroundColor = '#f7f7f7'
    loginLink.style.boxSizing = 'border-box'
    loginLink.style.borderBottom = '1px solid #cccccc'
    loginLink.style.borderLeft = '1px solid #cccccc'
    navItemLogin.append(loginLink)

    loginLink.onclick = function() {
        registerLink.style.backgroundColor = '#f7f7f7'
        registerLink.style.borderBottom = '1px solid #cccccc'
        registerLink.style.borderRight = '1px solid #cccccc'
        loginLink.style.backgroundColor = '#ffffff'
        loginLink.style.border = 'none'
        submit.innerText = 'Log in'
    }


    var form = document.createElement('form')
    backofficeForm.append(form)

    form.style.width = '400px'
    form.style.margin = '32px auto 16px'
    form.style.display = 'flex'
    form.style.flexFlow = 'column nowrap'
    form.style.justifyContent = 'center'
    form.style.alignItems = 'center'


    var feedback = document.createElement('span')
    feedback.style.color = '#000000'
    feedback.style.backgroundColor = 'LightPink'
    feedback.style.minWidth = '270px'
    feedback.style.maxWidth = '310px'
    feedback.style.padding = '4px 8px'
    feedback.style.textAlign = 'center'
    feedback.style.display = 'none'

    form.append(feedback)


    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'E-mail'
    emailLabel.for = 'email'
    emailLabel.style.width = '300px'
    emailLabel.style.marginTop = '16px'

    var email = document.createElement('input')
    email.type = 'email'
    email.name = 'email'
    email.id = 'email'
    email.style.width = '300px'

    emailLabel.append(email)
    form.append(emailLabel)


    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    passwordLabel.for = 'password'
    passwordLabel.style.width = '300px'
    passwordLabel.style.marginTop = '16px'

    var password = document.createElement('input')
    password.type = 'password'
    password.name = 'password'
    password.id = 'password'
    password.style.width = '300px'

    passwordLabel.append(password)
    form.append(passwordLabel)


    var submit = document.createElement('button')
    submit.innerText = 'Register'
    submit.style.width = '200px'
    submit.style.margin = '32px 0'
    submit.style.padding = '8px'
    submit.style.backgroundColor = 'Teal'
    submit.style.color = '#ffffff'
    submit.style.border = 'none'
    submit.style.fontSize = '15px'
    submit.style.fontWeight = 'bold'
    submit.style.borderRadius = '5px'
    submit.style.outline = 'none'

    form.append(submit)

    form.onsubmit = function (event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        var action = submit.innerText

        onEvent(email, password, action)
    }



    return backofficeForm
}




function createWelcome() {
    var h1 = document.createElement('h1')

    h1.innerText = 'Welcome!'

    return h1
}




function createLogout(onLogout) {
    var logout = document.createElement('button')

    logout.style.width = '50px'
    logout.style.height = '50px'
    logout.style.borderStyle = 'solid'
    logout.style.borderWidth = '2px'
    logout.style.padding = '2px'
    logout.style.display = 'flex'
    logout.style.justifyContent = 'center'
    logout.style.alignItems = 'center'

    logout.innerHTML = 'LOG OUT'

    logout.onclick = onLogout

    return logout
}