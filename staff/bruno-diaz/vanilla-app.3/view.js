function createRegister(onRegister) {
    var form = document.createElement('form')

    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'E-mail'
    emailLabel.for = 'email'

    var email = document.createElement('input')
    email.type = 'email'
    email.name = 'email'
    email.id = 'email-register'

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    passwordLabel.for = 'password'

    var password = document.createElement('input')
    password.type = 'password'
    password.name = 'password'
    password.id = 'password-register'

    var submit = document.createElement('button')
    submit.innerText = 'Register'

    var feedback = document.createElement('span')
    feedback.style.color = 'red'
    feedback.style.display = 'none'

    emailLabel.append(email)
    passwordLabel.append(password)

    form.append(emailLabel)
    form.append(passwordLabel)
    form.append(submit)
    form.append(feedback)

    form.onsubmit = function (event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        onRegister(email, password)
    }

    return form
}

function createLogin(onLogin) {
    var form = document.createElement('form')

    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'E-mail'
    emailLabel.for = 'email'

    var email = document.createElement('input')
    email.type = 'email'
    email.name = 'email'
    email.id = 'email-login'

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    passwordLabel.for = 'password'

    var password = document.createElement('input')
    password.type = 'password'
    password.name = 'password'
    password.id = 'password-login'

    var submit = document.createElement('button')
    submit.innerText = 'Log In'

    var feedback = document.createElement('span')
    feedback.style.color = 'red'
    feedback.style.display = 'none'

    emailLabel.append(email)
    passwordLabel.append(password)

    form.append(emailLabel)
    form.append(passwordLabel)
    form.append(submit)
    form.append(feedback)

    form.onsubmit = function (event) {
        event.preventDefault()

        var email = event.target.email.value
        var password = event.target.password.value

        onLogin(email, password)
    }

    return form
}

function createDimmer(onRegister, onLogIn) {
    var dimmer = document.createElement('button')

    dimmer.style.width = '150px'
    dimmer.style.borderStyle = 'solid'
    dimmer.style.borderWidth = '2px'
    dimmer.style.margin = '16px'
    dimmer.style.padding = '16px'
    dimmer.style.display = 'flex'
    dimmer.style.justifyContent = 'center'
    dimmer.style.alignItems = 'center'
    dimmer.style.color = 'black'

    dimmer.innerHTML = 'LOG IN'

    dimmer.onclick = function() { 
        if (dimmer.innerText === 'LOG IN') {
            dimmer.innerText = 'REGISTER'
            
            onRegister()
        } else {
            dimmer.innerText = 'LOG IN'
            
            onLogIn()
        }
    }

    return dimmer
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