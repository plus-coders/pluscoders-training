// data

var users = [{ email: 'pepito@grillo.com', password: '123123123' }]

// logic

function registerUser(email, password) {
    if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if(typeof password !== 'string') throw new TypeError(password + ' is not a string')

    if (!email.includes('@') || !email.includes('.')) throw new Error(email + ' is not an e-mail')

    // TODO validate parts of the e-mail => ???@???.???

    var exists = users.some(function (user) { return user.email === email })

    if (exists) throw new Error('user already exists')

    var user = { email: email, password: password }

    users.push(user)
}

// view

function createRegister(onRegister) {
    var form = document.createElement('form')

    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'E-mail'
    emailLabel.for = 'email'

    var email = document.createElement('input')
    email.type = 'email'
    email.name = 'email'
    email.id = 'email'

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    passwordLabel.for = 'password'

    var password = document.createElement('input')
    password.type = 'password'
    password.name = 'password'
    password.id = 'password'

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

var register = createRegister(function (email, password) {
    try {
        registerUser(email, password)

        register.style.display = 'none'
        welcome.style.display = 'block'
    } catch(error) {
        //alert(error.message)

        var feedback = register.querySelector('span')
        feedback.innerText = error.message
        feedback.style.display = 'block'
    }

})

document.body.append(register)


function createWelcome() {
    var h1 = document.createElement('h1')

    h1.innerText = 'Welcome!'

    return h1
}

var welcome = createWelcome()
welcome.style.display = 'none'

document.body.append(welcome)


// TODO add a logout button in welcome, that accepts a configurable behavior to logout and show the landing panel
// TODO add a landing to choose "Register or Login", so that when clicking on register it shows the register panel, otherwise, when clicking on the login it shows the login panel. also make this landing panel the default panel when the app start.
// TODO add a login panel, that when submitting with the correct credentials, it logs the user in, otherwise it throws an error "wrong credentials"