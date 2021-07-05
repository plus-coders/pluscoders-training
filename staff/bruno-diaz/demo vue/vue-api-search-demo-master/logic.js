function searchVehicles(query, callback) {
    fetch('https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=' + query)
        .then(function(response) {
            return response.json()
        })
        .then(function(vehicles) {
            callback(null, vehicles)
        })
        .catch(function(error) {
            callback(error)
        })
}