Cypress.Commands.add('validation', (text) => {
    return cy.contains(text);
});

Cypress.Commands.add('validationCss', (CSS) => {
    cy.get('#email').invoke('prop', 'validationMessage')  // Invoca a propriedade 'validationMessage'
        .should((text) => {
            expect(CSS).to.eq(text)
        });
})
Cypress.Commands.add('validarMensagem', (mensagem) => {
    cy.contains(mensagem).should('be.visible').then(() => {
        cy.end();
    });
});