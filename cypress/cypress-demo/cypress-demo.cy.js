describe("First Demo", () => {
    it("Image should be visible and loaded", () => {
        cy.visit("https://google.com")
        cy.get('[alt="Paris Games September Conclude"]')
            .should('be.visible')
            .and((img) => {
                expect(img[0].naturalWidth).to.be.greaterThan(0)
            })
    })
    it("All button shall be clickable", () => {
        cy.visit("https://google.com")
        //Google Search
        cy.get('[aria-label="Google Search"]')
            .invoke('attr', 'aria-disabled')
            .then((ariaDisabled) => {
                // Probably helpful to also cy.log() the value
                cy.log(`ariaDisabled is ${ariaDisabled}`);
                if (ariaDisabled !== "true") {
                    cy.log('Button exists and is disabled!')
                    return
                }
                cy.log('Button exists and is enabled!')
                cy.get('[aria-label="Google Search"]').click();
            });
        //I'm Feeling Lucky
        cy.get(`[aria-label="I'm Feeling Lucky"]`)
            .invoke('attr', 'aria-disabled')
            .then((ariaDisabled) => {
                // Probably helpful to also cy.log() the value
                cy.log(`ariaDisabled is ${ariaDisabled}`);
                if (ariaDisabled !== "true") {
                    cy.log('Button exists and is disabled!')
                    return
                }
                cy.log('Button exists and is enabled!')
                cy.get(`[aria-label="I'm Feeling Lucky"]`).click();
            });
    })
})