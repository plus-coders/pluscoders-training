function randomString(type) {
    var length = Math.floor(Math.random() * 5) + 5
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var charactersUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var charactersNumbers = '0123456789'
    var charactersSpecial = '!"#$%&()*+,.;:-_/<>=?[]\|^~{}'

    var random = ''

    for ( var i = 0; i < length; i++ )
        random += characters.charAt(Math.floor(Math.random() * characters.length))

    if (type === 'password') {
        for ( var i = 0; i < 1; i++ )
            random += charactersUppercase.charAt(Math.floor(Math.random() * charactersUppercase.length))
        
        for ( var i = 0; i < 1; i++ )
            random += charactersNumbers.charAt(Math.floor(Math.random() * charactersNumbers.length))

        for ( var i = 0; i < 1; i++ )
            random += charactersSpecial.charAt(Math.floor(Math.random() * charactersSpecial.length))
    }

    return random
}

describe('logic', function () {
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



    describe('authenticateUser', function () {

        it('should succeed on valid instance with data', function () {
            //TO CÓMO TESTEAR EL ÉXITO
            var userIndex = Math.floor(Math.random() * users.length)

            var email = users[userIndex].email
            var password = users[userIndex].password

            // APPLY
            authenticateUser(email, password)

            // TEST
            // expect(users.length).toEqual(originData.length + 1)

            // var user = users.find(function (user) {
            //     return user.fullname === fullname && user.email === email && user.password === password
            // })

            // expect(fullname).toEqual(user.fullname)
            // expect(email).toEqual(user.email)
            // expect(password).toEqual(user.password)
        })

        it('should fail on valid instance but is not in data', function () {
            var email = randomString() + '@' + randomString() + '.com'
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, 'There is no registered user with those credentials')
        })

        it('should fail on valid instance but email is not in data', function () {
            var userIndex = Math.floor(Math.random() * users.length)

            var email = randomString() + '@' + randomString() + '.com'
            var password = users[userIndex].password

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, 'There is no registered user with those credentials')
        })

        it('should fail on valid instance but password is not in data', function () {
            var userIndex = Math.floor(Math.random() * users.length)

            var email = users[userIndex].email
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, 'There is no registered user with those credentials')
        })

        it('should fail on valid instance but user.email and user.password are from differents users', function () {
            var userIndex1 = Math.floor(Math.random() * users.length * 1/2)
            var userIndex2 = Math.floor(Math.random() * users.length * 1/2) + Math.floor(users.length * 1/2)
            
            var email = users[userIndex1].email
            var password = users[userIndex2].password

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, 'There is no registered user with those credentials')
        })

        it('should fail on valid instance but password is diferent', function () {
            var userIndex = Math.floor(Math.random() * users.length)

            var email = randomString() + '@' + randomString() + '.com'
            var password = users[userIndex].password

            var email = randomString() + '@' + randomString() + '.com'
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, 'There is no registered user with those credentials')
        })

        it('should fail on invalid email format: no email', function () {
            var email
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(TypeError, email + ' is not a string')
        })

        it('should fail on invalid email format: no @', function () {
            var email = randomString() + randomString() + '.com'
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, email + ' is not an e-mail')
        })

        it('should fail on invalid email format: wrong username', function () {
            var email = '@' + randomString() + '.com'
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, email + ' is not an e-mail')
        })

        it('should fail on invalid email instance: no organitation domain', function () {
            var email = randomString() + '@' + '.com'
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, email + ' is not an e-mail')
        })

        it('should fail on invalid email instance: no extention domain', function () {
            var email = randomString() + '@' + randomString()
            var password = randomString('password')

            // APPLY & TEST

            expect(function() {
                authenticateUser(email, password)
            }).toThrowError(Error, email + ' is not an e-mail')
        })
    })



    describe('searchInGoogle', function () {
        it('should succeed on valid instance datas in Google', function (done) {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            searchInGoogle(query, page, function(searchResults, page) {
                pageBack = page

                searchResults.forEach( function(element) {
                    var result = {}
                    result = element
                    results.push(result)
                });

                // TEST

                expect(results.length).toBeGreaterThan(0)

                results.forEach( function(object) {
                    expect(typeof object.title).toEqual('string')
                    expect(typeof object.url).toEqual('string')
                    expect(typeof object.preview).toEqual('string')
                })

                expect(pageBack).toEqual(page)
                
                // ASYNC callback
                done()
            })
        })

        it('should fail on query does not get result in Google', function (done) {
            var query = randomString() + randomString() + randomString()

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            searchInGoogle(query, page, function(searchResults, page) {
                pageBack = page

                searchResults.forEach( function(object) {
                    var result = {}
                    result = object
                    results.push(result)
                });

                // TEST

                expect(results.length).toEqual(0)

                results.forEach( function(object) {
                    expect(typeof object.title).toEqual('undefined')
                    expect(typeof object.url).toEqual('undefined')
                    expect(typeof object.preview).toEqual('undefined')
                })

                expect(pageBack).toEqual(page)
                
                // ASYNC callback
                done()
            })
        })

        it('should fail on page data is not a number in Google', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInGoogle(query, page, function() {});
            }).toThrowError(TypeError, page + ' is not a number')
        })

        it('should fail on callback is not a function in Google', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInGoogle(query, page, undefined);
            }).toThrowError(TypeError, undefined + ' is not a function')
        })
    })



    describe('searchInYahoo', function () {

        it('should succeed on valid instance datas in Yahoo', function (done) {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            searchInYahoo(query, page, function(searchResults, page) {
                pageBack = page

                searchResults.forEach( function(element) {
                    var result = {}
                    result = element
                    results.push(result)
                });

                // TEST

                expect(results.length).toBeGreaterThan(0)

                results.forEach( function(object) {
                    expect(typeof object.title).toEqual('string')
                    expect(typeof object.url).toEqual('string')
                    expect(typeof object.preview).toEqual('string')
                })

                expect(pageBack).toEqual(page)
                
                // ASYNC callback
                done()
            })
        })

        // it('should fail on query does not get result in Yahoo', function (done) {
        //     var query = randomString() + randomString() + randomString()

        //     var page = Math.floor(Math.random() * 4 + 1)

        //     // APPLY

        //     var results = []
        //     results.length = 0

        //     var pageBack

        //     searchInYahoo(query, page, function(searchResults, page) {
        //         pageBack = page

        //         searchResults.forEach( function(object) {
        //             var result = {}
        //             result = object
        //             results.push(result)
        //         });

        //         // TEST

        //         expect(results.length).toEqual(0)

        //         results.forEach( function(object) {
        //             expect(typeof object.title).toEqual('undefined')
        //             expect(typeof object.url).toEqual('undefined')
        //             expect(typeof object.preview).toEqual('undefined')
        //         })

        //         expect(pageBack).toEqual(page)
                
        //         // ASYNC callback
        //         done()
        //     })
        // })

        it('should fail on page data is not a number in Yahoo', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInYahoo(query, page, function() {});
            }).toThrowError(TypeError, page + ' is not a number')
        })

        it('should fail on callback is not a function in Yahoo', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInYahoo(query, page, undefined);
            }).toThrowError(TypeError, undefined + ' is not a function')
        })
    })



    describe('searchInBing', function () {

        it('should succeed on valid instance datas in Bing', function (done) {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            searchInBing(query, page, function(searchResults, page) {
                pageBack = page

                searchResults.forEach( function(element) {
                    var result = {}
                    result = element
                    results.push(result)
                });

                // TEST

                expect(results.length).toBeGreaterThan(0)

                results.forEach( function(object) {
                    expect(typeof object.title).toEqual('string')
                    expect(typeof object.url).toEqual('string')
                    expect(typeof object.preview).toEqual('string')
                })

                expect(pageBack).toEqual(page)
                
                // ASYNC callback
                done()
            })
        })

        // it('should fail on query does not get result in Bing', function (done) {
        //     var query = randomString() + randomString() + randomString()

        //     var page = Math.floor(Math.random() * 4 + 1)

        //     // APPLY

        //     var results = []
        //     results.length = 0

        //     var pageBack

        //     searchInBing(query, page, function(searchResults, page) {
        //         pageBack = page

        //         searchResults.forEach( function(object) {
        //             var result = {}
        //             result = object
        //             results.push(result)
        //         });

        //         // TEST

        //         expect(results.length).toEqual(0)

        //         results.forEach( function(object) {
        //             expect(typeof object.title).toEqual('undefined')
        //             expect(typeof object.url).toEqual('undefined')
        //             expect(typeof object.preview).toEqual('undefined')
        //         })

        //         expect(pageBack).toEqual(page)
                
        //         // ASYNC callback
        //         done()
        //     })
        // })

        it('should fail on page data is not a number in Bing', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInBing(query, page, function() {});
            }).toThrowError(TypeError, page + ' is not a number')
        })

        it('should fail on callback is not a function in Bing', function () {
            var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
            var query = queries[Math.floor(Math.random() * queries.length)]

            var page = Math.floor(Math.random() * 4 + 1)

            // APPLY

            var results = []
            results.length = 0

            var pageBack

            expect(function() {
                searchInBing(query, page, undefined);
            }).toThrowError(TypeError, undefined + ' is not a function')
        })
    })
})