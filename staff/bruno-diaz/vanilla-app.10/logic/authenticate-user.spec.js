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