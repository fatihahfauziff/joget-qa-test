/// <reference types="Cypress" />

describe("User must be able to login and submit the required form", () => {
  Cypress.session.clearAllSavedSessions()
  Cypress.Commands.add('login', (j_username, j_password, csrfToken) => {
    cy.request({
      method: 'POST',
      url: '/jw/j_spring_security_check',
      failOnStatusCode: false, // dont fail so we can make assertions
      form: true, // we are submitting a regular form body
      body: {
        j_username,
        j_password,
        submit: 'Login',
        OWASP_CSRFTOKEN: csrfToken,
      },
    }).then(res => {
      // Login success
      expect(res.status).to.be.eq(200)
      cy.visit('https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/home')
      // User signed in
      cy.get('.mm-profile.user-link.type-no .login_link').should('not.exist')
    })
  })
  beforeEach(() => {
    cy.session('Login', () => {
      cy.visit("https://qainterview.on.joget.cloud/jw/web/userview/isr/isr/_/home")
      cy.get('li.mm-profile.user-link.type-no a').should('be.visible').click()

      const username = 'cat'
      const password = 'password'

      cy.window().then(window => {
        // Get CSRF token from script
        const csrf = window.ConnectionManager.tokenValue
        cy.login(username, password, csrf)
      })
    })
  })
  it("Form must not be submitted if there are empty fields", () => {
    cy.visit('https://qainterview.cloud.joget.com/jw/web/userview/isr/isr/_/new_request')
    cy.get('form#isr_new_request').within(() => {
      // Submit empty form
      cy.get('input#assignmentComplete').click()
    })
    // Validation Error message should exist and visible
    cy.get('.form-errors').should('exist').and('be.visible')
    cy.get('.form-error-message').should('exist').and('be.visible')
  })
  it("Form must be submitted when required fields are filled in", () => {
    cy.visit('https://qainterview.cloud.joget.com/jw/web/userview/isr/isr/_/new_request')
    
    const subject = 'Fatihah Fauzi 2'
    const description = 'Description'

    cy.get('.page-loader').should('not.be.visible')
    cy.get('input#subject').should('be.enabled').type(subject)
    cy.get('textarea#description').should('be.enabled').type(description)
    cy.get('input[name=duedate]').should('be.enabled').click()
    // cy.get('div#ui-datepicker-div').should('be.visible')
    cy.get('table.ui-datepicker-calendar td.ui-datepicker-today').then($today => {
      const year = $today.attr('data-year')
      const month = $today.attr('data-month')
      const day = $today.children().first().attr('data-date')
      const nextWeek = new Date(year, month, parseInt(day) + 7)

      cy.get(`table.ui-datepicker-calendar td[data-year=${nextWeek.getFullYear()}][data-month=${nextWeek.getMonth()}] a[data-date=${nextWeek.getDate()}]`).click()
      cy.get('input#attachment1').selectFile({ contents: 'hello.txt' }, { force: true })
      cy.get('form#isr_new_request').within(() => {
        cy.get('input#assignmentComplete').click()
      })
      cy.get('.column_body.column_subject.body_column_1').should('contain', subject)
    })

  })
})