describe('Product Grid Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
  });

  it('Page loads successfully', () => {
      cy.get('.grid-layout').should('exist');
  });

  it('Page contains 9 products', () => {
      cy.get('.grid-tile').should('have.length', 9);
  });

  it('Sale button works as expected', () => {
      // Original prices
      let originalPrices = [];
      cy.get('.grid-layout .price').each(($price) => {
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