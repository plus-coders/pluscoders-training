function updateUser(type, dataOne, dataTwo, callback) {
  var bodyContent
  switch (type) {
    case 'info':
      bodyContent = '{ "fullname" : "' + dataOne + '", "username": "' + dataTwo + '" }'
      break
    case 'password':
      bodyContent = '{ "oldPassword" : "' + dataOne + '", "password": "' + dataTwo + '" }'
      break
  }

  fetch("https://b00tc4mp.herokuapp.com/api/v2/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE, PATCH",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "3600",
      "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
      "Authorization": "Bearer " + sessionStorage.token,
    },
    body: bodyContent,
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