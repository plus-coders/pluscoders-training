function registerUser(fullname, email, password) {
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
    throw new Error("The password have to contain between 8 to 13 characters which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");

  var exists = users.some(function (user) {
    return user.email === email;
  });

  if (exists) throw new Error("user already exists");

  var user = { fullname: fullname, email: email, password: password };

  users.push(user);
}

function authenticateUser(email, password) {
  if (typeof email !== "string")
    throw new TypeError(email + " is not a string");
  if (typeof password !== "string")
    throw new TypeError(password + " is not a string");

  var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regexEmail.test(String(email).toLowerCase()))
    throw new Error(email + " is not an e-mail");

  var user = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (!user) throw new Error("There is no registered user with those credentials");
}

function searchInAll(query, page, callback) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number")
    throw new TypeError(page + " is not a number");
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
  if (typeof page !== "number")
    throw new TypeError(page + " is not a number");
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

        var preview = result.querySelector("span.aCOpRe > span:last-of-type").innerText;

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
  if (typeof page !== "number")
    throw new TypeError(page + " is not a number");
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
  if (typeof page !== "number")
    throw new TypeError(page + " is not a number");
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