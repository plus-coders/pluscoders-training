function searchInYahoo(query, page) {
  if (typeof query !== "string") throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");

  var pageUrl = "&b=";

  var pageRef = (page - 1) * 10 + 1;

  return fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://es.search.yahoo.com/search?p=" +
      query +
      pageUrl +
      pageRef
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      const parser = new DOMParser();

      const doc = parser.parseFromString(html, "text/html");

      const searchResults = [];

      const resultsList = doc.querySelectorAll("#web > ol > li > .dd.algo");

      for (let i = 0; i < resultsList.length; i++) {
        const result = resultsList[i];

        const url = result.querySelector("a").href;

        const title = result.querySelector("h3").innerText;

        const preview = result.querySelector(".compText > p").innerText;

        const searchResult = {
          title: title,
          url: url,
          preview: preview,
        };

        searchResults.push(searchResult);
      }

      return { results: searchResults, page };
    });
}