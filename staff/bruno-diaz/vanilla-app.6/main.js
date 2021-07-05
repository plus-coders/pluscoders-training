var user = {}


var backofficeForm = createBackofficeForm(
    function (fullname, email, password) {
        try {
            registerUser(fullname, email, password, function(feedback) {
                if (feedback === null) {
                    backofficeForm.style.display = 'none'
                    welcome.style.display = 'block'
                    editProfile.style.display = 'none'
                } else {
                    var feedbackWrapper = backofficeForm.querySelector('.backofficeForm__feedback')
                    feedbackWrapper.innerText = feedback.message
                    feedbackWrapper.style.display = 'block'
                }
            })
        } catch(error) {
            var feedbackWrapper = backofficeForm.querySelector('.backofficeForm__feedback')
            feedbackWrapper.innerText = error.message
            feedbackWrapper.style.display = 'block'
        }
    }, function (email, password) {
        try {
            authenticateUser(email, password, function(feedback, token) {
                if (feedback === null) {
                    user.token = token
                    retrieveUser(token)

                    backofficeForm.style.display = 'none'
                    welcome.style.display = 'block'
                    editProfile.style.display = 'none'
                } else {
                    var feedbackWrapper = backofficeForm.querySelector('.backofficeForm__feedback')
                    feedbackWrapper.innerText = feedback.message
                    feedbackWrapper.style.display = 'block'
                }
            })
        } catch(error) {
            var feedbackWrapper = backofficeForm.querySelector('.backofficeForm__feedback')
            feedbackWrapper.innerText = error.message
            feedbackWrapper.style.display = 'block'
        }
    }, function () {
        var optionLinkActive = document.querySelector('.backofficeForm__link--active')
        optionLinkActive.classList.remove('backofficeForm__link--active')

        backofficeForm.querySelector('.backofficeForm__feedback').style.display = 'none'

        var forms = document.querySelectorAll('.backofficeForm__form')

        var links = document.querySelectorAll('.backofficeForm__link')

        if (forms[1].style.display === 'flex') {
            links[0].classList.add('backofficeForm__link--active')
            document.getElementById('registerForm').style.display = 'flex'
            document.getElementById('loginForm').style.display = 'none'
            document.querySelector('.backofficeForm__submit').innerText = 'Register'
        } else {
            links[1].classList.add('backofficeForm__link--active')
            document.getElementById('registerForm').style.display = 'none'
            document.getElementById('loginForm').style.display = 'flex'
            document.querySelector('.backofficeForm__submit').innerText = 'Log in'
        }
    }
)
document.body.append(backofficeForm)
// backofficeForm.style.display = 'none'



var welcome = createWelcome(
    function() { 
        backofficeForm.style.display = 'none'
        welcome.style.display = 'none'
        editProfile.style.display = 'block'
    },
    function() { 
        backofficeForm.style.display = 'block'
        welcome.style.display = 'none'
        editProfile.style.display = 'none'
    },
    function searchByQuery(searcher, query, page) {
        
            setLoading('start')

            if (!page) page = 1

            // TODO move to component
            if (!document.querySelector('.searchComponent--used'))
                document.getElementById('searchComponent').classList.add('searchComponent--used')

            switch (searcher) {
                case 'google':
                    searchInGoogle(query, page, function(searchResults, page) {
                        setLoading('stop')
                        createResults(searchResults, page, function(page) {
                            searchByQuery(searcher, query, page)
                        })
                    })
                    break
                case 'yahoo':
                    searchInYahoo(query, page, function(searchResults, page) {
                        setLoading('stop')
                        createResults(searchResults, page, function(page) {
                            searchByQuery(searcher, query, page)
                        })
                    })
                    break
                case 'bing':
                    searchInBing(query, page, function(searchResults, page) {
                        setLoading('stop')
                        createResults(searchResults, page, function(page) {
                            searchByQuery(searcher, query, page)
                        })
                    })
                    break
                default:
                    searchInAll(query, page, function(searchResults, page) {
                        setLoading('stop')
                        createResults(searchResults, page, function(page) {
                            searchByQuery(searcher, query, page)
                        })
                    })
                    break
            }
    }
)
welcome.style.display = 'none'
// welcome.style.display = 'block'
document.body.append(welcome)



var editProfile = createEditProfile(
    function() {
        backofficeForm.style.display = 'none'
        welcome.style.display = 'none'
        editProfile.style.display = 'block'
    }
)
editProfile.style.display = 'none'
document.body.append(editProfile)






funcition onEditProfile() {
    
}