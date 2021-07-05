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



var login = createLogin(function (email, password) {
    try {
        authenticateUser(email, password)

        login.style.display = 'none'
        dimmer.style.display = 'none'
        welcome.style.display = 'block'
        logout.style.display = 'block'
    } catch(error) {
        var feedback = login.querySelector('span')
        feedback.innerText = error.message
        feedback.style.display = 'block'
    }
})

login.style.display = 'none'
document.body.append(login)



var dimmer = createDimmer(
    function() {
        login.style.display = 'block'
        register.style.display = 'none'
    },
    function() {
        login.style.display = 'none'
        register.style.display = 'block'
    }
)

document.body.append(dimmer)



var welcome = createWelcome()

welcome.style.display = 'none'
document.body.append(welcome)



var logout = createLogout(
    function() { 
        register.style.display = 'block'
        dimmer.style.display = 'block'
        welcome.style.display = 'none'
        logout.style.display = 'none'
    }
)

logout.style.display = 'none'
document.body.append(logout)