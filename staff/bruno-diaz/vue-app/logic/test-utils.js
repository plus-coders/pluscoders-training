function getRandomString(type) {
    var length = Math.floor(Math.random() * 5) + 5
    var characters = 'abcdefghijklmnopqrstuvwxyz'
    var charactersUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var charactersNumbers = '0123456789'
    var charactersSpecial = '!"#$%&()*+,.;:-_/<>=?[]\|^~{}'

    var random = ''

    for ( var i = 0; i < length; i++ )
        random += characters.charAt(Math.floor(Math.random() * characters.length))

    if (type === 'password') {
        for ( var i = 0; i < 1; i++ )
            random += charactersUppercase.charAt(Math.floor(Math.random() * charactersUppercase.length))
        
        for ( var i = 0; i < 1; i++ )
            random += charactersNumbers.charAt(Math.floor(Math.random() * charactersNumbers.length))

        for ( var i = 0; i < 1; i++ )
            random += charactersSpecial.charAt(Math.floor(Math.random() * charactersSpecial.length))
    }

    return random
}