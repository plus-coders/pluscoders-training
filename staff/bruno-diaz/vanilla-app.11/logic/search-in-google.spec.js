describe('searchInGoogle', function () {
    it('should succeed on valid instance datas in Google', function (done) {
        var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
        var query = queries[Math.floor(Math.random() * queries.length)]

        var page = Math.floor(Math.random() * 4 + 1)

        // APPLY

        var results = []
        results.length = 0

        var pageBack

        searchInGoogle(query, page, function(searchResults, page) {
            pageBack = page

            searchResults.forEach( function(element) {
                var result = {}
                result = element
                results.push(result)
            });

            // TEST

            expect(results.length).toBeGreaterThan(0)

            results.forEach( function(object) {
                expect(typeof object.title).toEqual('string')
                expect(typeof object.url).toEqual('string')
                expect(typeof object.preview).toEqual('string')
            })

            expect(pageBack).toEqual(page)
            
            // ASYNC callback
            done()
        })
    })

    it('should fail on query does not get result in Google', function (done) {
        var query = randomString() + randomString() + randomString()

        var page = Math.floor(Math.random() * 4 + 1)

        // APPLY

        var results = []
        results.length = 0

        var pageBack

        searchInGoogle(query, page, function(searchResults, page) {
            pageBack = page

            searchResults.forEach( function(object) {
                var result = {}
                result = object
                results.push(result)
            });

            // TEST

            expect(results.length).toEqual(0)

            results.forEach( function(object) {
                expect(typeof object.title).toEqual('undefined')
                expect(typeof object.url).toEqual('undefined')
                expect(typeof object.preview).toEqual('undefined')
            })

            expect(pageBack).toEqual(page)
            
            // ASYNC callback
            done()
        })
    })

    it('should fail on page data is not a number in Google', function () {
        var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
        var query = queries[Math.floor(Math.random() * queries.length)]

        var page

        // APPLY

        var results = []
        results.length = 0

        var pageBack

        expect(function() {
            searchInGoogle(query, page, function() {});
        }).toThrowError(TypeError, page + ' is not a number')
    })

    it('should fail on callback is not a function in Google', function () {
        var queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
        var query = queries[Math.floor(Math.random() * queries.length)]

        var page = Math.floor(Math.random() * 4 + 1)

        // APPLY

        var results = []
        results.length = 0

        var pageBack

        expect(function() {
            searchInGoogle(query, page, undefined);
        }).toThrowError(TypeError, undefined + ' is not a function')
    })
})