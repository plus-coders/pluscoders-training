function unregisterUser(password, callback) {
  fetch("https://b00tc4mp.herokuapp.com/api/v2/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.token
    },
    body: '{ "password": "' + password + '" }',
  }).then(function (response) {
    if (response.status === 204)
      callback(null)
    else
      return response.json().then(function (response) {
        var error = response.error;

        callback(new Error(error));
      });
  });
}