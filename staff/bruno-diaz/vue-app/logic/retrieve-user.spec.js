describe("retrieveUser", function () {

    it("should succeed on retrieve user", async () => {
        const fullname = getRandomString();
        const email = getRandomString() + "@" + getRandomString() + ".com";
        const password = getRandomString("password");

        await fetch("https://b00tc4mp.herokuapp.com/api/v2/users/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: `{ "fullname": "${fullname}", "username": "${email}", "password": "${password}" }`
        });

        const response = await fetch("https://b00tc4mp.herokuapp.com/api/v2/users/auth", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: `{ "username": "${email}", "password": "${password}" }`,
        })

        const { token } = await response.json()

        const user = await retrieveUser(token);

        expect(user.fullname).toEqual(fullname);
        expect(user.username).toEqual(email);

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

    it("should fail when token is undefined", async () => {
        const token = undefined

        let _error

        try {
            await retrieveUser(token);
        } catch (error) {
            _error = error;
        }

        expect(_error).toBeDefined();
        expect(_error.message).toEqual(`invalid token`);
    });
});
