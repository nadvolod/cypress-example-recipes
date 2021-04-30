/// <reference types="cypress" />
let authenticatedUser = ''

// Mocha before hook that will execute before the entire spec
before(function fetchUser () {
  // web request to get back an authenticated user and store that information in a variable
  cy.request('POST', 'http://localhost:4000/users/authenticate', {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  })
  .its('body')
  .then((response) => {
    authenticatedUser = response
  })
})

describe('bypassing UI login', () => {
  // but set the user before visiting the page
  // so the app thinks it is already authenticated
  beforeEach(function setUser () {
    cy.visit('/')
    // the page should be opened and the user should be logged in
    // eslint-disable-next-line no-undef
    window.localStorage.setItem('user', JSON.stringify(authenticatedUser))
  })

  it('shows logged in user', () => {
    // your test code here
    //1. use cy.contains('li', 'Test User').should('be.visible')
    cy.contains('h1', 'Hi Test!').should('be.visible')
  })

  it('should log out', () => {
    //your test code here
    //1. use cy.get('ELEMENT').click() to click on the link
    //2. use cy.contains('ELEMENT', 'TEXT').should('TRUE CONDITION') to assert
  })
})
