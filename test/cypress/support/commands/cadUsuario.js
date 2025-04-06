import faker from 'faker-br';

export const dadosCadastro = () => {
    return {
        nome: faker.name.firstName(),
        email: faker.internet.email(),
        telefone: '859888888888',
        senha: '123456',
        confirmacao: '123456',
        profissao: '',
        aceitaTermos: true
    }
}
Cypress.Commands.add('acessarCadastro', () => {
    cy.visit('/');
});

Cypress.Commands.add('preencherDados', (dados) => {
    if (dados.nome) {
        cy.get('#name').type(dados.nome);
    }

    if (dados.email) {
        cy.get('#email').type(dados.email);
    }

    if (dados.telefone) {
        cy.get('#phone').type(dados.telefone);
    }

    if (dados.senha) {
        cy.get('#password').type(dados.senha, { log: false });
    }

    if (dados.confirmacao) {
        cy.get('#confirmPassword').type(dados.confirmacao, { log: false });

    }

    if (dados.profissao) {
        cy.get('#profession').select(dados.profissao);
    }

    if (dados.aceitaTermos) {
        cy.get('input[type="checkbox"]').should('be.visible')
            .check();
    }

    cy.contains('Enviar').should('be.visible').click();
});
