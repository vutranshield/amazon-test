import HomePage from './home.page'

class SignInPage {
    get inputEmail() {
        return $('input#ap_email')
    }

    get inputPassword() {
        return $('input#ap_password')
    }

    get btnContinue() {
        return $('#continue')
    }

    get btnSignIn() {
        return $('#signInSubmit')
    }

    get authErrorMsgBox() {
        return $('#auth-error-message-box .a-list-item')
    }

    get emailMissingAlert() {
        return $('#auth-email-missing-alert')
    }

    get passwordMissingAlert() {
        return $('#auth-password-missing-alert')
    }

    fillInEmailOrPhoneNumber(credential) {
        this.inputEmail.setValue(credential)
        this.btnContinue.click()
        return this
    }

    fillInPassword(passwd) {
        this.inputPassword.setValue(passwd)
        this.btnSignIn.click()
        return HomePage
    }
}

export default new SignInPage()
