function authenticateUser(email, password) {
  if (typeof email !== "string")
    throw new TypeError(email + " is not a string");
  if (typeof password !== "string")
    throw new TypeError(password + " is not a string");

  var regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regexEmail.test(String(email).toLowerCase()))
    throw new Error(email + " is not an e-mail");

  return fetch("https://b00tc4mp.herokuapp.com/api/v2/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{ "username" : "' + email + '", "password": "' + password + '" }',
  }).then(response => {
      return response.json().then(response => {
        if (!response.token) throw new Error(response.error)
        return response.token
      });
  });
}
