describe('registerUser', () => {
    it('should succeed on new user', async () => {
        const fullname = getRandomString()
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = getRandomString('password')

        await registerUser(fullname, email, password)

        let response = await fetch("https://b00tc4mp.herokuapp.com/api/v2/users/auth", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: `{ "username": "${email}", "password": "${password}" }`,
        })

        const { token } = await response.json()

        response = await fetch("https://b00tc4mp.herokuapp.com/api/v2/users", {
            headers: { "Authorization": `Bearer ${token}` }
        })

        const { fullname: fullname2, username: email2 } = await response.json()

        expect(fullname2).toEqual(fullname)
        expect(email2).toEqual(email)

        await fetch("https://b00tc4mp.herokuapp.com/api/v2/users", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: `{ "password": "${password}" }`
        })
        .then(response => {
            expect(response.ok).toBeDefined()
        });
    })

    it('should fail when user already exists', async () => {
        const fullname = getRandomString()
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = getRandomString('password')

        await fetch("https://b00tc4mp.herokuapp.com/api/v2/users/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: `{ "fullname": "${fullname}", "username": "${email}", "password": "${password}" }`,
        })

        let _error

        try {
            await registerUser(fullname, email, password)
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`user with username "${email}" already exists`)
    })

    it('should fail when no fullname', async () => {
        const fullname = undefined
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = getRandomString('password')

        let _error

        try {
            await registerUser(fullname, email, password)
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`${fullname} is not a string`)
    })

    it('should fail when no email', async () => {
        const fullname = getRandomString()
        const email = undefined
        const password = getRandomString('password')

        let _error

        try {
            await registerUser(fullname, email, password)
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`${email} is not a string`)
    })

    it('should fail when no password', async () => {
        const fullname = getRandomString()
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = undefined

        let _error

        try {
            await registerUser(fullname, email, password)
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`${password} is not a string`)
    })

    it('should fail when no password format', async () => {
        const fullname = getRandomString()
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = getRandomString()

        let _error

        try {
            await registerUser(fullname, email, password)
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character`)
    })
})