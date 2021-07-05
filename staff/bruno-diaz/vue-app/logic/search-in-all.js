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