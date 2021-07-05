function searchInGoogle(query, page) {
  if (typeof query !== "string") throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");

  const pageUrl = "&start=";

  const pageRef = (page - 1) * 10;

  return fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://www.google.com/search?q=" +
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

      const resultsList = doc.querySelectorAll("div#rso > div:not(.ULSxyf)");

      for (let i = 0; i < resultsList.length; i++) {
        const result = resultsList[i];

        const url = result.querySelector("a").href;

        const title = result.querySelector("h3").innerText;

        let preview = result.querySelector("div.IsZvec span") ? result.querySelector("div.IsZvec span").innerText : "No info preview";

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