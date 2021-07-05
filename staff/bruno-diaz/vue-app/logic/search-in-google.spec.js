describe('searchInGoogle', () => {
    it('should succeed when query matches results in Google', async () => {
        const queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']

        const query = queries[Math.floor(Math.random() * queries.length)]

        const page = Math.floor(Math.random() * 4 + 1)

        const { results, page: pageBack } = await searchInGoogle(query, page) 

        expect(results.length).toBeGreaterThan(0)

        results.forEach( object => {
            expect(typeof object.title).toEqual('string')
            expect(typeof object.url).toEqual('string')
            expect(typeof object.preview).toEqual('string')
        })

        expect(pageBack).toEqual(page)
    })

    it('should fail when query does not match any result in Google', async () => {
        const query = getRandomString() + getRandomString() + getRandomString()

        const page = Math.floor(Math.random() * 4 + 1)

        const { results, page: pageBack } = await searchInGoogle(query, page)

        expect(results.length).toEqual(0)

        results.forEach( object => {
            expect(typeof object.title).toEqual('undefined')
            expect(typeof object.url).toEqual('undefined')
            expect(typeof object.preview).toEqual('undefined')
        })

        expect(pageBack).toEqual(page)
    })
    
    it('should fail when query is not a string', () => {
        const queries = [true, 1, {}, function() {}, []]
        const query = queries[Math.floor(Math.random() * queries.length)]

        const page = Math.floor(Math.random() * 4 + 1)

        expect(() => {
            searchInGoogle(query, page, undefined);
        }).toThrowError(TypeError, query + ' is not a string')
    })

    it('should fail when page page is not a number', () => {
        const queries = ['Rock', 'Paper', 'Scissor', 'support', 'aluminium', 'extend', 'annual', 'formal', 'arrogant', 'limit', 'jealous', 'recommendation', 'budget', 'reliable', 'unity', 'sigh', 'glide', 'transition', 'skilled', 'illusion', 'tribute', 'belief', 'introduce', 'golf', 'circulate', 'vat', 'attachment', 'diameter', 'trip', 'tragedy', 'rob', 'virus', 'orbit', 'admiration', 'satellite', 'bake', 'appetite', 'owe', 'loot', 'shareholder', 'seller', 'cold', 'theorist', 'apparatus', 'guerrilla', 'smart', 'willpower', 'sector', 'safari', 'palace', 'hut', 'goalkeeper', 'harbor', 'profile', 'confession', 'mature', 'public', 'duck', 'husband', 'hierarchy', 'float', 'topple', 'asylum', 'scream', 'sound', 'harvest', 'favorable', 'skilled', 'illustrate', 'method', 'pick', 'fear', 'sun', 'plant', 'cause', 'railcar', 'steel', 'certain', 'ballot', 'stroll', 'paper', 'archive', 'guilt', 'sulphur', 'horn', 'challenge', 'meet', 'beam', 'environment', 'cry', 'path', 'calorie', 'gift', 'celebration', 'captain', 'inappropriate', 'sight', 'composer', 'shift', 'AIDS', 'theater', 'proportion', 'ward']
        const query = queries[Math.floor(Math.random() * queries.length)]

        const pages = [true, '', {}, function() {}, []]
        const page = pages[Math.floor(Math.random() * pages.length)]

        expect(() => {
            searchInGoogle(query, page, () => {});
        }).toThrowError(TypeError, page + ' is not a number')
    })
})