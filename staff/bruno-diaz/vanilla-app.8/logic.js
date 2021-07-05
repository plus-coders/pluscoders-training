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

function authenticateUser(email, password, callback) {
  if (typeof email !== "string")
    throw new TypeError(email + " is not a string");
  if (typeof password !== "string")
    throw new TypeError(password + " is not a string");

  var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regexEmail.test(String(email).toLowerCase()))
    throw new Error(email + " is not an e-mail");

  fetch("https://b00tc4mp.herokuapp.com/api/v2/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{ "username" : "' + email + '", "password": "' + password + '" }',
  }).then(function (response) {
    if (response.status === 200)
      return response.json().then(function (response) {
        var token = response.token;

        callback(null, token);
      });
    else
      return response.json().then(function (response) {
        var error = response.error;

        callback(new Error(error));
      });
  });
}

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

function searchInAll(query, page, callback) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  var counter = 0;
  var all = [];
  var handleResults = function (results) {
    counter++;

    results.forEach(function (result) {
      all.push(result);
    });

    if (counter === 3) callback(all, page);
  };

  searchInGoogle(query, page, handleResults);

  searchInYahoo(query, page, handleResults);

  searchInBing(query, page, handleResults);
}

function searchInGoogle(query, page, callback) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  var pageUrl = "&start=";

  var pageRef = (page - 1) * 10;

  fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://www.google.com/search?q=" +
      query +
      pageUrl +
      pageRef
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();

      var doc = parser.parseFromString(html, "text/html");

      var searchResults = [];

      var resultsList = [];

      resultsList = doc.querySelectorAll(".hlcw0c > .g");

      for (var i = 0; i < resultsList.length; i++) {
        var result = resultsList[i];

        var url = result.querySelector("a").href;

        var title = result.querySelector("h3").innerText;

        var preview = result.querySelector("span.aCOpRe > span:last-of-type")
          .innerText;

        var searchResult = {
          title: title,
          url: url,
          preview: preview,
        };

        searchResults.push(searchResult);
      }

      callback(searchResults, page);
    });
}

function searchInYahoo(query, page, callback) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  var pageUrl = "&b=";

  var pageRef = (page - 1) * 10 + 1;

  fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://es.search.yahoo.com/search?p=" +
      query +
      pageUrl +
      pageRef
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();

      var doc = parser.parseFromString(html, "text/html");

      var searchResults = [];

      var resultsList = [];

      resultsList = doc.querySelectorAll("#web > ol > li > .dd.algo");

      for (var i = 0; i < resultsList.length; i++) {
        var result = resultsList[i];

        var url = result.querySelector("a").href;

        var title = result.querySelector("h3").innerText;

        var preview = result.querySelector(".compText > p").innerText;

        var searchResult = {
          title: title,
          url: url,
          preview: preview,
        };

        searchResults.push(searchResult);
      }

      callback(searchResults, page);
    });
}

function searchInBing(query, page, callback) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  var pageUrl = "&b=";

  var pageRef;
  if (page === 1) pageRef = 0;
  else pageRef = 5 + (page - 2) * 10;

  fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://www.bing.com/search?q=" +
      query +
      pageUrl +
      pageRef
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();

      var doc = parser.parseFromString(html, "text/html");

      var searchResults = [];

      var resultsList = [];

      resultsList = doc.querySelectorAll(".b_algo");

      for (var i = 0; i < resultsList.length; i++) {
        var result = resultsList[i];

        var url = result.querySelector("h2 > a").href;

        var title = result.querySelector("h2").innerText;

        var preview = result.querySelector(".b_caption > p").innerText;

        var searchResult = {
          title: title,
          url: url,
          preview: preview,
        };

        searchResults.push(searchResult);
      }

      callback(searchResults, page);
    });
}
