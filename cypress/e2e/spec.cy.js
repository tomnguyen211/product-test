describe('Product Grid Tests', () => {

    const mobileView = [375, 667];
    const desktopView = [1024, 768];

    beforeEach(() => {
        cy.visit('http://localhost:3000/product-test');
    });

    it('Page loads successfully', () => {
        cy.get('.sale-button').should('exist');
    });


    it('Desktop view loads succesfully', () => {
        cy.viewport(desktopView[0], desktopView[1]);
        cy.get('.grid-layout-desktop')
        .should('be.visible')
    });

    it('Mobile view loads succesfully', () => {
        cy.viewport(mobileView[0], mobileView[1]);
        cy.get('.grid-layout-mobile').should('be.visible');
    });

    it('Page contains 9 products', () => {
        cy.get('.grid-tile').should('have.length', 9);
    });

    it('Sale button works as expected', () => {
        // Original prices
        let originalPrices = [];
        cy.get('.grid-tile .price').each(($price) => {
            originalPrices.push(parseFloat($price.text().replace('$', '')));
        });

        // Sale button
        cy.get('.sale-button button').click();

        // 50% prices
        cy.get('.grid-tile .price').each(($price, index) => {
            const newPrice = parseFloat($price.text().replace('$', ''));
            expect(newPrice).to.equal((originalPrices[index] / 2));
        });
    });
});