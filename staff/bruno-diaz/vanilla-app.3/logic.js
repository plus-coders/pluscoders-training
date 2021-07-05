function registerUser(email, password) {
    if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if(typeof password !== 'string') throw new TypeError(password + ' is not a string')

    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!regex.test(String(email).toLowerCase())) throw new Error(email + ' is not an e-mail')

    var exists = users.some(function (user) { return user.email === email })

    if (exists) throw new Error('user already exists')

    var user = { email: email, password: password }

    users.push(user)
}

function authenticateUser(email, password) {
    if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if(typeof password !== 'string') throw new TypeError(password + ' is not a string')

    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!regex.test(String(email).toLowerCase())) throw new Error(email + ' is not an e-mail')
    
    var user = users.find(function(user) {
        return user.email === email && user.password === password
    })

    if (!user) throw new Error('We have no user with this email or password')
}