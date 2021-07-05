describe("authenticateUser", function () {

    it("should succeed on authenticate user", async () => {
        const fullname = getRandomString();
        const email = getRandomString() + "@" + getRandomString() + ".com";
        const password = getRandomString("password");

        await fetch("https://b00tc4mp.herokuapp.com/api/v2/users/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: `{ "fullname": "${fullname}", "username": "${email}", "password": "${password}" }`
        });

        const token = await authenticateUser(email, password);

        const response = await fetch(
        "https://b00tc4mp.herokuapp.com/api/v2/users", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const { fullname: fullname2, username: email2 } = await response.json();

        expect(fullname2).toEqual(fullname);
        expect(email2).toEqual(email);

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
    });

    it("should fail when user is no exist", async () => {
        const email = getRandomString() + "@" + getRandomString() + ".com";
        const password = getRandomString("password");

        let _error

        try {
            await authenticateUser(email, password);
        } catch (error) {
            _error = error;
        }

        expect(_error).toBeDefined();
        expect(_error.message).toEqual(`username and/or password wrong`);
    });

    it('should fail when no email', async () => {
        const email = undefined
        const password = getRandomString('password')

        let _error

        try {
            await authenticateUser(email, password);
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`${email} is not a string`)
    })

    it('should fail when no password', async () => {
        const email = getRandomString() + '@' + getRandomString() + '.com'
        const password = undefined

        let _error

        try {
            await authenticateUser(email, password);
        } catch(error) {
            _error = error
        }

        expect(_error).toBeDefined()
        expect(_error.message).toEqual(`${password} is not a string`)
    })
});
