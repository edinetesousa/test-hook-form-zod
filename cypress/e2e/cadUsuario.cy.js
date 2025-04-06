import { dadosCadastro } from '../support/commands/cadUsuario';
let dados

describe('Preencher formulario de cadastro', () => {

  beforeEach('Acessar pagina de cadastro de usuario', () => {
    cy.visit('/');
    dados = dadosCadastro();
  })

  context('Validacao de preenchimeto dos campos corretos', () => {
    it('CT001 Cadastro de usuario com sucesso', () => {
      dados.profissao = 'Desenvolvedor';
      cy.preencherDados(dados);
      cy.validation('Cadastro realizado com sucesso!').should('be.visible');

    });
  })

  context('Validacao de campos vazios', () => {
    it('CT002 Cadastro de usuario com nome vazio', () => {
      dados.nome = '';
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('Nome é obrigatório').should('be.visible');
    });

    it('CT003 Cadastro de usuario com email vazio', () => {
      dados.email = '';
      dados.profissao = 'UX/UI';
      cy.preencherDados(dados);
      cy.validation('E-mail inválido').should('be.visible');
    });

    it('CT004 Cadastro de usuario com telefone vazio', () => {
      dados.telefone = '';
      dados.profissao = 'Outra';
      cy.preencherDados(dados);
      cy.validation('Telefone inválido').should('be.visible');
    })

    it('CT005 Cadastro de usuario com senha vazia', () => {
      dados.senha = '';
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('Senha deve ter no mínimo 6 caracteres').should('be.visible');
    });

    it('CT006 Cadastro de usuario com confirmacao de senha vazia', () => {
      dados.confirmacao = '';
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('Confirme sua senha').should('be.visible');
    });

    it('CT007 Cadastro de usuario com profissao vazia', () => {
      dados.profissao = '';
      cy.preencherDados(dados);
      cy.validation('Selecione uma opção').should('be.visible');
    });

    it('CT008 Cadastro de usuario com aceite de termos desmarcado', () => {
      dados.aceitaTermos = false;
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('Você deve aceitar os termos').should('be.visible');
    });
  })

  context('Validacao de preenchimento com dados invalidos', () => {
    it('CT009 Cadastro de usuario com nome invalido', () => {
      dados.nome = '@n@ 123';
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('Somente letras são permitidas').should('be.visible');
    });

    it('CT010 Cadastro de usuario com email invalido', () => {
      dados.email = 'email@invalido';
      dados.profissao = 'QA';
      cy.preencherDados(dados);
      cy.validation('E-mail inválido').should('be.visible');
    });

    it('CT011 Cadastro de usuario com telefone invalido', () => {
      dados.telefone = '123123';
      cy.preencherDados(dados);
      cy.validation('Telefone inválido').should('be.visible');
    });
    it('CT012 Cadastro de usuario com senha invalida', () => {
      dados.senha = '@#$';
      dados.confirmacao = '@#$';
      cy.preencherDados(dados);
      cy.validation('Senha deve ter no mínimo 6 caracteres').should('be.visible');
    });
    it('CT013 Cadastro de usuario com senha e confirmacao diferentes', () => {
      dados.confirmacao = '888888';
      cy.preencherDados(dados);
      cy.validation('As senhas não conferem').should('be.visible');
    });

  })
})