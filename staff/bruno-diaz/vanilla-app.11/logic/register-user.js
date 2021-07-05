function registerUser(fullname, email, password, callback) {
    if (typeof fullname !== "string")
      throw new TypeError(fullname + " is not a string");
    if (typeof email !== "string")
      throw new TypeError(email + " is not a string");
    if (typeof password !== "string")
      throw new TypeError(password + " is not a string");
  
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!regexEmail.test(String(email).toLowerCase()))
      throw new Error(email + " is not an e-mail");
  
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,13}$/;
  
    if (!regexPassword.test(String(password)))
      throw new Error(
        "The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
  
    fetch("https://b00tc4mp.herokuapp.com/api/v2/users/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body:
        '{ "fullname": "' +
        fullname +
        '", "username": "' +
        email +
        '", "password": "' +
        password +
        '" }',
    }).then(function (response) {
      if (response.status === 201) callback(null);
      else
        return response.json().then(function (response) {
          var error = response.error;
  
          callback(new Error(error));
        });
    });
}