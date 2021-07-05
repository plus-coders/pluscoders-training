function searchInBing(query, page) {
  if (typeof query !== "string")
    throw new TypeError(query + " is not a string");
  if (typeof page !== "number") throw new TypeError(page + " is not a number");

  const pageUrl = "&b=";

  let pageRef;

  if (page === 1) pageRef = 0;
  else pageRef = 5 + (page - 2) * 10;

  return fetch(
    "https://b00tc4mp.herokuapp.com/proxy?url=https://www.bing.com/search?q=" +
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

      const resultsList = doc.querySelectorAll("#b_results > .b_algo");

      for (let i = 0; i < resultsList.length; i++) {
        const result = resultsList[i];

        const url = result.querySelector("h2 > a").href;

        const title = result.querySelector("h2 > a").innerText;

        // const preview = result.querySelector(".b_caption > p").innerText
        const preview = "No info preview"

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