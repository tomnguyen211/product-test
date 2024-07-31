import productData from '../../src/product-sample.json';
import priceAscProduct from './fixtures/product-pirce-asc.json';

describe('Product Grid Tests', () => {

    // Iphone X - Mobile Device
    const mobileView = [390, 812];
    // Desktop view
    const desktopView = [1920, 1080];

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
        cy.get('.grid-tile').should('have.length', productData.length);
    });

    it('Sale button works as expected', () => {
        // Original prices
        let originalPrices = [];
        cy.get('.grid-tile h3').each(($price) => {
            originalPrices.push(parseFloat($price.text().replace('$', '')));
        });

        // Sale button
        cy.get('#saleButton').click();

        // 50% prices
        cy.get('.grid-tile h3').each(($price, index) => {
            const newPrice = parseFloat($price.text().replace('$', ''));
            expect(newPrice).to.equal((originalPrices[index] / 2));
        });
    });

    it('Price accesding works as expected', () => {

        // Sale button
        cy.get('#sortPrice').click();

        cy.get('.grid-tile h3').each(($price, index) => {
            const currentPrice = parseFloat($price.text().replace('$', ''));
            expect(currentPrice).to.equal(priceAscProduct[index].price);
        });

        cy.get('.grid-tile p').each((name, index) => {
            const currentName = name.text();
            expect(currentName).to.equal(priceAscProduct[index].name);
        });
        
    });

    
});