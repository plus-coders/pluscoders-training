describe('registerUser', function () {

    it('should succeed on valid instance with data', function () {
        var originData = {}
        originData.length = users.length

        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')

        // APPLY
        registerUser(fullname, email, password)

        // TEST
        expect(users.length).toEqual(originData.length + 1)

        var user = users.find(function (user) {
            return user.fullname === fullname && user.email === email && user.password === password
        })

        expect(fullname).toEqual(user.fullname)
        expect(email).toEqual(user.email)
        expect(password).toEqual(user.password)
    })

    it('should fail on undefined fullname', function() {
        var fullname
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(TypeError, fullname + ' is not a string')
    })

    it('should fail on undefined email', function() {
        var fullname = randomString('fullname')
        var email
        var password = randomString('password')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(TypeError, email + ' is not a string')
    })

    it('should fail on invalid email instance: no @', function() {
        var fullname = randomString('fullname')
        var email = randomString() + randomString() + '.com'
        var password = randomString('password')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, email + ' is not an e-mail')
    })

    it('should fail on invalid email instance: wrong username', function() {
        var fullname = randomString('uppercase')
        var email = '@' + randomString() + '.com'
        var password = randomString('numeric')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, email + ' is not an e-mail')
    })

    it('should fail on invalid email instance: no organitation domain', function() {
        var fullname = randomString()
        var email = randomString() + '@' + '.com'
        var password = randomString('password')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, email + ' is not an e-mail')
    })

    it('should fail on invalid email instance: no extention domain', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString()
        var password = randomString('password')

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, email + ' is not an e-mail')
    })

    it('should fail on invalid password instance: no password', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(TypeError, password + ' is not a string')
    })

    it('should fail on invalid password instance: no lowcases character', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')
        password = password.slice(password.length - 3, password.length) + password.slice(password.length - 3, password.length)

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should fail on invalid password instance: no uppercase character', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password').toLocaleLowerCase()

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should fail on invalid password instance: no number', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')
        password = password.slice(0, password.length - 2) + password.slice(password.length - 1, password.length)

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should fail on invalid password instance: no symbol', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')
        password = password.slice(0, password.length - 1)

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should fail on invalid password instance: less than 8 characteres', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')
        password = password.slice(password.length - 6, password.length)

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should fail on invalid password instance: more than 13 characteres', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')
        password += password + password

        // APPLY & TEST

        expect(function() {
            registerUser(fullname, email, password)
        }).toThrowError(Error, 'The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
    })

    it('should succeed width repeat fullname and password', function () {
        var originData = {}
        originData.length = users.length

        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')

        var fullnameRepeat = fullname
        var email2 = randomString() + '@' + randomString() + '.com'
        var passwordRepeat =  password

        // APPLY

        registerUser(fullname, email, password)
        registerUser(fullnameRepeat, email2, passwordRepeat)

        // TEST

        expect(users.length).toEqual(originData.length + 2)

        var user = users.find(function (user) {
            return user.fullname === fullnameRepeat && user.email === email2 && user.password === passwordRepeat
        })

        expect(fullnameRepeat).toEqual(user.fullname)
        expect(email2).toEqual(user.email)
        expect(passwordRepeat).toEqual(user.password)
    })

    it('should fail with repeat email', function() {
        var fullname = randomString()
        var email = randomString() + '@' + randomString() + '.com'
        var password = randomString('password')

        var fullname2 = randomString()
        var emailRepeat = email
        var password2 =  randomString('password')

        // APPLY

        registerUser(fullname, email, password)
        
        // APPLY & TEST

        expect(function() {
            registerUser(fullname2, emailRepeat, password2)
        }).toThrowError(Error, 'user already exists')
    })
})