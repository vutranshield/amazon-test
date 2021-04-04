import SignInPage from './signin.page'

class HomePage {
    get btnSignIn() {
        return $('#nav-link-accountList')
    }

    get btnSignOut() {
        return $('//span[text()="Sign Out"]')
    }

    get textGreetings() {
        return $('#nav-link-accountList-nav-line-1')
    }

    open() {
        browser.url('/')
        return this
    }

    clickSignInBtn() {
        this.btnSignIn.click()
        return SignInPage
    }

    clickSignOutBtn() {
        $('#nav-link-accountList').moveTo()
        this.btnSignOut.click()
        return SignInPage
    }
}

export default new HomePage()
