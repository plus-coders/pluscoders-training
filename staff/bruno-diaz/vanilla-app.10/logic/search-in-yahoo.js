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