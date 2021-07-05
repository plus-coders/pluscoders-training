function retrieveUser(token, callback) {
  fetch("https://b00tc4mp.herokuapp.com/api/v2/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  }).then(function (response) {
    if (response.status === 200)
      return response.json().then(function (user) {
        callback(null, user);
      });
    else
      return response.json().then(function (response) {
        var error = response.error;

        callback(new Error(error));
      });
  });
}