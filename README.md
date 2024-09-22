# Joget QA Test

## Instruction

For Question 1 - 3, the source code will be in `cypress/e2e/joget-cypress`
For Question 4 - 6, it will be in `joget-js`

## Question 7

1. How do you install Cypress and set up your first test?
I initialized `package.json` using `npm init` and installed Cypress through `npm`. I setup the first test using the Cypress App/Test Runner and picked `E2E Testing` when configuring the setup. 

2. How do you handle authentication and authorization in Cypress tests?
Using Question 3 as an example, I used `cy.request()` command to make a login request. I also used `window` object in order to obtain CSRF token since I was unable to obtain it through HTML parsing - the token somehow does not appear in Cypress tests. On top of that, I used `cy.session()` in order to preserve the Login session since Cypress does not store cookies and sessions by default. Lastly, I included the entire login process into `beforeEach()` to ensure each test will simulate authenticated and authorized user.

3. What is the role of the Cypress Test Runner and what features does it offer?
Cypress Test Runner is a desktop GUI to configure and run tests. It contains a dashboard where you can view your specs and runs, realtime debugging and logging, all in one place and can be conveniently viewed through the interface.

4. How do you integrate Cypress into a Continuous Integration (CI) pipeline?
Cypress provide a CLI command to run it in Headless mode. In Gitlab Pipelines for example, we can run Cypress test by providing the CLI command `npm run cy:run` into the pipeline config file during the Test stage after finishing the Build stage.

5. How do you handle dynamic data and input fields in Cypress tests?
Dynamic data and input fields are handle through Cypress function `type()` for textfields and a series of `click()`s for datepicker
6. How do you add dependency to Cypress?
