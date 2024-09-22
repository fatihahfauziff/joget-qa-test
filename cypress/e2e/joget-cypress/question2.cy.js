describe("User can navigate to different page within joget.com", () => {
    beforeEach(() => {
        // root-level hook
        // runs once before all tests
        cy.visit("https://www.joget.com/")
    })

    it("Ensure user can navigate to all links", () => {
        cy.get('a[target="_blank"]') // Select anchor with 'target' property with '_blank' as value
            .filter(':visible') // Select only VISIBLE anchor
            .each(($el) => {
                cy.wrap($el).click() // Should be able to click the anchor with no issue or error
            })
    })
})