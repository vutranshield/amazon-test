import HomePage from '../pageobjects/home.page'
import SignIn from '../pageobjects/signin.page'

import { user, invalidEmail } from './signIn.data'

describe('Sign in to Amazon with no 2FA setup', () => {

    describe('Sign in successfully', () => {
        afterEach('logout', () => {
            HomePage.open().clickSignOutBtn()
        })

        it('should sign in successfully with email', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.email)
                .fillInPassword(user.password)

            expect(HomePage.textGreetings).toHaveText(`Hello, ${user.name}`)
        })

        it('should sign in successfully with mobile phone', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.phoneNumber)
                .fillInPassword(user.password)
            expect(HomePage.textGreetings).toHaveText(`Hello, ${user.name}`)
        })
    })

    describe('Sign in unsuccessfully', () => {
        invalidEmail.forEach(input => {
            it(`should sign in failed with invalid email: "${input}"`, () => {
                HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber(input)
                expect(SignIn.authErrorMsgBox).toBeDisplayed()
            })
        })

        it('should sign in failed with an empty email input', () => {
            HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber('')
            expect(SignIn.emailMissingAlert).toBeDisplayed()
            expect(SignIn.emailMissingAlert).toHaveText('Enter your email or mobile phone number')
        })

        it('should sign in failed with wrong password', () => {
            HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber(user.email).fillInPassword('wrongpass')
            expect(SignIn.authErrorMsgBox).toBeDisplayed()
            expect(SignIn.authErrorMsgBox).toHaveText('Your password is incorrect')
        })

        it('should sign in failed with an empty password input', () => {
            HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber(user.email).fillInPassword('')
            expect(SignIn.passwordMissingAlert).toBeDisplayed()
            expect(SignIn.passwordMissingAlert).toHaveText('Enter your password')
        })

    })
})
