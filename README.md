# Amazon E2E Test Automation

This repository is for automating some tests that automatically check the sign in function on https://amazon.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

What things you need to install the software and how to install them
- NodeJS

By this command, please check if `nodejs` has been installed on your local machine:
```
$ node -v
// it should return the version of nodejs if any, like this: v14.15.0
```

In case your system has not installed `nodejs` yet, checkout [this link](https://nodejs.org/en/download/releases/) from the official page for downloading. Please be noted that the LTS version is highly recommended.

### Installing

A step by step series of examples that tell you how to get an environment running

Clone or download the repository

```
$ git clone https://github.com/vutranshield/amazon-test.git
```

Then, move to the project folder and install the needed libraries

```
$ cd Amazon
$ npm install
```

*Note*: About package management tool for nodejs, this guide use `npm` to show the example, but of course you could use either `npm` or `yarn`. Feel free with your tool.

### Preparation for OTP tests
In the sign in feature which includes the function that allows user sign in with Two-step verification enabled, it's a little hard to automate this step. I use a third-party service named Twilio and its webhooks mechanism to get the message triggered. All you need to do is run these steps.

- Start the express server:
```sh
$ npm run express
```

- Open another teminal, Log in twilio cli with the information as below
    - Account SID: AC4ba5db6f375489375e51f113d502de4f
    - Auth token: 0de7b061ef6c810ca7a31578c032c8f8
    - Shorthand identifier: sbtest

```sh
$ npx twilio login
You can find your Account SID and Auth Token at https://www.twilio.com/console
 » Your Auth Token will be used once to create an API Key for future CLI access to your Twilio Account or Subaccount, and then forgotten.
? The Account SID for your Twilio Account or Subaccount: AC4ba5db6f375489375e51f113d502de4f
? Your Twilio Auth Token for your Twilio Account or Subaccount: [hidden]
? Shorthand identifier for your profile: sbtest
Created API Key SK6ecdb14434e752dc0238a562f7740c45 and stored the secret in your keychain. See: https://www.twilio.com/console/runtime/api-keys/SK6ecdb14434e752dc0238a562f7740c45
twilio-cli configuration saved to "/Users/v001132/.twilio-cli/config.json"
Saved sbtest.
```

- Start the Twilio phone messaging service by this command
```sh
$ npx twilio phone-numbers:update "+15202241060" --sms-url="http://localhost:1337/sms"
» WARNING: Detected localhost URL.
 » For convenience, we will automatically create an encrypted tunnel using the 3rd-party service https://ngrok.io
 » While running, this will expose your computer to the internet.
 » Please exit this command after testing.
? Do you want to proceed? Yes
twilio-cli configuration saved to "/Users/v001132/.twilio-cli/config.json"
SID                                 Result   SMS URL                          
PNdf993a000d9300d7bcac2b4d3ffaf0bc  Success  https://1c8004f55334.ngrok.io/sms
ngrok is running. Open http://127.0.0.1:4040 to view tunnel activity.
Press CTRL-C to exit.
```

## Tests Execution

You can easily run the Sign In test spec which is placed in test/specs folder by using this command:

```
npx wdio wdio.conf.js --spec test/specs/signIn.spec.js
```

After running, the output console will look something like this:

```
[0-0] RUNNING in chrome - /test/specs/signIn.spec.js
[0-0] PASSED in chrome - /test/specs/signIn.spec.js

 "spec" Reporter:
------------------------------------------------------------------
[chrome 89.0.4389.114 mac os x #0-0] Running: chrome (v89.0.4389.114) on mac os x
[chrome 89.0.4389.114 mac os x #0-0] Session ID: af97a17809a114d45a62c66884d2b1eb
[chrome 89.0.4389.114 mac os x #0-0]
[chrome 89.0.4389.114 mac os x #0-0] » /test/specs/signIn.spec.js
[chrome 89.0.4389.114 mac os x #0-0] Sign in to Amazon with 2SV setup
[chrome 89.0.4389.114 mac os x #0-0]     Sign in successfully
[chrome 89.0.4389.114 mac os x #0-0]        ✓ should sign in successfully with email and valid OTP
[chrome 89.0.4389.114 mac os x #0-0]
[chrome 89.0.4389.114 mac os x #0-0]     Sign in unsuccessfully
[chrome 89.0.4389.114 mac os x #0-0]        - should sign in failed with wrong OTP
[chrome 89.0.4389.114 mac os x #0-0]
[chrome 89.0.4389.114 mac os x #0-0] 1 passing (12.2s)
[chrome 89.0.4389.114 mac os x #0-0] 1 skipped


Spec Files:	 1 passed, 1 total (100% completed) in 00:00:15
```

## Built With

* [webdriverio](https://github.com/webdriverio/webdriverio) - Next-gen browser and mobile automation test framework for Node.js
* [twilio](https://www.npmjs.com/package/twilio) - Node.js helper library for Twilio

## License

This project is licensed under the MIT License.
