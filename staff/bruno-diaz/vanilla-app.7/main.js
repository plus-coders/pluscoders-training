function goToAccessControlScreen() {
    var controlAccessPanel = createAccessControlPanel(
        function (fullname, email, password) {
            try {
                registerUser(fullname, email, password, function(feedback) {
                    if (feedback === null) {
                        authenticateUser(email, password, function(feedback, token) {
                            if (feedback === null) {
                                sessionStorage.token = token
    
                                retrieveUser(token, function(feedback, user) {
                                    if (feedback === null) {
                                        goToSessionScreen(user)
                                    } else {
                                        var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                                        feedbackWrapper.innerText = feedback.message
                                        feedbackWrapper.style.display = 'block'
                                    }
                                })
                            } else {
                                var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                                feedbackWrapper.innerText = feedback.message
                                feedbackWrapper.style.display = 'block'
                            }
                        })
                    } else {
                        var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                        feedbackWrapper.innerText = feedback.message
                        feedbackWrapper.style.display = 'block'
                    }
                })
            } catch(error) {
                var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                feedbackWrapper.innerText = error.message
                feedbackWrapper.style.display = 'block'
            }
        }, function (email, password) {
            try {
                authenticateUser(email, password, function(feedback, token) {
                    if (feedback === null) {
                        sessionStorage.token = token
                        
                        retrieveUser(token, function(feedback, user) {
                            if (feedback === null) {
                                goToSessionScreen(user)
                            } else {
                                var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                                feedbackWrapper.innerText = feedback.message
                                feedbackWrapper.style.display = 'block'
                            }
                        })
                    } else {
                        var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                        feedbackWrapper.innerText = feedback.message
                        feedbackWrapper.style.display = 'block'
                    }
                })
            } catch(error) {
                var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                feedbackWrapper.innerText = error.message
                feedbackWrapper.style.display = 'block'
            }
        }, function () {
            document.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')
    
            controlAccessPanel.querySelector('.form__feedback').style.display = 'none'
    
            var forms = document.querySelectorAll('.form')
    
            var links = document.querySelectorAll('.switchButtons__link')
    
            if (forms[1].style.display === 'flex') {
                links[0].classList.add('switchButtons__link--active')
                document.getElementById('registerForm').style.display = 'flex'
                document.getElementById('loginForm').style.display = 'none'
            } else {
                links[1].classList.add('switchButtons__link--active')
                document.getElementById('registerForm').style.display = 'none'
                document.getElementById('loginForm').style.display = 'flex'
            }
        }
    )
    var page = document.getElementById('account')
    if (page) page.remove()

    document.body.append(controlAccessPanel)
}


function goToSessionScreen() {
    retrieveUser(sessionStorage.token, function(feedback, user) {
        if (feedback === null) {
            renderSessionScreen(user)
        } else {
            var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
            feedbackWrapper.innerText = feedback.message
            feedbackWrapper.style.display = 'block'
        }
    })
}

function renderSessionScreen(user) {
    var account = createSession(
        user,
        // openMenuDropdown
        function() {
            var elementOpened = account.querySelector('.acountDropdown__menu--opened')
            var iconOpened =  account.querySelector('.acountDropdown__link > i.fa-angle-down')
            
            if (elementOpened) {
                elementOpened.classList.remove("acountDropdown__menu--opened")
                iconOpened.classList.remove("fa-opened")
            } else {
                account.querySelector('.acountDropdown__menu').classList.add("acountDropdown__menu--opened")
                iconOpened.classList.add("fa-opened")
            }   
        },
        // onEditProfile
        function() {
            var modalEditProfile = createEditProfile(
                user,
                function () {
                    var modal = document.querySelector('.modal')
                    modal.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')
                    modal.querySelector('.form__feedback').style.display = 'none'

                    var links = modal.querySelectorAll('.switchButtons__link')
                    links[0].classList.add('switchButtons__link--active')

                    var forms = modal.querySelectorAll('.form')
                    forms[0].style.display = 'flex'
                    forms[1].style.display = 'none'
                    forms[2].style.display = 'none'
                },
                function () {
                    var modal = document.querySelector('.modal')
                    modal.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')
                    modal.querySelector('.form__feedback').style.display = 'none'

                    var links = modal.querySelectorAll('.switchButtons__link')
                    links[1].classList.add('switchButtons__link--active')

                    var forms = modal.querySelectorAll('.form')
                    forms[0].style.display = 'none'
                    forms[1].style.display = 'flex'
                    forms[2].style.display = 'none'
                    
                },
                function () {
                    var modal = document.querySelector('.modal')
                    modal.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')
                    modal.querySelector('.form__feedback').style.display = 'none'

                    var links = modal.querySelectorAll('.switchButtons__link')
                    links[2].classList.add('switchButtons__link--active')
                    
                    var forms = modal.querySelectorAll('.form')
                    forms[0].style.display = 'none'
                    forms[1].style.display = 'none'
                    forms[2].style.display = 'flex'
                    
                },
                function closeModal(wrapper) {
                    wrapper.remove()
                },
                function(type, dataOne, dataTwo) {
                    //TODO separar updateUserInfo y updateUserPassword
                    updateUser(type, dataOne, dataTwo, function(feedback) {
                        if (feedback === null) {
                            // TODO bring styles to css
                            var feedbackWrapper = modalEditProfile.querySelector('.form')
                            feedbackWrapper.innerText = 'Data update'
                            feedbackWrapper.style.color = 'white'
                            feedbackWrapper.style.backgroundColor = 'green'
                            feedbackWrapper.style.width = '50%'
                            feedbackWrapper.style.heigth = '239px'
                            feedbackWrapper.style.margin = '0 auto'
                            feedbackWrapper.style.padding = '24px'

                            setTimeout(function() {
                                var modal = document.querySelector(".modal--editProfile")

                                modal.remove()
                                //TODO no recargar el DOM, innerText to name in header

                            },2000)
                        } else {
                            var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                            feedbackWrapper.innerText = feedback.message
                            feedbackWrapper.style.display = 'block'
                        }
                    })
                },
                function(password) {
                    unregisterUser(password, function(feedback) {
                        if (feedback === null) {
                            sessionStorage.clear()
                            var page = document.getElementById('backofficeAccess')
                            if (page) page.remove()
                                document.body.append(account)
                            goToAccessControlScreen()
                        } else {
                            var feedbackWrapper = controlAccessPanel.querySelector('.form__feedback')
                            feedbackWrapper.innerText = feedback.message
                            feedbackWrapper.style.display = 'block'
                        }
                    })
                }
            )
            document.body.append(modalEditProfile)
        },
        // onLogout
        function() { 
            sessionStorage.removeItem("token")

            init()
        },
        // onSearch
        function searchByQuery(searcher, query, page) {
            
                setLoading('start')

                if (!page) page = 1

                // TODO move to component
                if (!account.querySelector('.searchComponent--used'))
                    account.getElementById('searchComponent').classList.add('searchComponent--used')

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
    var page = document.getElementById('backofficeAccess')
    if (page) page.remove()
        document.body.append(account)
}



function init() {
    if (sessionStorage.token)
        goToSessionScreen()
    else
        goToAccessControlScreen()
}

init()