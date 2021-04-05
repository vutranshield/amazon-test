import HomePage from '../pageobjects/home.page'
import SignIn from '../pageobjects/signin.page'

import { user, invalidEmail } from './signIn.data'
const fs = require('fs');

describe('Sign in to Amazon with no 2SV setup', () => {

    describe('Sign in successfully', () => {
        afterEach('logout', () => {
            HomePage.open().clickSignOutBtn()
        })

        it('should sign in successfully with email', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.normal.email)
                .fillInPassword(user.normal.password)

            expect(HomePage.textGreetings).toHaveText(`Hello, ${user.normal.name}`)
        })

        it('should sign in successfully with mobile phone', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.normal.phoneNumber)
                .fillInPassword(user.password)
            expect(HomePage.textGreetings).toHaveText(`Hello, ${user.normal.name}`)
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
            HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber(user.normal.email).fillInPassword('wrongpass')
            expect(SignIn.authErrorMsgBox).toBeDisplayed()
            expect(SignIn.authErrorMsgBox).toHaveText('Your password is incorrect')
        })

        it('should sign in failed with an empty password input', () => {
            HomePage.open().clickSignInBtn().fillInEmailOrPhoneNumber(user.normal.email).fillInPassword('')
            expect(SignIn.passwordMissingAlert).toBeDisplayed()
            expect(SignIn.passwordMissingAlert).toHaveText('Enter your password')
        })

    })
})

describe.only('Sign in to Amazon with 2SV setup', () => {
    // each test in this suite should be run alone as the OTP limitation
    // Codes may take several minutes to arrive. If you’ve stopped receiving them, you’ve exceeded the daily limit. Please wait and try again tomorrow.

    describe('Sign in successfully', () => {
        afterEach('logout', () => {
            HomePage.open().clickSignOutBtn()
        })

        it('should sign in successfully with email and valid OTP', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.otp.email)
                .fillInPassword(user.otp.password)
                .selectOtpDevice("SMS")

            const fileContent = fs.readFileSync('otp/sms.json', 'utf8');
            const data = JSON.parse(fileContent);
            let otp = data.Body.split(' ')[0];
            SignIn.fillInOtp(otp);

            expect(HomePage.textGreetings).toHaveText(`Hello, ${user.otp.name}`)
        })
    })

    describe.skip('Sign in unsuccessfully', () => {
        it('should sign in failed with wrong OTP', () => {
            HomePage
                .open()
                .clickSignInBtn()
                .fillInEmailOrPhoneNumber(user.otp.email)
                .fillInPassword(user.otp.password)
                .selectOtpDevice("SMS")
                .fillInOtp('000000')
            expect(SignIn.authErrorMsgBox).toBeDisplayed()
            expect(SignIn.authErrorMsgBox).toHaveText('The One Time Password (OTP) you entered is not valid. Please try again.')
        })
    })
})

