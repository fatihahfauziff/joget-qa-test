describe("The page must load properly", () => {
    beforeEach(() => {
        // root-level hook
        // runs once before all tests
        cy.visit("https://qainterview.on.joget.cloud/jw/web/userview/appcenter/v/_/home")
    })

    it("The loading screen must disappear", () => {
        cy.get(".page-loader")
            .should("exist")
            .and("not.be.visible")
    })
    it("Ensure background image is loaded", () => {
        // Test background image on request
        cy.get("#banner")
            .should("be.visible")
            .then(($el) => {
                const url = $el.css('background-image').match(/url\("(.*)"\)/)[1]
                cy.request({ url, failOnStatusCode: true }).its('status').should('eq', 200)
            })
    })

    it("Navbar should appear correctly", () => {
        cy.get("header.navbar")
            .should("be.visible")
        //App Centre
        cy.get('.menu-link.default')
            .should('have.attr', 'href', `/jw/web/userview/appcenter/v/_/home`)

        //Home
        cy.get('i.fa.fa-home')
            .parent() //Get the parent for Home button
            .should('have.attr', 'href', '/jw/home')

        //Login
        cy.get('i.fa.fa-user.white')
            .parent() //Get the parent for the User button
            .should('have.attr', 'href', '/jw/web/ulogin/appcenter/v/_/home')
    })

    it("Title text should appear correctly", () => {
        // Default Cypress viewport is 1000x660. Therefore, the test below will fail.KIV

        cy.get("#brand_logo img")
            .should("be.visible")

        cy.get("#clock")
            .should("be.visible")

        cy.get('h1')
            .invoke('text')
            .should('contain', 'Faster, Simpler Digital Transformation');
    })

    it("Search bar should be working", () => {
        cy.get('.filterinput')
            .should("be.visible")
            .and("not.disabled")
        // cy.get('input.filterinput').type('Asset').then(($test)=>{
        //     cy.get('.userview-name').should('contain',"Customer Relationship Management").and("be.visible")
        // })
        // cy.get('.userview-name').should('contain',"Customer Relationship Management").and("be.visible")
    })

    it("Ensure all apps is displayed correctly", () => {
        // There should be 13 apps
        cy.get('ul#apps li')
            .not('.grid-dummy-fix')
            .its('length')
            .should('eq', 13)

        cy.get('.userview-icon')
            .should('be.visible')
            .each(($el) =>{
                cy.wrap($el).then(($span) =>{
                    const url = $span.css('background-image').match(/url\("(.*)"\)/)[1]
                    cy.request({ url, failOnStatusCode: true }).its('status').should('eq', 200)
                })
            })
        cy.get('.userview-name')
            .invoke('text')
            .its('length')
            .should('be.gt', 0)

        cy.get('.app-name')
            .invoke('text')
            .its('length')
            .should('be.gt', 0)

    })
    it("Footer must be visible and display correct text", () => {
        // 
        cy.get('footer')
            .should('be.visible')
            .and('contain', 'Powered by Joget')
            .and('have.css', 'background-color')
            .should('eq', 'rgb(221, 221, 221)')
    })
})