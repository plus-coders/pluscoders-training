class EditProfile extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="tabsElement switchButtons">
                <tab-element text="Information"></tab-element>
                <tab-element text="Password"></tab-element>
                <tab-element text="Account"></tab-element>
            </div>

            <div class="accessPanel__form">
                <span class="form__feedback"></span>

                <form id="informationForm" class="form">
                    <input-form label='Full name' type='text' name='fullname'></input-form>
                    <input-form label='E-mail' type='email' name='email'></input-form>
                    
                    <button id="infoSubmit" class="form__button form__button--submit" type="submit">Save information</button>
                </form>

                <form id="passwordForm" class="form">
                    <input-form label="Password" type="password" name="password"></input-form>
                    <input-form label='New password' type='password' name='newpassword'></input-form>

                    <button id="passwordSubmit" class="form__button form__button--submit" type="submit">Save new password</button>
                </form>

                <form id="accountForm" class="form">
                    <input-form label="Password" type="password" name="password"></input-form>

                    <button id="loginSubmit" class="form__button form__button--delete" type="submit">Delete account</button>
                </form>
            </div>`

        var tabs = this.querySelectorAll('tab-element')
        var forms = this.querySelectorAll('.form')

        for (var i = 0; i < tabs.length; i++) {
            forms[i].style.display = 'none'
            forms[i].onsubmit = function (event) {
                this.onSubmit(event)
            }.bind(this)
        }

        tabs[0].querySelector('.switchButtons__link').classList.add('switchButtons__link--active')
        forms[0].style.display = 'flex'

        for (var i = 0; i < tabs.length; i++) {             
            tabs[i].addEventListener('click', function(event) {
                this.querySelector('.switchButtons__link--active').classList.remove('switchButtons__link--active')

                var formFeedback = this.querySelector('.form__feedback')

                if (formFeedback)
                    formFeedback.style.display = 'none'
            
                for (var i = 0; i < forms.length; i++) 
                    forms[i].style.display = 'none'
    
                if (event.target.id === 'informationTab')
                    var form = document.getElementById('informationForm')
                else if (event.target.id === 'passwordTab')
                    var form = document.getElementById('passwordForm')
                else if (event.target.id === 'accountTab')
                    var form = document.getElementById('accountForm')
    
                form.style.display = 'flex'
            }.bind(this), true)
        }  
    }
}
customElements.define('edit-profile', EditProfile)